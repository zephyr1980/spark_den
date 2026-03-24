# 여행 취향 발견기 — 프로젝트 메모리

## 프로젝트 개요
Vanilla JS SPA. 번들러 없음. `Object.assign(App, {...})` 패턴으로 모듈 확장.
Vercel Edge Runtime + `/api/anthropic.js` (AI) + `/api/db.js` (DB).
`vercel.json`: Static SPA with rewrites → `/index.html`

---

## 핵심 구조

```
/spark
  index.html          # SVG 스프라이트 인라인 (<body> 직후 6개 심볼)
  style.css           # 전체 스타일
  js/
    app.js            # 코어: 화면전환, init(), 공유링크 로드
    config.js         # CONFIG (CITY_MAP, CITY_FALLBACKS 8개, CITY_COSTS, CITY_DIMENSIONS, PRESETS)
    state.js          # AppState
    ui.js             # UI 헬퍼 (daySection, minimap, budgetTab 등)
    main.js           # App.init() 호출
    screens/
      intro.js        # 인트로 + 프리셋 카드
      ab.js           # A/B 선택 흐름
      memory.js       # 기억 입력 + 기피 항목
      plan.js         # 도시 선택 + 매칭 알고리즘
      result.js       # 취향 결과 카드 + 프로필 저장
      itinerary.js    # 일정 생성/렌더링 + 일정 저장
  api/
    anthropic.js      # Claude API 스트리밍 프록시
    db.js             # Upstash Redis REST 기반 DB
  taste/assets/cities/
    *.json            # 32개 도시 데이터 (description, senses, seasons, map)
```

---

## 4차원 취향 프로필

| 차원 | 왼쪽(0) | 오른쪽(100) |
|------|---------|------------|
| crowd | 활기찬 | 고요한 |
| explore | 랜드마크 | 뒷골목 |
| pace | 빼곡한 | 여유로운 |
| immersion | 관광객 | 현지인 |

---

## 매칭 알고리즘 (plan.js)

### 가중 점수 (_calcMatchScore)
```js
const weight = (Math.abs(pScore - 50) / 50) * 1.5 + 0.5;  // 0.5~2.0
weightedDiff += Math.abs(pScore - cScore) * weight;
weightedMax  += 100 * weight;
score = Math.round(100 - (weightedDiff / weightedMax) * 100);
```
극단 취향일수록 해당 차원 가중치 높아짐.

### 5단계 레벨 (_matchLevel)
| 점수 | 클래스 | 레이블 |
|------|--------|--------|
| ≥78 | match-perfect | 완벽 일치 |
| ≥65 | match-top | 최고 일치 |
| ≥52 | match-good | 잘 맞아요 |
| ≥40 | match-ok | 무난해요 |
| ≥28 | match-low | 아쉬워요 |

### 도시 필터링 (_filterCitiesByMatch)
- 완벽+최고 일치(≥65): 전부 노출
- 잘 맞아요(52~64): 상위 5개만
- 무난해요 이하: 숨김
- 전체 최대 15개

---

## SVG 아이콘 (index.html 인라인)

| ID | 용도 |
|----|------|
| ic-compass | 로고 (헤더) |
| ic-zen | 고요한 힐러 프리셋 |
| ic-leaf | 로컬 감성러 프리셋 |
| ic-explorer | 열혈 탐험가 프리셋 |
| ic-flaneur | 도시의 산책자 프리셋 |
| ic-map | 지도 아이콘 (일정 화면) |

사용법: `<svg class="ic-preset"><use href="#ic-zen"/></svg>`

---

## DB 구조 (api/db.js — Upstash Redis)

### 환경변수 (Vercel에 등록 필요)
```
UPSTASH_REDIS_REST_URL   = https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN = AXxxxx...
```

### API 액션
| action | method | 설명 |
|--------|--------|------|
| saveProfile | POST | 프로필 저장 → `{ id }` 반환, TTL 30일 |
| getProfile | GET | `?id=xxx` 조회 |
| saveItinerary | POST | 일정 저장 → `{ id }` 반환, TTL 90일 |
| getItinerary | GET | `?id=xxx` 조회 |
| logStat | POST | 이벤트 카운터 |
| getStats | GET | 총계 조회 |
| adminCheck | POST | 패스워드 검증 → token 반환 |
| saveCityData | POST | 도시 설명 오버라이드 저장 (x-admin-token 필요) |
| getCityData | GET | 도시 오버라이드 조회 |
| getDetailedStats | GET | 7일 일별 통계 (token 필요) |

