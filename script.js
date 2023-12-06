// Quiz data containing questions, options, and correct answers
const quizData = [
    {
        question: "JavaScript is an _______ language?",
        options: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
        correctAnswer: "Object-Oriented"
    },
    {
        question: "Which of the following keywords is used to define a variable in JavaScript?",
        options: ["var", "let", "Both A and B", "None of the above"],
        correctAnswer: "Both A and B"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        options: ["const", "var", "let", "All of the Above"],
        correctAnswer: "const"
    },
    {
        question: "How do we stop an interval timer in JavaScript?",
        options: ["clearInterval", "clearTimer", "intervalOver", "None of the above"],
        correctAnswer: "clearInterval" 
    },
    {
        question: "How do we write comments in JavaScript?",
        options: ["/**/", "//", "#", "$$"],
        correctAnswer: "//"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeRemaining = 30;
letquizOver = false;
//Retrieving elements from the HTML
const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-button");

const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result");
const timeContainer = document.getElementById("time");
const nextButton = document.getElementById("next-button");

const gameOverContainer = document.getElementById("game-over-container");
const finalScoreContainer = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-button");
//Event listners for buttons
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
submitButton.addEventListener("click", saveScore);
//Function to start the quiz
function startQuiz() {
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    quizOver = false;

    loadQuestion();
    startTimer();
}
//Function to load a question
function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionContainer.textContent = currentQuizData.question;

    optionsContainer.innerHTML = "";
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

}
//Function to the answers
function checkAnswer(selectedOption) {
    const currentQuizData = quizData[currentQuestion];
    clearInterval(timer);

    if(selectedOption === currentQuizData.correctAnswer) {
        score++;
    } else {
        //Subtract 5 seconds for every wrong answer
        timeRemaining -= 5;
        if (timeRemaining < 0) {
            timeRemaining = 0;
        }
    }
    
    optionsContainer.classList.add("disabled");
    resultContainer.textContent = `Your score: ${score}/${quizData.length}`;
    nextButton.style.display = "block";
}
//Function to move to the next question
function nextQuestion() {
    optionsContainer.classList.remove("disabled");
    resultContainer.textContent = "";
    nextButton.style.display = "none";
    

    currentQuestion++;
    if(currentQuestion < quizData.length) {
        loadQuestion();
        startTimer();
    } else {
        endQuiz();
    }
    
}
//Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeContainer.textContent = timeRemaining;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}
//Function to end quiz and show final score
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
    finalScoreContainer.textContent.Content = `Your final score: ${score}/${quizData,length}`;
    //Hide the start container when the quiz is over
    startContainer.style.display = "none";
    quizOver = true;
}
//Function to save the score 
function saveScore() {
    const initials = initialsInput.value.toUpperCase();
    //Save initials to local storage
    alert(`Score saved: ${initials} - ${score}/${quizData.length}`);
}




