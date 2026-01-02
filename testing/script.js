let card = null;

fetch("flashcards.json")
  .then(res => res.json())
  .then(data => {
    // Pick first available card (simple and predictable)
    const X = Object.keys(data)[0];
    const Y = Object.keys(data[X])[0];
    const Z = Object.keys(data[X][Y])[0];

    card = data[X][Y][Z][0];

    document.getElementById("statement").textContent = card.statement;
  });

function showAnswer() {
  const answerBox = document.getElementById("answer");
  answerBox.textContent = card.answer;
  answerBox.style.display = "block";
}
