/* ════════════════════════════════════════════
   app.js — 코어: 화면 전환, 진행 상태, 공통 유틸
════════════════════════════════════════════ */
const App = {

  /* ── 화면 전환 ── */
  showScreen(id, scroll = false) {
    if (this._calOutsideHandlerBound) {
      document.removeEventListener('click', this._calOutsideHandlerBound);
      this._calOutsideHandlerBound = null;
    }
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'active-scroll'));
    document.getElementById(id).classList.add(scroll ? 'active-scroll' : 'active');
    window.scrollTo(0, 0);
  },

  /* ── 진행바 / 스텝 표시 ── */
  setProgress(p) {
    const el = document.getElementById('prog');
    if (el) el.style.width = p + '%';
    this._updateVisuals(p);
  },

  setStep(txt) {
    const el = document.getElementById('stepInd');
    if (el) el.textContent = txt;
  },

  /* ── 배경 비주얼 업데이트 ── */
  _updateVisuals(p) {
    const root = document.documentElement;
    const blur    = Math.max(0, 60 - (p * 0.6));
    const opacity = 0.1 + (p * 0.009);
    const scale   = 0.8 + (p * 0.003);

    root.style.setProperty('--v-blur',    `${blur}px`);
    root.style.setProperty('--v-opacity', opacity);
    root.style.setProperty('--v-scale',   scale);

    if (AppState.currentProfile || AppState.presetId) {
      const pId = AppState.presetId || this._guessArchetype();
      const vis = CONFIG.PRESETS.find(pr => pr.id === pId)?.visuals || {c1:'#0d0d0d', c2:'#1a1a1a', tex:''};
      root.style.setProperty('--v-c1', vis.c1);
      root.style.setProperty('--v-c2', vis.c2);

      const bg = document.getElementById('vBackground');
      if (bg) {
        bg.classList.remove('v-tex-zen', 'v-tex-bold', 'v-tex-local', 'v-tex-flaneur');
        if (vis.tex) bg.classList.add(vis.tex);
      }
    }

    const dna = document.getElementById('vDNA');
    if (dna) {
      dna.style.transition = 'all 0.4s ease';
      dna.style.transform = `scale(${scale + 0.05}) translate(-50%, -50%)`;
      setTimeout(() => {
        dna.style.transition = 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
        dna.style.transform = `scale(${scale}) translate(-50%, -50%)`;
      }, 400);
    }
  },

  /* ── 토스트 알림 ── */
  toast(msg) {
    const t = document.getElementById('shareToast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  },

  /* ── 아키타입 추정 (분석 전 비주얼용) ── */
  _guessArchetype() {
    const ch = AppState.choices;
    const dims = Object.keys(ch);
    if (dims.length === 0) return null;

    let scores = { zen: 0, local: 0, bold: 0, flaneur: 0 };

    if (ch.crowd === 'b') scores.zen += 2;
    if (ch.pace  === 'b') scores.zen += 1;

    if (ch.local  === 'b') scores.local += 2;
    if (ch.dining === 'b') scores.local += 1;

    if (ch.pace      === 'a') scores.bold += 2;
    if (ch.discovery === 'a') scores.bold += 1;

    if (ch.culture === 'a') scores.flaneur += 1;
    if (ch.nature  === 'b') scores.flaneur += 1;

    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    return top[1] > 0 ? top[0] : 'flaneur';
  },

  /* ── 진입점 ── */
  init() {
    this.setProgress(0);
    this.renderIntro();
  }
};
