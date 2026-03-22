/* ════════════════════════════════════════════
   screens/memory.js — 기억 입력 + 기피 항목 선택
════════════════════════════════════════════ */
Object.assign(App, {

  /* ── 기억 화면 ── */
  _goMemScreen() {
    document.getElementById('sMem').innerHTML = `<div class="mem-wrap">
      <h2>최고의 여행 순간을<br>하나만 떠올려 보세요</h2>
      <div class="sub">장소, 상황, 느낌 — 무엇이든 좋습니다</div>
      <div class="mem-incentive">💡 구체적일수록 정확한 취향을 찾습니다</div>
      <textarea class="mem-ta" id="memTxt" placeholder="예: 파리 골목의 작은 카페에서 비 오는 거리를 멍하니 바라보던 오후..."></textarea>
      <div class="emo-label">그때 느꼈던 감정은? (복수 선택)</div>
      <div class="emo-grid">${CONFIG.EMOTIONS.map(e =>
        `<div class="emo-chip" onclick="App.toggleEmotion(this,'${e}')">${e}</div>`
      ).join('')}</div>
      <button class="btn btn-primary" onclick="App.finMem()">다음으로</button>
      <button class="btn-skip" onclick="App.skipMem()">건너뛰기</button>
    </div>`;
    this.showScreen('sMem');
    this.setStep('STEP 2/3');
    this.setProgress(45);
  },

  goMem() { this._goMemScreen(); },

  toggleEmotion(el, v) {
    el.classList.toggle('sel');
    const i = AppState.selectedEmotions.indexOf(v);
    i > -1 ? AppState.selectedEmotions.splice(i, 1) : AppState.selectedEmotions.push(v);
  },

  finMem()  { AppState.memoryText = document.getElementById('memTxt')?.value || ''; this.goNeg(); },
  skipMem() { AppState.memoryText = ''; AppState.selectedEmotions = []; this.goNeg(); },

  /* ── 기피 항목 화면 ── */
  goNeg() {
    document.getElementById('sNeg').innerHTML = `<div class="neg-wrap">
      <h2>여행에서 <em style="color:var(--rose);font-family:'Cormorant Garamond',serif;font-style:italic">절대</em> 겪고 싶지 않은 것</h2>
      <div class="sub">해당하는 것을 모두 골라 주세요</div>
      <div class="neg-promise">✓ 선택한 항목은 일정에서 제외됩니다</div>
      <div class="neg-count" id="negCnt">0개 선택</div>
      <div class="neg-grid">${CONFIG.NEGATIVES.map((n, i) =>
        `<div class="neg-card" onclick="App.toggleNeg(this,${i})"><span class="ic">${n.i}</span><span class="tx">${n.t}</span></div>`
      ).join('')}</div>
      <button class="btn btn-primary" onclick="App.finAcc()">결과 보기</button>
    </div>`;
    this.showScreen('sNeg');
    this.setStep('STEP 3/3');
    this.setProgress(55);
  },

  toggleNeg(el, i) {
    el.classList.toggle('sel');
    const t = CONFIG.NEGATIVES[i].t;
    const idx = AppState.selectedNegatives.indexOf(t);
    idx > -1 ? AppState.selectedNegatives.splice(idx, 1) : AppState.selectedNegatives.push(t);
    document.getElementById('negCnt').textContent = AppState.selectedNegatives.length + '개 선택';
  },

  finAcc() {
    this.setProgress(82);
    document.getElementById('sLoad').innerHTML = `<div class="ld-wrap">
      <div class="ld-spinner"></div>
      <div class="ld-txt" id="ldTxt">취향을 분석하고 있습니다...</div>
      <div class="ld-sub" id="ldSub">당신만의 고유한 여행 DNA를 조합 중...</div>
      <div class="ld-insight" id="ldInsight" style="display:none">
        <div class="ld-insight-label">흥미로운 조합 발견 ✦</div>
        <div class="ld-insight-msg" id="ldInsightMsg"></div>
      </div>
    </div>`;
    this.showScreen('sLoad');
    this.setStep('');

    const ins = CONFIG.LOADING_INSIGHTS.find(i => i.cond(AppState.choices));
    if (ins) setTimeout(() => {
      document.getElementById('ldInsightMsg').textContent = ins.msg;
      document.getElementById('ldInsight').style.display = 'block';
    }, 900);

    this._analyzeProfile();
  }

});
