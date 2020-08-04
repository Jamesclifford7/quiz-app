/* first, I need to store all of the questions (in store.js)

then, I need to present each question and the list of answer options; if answered correctly, 
they get one point and move on to the next question. 

if answered incorrectly, they need to be told the correct answer and then a prompt to move on. 

users need to be able to see which question they are on as well as their current score */

/* --- */

/* when a user clicks the 'start' button */

function startQuiz() {
    $('#start').on('click', function(event){
        renderAQuestion();
    })
}

/* update question and score */

function updateQuestionAndScore() {
    const html = $(`<ul><li id="js-answered">Question Number: ${STORE.currentQuestion + 1}/${STORE.currentQuestion.length}</li><li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li></ul`);
    $('.question-and-score').html(html);
}

/* rendering questions */

function renderAQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    const questionHTML = $(`
    <div>
        <form id="js-questions" class="question-form">
            <fieldset>
                <div class="question">
                    <h3>${question.question}</h3>
                </div>
                <div class="options">
                    <div class="js-options"></div>
                </div>
                <div class="submit-button">
                    <button id="answer" type="submit">Submit</button>
                </div>
                <div class="next-button">
                    <button id="next-question" type="button">Next</button>
                </div>
            </fieldset>
        </form>
    </div>
    `);
    $('main').html(questionHTML);
    $('.next-button').hide();
}

/* update options */

function renderOptions() {
    let question = STORE.questions[STORE.currentQuestion];
    for (i = 0; i < question.options.length; i++) {
        $('.js-options').append(`<div>
        <input type="radio" name="options" id="option${i}" value="${question.options[i]}">
        <label for="option${i}">${question.options[i]}</label>
    </div>`)
    };
}

/* check whether the response is right or wrong, display results and 'next' button */

function checkAnswer() {
    $('body').on('click', '#js-questions', function(event) {
        event.preventDefault();
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $('input[name=options]:checked').val();
        if (selectedOption === currentQues.answer) {
            STORE.score++;
            alert('Correct!');
        } else {
            alert(`Woops! The correct answer is ${currentQues.answer}`);
        }
        STORE.currentQuestion++; 
        $('#js-questions[class="submit-button"]').hide();
        $('.next-button').show();
    });
}

/* display final results at the end of quiz */

function displayResults() {
    let resultHtml = $(
        `<div class="results">
            <form id="js-restart-quiz">
                <fieldset>
                <div class="row">
                    <div class="col-12">
                    <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-12">
                    <button type="button" id="restart"> Restart Quiz </button>
                    </div>
                </div>
                </fieldset>
            </form>
        </div>`
    );
    STORE.currentQuestion = 0;
    STORE.score = 0; 
    $('main').html(resultHtml);
}

/* restart quiz */

function restartQuiz() {
    $('body').on('click', '#restart', function(event) {
        renderAQuestion();
    })
}

function handleQuizApp() {
    startQuiz();
    updateQuestionAndScore();
    renderAQuestion();
    renderOptions();
    checkAnswer();
    displayResults();
    restartQuiz();
}