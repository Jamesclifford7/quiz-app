/* when a user clicks the 'start' button */

function startQuiz() {
    $('#start').on('click', function(event){
        $('#main').html(renderAQuestion);
        $('.next-button').hide();
        $('.question-and-score').html(updateQuestionAndScore);;
    });
} 

/* update question and score */

function updateQuestionAndScore() {
    return `<ul><li id="js-answered">Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li><li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li></ul`;
}

/* rendering questions and options */

function renderAQuestion() {
    const question = STORE.questions[STORE.currentQuestion];
    let options = '';
    for (i = 0; i < question.options.length; i++) {
        options += `<div>
        <input type="radio" name="options" id="option${i}" value="${question.options[i]}" required>
        <label for="option${i}">${question.options[i]}</label>
        </div>`;
    }; 
    
    return `
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
    `; 
}

/* check whether the response is right or wrong, display results and 'next' button */

function checkAnswer() {
    $('#main').on('submit', '.question-form', function(event) {
        event.preventDefault();
        const currentQues = STORE.questions[STORE.currentQuestion];
        const selectedOption = $('input[name=options]:checked').val();
        if (selectedOption === currentQues.answer) {
            STORE.score += 1;
            $('#main').append('<p class="answer-message">Correct! 🤟</p>');
        } else {
            $('#main').append(`<p class="answer-message">Woops! The correct answer is ${STORE.questions[STORE.currentQuestion].answer}</p>`);
        };
        STORE.currentQuestion += 1; 
        $('.submit-button').hide(); 
        $('.next-button').show();
    });
}

/* render next question */

function renderNextQuestion() {
    $('#main').on('click', '.next-button', function(event){
        event.preventDefault();
        if (STORE.currentQuestion === STORE.questions.length){
            $('.question-and-score').append('<h3>Finished!</h3>');
            $('#main').html(displayResults);
            $('#js-score').hide();
            $('#js-answered').hide();
            STORE.currentQuestion = 0;
            STORE.score = 0; 
            // displayResults();
            console.log('final question if statement is running')
        } else { 
            $('#main').html(renderAQuestion);
            $('.next-button').hide();
            $('.question-and-score').html(updateQuestionAndScore);
        }
    });
    console.log('renderNextQuestion() is running');
}

/* display final results at the end of quiz */

function displayResults() {
    if (STORE.score >= 4) {
        return `<div class="results">
        <form id="js-restart-quiz">
            <fieldset>
            <div class="score">
                <span>Your score is: ${STORE.score}/${STORE.questions.length}</span><br>
                <span>Excellent!</span>
            </div>
            <img src="images/waynes-world.jpg" alt="image of Wayne from Wayne's World" width=400>
            <div class="restart-button">
                <button type="button" id="restart">Restart Quiz</button>
            </div>
            </fieldset>
        </form>
    </div>`
    } else {
        return `<div class="results">
        <form id="js-restart-quiz">
            <fieldset>
            <div class="score">
                <span>Your score is: ${STORE.score}/${STORE.questions.length}</span><br>
                <span>Keep practicing!</span>
            </div>
            <img src="images/grant-green-1.jpg" alt="image of Grant Green" width=400>
            <div class="restart-button">
                <button type="button" id="restart">Restart Quiz</button>
            </div>
            </fieldset>
        </form>
    </div>`
    };
}

/* restart quiz */

function restartQuiz() {
    $('body').on('click', '#restart', function(event) {
        event.preventDefault;
        $('.question-and-score').html(updateQuestionAndScore);
        $('#main').html(renderAQuestion);
        $('.next-button').hide();
    });
    console.log('restartQuiz() is running');
}

function handleQuizApp() {
    startQuiz();
    checkAnswer();
    renderNextQuestion();
    restartQuiz();
}

handleQuizApp();