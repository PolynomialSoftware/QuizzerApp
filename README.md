# QuizzerApp
* Given a JSON object containing a list of questions, options, and the correct answer, display one question at a time.


# Site File Structure
```
.
├── js
|   └── core.json
├── quizzes
|   ├── templateQuiz.json
|   ├── ERPChapter1.json
|   ├── ERPChapter2.json
|   └── ERPChapter4.json
├── index.html
├── README.md
└── styles.css
    
```

# Format of the JSON quiz objects
```
{
  "quizName":"ERP Chapter 1",
  "questions":[
  
    {"question":"What is the color of the sky?",
    "options":["red","blue","yellow","green"],
    "answerIndex":1},
    
    {"question":"How old are you?",
    "options":["5","10","15","25"],
    "answerIndex":3},
    
    {"question":"What is a storage location?",
    "options":[ "The place where raw materials are received",
                "The place within a plant where materials are kept until they are needed",
                "The place where materials are collected for staging and inspection",
                "The place within a plant where machines are installed for production purposes",
                "The place within a plant where finished goods are kept for sale"],
    "answerIndex":1}
  ]
}
```

