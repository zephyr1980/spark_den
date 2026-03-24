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

    // 도시가 바뀔 때마다 항상 해당 도시 데이터로 갱신 (이전 도시 데이터 유지 금지)
    AppState.cityData = mappedId ? (CONFIG.CITY_FALLBACKS[mappedId] || null) : null;

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

    // 도시 JSON 파일 fetch (있으면 fallback 위에 덮어씀)
    if (mappedId) {
      try {
        const dRes = await fetch(`taste/assets/cities/${mappedId}.json`);
        if (dRes.ok) AppState.cityData = await dRes.json();
      } catch(e) { /* CITY_FALLBACKS 유지 */ }
    }

    const prompt = this._buildItineraryPrompt(city, dur, dateStr, wish, mappedId, p, neg);

    try {
      const it = await this._fetchItineraryStream(prompt);
      localStorage.setItem(cacheKey, JSON.stringify(it));
      this.renderItinerary(it, city, dur, dateStr);
    } catch(e) {
      const errMsg = e?.message || String(e) || '알 수 없는 오류';
      console.error('[itinerary error]', errMsg);
      const msg = errMsg.includes('401') || errMsg.includes('403')
                    ? '❌ API 키 오류 — Vercel 환경변수 ANTHROPIC_API_KEY 확인'
                : errMsg.includes('404')
                    ? '❌ /api/anthropic 없음 — Vercel 배포 여부 확인'
                : errMsg.includes('fetch') || errMsg.includes('Failed') || errMsg.includes('NetworkError')
                    ? '❌ 서버 연결 실패 — Vercel 배포 후 사용 가능'
                : errMsg.includes('JSON') || errMsg.includes('블록')
                    ? '❌ 응답 파싱 실패 — 콘솔(F12)에서 상세 확인'
                : `❌ 오류: ${errMsg.slice(0, 60)}`;
      this.toast(msg, 5000);
      this._fallbackItinerary(city, dur, dateStr, mappedId);
    }
  },

  /* ── 일정 프롬프트 빌드 ── */
  _buildItineraryPrompt(city, dur, dateStr, wish, mappedId, p, neg) {
    const cd = AppState.cityData;
    const citySpots = cd?.map?.pins
      ? `\n[추천 장소 리스트]\n${cd.map.pins.map(sp => `- ${sp.name}: ${sp.note}`).join('\n')}`
      : '';

    // restaurants 데이터가 있으면 프롬프트에 실제 맛집 목록 포함
    const restaurantHint = cd?.restaurants?.length
      ? `\n[현지 검증 맛집 목록 — 식사 spot 선정 시 이 목록에서 우선 선택]\n` +
        cd.restaurants.map(r =>
          `- ${r.name} | 메뉴: ${r.menu.join(', ')} | 가격: ${r.price} | 예약: ${r.reservation} | ${r.location}`
        ).join('\n')
      : '';

    const cityContext = cd
      ? `\n[도시 배경 정보]\n분위기: ${cd.description}\n주요 감각: 시각(${cd.senses?.sight||''}), 청각(${cd.senses?.sound||''}), 후각(${cd.senses?.smell||''})${citySpots}${restaurantHint}`
      : '';

    const costLevel = CONFIG.CITY_COSTS[mappedId] || 3;
    const levelMap  = { 1: '매우 저렴', 2: '저렴', 3: '보통', 4: '비쌈', 5: '매우 비쌈' };
    const costHint  = `이 도시의 물가 수준은 5점 만점에 ${costLevel}점(${levelMap[costLevel]}) 입니다.`;

    return `여행 일정 전문가. JSON만 출력. 마크다운·설명 없이 JSON만.
${cityContext}
여행자:${p?.typeName||'일반 여행자'} / 기피(제외):${neg.join(',')||'없음'}
여행지:${city} / 출발일:${dateStr} / 기간:${dur}일 / 요청:${wish||'없음'} / ${costHint}

[필수 규칙]
1. 하루 3~4개 spot — 오전 관광, 점심식사, 오후 관광, 저녁식사 순서.
2. 관광 spot의 note: "한 문장 설명. 위치 힌트. 입장료(있을 경우). 현지 팁."
3. 식사 spot 선정: 현지인이 즐겨 찾는 로컬 맛집만. 체인점·패스트푸드·관광지 식당 절대 제외.
4. 식사 spot의 note는 반드시 아래 형식으로 작성 (이 형식을 그대로 따를 것):
   "[식당명(현지어/원어)] | 추천메뉴: [메뉴명 1~2개] | 가격: [1인 예상] | 예약: [필요여부] | [찾아가는 팁]"
   예시1) "스시 사이토(鮨 斉藤) | 추천메뉴: 오마카세 스시, 우니군칸 | 가격: 1인 8,000~12,000엔 | 예약: 2주 전 필요 | JR 시부야역 동쪽 출구 도보 3분, 지하 1층"
   예시2) "멘야 무사시(麺屋武蔵) | 추천메뉴: 특제 츠케멘, 라멘 | 가격: 1인 1,200~1,500엔 | 예약: 불필요(웨이팅 가능) | 신주쿠 오모이데 요코초 골목 내"
5. tags에 식사 spot은 ["식사","로컬맛집"] 포함, 관광 spot은 ["명소"] 또는 세부 태그 포함.
6. cost는 1인 기준 원화 환산 금액(정수).

{"destination":"","title":"","summary":"","palette":["#hex1","#hex2","#hex3"],"cityTagline":"","heroEmoji":"","mapFocus":"","budgetPerDay":{"food":0,"transport":0,"entrance":0},"days":[{"day":1,"title":"","desc":"","spots":[{"time":"09:00","name":"","note":"","sense":"","tags":[],"cost":0},{"time":"12:30","name":"","note":"[식당명(현지어)] | 추천메뉴: XX | 가격: 1인 XX | 예약: XX | 위치팁","sense":"","tags":["식사","로컬맛집"],"cost":0}]}],"tips":""}`;
  },

  /* ── 스트리밍 API 호출 ── */
  async _fetchItineraryStream(prompt) {
    const res = await fetch('/api/anthropic', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 4096,
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
    // JSON 블록만 추출 — 앞뒤 설명 텍스트나 ```json 마크다운 무시
    const start = buffer.indexOf('{');
    const end   = buffer.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      throw new Error(`JSON 블록을 찾지 못했습니다. 응답 미리보기: ${buffer.slice(0, 200)}`);
    }
    const jsonStr = buffer.slice(start, end + 1);
    return JSON.parse(jsonStr);
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
    // 현재 일정 데이터 AppState에 보관 (저장 버튼용)
    AppState._currentItinerary = { it, city, dur, dateStr };
    AppState._savedItinId = null;

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
        <button class="btn btn-save-itin" id="btnSaveItin" onclick="App.saveItineraryLink(this)">🔗 일정 링크로 저장</button>
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
    const rests = cd?.restaurants || [];

    // restaurants 배열에서 점심/저녁용 식당을 순서대로 가져오는 헬퍼
    let restIdx = 0;
    const nextRest = (mealType, fallbackCost) => {
      const pool = rests.length
        ? rests.filter(r => r.meal_type === mealType || r.meal_type === 'any')
        : [];
      if (!pool.length && rests.length) pool.push(...rests); // 타입 구분 없이 전체 사용
      if (!pool.length) return null;
      const r = pool[restIdx % pool.length];
      restIdx++;
      const note = `${r.name} | 추천메뉴: ${r.menu.join(', ')} | 가격: ${r.price} | 예약: ${r.reservation} | ${r.location}`;
      const cost = fallbackCost;
      return makeSpot('', r.name, note, '', ['식사', '로컬맛집'], cost);
    };

    for (let i = 1; i <= n; i++) {
      let spots = [];
      if (pins.length > 0) {
        const s1 = pins[((i-1)*2) % pins.length];
        const s2 = pins[((i-1)*2+1) % pins.length];
        const lunch  = nextRest('lunch',  20000);
        const dinner = nextRest('dinner', 30000);
        spots = [
          makeSpot(s1.time||'10:00', s1.name, s1.note, '', ['명소'], s1.cost||0),
          lunch  ? {...lunch,  time:'12:30'} : makeSpot('12:30','현지 점심','동네 현지 식당', '', ['식사'], 15000),
          makeSpot(s2.time||'15:00', s2.name, s2.note, '', ['명소'], s2.cost||0),
          dinner ? {...dinner, time:'19:00'} : makeSpot('19:00','현지 저녁','로컬 추천 식당', '', ['식사'], 25000)
        ];
      } else {
        const dinner = nextRest('dinner', 25000);
        if (i === 1) spots = [
          makeSpot('15:00','체크인 & 주변 산책','도보 10분 반경 파악','처음 맡는 도시의 공기.',['혼잡도 낮음'],0),
          dinner ? {...dinner, time:'19:00'} : makeSpot('19:00','현지 저녁 식사','현지어 리뷰 많은 곳','',['식사'],20000)
        ];
        else {
          const lunch2 = nextRest('lunch', 15000);
          spots = [
            makeSpot('09:00','주요 명소 탐방','현지 가이드 추천 코스','',[],15000),
            lunch2  ? {...lunch2,  time:'12:30'} : makeSpot('12:30','현지 점심','동네 식당','',[],12000),
            makeSpot('14:30','오후 명소 & 카페','운치 있는 골목 카페','',[],8000),
            dinner  ? {...dinner,  time:'19:00'} : makeSpot('19:00','현지 저녁 식사','당일 예약 가능 레스토랑','',[],25000)
          ];
        }
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

  /* ── 일정 링크 저장 ── */
  async saveItineraryLink(btn) {
    const snap = AppState._currentItinerary;
    if (!snap) return;

    // 이미 저장된 링크가 있으면 바로 복사
    if (AppState._savedItinId) {
      const link = `${location.origin}${location.pathname}?itin=${AppState._savedItinId}`;
      await navigator.clipboard.writeText(link).catch(()=>{});
      this.toast('공유 링크가 클립보드에 복사됐어요 ✓');
      return;
    }

    const orig = btn.textContent;
    btn.textContent = '저장 중...';
    btn.disabled    = true;

    try {
      const payload = {
        itinerary:  snap.it,
        city:       snap.city,
        dur:        snap.dur,
        dateStr:    snap.dateStr,
        profile:    AppState.currentProfile,
        _savedAt:   Date.now()
      };
      const res  = await fetch('/api/db', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ action: 'saveItinerary', data: payload })
      });
      const json = await res.json();
      if (!json.id) throw new Error('no id');

      AppState._savedItinId = json.id;
      const link = `${location.origin}${location.pathname}?itin=${json.id}`;
      await navigator.clipboard.writeText(link).catch(()=>{});
      btn.textContent = '✓ 링크 복사됨';
      this.toast('일정 공유 링크가 클립보드에 복사됐어요 ✓');
      fetch('/api/db', { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({action:'logStat', event:'itin_saves'}) }).catch(()=>{});
    } catch(e) {
      btn.textContent = orig;
      btn.disabled    = false;
      this.toast('저장에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
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
