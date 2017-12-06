function getQuiz(quizName)
{
	var url = "quizzes/" + quizName + ".json";
    $.ajax({
        type: "GET",
        url: url,
        success: function(response){
            loadQuiz(response);
            CURRENT_QUIZ = response;
        }
    });
};