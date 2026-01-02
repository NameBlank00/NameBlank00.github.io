let flashcards, dictionary;
let currentCard = null;
let hintIndex = 0;

Promise.all([
  fetch("flashcards.json").then(r => r.json()),
  fetch("dictionary.json").then(r => r.json())
]).then(([cards, dict]) => {
  flashcards = cards;
  dictionary = dict;
  loadRandomCard();
});

function loadRandomCard() {
  const X = randomKey(flashcards);
  const Y = randomKey(flashcards[X]);
  const Z = randomKey(flashcards[X][Y]);
  const cards = flashcards[X][Y][Z];

  currentCard = cards[Math.floor(Math.random() * cards.length)];
  hintIndex = 0;

  renderStatement(currentCard.statement);
  document.getElementById("answer-box").style.display = "none";
  document.getElementById("dictionary-box").style.display = "none";
}

function renderStatement(text) {
  const html = text.replace(/dict\(['"](.+?)['"]\)/g,
    (_, word) => `<span class="dict" onclick="showDictionary('${word}')">${word}</span>`
  );
  document.getElementById("statement-box").innerHTML = html;
}

function showDictionary(word) {
  document.getElementById("dictionary-box").innerHTML =
    `<b>${word}</b>: ${dictionary[word] || "No definition found."}`;
  document.getElementById("dictionary-box").style.display = "block";
}

function showHint() {
  if (!currentCard.hints || hintIndex >= currentCard.hints.length) return;
  alert(currentCard.hints[hintIndex++]);
}

function showAnswer() {
  const box = document.getElementById("answer-box");
  box.innerHTML = `<b>Answer:</b> ${currentCard.answer}`;
  box.style.display = "block";
}

function randomKey(obj) {
  return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
}
