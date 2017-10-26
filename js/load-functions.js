function getQuiz(quizName)
{
	var url = "quizzes/" + quizName + ".json";
    console.log();
    $.ajax({
        type: "GET",
        url: url,
        success: function(response){
            console.log(response);
        }
    });
};