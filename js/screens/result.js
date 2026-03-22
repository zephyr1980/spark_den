/* ════════════════════════════════════════════
   screens/result.js — 취향 분석 결과 화면
════════════════════════════════════════════ */
Object.assign(App, {

  renderResult(p) {
    this.setProgress(100);
    const dna = document.getElementById('vDNA');
    if (dna) dna.classList.add('v-reveal');
    const bg = document.getElementById('vBackground');
    if (bg) bg.classList.add('bg-bright');

    const dimColors = ['#C4704B','#7A9A7E','#C4A84B','#9A7AB4'];
    const mainColor = dimColors[0];

    document.getElementById('resContent').innerHTML = `
      <div class="taste-card-container">
        <div class="taste-card">
          <div class="taste-card-glow" style="background:${mainColor}"></div>

          <div class="tc-header">
            <div class="tc-label">#TRAVEL_DNA</div>
            <div class="tc-title">${p.typeName}</div>
            <div class="tc-desc">${p.typeDesc}</div>
          </div>

          <div class="tc-body">
            <div class="tc-section">
              <div class="tc-section-title">취향 키워드</div>
              <div class="tc-tags">${p.keywords.map(k => `<span class="tc-tag">${k}</span>`).join('')}</div>
            </div>

            <div class="tc-section">
              <div class="tc-section-title">분석 스펙트럼</div>
              <div class="tc-dims">
                ${Object.values(p.dimensions).map((d, i) => `
                  <div class="tc-dim-item">
                    <div class="tc-dim-labels"><span>${d.leftLabel}</span><span>${d.rightLabel}</span></div>
                    <div class="tc-dim-track"><div class="tc-dim-fill" style="width:${d.score}%;background:${dimColors[i%4]}"></div></div>
                  </div>`).join('')}
              </div>
            </div>

            <div class="tc-section">
              <div class="tc-ideal">
                <div class="tc-ideal-label">IDEAL TRIP</div>
                <div class="tc-ideal-text">"${p.idealTrip}"</div>
              </div>
            </div>
          </div>

          <div class="tc-footer">
            <div class="tc-footer-label">추천 도시: ${p.recommendCities.slice(0,2).join(', ')} ...</div>
            <div class="tc-footer-cities">
              <div class="tc-city-dot"></div><div class="tc-city-dot" style="opacity:0.5"></div><div class="tc-city-dot" style="opacity:0.2"></div>
            </div>
          </div>
        </div>

        <div class="res-cta">
          <div class="res-cta-btns">
            <button class="btn btn-primary" style="width:100%" onclick="App.goToPlan()">맞춤 일정 만들기 →</button>
            <button class="share-btn" onclick="App.shareResult()">🔗 공유</button>
            <button class="share-btn" onclick="App.copyResult()">📋 복사</button>
          </div>
          <div class="retry-row">
            <button class="btn btn-ghost btn-sm" onclick="App.retryFromAB()">A/B 다시</button>
            <button class="btn btn-ghost btn-sm" onclick="App.retryFromNeg()">기피 수정</button>
          </div>
        </div>
      </div>`;

    this.showScreen('sResult', true);
    this.setStep('');

    setTimeout(() => {
      document.querySelectorAll('.tc-dim-fill').forEach(el => {
        const w = el.style.width;
        el.style.width = '0';
        setTimeout(() => el.style.width = w, 50);
      });
    }, 100);
  },

  shareResult() {
    const p = AppState.currentProfile;
    const txt = `🧭 여행 취향 발견기 결과\n\n✦ ${p?.typeName||''}\n${p?.typeDesc||''}\n\n키워드: ${(p?.keywords||[]).join(' · ')}\n\n#여행취향 #TravelDNA`;
    if (navigator.share) navigator.share({title:'내 여행 DNA', text:txt}).catch(()=>{});
    else navigator.clipboard.writeText(txt).then(()=>this.toast('클립보드에 복사되었습니다 ✓')).catch(()=>this.toast('공유를 지원하지 않는 환경입니다'));
  },

  copyResult() {
    const p = AppState.currentProfile;
    const txt = `🧭 여행 취향 발견기 결과\n\n✦ ${p?.typeName||''}\n${p?.typeDesc||''}\n\n키워드: ${(p?.keywords||[]).join(' · ')}\n\n#여행취향 #TravelDNA`;
    navigator.clipboard.writeText(txt)
      .then(() => this.toast('클립보드에 복사되었습니다 ✓'))
      .catch(() => this.toast('복사에 실패했습니다'));
  },

  goToPlan() {
    this._renderPlanScreen();
    this.showScreen('sPlan', true);
  },

  retryFromAB() {
    AppState.reset();
    this.startFlow();
  },

  retryFromNeg() {
    AppState.resetFromNeg();
    this.goNeg();
  }

});
