/* ════════════════════════════════════════════
   screens/intro.js — 인트로 화면 + 프리셋 선택
════════════════════════════════════════════ */
Object.assign(App, {

  /* 프리셋 id → SVG 심볼 id 매핑 */
  _presetIconId(id) {
    return { zen:'ic-zen', local:'ic-leaf', bold:'ic-explorer', flaneur:'ic-flaneur' }[id] || 'ic-compass';
  },

  renderIntro() {
    document.getElementById('sIntro').innerHTML = `<div class="intro">
      <svg class="ic-logo" aria-hidden="true"><use href="#ic-compass"/></svg>
      <div class="intro-value">취향 기반 여행 큐레이션</div>
      <h1>당신의 <em>여행 취향</em>을<br>발견해 보세요</h1>
      <p>직접 말하기 어려운 여행 취향도 있습니다.<br>몇 가지 선택만으로 당신만의 여행 DNA를 찾고,<br>그에 맞는 실제 일정까지 만들어 드립니다.</p>
      <div class="intro-preset-title" style="margin:2rem 0 0.8rem;font-size:0.9rem;font-weight:600;color:var(--terra)">혹시 자기 취향을 잘 알고 계신가요?</div>
      <div class="preset-grid">
        ${CONFIG.PRESETS.map(p => `
          <div class="preset-card" onclick="App.selectPreset('${p.id}')">
            <svg class="ic-preset" aria-hidden="true"><use href="#${this._presetIconId(p.id)}"/></svg>
            <div class="preset-info">
              <div class="preset-title">${p.title}</div>
              <div class="preset-desc">${p.desc}</div>
            </div>
            <div class="preset-arrow">→</div>
          </div>
        `).join('')}
      </div>
      <div style="margin:2.4rem 0 1rem;font-size:0.9rem;opacity:0.6">— 또는 —</div>
      <button class="btn btn-primary" style="width:100%" onclick="App.startFlow()">나의 여행 DNA 정밀 분석하기</button>
      ${this._hasCachedProfile() ? `<button class="btn btn-ghost" style="margin-top:0.6rem;font-size:0.8rem;width:100%" onclick="App.loadCachedProfile()">기존 취향으로 결과 보기</button>` : ''}
    </div>`;
    this.setProgress(0);
  },

  selectPreset(id) {
    const preset = CONFIG.PRESETS.find(p => p.id === id);
    if (!preset) return;

    AppState.presetId = id;
    document.getElementById('sLoad').innerHTML = `<div class="ld-wrap">
      <div class="ld-spinner"></div>
      <div class="ld-txt">'${preset.title}' 테마를 불러오고 있습니다</div>
      <div class="ld-sub">당신을 위한 최적의 여행 DNA를 조합 중...</div>
    </div>`;
    this.showScreen('sLoad');
    this.setProgress(82);

    setTimeout(() => {
      AppState.currentProfile = JSON.parse(JSON.stringify(preset.profile));
      localStorage.setItem('travel_dna_profile', JSON.stringify(AppState.currentProfile));
      this.renderResult(AppState.currentProfile);
    }, 1200);
  },

  _hasCachedProfile() {
    return !!localStorage.getItem('travel_dna_profile');
  },

  loadCachedProfile() {
    try {
      const p = JSON.parse(localStorage.getItem('travel_dna_profile'));
      if (p) { AppState.currentProfile = p; this.renderResult(p); }
      else this.startFlow();
    } catch(e) { this.startFlow(); }
  }

});
