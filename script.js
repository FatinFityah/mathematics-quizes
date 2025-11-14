// Get references to the HTML elements
const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const questionEl = document.getElementById('question-container');
const inputEl = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const timerDisplay = document.getElementById('timer-display'); // New: Timer element
const startGameBtn = document.getElementById('start-game-btn'); // New: Start Game button

// Initialize variables
let score = 0;
let num1, num2, correctAnswer;
let gameStarted = false; // New: Flag to control game start
let timer; // For a potential future timer (not implemented yet)

// Function to generate a new question
function generateQuestion() {
    // Generate two random numbers between 1 and 10
    num1 = Math.ceil(Math.random() * 10);
    num2 = Math.ceil(Math.random() * 10);
    
    // Calculate the correct answer
    correctAnswer = num1 * num2;

    // Update the question text in the HTML
    num1El.innerText = num1;
    num2El.innerText = num2;

    // Clear previous feedback and input
    feedbackEl.innerText = '';
    inputEl.value = '';
    feedbackEl.classList.remove('correct', 'wrong');
    inputEl.focus(); // Keep focus on the input for quick play
}

// Function to check the user's answer
function checkAnswer() {
    if (!gameStarted) return; // Don't check answer if game hasn't started

    const userAnswer = parseInt(inputEl.value);

    // Basic validation: if input is empty or not a number, don't proceed
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
    setTimeout(generateQuestion, 1500); // 1.5-second delay before next question
}

// Function to start the game
function startGame() {
    gameStarted = true;
    score = 0; // Reset score
    scoreEl.innerText = score;
    startGameBtn.style.display = 'none'; // Hide start button
    inputEl.style.display = 'block'; // Show input field
    submitBtn.style.display = 'block'; // Show submit button
    questionEl.style.display = 'block'; // Show question
    timerDisplay.innerText = '--'; // Reset timer display

    // Initially hide feedback if not needed at start
    feedbackEl.innerText = ''; 
    feedbackEl.classList.remove('correct', 'wrong');

    generateQuestion();
    inputEl.focus(); // Focus on input when game starts
}


// --- Event Listeners ---

submitBtn.addEventListener('click', checkAnswer);

inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

startGameBtn.addEventListener('click', startGame); // New: Listen for start game button click

// --- Initial Setup ---

// Hide game elements until 'Start Game' is clicked
inputEl.style.display = 'none';
submitBtn.style.display = 'none';
questionEl.style.display = 'none';

// You could also initialize the timer display if you plan to add a countdown
// For now, it just shows '--'