### Redis 키 패턴
```
profile:{id}               → JSON, 30일 TTL
itin:{id}                  → JSON, 90일 TTL
stats:daily:{YYYY-MM-DD}:{event}
stats:total:{event}
city:override:{cityId}     → JSON, TTL 없음 (어드민 오버라이드)
```

### 어드민 환경변수
```
ADMIN_PASSWORD = 어드민 접근용 패스워드 (Vercel 등록 필요)
```

### 어드민 접근
```
https://your-app.vercel.app/admin
```

### 공유 URL 형식
```
?profile=abc12345  → 취향 DNA 결과 공유
?itin=xyz78901     → 여행 일정 공유
```

---

## 주요 CSS 변수

```css
--terra        /* 테라코타 #C4704B */
--sage         /* 세이지 #7A9A7E */
--gold         /* 골드 #C4A84B */
--ink-faint    /* 흐린 글자색 */
--ink-mid      /* 중간 글자색 */
```

### 도시 카드 (plan.js)
```css
.city-card          /* 그리드 카드 */
.city-card::before  /* 왼쪽 액센트 바 */
.city-card-top      /* 이름 + 점수 행 */
.match-badge        /* 5단계 뱃지 */
.city-section-head  /* 섹션 헤더 */
```

### 듀얼바 매칭 시각화
```css
.pmb-row2 / .pmb2-bars / .pmb2-bar-row
.pmb2-user   /* 테라코타 (나) */
.pmb2-city   /* 세이지/골드/로즈 (도시) */
```

---

## 도시 데이터 컨벤션 (32개 JSON + config.js 8개)
- `description`: 존댓말, 100자 미만, 핵심 특징 중심
- `keywords` 폰트: 0.8rem (tc-tag)

---

## AppState 주요 필드

```js
AppState.currentProfile       // 취향 분석 결과
AppState.selectedCity         // 선택된 도시명
AppState.cityData             // 도시 JSON 데이터
AppState._savedProfileId      // 저장된 프로필 ID (공유용)
AppState._savedItinId         // 저장된 일정 ID (공유용)
AppState._currentItinerary    // { it, city, dur, dateStr } (저장 버튼용)
```

---

## 이전 세션 주요 변경 이력

| 날짜 | 작업 |
|------|------|
| 2026-03 | 매칭 점수 고도화 (가중 알고리즘, 5단계) |
| 2026-03 | 도시 카드 → 그리드 카드 + 듀얼바 |
| 2026-03 | SVG 수제 아이콘 세트 (6종) |
| 2026-03 | 도시 설명 전체 재작성 (32+8개) |
| 2026-03 | Upstash Redis DB 연동 (프로필/일정 저장+공유) |
| 2026-03 | 배경 밝기 가독성 개선 (revealFlash 1.6, bgBright 1.0) |
| 2026-03 | 도시 카드 팔레트 + 랜드마크 SVG 실루엣 (32도시 팔레트, 15도시 랜드마크) |
| 2026-03 | admin.html 어드민 구현 (통계 대시보드 + 도시 JSON 편집기 + 패스워드 보호) |
| 2026-03 | api/db.js 어드민 액션 추가 (adminCheck, saveCityData, getDetailedStats) |

---

## 미완료 / 다음 검토 항목
- 디자인 글꼴 수정 (아이콘 교체 후 언급했으나 미진행)
- 취향 카드 UI 개선 (언급됨)
- Upstash 환경변수 Vercel 등록 (사용자 직접 수행 필요)
  - UPSTASH_REDIS_REST_URL
  - UPSTASH_REDIS_REST_TOKEN
  - ADMIN_PASSWORD
- 어드민에서 저장한 도시 오버라이드를 앱 itinerary.js 로더에서 참조하는 기능 (현재 미구현)
