// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;
let scoreArea =   document.querySelector('.scoreArea');
let body = document.querySelector('body')
showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct + 10}%`;
        document.querySelector('.progress--bar').innerHTML = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30) {
      document.querySelector('.scoreText1').innerHTML = 'Precisa Melhorar :(';
      document.querySelector('.scorePct').style.color = '#FF0000';
      document.querySelector('.prizeImage').style.display = 'none';
      document.querySelector('.badImage').style.display = 'flex';
      document.querySelector('.badGif').style.display = 'flex';
      document.querySelector('.prizeGif').style.display = 'none';
      document.querySelector('.goodImage').style.display = 'none';
      document.querySelector('.goodGif').style.display = 'none';
    } else if(points >= 30 && points < 70) {
      document.querySelector('.scoreText1').innerHTML = 'Muito bom';
      document.querySelector('.scorePct').style.color = '#FFFF00';
      document.querySelector('.prizeImage').style.display = 'none';
      document.querySelector('.goodImage').style.display = 'flex';
      document.querySelector('.goodGif').style.display = 'flex';
      document.querySelector('.prizeGif').style.display = 'none';
      document.querySelector('.badImage').style.display = 'none';
      document.querySelector('.badGif').style.display = 'none';
    } else if(points >= 70) {
      document.querySelector('.scoreText1').innerHTML = 'Parabéns!!';
      document.querySelector('.scorePct').style.color = '#0D630D';
      document.querySelector('.prizeImage').style.display = 'flex';
      document.querySelector('.prizeGif').style.display = 'flex';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'flex';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
    document.querySelector('.progress--bar').innerHTML = `${'Concluído'} ${'100%'}`;
}


function resetEvent() {
  body.classList.add('animate__animated', 'animate__backOutUp');
  body.style.setProperty('--animate-duration', '1s');
      body.addEventListener('animationend', () => {
        correctAnswers = 0;
        currentQuestion = 0;
        showQuestion();
        window.location.reload(true)
      });
}
