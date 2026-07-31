
/* ==========================================================================
   INICIALIZAÇÃO DA PÁGINA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTerminal === 'function') initTerminal();
  if (typeof initChartObserver === 'function') initChartObserver();
  if (typeof renderTypeGrid === 'function') renderTypeGrid();
  if (typeof initMatchGame === 'function') initMatchGame();
  if (typeof initClock === 'function') initClock();
  if (typeof renderCases === 'function') renderCases();
});

/* ============ TERMINAL SIMULATOR ============ */
function initTerminal() {
  const termBody = document.getElementById('termBody');
  if (!termBody) return;

  const logs = [
    { text: '$ npm run test:suite --silent', type: 'term-dim', delay: 200 },
    { text: '[PASS] src/modules/auth/login.spec.js', type: 'term-success', delay: 400 },
    { text: '[PASS] src/modules/cart/calculator.spec.js', type: 'term-success', delay: 200 },
    { text: '[FAIL] src/modules/checkout/payment.spec.js', type: 'term-fail', delay: 500 },
    { text: '   └ Cartão expirado retornou HTTP 200 ao invés de 402', type: 'term-dim', delay: 100 },
    { text: '[WARN] Latência da API ultrapassou 1200ms', type: 'term-warn', delay: 300 },
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
  const container = document.getElementById('costBars');

  if (!container || bars.length === 0) return;

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

  observer.observe(container);
}

/* ============ TIPOS DE TESTE ============ */
const tiposTeste = [
  { name: 'Testes Unitários', desc: 'Testa uma parte bem pequena do código, como uma única função, para verificar se a resposta do sistema é esperada.' },
  { name: 'Testes de Integração', desc: 'Testa se duas ou mais partes do sistema conseguem se comunicar.' },
  { name: 'Testes Ponta a Ponta (E2E)', desc: 'Testa fluxos completos simulando a jornada real do usuário no sistema.' },
  { name: 'Testes de Carga & Estresse', desc: 'Avaliando a estabilidade do sistema sob alto volume de requisições concorrentes.' },
  { name: 'Testes de Segurança', desc: 'Mapeamento proativo de vulnerabilidades como injeção de SQL, XSS e brechas de autenticação.' },
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

/* ============ UTILS / CLOCK ============ */
function initClock() {
  const clock = document.getElementById('clock');
  if (!clock) return;

  function update() {
    const now = new Date();
    clock.textContent = now.toUTCString().split(' ')[4];
  }
  update();
  setInterval(update, 1000);
}

/* ============ CASOS HISTÓRICOS ============ */
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
    tag: 'Implantação',
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

  window.carouselStates = casesData.map(() => ({ current: 0 }));
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

/* ============ JOGO DE CONEXÃO (MATCH GAME) ============ */
/* ============ JOGO DE CONEXÃO (MATCH GAME) ============ */
const gameLevels = [
  {
    level: 1,
    title: "Nível 1 — Básico",
    pairs: [
      { id: "1", problem: "Vazamento de credenciais e invasão de banco de dados.", test: "Testes de Segurança" },
      { id: "2", problem: "Instabilidade do aplicativo sob alto volume de acessos simultâneos.", test: "Testes de Desempenho" },
      { id: "3", problem: "Dificuldade de navegação na interface e elementos confusos.", test: "Testes de Usabilidade" },
      { id: "4", problem: "Falha de funcionalidade legada após a implantação da nova versão.", test: "Testes de Regressão" }
    ]
  },
  {
    level: 2,
    title: "Nível 2 — Avançado",
    pairs: [
      { id: "5", problem: "Erro isolado de cálculo em método específico do sistema.", test: "Testes Unitários" },
      { id: "6", problem: "Falha na comunicação entre a API e a camada do banco de dados.", test: "Testes de Integração" },
      { id: "7", problem: "Serviço inacessível imediatamente após a implantação (build).", test: "Testes de Fumaça (Smoke)" },
      { id: "8", problem: "Validação da conformidade da solução com as regras de negócio.", test: "Testes de Aceitação" }
    ]
  }
];

let currentLevelIdx = 0;
let score = 0;
let selectedProblemId = null;
let matchedInCurrentLevel = 0;

function initMatchGame() {
  renderLevel(currentLevelIdx);
}

function renderLevel(idx) {
  const container = document.getElementById('matchArea');
  if (!container) return;

  const levelData = gameLevels[idx];
  matchedInCurrentLevel = 0;
  selectedProblemId = null;

  const counter = document.getElementById('matchCounter');
  const progress = document.getElementById('matchProgress');
  const scoreElem = document.getElementById('matchScore');

  if (counter) counter.innerText = `Fase ${idx + 1} / ${gameLevels.length}`;
  if (progress) progress.style.width = `${((idx + 1) / gameLevels.length) * 100}%`;
  if (scoreElem) scoreElem.innerText = score;

  const shuffledProblems = [...levelData.pairs].sort(() => Math.random() - 0.5);
  const shuffledTests = [...levelData.pairs].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="match-game-grid">
      <div class="match-column">
        <div class="match-column-title">1. Selecione o Cenário</div>
        ${shuffledProblems.map(p => `
          <div class="match-card" 
               draggable="true" 
               data-id="${p.id}" 
               id="prob-${p.id}"
               onclick="selectProblem('${p.id}')"
               ondragstart="handleDragStart(event)">
            ${p.problem}
          </div>
        `).join('')}
      </div>

      <div class="match-column">
        <div class="match-column-title">2. Relacione ao Tipo de Teste</div>
        ${shuffledTests.map(t => `
          <div class="match-target" 
               data-id="${t.id}" 
               id="target-${t.id}"
               onclick="selectTarget('${t.id}')"
               ondragover="handleDragOver(event)"
               ondragleave="handleDragLeave(event)"
               ondrop="handleDrop(event)">
            <span>${t.test}</span>
            <span class="status-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.selectProblem = function(id) {
  document.querySelectorAll('.match-card').forEach(c => c.classList.remove('selected'));
  selectedProblemId = id;
  const card = document.getElementById(`prob-${id}`);
  if (card) card.classList.add('selected');
};

window.selectTarget = function(targetId) {
  if (!selectedProblemId) return;
  checkMatch(selectedProblemId, targetId);
};

window.handleDragStart = function(e) {
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.id);
  window.selectProblem(e.currentTarget.dataset.id);
};

window.handleDragOver = function(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
};

window.handleDragLeave = function(e) {
  e.currentTarget.classList.remove('drag-over');
};

window.handleDrop = function(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const problemId = e.dataTransfer.getData('text/plain');
  const targetId = e.currentTarget.dataset.id;
  checkMatch(problemId, targetId);
};

function checkMatch(problemId, targetId) {
  const levelData = gameLevels[currentLevelIdx];
  const targetElem = document.getElementById(`target-${targetId}`);
  const probElem = document.getElementById(`prob-${problemId}`);

  if (!targetElem || !probElem || targetElem.classList.contains('matched')) return;

  if (problemId === targetId) {
    // Acerto: +100 Pontos
    score += 100;
    matchedInCurrentLevel++;
    
    const scoreElem = document.getElementById('matchScore');
    if (scoreElem) scoreElem.innerText = score;

    probElem.style.visibility = 'hidden';
    targetElem.classList.add('matched');
    
    const icon = targetElem.querySelector('.status-icon');
    if (icon) {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    }

    selectedProblemId = null;

    if (matchedInCurrentLevel === levelData.pairs.length) {
      setTimeout(() => {
        if (currentLevelIdx + 1 < gameLevels.length) {
          currentLevelIdx++;
          renderLevel(currentLevelIdx);
        } else {
          renderGameEnd();
        }
      }, 600);
    }
  } else {
    // Erro: Perde 30 Pontos
    score = Math.max(-200, score - 30); // Limite mínimo de pontuação (-200)
    const scoreElem = document.getElementById('matchScore');
    if (scoreElem) scoreElem.innerText = score;

    targetElem.style.borderColor = 'var(--danger)';
    setTimeout(() => {
      targetElem.style.borderColor = '';
    }, 500);
  }
}

function renderGameEnd() {
  const container = document.getElementById('matchArea');
  if (!container) return;

  container.innerHTML = `
    <div class="match-result-screen">
      <h3>Avaliação do Desafio Concluída</h3>
      <p>Sua pontuação final foi de <strong>${score} pontos</strong>.</p>
      <button onclick="restartGame()" class="btn btn-primary" style="margin-top: 16px;">Reiniciar Desafio</button>
    </div>
  `;
}

window.restartGame = function() {
  currentLevelIdx = 0;
  score = 0;
  renderLevel(0);
};

/* ============ LOJA / SISTEMA DE RESGATE MULTÍPLO ============ */
window.buyBadge = function(badgeKey, price) {
  const statusElem = document.getElementById('badgeStatus');
  const btn = document.getElementById(`buyBtn-${badgeKey}`);
  const preview = document.getElementById(`badgePreview-${badgeKey}`);

  if (!statusElem || !btn) return;

  // Lógica especial para o "Tente Novamente" (desbloqueado se a pontuação for menor que 400)
  if (badgeKey === 'try') {
    btn.disabled = true;
    btn.innerText = "Resgatado";
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-primary');
    if (preview) preview.classList.add('unlocked');

    statusElem.className = 'badge-status-message error';
    statusElem.innerText = 'Insígnia "Participante" resgatada. Reinicie o desafio para tentar pontuar mais alto!';
    return;
  }

  // Lógica de resgate por pontuação suficiente
  if (score >= price) {
    btn.disabled = true;
    btn.innerText = "Resgatado";
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');

    if (preview) preview.classList.add('unlocked');

    statusElem.className = 'badge-status-message success';
    statusElem.innerText = `Parabéns! Insígnia desbloqueada com sucesso (${score} pontos).`;
  } else {
    // Pontuação insuficiente
    const missingPoints = price - score;
    statusElem.className = 'badge-status-message error';
    statusElem.innerText = `Pontos insuficientes. Você possui ${score} pontos (necessário mais ${missingPoints} pontos).`;

    setTimeout(() => {
      if (!btn.disabled) {
        statusElem.innerText = '';
        statusElem.className = 'badge-status-message';
      }
    }, 4000);
  }
};
function setDashboardMode(mode) {
  const btnWith = document.getElementById('btnWithTests');
  const btnWithout = document.getElementById('btnWithoutTests');
  
  const statAccuracy = document.getElementById('statAccuracy');
  const statBugs = document.getElementById('statBugs');
  const statTime = document.getElementById('statTime');
  
  const progressPercent = document.getElementById('progressPercent');
  const progressFill = document.getElementById('progressFill');
  
  const statusBox = document.getElementById('dashStatusBox');
  const statusIcon = document.getElementById('dashStatusIcon');
  const statusTitle = document.getElementById('dashStatusTitle');
  const statusDesc = document.getElementById('dashStatusDesc');

  if (mode === 'without') {
    btnWithout.classList.add('active');
    btnWith.classList.remove('active');

    statAccuracy.textContent = '42.0%';
    statAccuracy.className = 'stat-value text-danger';
    
    statBugs.textContent = '27+';
    statBugs.className = 'stat-value text-danger';
    
    statTime.textContent = '1x';

    progressPercent.textContent = '12%';
    progressFill.style.width = '12%';
    progressFill.style.background = '#ef4444';

    statusBox.classList.add('error-state');
    statusIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    statusTitle.textContent = 'Alto Risco de Falhas Críticas';
    statusDesc.textContent = 'Erros graves detectados no sistema por ausência de rotinas de verificação.';
  } else {
    btnWith.classList.add('active');
    btnWithout.classList.remove('active');

    statAccuracy.textContent = '99.8%';
    statAccuracy.className = 'stat-value text-success';
    
    statBugs.textContent = '0';
    statBugs.className = 'stat-value text-warning';
    
    statTime.textContent = '10x';

    progressPercent.textContent = '94%';
    progressFill.style.width = '94%';
    progressFill.style.background = 'linear-gradient(90deg, #10b981, #3b82f6)';

    statusBox.classList.remove('error-state');
    statusIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    statusTitle.textContent = 'Ambiente Seguro e Monitorado';
    statusDesc.textContent = 'Todas as regras de negócio foram testadas e validadas com sucesso.';
  }
}