// Display the quiz questions on the page
/*

*/

var quizQuestionIndexes;
var curQuestionIndex;
var currentScore = 0;
$(document).ready(function () {
  // Load data
  var quiz = JSON.parse(text4);
  quizQuestionIndexes = getQuizQuestionIndexes(quiz);
  var questionIndex = getQuestionIndex(quizQuestionIndexes);

  // Load page
  $("#totalQuizQuestions").text(quiz.questions.length);
  $("#score").text("0");
  $("#scoreOutOf").text("/" + quiz.questions.length);
  displayOneQuestion(quiz,questionIndex);

  // Page events
  $("#nextButton").click(function(){
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

// Generate random question index based on number of indexes remaining inside quizQuestionIndexes
function getQuestionIndex(quizQuestionIndexes) {
  var randomQuestionNumberIndex = Math.floor(Math.random() * quizQuestionIndexes.length);
  return randomQuestionNumberIndex;
}

function nextButtonClicked(quiz) {
  var selectedOptionIndex = $('input[name=rbtnCount]:checked').val();
  if (typeof selectedOptionIndex != 'undefined') {
    var correctAnswer = quiz.questions[curQuestionIndex].answerIndex;
    console.log(selectedOptionIndex + " " + correctAnswer);
    if (selectedOptionIndex == correctAnswer) {
      currentScore++; 
      $("#score").text(currentScore);
      $("#testValue").text("The answer was correct!");
      console.log("Correct!");
    } 
    else {
      $("#testValue").text("The answer was incorrect!");
      console.log("Incorrect!");
    }
    // Reduce Question Array
    quizQuestionIndexes = quizQuestionIndexes.filter(function(i) {return i !== curQuestionIndex});
    
    // Next Question
    var questionIndex = getQuestionIndex(quizQuestionIndexes);
    displayOneQuestion(quiz, questionIndex);
    $("#questionNum").text(parseInt($("#questionNum").text()) + 1);  
  }
}

function displayOneQuestion(quiz, questionIndex) {
  $("#options").empty();    // Clear old options
  $("#question").text(quiz.questions[questionIndex].question);
  for (i = 0; i < quiz.questions[questionIndex].options.length; i++)
  {
    var radioBtn = $('<input type="radio" name="rbtnCount" value=" ' + [i]  + ' ">' + quiz.questions[questionIndex].options[i] + '</input> </br>');
    radioBtn.appendTo("#options");
  }
  curQuestionIndex = questionIndex;
  console.log("Correct answer index:" + quiz.questions[questionIndex].answerIndex);

}