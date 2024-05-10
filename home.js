const questions = [
  {
    question: "What is the capital city of  the philippines?",
    answers: [
      {
        text: "Cebu",
        correct: false,
      },
      {
        text: "Baguio",
        correct: false,
      },
      {
        text: "Manila",
        correct: true,
      },
      {
        text: "Rizal",
        correct: false,
      },
    ],
  },
  {
    question: " Where is Mayon Volcano located?",
    answers: [
      {
        text: "Legazpi City, Albay",
        correct: true,
      },
      {
        text: "Batangas City",
        correct: false,
      },
      {
        text: "Zambales",
        correct: false,
      },
      {
        text: "Lanao del Sur",
        correct: false,
      },
    ],
  },
  {
    question: "Who was the first Filipina crowned as Miss Universe?",
    answers: [
      {
        text: "Margarita Moran",
        correct: false,
      },
      {
        text: "Gloria Diaz",
        correct: true,
      },
      {
        text: "Catriona Gray",
        correct: false,
      },
      {
        text: "Pia Wurtzbach",
        correct: false,
      },
    ],
  },
  {
    question: "How many islands in the philippines?",
    answers: [
      {
        text: "7,680",
        correct: false,
      },
      {
        text: "7,641",
        correct: true,
      },
      {
        text: "7,741",
        correct: false,
      },
      {
        text: "7,751",
        correct: false,
      },
    ],
  },
  {
    question: "How many countries colonized and invaded the Philippines?",
    answers: [
      {
        text: "Three",
        correct: true,
      },
      {
        text: "Two",
        correct: false,
      },
      {
        text: "Five",
        correct: false,
      },
      {
        text: "Four",
        correct: false,
      },
    ],
  },
];

//-------------------------getting dom manipulation elements-----------------------

const questionText = document.getElementById("question-text");
const answerButtonsAll = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");
const outOfText = document.getElementById("out-of-text");
const botDiv = document.getElementById("bot-div");
const correctScore = document.getElementById("correct-score");
const noOfItems = document.getElementById("no-of-items");
const slashEl = document.getElementById("slash");
const itemsResult = document.getElementById("items-result");
const timerEl = document.getElementById("timer");
const headerEl = document.getElementById("header");
const appEl = document.getElementById("app");
let currerntQuestionIndex = 0;
let score = 0;
let items = questions.length;
let startCountDown = 15;
timerEl.textContent = startCountDown;
let timerInterval = setInterval(startTimer, 1000);

//----------------------------startQuiz function-----------------------------

function startQuiz() {
  currerntQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  itemsResult.classList.remove("hide");
  timerEl.classList.remove("hide");
  headerEl.classList.remove("hide");
  appEl.style.justifyContent = "center";
  questionText.classList.remove("text-align-center");

  //----running the showQuestion function which display the questions------
  showQuestion();
}

//------------------------------showQuestion function------------------------

function showQuestion() {
  //-----running resetState function----------------------------------------
  resetState();
  correctScore.textContent = score;
  noOfItems.textContent = items;
  let outofTextNumber = currerntQuestionIndex + 1;
  let currerntQuestion = questions[currerntQuestionIndex];
  let questionNumber = currerntQuestionIndex + 1; //0+1=1
  outOfText.innerHTML = `${outofTextNumber} of ${items} Questions`;
  outOfText.classList.remove("hide");
  botDiv.style.justifyContent = "space-between";
  questionText.innerHTML = `${questionNumber} . ${currerntQuestion.question}`;

  let eachAnswer = currerntQuestion.answers;

  eachAnswer.forEach(function (values) {
    let button = document.createElement("button");
    answerButtonsAll.appendChild(button);
    button.innerHTML = values.text;
    button.classList.add("btn");

    if (values.correct) {
      button.dataset.correct = values.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

//----------------------resetState function--------------------------------

function resetState() {
  nextButton.classList.add("hide");

  while (answerButtonsAll.firstChild) {
    answerButtonsAll.removeChild(answerButtonsAll.firstChild);
  }
}

//--------------------------------selectAnswer function----------------------------

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect && startCountDown > 0) {
    selectedBtn.classList.add("correct");
    score++;
    correctScore.textContent = score;
    noOfItems.textContent = items;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtonsAll.children).forEach((button) => {
    clearInterval(timerInterval);
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.classList.remove("hide");
}

//------------------showScore function----------------------------------

function showScore() {
  resetState();
  const screenWidth = window.innerWidth;
  itemsResult.classList.add("hide");
  timerEl.classList.add("hide");

  if (screenWidth < 600) {
    headerEl.classList.add("hide");
    appEl.style.justifyContent = "center";
    questionText.classList.add("text-align-center");
  } else {
    headerEl.classList.remove("hide");
    appEl.style.justifyContent = "space-between";
    questionText.classList.add("text-align-center");
  }
  questionText.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.classList.remove("hide");

  nextButton.innerHTML = "Try Again";
  botDiv.style.justifyContent = "center";
}

//------------------handleNextButton function------------------------

function handleNextButton() {
  currerntQuestionIndex++;

  if (currerntQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

//----------------------button next addevent listener----------------------------

nextButton.addEventListener("click", () => {
  if (currerntQuestionIndex < questions.length) {
    startCountDown = 15;
    timerEl.textContent = startCountDown;
    clearInterval(timerInterval);
    timerInterval = setInterval(startTimer, 1000);
    handleNextButton();
  } else {
    startQuiz();
  }
});

//--------------------------startTimer function-----------------------------------

function startTimer() {
  startCountDown--;
  timerEl.textContent = startCountDown;
  if (startCountDown === 0) {
    clearInterval(timerInterval);
    const eachBtn = answerButtonsAll.querySelectorAll("button");
    console.log(eachBtn.length);
    for (let i = 0; i < eachBtn.length; i++) {
      eachBtn[i].disabled = true;

      Array.from(answerButtonsAll.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        } else {
          button.classList.add("incorrect");
        }
      });
    }
    nextButton.classList.remove("hide");
  }
}

//--------------------------calling the function to start and execute the apps---------------

startQuiz();
