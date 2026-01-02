let currentCard = null;
let confirmNextClick = false;
let flashData = null;

// Fetch data
fetch("flashcards.json")
  .then(res => res.json())
  .then(data => {
    flashData = data;
    loadRandomCard();
  });

// Load a random card
function loadRandomCard() {
  const X = randomKey(flashData);
  const Y = randomKey(flashData[X]);
  const Z = randomKey(flashData[X][Y]);

  currentCard = flashData[X][Y][Z][Math.floor(Math.random() * flashData[X][Y][Z].length)];

  document.getElementById("statement").innerHTML = currentCard.statement;
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
