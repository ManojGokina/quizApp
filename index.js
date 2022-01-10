const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const result = document.getElementById("result");
const scoreText = document.getElementById("score-text");

let currentQuestion = [];
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questionsList = [
    {
        Question: "What is the full form of HTML?",
        choice1: "HyperText Markup Language",
        choice2: "HyperTally Markup Language",
        choice3: "HyperText Marking Language",
        choice4: "HyperText Makeup Language",
        answer: 1
    },
    {
        Question: "Which HTML tag is used to link the javaScript?",
        choice1: "<js>",
        choice2: "<javaScript>",
        choice3: "<script>",
        choice4: "<scripting>",
        answer: 3
    },
    {
        Question: "Which language is used for styling the web pages?",
        choice1: "HTML",
        choice2: "CSS",
        choice3: "JAVA",
        choice4: "C++",
        answer: 2
    }
]

const correctAnswerMark = 5;
const maxQuestions = 3;

var seconds = 30;
function countdown() { 
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML ="Time:" + "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            window.location.href = 'finalScreen.html';
        }
    }
    tick();
};

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionsList];
    console.log(availableQuestions.length)
    getNewQuestion();
    countdown();
}



getNewQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[questionIndex]?.Question;
    const questionData = availableQuestions[questionIndex]
    correctAnswer = availableQuestions[questionIndex]?.answer;
    question.innerText = currentQuestion;

    choices.forEach(choice => {
        const number = "choice" + choice.dataset['number'];
        choice.innerText = questionData && questionData[number] ? questionData[number] : null;
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const resultToApply = selectedAnswer == correctAnswer ? "correct" : "incorrect";
        result.innerText = resultToApply;

        if (resultToApply === "correct") {
            incrementScore(correctAnswerMark);
        }else{
          seconds =  seconds - 10;
        };

        localStorage.setItem('highestScore', score);

        if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
            window.location.href = 'finalScreen.html';
        }else{
            getNewQuestion();
        }    
    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

getNewQuestion();

startGame();