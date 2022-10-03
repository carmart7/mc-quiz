// declare variables of
    // array of question objects [{question (string), choices (array of string), which index of array is correct}, ...]
    // choice buttons - selects all choice buttons
var questions = [
    {
        question: "How did the chicken cross the road",
        choices: [
            "Space ship",
            "Uber",
            "It didn't",
            "Teleported"
        ],
        answerIndex: 2
    },
    {
        question: "How did the alien cross the road",
        choices: [
            "Space ship",
            "Uber",
            "It didn't",
            "Teleported"
        ],
        answerIndex: 0
    },
    {
        question: "How did the enderman cross the road",
        choices: [
            "Space ship",
            "Uber",
            "It didn't",
            "Teleported"
        ],
        answerIndex: 3
    }
]
var questionElement = document.querySelector("#question");
var choiceButtonsElements = document.querySelectorAll(".choice");
var startButtonElement = document.querySelector("#start");
var timerElement = document.querySelector("#timer");
var questionDivElement = document.querySelector("#quiz-going");

var currentQuestion = 0;
var correctQuestions = 0;
var timeLeft = 0;
var quizDone = false;
// start button begins timer
    // with timer started, hide the quiz-begin div and show the quiz-going div
    // replace elements in quiz-begun div with first question
startButtonElement.addEventListener('click', function(){
    timeLeft = 10;
    timerElement.textContent = `Time: ${timeLeft}`;
    var timeInterval = setInterval(function() {
        --timeLeft;
        timerElement.textContent = `Time: ${timeLeft}`;
        if(timeLeft === 0){
            clearInterval(timeInterval);
        }
    }, 1000);
});

startButtonElement.addEventListener('click', function () {
    questionElement.textContent = questions[0].question;
    choiceButtonsElements.forEach(function (e, i){
        e.textContent = questions[0].choices[i];
    });
});

// when one of the buttons is clicked, check to see if the button clicked was the right answer (
    // (compare button-choice to object.anwer)
        // if right, increase correctCounter by one and display that it was correct
        // if wrong, display that it was wrong
        // if final question is answered, move on to let the user enter initials.
choiceButtonsElements.forEach(function (element) {
    element.addEventListener('click', function() {
        if(element.getAttribute("data-choice") == questions[currentQuestion]?.answerIndex) {
            console.log("THATS RIGHT!")
        } else {
            console.log("THATS WRONG!")
        }
        if(currentQuestion == questions.length-1) {
            questionDivElement.classList.add("display-none")
        }
        ++currentQuestion;
    });
});
// Let user enter initials to save their score for the leader boards 
    // Save to local storage userScore object of initials, answered correctly, and time left.
    // once saved, reset answered correctly counter and set time to 0.
    // display on leaderboard
// Give options for user to go back to main page and reset the leaderboards
