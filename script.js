// Color values for the game
const colors = ['#ff5733', '#33ff57', '#3357ff', '#f39c12', '#8e44ad', '#e74c3c', '#1abc9c', '#f1c40f'];
let cardsArray = [...colors, ...colors]; // Duplicate the colors for matching pairs
let flippedCards = [];
let matchedCards = [];

// DOM Elements
const cards = document.querySelectorAll('.card');
const restartBtn = document.getElementById('restart-btn');

// Shuffle function using `sort()`
function shuffleCards() {
    cardsArray.sort(() => 0.5 - Math.random());
}

// Assign shuffled colors to the card fronts
function assignColorsToCards() {
    cards.forEach((card, index) => {
        const front = card.querySelector('.card-front');
        front.style.backgroundColor = cardsArray[index];
        card.dataset.color = cardsArray[index]; // Set color data attribute
    });
}

// Card flip function
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check for matching cards
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.color === card2.dataset.color) {
        matchedCards.push(card1, card2);
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Restart game function
function restartGame() {
    flippedCards = [];
    matchedCards = [];
    shuffleCards();
    assignColorsToCards();
    removeAllFlippedCards();
}

// Remove all flipped classes when restarting
function removeAllFlippedCards() {
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
}

// Attach click listeners to cards
cards.forEach(card => {
    card.addEventListener('click', () => flipCard(card));
});

// Event listener for the restart button
restartBtn.addEventListener('click', restartGame);

// Initial setup
shuffleCards();
assignColorsToCards();
