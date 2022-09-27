// Timer
const startMinutes = 0.1;
let time = startMinutes * 60;

const countDown = document.querySelector(".timer")
setInterval(timers,1000);
function timers(){
 
  const minutes = Math.floor(time/60);
  let seconds = time%60;
  seconds = seconds<10?'0'+ seconds : seconds;
  countDown.innerHTML = `${minutes} : ${seconds}`
  time--;
  if(time==0){
    handleEndGame();
    return;
  }
};

// Questions
const questions = [
  {
    question:"What is the full form of HTML?",
    optionA:"Hello To My Land",
    optionB:"Hey Text Markup Language",
    optionC:"HyperText Makeup Language",
    optionD:"HyperText Markup Language",
    correctOption: "optionD"
  },

  {
    question:"What is the full form of CSS?",
    optionA:"Cascading Styles Sheets",
    optionB:"Cascading Style Sheep",
    optionC:"Cartoon Styles Sheets",
    optionD:"Cascading Super Sheets",
    correctOption: "optionA"
  },
  {
    question:"What is the full form of HTTP?",
    optionA:"HyperText Transfer Product",
    optionB:"Hey Tranfer Protcol",
    optionC:"HyperText Transfer Protocol",
    optionD:"HyperText Test Protocol",
    correctOption: "optionD"
  },
  {
    question:"What is the full form of JS?",
    optionA:"JavaScript",
    optionB:"JavaSuper",
    optionC:"JustScript",
    optionD:"JordenShoes",
    correctOption: "optionA"
  },
  
  {
    question:"Javascript is an _______ language?",
    optionA:"Object-Oriented",
    optionB:"Object-Based",
    optionC:"Procedural",
    optionD:"None of the above",
    correctOption: "optionA"
  },
  {
    question:"Which of the following keywords is used to define a variable in JS?",
    optionA:"var",
    optionB:"let",
    optionC:"Both a and b",
    optionD:"None of the above",
    correctOption: "optionC"
  },
  {
    question:"How can a datatype be declared to be a constant type?",
    optionA:"const",
    optionB:"var",
    optionC:"let",
    optionD:"constant",
    correctOption: "optionA"
  },
  {
    question:"Which of the following are closures in JS?",
    optionA:"variable",
    optionB:"functions",
    optionC:"objects",
    optionD:"All of the above",
    correctOption: "optionD"
  },
  {
    question:"How to stop an interval timer in JS?",
    optionA:"clearInterval",
    optionB:"clearTimer",
    optionC:"intervalOver",
    optionD:"None of the above",
    correctOption: "optionA"
  },
  {
    question:"How do we write a comment in JS?",
    optionA:"/* */",
    optionB:"//",
    optionC:"#",
    optionD:"$$",
    correctOption: "optionB"
  },

];


let shuffledQuestions = []

function handleQuestions() { 

  while (shuffledQuestions.length <= 9) {
      const random = questions[Math.floor(Math.random() * questions.length)]
      if (!shuffledQuestions.includes(random)) {
          shuffledQuestions.push(random)
      }
  }
}


let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0


function NextQuestion(index) {
  handleQuestions()
  const currentQuestion = shuffledQuestions[index]
  document.getElementById("question-number").innerHTML = questionNumber
  document.getElementById("player-score").innerHTML = playerScore
  document.getElementById("display-question").innerHTML = currentQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber] 
  const currentQuestionAnswer = currentQuestion.correctOption
  const options = document.getElementsByName("option");
  let correctOption = null

  options.forEach((option) => {
      if (option.value === currentQuestionAnswer) {
          correctOption = option.labels[0].id
      }
  })

  if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
      document.getElementById('option-modal').style.display = "flex"
  }

  options.forEach((option) => {
      if (option.checked === true && option.value === currentQuestionAnswer) {
          document.getElementById(correctOption).style.backgroundColor = "green"
          playerScore++
          indexNumber++
          
          setTimeout(() => {
              questionNumber++
          }, 1000)
      }

      else if (option.checked && option.value !== currentQuestionAnswer) {
          const wrongLabelId = option.labels[0].id
          document.getElementById(wrongLabelId).style.backgroundColor = "red"
          document.getElementById(correctOption).style.backgroundColor = "green"
          wrongAttempt++
          indexNumber++
          
          setTimeout(() => {
              questionNumber++
          }, 1000)
      }
  })
}

function handleNextQuestion() {
  checkForAnswer()
  unCheckRadioButtons()
  setTimeout(() => {
      if (indexNumber <= 9) {
          NextQuestion(indexNumber)
      }
      else {
          handleEndGame()
      }
      resetOptionBackground()
  }, 1000);
}


function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
      document.getElementById(option.labels[0].id).style.backgroundColor = ""
  })
}


function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
      options[i].checked = false;
  }
}


function handleEndGame() {
  let remark = null
  let remarkColor = null

  
  if (playerScore <= 3) {
      remark = "Bad Grades, Keep Practicing."
      remarkColor = "red"
  }
  else if (playerScore >= 4 && playerScore < 7) {
      remark = "Average Grades, You can do better."
      remarkColor = "orange"
  }
  else if (playerScore >= 7) {
      remark = "Excellent, Keep the good work going."
      remarkColor = "green"
  }
  const playerGrade = (playerScore / 10) * 100

  //data to display to score board
  document.getElementById('remarks').innerHTML = remark
  document.getElementById('remarks').style.color = remarkColor
  document.getElementById('grade-percentage').innerHTML = playerGrade
  document.getElementById('wrong-answers').innerHTML = wrongAttempt
  document.getElementById('right-answers').innerHTML = playerScore
  document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
  location.href="last.html";
  questionNumber = 1
  playerScore = 0
  wrongAttempt = 0
  indexNumber = 0
  shuffledQuestions = []
  NextQuestion(indexNumber)
  document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById('option-modal').style.display = "none"
}

// var count=0;

// submit.addEventListener('click',()=>{
//   count++;

//   if(count==10){
//     window.open("./last.html","_self");
//   }
//   const checkedAnswer = getCheckAnswer();
//   console.log(checkedAnswer);

//   if(checkedAnswer === questions[questionCount].ans){
//     score++;
//   };
//  questionCount++;
//   if(questionCount < questions.length){
//     loadQuestion();
//   }

// });

// next.addEventListener('click',()=>{
//   count++;

//   if(count==10){
//     window.open("./last.html","_self");
//   }
//   questionCount++;
//   if(questionCount < questions.length){
//     loadQuestion();
//   }

// });