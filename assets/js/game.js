const questions = [
  {
    statement: "Cold drinks or ice make period cramps worse.",
    answer: "myth",
    feedback: "Cold drinks do not directly cause cramps. Period cramps are mainly caused by prostaglandins, hormones that make the uterus contract."
  },
  {
    statement: "You should not bathe or wash your hair while on your period.",
    answer: "myth",
    feedback: "Bathing during your period is safe. A warm bath or shower can even help relax muscles and ease cramps."
  },
  {
    statement: "Small blood clots can be normal on heavy flow days.",
    answer: "fact",
    feedback: "Small clots can happen during heavier bleeding. Very large clots, severe pain, or extremely heavy bleeding should be checked by a healthcare professional."
  },
  {
    statement: "Girls should not exercise at all while on their period.",
    answer: "myth",
    feedback: "Light to moderate exercise can reduce cramps, support mood, and help energy levels. Rest is also okay when your body needs it."
  },
  {
    statement: "You cannot get pregnant the first time you have sex.",
    answer: "myth",
    feedback: "Pregnancy can happen any time unprotected sex occurs, including the first time."
  },
  {
    statement: "You cannot get pregnant during your period.",
    answer: "myth",
    feedback: "It is less likely, but still possible, especially with shorter or irregular cycles. Sperm can also live in the body for several days."
  },
  {
    statement: "Lying down after sex guarantees pregnancy.",
    answer: "myth",
    feedback: "There is no strong scientific evidence that a position or lying down guarantees pregnancy. Fertility depends on many body and health factors."
  },
  {
    statement: "Drinking Guinness or stout helps you get pregnant.",
    answer: "myth",
    feedback: "No drink can directly improve fertility. Fertility depends on ovulation, hormones, sperm health, stress, nutrition, and medical conditions."
  },
  {
    statement: "Vaginal discharge always means infection.",
    answer: "myth",
    feedback: "Normal discharge helps clean and protect the vagina. Changes in smell, colour, itching, burning, or pain may be signs to get checked."
  },
  {
    statement: "Certain bush teas can completely clean out the womb.",
    answer: "myth",
    feedback: "Some herbal remedies can be unsafe, especially during pregnancy or menstruation. It is important to ask a qualified healthcare provider before using strong remedies."
  },
  {
    statement: "Strong period pain is normal for every woman.",
    answer: "myth",
    feedback: "Mild cramps are common, but pain that causes vomiting, fainting, or stops daily life may be linked to conditions such as endometriosis or fibroids."
  },
  {
    statement: "Tightness can prove whether someone is a virgin.",
    answer: "myth",
    feedback: "Virginity cannot be medically proven by tightness or by the hymen. Bodies naturally vary, and the hymen can change from normal activity."
  },
  {
    statement: "Birth control always causes infertility.",
    answer: "myth",
    feedback: "Most contraceptives do not permanently affect fertility. Fertility usually returns after stopping, though timing can differ by method and person."
  },
  {
    statement: "You can tell if someone has an STI just by looking at them.",
    answer: "myth",
    feedback: "Many STIs show no visible symptoms. Testing is the only reliable way to know."
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

function el(id) { return document.getElementById(id); }

function loadQuestion() {
  answered = false;
  const q = questions[currentIndex];

  el('statement').textContent = q.statement;
  el('progress-label').textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  el('progress-fill').style.width = `${(currentIndex / questions.length) * 100}%`;
  el('score-display').textContent = `Score: ${score} / ${questions.length}`;

  el('feedback-box').classList.add('hidden');
  el('next-btn').classList.add('hidden');
  el('next-btn').textContent = currentIndex === questions.length - 2 ? 'See My Results →' : 'Next Question →';

  const factBtn = el('fact-btn');
  const mythBtn = el('myth-btn');
  factBtn.disabled = false;
  mythBtn.disabled = false;
  factBtn.className = 'btn-fact';
  mythBtn.className = 'btn-myth';
}

function handleAnswer(chosen) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const correct = chosen === q.answer;
  if (correct) score++;

  el('fact-btn').disabled = true;
  el('myth-btn').disabled = true;

  const chosenBtn = el(chosen === 'fact' ? 'fact-btn' : 'myth-btn');
  chosenBtn.className = correct ? 'btn-fact selected-correct' : (chosen === 'fact' ? 'btn-fact selected-wrong' : 'btn-myth selected-wrong');

  if (!correct) {
    const correctBtn = el(q.answer === 'fact' ? 'fact-btn' : 'myth-btn');
    correctBtn.className = q.answer === 'fact' ? 'btn-fact selected-correct' : 'btn-myth selected-correct';
  }

  const fb = el('feedback-box');
  fb.className = `game-feedback ${correct ? 'correct' : 'incorrect'}`;
  el('feedback-icon').textContent = correct ? '✓' : '✗';
  el('feedback-label').textContent = correct ? 'That\'s right!' : 'Not quite.';
  el('feedback-text').textContent = q.feedback;

  el('score-display').textContent = `Score: ${score} / ${questions.length}`;

  if (currentIndex === questions.length - 1) {
    el('next-btn').textContent = 'See My Results →';
  }
  el('next-btn').classList.remove('hidden');
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    showEndScreen();
  } else {
    loadQuestion();
  }
}

function showEndScreen() {
  el('game-main').classList.add('hidden');
  el('end-screen').classList.remove('hidden');
  el('progress-fill').style.width = '100%';
  el('progress-label').textContent = `Question ${questions.length} of ${questions.length}`;

  el('final-score').textContent = `${score} / ${questions.length}`;
  el('final-pct').textContent = `${Math.round((score / questions.length) * 100)}% correct`;

  const msgs = [
    [questions.length, "Perfect score! You know your reproductive health really well. 🌸"],
    [Math.ceil(questions.length * 0.7),  "Great work! You have a solid understanding. Keep exploring Bloom to learn even more. 💪"],
    [Math.ceil(questions.length * 0.45),  "Good effort! There's always more to discover - Bloom's Health Library is a great next step. 📚"],
    [0,  "Every question you explore helps you learn something new. Keep going! 🌱"]
  ];
  el('final-message').textContent = msgs.find(([min]) => score >= min)[1];
}

function restartGame() {
  currentIndex = 0;
  score = 0;
  answered = false;
  el('game-main').classList.remove('hidden');
  el('end-screen').classList.add('hidden');
  loadQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  loadQuestion();
  el('fact-btn').addEventListener('click', () => handleAnswer('fact'));
  el('myth-btn').addEventListener('click', () => handleAnswer('myth'));
  el('next-btn').addEventListener('click', nextQuestion);
  el('restart-btn').addEventListener('click', restartGame);

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-links');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
});
