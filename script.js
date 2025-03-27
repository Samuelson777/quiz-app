const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const scoreboard = document.getElementById('scoreboard');
const highScoresList = document.getElementById('high-scores-list');
const feedbackElement = document.getElementById('feedback');

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Lisbon', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: [
            { text: 'Harper Lee', correct: true },
            { text: 'Mark Twain', correct: false },
            { text: 'Ernest Hemingway', correct: false },
            { text: 'F. Scott Fitzgerald', correct: false }
        ]
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true }
        ]
    },
    {
        question: 'What is the closest planet to the Sun?',
        answers: [
            { text: 'Venus', correct: false },
            { text: 'Earth', correct: false },
            { text: 'Mercury', correct: true },
            { text: 'Mars', correct: false }
        ]
    },
    {
        question: 'What is the main gas found in the air we breathe?',
        answers: [
            { text: 'Oxygen', correct: false },
            { text: 'Carbon Dioxide', correct: false },
            { text: 'Nitrogen', correct: true },
            { text: 'Hydrogen', correct: false }
        ]
    },
    {
        question: 'Which planet is known for its rings?',
        answers: [
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: true },
            { text: 'Uranus', correct: false },
            { text: 'Neptune', correct: false }
        ]
    },
    {
        question: 'What is the powerhouse of the cell?',
        answers: [
            { text: 'Nucleus', correct: false },
            { text: 'Mitochondria', correct: true },
            { text: 'Ribosome', correct: false },
            { text: 'Endoplasmic Reticulum', correct: false }
        ]
    },
    {
        question: 'What force keeps us on the ground?',
        answers: [
            { text: 'Friction', correct: false },
            { text: 'Gravity', correct: true },
            { text: 'Magnetism', correct: false },
            { text: 'Inertia', correct: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Saturn', correct: false },
            { text: 'Neptune', correct: false }
        ]
    },
    {
        question: 'What is the speed of light?',
        answers: [
            { text: '300,000 km/s', correct: true },
            { text: '150,000 km/s', correct: false },
            { text: '450,000 km/s', correct: false },
            { text: '600,000 km/s', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for water?',
        answers : [
            { text: 'H2O', correct: true },
            { text: 'O2', correct: false },
            { text: 'CO2', correct: false },
            { text: 'HO2', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the "Blue Planet"?',
        answers: [
            { text: 'Earth', correct: true },
            { text: 'Mars', correct: false },
            { text: 'Neptune', correct: false },
            { text: 'Uranus', correct: false }
        ]
    },
    {
        question: 'What is the main component of the Sun?',
        answers: [
            { text: 'Oxygen', correct: false },
            { text: 'Hydrogen', correct: true },
            { text: 'Helium', correct: false },
            { text: 'Carbon', correct: false }
        ]
    },
    {
        question: 'What is the process by which plants make their food?',
        answers: [
            { text: 'Photosynthesis', correct: true },
            { text: 'Respiration', correct: false },
            { text: 'Transpiration', correct: false },
            { text: 'Digestion', correct: false }
        ]
    },
    {
        question: 'What is the hardest natural substance on Earth?',
        answers: [
            { text: 'Gold', correct: false },
            { text: 'Diamond', correct: true },
            { text: 'Iron', correct: false },
            { text: 'Quartz', correct: false }
        ]
    },
    {
        question: 'What is the main organ of the circulatory system?',
        answers: [
            { text: 'Liver', correct: false },
            { text: 'Heart', correct: true },
            { text: 'Lungs', correct: false },
            { text: 'Kidneys', correct: false }
        ]
    },
    {
        question: 'What is the boiling point of water?',
        answers: [
            { text: '100°C', correct: true },
            { text: '90°C', correct: false },
            { text: '80°C', correct: false },
            { text: '110°C', correct: false }
        ]
    },
    {
        question: 'What is the largest land animal?',
        answers: [
            { text: 'Elephant', correct: true },
            { text: 'Giraffe', correct: false },
            { text: 'Rhino', correct: false },
            { text: 'Hippo', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none';
    scoreContainer.style.display = 'none';
    scoreboard.style.display = 'none';
    questionContainer.style.display = 'block';
    shuffleQuestions();
    showQuestion(questions[currentQuestionIndex]);
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    showFeedback(correct);
    if (correct) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.innerText === answer.text) {
            button.classList.add(correct ? 'correct' : 'incorrect');
        }
    });
    nextButton.style.display = 'block';
}

function showFeedback(correct) {
    feedbackElement.innerText = correct ? 'Correct!' : 'Wrong answer!';
    feedbackElement.classList.add(correct ? 'correct' : 'incorrect');
    feedbackElement.style.display = 'block';

    setTimeout(() => {
        feedbackElement.style.display = 'none';
        feedbackElement.classList.remove('correct', 'incorrect');
    }, 2000);
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
});

function endQuiz() {
    questionContainer.style.display = 'none';
    scoreElement.innerText = score;
    scoreContainer.style.display = 'block';
    saveScore();
    displayHighScores();
    scoreboard.style.display = 'block';
}

function saveScore() {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

 function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresList.innerHTML = '';
    highScores.forEach((score, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${score}`;
        highScoresList.appendChild(li);
    });
}

restartButton.addEventListener('click', startGame);

startGame();