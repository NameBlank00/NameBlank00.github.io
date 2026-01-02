let currentCard = null;
let confirmNextClick = false;
let flashData = null;
let currentIndex = ""; // store X.Y.Z.W

const answerBtn = document.querySelector("button#show-answer");
const nextBtn = document.getElementById("next-btn");

fetch("flashcards.json")
  .then(res => res.json())
  .then(data => {
    flashData = data;
    loadRandomCard();
  });

// Load random card
function loadRandomCard() {
  const X = randomKey(flashData);
  const Y = randomKey(flashData[X]);
  const Z = randomKey(flashData[X][Y]);
  const W = Math.floor(Math.random() * flashData[X][Y][Z].length);

  currentCard = flashData[X][Y][Z][W];
  currentIndex = `${X}.${Y}.${Z}.${W + 1}`; // W+1 so index starts at 1

  // display statement and index
  document.getElementById("card-text").innerHTML = currentCard.statement;
  document.getElementById("card-index").textContent = currentIndex;

  document.getElementById("answer").style.display = "none";

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

// ✅ The missing function
function confirmNext() {
  const nextBtn = document.getElementById("next-btn");

  if (!confirmNextClick) {
    confirmNextClick = true;
    nextBtn.textContent = "Click again to confirm";
    return;
  }

  // confirmed
  confirmNextClick = false;
  nextBtn.textContent = "Next Card";
  loadRandomCard();
}

// Reset next button (used on load)
function resetNextButton() {
  confirmNextClick = false;
  document.getElementById("next-btn").textContent = "Next Card";
}

// Random key helper
function randomKey(obj) {
  return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
}

// MathJax rendering
function renderMath() {
  if (window.MathJax) MathJax.typesetPromise();
}
