$(document).ready(function() {
    
    var startScreen;
    var gameDisplay;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var questionCounter = 0;
    var counter = 30;
    var clock;
    var selected;
    var questions = [
        {
            question: "At the start of the TV series, who is the king of the Seven Kingdoms?",
            answers: [
                {choice: "Robert Baratheon", isCorrect: true},
                {choice: "Rhaegar Targaryen", isCorrect: false},
                {choice: "Eddard Stark", isCorrect: false},
                {choice: "Stannis Baratheon", isCorrect: false}
            ]
        },
        {
            question: "What is the name of Jon Snow's direwolf?",
            answers: [
                {choice: "Summer", isCorrect: false},
                {choice: "Nymeria", isCorrect: false},
                {choice: "Ghost", isCorrect: true},
                {choice: "Grey Wind", isCorrect: false}
            ]
        },
        {
            question: "What are the names of Daenerys' three dragons?",
            answers: [
                {choice: "Meraxes, Rhaegal, and Vhagar", isCorrect: false},
                {choice: "Drogon, Viserion, and Rhaegal", isCorrect: true},
                {choice: "Drogon, Balerion, and Viserion", isCorrect: false},
                {choice: "Meraxes, Vhagar, and Balerion", isCorrect: false}
            ]
        },
        {
            question: "What is the sigil of House Stark?",
            answers: [
                {choice: "Direwolf", isCorrect: true},
                {choice: "Dragon", isCorrect: false},
                {choice: "Lion", isCorrect: false},
                {choice: "Stag", isCorrect: false}
            ]
        },
        {
            question: "What is the common nickname for Jaime Lannister?",
            answers: [
                {choice: "Oathkeeper", isCorrect: false},
                {choice: "Oathbreaker", isCorrect: false},
                {choice: "Queenslayer", isCorrect: false},
                {choice: "Kingslayer", isCorrect: true}
            ]
        },
        {
            question: "Who is known as the King Beyond the Wall?",
            answers: [
                {choice: "Stannis Baratheon", isCorrect: false},
                {choice: "Mance Rayder", isCorrect: true},
                {choice: "The Night King", isCorrect: false},
                {choice: "Tormund Giantsbane", isCorrect: false}
            ]
        },
        {
            question: "Where does Arya go to train to become a Faceless Man?",
            answers: [
                {choice: "Meereen", isCorrect: false},
                {choice: "Astapor", isCorrect: false},
                {choice: "Pentos", isCorrect: false},
                {choice: "Braavos", isCorrect: true}
            ]
        },
        {
            question: "Which continent does most of the action in Game of Thrones take place?",
            answers: [
                {choice: "Westeros", isCorrect: true},
                {choice: "Essos", isCorrect: false},
                {choice: "Sothoryos", isCorrect: false},
                {choice: "Northeros", isCorrect: false}
            ]
        },
        {
            question: "What are the freefolk beyond the wall known as?",
            answers: [
                {choice: "barbarians", isCorrect: false},
                {choice: "savages", isCorrect: false},
                {choice: "wildings", isCorrect: true},
                {choice: "bloodriders", isCorrect: false}
            ]
        },
        {
            question: "Who are the creators of the Game of Thrones TV series?",
            answers: [
                {choice: "Emilia Clarke and Sean Bean", isCorrect: false},
                {choice: "Jonathan Nolan and Lisa Joy", isCorrect: false},
                {choice: "Carter Bays and Craig Thomas", isCorrect: false},
                {choice: "David Benioff and D.B. Weiss", isCorrect: true}
            ]
        }
    ];

    function startScreen() {
        var startText = "<p>Test your Game of Thrones knowledge!</p>"
        var startButton = "<button class='startButton btn btn-danger' type='button'>Start Quiz</button>"
        startScreen = startText + startButton;
        $("#content").html(startScreen);
    }

    function generateHTML() {
        var timeRemaining = "<p>Time remaining: <span id='timer'>30</span></p>";
        var questionDisplay = "<p>" + questions[questionCounter].question + "</p>";
        gameDisplay = timeRemaining + questionDisplay;
        $("#content").html(gameDisplay);
        for (i = 0; i < questions[questionCounter].answers.length; i++) {
            var answerButton = $("<button>");
            answerButton.addClass("answer btn btn-danger btn-block text-center");
            answerButton.attr("isCorrect", questions[questionCounter].answers[i].isCorrect);
            answerButton.html(questions[questionCounter].answers[i].choice)
            $("#content").append(answerButton);
        }
    }

    function win() {
        correctAnswers++;
        var correct = "<p>Correct!</p>";
        gameDisplay = correct;
        $("#content").html(gameDisplay);
        setTimeout(displayNext, 3000);
    }

    function loss() {
        incorrectAnswers++;
        var incorrect = "<p>Incorrect!</p>";
        gameDisplay = incorrect;
        $("#content").html(gameDisplay);
        setTimeout(displayNext, 3000);
    }

    function lossTimeout() {
        unansweredQuestions++;
        var timeout = "<p>Time's up!</p>";
        gameDisplay = timeout;
        $("#content").html(gameDisplay);
        setTimeout(displayNext, 3000);
    }

    function timer() {
        clock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(clock);
                lossTimeout();
            } else if (counter > 0) {
                counter --;
            }
            $("#timer").html(counter);
        }
    }

    function displayNext() {
        if (questionCounter < questions.length - 1) {
            questionCounter++;
            generateHTML();
            counter = 30;
            timer();
        } else {
            lastScreen();
        }
    }

    function lastScreen() {
        var endGame = "<p>Here's a summary of how you did: </p>";
        var correctSummary = "<p>Correct answers: " + correctAnswers + "</p>";
        var incorrectSummary = "<p>Incorrect answers: " + incorrectAnswers + "</p>";
        var unansweredSummary = "<p>Unanswered questions: " + unansweredQuestions + "</p>";
        var resetButton = "<button class='resetButton btn btn-danger' type='button'>Play again</button>";
        gameDisplay = endGame + correctSummary + incorrectSummary + unansweredSummary + resetButton;
        $("#content").html(gameDisplay);
    }

    function reset() {
        questionCounter = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        counter = 30;
        generateHTML();
        timer();
    }

    $("body").on("click", ".startButton", function() {
        generateHTML();
        timer();
    })

    $("body").on("click", ".answer", function() {
        selected = $(this).attr("isCorrect");

        if (selected === "true") {
            clearInterval(clock);
            win();
        } else {
            clearInterval(clock);
            loss();
        }
    })

    $("body").on("click", ".resetButton", function() {
        reset();
    })

    startScreen();


});