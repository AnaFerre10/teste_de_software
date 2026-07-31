document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
  initChartObserver();
  renderTypeGrid();
  initQuiz();
  initClock();
});

/* ============ TERMINAL SIMULATOR ============ */
function initTerminal() {
  const termBody = document.getElementById('termBody');
  const logs = [
    { text: '$ npm run test:suite --silent', type: 'term-dim', delay: 200 },
    { text: 'PASS src/modules/auth/login.spec.js', type: 'term-success', delay: 400 },
    { text: 'PASS src/modules/cart/calculator.spec.js', type: 'term-success', delay: 200 },
    { text: 'FAIL src/modules/checkout/payment.spec.js', type: 'term-fail', delay: 500 },
    { text: '  └ Cartão expirado retornou HTTP 200 ao invés de 402', type: 'term-dim', delay: 100 },
    { text: 'WARN Latência da API ultrapassou 1200ms', type: 'term-warn', delay: 300 },
    { text: '----------------------------------------', type: 'term-dim', delay: 100 },
    { text: 'Resumo: 2 aprovados, 1 falha, 1 alerta', type: 'term-dim', delay: 100 }
  ];

  let index = 0;

  function printLine() {
    if (index < logs.length) {
      const line = document.createElement('p');
      line.className = `term-line ${logs[index].type}`;
      line.textContent = logs[index].text;
      termBody.appendChild(line);
      index++;
      setTimeout(printLine, logs[index - 1].delay);
    }
  }

  printLine();
}

/* ============ CHART OBSERVER ============ */
function initChartObserver() {
  const bars = document.querySelectorAll('.bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => {
          bar.style.height = bar.getAttribute('data-height');
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const container = document.getElementById('costBars');
  if (container) observer.observe(container);
}

/* ============ TIPOS DE TESTE ============ */
const tiposTeste = [
  { path: 'unit/spec.js', name: 'Testes Unitários', desc: 'Isolam a menor unidade testável do código (funções ou métodos) para garantir saídas preditivas.' },
  { path: 'integration/spec.js', name: 'Testes de Integração', desc: 'Avaliando a comunicação entre diferentes subsistemas, APIs e bancos de dados.' },
  { path: 'e2e/spec.js', name: 'Testes Ponta a Ponta (E2E)', desc: 'Simulam a jornada do usuário no navegador ou dispositivo de ponta a ponta.' },
  { path: 'regression/spec.js', name: 'Testes de Regressão', desc: 'Garantem que novas alterações não quebraram funcionalidades antigas que já funcionavam.' },
  { path: 'performance/spec.js', name: 'Testes de Carga & Estresse', desc: 'Avaliando a estabilidade do sistema sob alto volume de requisições concorrentes.' },
  { path: 'security/spec.js', name: 'Testes de Segurança', desc: 'Mapeamento proativo de vulnerabilidades como injeção de SQL, XSS e brechas de autenticação.' }
];

function renderTypeGrid() {
  const grid = document.getElementById('typeGrid');
  if (!grid) return;

  grid.innerHTML = tiposTeste.map(tipo => `
    <div class="type-item">
      <span class="type-path">${tipo.path}</span>
      <h3>${tipo.name}</h3>
      <p class="type-desc">${tipo.desc}</p>
    </div>
  `).join('');

  document.querySelectorAll('.type-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}

/* ============ QUIZ SYSTEM ============ */
const quizQuestions = [
  {
    tag: 'Fundamentos',
    q: 'Qual é o objetivo principal de realizar testes de software sistemáticos?',
    opts: [
      'Provar que o sistema não possui nenhum erro',
      'Validar se o comportamento do software atende às especificações e identificar defeitos precocemente',
      'Substituir a documentação técnica por código automatizado',
      'Garantir que a aplicação nunca precise de manutenção'
    ],
    correct: 1,
    exp: 'Testes revelam a presença de defeitos e validam requisitos, mas não garantem matematicamente a ausência total de bugs.'
  },
  {
    tag: 'Economia de Software',
    q: 'Por que o custo de correção de um bug aumenta drasticamente em Produção?',
    opts: [
      'Devido aos custos de refatoração, re-deploy, potencial perda de dados e impacto na reputação',
      'Apenas por causa do custo de horas extras dos desenvolvedores',
      'Porque ferramentas de produção cobram por erro encontrado',
      'O custo não aumenta se o bug for simples'
    ],
    correct: 0,
    exp: 'A correção em produção envolve reprocessamento, auditoria, validação de segurança e mitigação de danos à imagem da empresa.'
  }
];

let currentQ = 0;
let score = 0;

function initQuiz() {
  renderQuestion();
}

function renderQuestion() {
  const q = quizQuestions[currentQ];
  const area = document.getElementById('quizArea');
  const counter = document.getElementById('quizCounter');
  const progress = document.getElementById('quizProgress');

  counter.textContent = `Caso 0${currentQ + 1} / 0${quizQuestions.length}`;
  progress.style.width = `${((currentQ) / quizQuestions.length) * 100}%`;

  area.innerHTML = `
    <span class="quiz-tag">${q.tag}</span>
    <h3 class="quiz-question">${q.q}</h3>
    <div class="quiz-options">
      ${q.opts.map((opt, i) => `
        <button class="quiz-opt" data-index="${i}">
          <span>${opt}</span>
        </button>
      `).join('')}
    </div>
    <div class="quiz-feedback" id="quizFeedback"></div>
    <button class="btn btn-primary quiz-next-btn" id="nextQBtn">Próximo Caso →</button>
  `;

  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', (e) => handleAnswer(parseInt(e.currentTarget.dataset.index)));
  });
}

function handleAnswer(selectedIndex) {
  const q = quizQuestions[currentQ];
  const opts = document.querySelectorAll('.quiz-opt');
  const feedback = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextQBtn');

  opts.forEach(btn => btn.disabled = true);

  if (selectedIndex === q.correct) {
    opts[selectedIndex].classList.add('correct');
    score++;
    document.getElementById('quizScore').textContent = score;
    feedback.className = 'quiz-feedback visible pass';
    feedback.innerHTML = `<strong>Correto!</strong> ${q.exp}`;
  } else {
    opts[selectedIndex].classList.add('wrong');
    opts[q.correct].classList.add('correct');
    feedback.className = 'quiz-feedback visible fail';
    feedback.innerHTML = `<strong>Incorreto.</strong> ${q.exp}`;
  }

  nextBtn.style.display = 'inline-flex';
  nextBtn.addEventListener('click', () => {
    currentQ++;
    if (currentQ < quizQuestions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  });
}

function finishQuiz() {
  const area = document.getElementById('quizArea');
  const progress = document.getElementById('quizProgress');
  progress.style.width = '100%';

  area.innerHTML = `
    <div style="text-align: center; padding: 20px 0;">
      <h3>Avaliação Concluída!</h3>
      <p style="color: var(--text-muted)">Você acertou <strong>${score}</strong> de <strong>${quizQuestions.length}</strong> casos analisados.</p>
      <button class="btn btn-primary" onclick="location.reload()">Reiniciar Testes</button>
    </div>
  `;
}

/* ============ UTILS ============ */
function initClock() {
  const clock = document.getElementById('clock');
  function update() {
    const now = new Date();
    clock.textContent = now.toUTCString().split(' ')[4];
  }
  update();
  setInterval(update, 1000);
}