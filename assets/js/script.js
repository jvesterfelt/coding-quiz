// Declare variables
var startBtn = document.querySelector("#start");
var homeBtn = document.querySelector("#home");
var scoresBtn = document.querySelector("#btnHighScore");
var stopBtn = document.querySelector("#stop");
var btnTrue = document.querySelector("#true");
var btnFalse = document.querySelector("#false");
var btnSubmit = document.querySelector("#submitName");

var mainContent = document.getElementById("quiz");

var questionNumber = 0;
var timeLeft = 30;
var userScore = 0;
var question = "";
var initials = "";
var currentPage = "";

// Array variables
var questions = [{
        q: "Array content is placed within brackets.",
        a: true
    },
    {
        q: "Object elements are placed within curly brackets.",
        a: true
    },
    {
        q: "Elements of arrays and objects are delimited with a semicolon.",
        a: false
    },
    {
        q: "The function name is omitted from the function expression and creates an anonymous function.",
        a: true
    },
    {
        q: "Javascript uses is a programming language.",
        a: false
    }
];

var topScores = [{
        name: "",
        score: 0,
    },
    {
        name: "",
        score: 0,
    },
    {
        name: "",
        score: 0,
    },
    {
        name: "",
        score: 0,
    },
    {
        name: "",
        score: 0,
    }
];
// Declared Functions
function hidePage() {
    var pageContent = document.getElementById("quiz");
    if (pageContent) {
        pageContent.innerHTML = "";
    }
    return;
};

function removeTimer() {
    var timerContent = document.getElementById("timer-div");
    if (timerContent) {
        timerContent.innerHTML = "";
    }
};

function reset() {
    var pageContent = document.getElementById("quiz");
    if (pageContent) {
        pageContent.innerHTML = "";
        renderStartPage();
    }
}


// Function Expressions:

var renderStartPage = function(event) {
    event.preventDefault();
    removeTimer();

    var startHeader = document.createElement("h2");
    startHeader.innerText = "Click Start to Begin";
    startHeader.setAttribute("id", "question-header");
    console.log(startHeader);

    var startBtn = document.createElement("button");
    startBtn.textContent = "START";
    startBtn.setAttribute("id", "start");
    startBtn.className = "btn";
    startBtn.type = "button";
    console.log(startBtn);

    var mainContent = document.getElementById("quiz");
    if (mainContent) {
        mainContent.appendChild(startHeader);
        mainContent.appendChild(startBtn);
        console.log("Rendered highStartPage")
    }

    var scoresBtn = document.addEventListener("click", renderHighScorePage);
};

var renderQuizPage = function(event) {
    // event.preventDefault();
    hidePage();

    var questionHeader = document.createElement("h2");
    questionHeader.setAttribute("id", "question-header");
    questionHeader.textContent = "Question #" + questionNumber;
    console.log(questionHeader);

    var questionText = document.createElement("p");
    questionText.setAttribute("id", "responses");
    questionText.className = "questions";
    questionText.textContent = questions[0].q;
    console.log(questionText);

    var btnTrue = document.createElement("button");
    btnTrue.setAttribute("id", "true");
    btnTrue.className = "answer";
    btnTrue.setAttribute("type", "button");
    btnTrue.textContent = "True";
    console.log(btnTrue);

    var btnFalse = document.createElement("button");
    btnFalse.setAttribute("id", "false");
    btnFalse.className = "answer";
    btnFalse.setAttribute("type", "button");
    btnFalse.textContent = "False";
    console.log(btnFalse);

    var timer = document.createElement("span");
    timer.setAttribute("id", "timer");
    console.log(timer);



    var mainContent = document.getElementById("quiz");
    if (mainContent) {
        mainContent.appendChild(questionHeader)
        mainContent.appendChild(questionText);
        mainContent.appendChild(btnTrue);
        mainContent.appendChild(btnFalse);
        console.log("rendered quizPage")
    }
    var timerDiv = document.getElementById("timer-div");
    if (timerDiv) {
        timerDiv.appendChild(timer);
    }

    function countdown() {
        if (timeLeft === 0) {
            clearTimeout(timerId);
            timer.textContent = "Time Remaining: 0"
            console.log(timeLeft);
            hidePage();
            console.log("removed children'hideQuizPage'");
            renderInitialsInput();
        } else {
            timeLeft--;
            timer.textContent = "Time Remaining: " + timeLeft;
        }
    };
    var timerId = setInterval(countdown, 10);

    var scoresBtn = document.addEventListener("click", renderHighScorePage);
    var stopBtn = document.addEventListener("click", renderStartPage);
};

var renderInitialsInput = function(event) {
    removeTimer();

    var pageHeader = document.createElement("h2");
    pageHeader.setAttribute("id", "question-header");
    pageHeader.textContent = "Enter your initials for your score rank:";

    var textInput = document.createElement("input");
    textInput.setAttribute("id", "userName");
    textInput.setAttribute("placeholder", "Enter name or initials");

    var btnSubmit = document.createElement("button");
    btnSubmit.setAttribute("id", "submitName");
    btnSubmit.className = "btn";
    btnSubmit.textContent = "Submit";
    btnSubmit.setAttribute("type", "button");

    var mainContent = document.getElementById("quiz");
    if (mainContent) {
        mainContent.appendChild(pageHeader);
        mainContent.appendChild(textInput);
        mainContent.appendChild(btnSubmit);
        console.log("rendered initialsPage")
    }

    var btnSubmit = document.addEventListener("click", function() {
        initials = document.querySelector("input[id='userName']").value;
        if (initials) {
            topScores = {
                name: initials,
                score: userScore,
            }
        }
    });
    var scoresBtn = document.addEventListener("click", renderHighScorePage);

};

var renderHighScorePage = function() {
    // hidePage();
    removeTimer();

    var listHeader = document.createElement("h2");
    listHeader.setAttribute("id", "question-header");
    listHeader.textContent = "Top Scores:";

    var listScores = document.createElement("ol");
    listScores.setAttribute("id", "list");

    var listRank1 = document.createElement("li");
    listRank1.setAttribute("id", "list-item-1");
    listRank1.className = "list-item";

    var listRank2 = document.createElement("li");
    listRank2.setAttribute("id", "list-item-2");
    listRank2.className = "list-item";

    var listRank3 = document.createElement("li");
    listRank3.setAttribute("id", "list-item-3");
    listRank3.className = "list-item";

    var listRank4 = document.createElement("li");
    listRank4.setAttribute("id", "list-item-4");
    listRank4.className = "list-item";

    var listRank5 = document.createElement("li");
    listRank5.setAttribute("id", "list-item-5");
    listRank5.className = "list-item";

    listScores.appendChild(listRank1);
    listScores.appendChild(listRank2);
    listScores.appendChild(listRank3);
    listScores.appendChild(listRank4);
    listScores.appendChild(listRank5);

    var mainContent = document.getElementById("quiz");
    mainContent.appendChild(listHeader);
    mainContent.appendChild(listScores);

    var homeBtn = document.getElementById("btnHighScore");
    homeBtn.textContent = "Home";
    homeBtn.addEventListener("click", renderStartPage);

};


var startBtn = document.addEventListener("click", renderQuizPage);
var homeBtn = document.addEventListener("click", renderStartPage);
var scoresBtn = document.addEventListener("click", renderHighScorePage);

// renderStartPage();
renderQuizPage();
// renderInitialsInput();
// renderHighScorePage();