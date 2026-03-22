/* ════════════════════════════════════════════
   screens/plan.js — 여행 계획 입력 + 달력
════════════════════════════════════════════ */
Object.assign(App, {

  /* ── 취향-도시 매칭 점수 계산 (0~100) ── */
  /* 알고리즘: 취향값이 중앙(50)에서 멀수록 해당 차원 가중치 증가
     weight = (|pScore - 50| / 50) * 1.5 + 0.5  → 범위 0.5 ~ 2.0
     극단적 취향(0 또는 100)은 해당 차원을 2배 반영,
     중립(50)은 0.5배 반영 → 도시간 구분력 극대화 */
  _calcMatchScore(profile, cityId) {
    const dims = CONFIG.CITY_DIMENSIONS[cityId];
    if (!dims || !profile?.dimensions) return null;
    const keys = ['crowd', 'explore', 'pace', 'immersion'];

    let weightedDiff = 0, weightedMax = 0;
    keys.forEach(k => {
      const pScore = profile.dimensions[k]?.score ?? 50;
      const cScore = dims[k] ?? 50;
      const weight = (Math.abs(pScore - 50) / 50) * 1.5 + 0.5; // 0.5 ~ 2.0
      weightedDiff += Math.abs(pScore - cScore) * weight;
      weightedMax  += 100 * weight;
    });
    return Math.round(100 - (weightedDiff / weightedMax) * 100);
  },

  /* ── 매칭 점수 기준 도시 정렬 ── */
  _sortCitiesByMatch(profile) {
    if (!profile) return CONFIG.CITIES;
    return [...CONFIG.CITIES].sort((a, b) => {
      const idA = CONFIG.CITY_MAP[a];
      const idB = CONFIG.CITY_MAP[b];
      const sA = this._calcMatchScore(profile, idA) ?? 0;
      const sB = this._calcMatchScore(profile, idB) ?? 0;
      return sB - sA;
    });
  },

  /* ── 매칭 점수 → 뱃지 레벨 (5단계) ── */
  _matchLevel(score) {
    if (score === null) return null;
    if (score >= 78) return { cls: 'match-perfect', label: '완벽 일치' };
    if (score >= 65) return { cls: 'match-top',     label: '최고 일치' };
    if (score >= 52) return { cls: 'match-good',    label: '잘 맞아요' };
    if (score >= 40) return { cls: 'match-ok',      label: '무난해요'  };
    if (score >= 28) return { cls: 'match-low',     label: '아쉬워요'  };
    return null; // 28 미만은 뱃지 없음
  },

  /* ── 도시 목록 필터링: 프로필 있을 때만 적용 ──
     완벽+최고 일치 (score ≥ 65): 전체 노출
     잘 맞아요 (52~64):          상위 5개까지만
     무난해요 이하 (< 52):       숨김              */
  _filterCitiesByMatch(sortedCities, profile) {
    if (!profile) return sortedCities; // 프로필 없으면 전부 노출

    let goodCount = 0;
    return sortedCities.filter(c => {
      const cityId = CONFIG.CITY_MAP[c];
      const score  = this._calcMatchScore(profile, cityId);
      if (score === null) return false;
      if (score >= 65) return true;                       // 완벽·최고 일치: 전부
      if (score >= 52 && goodCount < 5) { goodCount++; return true; } // 잘 맞아요: 5개
      return false;                                       // 무난해요 이하: 숨김
    });
  },

  /* ── 도시 카드 HTML 생성 헬퍼 ── */
  _cityCardHtml(c, p) {
    const cityId    = CONFIG.CITY_MAP[c];
    const score     = this._calcMatchScore(p, cityId);
    const level     = this._matchLevel(score);
    const badge     = level ? `<span class="match-badge ${level.cls}">${level.label}</span>` : '';
    const scoreHtml = (score !== null && p)
      ? `<span class="city-card-score">${score}<small>%</small></span>` : '';
    const accentCls = level ? ` card-accent-${level.cls}` : '';
    return `<div class="city-card${level ? ' has-match' : ''}${accentCls}"
              onclick="App.pickCity(this,'${c}')"
              data-city-id="${cityId || ''}" data-match="${score ?? ''}">
              <div class="city-card-top">
                <span class="city-card-name">${c}</span>
                ${scoreHtml}
              </div>
              ${badge}
            </div>`;
  },

  _renderPlanScreen() {
    const p = AppState.currentProfile;
    const profileBadge = p ? `<div class="plan-dna-badge">✦ ${p.typeName}</div>` : '';
    const sortedCities  = this._sortCitiesByMatch(p);
    const visibleCities = this._filterCitiesByMatch(sortedCities, p);

    /* 프로필 있을 때 — 상위/일치 두 그룹으로 나눠 섹션 헤더와 함께 렌더 */
    let citiesHtml;
    if (p) {
      const topCities  = visibleCities.filter(c => {
        const s = this._calcMatchScore(p, CONFIG.CITY_MAP[c]);
        return s !== null && s >= 65;
      });
      const goodCities = visibleCities.filter(c => {
        const s = this._calcMatchScore(p, CONFIG.CITY_MAP[c]);
        return s !== null && s >= 52 && s < 65;
      });
      citiesHtml = `
        ${topCities.length ? `
          <div class="city-section-head">✦ 가장 잘 맞는 도시</div>
          <div class="city-grid">${topCities.map(c => this._cityCardHtml(c, p)).join('')}</div>
        ` : ''}
        ${goodCities.length ? `
          <div class="city-section-head city-section-sub">잘 맞아요</div>
          <div class="city-grid">${goodCities.map(c => this._cityCardHtml(c, p)).join('')}</div>
        ` : ''}`;
    } else {
      citiesHtml = `<div class="city-grid">
        ${visibleCities.map(c => this._cityCardHtml(c, null)).join('')}
      </div>`;
    }

    document.getElementById('sPlan').innerHTML = `<div class="plan-wrap">
      ${profileBadge}
      <h2>어디로 떠나시겠어요?</h2>
      <div class="sub">${p ? '취향에 잘 맞는 도시만 골랐어요 · 직접 입력도 가능해요' : '도시를 선택하거나 직접 입력하세요'}</div>
      ${citiesHtml}
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

    const p = AppState.currentProfile;
    const normCity2 = cityName.trim().normalize('NFC').toLowerCase();
    const cId = CONFIG.CITY_MAP[normCity2] || null;
    const score = this._calcMatchScore(p, cId);
    const level = this._matchLevel(score);
    const matchHtml = (score !== null && p)
      ? `<div class="preview-match">
          <div class="preview-match-header">
            <span class="preview-match-label">취향 일치도</span>
            <span class="preview-match-score ${level ? level.cls : ''}">${score}%${level ? ' · ' + level.label : ''}</span>
          </div>
          <div class="preview-match-bars">
            ${['crowd','explore','pace','immersion'].map((k, i) => {
              const poles   = [['활기','고요'],['랜드마크','뒷골목'],['빼곡','여유'],['관광객','현지인']];
              const pVal    = p.dimensions[k]?.score ?? 50;
              const cVal    = CONFIG.CITY_DIMENSIONS[cId]?.[k] ?? 50;
              const diff    = Math.abs(pVal - cVal);
              const diffCls = diff < 20 ? 'pmb-match' : diff < 40 ? 'pmb-near' : 'pmb-far';
              const diffTxt = diff < 20 ? '잘 맞아요' : diff < 40 ? '비슷해요' : '차이 있음';
              /* 극단 방향 텍스트: 값이 낮으면 왼쪽 극단명, 높으면 오른쪽 극단명 */
              const pTendency = pVal < 42 ? poles[i][0] : pVal > 58 ? poles[i][1] : '보통';
              const cTendency = cVal < 42 ? poles[i][0] : cVal > 58 ? poles[i][1] : '보통';
              return `<div class="pmb-row2">
                <div class="pmb2-poles">
                  <span class="pmb2-pole-l">${poles[i][0]}</span>
                  <span class="pmb2-pole-r">${poles[i][1]}</span>
                </div>
                <div class="pmb2-bars">
                  <div class="pmb2-bar-row">
                    <span class="pmb2-who">나</span>
                    <div class="pmb2-track">
                      <div class="pmb2-fill pmb2-user" style="width:${pVal}%"></div>
                    </div>
                    <span class="pmb2-tend">${pTendency}</span>
                  </div>
                  <div class="pmb2-bar-row">
                    <span class="pmb2-who">도시</span>
                    <div class="pmb2-track">
                      <div class="pmb2-fill pmb2-city ${diffCls}" style="width:${cVal}%"></div>
                    </div>
                    <span class="pmb2-tend">${cTendency}</span>
                  </div>
                </div>
                <span class="pmb2-status ${diffCls}">${diffTxt}</span>
              </div>`;
            }).join('')}
          </div>
        </div>` : '';

    preview.innerHTML = `
      <div class="preview-city-name">📍 ${cityName}</div>
      <div class="preview-desc">${cd.description || ''}</div>
      ${matchHtml}
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
