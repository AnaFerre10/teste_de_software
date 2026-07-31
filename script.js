document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
  initChartObserver();
  renderTypeGrid();
  initQuiz();
  initClock();
  renderCases();
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
  { name: 'Testes Unitários', desc: 'Testa uma parte bem pequena do código, como uma única função, para verificar se a resposta do sistema é esperada.' },
  {  name: 'Testes de Integração', desc: 'Testa se duas ou mais partes do sistema conseguem se comunicar.' },
  {  name: 'Testes Ponta a Ponta (E2E)', desc: 'Testa se dois ou mais dispositivos conseguem se conectar e trocar dados diretamente entre si, sem precisar de um servidor no meio.' },
  { name: 'Testes de Regressão', desc: 'Garantem que novas alterações não quebraram funcionalidades antigas que já funcionavam.' },
  { name: 'Testes de Carga & Estresse', desc: 'Avaliando a estabilidade do sistema sob alto volume de requisições concorrentes.' },
  {  name: 'Testes de Segurança', desc: 'Mapeamento proativo de vulnerabilidades como injeção de SQL, XSS e brechas de autenticação.' },
  { name: 'Testes de Aceitação', desc: 'Confirmam com o cliente se o programa realmente resolve o problema para o qual foi criado.' },
  { name: 'Testes de Regressão', desc: 'Garantem que uma atualização nova não quebrou funcionalidades que já funcionavam antes.' },
  { name: 'Testes de Desempenho', desc: 'Medem a velocidade do sistema e avaliam se ele suporta muitos acessos simultâneos.' },
  { name: 'Testes de Usabilidade', desc: 'Avaliam se o sistema é fácil, intuitivo e agradável de usar por pessoas reais.' },
  { name: 'Testes de Fumaça (Smoke)', desc: 'Verificações rápidas e básicas para garantir que o sistema não quebrou por completo.' },
  { name: 'Testes Exploratórios', desc: 'Navegação livre e sem roteiro pelo sistema para tentar encontrar erros inesperados.' },
  { name: 'Testes de Caixa-Preta', desc: 'Testam o programa focado apenas na tela e no uso, sem olhar o código por dentro.' },
  { name: 'Testes de Caixa-Branca', desc: 'Testam olhando a estrutura interna do código para garantir que cada linha está correta.' }
];

function renderTypeGrid() {
  const grid = document.getElementById('typeGrid');
  if (!grid) return;

  grid.innerHTML = tiposTeste.map(tipo => `
    <div class="type-item">
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
// Substitua a função renderCases() e adicione estas funções

const casesData = [
  {
    tag: 'Falha de Sistema',
    year: '1996',
    title: 'Foguete Ariane 5 (Voo 501)',
    description: 'O foguete destruiu-se segundos após o lançamento. Um estouro de memória ocorreu ao tentar converter um número de 64 bits para 16 bits no código do sistema de navegação.',
    takeaway: 'Código legado deve ser retestado integralmente quando reaproveitado em novas condições operacionais.',
 images: [
'https://upload.wikimedia.org/wikipedia/commons/5/5c/Ariane_5_launch.jpg',
'https://upload.wikimedia.org/wikipedia/commons/0/0e/Ariane_5_explosion.jpg',
'https://upload.wikimedia.org/wikipedia/commons/9/94/Ariane_5_V501_failure.jpg'
]
  },
  {
    tag: 'Sistemas Críticos',
    year: '1985 – 1987',
    title: 'Therac-25',
    description: 'Uma falha do tipo "Condição de Corrida" (Race Condition) no software de controle da máquina de radioterapia resultou na liberação de doses letais de radiação em pacientes.',
    takeaway: 'Ambientes concorrentes exigem testes de concorrência e hardware em malha fechada (HIL).',
    images: [
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=400&fit=crop'
    ]
  },
  {
    tag: 'Integração',
    year: '1999',
    title: 'Mars Climate Orbiter',
    description: 'A sonda da NASA foi destruída ao entrar na atmosfera de Marte porque um módulo utilizava o sistema de unidades imperiais, enquanto o outro esperava o sistema métrico.',
    takeaway: 'Testes de integração entre módulos de fornecedores diferentes são fundamentais.',
    images: [
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0e7a?w=800&h=400&fit=crop'
    ]
  },
  {
    tag: 'ImplAntação',
    year: '2012',
    title: 'Knight Capital Group',
    description: 'A implantação de código não testado em um servidor ativou rotinas obsoletas. O sistema executou ordens financeiras erráticas, gerando um prejuízo de US$ 440 milhões em 45 minutos.',
    takeaway: 'Deploys precisam de validação e sanitização estrita do ambiente de produção real.',
    images: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop'
    ]
  }
];

function renderCases() {
  const grid = document.getElementById('casesGrid');
  if (!grid) return;

  grid.innerHTML = casesData.map((caseItem, index) => `
    <article class="case-card" data-case="${index}">
      <div class="case-image-container" id="carousel-${index}">
        <img src="${caseItem.images[0]}" alt="${caseItem.title}" class="carousel-img" data-index="0">
        <button class="case-nav-btn prev" onclick="changeImage(${index}, -1)">‹</button>
        <button class="case-nav-btn next" onclick="changeImage(${index}, 1)">›</button>
        <div class="case-carousel-controls">
          ${caseItem.images.map((_, i) => `
            <button class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToImage(${index}, ${i})"></button>
          `).join('')}
        </div>
      </div>
      <div class="case-header">
        <span class="case-tag danger">${caseItem.tag}</span>
        <span class="case-year">${caseItem.year}</span>
      </div>
      <div class="case-content">
        <h3>${caseItem.title}</h3>
        <p>${caseItem.description}</p>
        <div class="case-takeaway">
          <strong>Lição:</strong> ${caseItem.takeaway}
        </div>
      </div>
    </article>
  `).join('');

  window.carouselStates = casesData.map((_, i) => ({ current: 0 }));
}

window.changeImage = function(caseIndex, direction) {
  const state = window.carouselStates[caseIndex];
  const caseData = casesData[caseIndex];
  const total = caseData.images.length;
  state.current = (state.current + direction + total) % total;
  updateCarousel(caseIndex);
};

window.goToImage = function(caseIndex, imageIndex) {
  window.carouselStates[caseIndex].current = imageIndex;
  updateCarousel(caseIndex);
};

function updateCarousel(caseIndex) {
  const state = window.carouselStates[caseIndex];
  const caseData = casesData[caseIndex];
  const container = document.getElementById(`carousel-${caseIndex}`);
  if (!container) return;

  const img = container.querySelector('.carousel-img');
  const dots = container.querySelectorAll('.carousel-dot');

  img.src = caseData.images[state.current];
  img.style.opacity = '0';
  setTimeout(() => { img.style.opacity = '1'; }, 50);

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === state.current);
  });
}