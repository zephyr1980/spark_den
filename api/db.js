// Vercel Edge Runtime — Upstash Redis REST API 기반 DB
export const config = { runtime: 'edge' };

/* ── 환경변수 ──
   UPSTASH_REDIS_REST_URL   : Upstash 콘솔 REST URL
   UPSTASH_REDIS_REST_TOKEN : Upstash 콘솔 REST Token
   ──────────────────────── */

const REDIS_URL   = () => process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = () => process.env.UPSTASH_REDIS_REST_TOKEN;

const TTL = {
  profile:    60 * 60 * 24 * 30,   // 30일
  itinerary:  60 * 60 * 24 * 90,   // 90일
  stats:      60 * 60 * 24 * 180    // 180일
};

/* ── Upstash REST 헬퍼 ── */
async function redis(cmd) {
  const url   = REDIS_URL();
  const token = REDIS_TOKEN();
  if (!url || !token) throw new Error('UPSTASH env not configured');

  const res = await fetch(`${url}/${cmd.map(encodeURIComponent).join('/')}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Redis ${res.status}: ${txt}`);
  }
  const json = await res.json();
  return json.result;
}

async function redisPOST(cmds) {
  // Pipeline (배열) 지원
  const url   = REDIS_URL();
  const token = REDIS_TOKEN();
  if (!url || !token) throw new Error('UPSTASH env not configured');

  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cmds)
  });
  if (!res.ok) throw new Error(`Redis pipeline ${res.status}`);
  return (await res.json()).map(r => r.result);
}

/* ── 짧은 랜덤 ID (8자 base36) ── */
function genId() {
  const a = Math.random().toString(36).slice(2, 6);
  const b = Date.now().toString(36).slice(-4);
  return (a + b).slice(0, 8);
}

/* ── CORS 헤더 ── */
const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

