/* ════════════════════════════════════════════
   screens/itinerary.js — 일정 생성 · 렌더링 · 지도
════════════════════════════════════════════ */
Object.assign(App, {

  /* ── 일정 생성 진입점 ── */
  async generateItinerary() {
    const custom = document.getElementById('customCity').value.trim();
    const city = custom || AppState.selectedCity;
    if (!city) { alert('여행지를 선택하거나 입력해 주세요.'); return; }

    const { calSelected, selectedNegatives: neg, companion, currentProfile: p } = AppState;
    const dateStr = calSelected
      ? `${calSelected.getFullYear()}-${String(calSelected.getMonth()+1).padStart(2,'0')}-${String(calSelected.getDate()).padStart(2,'0')}`
      : '미정';
    const dur  = document.getElementById('planDur').value;
    const wish = document.getElementById('planWish').value.trim();

    const normCity = city.trim().normalize('NFC').toLowerCase();
    let mappedId = CONFIG.CITY_MAP[normCity] || Object.values(CONFIG.CITY_MAP).find(v => v === normCity) || null;

    if (mappedId && !AppState.cityData) {
      if (CONFIG.CITY_FALLBACKS[mappedId]) AppState.cityData = CONFIG.CITY_FALLBACKS[mappedId];
    } else if (!mappedId) {
      AppState.cityData = null;
    }

    // 캐시 확인
    const cacheKey = this._getItinCacheKey(city, dur, p);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const it = JSON.parse(cached);
        this.renderItinerary(it, city, dur, dateStr);
        return;
      } catch(e) { localStorage.removeItem(cacheKey); }
    }

    this._showItinSkeleton(city, dur);
    if (this._calOutsideHandlerBound) {
      document.removeEventListener('click', this._calOutsideHandlerBound);
      this._calOutsideHandlerBound = null;
    }

    // 도시 데이터 fetch
    if (mappedId) {
      if (!AppState.cityData) {
        if (CONFIG.CITY_FALLBACKS[mappedId]) AppState.cityData = CONFIG.CITY_FALLBACKS[mappedId];
        try {
          const dRes = await fetch(`taste/assets/cities/${mappedId}.json`);
          if (dRes.ok) AppState.cityData = await dRes.json();
        } catch(e) { /* fallback 유지 */ }
      }
    } else {
      AppState.cityData = null;
    }

    const prompt = this._buildItineraryPrompt(city, dur, dateStr, wish, mappedId, p, neg);

    try {
      const it = await this._fetchItineraryStream(prompt);
      localStorage.setItem(cacheKey, JSON.stringify(it));
      this.renderItinerary(it, city, dur, dateStr);
    } catch(e) {
      console.error(e);
      this.toast('AI 통신 지연으로 기본 맞춤 일정을 제공합니다 🥲');
      this._fallbackItinerary(city, dur, dateStr, mappedId);
    }
  },

  /* ── 일정 프롬프트 빌드 ── */
  _buildItineraryPrompt(city, dur, dateStr, wish, mappedId, p, neg) {
    const citySpots = AppState.cityData?.map?.pins
      ? `\n[추천 장소 리스트]\n${AppState.cityData.map.pins.map(sp => `- ${sp.name}: ${sp.note}`).join('\n')}`
      : '';

    const cityContext = AppState.cityData
      ? `\n[도시 배경 정보]\n분위기: ${AppState.cityData.description}\n주요 감각: 시각(${AppState.cityData.senses?.sight||''}), 청각(${AppState.cityData.senses?.sound||''}), 후각(${AppState.cityData.senses?.smell||''})${citySpots}`
      : '';

    const costLevel = CONFIG.CITY_COSTS[mappedId] || 3;
    const levelMap  = { 1: '매우 저렴', 2: '저렴', 3: '보통', 4: '비쌈', 5: '매우 비쌈' };
    const costHint  = `이 도시의 물가 수준은 5점 만점에 ${costLevel}점(${levelMap[costLevel]}) 입니다.`;

    return `여행 일정 전문가. JSON만 출력. 설명 없이 JSON만. ${cityContext}
여행자:${p?.typeName||''}의 성향 반영. 기피(제외):${neg.join(',')||'없음'}
여행지:${city} / 출발일:${dateStr} / 기간:${dur}일 / 요청:${wish||'없음'} / 물가:${costHint}
규칙: 하루 3~4개 spot(오전·점심·오후·저녁), 실제 현지 상호명(한국어), note에 주소·가격·팁 포함, mapFocus 1문장.
{"destination":"","title":"","summary":"","palette":["#hex1","#hex2","#hex3"],"cityTagline":"","heroEmoji":"","mapFocus":"","budgetPerDay":{"food":0,"transport":0,"entrance":0},"days":[{"day":1,"title":"","desc":"","spots":[{"time":"09:00","name":"","note":"","sense":"","tags":[],"cost":0}]}],"tips":""}`;
  },

  /* ── 스트리밍 API 호출 ── */
  async _fetchItineraryStream(prompt) {
    const res = await fetch('/api/anthropic', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 3000,
        stream: true,
        messages: [{role:'user', content: prompt}]
      })
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    let buffer = '';
    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    const subEl   = document.getElementById('ldSub');
    const progEl  = document.getElementById('ldDetailMsg');

    while (true) {
      const {done, value} = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, {stream: true});
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') break;
        try {
          const evt = JSON.parse(data);
          if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
            buffer += evt.delta.text;
            this._updateStreamProgress(buffer, subEl, progEl);
          }
        } catch { /* incomplete chunk 무시 */ }
      }
    }
    const clean = buffer.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  },

  /* ── 스트리밍 진행 상태 업데이트 ── */
  _updateStreamProgress(buf, subEl, progEl) {
    const days = (buf.match(/"day"\s*:/g) || []).length;

    if (subEl) {
      subEl.textContent = days > 0
        ? `Day ${days} 일정을 상세 설계 중...`
        : `기본 동선을 구성하는 중...`;
    }

    if (progEl) {
      const stepCount = Math.floor(buf.length / 400);
      const steps = [
        "취향 포인트 분석 중...",
        "현지 베스트 스팟 매핑...",
        "최적 이동 경로 계산 중...",
        "날씨와 물가 정보 업데이트...",
        "식도락 가이드 구성 중...",
        "최종 여정 브리핑 작성 중..."
      ];
      progEl.textContent = steps[Math.min(stepCount, steps.length - 1)];
    }

    if (days > 0) {
      const el = document.getElementById(`day-prog-${days}`);
      if (el && !el.classList.contains('active')) {
        el.classList.add('active');
        el.style.background = 'var(--terra)';
        el.style.color = 'white';
        el.style.boxShadow = '0 0 10px rgba(196,112,75,0.4)';
      }
    }
  },

  /* ── 스켈레톤 로딩 화면 ── */
  _showItinSkeleton(city, dur) {
    document.getElementById('sLoad').innerHTML = `<div class="ld-wrap">
      <div class="ld-spinner"></div>
      <div class="ld-txt">${city} 맞춤 여정 설계</div>
      <div class="ld-sub" id="ldSub">성향 데이터를 분석 중입니다</div>
      <div style="font-size:0.75rem; color:var(--terra-light); margin-top:0.4rem; height:1rem;" id="ldDetailMsg">AI 알고리즘이 가동 중입니다...</div>
      <div class="ld-insight" style="display:block;margin-top:1.6rem; background:rgba(245,240,232,0.02)">
        <div class="ld-insight-label">JOURNEY PROGRESS ✦</div>
        <div class="ld-insight-msg" id="ldProgress" style="display:flex; flex-wrap:wrap; justify-content:center; gap:0.4rem; margin-top:1rem;">
          ${Array.from({length: parseInt(dur)}, (_, i) =>
            `<span id="day-prog-${i+1}" style="display:inline-block; font-size:.65rem; font-family:'JetBrains Mono',monospace;
              padding:.3rem .8rem; border-radius:8px; background:rgba(245,240,232,.04);
              border:1px solid rgba(245,240,232,.08); color:var(--ink-faint); transition:all 0.4s ease;">
              DAY ${i+1}
            </span>`).join('')}
        </div>
      </div>
    </div>`;
    this.showScreen('sLoad');
  },

  /* ── 일정 렌더링 ── */
  renderItinerary(it, city, dur, dateStr) {
    const { companion, accOrder, selectedNegatives: neg, currentProfile: p } = AppState;
    const cpl = {solo:'혼자',couple:'커플/친구',family:'가족',group:'그룹'}[companion] || '';
    const apl = CONFIG.ACC_PRIM_LABELS[accOrder[0]] || '';
    const palette = it.palette || ['#C4704B','#6B8BA4','#C4A84B'];

    const cd = AppState.cityData;
    const month = dateStr !== '미정' ? new Date(dateStr).getMonth()+1 : null;
    const seasonKey = month ? (month>=3&&month<=5?'spring':month>=6&&month<=8?'summer':month>=9&&month<=11?'autumn':'winter') : null;
    const seasonLabel = {spring:'봄 (3~5월)',summer:'여름 (6~8월)',autumn:'가을 (9~11월)',winter:'겨울 (12~2월)'}[seasonKey] || '';

    let seasonInfo = null, senseInfo = null, mapData = null;
    if (cd) {
      if (seasonKey && cd.seasons?.[seasonKey]) seasonInfo = cd.seasons[seasonKey];
      if (cd.senses) senseInfo = cd.senses;
      if (cd.map) mapData = cd.map;
    }

    document.getElementById('itinContent').innerHTML = `
      <div class="city-hero" style="background:linear-gradient(135deg,${palette[0]}22 0%,${palette[1]}22 100%);border:1px solid ${palette[0]}30">
        <div class="city-hero-eyebrow" style="color:${palette[0]}">✦ ${p?.typeName||'여행자'}의 맞춤 일정</div>
        <div class="city-hero-name"><svg style="width:1.1em;height:1.1em;vertical-align:-.15em;stroke:currentColor;fill:none;margin-right:.3em" aria-hidden="true"><use href="#ic-map"/></svg>${it.destination||city}</div>
        <div class="city-hero-tagline">${it.cityTagline||it.summary||'당신만을 위한 발견의 여정'}</div>
        <div class="city-hero-meta">
          ${cpl ? `<span class="city-meta-chip">👤 ${cpl}</span>` : ''}
          ${apl ? `<span class="city-meta-chip">🏨 ${apl}</span>` : ''}
          ${dateStr !== '미정' ? `<span class="city-meta-chip">📅 ${dateStr}</span>` : ''}
          <span class="city-meta-chip">⏱ ${dur}일</span>
        </div>
      </div>

      ${it.mapFocus ? `<div class="itin-map-guide">📍 <strong>맵 가이드:</strong> ${it.mapFocus}</div>` : ''}

      <div class="itin-tabs">
        <button class="itin-tab active" onclick="App.switchTab('schedule',this)">📅 일정</button>
        <button class="itin-tab" onclick="App.switchTab('cityinfo',this)">🏙 도시 정보</button>
        <button class="itin-tab" onclick="App.switchTab('budget',this)">💰 예산</button>
      </div>

      <div class="tab-panel active" id="tab-schedule">
        ${it.summary ? `<div class="itin-summary">${it.summary}</div>` : ''}
        ${(it.days||[]).map(UI.daySection).join('')}
        ${it.tips ? `<div class="itin-tips"><h3>실용 팁</h3><p>${it.tips.replace(/\n/g,'<br>')}</p></div>` : ''}
      </div>

      <div class="tab-panel" id="tab-cityinfo">
        ${cd?.description ? `<div class="city-desc-block">${cd.description}</div>` : ''}
        ${seasonInfo ? `<div class="season-card"><div class="season-icon">${seasonInfo.icon}</div><div class="season-body"><div class="season-label">${seasonLabel} 여행</div><div class="season-text">${seasonInfo.text}</div></div></div>` : ''}
        ${UI.senseStrip(senseInfo, it.destination||city)}
        ${UI.minimap(mapData, city)}
      </div>

      <div class="tab-panel" id="tab-budget">
        ${UI.budgetTab(it.budgetPerDay||{}, dur)}
      </div>

      <div class="itin-footer">
        <button class="btn btn-ghost" onclick="App.goToPlan()">← 다른 도시로</button>
        <br><button class="btn btn-ghost" onclick="location.reload()" style="margin-top:.4rem">처음부터 다시</button>
      </div>`;

    this.showScreen('sItin', true);
    this.setStep('');
    if (mapData) setTimeout(() => this._initRealMap(mapData), 80);
  },

  /* ── Leaflet 지도 초기화 ── */
  _initRealMap(mapData) {
    const container = document.getElementById('realMapContainer');
    if (!container || !mapData) return;

    if (this._realMap) this._realMap.remove();

    const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    });

    this._realMap = L.map('realMapContainer').setView([mapData.lat, mapData.lng], mapData.zoom || 13);
    tileLayer.addTo(this._realMap);

    mapData.pins.forEach(p => {
      const icon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background:${p.color}; width:20px; height:20px; border-radius:50%; color:white; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; box-shadow:0 0 10px ${p.color}88; border:2px solid white;">${p.num}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      L.marker([p.lat, p.lng], { icon })
        .addTo(this._realMap)
        .bindPopup(`<strong>${p.name}</strong><br><span style="font-size:0.8rem;color:#666">${p.time}</span><br><p style="margin:5px 0 0;font-size:0.85rem;color:#444">${p.note}</p>`);
    });

    setTimeout(() => { if (this._realMap) this._realMap.invalidateSize(); }, 150);
  },

  switchTab(name, el) {
    document.querySelectorAll('.itin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('tab-'+name).classList.add('active');
    if (name === 'cityinfo' && this._realMap) {
      setTimeout(() => this._realMap.invalidateSize(), 50);
    }
  },

  /* ── 폴백 일정 (AI 실패 시) ── */
  _fallbackItinerary(city, dur, dateStr, mappedId) {
    const cd = AppState.cityData;
    const n = parseInt(dur), days = [];
    const makeSpot = (time, name, note, sense, tags, cost=0) => ({time, name, note, sense, tags, cost});
    const pins = cd?.map?.pins || [];

    for (let i = 1; i <= n; i++) {
      let spots = [];
      if (pins.length > 0) {
        const s1 = pins[((i-1)*2) % pins.length];
        const s2 = pins[((i-1)*2+1) % pins.length];
        spots = [
          makeSpot(s1.time||'10:00', s1.name, s1.note, '', ['추천 명소'], s1.cost||0),
          makeSpot(s2.time||'15:00', s2.name, s2.note, '', ['인기 장소'], s2.cost||0),
          makeSpot('19:00', `${city} 로컬 맛집탐방`, '리뷰와 평점이 높은 현지 식당 방문', '', ['식도락'], 30000)
        ];
      } else {
        if (i === 1) spots = [makeSpot('15:00','체크인 & 주변 산책','도보 10분 반경 파악','처음 맡는 도시의 공기.',['혼잡도 낮음'],0),makeSpot('19:00','현지 저녁 식사','현지어 리뷰 많은 곳','',['로컬 추천'],20000)];
        else spots = [makeSpot('09:00','주요 명소 탐방','현지 가이드 추천 코스','',[],15000),makeSpot('14:00','오후 카페 휴식','운치 있는 골목 카페','',[],8000),makeSpot('19:00','현지 저녁 식사','당일 예약 가능 레스토랑','',[],25000)];
      }
      days.push({day:i, title:i===1?'도착':i===n?'출발':'탐방', desc:'', spots});
    }

    this.renderItinerary({
      destination: city,
      title: `${city} ${dur}일 스탠다드 플랜`,
      summary: cd?.description || `${AppState.currentProfile?.typeName||'여행자'}의 취향을 반영한 ${city} 표준 일정입니다.`,
      palette: ['#C4704B','#6B8BA4','#7A9A7E'],
      cityTagline: `${city}에서 보내는 ${dur}일간의 발견`,
      heroEmoji: '🗺️',
      budgetPerDay: this._calculateDynamicBudget(mappedId),
      days,
      tips: `[안내] 현재 AI 연결이 원활하지 않아 ${city}의 핵심 명소를 기반으로 전형적인 일정을 구성했습니다.`
    }, city, dur, dateStr);
  },

  /* ── 동적 예산 계산 ── */
  _calculateDynamicBudget(mappedId) {
    const level = CONFIG.CITY_COSTS[mappedId] || 3;
    const food = 50000, transport = 15000, entrance = 20000;
    const multiplier = { 1: 0.5, 2: 0.7, 3: 1, 4: 1.5, 5: 2.2 }[level];
    return {
      food:      Math.round(food      * multiplier / 100) * 100,
      transport: Math.round(transport * multiplier / 100) * 100,
      entrance:  Math.round(entrance  * multiplier / 100) * 100
    };
  }

});
