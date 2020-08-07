/* when a user clicks the 'start' button */

function startQuiz() {
    $('#start').on('click', function(event){
        renderAQuestion();
        updateQuestionAndScore();
    });
    console.log('startQuiz() is running');
} 

/* update question and score */

function updateQuestionAndScore() {
    let html = $(`<ul><li id="js-answered">Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li><li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li></ul`);
    // current score is updated in 'checkAnswer()' on line 75, current question is updated in renderNextQuestion() on line 96
    $('.question-and-score').html(html);
    console.log('updateQuestionAndScore() is running');
}

/* rendering questions and options */

function renderAQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    let options = '';
    for (i = 0; i < question.options.length; i++) {
        options += `<div>
        <input type="radio" name="options" id="option${i}" value="${question.options[i]}" required>
        <label for="option${i}">${question.options[i]}</label>
        </div>`;
    };
    const questionHTML = $(`
    <div>
        <form id="js-questions" class="question-form">
            <fieldset>
                <div class="question">
                    <h3>${question.question}</h3>
                </div>
                <div class="options">
                    <div class="js-options">${options}</div>
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
    $('#main').html(questionHTML);
    $('.next-button').hide();
    console.log('renderAQuestion() is running');
}

/* check whether the response is right or wrong, display results and 'next' button */

function checkAnswer() {
    $('#main').on('submit', '.question-form', function(event) {
        event.preventDefault();
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $('input[name=options]:checked').val();
        if (selectedOption === currentQues.answer) {
            STORE.score += 1;
            console.log('checkAnswer for loop is running');
            // $('#main').append('Correct!');
            $('#main').append('<p class="answer-message">Correct! 🤟</p>');
        } else {
            //$('#main').append(`Woops! The correct answer is ${STORE.questions[STORE.currentQuestion].answer}`);
            $('#main').append(`<p class="answer-message">Woops! The correct answer is ${STORE.questions[STORE.currentQuestion].answer}</p>`);
        };
        STORE.currentQuestion += 1; // not working
        $('.submit-button').hide(); // not working
        $('.next-button').show();
    });
    console.log('checkAnswer() is running');
}

/* render next question */

function renderNextQuestion() {
    $('#main').on('click', '.next-button', function(event){
        event.preventDefault;
        //STORE.currentQuestion += 1; //or should this go here?
        if (STORE.currentQuestion === STORE.questions.length){
            displayResults();
            console.log('final question if statement is running')
        } else { 
        renderAQuestion();
        updateQuestionAndScore();
        }
    });
    console.log('renderNextQuestion() is running');
}


/* display final results at the end of quiz */

function displayResults() {
    let resultHtml = $(
        `<div class="results">
            <form id="js-restart-quiz">
                <fieldset>
                <div class="score">
                    <span>Your score is: ${STORE.score}/${STORE.questions.length}</span>
                </div>
                <img src="images/grant-green-1.jpg" alt="image of Grant Green" width=400>
                <div class="restart-button">
                    <button type="button" id="restart">Restart Quiz</button>
                </div>
                </fieldset>
            </form>
        </div>`
    );
    $('.question-and-score').append('<h3>Finished!</h3>');
    $('#js-score').hide();
    $('#js-answered').hide();
    STORE.currentQuestion = 0;
    STORE.score = 0; 
    $('#main').html(resultHtml);
    console.log('displayResults() is running');
}

/* restart quiz */

function restartQuiz() {
    $('body').on('click', '#restart', function(event) {
        event.preventDefault;
        //STORE.currentQuestion = 0;
        //STORE.score = 0; 
        updateQuestionAndScore();
        renderAQuestion();
        // $('#js-score').show();
    });
    console.log('restartQuiz() is running');
}

function handleQuizApp() {
    startQuiz();
    // updateQuestionAndScore();
    // renderAQuestion();
    checkAnswer();
    renderNextQuestion();
    // displayResults();
    restartQuiz();
}

handleQuizApp();