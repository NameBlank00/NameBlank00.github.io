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




// Show answer
function showHints() {
  const hintsBox = document.getElementById("hints");

  // Toggle display
  if (hintsBox.style.display === "block") {
    hintsBox.style.display = "none";
    return;
  }

  hintsBox.innerHTML = ""; // clear previous hints

  if (!currentCard || !currentCard.hints || currentCard.hints.length === 0) {
    hintsBox.style.display = "none";
    return;
  }

  hintsBox.style.display = "block";

  // Loop through main hints array
  currentCard.hints.forEach((hintItem, index) => {
    let hintText;

    // hintItem can be:
    // 1) string -> single hint
    // 2) array of strings -> join
    // 3) array of arrays -> join inner arrays
    if (typeof hintItem === "string") {
      hintText = hintItem;
    } else if (Array.isArray(hintItem) && hintItem.every(h => typeof h === "string")) {
      hintText = hintItem.join(" ");
    } else if (Array.isArray(hintItem) && hintItem.every(h => Array.isArray(h))) {
      // array of arrays
      hintText = hintItem.map(inner => inner.join(" ")).join(" ");
    } else {
      hintText = String(hintItem); // fallback
    }

    // Container div for checkbox + label
    const hintRow = document.createElement("div");
    hintRow.style.display = "flex";
    hintRow.style.alignItems = "center";
    hintRow.style.marginBottom = "5px";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "hint-" + index;

    // Label to the right
    const label = document.createElement("label");
    label.htmlFor = "hint-" + index;
    label.textContent = "Hint #" + (index + 1);
    label.style.marginLeft = "8px";
    label.style.cursor = "pointer";

    // Hint div (hidden initially)
    const hintDiv = document.createElement("div");
    hintDiv.textContent = hintText;
    hintDiv.style.display = "none";
    hintDiv.style.margin = "5px 0 10px 25px"; // indent below checkbox
    hintDiv.style.color = "lightblue";
    hintDiv.style.fontStyle = "italic";

    // Show/hide hint when checkbox toggled
    checkbox.addEventListener("change", () => {
      hintDiv.style.display = checkbox.checked ? "block" : "none";
    });

    // Append checkbox and label to row
    hintRow.appendChild(checkbox);
    hintRow.appendChild(label);

    // Append row and hint div to hints box
    hintsBox.appendChild(hintRow);
    hintsBox.appendChild(hintDiv);
  });
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
