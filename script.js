const hrQuestions = [
    "Tell me about yourself?",
    "Why should we hire you?",
    "What are your strengths?",
    "What are your weaknesses?",
    "Where do you see yourself in 5 years?"
];

const pythonQuestions = [
    "What is Python?",
    "What is a List in Python?",
    "Difference between List and Tuple?",
    "What is OOP?",
    "What is Exception Handling?"
];

const technicalQuestions = [
    "What is HTML?",
    "What is CSS?",
    "What is JavaScript?",
    "What is DBMS?",
    "What is an API?"
];

const cppQuestions = [
    "What is C++?",
    "Difference between C and C++?",
    "What is a Class in C++?",
    "What is Inheritance?",
    "What is Polymorphism?"
];

const javaQuestions = [
    "What is Java?",
    "What is JVM?",
    "Difference between JDK, JRE and JVM?",
    "What is Inheritance in Java?",
    "What is Exception Handling in Java?"
];

const dsQuestions = [
    "What is a Data Structure?",
    "Difference between Array and Linked List?",
    "What is a Stack?",
    "What is a Queue?",
    "What is Binary Search?"
];

// ANSWERS

const pythonAnswers = [
    "programming language",
    "ordered mutable collection",
    "mutable immutable",
    "object oriented programming",
    "runtime errors"
];

const technicalAnswers = [
    "hypertext markup language",
    "cascading style sheets",
    "scripting language",
    "database management system",
    "application programming interface"
];

const cppAnswers = [
    "object oriented programming language",
    "procedural object oriented",
    "blueprint for objects",
    "acquire properties",
    "many forms"
];

const javaAnswers = [
    "object oriented programming language",
    "java virtual machine",
    "java development kit",
    "acquire properties",
    "runtime errors"
];

const dsAnswers = [
    "organizing data",
    "contiguous memory",
    "lifo",
    "fifo",
    "sorted array"
];

let currentQuestion = 0;
let timer = 30;
let testStarted = false;
let totalScore = 0;
let userName = "";
let quizCategory = "";
let allAnswers = [];

function updateSummary() {

    document.getElementById("summaryName").innerText =
        userName || "Enter your name";

    document.getElementById("summaryCategory").innerText =
        quizCategory || document.getElementById("category").value;

    if (quizCategory === "HR") {
        document.getElementById("summaryScore").innerText = "Not Applicable";
    } else {
        document.getElementById("summaryScore").innerText =
            totalScore + "/50";
    }
}

function getQuestions() {

    let category =
    document.getElementById("category").value;

    switch(category) {

        case "Python":
            return pythonQuestions;

        case "Technical":
            return technicalQuestions;

        case "C++":
            return cppQuestions;

        case "Java":
            return javaQuestions;

        case "Data Structures":
            return dsQuestions;

        default:
            return hrQuestions;
    }
}

function getAnswers() {

    let category =
    document.getElementById("category").value;

    switch(category) {

        case "Python":
            return pythonAnswers;

        case "Technical":
            return technicalAnswers;

        case "C++":
            return cppAnswers;

        case "Java":
            return javaAnswers;

        case "Data Structures":
            return dsAnswers;

        default:
            return null;
    }
}

function startTest() {

    userName = document.getElementById("name").value;
    quizCategory = document.getElementById("category").value;

    if(userName === "") {
        alert("Please enter your name");
        return;
    }

    testStarted = true;
    currentQuestion = 0;
    totalScore = 0;
    allAnswers = [];

    document.getElementById("question").innerText =
    getQuestions()[0];

    document.getElementById("questionNumber").innerText =
    "1";

    document.getElementById("answer").value = "";

    document.getElementById("progress").style.width =
    "20%";

    document.getElementById("score").innerText =
    "Score: 0/10";

    document.getElementById("feedback").innerText =
    "Feedback will appear here...";

    updateSummary();

    document.getElementById("startBtn").style.display = "none";
    document.getElementById("category").disabled = true;
    document.getElementById("name").disabled = true;

    timer = 30;
}

document.getElementById("name")
.addEventListener("input", function() {

    let value = this.value;

    if(value.length > 0) {
        document.getElementById("avatar").innerText =
        value.charAt(0).toUpperCase();
    }
});

