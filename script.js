// Get references to the HTML elements
const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const questionEl = document.getElementById('question-container');
const inputEl = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const timerDisplay = document.getElementById('timer-display');
const startGameBtn = document.getElementById('start-game-btn');

// --- Game Variables ---
let score = 0;
let num1, num2, correctAnswer;
let gameStarted = false;
let timerInterval; // To store the interval ID
let timeLeft = 60; // Set game time to 60 seconds

// Function to generate a new question
function generateQuestion() {
    num1 = Math.ceil(Math.random() * 10);
    num2 = Math.ceil(Math.random() * 10);
    correctAnswer = num1 * num2;

    num1El.innerText = num1;
    num2El.innerText = num2;

    feedbackEl.innerText = '';
    inputEl.value = '';
    feedbackEl.classList.remove('correct', 'wrong');
    inputEl.focus(); 
}

// Function to check the user's answer
function checkAnswer() {
    // Only check if the game is running
    if (!gameStarted) return; 

    const userAnswer = parseInt(inputEl.value);

    if (isNaN(userAnswer) || inputEl.value.trim() === '') {
        feedbackEl.innerText = 'Please enter a number!';
        feedbackEl.classList.add('wrong');
        return;
    }

    if (userAnswer === correctAnswer) {
        score++;
        feedbackEl.innerText = 'Correct!';
        feedbackEl.classList.add('correct');
    } else {
        feedbackEl.innerText = `Wrong! The answer was ${correctAnswer}.`;
        feedbackEl.classList.add('wrong');
    }

    scoreEl.innerText = score;
    
    // Generate a new question immediately
    // We remove the timeout to allow for rapid play
    generateQuestion();
}

// --- New Timer Functions ---

// Function to update the timer display
function updateTimer() {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

// Function to handle the end of the game
function endGame() {
    // Stop the timer
    clearInterval(timerInterval); 
    gameStarted = false;

    // Show feedback
    feedbackEl.innerText = `Time's up! Your final score is ${score}.`;
    feedbackEl.classList.remove('correct', 'wrong');

    // Hide game elements and show start button
    inputEl.style.display = 'none';
    submitBtn.style.display = 'none';
    questionEl.style.display = 'none';
    startGameBtn.style.display = 'block'; // Show "Start Game" button again
    startGameBtn.innerText = "Play Again?"; // Change button text
}

// --- Updated Start Game Function ---
function startGame() {
    // Stop any existing timer
    clearInterval(timerInterval); 

    // Reset game state
    gameStarted = true;
    score = 0; 
    timeLeft = 60; // Reset timer
    scoreEl.innerText = score;
    timerDisplay.innerText = timeLeft;

    // Show/hide the correct elements
    startGameBtn.style.display = 'none'; 
    inputEl.style.display = 'block'; 
    submitBtn.style.display = 'block'; 
    questionEl.style.display = 'block';
    feedbackEl.innerText = '';
    feedbackEl.classList.remove('correct', 'wrong');

    generateQuestion();
    inputEl.focus();

    // Start the timer
    // setInterval will call the 'updateTimer' function every 1000ms (1 second)
    timerInterval = setInterval(updateTimer, 1000);
}


// --- Event Listeners ---

submitBtn.addEventListener('click', checkAnswer);

inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

startGameBtn.addEventListener('click', startGame); 

// --- Initial Setup ---

// Hide game elements until 'Start Game' is clicked
inputEl.style.display = 'none';
submitBtn.style.display = 'none';
questionEl.style.display = 'none';
timerDisplay.innerText = '60'; // Show the starting time
