/* ════════════════════════════════════════════
   ui.js — 재사용 가능한 HTML 컴포넌트
════════════════════════════════════════════ */
const UI = {
  badge: (text, type) => `<span class="ctx-badge ${type}">${text}</span>`,

  ctxStrip: (profile, companion, accPrim, negCount) => {
    const compLabel = CONFIG.COMPANION_SHORT[companion] || '';
    const accLabel  = CONFIG.ACC_PRIM_LABELS[accPrim] || '';
    return [
      profile?.typeName ? UI.badge(`✦ ${profile.typeName}`, 'dna') : '',
      negCount          ? UI.badge(`✕ ${negCount}가지 기피 반영`, 'avoid') : '',
      accLabel          ? UI.badge(`🏨 ${accLabel}`, 'acc') : '',
      compLabel         ? UI.badge(`👤 ${compLabel}`, 'comp') : ''
    ].join('');
  },

  spotBadges: tags => {
    if (!tags?.length) return '';
    return `<div class="spot-badges">${tags.map(t => {
      const cls = Object.entries(CONFIG.TAG_STYLES).find(([k]) => t.includes(k))?.[1] || 'local';
      return `<span class="spot-badge ${cls}">${t}</span>`;
    }).join('')}</div>`;
  },

  spotItem: spot => `
    <div class="itin-spot">
      <span class="itin-spot-time">${spot.time}</span>
      <div class="itin-spot-body">
        <div class="itin-spot-name">${spot.name}</div>
        <div class="itin-spot-note">${spot.note || ''}</div>
        ${spot.cost ? `<div class="itin-spot-cost">예상 비용: ${(spot.cost).toLocaleString()}원</div>` : ''}
        ${spot.sense ? `<div class="itin-spot-sense">"${spot.sense}"</div>` : ''}
        ${UI.spotBadges(spot.tags)}
      </div>
    </div>`,

  daySection: day => {
    const dayCost = (day.spots || []).reduce((a, s) => a + (s.cost || 0), 0);
    return `
    <div class="itin-day">
      <div class="itin-marker"></div>
      <div class="itin-day-head">
        <span class="itin-day-num">Day ${day.day}</span>
        <span class="itin-day-title">${day.title}</span>
      </div>
      ${dayCost > 0 ? `<div class="itin-day-budget">예상 ${dayCost.toLocaleString()}원</div>` : ''}
      <div class="itin-day-desc">${day.desc || ''}</div>
      ${(day.spots || []).map(UI.spotItem).join('')}
    </div>`;
  },

  minimap: (mapData, cityKey) => {
    if (!mapData) return `
      <div class="minimap-placeholder">
        <div style="font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:2px;color:var(--terra-light);margin-bottom:.5rem;text-transform:uppercase">리얼 인터랙티브 맵</div>
        <div style="font-size:2rem;opacity:.3;margin-bottom:.6rem">🗺️</div>
        <div class="minimap-placeholder-text">${cityKey} 맵은 곧 추가됩니다.<br><span style="font-size:.7rem;opacity:.6">현재 포르투 · 교토 상세맵 추가됨</span></div>
      </div>`;

    const legendHtml = mapData.legend.map(l =>
      `<div class="legend-item"><div class="legend-dot" style="background:${l.c}"></div>${l.l}</div>`
    ).join('');

    return `
      <div id="realMapContainer" style="width:100%; height:360px; border-radius:12px; margin-bottom:1rem; border:1px solid rgba(245,240,232,0.1); z-index:1;"></div>
      <div class="minimap-legend">${legendHtml}</div>`;
  },

  senseStrip: (senses, cityName) => {
    const s = senses || {sight:`${cityName}만의 색과 빛`, sound:'골목의 소리, 사람들의 언어', smell:'현지 음식과 공기의 냄새'};
    return `<div class="sense-strip">
      <div class="sense-card"><div class="sense-icon">👁</div><div class="sense-label">시각</div><div class="sense-text">${s.sight}</div></div>
      <div class="sense-card"><div class="sense-icon">👂</div><div class="sense-label">청각</div><div class="sense-text">${s.sound}</div></div>
      <div class="sense-card"><div class="sense-icon">👃</div><div class="sense-label">후각</div><div class="sense-text">${s.smell}</div></div>
    </div>`;
  },

  budgetTab: (bpd, dur) => {
    return '<div style="color:var(--ink-faint);font-size:.85rem;padding:3rem 0;text-align:center;"><div style="font-size:2rem;margin-bottom:0.8rem;opacity:0.3;">🔒</div><div style="color:var(--ink-faint);line-height:1.5;letter-spacing:-0.5px;">보다 정확한 정보 제공을 위해<br>잠시 문을 닫습니다.</div></div>';
    const daily = Object.values(bpd).reduce((a, b) => a + (b || 0), 0);
    const total = daily * parseInt(dur);
    if (!daily) return '<div style="color:var(--ink-faint);font-size:.85rem;padding:1rem 0">예산 정보를 불러오는 중입니다.</div>';
    return `
      <div class="budget-row">
        ${bpd.food      ? `<div class="budget-card"><div class="budget-label">🍽 식비</div><div class="budget-amount">₩${(bpd.food).toLocaleString()}</div><div class="budget-note">1인 · 하루</div></div>` : ''}
        ${bpd.transport ? `<div class="budget-card"><div class="budget-label">🚗 교통</div><div class="budget-amount">₩${(bpd.transport).toLocaleString()}</div><div class="budget-note">1인 · 하루</div></div>` : ''}
        ${bpd.entrance  ? `<div class="budget-card"><div class="budget-label">🎫 입장료</div><div class="budget-amount">₩${(bpd.entrance).toLocaleString()}</div><div class="budget-note">1인 · 하루</div></div>` : ''}
      </div>
      <div class="budget-total">
        실제 물가와 환율에 따라 차이가 발생할 수 있습니다.
      </div>`;
  }
};
