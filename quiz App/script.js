const quizData = [
    {
        question: "what is your name",
        a: 1,
        b: 2,
        c: 2,
        d: 9

    },
    {
        question: "what is your age",
        a: 1,
        b: 2,
        c: 2,
        d: 9

    }
];
let currentQuiz = 0
let score = 0
const questionEl = document.getElementById("question")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const sumbitBtn = document.getElementById("submit")

loadQuiz();
function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question

    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    const answersEls = document.querySelectorAll(".answer");
    let answer =undefined;
    answersEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer= answerEl.id
        }
        return answer
    })
}

sumbitBtn.addEventListener("click", () => {
    const answer = getSelected()
    if (answer) {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        }
        else {
            alert("You Finished the quiz")
        }
    }
})