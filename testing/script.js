let flashcardsData = {};
let currentCard = null;
let currentIndex = "";

let lastIndex = null;

let confirmNextClick = false;

// Load the manifest first, then load all files listed in it
async function loadAllFlashcards() {
  try {
    const manifestRes = await fetch("flashcards_manifest.json");
    const manifest = await manifestRes.json();

    for (const file of manifest) {
      const res = await fetch(file);
      const data = await res.json();
      mergeFlashcards(flashcardsData, data);
    }

    loadRandomCard();
  } catch (err) {
    console.error("Error loading flashcards manifest:", err);
  }
}

// Merge flashcards recursively
function mergeFlashcards(target, source) {
  for (const X in source) {
    if (!target[X]) target[X] = {};
    for (const Y in source[X]) {
      if (!target[X][Y]) target[X][Y] = {};
      for (const Z in source[X][Y]) {
        if (!target[X][Y][Z]) target[X][Y][Z] = [];
        target[X][Y][Z] = target[X][Y][Z].concat(source[X][Y][Z]);
      }
    }
  }
}



function loadRandomCard() {
  if (!flashcardsData || Object.keys(flashcardsData).length === 0) return;

  const activeFilters = getActiveIndexFilters();

  let attempts = 0;
  let newIndex, X, Y, Z, W, cards;

  do {
    X = randomKey(flashcardsData);
    Y = randomKey(flashcardsData[X]);
    Z = randomKey(flashcardsData[X][Y]);
    cards = flashcardsData[X][Y][Z];

    W = Math.floor(Math.random() * cards.length);
    newIndex = `${X}.${Y}.${Z}.${W + 1}`;

    attempts++;

    // If filters exist, enforce prefix match
    if (activeFilters.length > 0) {
      const prefix = `${X}.${Y}.${Z}`;
      const matches = activeFilters.some(f => prefix === f);
      if (!matches) continue;
    }

    // Avoid immediate repeat
    if (newIndex === lastIndex && cards.length > 1) continue;

    break;

  } while (attempts < 100);

  currentCard = cards[W];
  currentIndex = newIndex;
  lastIndex = newIndex;

  document.getElementById("card-text").innerHTML = currentCard.statement;
  document.getElementById("card-index").textContent = currentIndex;

  document.getElementById("answer").style.display = "none";
  document.getElementById("hints").style.display = "none";

  renderMath();
  resetNextButton();
}



// Show answer
function showAnswer() {
  if (!currentCard) return;
  const box = document.getElementById("answer");
  box.innerHTML = currentCard.answer;
  box.style.display = "block";
  renderMath();
}

// ✅ NEW: Show hints
function showHints() {
  if (!currentCard || !currentCard.hints || currentCard.hints.length === 0) {
    alert("No hints available.");
    return;
  }

  const box = document.getElementById("hints");

  // Toggle OFF
  if (box.style.display === "block") {
    box.style.display = "none";
    return;
  }

  // Toggle ON
  box.innerHTML =
    "<strong>Hints:</strong><ul>" +
    currentCard.hints.map(h => `<li>${h}</li>`).join("") +
    "</ul>";

  box.style.display = "block";
  renderMath();
}


// MathJax rendering
function renderMath() {
  if (window.MathJax) MathJax.typesetPromise();
}

// Next button logic (double click)
function confirmNext() {
  const nextBtn = document.getElementById("next-btn");
  if (!confirmNextClick) {
    confirmNextClick = true;
    nextBtn.textContent = "Click again to confirm";
    return;
  }
  confirmNextClick = false;
  nextBtn.textContent = "Next Card";
  loadRandomCard();
}

function resetNextButton() {
  confirmNextClick = false;
  document.getElementById("next-btn").textContent = "Next Card";
}

// Utility
function randomKey(obj) {
  return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
}


function toggleFilter() {
  const body = document.getElementById("filter-body");
  body.style.display = body.style.display === "block" ? "none" : "block";
}

function getActiveIndexFilters() {
  const checkboxes = document.querySelectorAll(".index-filter:checked");
  return Array.from(checkboxes).map(cb => cb.value);
}


document.querySelectorAll(".index-filter").forEach(cb => {
  cb.addEventListener("change", () => {
    resetNextButton();
    loadRandomCard();
  });
});

loadAllFlashcards();
