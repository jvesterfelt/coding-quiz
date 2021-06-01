// Set mainContent
var mainContent = document.getElementById("quiz");


// Declare variables
var userResponse = "";
var timeLeft = 30;
var userScore = 0;
var initials = "";
var curPage = "";
var topScores = [];
var tempTopScores = [];


// Declared Functions
function hidePage() {
    var pageContent = document.getElementById("quiz");
    if (pageContent) {
        pageContent.innerHTML = "";
    }
};

function removeTimer() {
    var timerContent = document.getElementById("timer-div");
    if (timerContent) {
        timerContent.innerHTML = "";
    }
};

function reset() {
    userScore = 0;
    initials = "";
    topScores = [];
    timeLeft = 30;
};

// Create and set persistent nav button
var navButton = function() {
    var navBtn = document.querySelector("#btnHighScore");

    if (curPage === "high-score" || curPage === "initials") {
        navBtn.removeEventListener("click", renderHighScorePage);
        navBtn.removeEventListener("click", renderInitialsInput);
        navBtn.textContent = "Home";
        navBtn.addEventListener("click", renderStartPage);
    } else if (curPage === "quiz") {
        navBtn.removeEventListener("click", renderStartPage);
        navBtn.removeEventListener("click", renderHighScorePage);
        navBtn.textContent = "Stop Quiz";
        navBtn.addEventListener("click", function() {
            clearInterval(window.timerId);
            console.log("cleared timer ", window.timerId, timeLeft);
            timeLeft = 30;
            console.log("timeLeft reset ", timeLeft);
            renderInitialsInput();
        });
    } else {
        if (navBtn) {
            navBtn.removeEventListener("click", renderStartPage);
            navBtn.removeEventListener("click", renderInitialsInput);
            navBtn.textContent = "High Scores";
            navBtn.addEventListener("click", renderHighScorePage);
        }
    }
};

var scoresList = function(listScores) {
    topScores = JSON.parse(window.localStorage.getItem('topScores'));

    if (topScores) {
        console.log("scores");
        for (var i = 0; i < topScores.length; i++) {
            var listRank = document.createElement("li");
            listRank.setAttribute("id", [i]);
            listRank.className = "list-item";
            if (listRank) {
                listRank.textContent = "Name: " + topScores[i].Name + " Score: " + topScores[i].Score;
                listScores.appendChild(listRank);
            }
        };
    } else {
        var noScores = document.createElement("p");
        noScores.setAttribute("id", "noScores");
        noScores.className = "list-item";
        noScores.textContent = "No scores stored.";
        listScores.appendChild(noScores);
    };
};

// Function Expressions:
var renderStartPage = function(event) {
    curPage = "start";
    removeTimer();
    hidePage();
    reset();
    navButton();

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
    }
};

var renderQuizPage = function() {
    var i = 0;
    curPage = "quiz";

    hidePage();
    navButton();
    quizTimer();

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
            q: "Javascript is a programming language.",
            a: false
        }
    ];

    var questionHeader = document.createElement("h2");
    if (questionHeader) {
        questionHeader.setAttribute("id", "question-header");
        console.log("questionHeader");
    }

    var questionText = document.createElement("p");
    if (questionText) {
        questionText.setAttribute("id", "responses");
        questionText.className = "questions";
        console.log("questionText");
    }

    var mainContent = document.getElementById("quiz");
    if (mainContent) {
        mainContent.appendChild(questionHeader)
        mainContent.appendChild(questionText);
    };


    questionHeader.textContent = "Question #" + (i + 1) + ":";
    questionText.textContent = questions[i].q;


    var btnTrue = document.createElement("button");
    btnTrue.setAttribute("id", "true");
    btnTrue.className = "answer";
    btnTrue.setAttribute("type", "button");
    btnTrue.textContent = "True";
    btnTrue.addEventListener("click", function() {
        userResponse = true;
        console.log("user response: ", userResponse);
        if (userResponse === questions[i].a) {
            userScore = userScore + 10;
        } else {
            timeLeft = timeLeft - 5;
        }
        if (i < 4) {
            console.log("userScore", userScore, i);
            i++;
            questionHeader.textContent = "Question #" + (i + 1) + ":";
            questionText.textContent = questions[i].q;
        } else {

            renderInitialsInput();
        }
    });

    var btnFalse = document.createElement("button");
    btnFalse.setAttribute("id", "false");
    btnFalse.className = "answer";
    btnFalse.setAttribute("type", "button");
    btnFalse.textContent = "False";
    btnFalse.addEventListener("click", function() {
        userResponse = false;
        console.log("user response ", userResponse, i);
        if (userResponse === questions[i].a) {
            userScore = userScore + 10;
        } else {
            timeLeft = timeLeft - 5;
        }
        if (i < 4) {
            console.log("userScore", userScore, i);
            i++;
            questionHeader.textContent = "Question #" + (i + 1) + ":";
            questionText.textContent = questions[i].q;
        } else {

            renderInitialsInput();
        }
    });

    mainContent.appendChild(questionHeader);
    mainContent.appendChild(questionText);
    mainContent.appendChild(btnTrue);
    mainContent.appendChild(btnFalse);
};

var renderInitialsInput = function() {
    curPage = "initials";
    removeTimer();
    hidePage();
    navButton();

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
            if (initials) {
                tempTopScores.push({ Name: initials, Score: userScore });
                tempTopScores.sort(function(a, b) {
                    reset();
                    return b.Score - a.Score;
                });
                topScores = tempTopScores.slice(0, 5);
                localStorage.setItem("topScores", JSON.stringify(topScores));
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
    }
};

var renderHighScorePage = function() {
    curPage = "high-score";

    hidePage();
    removeTimer();
    reset();
    navButton();


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

    scoresList(listScores);
};

var quizTimer = function() {
    var timer = document.createElement("span");
    if (timer) {
        timer.setAttribute("id", "timer");
    }

    var timerDiv = document.getElementById("timer-div");
    if (timerDiv) {
        timerDiv.appendChild(timer);
    };

    function countdown() {
        if (timeLeft <= 0) {
            clearTimeout(window.timerId);
            console.log("timer cleared", window.timerid, timeLeft);
            timer.textContent = "Time Remaining: 0"
            renderInitialsInput();
        } else {
            timer.textContent = "Time Remaining: " + timeLeft;
        }
        timeLeft--;
    };
    window.timerId = setInterval(countdown, 1000);
};


renderStartPage();