/* ══ 메인 핸들러 ══ */
export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST', 'Access-Control-Allow-Headers': 'Content-Type' } });
  }

  const url    = new URL(req.url);
  const action = req.method === 'GET'
    ? url.searchParams.get('action')
    : (await req.json().catch(() => ({}))).action;
  let body = {};
  if (req.method === 'POST') {
    try { body = await req.clone().json(); } catch {}
  }

  try {
    switch (action) {

      /* ── 프로필 저장 ── */
      case 'saveProfile': {
        if (!body.data) return new Response(JSON.stringify({error:'no data'}), {status:400, headers:CORS});
        const id   = genId();
        const key  = `profile:${id}`;
        const json = JSON.stringify({ ...body.data, _savedAt: Date.now() });
        await redisPOST([['SET', key, json], ['EXPIRE', key, TTL.profile]]);
        await redis(['INCR', `stats:profile_saves`]).catch(() => null);
        return new Response(JSON.stringify({ id, key }), { headers: CORS });
      }

      /* ── 프로필 조회 ── */
      case 'getProfile': {
        const id  = url.searchParams.get('id') || body.id;
        if (!id) return new Response(JSON.stringify({error:'no id'}), {status:400, headers:CORS});
        const raw = await redis(['GET', `profile:${id}`]);
        if (!raw) return new Response(JSON.stringify({error:'not found'}), {status:404, headers:CORS});
        const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
        return new Response(JSON.stringify({ id, data }), { headers: CORS });
      }

      /* ── 일정 저장 ── */
      case 'saveItinerary': {
        if (!body.data) return new Response(JSON.stringify({error:'no data'}), {status:400, headers:CORS});
        const id   = genId();
        const key  = `itin:${id}`;
        const json = JSON.stringify({ ...body.data, _savedAt: Date.now() });
        await redisPOST([['SET', key, json], ['EXPIRE', key, TTL.itinerary]]);
        await redis(['INCR', `stats:itin_saves`]).catch(() => null);
        return new Response(JSON.stringify({ id, key }), { headers: CORS });
      }

      /* ── 일정 조회 ── */
      case 'getItinerary': {
        const id  = url.searchParams.get('id') || body.id;
        if (!id) return new Response(JSON.stringify({error:'no id'}), {status:400, headers:CORS});
        const raw = await redis(['GET', `itin:${id}`]);
        if (!raw) return new Response(JSON.stringify({error:'not found'}), {status:404, headers:CORS});
        const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
        return new Response(JSON.stringify({ id, data }), { headers: CORS });
      }

      /* ── 이벤트 통계 로깅 ── */
      case 'logStat': {
        const event = body.event || url.searchParams.get('event');
        if (!event) return new Response(JSON.stringify({ok:false}), {status:400, headers:CORS});
        const today = new Date().toISOString().slice(0, 10);
        await redisPOST([
          ['INCR', `stats:daily:${today}:${event}`],
          ['INCR', `stats:total:${event}`]
        ]).catch(() => null);
        return new Response(JSON.stringify({ ok: true }), { headers: CORS });
      }

      /* ── 통계 조회 (간단) ── */
      case 'getStats': {
        const today = new Date().toISOString().slice(0, 10);
        const keys  = [
          `stats:total:profile_saves`,
          `stats:total:itin_saves`,
          `stats:daily:${today}:profile_saves`,
          `stats:daily:${today}:itin_saves`
        ];
        const vals = await redisPOST(keys.map(k => ['GET', k])).catch(() => keys.map(() => 0));
        return new Response(JSON.stringify({
          totalProfiles:  parseInt(vals[0]) || 0,
          totalItins:     parseInt(vals[1]) || 0,
          todayProfiles:  parseInt(vals[2]) || 0,
          todayItins:     parseInt(vals[3]) || 0
        }), { headers: CORS });
      }

      /* ── 어드민: 패스워드 검증 → 세션 토큰 반환 ── */
      case 'adminCheck': {
        const pwd   = body.pwd || url.searchParams.get('pwd');
        const valid = process.env.ADMIN_PASSWORD && pwd === process.env.ADMIN_PASSWORD;
        if (!valid) return new Response(JSON.stringify({ok:false}), {status:401, headers:CORS});
        // 토큰 = base64(pwd+':admin') — 단순 검증용
        const token = btoa(`${pwd}:admin`);
        return new Response(JSON.stringify({ok:true, token}), {headers:CORS});
      }

      /* ── 어드민: 도시 오버라이드 데이터 저장 ── */
      case 'saveCityData': {
        const adminToken = req.headers.get('x-admin-token') || body.token;
        const expected   = process.env.ADMIN_PASSWORD ? btoa(`${process.env.ADMIN_PASSWORD}:admin`) : null;
        if (!expected || adminToken !== expected) return new Response(JSON.stringify({error:'unauthorized'}), {status:401, headers:CORS});

        const { cityId, data: cityData } = body;
        if (!cityId || !cityData) return new Response(JSON.stringify({error:'cityId and data required'}), {status:400, headers:CORS});
        const json = JSON.stringify({ ...cityData, _updatedAt: Date.now() });
        await redisPOST([['SET', `city:override:${cityId}`, json]]);
        return new Response(JSON.stringify({ok:true, cityId}), {headers:CORS});
      }

      /* ── 어드민: 도시 오버라이드 조회 ── */
      case 'getCityData': {
        const cityId = url.searchParams.get('cityId') || body.cityId;
        if (!cityId) return new Response(JSON.stringify({error:'no cityId'}), {status:400, headers:CORS});
        const raw = await redis(['GET', `city:override:${cityId}`]).catch(() => null);
        const data = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : null;
        return new Response(JSON.stringify({cityId, data}), {headers:CORS});
      }

      /* ── 어드민: 일별 통계 7일치 ── */
      case 'getDetailedStats': {
        const adminToken = req.headers.get('x-admin-token') || url.searchParams.get('token');
        const expected   = process.env.ADMIN_PASSWORD ? btoa(`${process.env.ADMIN_PASSWORD}:admin`) : null;
        if (!expected || adminToken !== expected) return new Response(JSON.stringify({error:'unauthorized'}), {status:401, headers:CORS});

        const days = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(); d.setDate(d.getDate() - i);
          days.push(d.toISOString().slice(0, 10));
        }
        const keys = days.flatMap(d => [
          `stats:daily:${d}:profile_saves`,
          `stats:daily:${d}:itin_saves`
        ]);
        const vals = await redisPOST(keys.map(k => ['GET', k])).catch(() => keys.map(() => 0));
        const daily = days.map((d, i) => ({
          date: d,
          profiles: parseInt(vals[i*2])   || 0,
          itins:    parseInt(vals[i*2+1]) || 0
        }));
        const total = await redisPOST([
          ['GET', 'stats:total:profile_saves'],
          ['GET', 'stats:total:itin_saves']
        ]).catch(() => [0, 0]);
        return new Response(JSON.stringify({
          daily,
          totalProfiles: parseInt(total[0]) || 0,
          totalItins:    parseInt(total[1]) || 0
        }), {headers:CORS});
      }

      default:
        return new Response(JSON.stringify({error:'unknown action'}), {status:400, headers:CORS});
    }
  } catch (e) {
    console.error('[db]', e.message);
    return new Response(JSON.stringify({error: e.message}), {status:500, headers:CORS});
  }
}
