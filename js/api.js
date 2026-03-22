/* ════════════════════════════════════════════
   api.js — Claude API 호출: 취향 분석
════════════════════════════════════════════ */
Object.assign(App, {

  /* ── 취향 선택 요약 텍스트 빌드 ── */
  _buildChoiceSummary() {
    return Object.entries(AppState.choices).map(([d, v]) => {
      const p = CONFIG.AB.find(x => x.dim === d);
      return p ? `${d}:"${(v==='a' ? p.a : p.b).title}"` : '';
    }).filter(Boolean).join(', ');
  },

  /* ── 프로필 분석 API 호출 ── */
  async _analyzeProfile() {
    const { selectedNegatives: neg, selectedEmotions: emo, memoryText } = AppState;
    const prompt = `여행 취향 분석가. JSON만 출력.
선택:${this._buildChoiceSummary()} / 기억:${memoryText||'없음'} / 감정:${emo.join(',')||'없음'} / 기피:${neg.join(',')||'없음'}
{"typeName":"","typeDesc":"2-3문장","keywords":["k1","k2","k3","k4","k5"],"dimensions":{"crowd":{"score":0-100,"leftLabel":"활기","rightLabel":"고요","desc":""},"explore":{"score":0-100,"leftLabel":"랜드마크","rightLabel":"뒷골목","desc":""},"pace":{"score":0-100,"leftLabel":"빼곡한 일정","rightLabel":"느린 여행","desc":""},"immersion":{"score":0-100,"leftLabel":"관광객","rightLabel":"현지인","desc":""}},"idealTrip":"3-4문장","hiddenTaste":"2문장","avoidReflection":"1문장","recommendCities":["도시1","도시2","도시3"]}`;
    try {
      const res = await fetch('/api/anthropic', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({model:'claude-3-5-sonnet-20241022', max_tokens:1200, messages:[{role:'user',content:prompt}]})
      });
      if (!res.ok) {
        this.toast('분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        throw new Error(`API ${res.status}`);
      }
      const data = await res.json();
      const text = data.content.map(c => c.text || '').join('');
      AppState.currentProfile = JSON.parse(text.replace(/```json|```/g, '').trim());
      localStorage.setItem('travel_dna_profile', JSON.stringify(AppState.currentProfile));
      this.renderResult(AppState.currentProfile);
    } catch(e) {
      console.error(e);
      this._fallbackProfile();
    }
  },

  /* ── API 실패 시 규칙 기반 폴백 프로필 ── */
  _fallbackProfile() {
    const ch = AppState.choices;
    const bScore = Object.values(ch).filter(v => v==='b').length;
    const ratio = bScore / Math.max(Object.keys(ch).length, 1);
    const id = ratio > 0.7 ? 'zen' : ratio > 0.5 ? 'local' : ratio < 0.3 ? 'bold' : 'flaneur';
    const preset = CONFIG.PRESETS.find(p => p.id === id);
    const profile = preset?.profile
      ? JSON.parse(JSON.stringify(preset.profile))
      : { typeName:'자유로운 여행자', typeDesc:'당신만의 고유한 여행 스타일이 있습니다.', keywords:['자유','발견','감성','로컬','여유'], dimensions:{crowd:{score:50,leftLabel:'활기',rightLabel:'고요'},explore:{score:50,leftLabel:'랜드마크',rightLabel:'뒷골목'},pace:{score:50,leftLabel:'빼곡한 일정',rightLabel:'느린 여행'},immersion:{score:50,leftLabel:'관광객',rightLabel:'현지인'}}, idealTrip:'모험과 휴식을 균형있게 즐기는 여행.', recommendCities:['파리','도쿄','방콕'] };
    AppState.currentProfile = profile;
    localStorage.setItem('travel_dna_profile', JSON.stringify(profile));
    this.renderResult(profile);
  }

});
