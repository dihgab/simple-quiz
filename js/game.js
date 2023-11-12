const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader')
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswes = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = []; 

//Buscando a pergunta no .json:
fetch(
    //"questions.json"
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);

        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.slice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });
            return formattedQuestion;
        });



        //questions = loadedQuestions;
        startGame();
    })
    .catch(err => {
        console.log(err);
    });

/*{
    question: "Inside which HTML element do we put the JavaScript",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
},
{
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name ='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
},
{
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello Word');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
}*/

//CONSTANTES
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //Copia todos os qst do array questions para o array availableQuestions

    getNewQuestions();

    //Remove o carregamento e vira o jogo:
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestions = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {

        //salva a pontuação do usuário:
        localStorage.setItem("mostRecentScore", score);
        //vai para o end da página:
        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = ` Questão ${questionCounter}/${MAX_QUESTIONS}`;

    //ATUALIZAR A BARRA DE PROGRESSO:(ao obter a porcentagem de chq qstn vrai)

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //val en % ``

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]; 

    });

    availableQuestions.splice(questionIndex, 1); //Para ficar vermelho na pergunta que usamos antes

    acceptingAnswes = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswes) return;

        acceptingAnswes = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        //Aumenta a pontuação se a resposta estiver correta:
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        //Add no class:
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            //Remove essa class após o trabalho dele:
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000); //Quanto tempo para fazer o setTimeout principal

        //Ou usar:
        /* const classToApply = 'incorrect';
         if(selectedAnswer == currentQuestion.answer){
             classToApply = 'correct'
         }*/



    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

//startGame();
