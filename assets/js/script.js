// Declare variables
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

var storedScores = [{}];
var topScores = [{}];

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
        userScore = "";
        initials = "";
        topScores = "";
        question = "";
        timeLeft = 30;
        questionNumber = 0;
        renderStartPage();
    }
};




// Function Expressions:

var renderStartPage = function(event) {
    console.log("started renderStartPage")
    removeTimer();
    hidePage();


    var scoresBtn = document.getElementById("btnHighScore");
    if (scoresBtn) {
        scoresBtn.removeAttribute("id");
        scoresBtn.textContent = "High Scores";
        scoresBtn.addEventListener("click", renderHighScorePage);
    }

    var startHeader = document.createElement("h2");
    if (startHeader) {
        startHeader.innerText = "Click Start to Begin";
        startHeader.setAttribute("id", "question-header");
    }

    var startBtn = document.createElement("button");
    if (startBtn) {
        startBtn.textContent = "START";
        startBtn.setAttribute("id", "start");
        startBtn.className = "btn";
        startBtn.type = "button";
        startBtn.addEventListener("click", renderQuizPage);
    }

    var mainContent = document.getElementById("quiz");
    if (mainContent) {
        mainContent.appendChild(startHeader);
        mainContent.appendChild(startBtn);
        console.log("Rendered mainContent");
    }

    return;
};

var renderQuizPage = function() {

    hidePage();

    var questionHeader = document.createElement("h2");
    if (questionHeader) {
        questionHeader.setAttribute("id", "question-header");
        // questionHeader.textContent = "Question #" + questionNumber;
        console.log("questionHeader");
    }

    var questionText = document.createElement("p");
    if (questionText) {
        questionText.setAttribute("id", "responses");
        questionText.className = "questions";
        // questionText.textContent = "";
        console.log("questionText");
    }

    var btnTrue = document.createElement("button");
    if (btnTrue) {
        btnTrue.setAttribute("id", "true");
        btnTrue.className = "answer";
        btnTrue.setAttribute("type", "button");
        btnTrue.textContent = "True";
        console.log("btnTrue");
    }

    var btnFalse = document.createElement("button");
    if (btnFalse) {
        btnFalse.setAttribute("id", "false");
        btnFalse.className = "answer";
        btnFalse.setAttribute("type", "button");
        btnFalse.textContent = "False";
        console.log("btnFalse");
    }

    var mainContent = document.getElementById("quiz");
    if (mainContent) {
        mainContent.appendChild(questionHeader)
        mainContent.appendChild(questionText);
        mainContent.appendChild(btnTrue);
        mainContent.appendChild(btnFalse);
        console.log("rendered quizPage")
    };

    var timer = document.createElement("span");
    if (timer) {
        timer.setAttribute("id", "timer");
        console.log(timer);
    }

    var timerDiv = document.getElementById("timer-div");
    if (timerDiv) {
        timerDiv.appendChild(timer);
    };

    function countdown() {
        if (timeLeft === 0) {
            clearTimeout(timerId);
            timer.textContent = "Time Remaining: 0"
            console.log(timeLeft);
            console.log("removed children'hideQuizPage'");
            renderInitialsInput();
        } else {
            timer.textContent = "Time Remaining: " + timeLeft;
        }
        timeLeft--;
    };
    var timerId = setInterval(countdown, 1000);

    var stopBtn = document.querySelector("#btnHighScore");
    stopBtn.textContent = "Stop Quiz";
    stopBtn.addEventListener("click", function() {
        if (stopBtn) {
            console.log("clearing timer");
            clearTimeout(timerId);
            renderStartPage();
        };
    });

    return;
};

var renderInitialsInput = function(event) {
    removeTimer();
    hidePage();

    var pageHeader = document.createElement("h2");
    if (pageHeader) {
        pageHeader.setAttribute("id", "question-header");
        pageHeader.textContent = "Enter your initials for your score rank:";
    }

    var textInput = document.createElement("input");
    if (textInput) {
        textInput.setAttribute("id", "userName");
        textInput.setAttribute("placeholder", "Enter name or initials");
    }

    var btnSubmit = document.createElement("button");
    if (btnSubmit) {
        btnSubmit.setAttribute("id", "submitName");
        btnSubmit.className = "btn";
        btnSubmit.textContent = "Submit";
        btnSubmit.setAttribute("type", "button");
        btnSubmit.querySelector("#submitName");
        btnSubmit.addEventListener("click", function() {
            var initials = textInput.value;
            console.log(initials);
            if (initials) {
                textInput.value = "";
                renderHighScorePage();
            } else {
                alert("Please enter name or initials, or click High Scores");
            }
        });
    }

    var mainContent = document.getElementById("quiz");
    if (mainContent) {
        mainContent.appendChild(pageHeader);
        mainContent.appendChild(textInput);
        mainContent.appendChild(btnSubmit);
        console.log("rendered initialsPage")
    }

    console.log("reached the end of initials")
    var scoresBtn = document.querySelector("#btnHighScore");
    scoresBtn.addEventListener("click", renderHighScorePage);

    return;
};

var renderHighScorePage = function() {
    hidePage();
    // removeTimer();
    console.log("high scores")

    var homeBtn = document.querySelector("#btnHighScore");
    if (homeBtn) {
        homeBtn.textContent = "Home";
        homeBtn.addEventListener("click", renderStartPage);
    }

    var listHeader = document.createElement("h2");
    if (listHeader) {
        listHeader.setAttribute("id", "question-header");
        listHeader.textContent = "Top Scores: ";
    }

    var listScores = document.createElement("ol");
    if (listScores) {
        listScores.setAttribute("id", "list");
    }

    var mainContent = document.getElementById("quiz");
    if (mainContent) {
        mainContent.appendChild(listHeader);
        mainContent.appendChild(listScores);
    };

    // var listRank1 = document.createElement("li");
    // listRank1.setAttribute("id", "list-item-1");
    // listRank1.className = "list-item";

    // var listRank2 = document.createElement("li");
    // listRank2.setAttribute("id", "list-item-2");
    // listRank2.className = "list-item";

    // var listRank3 = document.createElement("li");
    // listRank3.setAttribute("id", "list-item-3");
    // listRank3.className = "list-item";

    // var listRank4 = document.createElement("li");
    // listRank4.setAttribute("id", "list-item-4");
    // listRank4.className = "list-item";

    // var listRank5 = document.createElement("li");
    // listRank5.setAttribute("id", "list-item-5");
    // listRank5.className = "list-item";
    topScores = JSON.parse(window.localStorage.getItem('storedScores'));

    if (topScores) {
        for (var i = 0; i < topScores.length; i++) {
            var listRank = document.createElement("li");
            listRank.setAttribute("id", [i] + 1);
            listRank.className = "list-item";
            if (listRank) {
                listRank[i].textContent = topScores.name + " score: " + topScores.score;
                listScores.appendChild(listRank[i] + 1);
                console.log("top scores if portion");
            }
        };
    } else {
        var noScores = document.createElement("p");
        noScores.setAttribute("id", "noScores");
        noScores.className = "list-item";
        noScores.textContent = "No scores stored.";
        listScores.appendChild(noScores);
        console.log("top scores else portion");
    };
    return;
};


// var startBtn = document.addEventListener("click", renderQuizPage);
// var homeBtn = document.addEventListener("click", renderStartPage);
// var scoresBtn = document.addEventListener("click", renderHighScorePage);

renderStartPage();
// renderQuizPage();
// renderInitialsInput();
// renderHighScorePage();