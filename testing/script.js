let flashcardsData = {};
let currentCard = null;
let currentIndex = "";

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

// Load a random card
function loadRandomCard() {
  const X = randomKey(flashcardsData);
  const Y = randomKey(flashcardsData[X]);
  const Z = randomKey(flashcardsData[X][Y]);
  const cards = flashcardsData[X][Y][Z];

  const W = Math.floor(Math.random() * cards.length);
  currentCard = cards[W];
  currentIndex = `${X}.${Y}.${Z}.${W + 1}`;

  document.getElementById("card-text").innerHTML = currentCard.statement;
  document.getElementById("card-index").textContent = currentIndex;

  document.getElementById("answer").style.display = "none";
  document.getElementById("hints").style.display = "none"; // NEW

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

loadAllFlashcards();
