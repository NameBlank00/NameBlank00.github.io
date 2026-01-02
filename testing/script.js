let currentCard = null;
let confirmNextClick = false;

const answerBtn = document.querySelector("button");
const nextBtn = document.getElementById("next-btn");

answerBtn.disabled = true;

fetch("flashcards.json")
  .then(res => res.json())
  .then(data => {
    window.flashData = data;
    loadRandomCard();
  });

function loadRandomCard() {
  const X = randomKey(flashData);
  const Y = randomKey(flashData[X]);
  const Z = randomKey(flashData[X][Y]);

  currentCard = flashData[X][Y][Z][Math.floor(Math.random() * flashData[X][Y][Z].length)];

  document.getElementById("statement").textContent = currentCard.statement;
  document.getElementById("answer").style.display = "none";

  answerBtn.disabled = false;
  resetNextButton();
}

function showAnswer() {
  if (!currentCard) return;
  document.getElementById("answer").textContent = currentCard.answer;
  document.getElementById("answer").style.display = "block";
}

function confirmNext() {
  if (!confirmNextClick) {
    confirmNextClick = true;
    document.getElementById("next-btn").textContent = "Click again to confirm";
    return;
  }

  // confirmed
  confirmNextClick = false;
  document.getElementById("next-btn").textContent = "Next Card";
  loadRandomCard();
}

function resetNextButton() {
  confirmNextClick = false;
  document.getElementById("next-btn").textContent = "Next Card";
}

function randomKey(obj) {
  return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
}
