using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Web.Script.Serialization; // Add reference System.Web.Extensions

namespace ParseQuizText
{
    class Program
    {
        static void Main(string[] args)
        {
            // Load file
            string quizPath = @"C:\Users\hlin7\Documents\GitHub\QuizzerApp\quizzes\quiz7.txt";
            string answerPath = @"C:\Users\hlin7\Documents\GitHub\QuizzerApp\quizzes\ERPChapter7Key.txt";
            string outpath = @"C:\Users\hlin7\Documents\GitHub\QuizzerApp\quizzes\ERPChapter7.json";


            var lines = File.ReadLines(quizPath);
            Quiz quiz = ParseQuestions(lines, "ERP Chapter 4");

            var answerLines = File.ReadLines(answerPath);
            quiz = ParseAnswers(answerLines, quiz);


            Console.WriteLine("Serializing into JSON");
            var json = new JavaScriptSerializer().Serialize(quiz);
            System.IO.File.WriteAllText(outpath, json);
            Console.WriteLine("File updated path: " + outpath);
        }

        static public Quiz ParseQuestions(IEnumerable<string> lines, string quizName)
        {
            Quiz quiz = new Quiz();
            Status status;
            Question question;
            List<string> tempOptions;


            // BASE CASE
            Console.WriteLine("Initating base case...");
            quiz.quizName = quizName;


            question = new Question();
            tempOptions = new List<string>();
            List<string> tfOptions = new List<string>(new string[] { "True", "False" });

            status = Status.mcQuestion;


            //Base +N
            #region 
            Console.WriteLine("Parsing line by line...");
            foreach (var line in lines)
            {
                if (line == "---")
                    status = Status.tfQuestion;
                else if (line != "" && (status == Status.mcQuestion || status == Status.tfQuestion))
                {
                    question.question = line;
                    if (status == Status.tfQuestion)
                    {
                        question.options = tfOptions;
                        quiz.AddQuestion(question);
                        question = new Question();
                    }
                }
                else if (line == "" && status == Status.mcQuestion)
                    status = Status.mcOptions;
                else if (line != "" && status == Status.mcOptions)
                    tempOptions.Add(line);
                else if (line == "" && status == Status.mcOptions)
                {
                    question.options = tempOptions;
                    quiz.questions.Add(question);
                    status = Status.mcEnd;
                }
                else if (status == Status.mcEnd)
                {
                    question = new Question();
                    tempOptions = new List<string>();
                    status = Status.mcQuestion;
                }
                else
                { }
                //Console.WriteLine("Error occured while parsing line by line");
            }
            #endregion 
            Console.WriteLine("Parsing complete!");
            return quiz;
        }

        static public Quiz ParseAnswers(IEnumerable<string> answerLines, Quiz quiz)
        {
            List<int> answerIndexes = new List<int>();
            // Convert answer Lines into the numerical value 
            foreach (string answer in answerLines)
            {
                string[] stringArray = { "a", "b", "c", "d", "e" };
                // Check for MC or TF
                if (stringArray.Contains(answer))
                {
                    answerIndexes.Add((int)Enum.Parse(typeof(McAnswers), answer));
                }
                else
                {
                    answerIndexes.Add((int)Enum.Parse(typeof(TfAnswers), answer));
                }
            }
            for (int i = 0; i < quiz.questions.Count; i++)
            {
                try
                {
                    quiz.questions[i].answerIndex = answerIndexes[i];
                }
                catch (ArgumentOutOfRangeException e)
                {
                    Console.WriteLine("<<<----------      ERROR      ---------->>>");
                    Console.WriteLine("There are less answers than there are questions. Check the Quiz Key text file");
                    Console.WriteLine(e.Message);
                    Console.WriteLine("<<<----------      END      ---------->>>");
                }
                
            }
            return quiz;
        }
    }
    enum Status
    {
        mcQuestion,
        mcOptions,
        mcEnd,
        tfQuestion

    }
    enum McAnswers
    {
        a, b, c, d, e
    }
    enum TfAnswers
    {
        t, f
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
