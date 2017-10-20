// Display the quiz questions on the page
/*

*/

$(document).ready(function () {
  // Load the quiz
  var quiz = JSON.parse(text);

  // Display total number of Questions
  $("#totalQuizQuestions").text(quiz.questions.length);

  // Display current score 
  $("#score").text("0");
  $("#scoreOutOf").text("/" + quiz.questions.length);

  // Generate random question number 
  var randomQuestionNum = Math.floor(Math.random() * quiz.questions.length); 

  // Display One Question
  displayOneQuestion(quiz,randomQuestionNum);

  $("#testValue").text(quiz.questions[randomQuestionNum].answerIndex); // show answer index for testing


  $("#nextButton").click(function(){
    nextButtonClicked(quiz,randomQuestionNum);
  })

})

function nextButtonClicked(quiz,randomQuestionNum) {
  // console.log("next button clicked");
  // Compare the answers from answer to the right answer
  
  // var radioBtns = $("#options input:radio[name='radioFieldName']");
  // var submittedOption = radioBtns.index(radioBtns.find(':checked'));
  // var correctAnswer = quiz.questions[randomQuestionNum].answerIndex;
  var currentScore = ($("#score").text());  //$("#score").text(parseInt($("#score").text()) + 1);

  currentScore++; 
  $("#score").text(currentScore);


}

function displayOneQuestion(quiz, randomQuestionNum)
{
  var questionIndex = randomQuestionNum;
  $("#options").empty();    // Clear old options
  $("#question").text(quiz.questions[questionIndex].question);
  for (i = 0; i < quiz.questions[questionIndex].options.length; i++)
  {
    var radioBtn = $('<input type="radio" name="rbtnCount">' + quiz.questions[questionIndex].options[i] + '</input> </br>');
    radioBtn.appendTo("#options");
  }
}