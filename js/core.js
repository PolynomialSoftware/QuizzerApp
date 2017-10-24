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

  // show answer index for testing
  $("#testValue").text("Correct answer index: " + quiz.questions[randomQuestionNum].answerIndex); 

  // Run function when next button clicked
  $("#nextButton").click(function(){
    nextButtonClicked(quiz,randomQuestionNum);
  })

})

function nextButtonClicked(quiz,randomQuestionNum) {
  // Get selected option
  var selectedOptionIndex = $('input[name=rbtnCount]:checked').val();
  console.log(selectedOptionIndex);

  // Compare the answers from answer to the right answer
  var currentScore = ($("#score").text());  // In one line: $("#score").text(parseInt($("#score").text()) + 1);
  var correctAnswer = quiz.questions[randomQuestionNum].answerIndex;

  if (selectedOptionIndex == correctAnswer) {
      currentScore++; 
      $("#score").text(currentScore);
      console.log("Correct!");

      // Move to next question
  } 
  else {
      console.log("Incorrect!");
  }
}

function displayOneQuestion(quiz, randomQuestionNum)
{
  var questionIndex = randomQuestionNum;
  $("#options").empty();    // Clear old options
  $("#question").text(quiz.questions[questionIndex].question);
  for (i = 0; i < quiz.questions[questionIndex].options.length; i++)
  {
    var radioBtn = $('<input type="radio" name="rbtnCount" value=" ' + [i]  + ' ">' + quiz.questions[questionIndex].options[i] + '</input> </br>');
    radioBtn.appendTo("#options");
  }
}