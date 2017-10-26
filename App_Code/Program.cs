using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web.Script.Serialization;

namespace ParseQuizText
{
    enum Status
    {
        question,
        options,
        end
    }
    class Program
    {
        static void Main(string[] args)
        {
            // Load file
            string path = @"C:\Users\hlin7\Documents\GitHub\QuizzerApp\quizzes\quiz4.txt";
            string outpath = @"C:\Users\hlin7\Documents\GitHub\QuizzerApp\quizzes\ERPChapter4.json";
            var lines = File.ReadLines(path);
            
            Quiz quiz = new Quiz();
            quiz.quizName = "ERP Quiz 4";

            // BASE CASE
            Status status = Status.question;
            Question question = new Question();
            List<string> optionsTemp = new List<string>();

            // BASE CASE +N
            foreach (var line in lines)
            {
                Console.WriteLine(line);
                if (line != "" && status == Status.question)
                {
                    question = new Question();
                    question.question = line;
                }
                else if (line == "" && status == Status.question)
                {
                    status = Status.options;
                }
                else if (line != "" && status == Status.options)
                {
                    optionsTemp.Add(line);
                }
                else if (line == "" && status == Status.options)
                {
                    question.options = optionsTemp;
                    quiz.questions.Add(question);
                    // Clear the lists
                    optionsTemp = new List<string>();
                    status = Status.options;
                    status = Status.end;
                }
                else if (status == Status.end)
                {
                    status = Status.question;
                }
                else
                    Console.WriteLine("Error");
            }
            var json = new JavaScriptSerializer().Serialize(quiz);
            Console.WriteLine(json);
            System.IO.File.WriteAllText(outpath, json);
        }
    }

    class Quiz
    {
        public Quiz()
        {
            questions = new List<Question>();
        }
        public string quizName { get; set; }
        public List<Question> questions { get; set; }
        

        // Method
        public void AddQuestion(Question question)
        {
            questions.Add(question);
        }

    }
    class Question
    {
        public string question { get; set; }
        public List<string> options { get; set; }
        public int answerIndex { get; set; }
    }
}
