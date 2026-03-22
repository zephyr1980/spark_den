/* ════════════════════════════════════════════
   config.js — 모든 정적 데이터
════════════════════════════════════════════ */
const CONFIG = {
  AB: [
  {dim:'crowd',q:'어디에 더 끌리시나요?',
    a:{emoji:'🏮',title:'활기 넘치는 야시장',desc:'연기와 소리, 사람들 사이를 비집고 다니며 이것저것 맛보는 밤.',c:'#C4704B',bgUrl:'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=800&fit=crop'},
    b:{emoji:'🌫️',title:'텅 빈 새벽 골목',desc:'발소리만 울리는 돌길. 도시가 깨어나기 직전의 고요.',c:'#6B8BA4',bgUrl:'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=800&fit=crop'}},
  {dim:'local',q:'여행의 하이라이트는?',
    a:{emoji:'🗼',title:'드디어 도착한 그 장소',desc:'엽서에서만 보던 풍경 앞에 서는 순간의 전율.',c:'#C4A84B',bgUrl:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=800&fit=crop'},
    b:{emoji:'🚶',title:'골목에서 우연히 발견한 빵집',desc:'지도에 없는 곳. 할머니가 구워주신 갓 나온 빵 한 조각.',c:'#7A9A7E',bgUrl:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=800&fit=crop'}},
  {dim:'pace',q:'이상적인 여행의 하루는?',
    a:{emoji:'⚡',title:'아침 8시부터 밤 10시까지',desc:'한 곳이라도 더! 일정표가 빼곡해야 마음이 편한 타입.',c:'#B47A7A',bgUrl:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=800&fit=crop'},
    b:{emoji:'☕',title:'카페에서 세 시간째',desc:'창밖 사람 구경. 오늘 할 일은 이 커피를 마시는 것.',c:'#6B8BA4',bgUrl:'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=800&fit=crop'}},
  {dim:'accommodation',q:'숙소를 고르는 기준은?',
    a:{emoji:'🏨',title:'깨끗하고 편안한 호텔',desc:'좋은 침대, 안정적인 와이파이, 맛있는 조식. 기본기.',c:'#9A7AB4',bgUrl:'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=800&fit=crop'},
    b:{emoji:'🏡',title:'동네에 사는 것처럼',desc:'아파트형 숙소에서 슈퍼 장보기, 세탁기 돌리기.',c:'#7A9A7E',bgUrl:'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&h=800&fit=crop'}},
  {dim:'culture',q:'자유 시간 반나절, 뭘 할까요?',
    a:{emoji:'🎭',title:'미술관에서 반나절',desc:'렘브란트 앞에서 30분, 카페에서 감상 정리.',c:'#9A7AB4',bgUrl:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop'},
    b:{emoji:'🛒',title:'동네 슈퍼마켓 탐방',desc:'과자 코너, 낯선 조미료, 현지 맥주 라벨 읽기.',c:'#6B8BA4',bgUrl:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=800&fit=crop'}},
  {dim:'night',q:'여행지에서의 밤 10시',
    a:{emoji:'🍸',title:'루프탑 바에서 칵테일',desc:'도시의 야경과 음악. 밤은 아직 젊으니까.',c:'#9A7AB4',bgUrl:'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=800&fit=crop'},
    b:{emoji:'📺',title:'호텔 방에서 현지 TV',desc:'침대에 누워 모르는 나라의 광고를 보는 소소한 행복.',c:'#C4704B',bgUrl:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=800&fit=crop'}},
  {dim:'local_life',q:'현지인의 출근길을 봅니다',
    a:{emoji:'🏃',title:'나도 빨리 관광하러 가야지',desc:'내 시간은 한정적이고 볼 게 많으니까.',c:'#B47A7A',bgUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop'},
    b:{emoji:'☕',title:'카페에 앉아 그 풍경을 관찰',desc:'이 사람들은 매일 어디로 가는 걸까. 일상이 궁금해.',c:'#7A9A7E',bgUrl:'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=800&fit=crop'}},
  {dim:'dining',q:'오늘 저녁, 어디로 갈까요?',
    a:{emoji:'🥂',title:'셰프의 코스 디너',desc:'와인 페어링, 하얀 테이블보. 식사 자체가 하나의 작품.',c:'#9A7AB4',bgUrl:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=800&fit=crop'},
    b:{emoji:'🥟',title:'골목 포장마차의 한 그릇',desc:'플라스틱 의자, 현지인 옆자리. 가격은 싸고 맛은 진짜.',c:'#C4704B',bgUrl:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=800&fit=crop'}},
  {dim:'social',q:'여행지에서 만난 현지인이 말을 걸어옵니다',
    a:{emoji:'🍻',title:'맥주 한 잔 사면서 대화 시작',desc:'추천받은 곳이 결국 최고의 발견이 되는 경험.',c:'#7A9A7E',bgUrl:'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=800&fit=crop'},
    b:{emoji:'🎧',title:'이어폰을 끼고 미소만',desc:'아무도 나를 모르는 완벽한 자유가 여행의 본질.',c:'#B47A7A',bgUrl:'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=800&fit=crop'}},
  {dim:'nature',q:'창밖에 보이는 풍경은?',
    a:{emoji:'🌆',title:'빌딩 숲의 네온사인',desc:'도시의 심장 박동. 지하철 리듬, 트렌디한 카페 골목.',c:'#6B8BA4',bgUrl:'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=600&h=800&fit=crop'},
    b:{emoji:'🌊',title:'수평선 끝까지 아무것도 없는 바다',desc:'파도 소리와 바람뿐. 인공물이 사라진 곳의 해방감.',c:'#7A9A7E',bgUrl:'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=800&fit=crop'}},
  {dim:'morning',q:'여행지의 아침, 당신은?',
    a:{emoji:'🌅',title:'일출을 보러 새벽에 일어남',desc:'아직 아무도 없는 풍경을 독차지하는 전율.',c:'#C4A84B',bgUrl:'https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?w=600&h=800&fit=crop'},
    b:{emoji:'🥐',title:'늦잠 자고 11시에 브런치',desc:'서두를 이유가 없어요. 오늘은 쉬러 온 거니까.',c:'#B47A7A',bgUrl:'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=800&fit=crop'}},
  {dim:'discovery',q:'여행 전, 당신의 준비 수준은?',
    a:{emoji:'📋',title:'맛집 30개, 동선 최적화 완료',desc:'사전 조사가 곧 여행의 절반. 실패 확률을 줄여야.',c:'#C4A84B',bgUrl:'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&h=800&fit=crop'},
    b:{emoji:'🎲',title:'비행기 표만 끊었음',desc:'뭘 할지는 거기 가서 정하죠. 즉흥이 최고.',c:'#C4704B',bgUrl:'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=800&fit=crop'}},
  {dim:'food_risk',q:'메뉴판을 읽을 수 없습니다',
    a:{emoji:'🔍',title:'번역 앱으로 하나하나 확인',desc:'뭘 먹는지는 정확히 알아야 해. 실패하고 싶지 않아.',c:'#C4A84B',bgUrl:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop'},
    b:{emoji:'🤞',title:'그냥 아무거나 찍어서 주문',desc:'뭐가 나올지 모르는 게 여행이잖아. 모험!',c:'#C4704B',bgUrl:'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&h=800&fit=crop'}},
  {dim:'transport',q:'공항에서 숙소까지 어떻게?',
    a:{emoji:'🚕',title:'택시 타고 편하게',desc:'여행은 체력 관리. 이동은 효율적으로.',c:'#C4A84B',bgUrl:'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=800&fit=crop'},
    b:{emoji:'🚇',title:'지하철 타고 현지인처럼',desc:'노선도 읽는 재미. 창밖으로 도시가 펼쳐짐.',c:'#6B8BA4',bgUrl:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=800&fit=crop'}},
  {dim:'weather',q:'여행 날씨 운이 없어서 비가 옵니다',
    a:{emoji:'😩',title:'일정을 급히 재조정',desc:'실내 명소로 전환! 비 때문에 하루를 날릴 순 없어.',c:'#B47A7A',bgUrl:'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=800&fit=crop'},
    b:{emoji:'☔',title:'우산 쓰고 빗속 산책',desc:'비 오는 도시도 나름의 매력이 있으니까.',c:'#6B8BA4',bgUrl:'https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=600&h=800&fit=crop'}},
  {dim:'photo',q:'완벽한 포토스팟을 발견했습니다',
    a:{emoji:'📸',title:'20장은 찍어야 직성이 풀림',desc:'각도, 구도, 표정. SNS에 올릴 인생샷 확보.',c:'#C4704B',bgUrl:'https://images.unsplash.com/photo-1502920514313-52581002a659?w=600&h=800&fit=crop'},
    b:{emoji:'👀',title:'눈으로만 담기',desc:'이 순간은 카메라가 아니라 내 기억에 저장.',c:'#9A7AB4',bgUrl:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=800&fit=crop'}},
  {dim:'budget',q:'여행 예산 스타일은?',
    a:{emoji:'💎',title:'하나를 제대로',desc:'숙소든 식사든, 한 번은 최고를 경험하고 싶어.',c:'#9A7AB4',bgUrl:'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&h=800&fit=crop'},
    b:{emoji:'🎯',title:'여러 개를 알뜰하게',desc:'절약한 돈으로 하루를 더 여행할 수 있으니까.',c:'#7A9A7E',bgUrl:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop'}},
  {dim:'return',q:'다음 여행지를 고를 때',
    a:{emoji:'🗺️',title:'아직 안 가본 새로운 곳',desc:'세계는 넓으니까. 같은 곳에 두 번 갈 시간이 없어.',c:'#C4A84B',bgUrl:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=800&fit=crop'},
    b:{emoji:'💌',title:'작년에 좋았던 그곳 다시',desc:'그 카페, 그 골목, 그 석양. 다시 만나고 싶은 장소.',c:'#B47A7A',bgUrl:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop'}},
  {dim:'religion',q:'오래된 성당을 발견했습니다',
    a:{emoji:'📖',title:'역사와 건축을 공부하며 관람',desc:'언제 지어졌고 누가 설계했는지. 지식이 감동을 깊게 해.',c:'#C4A84B',bgUrl:'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&h=800&fit=crop'},
    b:{emoji:'🕯️',title:'조용히 앉아 분위기를 느끼기',desc:'아무것도 몰라도 괜찮아. 이 공간의 적막이면 충분.',c:'#6B8BA4',bgUrl:'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=600&h=800&fit=crop'}},
  {dim:'souvenir',q:'여행 기념품으로 뭘 사올까요?',
    a:{emoji:'🧲',title:'그 도시 이름이 적힌 마그넷',desc:'냉장고에 붙일 때마다 그 순간이 떠오르는 것.',c:'#C4704B',bgUrl:'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=800&fit=crop'},
    b:{emoji:'🍫',title:'현지 슈퍼에서 산 과자 한 봉지',desc:'아무도 모르는 이 맛을 내가 발견했다는 기쁨.',c:'#7A9A7E',bgUrl:'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=600&h=800&fit=crop'}}
  ],

  // 도시별 물가 지수 (1: 매우 저렴, 5: 매우 비쌈)
  CITY_COSTS: {
    'new_york': 5, 'london': 5, 'paris': 5, 'tokyo': 4, 'rome': 4, 'barcelona': 4,
    'kyoto': 3, 'porto': 3, 'seoul': 3, 'prague': 3,
    'bangkok': 2, 'da_nang': 1, 'taipei': 2, 'bali': 2, 'hanoi': 1,
    'amsterdam': 4, 'vienna': 4, 'berlin': 3, 'osaka': 3, 'hong_kong': 4, 'singapore': 5
  },

  CORE_DIMENSIONS: ['crowd','local','pace','accommodation','culture','night','local_life','dining','social','nature'],

  EMOTIONS: ['해방감','경이','안도','호기심','고요','설렘','향수','자유','충만','고독'],

  NEGATIVES: [
    {i:'👥',t:'붐비는 관광지'},{i:'🗣️',t:'과도한 호객행위'},{i:'⚠️',t:'치안 불안 / 소매치기'},
    {i:'😊',t:'지나치게 과한 친절'},{i:'🗑️',t:'지저분한 거리'},{i:'📅',t:'자유 없는 단체 일정'},
    {i:'💰',t:'바가지 요금'},{i:'🔊',t:'밤새 시끄러운 숙소'},{i:'🚌',t:'긴 이동 시간'},
    {i:'📸',t:'사진 찍기 강요'},{i:'🍔',t:'현지 음식 없이 패스트푸드만'},{i:'🏢',t:'개성 없는 체인 호텔'},
    {i:'☔',t:'날씨 때문에 실내만'},{i:'📵',t:'인터넷이 안 되는 곳'},
    {i:'🚫',t:'언어가 전혀 안 통함'},{i:'🧳',t:'짐 끌고 많이 걷기'}
  ],

  ACC_CHIPS: {
    purity: [{t:'냄새 없는 화장실'},{t:'건식 화장실'},{t:'분리형 화장실/샤워'},{t:'매일 시트 교체'},{t:'살균 소독 인증'}],
    comfort: [{t:'프리미엄 침구 (100수+)'},{t:'무풍 에어컨'},{t:'방음 완벽'},{t:'암막 커튼'},{t:'온수 즉시 나옴'}],
    sensory: [{t:'이솝/르라보 어메니티'},{t:'디자인 가구/인테리어'},{t:'뷰 (야경/바다)'},{t:'블루투스 스피커'},{t:'네스프레소 머신'}]
  },

  LOADING_INSIGHTS: [
    {cond: s => s.crowd==='b' && s.local==='b', msg:'고요함을 찾으면서도 현지 골목에 끌린다는 건, 혼자 발견하는 조용한 나만의 장소를 원한다는 뜻이에요.'},
    {cond: s => s.pace==='b'  && s.night==='b', msg:'느린 하루와 호텔 TV 조합 — 여행을 "쉬는 것"으로 정의하는 분이네요.'},
    {cond: s => s.local==='b' && s.culture==='b', msg:'골목 빵집과 슈퍼마켓 탐방 동시 선택 — 소비보다 관찰에서 즐거움을 찾는 타입입니다.'},
    {cond: () => true, msg:'선택 패턴을 분석하고 있습니다. 직감적인 선택이 가장 정확한 취향 지도를 그립니다.'}
  ],

  PRESETS: [
    {
      id: 'zen', emoji: '🧘', title: '고요한 힐러',
      desc: '복잡한 건 질색, 오롯이 나에게 집중하는 혼자만의 휴식',
      visuals: { c1: '#2a1b32', c2: '#1b2a32', tex: 'v-tex-zen' },
      profile: {
        typeName: '내면을 채우는 고요한 힐러',
        typeDesc: '북적이는 명소보다는 한적한 공원과 조용한 서점을 선호합니다. 느린 호흡으로 도심의 고요함을 즐기며, 완벽한 휴식과 재충전을 최우선으로 생각하는 타입입니다.',
        keywords: ['슬로우 트래블', '명상적 산책', '한적한 서점', '테라피', '미니멀'],
        dimensions: {
          crowd: { score: 90, leftLabel: '활기', rightLabel: '고요' },
          explore: { score: 15, leftLabel: '랜드마크', rightLabel: '뒷골목' },
          pace: { score: 85, leftLabel: '빼곡한 일정', rightLabel: '느린 여행' },
          immersion: { score: 40, leftLabel: '관광객', rightLabel: '현지인' }
        },
        idealTrip: '아침 일찍 문을 연 조용한 공원을 산책하고, 오후에는 아무도 모르는 골목 속 북카페에서 책을 읽으며 시간을 보냅니다. 저녁에는 은은한 조명의 재즈바에서 하루를 마무리하는 일정입니다.',
        recommendCities: ['교토', '빈', '헬싱키']
      }
    },
    {
      id: 'local', emoji: '🌿', title: '로컬 감성러',
      desc: '여행지에서 살아보듯, 골목 사이 로컬만의 다정함',
      visuals: { c1: '#2a2b1b', c2: '#2b211b', tex: 'v-tex-local' },
      profile: {
        typeName: '뒷골목을 누비는 로컬 감성러',
        typeDesc: '유명 관광지보다는 현지인들의 일상이 묻어나는 시장과 카페를 좋아합니다. 낯선 도시에서 이방인이 아닌 주민이 된 듯한 기분을 즐기는 섬세한 여행자입니다.',
        keywords: ['현지인 체험', '마켓 투어', '빈티지 샵', '골목 산책', '일상'],
        dimensions: {
          crowd: { score: 60, leftLabel: '활기', rightLabel: '고요' },
          explore: { score: 85, leftLabel: '랜드마크', rightLabel: '뒷골목' },
          pace: { score: 60, leftLabel: '빼곡한 일정', rightLabel: '느린 여행' },
          immersion: { score: 95, leftLabel: '관광객', rightLabel: '현지인' }
        },
        idealTrip: '직접 장을 본 식재료로 아침을 해 먹고, 현지인들만 아는 오래된 레코드 샵과 빈티지 마켓을 구경합니다. 저녁에는 동네 작은 선술집에서 이웃들과 눈인사를 나누며 하루를 보냅니다.',
        recommendCities: ['베를린', '포르투', '타이베이']
      }
    },
    {
      id: 'bold', emoji: '🏃', title: '열혈 탐험가',
      desc: '남는 건 사진뿐! 정복하듯 즐기는 고밀도 에너지 여행',
      visuals: { c1: '#321b1b', c2: '#322a1b', tex: 'v-tex-bold' },
      profile: {
        typeName: '에너지가 넘치는 열혈 탐험가',
        typeDesc: '한순간도 낭비하고 싶지 않은 열정적인 여행자입니다. 유명 랜드마크부터 숨은 스팟까지, 지도를 가득 채우며 성취감을 느끼는 활동적인 타입입니다.',
        keywords: ['랜드마크 정복', '활동적인', '고밀도 일정', '인증샷', '성취감'],
        dimensions: {
          crowd: { score: 30, leftLabel: '활기', rightLabel: '고요' },
          explore: { score: 40, leftLabel: '랜드마크', rightLabel: '뒷골목' },
          pace: { score: 10, leftLabel: '빼곡한 일정', rightLabel: '느린 여행' },
          immersion: { score: 20, leftLabel: '관광객', rightLabel: '현지인' }
        },
        idealTrip: '해 뜨기 전 명소에 도착해 가장 멋진 사진을 남기고, 오후에는 유명 박물관과 쇼핑가를 부지런히 누빕니다. 밤에는 도시의 가장 높은 전망대에서 화려한 야경을 감상합니다.',
        recommendCities: ['뉴욕', '방콕', '파리']
      }
    },
    {
      id: 'flaneur', emoji: '🎞️', title: '도시의 산책자',
      desc: '계획 없음이 계획, 발길 닿는 대로 도시를 유영하기',
      visuals: { c1: '#1b1b32', c2: '#1b3232', tex: 'v-tex-flaneur' },
      profile: {
        typeName: '자유를 즐기는 도시의 산책자',
        typeDesc: '계획에 얽매이기보다 그날의 기분에 따라 발길을 옮깁니다. 도시의 공기와 소음, 우연히 만난 장면들에서 영감을 얻는 자유로운 영혼의 소유자입니다.',
        keywords: ['자유로운', '도시 유영', '영감', '우연한 만남', '시티 라이프'],
        dimensions: {
          crowd: { score: 50, leftLabel: '활기', rightLabel: '고요' },
          explore: { score: 50, leftLabel: '랜드마크', rightLabel: '뒷골목' },
          pace: { score: 50, leftLabel: '빼곡한 일정', rightLabel: '느린 여행' },
          immersion: { score: 50, leftLabel: '관광객', rightLabel: '현지인' }
        },
        idealTrip: '지도 없이 호텔을 나서서 예쁜 건물이 보이면 멈추고, 맛있는 냄새가 나면 들어가 식사를 합니다. 저녁에는 세느강변이나 광장에 앉아 버스킹 음악을 들으며 생각에 잠깁니다.',
        recommendCities: ['파리', '바르셀로나', '싱가포르']
      }
    }
  ],

  CITY_DATA: {}, // Fetched via assets/cities
  CITIES: ["파리","런던","뉴욕","로마","바르셀로나","도쿄","방콕","시드니","프라하","부다페스트","비엔나","베를린","암스테르담","리스본","타이베이","오사카","삿포로","싱가포르","홍콩","다낭","코타키나발루","발리","치앙마이","상하이","이스탄불","두바이","시애틀","샌프란시스코","하와이","모로코","포르투","교토"],
  CITY_MAP: { '포르투': 'porto', '교토': 'kyoto', '파리': 'paris', '런던': 'london', '뉴욕': 'new_york', '로마': 'rome', '바르셀로나': 'barcelona', '도쿄': 'tokyo', '방콕': 'bangkok', '시드니': 'sydney', '프라하': 'prague', '부다페스트': 'budapest', '비엔나': 'vienna', '베를린': 'berlin', '암스테르담': 'amsterdam', '리스본': 'lisbon', '타이베이': 'taipei', '오사카': 'osaka', '삿포로': 'sapporo', '싱가포르': 'singapore', '싱가폴': 'singapore', '홍콩': 'hong_kong', '다낭': 'da_nang', '코타키나발루': 'kota_kinabalu', '발리': 'bali', '치앙마이': 'chiang_mai', '상하이': 'shanghai', '이스탄불': 'istanbul', '두바이': 'dubai', '시애틀': 'seattle', '샌프란시스코': 'san_francisco', '하와이': 'hawaii', '모로코': 'morocco' },

  CITY_FALLBACKS: {
    'new_york': {
      "description": "24시간 멈추지 않는 도시예요. 빼곡한 마천루와 다양한 동네가 만들어 내는 에너지가 압도적이에요.",
      "senses": { "sight": "타임스퀘어의 압도적인 전광판 야경", "sound": "엘로우 캡의 경적 소리와 거리의 활기", "smell": "첼시 마켓의 갓 구운 베이글 향기" },
      "map": { "lat": 40.7128, "lng": -74.0060, "zoom": 12, "legend": [{"c":"#C4704B","l":"주요 명소"}], "pins": [
        {"lat":40.7851, "lng":-73.9683, "name":"센트럴 파크", "time":"오전 10시", "note":"맨해튼 중심의 거대한 녹지 공원"},
        {"lat":40.7580, "lng":-73.9855, "name":"타임스퀘어", "time":"오후 8시", "note":"뉴욕의 심장부, 화려한 전광판의 향연"},
        {"lat":40.7426, "lng":-74.0057, "name":"첼시 마켓", "time":"오후 12시", "note":"오래된 공장을 개조한 미식의 성지"},
        {"lat":40.7061, "lng":-73.9969, "name":"브루클린 브릿지", "time":"오후 5시", "note":"뉴욕 스카이라인을 감상하며 걷는 다리"},
        {"lat":40.7614, "lng":-73.9776, "name":"MoMA(현대미술관)", "time":"오전 11시", "note":"고흐, 피카소 등 거장들의 명작이 가득한 곳"},
        {"lat":40.7484, "lng":-73.9857, "name":"엠파이어 스테이트 빌딩", "time":"오후 9시", "note":"뉴욕의 영원한 상징, 화려한 전망대"}
      ] }
    },
    'porto': {
      "description": "도루강 언덕 위에 오렌지빛 지붕이 층층이 쌓인 작은 항구 도시예요. 골목과 와인, 파두의 감성이 가득해요.",
      "senses": { "sight": "도루강과 루이스 1세 다리의 풍경", "sound": "강변 버스킹의 멜로디", "smell": "오래된 와인 창고의 포트와인 향" },
      "map": { "lat": 41.1496, "lng": -8.6109, "zoom": 13, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
        {"lat":41.1408, "lng":-8.6137, "name":"리베이라 지구", "time":"오후 5시", "note":"강변의 정취가 가득한 포르투의 심장"},
        {"lat":41.1456, "lng":-8.6147, "name":"상 벤투 역", "time":"오전 10시", "note":"아줄레주 타일 벽화가 아름다운 기차역"},
        {"lat":41.1465, "lng":-8.6148, "name":"렐루 서점", "time":"오후 2시", "note":"해리포터의 영감을 준 세계에서 가장 아름다운 서점"},
        {"lat":41.1408, "lng":-8.6137, "name":"동 루이스 1세 다리", "time":"오후 6시", "note":"도루강의 일몰을 감상하기 가장 좋은 명소"},
        {"lat":41.1499, "lng":-8.6101, "name":"클레리구스 탑", "time":"오전 11시", "note":"포르투 시내 전경을 한눈에 담을 수 있는 전망대"}
      ] }
    },
    'paris': {
      "description": "예술과 카페 문화가 촘촘히 얽힌 도시예요. 골목 하나하나가 살아있는 미술관처럼 느껴져요.",
      "senses": { "sight": "노란 조명을 밝힌 세느강과 에펠탑의 실루엣", "sound": "카페 테라스의 활기찬 대화 소리", "smell": "아침 일찍 문을 연 불랑제리의 고소한 바게트 향" },
      "map": { "lat": 48.8566, "lng": 2.3522, "zoom": 12, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
        {"lat":48.8584, "lng":2.2945, "name":"에펠탑", "time":"오후 8시", "note":"파리의 상징적인 랜드마크 야경 감상"},
        {"lat":48.8606, "lng":2.3376, "name":"루브르 박물관", "time":"오전 9시", "note":"모나리자 등 수천 점의 걸작이 있는 박물관"},
        {"lat":48.8867, "lng":2.3431, "name":"몽마르트르 언덕", "time":"오후 4시", "note":"파리 시내를 내려다보는 예술가들의 거리"}
      ] }
    },
    'london': {
      "description": "왕실 역사와 활기찬 마켓 문화가 공존하는 도시예요. 동네마다 분위기가 달라 질리지 않아요.",
      "senses": { "sight": "런던 아이에서 내려다보는 템즈강의 스카이라인", "sound": "빅 벤의 웅장한 종소리", "smell": "보로 마켓의 풍성한 음식 냄새" },
      "map": { "lat": 51.5074, "lng": -0.1278, "zoom": 12, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
        {"lat":51.5007, "lng":-0.1246, "name":"빅 벤", "time":"오전 10시", "note":"영국 국회의사당의 상징적인 시계탑"},
        {"lat":51.5033, "lng":-0.1195, "name":"런던 아이", "time":"오후 7시", "note":"보름달처럼 런던을 비추는 거행 관람차"},
        {"lat":51.5081, "lng":-0.0759, "name":"타워 브릿지", "time":"오후 3시", "note":"템즈강의 품격을 더하는 개폐식 도개교"}
      ] }
    },
    'kyoto': {
      "description": "일본 전통 미학이 그대로 살아있는 고도예요. 사찰과 골목, 말차 카페에서 느린 여행을 즐길 수 있어요.",
      "senses": { "sight": "후시미 이나리의 끝없는 붉은 도리이", "sound": "대나무 숲을 흔드는 바람 소리", "smell": "갓 우려낸 말차의 쌉싸름한 향" },
      "map": { "lat": 35.0116, "lng": 135.7681, "zoom": 12, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
        {"lat":34.9671, "lng":135.7727, "name":"후시미 이나리 대사", "time":"오전 9시", "note":"수천 개의 도리이가 장관을 이루는 산책로"},
        {"lat":35.0394, "lng":135.7292, "name":"금각사(킨카쿠지)", "time":"오후 1시", "note":"연못 위에 빛나는 화려한 황금 빛 사찰"},
        {"lat":34.9949, "lng":135.7850, "name":"기요미즈데라(청수사)", "time":"오후 4시", "note":"교토 시내가 한눈에 내려다보이는 절벽 위 사찰"}
      ] }
    },
    'barcelona': {
      "description": "가우디 건축과 지중해 햇살, 활기찬 시장이 가득한 도시예요. 보는 곳마다 강렬한 색과 형태가 넘쳐요.",
      "senses": { "sight": "사그라다 파밀리아의 압도적인 스테인드글라스", "sound": "람블라스 거리의 활기찬 버스킹", "smell": "보케리아 시장의 신선한 하몬과 과일 향" },
      "map": { "lat": 41.3851, "lng": 2.1734, "zoom": 13, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
        {"lat":41.4036, "lng":2.1744, "name":"사그라다 파밀리아", "time":"오전 10시", "note":"가우디 최후의 걸작, 경이로운 성당"},
        {"lat":41.4145, "lng":2.1527, "name":"구엘 공원", "time":"오후 3시", "note":"동화 속 세상 같은 가우디의 공원"},
        {"lat":41.4034, "lng":2.1648, "name":"카사 바트요", "time":"오전 11시", "note":"뼈의 집이라 불리는 독창적인 가우디 건축물"}
      ] }
    },
    'tokyo': {
      "description": "동네마다 완전히 다른 얼굴을 가진 도시예요. 네온사인과 조용한 신사가 불과 몇 블록 거리에 공존해요.",
      "senses": { "sight": "시부야 스크램블 교차로의 압도적인 인파", "sound": "지하철의 정교한 안내 방송과 도시 소음", "smell": "골목길 야키토리 식당에서 풍기는 고소한 연기 향" },
      "map": { "lat": 35.6895, "lng": 139.6917, "zoom": 12, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
        {"lat":35.6585, "lng":139.7013, "name":"시부야 스크램블 교차로", "time":"오후 6시", "note":"도쿄의 활기를 가장 잘 느낄 수 있는 세계 최대의 교차로"},
        {"lat":35.7148, "lng":139.7967, "name":"아사쿠사 센소지", "time":"오전 10시", "note":"도쿄에서 가장 오래된 절, 에도시대의 정취"},
        {"lat":35.6586, "lng":139.7454, "name":"도쿄 타워", "time":"오후 8시", "note":"도시의 야경을 감상할 수 있는 랜드마크"}
      ] }
    },
    'bangkok': {
      "description": "화려한 왕궁과 골목 포장마차, 향긋한 길거리 음식이 한 도시에 공존해요. 생동감이 가득한 곳이에요.",
      "senses": { "sight": "짜오프라야 강변에 빛나는 왓 아룬의 야경", "sound": "툭툭이의 엔진 소리와 분주한 시장통", "smell": "코코넛 밀크와 향긋한 고수 맛이 어우러진 똠얌꿍 향" },
      "map": { "lat": 13.7563, "lng": 100.5018, "zoom": 13, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
        {"lat":13.7513, "lng":100.4927, "name":"방콕 왕궁", "time":"오전 9시", "note":"태국 왕실의 화려함과 정교한 사찰 건축의 정수"},
        {"lat":13.7437, "lng":100.4918, "name":"왓 아룬(새벽 사원)", "time":"오후 6시", "note":"강변에 우뚝 솟은 아름다운 도자기 탑"},
        {"lat":13.7460, "lng":100.5348, "name":"시암 스퀘어", "time":"오후 2시", "note":"방콕의 트렌드를 한눈에 볼 수 있는 쇼핑과 문화의 중심지"}
      ] }
    }
  },

  COMPANION_LABELS: {solo:'혼자',couple:'커플/친구',family:'가족(어린이 포함)',group:'그룹(3인+)'},
  COMPANION_SHORT:  {solo:'혼자 여행',couple:'커플/친구',family:'가족 여행',group:'그룹 여행'},
  ACC_PRIM_LABELS:  {purity:'위생 우선',comfort:'숙면 우선',sensory:'감각 우선'},
  CAT_NAMES:        {purity:'위생 · 청결',comfort:'숙면 · 편안함',sensory:'감각 · 프리미엄'},
  MONTH_NAMES: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  TAG_STYLES: {'혼잡도 낮음':'low-crowd','조용한':'low-crowd','한산':'low-crowd','로컬 추천':'local','현지인 추천':'local','숨겨진':'local','기피 요소 없음':'no-avoid','안전':'no-avoid','아침 추천':'timing','저녁 추천':'timing','최적 시간':'timing'},

  // ─── 도시별 취향 차원 점수 ───────────────────────────────────────────
  // crowd    : 0=활기(lively)    ↔ 100=고요(quiet)
  // explore  : 0=랜드마크         ↔ 100=뒷골목(local backstreets)
  // pace     : 0=빼곡한 일정      ↔ 100=느린 여행
  // immersion: 0=관광객 위주      ↔ 100=현지인 몰입
  // 근거: 오버투어리즘 지수, 슬로트래블 리포트, 여행 리뷰 패턴 종합 (2024)
  CITY_DIMENSIONS: {
    // ── 유럽 ──────────────────────────────────────────────────────────
    'paris':        { crowd: 20, explore: 50, pace: 35, immersion: 40 }, // 오버투어리즘 상위권, 몽마르트르 등 로컬도 공존
    'london':       { crowd: 25, explore: 55, pace: 35, immersion: 45 }, // 넓은 도시, 다양한 동네 탐방 가능
    'rome':         { crowd: 20, explore: 40, pace: 40, immersion: 35 }, // 랜드마크 집중도 매우 높음, 극심한 관광객
    'barcelona':    { crowd: 20, explore: 55, pace: 45, immersion: 40 }, // 연간 3,200만 관광객, 그라시아 등 로컬 동네 공존
    'berlin':       { crowd: 50, explore: 78, pace: 60, immersion: 72 }, // 분산된 도시, 로컬 문화 강함, 느린 라이프스타일
    'amsterdam':    { crowd: 25, explore: 60, pace: 55, immersion: 42 }, // stay-away 캠페인, 운하 동네 로컬 느낌
    'lisbon':       { crowd: 38, explore: 70, pace: 62, immersion: 62 }, // 알파마 골목 문화, 파두 감성
    'porto':        { crowd: 52, explore: 80, pace: 72, immersion: 73 }, // 작은 도시, 도보 골목 탐방 최적
    'prague':       { crowd: 28, explore: 55, pace: 50, immersion: 40 }, // 구시가 매우 붐빔, 비노흐라디 등 로컬 구역 존재
    'budapest':     { crowd: 42, explore: 62, pace: 55, immersion: 57 }, // 덜 알려진 동네들, 루인 바 문화
    'vienna':       { crowd: 42, explore: 55, pace: 62, immersion: 52 }, // 클래식·카페 문화, 여유로운 분위기
    // ── 아시아 ────────────────────────────────────────────────────────
    'kyoto':        { crowd: 38, explore: 65, pace: 70, immersion: 62 }, // 붐비지만 명상적 분위기, 오프비트 사원 다수
    'tokyo':        { crowd: 28, explore: 52, pace: 22, immersion: 45 }, // 거대 도시, 에너지 넘침, 동네마다 개성 강함
    'osaka':        { crowd: 35, explore: 65, pace: 38, immersion: 62 }, // 음식 문화 중심, 서민적 활기
    'sapporo':      { crowd: 68, explore: 62, pace: 67, immersion: 65 }, // 홋카이도 거점, 상대적으로 한산
    'taipei':       { crowd: 52, explore: 72, pace: 57, immersion: 72 }, // 야시장·로컬 문화 강함, 관광객 비교적 적음
    'hong_kong':    { crowd: 28, explore: 55, pace: 22, immersion: 50 }, // 매우 빠른 도시, 골목 시장 문화
    'singapore':    { crowd: 42, explore: 45, pace: 32, immersion: 38 }, // 효율·깔끔, 관광 인프라 집중
    'bangkok':      { crowd: 35, explore: 62, pace: 40, immersion: 67 }, // 방대한 도시, 길거리 음식·로컬 골목 풍부
    'chiang_mai':   { crowd: 65, explore: 70, pace: 72, immersion: 73 }, // 슬로트래블 성지, 명상·수련 분위기
    'da_nang':      { crowd: 68, explore: 55, pace: 67, immersion: 62 }, // 해안 도시, 여유롭고 덜 붐빔
    'kota_kinabalu':{ crowd: 75, explore: 65, pace: 70, immersion: 65 }, // 자연·아웃도어 중심, 관광 밀도 낮음
    'bali':         { crowd: 35, explore: 58, pace: 55, immersion: 50 }, // 쿠타 매우 관광객화, 우붓 등 로컬 경험 가능
    'shanghai':     { crowd: 30, explore: 57, pace: 28, immersion: 52 }, // 빠른 도시, 프렌치 콘세션 등 로컬 구역 공존
    // ── 중동·아프리카 ─────────────────────────────────────────────────
    'dubai':        { crowd: 38, explore: 22, pace: 28, immersion: 18 }, // 쇼핑몰·랜드마크 집중, 로컬 경험 제한적
    'istanbul':     { crowd: 35, explore: 67, pace: 50, immersion: 62 }, // 구시가 붐빔, 카디쾨이 등 현지인 동네 매력적
    'morocco':      { crowd: 50, explore: 77, pace: 55, immersion: 72 }, // 메디나 골목 탐방이 핵심 경험
    // ── 오세아니아 ───────────────────────────────────────────────────
    'sydney':       { crowd: 45, explore: 50, pace: 50, immersion: 50 }, // 균형 잡힌 도시, 해안·도심 공존
    // ── 북미 ─────────────────────────────────────────────────────────
    'new_york':     { crowd: 12, explore: 45, pace:  8, immersion: 33 }, // 세계에서 가장 에너지 넘치는 도시
    'san_francisco':{ crowd: 48, explore: 62, pace: 47, immersion: 52 }, // 다채로운 동네, 상대적으로 여유
    'seattle':      { crowd: 55, explore: 60, pace: 55, immersion: 55 }, // 덜 붐비는 미국 도시
    'hawaii':       { crowd: 40, explore: 42, pace: 65, immersion: 38 }, // 자연 중심 여유, 관광 인프라 집중
  }
};
