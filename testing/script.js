let flashcardsData = null;
let dictionaryData = null;

let currentCard = null;
let currentHintIndex = 0;

function loadData() {
  Promise.all([
    fetch('flashcards.json').then(res => res.json()),
    fetch('dictionary.json').then(res => res.json())
  ])
  .then(([flashcards, dictionary]) => {
    flashcardsData = flashcards;
    dictionaryData = dictionary;
    generateRandomStatement();
  })
  .catch(err => console.error("Load error:", err));
}


// Call loadData when the page is loaded
window.onload = loadData;

// Function to generate a random statement from the flashcards data
function generateRandomStatement() {
  if (!flashcardsData) return;

  const flashcards = flashcardsData.flashcards;
  const x = Object.keys(flashcards)[Math.floor(Math.random() * Object.keys(flashcards).length)];
  const y = Object.keys(flashcards[x])[Math.floor(Math.random() * Object.keys(flashcards[x]).length)];
  const card = flashcards[x][y][Math.floor(Math.random() * flashcards[x][y].length)];

  currentCard = card;
  currentHintIndex = 0;

  detectAndLinkWords(card.statement);

  // Show or hide hint button
  const hintBtn = document.getElementById("hint-btn");
  if (card.hints && card.hints.length > 0) {
    hintBtn.style.display = "inline-block";
    hintBtn.innerText = "Show Hint";
  } else {
    hintBtn.style.display = "none";
  }
}



function showHint() {
  if (!currentCard || !currentCard.hints) return;

  alert("Hint: " + currentCard.hints[currentHintIndex]);

  currentHintIndex++;
  if (currentHintIndex >= currentCard.hints.length) {
    document.getElementById("hint-btn").style.display = "none";
  }
}


// Function to filter flashcards by tag (without modifying the original JSON)
function filterFlashcardsByTag(tag) {
  if (!flashcardsData) return;  // Ensure data is loaded

  // Filter flashcards based on the tag
  const filteredCards = [];
  
  Object.keys(flashcardsData.flashcards).forEach(x => {
    Object.keys(flashcardsData.flashcards[x]).forEach(y => {
      flashcardsData.flashcards[x][y].forEach(card => {
        if (card.tags && card.tags.includes(tag)) {
          filteredCards.push(card);
        }
      });
    });
  });

  if (filteredCards.length > 0) {
    // Choose a random filtered card to display
    const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
    detectAndLinkWords(randomCard.statement);  // Display the card with linked dictionary words
  } else {
    document.getElementById('card-content').innerText = "No flashcards found with that tag.";
  }
}

// Function to apply selected tag filter
function applyTagFilter() {
  const selectedTag = document.getElementById('tag-filter').value;
  filterFlashcardsByTag(selectedTag);
}

// Function to detect words like dict('word') and link them to the dictionary
function detectAndLinkWords(statement) {
  const regex = /dict\(['"]([^'"]+)['"]\)/g;
  let modifiedStatement = statement;
  let match;

  while ((match = regex.exec(statement)) !== null) {
    const word = match[1].toLowerCase();
    if (flashcardsData.dictionary[word]) {
      const wordLink = `<span class="dictionary-word" onclick="showDictionaryDefinition('${word}')">${word}</span>`;
      modifiedStatement = modifiedStatement.replace(match[0], wordLink);
    }
  }

  const card = document.getElementById('card-content');
  card.innerHTML = modifiedStatement;

  // 🔥 Force MathJax to re-render
  if (window.MathJax) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, card]);
  }
}

// Function to show the dictionary definition in a popup
function showDictionaryDefinition(word) {
  const definition = dictionaryData[word];
  if (definition) {
    // Create a popup with the definition
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid #333';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = 1000;

    const content = document.createElement('p');
    content.innerHTML = `<strong>${word}:</strong> ${definition}`;
    popup.appendChild(content);

    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close';
    closeBtn.onclick = () => {
      document.body.removeChild(popup);
    };
    popup.appendChild(closeBtn);

    // Append the popup to the body
    document.body.appendChild(popup);
  } else {
    alert("Definition not found!");
  }
}
