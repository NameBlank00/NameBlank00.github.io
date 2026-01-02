let flashcardsData = null;
let dictionaryData = null;
let currentCard = null;
let hintIndex = 0;

Promise.all([
  fetch("flashcards.json").then(r => r.json()),
  fetch("dictionary.json").then(r => r.json())
]).then(([cards, dict]) => {
  flashcardsData = cards;
  dictionaryData = dict;
  generateRandomCard();
});

function generateRandomCard() {
  const data = flashcardsData.flashcards;
  const x = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
  const y = Object.keys(data[x])[Math.floor(Math.random() * Object.keys(data[x]).length)];
  currentCard = data[x][y][Math.floor(Math.random() * data[x][y].length)];

  hintIndex = 0;

  document.getElementById("answer-box").style.display = "none";
  document.getElementById("dictionary-box").style.display = "none";

  renderStatement(currentCard.statement);

  document.getElementById("hint-btn").style.display =
    currentCard.hints ? "inline-block" : "none";
}

function renderStatement(text) {
  const regex = /dict\(['"]([^'"]+)['"]\)/g;
  const html = text.replace(regex, (_, word) =>
    `<span class="dictionary-word" onclick="showDictionary('${word}')">${word}</span>`
  );
  document.getElementById("statement-box").innerHTML = html;
}

function showDictionary(word) {
  const box = document.getElementById("dictionary-box");
  box.innerHTML = `<strong>${word}</strong>: ${dictionaryData[word] || "No definition found."}`;
  box.style.display = "block";
}

function showHint() {
  if (!currentCard.hints) return;

  alert(currentCard.hints[hintIndex]);
  hintIndex++;

  if (hintIndex >= currentCard.hints.length) {
    document.getElementById("hint-btn").style.display = "none";
  }
}

function showAnswer() {
  const box = document.getElementById("answer-box");
  box.innerHTML = `<strong>Answer:</strong> ${currentCard.answer}`;
  box.style.display = "block";
}
