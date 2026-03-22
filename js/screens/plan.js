/* ════════════════════════════════════════════
   screens/plan.js — 여행 계획 입력 + 달력
════════════════════════════════════════════ */
Object.assign(App, {

  _renderPlanScreen() {
    const p = AppState.currentProfile;
    const profileBadge = p ? `<div class="plan-dna-badge">✦ ${p.typeName}</div>` : '';
    document.getElementById('sPlan').innerHTML = `<div class="plan-wrap">
      ${profileBadge}
      <h2>어디로 떠나시겠어요?</h2>
      <div class="sub">도시를 선택하거나 직접 입력하세요</div>
      <div class="city-grid">
        ${CONFIG.CITIES.map(c =>
          `<div class="city-chip" onclick="App.pickCity(this,'${c}')">${c}</div>`
        ).join('')}
      </div>
      <input class="custom-city-input" id="customCity" placeholder="직접 입력 (예: 리오데자네이루)">

      <div id="cityPreview" class="city-preview" style="display:none"></div>

      <div class="plan-options">
        <div class="plan-row">
          <label>여행 기간</label>
          <select id="planDur" class="plan-sel">
            ${[2,3,4,5,6,7].map(d=>`<option value="${d}"${d===4?' selected':''}>${d}박 ${d+1}일</option>`).join('')}
          </select>
        </div>
        <div class="plan-row">
          <label>출발일</label>
          <div class="cal-wrap" id="calWrap">
            <button class="cal-trigger" id="calTrig" onclick="App.toggleCal()">
              <span id="calDisp" class="cal-placeholder">날짜 선택</span>
              <span>▾</span>
            </button>
            <div class="cal-dd" id="calDD">
              <div class="cal-head">
                <button onclick="App.calPrev()">‹</button>
                <span id="calMon"></span>
                <button onclick="App.calNext()">›</button>
              </div>
              <div class="cal-dow">일월화수목금토</div>
              <div class="cal-days" id="calDays"></div>
            </div>
          </div>
        </div>
        <div class="plan-row">
          <label>동행</label>
          <div class="companion-row">
            ${Object.entries(CONFIG.COMPANION_LABELS).map(([k,v]) =>
              `<button class="comp-btn${AppState.companion===k?' sel':''}" onclick="App.setComp('${k}',this)">${v}</button>`
            ).join('')}
          </div>
        </div>
        <div class="plan-row">
          <label>특별 요청 <span style="opacity:.5;font-size:.75rem">(선택)</span></label>
          <input class="plan-wish-input" id="planWish" placeholder="예: 미술관 위주, 야경 포함">
        </div>
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:1.5rem" onclick="App.generateItinerary()">
        🗺️ 맞춤 일정 생성하기
      </button>
      <button class="btn btn-ghost" style="width:100%;margin-top:.6rem" onclick="App.showScreen('sResult',true)">
        ← 취향 결과로 돌아가기
      </button>
    </div>`;

    const now = new Date();
    AppState.calYear  = now.getFullYear();
    AppState.calMonth = now.getMonth();
    this.renderCal();

    if (this._calOutsideHandlerBound) document.removeEventListener('click', this._calOutsideHandlerBound);
    this._calOutsideHandlerBound = this._calOutsideHandler.bind(this);
    document.addEventListener('click', this._calOutsideHandlerBound);
  },

  setComp(k, el) {
    AppState.companion = k;
    document.querySelectorAll('.comp-btn').forEach(b => b.classList.remove('sel'));
    el.classList.add('sel');
  },

  /* ── 도시 선택 ── */
  pickCity(el, c) {
    document.querySelectorAll('.city-chip').forEach(x => x.classList.remove('sel'));
    el.classList.add('sel');
    AppState.selectedCity = c;
    AppState.cityData = null;
    const customEl = document.getElementById('customCity');
    if (customEl) customEl.value = '';

    this._showCityPreview(c, null);

    setTimeout(async () => {
      await this.prefetchCityData(c);
      if (AppState.cityData) this._showCityPreview(c, AppState.cityData);
    }, 0);
  },

  _showCityPreview(cityName, data) {
    const preview = document.getElementById('cityPreview');
    if (!preview) return;

    const normCity = cityName.trim().normalize('NFC').toLowerCase();
    const mappedId = CONFIG.CITY_MAP[normCity] || null;
    const fallback = mappedId ? CONFIG.CITY_FALLBACKS[mappedId] : null;
    const cd = data || fallback;

    if (!cd) { preview.style.display = 'none'; return; }

    const sensesHtml = cd.senses ? `
      <div class="preview-senses">
        <div class="preview-sense"><span class="preview-sense-icon">👁</span><span>${cd.senses.sight}</span></div>
        <div class="preview-sense"><span class="preview-sense-icon">👂</span><span>${cd.senses.sound}</span></div>
        <div class="preview-sense"><span class="preview-sense-icon">👃</span><span>${cd.senses.smell}</span></div>
      </div>` : '';

    preview.innerHTML = `
      <div class="preview-city-name">📍 ${cityName}</div>
      <div class="preview-desc">${cd.description || ''}</div>
      ${sensesHtml}
    `;
    preview.style.display = 'block';
  },

  async prefetchCityData(city) {
    if (!city) return;
    const normCity = city.trim().normalize('NFC').toLowerCase();
    let mappedId = CONFIG.CITY_MAP[normCity] || Object.values(CONFIG.CITY_MAP).find(v => v === normCity) || null;

    if (mappedId && !AppState.cityData) {
      try {
        const dRes = await fetch(`taste/assets/cities/${mappedId}.json`);
        if (dRes.ok) AppState.cityData = await dRes.json();
      } catch(e) { console.log('Prefetch failed, will use fallback'); }
    }
  },

  /* ── 달력 ── */
  toggleCal() {
    document.getElementById('calDD').classList.toggle('show');
    document.getElementById('calTrig').classList.toggle('open');
  },

  calPrev() {
    AppState.calMonth === 0
      ? (AppState.calMonth = 11, AppState.calYear--)
      : AppState.calMonth--;
    this.renderCal();
  },

  calNext() {
    AppState.calMonth === 11
      ? (AppState.calMonth = 0, AppState.calYear++)
      : AppState.calMonth++;
    this.renderCal();
  },

  renderCal() {
    const { calYear: y, calMonth: m, calSelected } = AppState;
    document.getElementById('calMon').textContent = `${y}년 ${CONFIG.MONTH_NAMES[m]}`;
    const fd = new Date(y, m, 1), ld = new Date(y, m+1, 0).getDate(), sd = fd.getDay();
    const today = new Date(); today.setHours(0,0,0,0);
    const prev = new Date(y, m, 0).getDate();
    let h = '';
    for (let i = sd-1; i >= 0; i--) h += `<div class="cal-d om">${prev-i}</div>`;
    for (let d = 1; d <= ld; d++) {
      const dt = new Date(y, m, d);
      const cls = ['cal-d', dt < today ? 'past' : '', dt.getTime()===today.getTime() ? 'today' : '', calSelected&&dt.getTime()===calSelected.getTime() ? 'sel' : ''].filter(Boolean).join(' ');
      h += `<div class="${cls}" onclick="App.pickDay(${d})">${d}</div>`;
    }
    const rem = 7 - ((sd + ld) % 7);
    if (rem < 7) for (let i = 1; i <= rem; i++) h += `<div class="cal-d om">${i}</div>`;
    document.getElementById('calDays').innerHTML = h;
  },

  pickDay(d) {
    AppState.calSelected = new Date(AppState.calYear, AppState.calMonth, d);
    const dw = ['일','월','화','수','목','금','토'][AppState.calSelected.getDay()];
    document.getElementById('calDisp').textContent = `${AppState.calYear}.${String(AppState.calMonth+1).padStart(2,'0')}.${String(d).padStart(2,'0')} (${dw})`;
    document.getElementById('calDisp').classList.remove('cal-placeholder');
    this.renderCal();
    setTimeout(() => {
      document.getElementById('calDD').classList.remove('show');
      document.getElementById('calTrig').classList.remove('open');
    }, 200);
  },

  _calOutsideHandler(e) {
    const w = document.getElementById('calWrap');
    if (w && !w.contains(e.target)) {
      document.getElementById('calDD')?.classList.remove('show');
      document.getElementById('calTrig')?.classList.remove('open');
    }
  },

  /* ── 캐시 키 ── */
  _getItinCacheKey(city, dur, profile) {
    const dnaKey = profile ? profile.typeName : 'default';
    return `itin_cache_${city}_${dur}_${dnaKey}`.replace(/\s+/g, '_');
  }

});
