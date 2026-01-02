let card = null;


const answerBtn = document.querySelector("button");
answerBtn.disabled = true; // disable until ready

fetch("flashcards.json")
  .then(res => res.json())
  .then(data => {
    const X = Object.keys(data)[0];
    const Y = Object.keys(data[X])[0];
    const Z = Object.keys(data[X][Y])[0];

    currentCard = data[X][Y][Z][0];

    document.getElementById("statement").textContent = currentCard.statement;

    // Enable button only AFTER data loads
    answerBtn.disabled = false;
  })
  .catch(err => {
    console.error("Failed to load flashcards:", err);
  });

function showAnswer() {
  if (!currentCard) return; // safety check

  const answerBox = document.getElementById("answer");
  answerBox.textContent = currentCard.answer;
  answerBox.style.display = "block";
}