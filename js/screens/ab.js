/* ════════════════════════════════════════════
   screens/ab.js — A/B 취향 선택 플로우
════════════════════════════════════════════ */
Object.assign(App, {

  startFlow() {
    this._setupAB();
    document.getElementById('sAB').innerHTML = `<div class="ab-wrap">
      <div class="ab-round" id="abRound"></div>
      <div id="abMidNudge"></div>
      <div class="ab-q"><h2 id="abQ"></h2></div>
      <div class="ab-sub">직감적으로, 빠르게 골라 주세요</div>
      <div class="ab-cards" id="abCards"></div>
    </div>`;
    this.showScreen('sAB');
    this.setStep('STEP 1/3');
    this.renderAB();
    this.setProgress(3);
  },

  _setupAB() {
    const must = CONFIG.CORE_DIMENSIONS
                       .sort(() => Math.random() - .5)
                       .slice(0, 5)
                       .map(d => CONFIG.AB.find(p => p.dim === d))
                       .filter(Boolean);
    AppState.abSubset = [...must].sort(() => Math.random() - .5);
  },

  renderAB() {
    const { round, abSubset } = AppState;
    if (round >= abSubset.length) { this._goMemScreen(); return; }
    this.setProgress(3 + (round / abSubset.length) * 37);
    const p = abSubset[round];
    document.getElementById('abRound').textContent = `${round + 1} / ${abSubset.length}`;

    document.getElementById('sAB').style.transition = 'background 0.5s ease';
    document.getElementById('sAB').style.background = `radial-gradient(circle at top left, ${p.a.c}11, transparent 60%), radial-gradient(circle at bottom right, ${p.b.c}11, transparent 60%)`;

    document.getElementById('abQ').textContent = p.q;
    const cardsHtml = ['a','b'].map(side => `
      <div class="ab-card" id="c${side.toUpperCase()}" data-side="${side}">
        <div class="ab-card-bg" style="background-image:url(${p[side].bgUrl})"></div>
        <div class="ab-content-wrap">
          <div class="ab-atmo" style="background:${p[side].c}"></div>
          <div><div class="ab-emoji">${p[side].emoji}</div><div class="ab-title">${p[side].title}</div></div>
          <div class="ab-desc">${p[side].desc}</div>
        </div>
      </div>`).join('');

    document.getElementById('abCards').innerHTML = cardsHtml;
    this._attachCardInteractions();
  },

  _attachCardInteractions() {
    const cards = document.querySelectorAll('.ab-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('sel') && !card.classList.contains('notsel')) {
          this.selectAB(card.dataset.side);
        }
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        if (!card.classList.contains('sel') && !card.classList.contains('notsel')) {
          card.style.transform = `scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('sel') && !card.classList.contains('notsel')) {
          card.style.transform = `scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }
      });

      let touchStartX = 0;
      let touchStartY = 0;
      card.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, {passive:true});

      card.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          card.style.transition = 'transform 0.3s';
          card.style.transform = deltaX > 0
            ? `translateX(20px) rotate(3deg)`
            : `translateX(-20px) rotate(-3deg)`;
          setTimeout(() => this.selectAB(card.dataset.side), 150);
        }
      });
    });
  },

  selectAB(side) {
    if (!AppState.abSubset[AppState.round]) return;
    AppState.choices[AppState.abSubset[AppState.round].dim] = side;

    const sel = document.getElementById(`c${side.toUpperCase()}`);
    const oth = document.getElementById(side === 'a' ? 'cB' : 'cA');
    if (!sel || !oth) return;

    sel.style.transform = '';
    oth.style.transform = '';
    sel.classList.add('sel');
    oth.classList.add('notsel');
    sel.style.pointerEvents = oth.style.pointerEvents = 'none';

    const pb = document.getElementById('prog');
    pb.style.boxShadow = '0 0 10px var(--terra), 0 0 20px var(--terra)';
    setTimeout(() => pb.style.boxShadow = 'none', 400);

    setTimeout(() => { AppState.round++; this.renderAB(); }, 800);
  }

});
