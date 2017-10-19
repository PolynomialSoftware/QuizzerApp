// Display the quiz questions on the page
/*

*/

$(document).ready(function () {
  // Load the quiz
  var quiz = JSON.parse(text);

  // Display total number of Questions

  // Display current score

  // Display One Question
  displayOneQuestion(quiz);
})

$("#nextButton").click(function () {
  // Compare the answers from answer to the right answer
  
})

function displayOneQuestion(quiz)
{
  var questionIndex = 5;
  $("#options").empty();    // Clear old options
  $("#question").text(quiz.questions[questionIndex].question);
  for (i = 0; i < quiz.questions[questionIndex].options.length; i++)
  {
    var radioBtn = $('<input type="radio" name="rbtnCount">' + quiz.questions[questionIndex].options[i] + '</input> </br>');
    radioBtn.appendTo("#options");
  }
}