function nextQuestion() {

    if(!testStarted) {
        alert("Please click Start Test first");
        return;
    }

    let answer =
document.getElementById("answer").value.trim();

if(answer === "") {
    answer = "No Answer Submitted";
}

    let score = 0;
    let feedback = "";

    let answers = getAnswers();

    if(answers !== null) {

        let correctAnswer =
        answers[currentQuestion].toLowerCase();

        let userAnswer =
        answer.toLowerCase();

        if(
            userAnswer.includes(correctAnswer) ||
            correctAnswer.includes(userAnswer)
        ) {
            score = 10;
            feedback = "Correct Answer";
        }
        else {
            score = 0;
            feedback = "Incorrect Answer";
        }

    } else {
        score = 0;
        feedback =
        "Your answer has been recorded. HR responses are evaluated by the interviewer.";
    }

    totalScore += score;
    allAnswers.push({
        question: document.getElementById("question").innerText,
        answer: answer,
        score: score
    });

    document.getElementById("score").innerText =
    "Score: " + score + "/10";

    document.getElementById("feedback").innerText =
    feedback;

    currentQuestion++;

    let selectedQuestions =
    getQuestions();

    if(currentQuestion <
       selectedQuestions.length) {

        document.getElementById("question").innerText =
        selectedQuestions[currentQuestion];

        document.getElementById("questionNumber").innerText =
        currentQuestion + 1;

        document.getElementById("answer").value = "";

        let progress =
        ((currentQuestion + 1) /
        selectedQuestions.length) * 100;

        document.getElementById("progress").style.width =
        progress + "%";

        timer = 30;

    } else {

        testStarted = false;

        if (quizCategory === "HR") {
            document.querySelector(".container").innerHTML = `
                <h1>🎉 Interview Completed</h1>
                <h2>Congratulations, ${userName}!</h2>
                <p>Category: ${quizCategory}</p>
                <br>
                <p>✅ HR Interview Completed Successfully!</p>
                <p>Your responses have been recorded and will be evaluated by the recruiter.</p>
                <br>
                <button onclick="downloadReport()">📄 Download Report</button>
                <button onclick="downloadCertificate()">🏆 Download Certificate</button>
                <button onclick="location.reload()">🔄 Take Another Test</button>
            `;
        } else {
            document.querySelector(".container").innerHTML = `
                <h1>🎉 Interview Completed</h1>
                <h2>Congratulations, ${userName}!</h2>
                <p>You have completed all questions.</p>
                <p>Category: ${quizCategory}</p>
                <p>Total Score: ${totalScore}/50</p>
                <br>
                <button onclick="downloadReport()">📄 Download Report</button>
                <button onclick="downloadCertificate()">🏆 Download Certificate</button>
                <button onclick="location.reload()">🔄 Take Another Test</button>
            `;
        }
    }
}

function changeCategory() {

    if(testStarted) {
        alert("Cannot change category while test is running");
        return;
    }

    currentQuestion = 0;
    totalScore = 0;
    allAnswers = [];

    document.getElementById("question").innerText =
    getQuestions()[0];

    document.getElementById("questionNumber").innerText =
    "1";

    document.getElementById("answer").value = "";

    document.getElementById("progress").style.width =
    "20%";

    document.getElementById("score").innerText =
    "Score: 0/10";

    document.getElementById("feedback").innerText =
    "Feedback will appear here...";

    timer = 30;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

setInterval(function () {

    if (testStarted) {

        if (timer > 0) {

            timer--;

            document.getElementById("timer").innerText =
            timer;

        } else {

            // Automatically submit and move to next question
            nextQuestion();

        }

    }

}, 1000);

function speakQuestion() {

    let text =
    document.getElementById("question").innerText;

    let speech =
    new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(speech);
}

function startVoice() {

    const recognition =
    new(window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function(event) {

        document.getElementById("answer").value =
        event.results[0][0].transcript;
    };
}

function downloadCertificate() {

    let text =
    "Certificate of Completion\n\n" +
    "Awarded To: " + userName +
    "\nFor Completing AI Interview Assistant" +
    "\n\nCategory: " + quizCategory +
    "\nTotal Score: " + totalScore + "/50" +
    "\n\nDate: " + new Date().toLocaleDateString();

    let blob =
    new Blob([text], {type:"text/plain"});

    let link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "certificate.txt";

    link.click();
}

function downloadReport() {

    let reportText =
    "AI Interview Report\n\n" +
    "Name: " + userName +
    "\nCategory: " + quizCategory +
    "\nDate: " + new Date().toLocaleDateString() +
    "\n\n==================\n\n";

    allAnswers.forEach((item, index) => {
        reportText += "Question " + (index + 1) + ":\n";
        reportText += item.question + "\n\n";
        reportText += "Your Answer:\n";
        reportText += item.answer + "\n\n";
        reportText += "Points: " + item.score + "/10\n";
        reportText += "==================\n\n";
    });

    reportText += "\nTotal Score: " + totalScore + "/50";

    let blob =
    new Blob([reportText], {type:"text/plain"});

    let link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "report.txt";

    link.click();
}