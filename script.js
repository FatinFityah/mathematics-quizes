// Get references to the HTML elements
const questionNumberDisplay = document.getElementById('question-number');
const equationDisplay = document.getElementById('equation-display');
const choiceButtons = document.querySelectorAll('.choice-btn'); // Get all choice buttons
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const timerDisplay = document.getElementById('timer-display');
const startGameBtn = document.getElementById('start-game-btn');
const choicesGrid = document.querySelector('.choices-grid'); // New: reference to the choices container

// --- Game Variables ---
let score = 0;
let questionCount = 0;
let gameStarted = false;
let timerInterval;
let timeLeft = 60; // 60 seconds for the entire quiz
let correctAnswerValue; // The actual number that is the correct answer

// Function to generate a random number
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1; // 1 to max (inclusive)
}

// Fisher-Yates shuffle algorithm for arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to generate a new equation and choices
function generateQuestion() {
    questionCount++;
    questionNumberDisplay.innerText = questionCount;

    let num1 = getRandomInt(10);
    let num2 = getRandomInt(10);
    let operator = ['+', '-', 'x'][Math.floor(Math.random() * 3)]; // Pick +, -, or x
    
    let result;

    // --- Calculate the correct answer ---
    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        // Ensure result is not negative for simplicity
        if (num1 < num2) {
            [num1, num2] = [num2, num1]; // Swap num1 and num2
        }
        result = num1 - num2;
    } else { // operator === 'x'
        result = num1 * num2;
    }
    correctAnswerValue = result;

    equationDisplay.innerText = `${num1} ${operator} ${num2} = ?`;

    // --- Generate choices ---
    let choices = [correctAnswerValue];

    // Generate 3 incorrect answers
    while (choices.length < 4) {
        let wrongAnswer = correctAnswerValue + (getRandomInt(5) * (Math.random() > 0.5 ? 1 : -1));
        // Ensure wrong answers are somewhat reasonable and unique
        if (wrongAnswer > 0 && !choices.includes(wrongAnswer)) {
            choices.push(wrongAnswer);
        }
    }

    // Shuffle the choices array
    shuffleArray(choices);

    // Assign choices to buttons
    choiceButtons.forEach((button, index) => {
        const choiceValueSpan = button.querySelector('.choice-value');
        choiceValueSpan.innerText = choices[index];
        button.classList.remove('correct-choice', 'wrong-choice'); // Clear previous feedback
        button.disabled = false; // Enable buttons
    });

    feedbackEl.innerText = '';
}

// Function to check the user's answer
function checkAnswer(chosenButton) {
    if (!gameStarted) return;

    // Disable all choice buttons after an answer is selected
    choiceButtons.forEach(button => button.disabled = true);

    const userAnswer = parseInt(chosenButton.querySelector('.choice-value').innerText);

    if (userAnswer === correctAnswerValue) {
        score++;
        feedbackEl.innerText = 'Correct!';
        feedbackEl.classList.add('correct');
        chosenButton.classList.add('correct-choice');
    } else {
        feedbackEl.innerText = 'Wrong!';
        feedbackEl.classList.add('wrong');
        chosenButton.classList.add('wrong-choice');
        // Optionally highlight the correct answer
        choiceButtons.forEach(button => {
            if (parseInt(button.querySelector('.choice-value').innerText) === correctAnswerValue) {
                button.classList.add('correct-choice');
            }
        });
    }

    scoreEl.innerText = score;
    setTimeout(generateQuestion, 1500); // 1.5-second delay before next question
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

    feedbackEl.innerText = `Time's up! Your final score is ${score} / ${questionCount}.`;
    feedbackEl.classList.remove('correct', 'wrong');

    // Hide game elements and show start button
    equationDisplay.style.display = 'none';
    choicesGrid.style.display = 'none'; // Hide the grid of choices
    startGameBtn.style.display = 'block'; 
    startGameBtn.innerText = "Play Again?";
    questionNumberDisplay.parentElement.style.display = 'none'; // Hide "Question X:"
}

function startGame() {
    clearInterval(timerInterval); 

    gameStarted = true;
    score = 0; 
    questionCount = 0; // Reset question count
    timeLeft = 60;
    scoreEl.innerText = score;
    timerDisplay.innerText = timeLeft;

    // Show/hide the correct elements
    startGameBtn.style.display = 'none'; 
    equationDisplay.style.display = 'block';
    choicesGrid.style.display = 'grid'; // Show the grid
    feedbackEl.innerText = '';
    questionNumberDisplay.parentElement.style.display = 'block'; // Show "Question X:"

    generateQuestion(); // Generate the first question
    timerInterval = setInterval(updateTimer, 1000);
}


// --- Event Listeners ---
choiceButtons.forEach(button => {
    button.addEventListener('click', () => checkAnswer(button));
});

startGameBtn.addEventListener('click', startGame); 

// --- Initial Setup ---
// Hide game elements until 'Start Game' is clicked
equationDisplay.style.display = 'none';
choicesGrid.style.display = 'none';
timerDisplay.innerText = '60'; 
questionNumberDisplay.parentElement.style.display = 'none'; // Hide "Question X:" initially
