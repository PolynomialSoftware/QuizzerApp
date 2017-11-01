// Display the quiz questions on the page
/*

*/

var QUIZ_QUESTION_INDEXES;
var CUR_QUESTION_INDEX;
var CURRENT_SCORE = 0;


$(document).ready(function () {
  // Load data
  var quiz = JSON.parse(text4);
  QUIZ_QUESTION_INDEXES = getQuizQuestionIndexes(quiz);
  var questionIndex = getQuestionIndex(QUIZ_QUESTION_INDEXES);

  // Load page
  $("#quiz-question-count").text(quiz.questions.length);
  $("#correct-answer").text("0");
  //$("#quiz-question-count").text("/" + quiz.questions.length);
  displayOneQuestion(quiz,questionIndex);

  // Page events
  $("#button").click(function(){
    nextButtonClicked(quiz);
  })  
})

function getQuizQuestionIndexes(quiz) {
  var questionIndexArray = []; 
  for (i = 0; i < quiz.questions.length; i++) {
    questionIndexArray.push(i);
  }
  return questionIndexArray;
}

// Generate random question index based on number of indexes remaining inside QUIZ_QUESTION_INDEXES
function getQuestionIndex(QUIZ_QUESTION_INDEXES) {
  var randomQuestionNumberIndex = Math.floor(Math.random() * QUIZ_QUESTION_INDEXES.length);
  return QUIZ_QUESTION_INDEXES[randomQuestionNumberIndex];
}

function nextButtonClicked(quiz) {
  var correctAnswer = quiz.questions[CUR_QUESTION_INDEX].answerIndex;
  var selectedOptionIndex = $('input[name=rbtnCount]:checked').val();

  // 1. Check Answer

  if (typeof selectedOptionIndex != 'undefined') {
    if (selectedOptionIndex == correctAnswer) {
      displayCorrect();
      CURRENT_SCORE++;
    } 
    else {
      displayIncorrect();
    }

    // 2. Reduce Question Array

    QUIZ_QUESTION_INDEXES = QUIZ_QUESTION_INDEXES.filter(function(i) {return i !== CUR_QUESTION_INDEX});
    

    // 3. Display End or Next Question

    if (QUIZ_QUESTION_INDEXES === undefined || QUIZ_QUESTION_INDEXES.length == 0) {
      clearQuestion();
      displayEndOfQuiz();
    }
    else {
      // Next Question
      var questionIndex = getQuestionIndex(QUIZ_QUESTION_INDEXES);
      displayOneQuestion(quiz, questionIndex);
    }
  }
}

function displayCorrect() {
  $("#correct-answer").text(CURRENT_SCORE);
  $("#question-result").text("The answer was correct!");
  console.log("Correct!");
}

function displayIncorrect() {
  $("#question-result").text("The answer was incorrect!");
  console.log("Incorrect!");
}

function displayEndOfQuiz() {
  $("#question-text").text("You have completed the quiz.");
}

function displayOneQuestion(quiz, questionIndex) {
  clearQuestion();
  $("#question-text").text(quiz.questions[questionIndex].question);
  for (i = 0; i < quiz.questions[questionIndex].options.length; i++)
  {
    var radioBtn = $('<input type="radio" name="rbtnCount" value=" ' + [i]  + ' ">' + quiz.questions[questionIndex].options[i] + '</input> </br>');
    radioBtn.appendTo("#question-options");
  }
  CUR_QUESTION_INDEX = questionIndex;

  // if (QUIZ_QUESTION_INDEXES.length == 1) {
  //   $("#nextButton").text("Finish");
  // }
  $("#question-number").text(parseInt($("#question-number").text()) + 1); 
}

function clearQuestion() {
  $("#question-text").empty();
  $("#question-options").empty();    
}