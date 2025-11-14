// Get references to the HTML elements
const equationDisplay = document.getElementById('equation-display');
const trueBtn = document.getElementById('true-btn');
const falseBtn = document.getElementById('false-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const timerDisplay = document.getElementById('timer-display');
const startGameBtn = document.getElementById('start-game-btn');
const choiceBtnContainer = document.querySelector('.choice-btn-container'); // Get button container

// --- Game Variables ---
let score = 0;
let gameStarted = false;
let timerInterval;
let timeLeft = 60;
let isEquationCorrect; // To store if the current equation is true or false

// Function to generate a random number
function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

// Function to generate a new equation
function generateEquation() {
    let num1 = getRandomInt(10);
    let num2 = getRandomInt(10);
    let operator = ['+', '-', 'x'][getRandomInt(3) - 1]; // Pick +, -, or x
    let correctAnswer;

    // --- Calculate the correct answer ---
    if (operator === '+') {
        correctAnswer = num1 + num2;
    } else if (operator === '-') {
        // Ensure result is not negative for simplicity
        if (num1 < num2) {
            [num1, num2] = [num2, num1]; // Swap num1 and num2
        }
        correctAnswer = num1 - num2;
    } else { // operator === 'x'
        correctAnswer = num1 * num2;
    }

    let displayedAnswer;
    
    // Randomly decide (50/50) to show a true or false equation
    if (Math.random() > 0.5) {
        // Show the CORRECT answer
        displayedAnswer = correctAnswer;
        isEquationCorrect = true;
    } else {
        // Show a WRONG answer
        let offset = getRandomInt(3) * (Math.random() > 0.5 ? 1 : -1); // Add/subtract 1, 2, or 3
        if (offset === 0) offset = 1; // Ensure it's not zero
        
        displayedAnswer = correctAnswer + offset;
        isEquationCorrect = false;
    }

    // Display the full equation
    equationDisplay.innerText = `${num1} ${operator} ${num2} = ${displayedAnswer}`;

    // Clear old feedback
    feedbackEl.innerText = '';
    feedbackEl.classList.remove('correct', 'wrong');
}

// Function to check the user's answer
function checkAnswer(userChoice) { // userChoice will be true or false
    if (!gameStarted) return;

    if (userChoice === isEquationCorrect) {
        // User was right!
        score++;
        feedbackEl.innerText = 'Correct!';
        feedbackEl.classList.add('correct');
    } else {
        // User was wrong
        feedbackEl.innerText = 'Wrong!';
        feedbackEl.classList.add('wrong');
    }

    scoreEl.innerText = score;

    // Generate the next equation after a short delay
    setTimeout(generateEquation, 500); // 0.5-second delay
}

// --- Timer and Game State Functions ---

function updateTimer() {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval); 
    gameStarted = false;

    feedbackEl.innerText = `Time's up! Your final score is ${score}.`;
    feedbackEl.classList.remove('correct', 'wrong');

    // Hide game elements and show start button
    equationDisplay.style.display = 'none';
    choiceBtnContainer.style.display = 'none';
    startGameBtn.style.display = 'block'; 
    startGameBtn.innerText = "Play Again?";
}

function startGame() {
    clearInterval(timerInterval); 

    gameStarted = true;
    score = 0; 
    timeLeft = 60;
    scoreEl.innerText = score;
    timerDisplay.innerText = timeLeft;

    // Show/hide the correct elements
    startGameBtn.style.display = 'none'; 
    equationDisplay.style.display = 'block';
    choiceBtnContainer.style.display = 'flex'; // Use 'flex' to show it
    feedbackEl.innerText = '';

    generateEquation(); // Generate the first equation
    timerInterval = setInterval(updateTimer, 1000);
}


// --- Event Listeners ---
trueBtn.addEventListener('click', () => checkAnswer(true));
falseBtn.addEventListener('click', () => checkAnswer(false));
startGameBtn.addEventListener('click', startGame); 

// --- Initial Setup ---
// Hide game elements until 'Start Game' is clicked
equationDisplay.style.display = 'none';
choiceBtnContainer.style.display = 'none';
timerDisplay.innerText = '60';
