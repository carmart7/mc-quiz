// declare variables of
    // array of question objects [{question (string), choices (array of string), which index of array is correct}, ...]
    // choice buttons - selects all choice buttons
var questions = [
    {
        question: "Does local storage get reset after refreshing the page?",
        choices: [
            "Yes",
            "Sometimes",
            "No",
            "All of the above"
        ],
        answerIndex: 2
    },
    {
        question: "Can a user modify local storage?",
        choices: [
            "Yes",
            "No",
            "Only if dev allows",
            "All of the above"
        ],
        answerIndex: 0
    },
    {
        question: "Which of the following IS NOT an array method?",
        choices: [
            "pop",
            "find",
            "map",
            "backwards"
        ],
        answerIndex: 3
    },
    {
        question: "Which of the following IS an array method?",
        choices: [
            "deleteAll",
            "deleteFirst",
            "giveSum",
            "None of the above"
        ],
        answerIndex: 3
    },
    {
        question: "Which of the following is a string method?",
        choices: [
            "slice",
            "substr",
            "replace",
            "All of the above"
        ],
        answerIndex: 3
    },
    {
        question: "Is javascript the only language that can be used on a website?",
        choices: [
            "Yes",
            "No",
            "Sometimes",
            "None of the above"
        ],
        answerIndex: 1
    },
    {
        question: "Which of the following can be used to delcare a variable?",
        choices: [
            "var",
            "let",
            "const",
            "All of the above"
        ],
        answerIndex: 3
    }
]
var choiceButtonsElements = document.querySelectorAll(".choice");
var backButtonElement = document.querySelector("#back-button");
var clearButtonElement = document.querySelector("#clear-button");
var viewHighElement = document.querySelector('#view-high');
var questionElement = document.querySelector("#question");
var startButtonElement = document.querySelector("#start");
var timerElement = document.querySelector("#timer");
var formElement = document.querySelector("form");
var startDivElement = document.querySelector("#quiz-start");
var questionDivElement = document.querySelector("#quiz-going");
var doneDivElement = document.querySelector("#quiz-done");
var scoreboardDivElement = document.querySelector('#scoreboard');
var doneMessageElement = document.querySelector('#done-message');
var form = document.querySelector("form");
var scoreList = document.querySelector('ol');


var currentQuestion = 0;
var currentScore = 0;
var timeLeft = 0;
var quizDone = true;

var finalTime;
var finalScore;
// start button begins timer
    // with timer started, hide the quiz-begin div and show the quiz-going div
    // replace elements in quiz-begun div with first question
startButtonElement.addEventListener('click', function(){
    timeLeft = 15;
    timerElement.textContent = `Time: ${timeLeft}`;
    quizDone = false;
    var timeInterval = setInterval(function() {
        if(timeLeft > 1){
            --timeLeft;
            timerElement.textContent = `Time: ${timeLeft}`;
        }else if(timeLeft <= 1 && quizDone === false){
            exitQuiz();
            clearInterval(timeInterval);
        }
    }, 1000);
});

startButtonElement.addEventListener('click', function () {
    questionElement.textContent = questions[0].question;
    choiceButtonsElements.forEach(function (e, i){
        e.textContent = questions[0].choices[i];
    });
    displayShow(questionDivElement);
    displayNone(startDivElement);
});

// when one of the buttons is clicked, check to see if the button clicked was the right answer (
    // (compare button-choice to object.anwer)
        // if right, increase correctCounter by one and display that it was correct
        // if wrong, display that it was wrong
        // if final question is answered, move on to let the user enter initials.
choiceButtonsElements.forEach(function (element) {
    element.addEventListener('click', function() {
        if(element.getAttribute("data-choice") == questions[currentQuestion]?.answerIndex) { //if choice chosen is correct
            ++currentScore;
        } else { //lower time because of incorrect answer
            timeLeft = timeLeft - 5;
        }

        if((currentQuestion == questions.length-1) || (timeLeft <= 0)) {
            exitQuiz();
        } else {
            ++currentQuestion;
            questionElement.textContent = questions[currentQuestion].question;
            choiceButtonsElements.forEach(function (e, i){
                e.textContent = questions[currentQuestion].choices[i];
            });
        }
    });
});
// Let user enter initials to save their score for the leader boards 
    // Save to local storage userScore object of initials, answered correctly time left.
    // once saved, reset answered correctly counter and set time to 0.
    // display on leaderboard
form.addEventListener('submit', function(e){
    var initials = document.querySelector('#initials').value;
    var scores = JSON.parse(localStorage.getItem("scores"));
    var userScore = {
        initials: initials,
        score: finalScore
    }
    e.preventDefault();
    if(initials) {
        displayNone(doneDivElement);
        displayShow(scoreboardDivElement);
        console.log(userScore);
        if(scores) {
            scores.push(userScore);
        } else {
            scores = [userScore];
        }
        console.log(scores);
        localStorage.setItem("scores", JSON.stringify(scores));
        displayNone(doneDivElement);
        displayShow(scoreboardDivElement);
        document.querySelector('#initials').value = '';
        loadScoreboard();
    }
});
// Give options for user to go back to main page and reset the leaderboards
backButtonElement.addEventListener('click', function () {
    displayNone(scoreboardDivElement);
    displayShow(startDivElement);
});

clearButtonElement.addEventListener('click', function () {
    var listItems = document.querySelectorAll('li');
    listItems.forEach(function (element) {
        element.remove();
    });
    localStorage.clear();
})

// view high score button from start menu only
viewHighElement.addEventListener('click', function () {
    if (timeLeft == 0) {
        displayNone(startDivElement);
        displayNone(doneDivElement);
        document.querySelector('#initials').value = '';
        displayShow(scoreboardDivElement);
    }
})

// Functions needed to operate above

function loadScoreboard(){
    var listItems = document.querySelectorAll('li');
    listItems.forEach(function (element) {
        element.remove();
    });

    var scores = JSON.parse(localStorage.getItem("scores"));
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    scores.forEach(function (e, i){
        var li = document.createElement("li");
        li.textContent = `${i+1}. ${e.initials} - ${e.score}`
        scoreList.appendChild(li);
    })
}

function displayShow(element){
    element.classList.remove('display-none')
}

function displayNone(element){
    element.classList.add('display-none')
}

function exitQuiz(){
    quizDone = true;
    displayNone(questionDivElement);
    finalScore = currentScore;
    finalTime = timeLeft;
    console.log(`Final Score was ${finalScore} with ${finalTime} seconds left`);
    timeLeft = 0;
    currentQuestion = 0;
    currentScore = 0;
    timerElement.textContent = `Time: ${timeLeft}`;
    doneMessageElement.textContent = `Your final score is ${finalScore}.`;
    displayShow(doneDivElement);
}