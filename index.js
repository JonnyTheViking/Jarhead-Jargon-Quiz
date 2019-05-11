let questionNumber = 0;
let score = 0;

function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(5)
  }
}

function changeQuestionNumber () {
    questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
}

function changeScore () {
  score ++;
}

function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
  changeScore();
  $('.score').text(score);
}

function renderResults () {
  if (score >= 4) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Oorah!</h3><img src="https://media0.giphy.com/media/6MlOHrO68imac/giphy.gif?cid=790b76115cd26b126a59666c553ebf0f&rid=giphy.gif" alt="animated flag raising iwojima"/><p>You got ${score} / 5</p><p>You have proven yourself knowledgeable in Marine Corps terminology.</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 4 && score >= 2) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Could be worse.</h3><img src="https://i.chzbgr.com/full/7463553536/hA8D02172/" alt="Silent Drill Platoon LCpl misses rifle toss"/><p>You got ${score} / 5</p><p>There's hope for you yet.</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Hit the quarterdeck!</h3><img src="https://media.giphy.com/media/KMLLVMUVQIVi0/giphy.gif" alt="USMC natural selection at work"/><p>You got ${score} / 5</p><p>The brain is a muscle, and you must be skipping PT!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);