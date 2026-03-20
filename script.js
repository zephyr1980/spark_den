/* ════════════════════════════════════════════
   1. CONFIG — 모든 정적 데이터
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
    'kyoto': 3, 'porto': 3, 'seoul': 3, 'prague': 3, 'prague': 3,
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
  // 아키타입 프리셋 정의
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

  COMPANION_LABELS: {solo:'혼자',couple:'커플/친구',family:'가족(어린이 포함)',group:'그룹(3인+)'},
  COMPANION_SHORT:  {solo:'혼자 여행',couple:'커플/친구',family:'가족 여행',group:'그룹 여행'},
  ACC_PRIM_LABELS:  {purity:'위생 우선',comfort:'숙면 우선',sensory:'감각 우선'},
  CAT_NAMES:        {purity:'위생 · 청결',comfort:'숙면 · 편안함',sensory:'감각 · 프리미엄'},
  MONTH_NAMES: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  TAG_STYLES: {'혼잡도 낮음':'low-crowd','조용한':'low-crowd','한산':'low-crowd','로컬 추천':'local','현지인 추천':'local','숨겨진':'local','기피 요소 없음':'no-avoid','안전':'no-avoid','아침 추천':'timing','저녁 추천':'timing','최적 시간':'timing'}
};

/* ════════════════════════════════════════════
   2. APPLICATION STATE
════════════════════════════════════════════ */
const AppState = {
  round: 0,
  abSubset: [],
  choices: {},
  memoryText: '',
  selectedEmotions: [],
  selectedNegatives: [],
  companion: '',
  accOrder: [],
  selectedAccChips: [],
  currentProfile: null,
  // calendar
  calYear: null, calMonth: null, calSelected: null,
  selectedCity: '',

  reset() {
    this.round=0; this.abSubset=[]; this.choices={};
    this.memoryText=''; this.selectedEmotions=[];
    this.selectedNegatives=[]; this.companion='';
    this.accOrder=[]; this.selectedAccChips=[];
    this.currentProfile=null;
    this.calSelected=null; this.selectedCity='';
    this.cityData = null;
  },

  resetFromNeg() {
    this.selectedNegatives=[]; this.accOrder=[]; this.selectedAccChips=[];
  }
};

/* ════════════════════════════════════════════
   3. UI COMPONENTS — 재사용 가능한 HTML 조각
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

/* ════════════════════════════════════════════
   4. APP — 화면 전환 · 흐름 제어 · API
════════════════════════════════════════════ */
const App = {

  /* ── 화면 ── */
  showScreen(id, scroll = false) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'active-scroll'));
    document.getElementById(id).classList.add(scroll ? 'active-scroll' : 'active');
    window.scrollTo(0, 0);
  },

  setProgress(p) {
    const el = document.getElementById('prog');
    if (el) el.style.width = p + '%';
    this._updateVisuals(p);
  },

  setStep(txt) {
    const el = document.getElementById('stepInd');
    if (el) el.textContent = txt;
  },

  _updateVisuals(p) {
    const root = document.documentElement;
    // p: 0 -> 100
    // Blur: 60 -> 0
    const blur = Math.max(0, 60 - (p * 0.6));
    // Opacity: 0.1 -> 1.0
    const opacity = 0.1 + (p * 0.009);
    // Scale: 0.8 -> 1.1
    const scale = 0.8 + (p * 0.003);

    root.style.setProperty('--v-blur', `${blur}px`);
    root.style.setProperty('--v-opacity', opacity);
    root.style.setProperty('--v-scale', scale);

    // 색상 및 텍스처 업데이트
    if (AppState.currentProfile || AppState.presetId) {
      const pId = AppState.presetId || this._guessArchetype();
      const vis = CONFIG.PRESETS.find(pr => pr.id === pId)?.visuals || {c1:'#0d0d0d', c2:'#1a1a1a', tex:''};
      root.style.setProperty('--v-c1', vis.c1);
      root.style.setProperty('--v-c2', vis.c2);
      
      const bg = document.getElementById('vBackground');
      if (bg) {
        // 기존 텍스처 클래스 제거
        bg.classList.remove('v-tex-zen', 'v-tex-bold', 'v-tex-local', 'v-tex-flaneur');
        if (vis.tex) bg.classList.add(vis.tex);
      }
    }

    // 펄스 효과 (중요 포인트에서)
    const dna = document.getElementById('vDNA');
    if (dna) {
      dna.style.transition = 'all 0.4s ease';
      dna.style.transform = `scale(${scale + 0.05}) translate(-50%, -50%)`;
      setTimeout(() => {
        dna.style.transition = 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
        dna.style.transform = `scale(${scale}) translate(-50%, -50%)`;
      }, 400);
    }
  },

  toast(msg) {
    const t = document.getElementById('shareToast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  },

  /* ── INTRO ── */
  renderIntro() {
    document.getElementById('sIntro').innerHTML = `<div class="intro">
      <div style="font-size:2.4rem;margin-bottom:1.1rem;opacity:.75">🧭</div>
      <div class="intro-value">취향 기반 여행 큐레이션</div>
      <h1>당신의 <em>여행 취향</em>을<br>발견해 보세요</h1>
      <p>직접 말하기 어려운 여행 취향도 있습니다.<br>몇 가지 선택만으로 당신만의 여행 DNA를 찾고,<br>그에 맞는 실제 일정까지 만들어 드립니다.</p>
      <div class="intro-preset-title" style="margin:2rem 0 0.8rem;font-size:0.9rem;font-weight:600;color:var(--terra)">혹시 자기 취향을 잘 알고 계신가요?</div>
      <div class="preset-grid">
        ${CONFIG.PRESETS.map(p => `
          <div class="preset-card" onclick="App.selectPreset('${p.id}')">
            <div class="preset-emoji">${p.emoji}</div>
            <div class="preset-info">
              <div class="preset-title">${p.title}</div>
              <div class="preset-desc">${p.desc}</div>
            </div>
            <div class="preset-arrow">→</div>
          </div>
        `).join('')}
      </div>
      <div style="margin:2.4rem 0 1rem;font-size:0.9rem;opacity:0.6">— 또는 —</div>
      <button class="btn btn-primary" style="width:100%" onclick="App.startFlow()">나의 여행 DNA 정밀 분석하기</button>
      ${this._hasCachedProfile() ? `<button class="btn btn-ghost" style="margin-top:0.6rem;font-size:0.8rem;width:100%" onclick="App.loadCachedProfile()">기존 취향으로 결과 보기</button>` : ''}
    </div>`;
    this.setProgress(0);
  },

  selectPreset(id) {
    const preset = CONFIG.PRESETS.find(p => p.id === id);
    if (!preset) return;
    
    AppState.presetId = id;
    // 분석 효과를 잠깐 보여주기 위해 sLoad 화면으로 전환
    this.showScreen('sLoad');
    this.setProgress(82);

    document.getElementById('sLoad').innerHTML = `<div class="ld-wrap">
      <div class="ld-spinner"></div>
      <div class="ld-txt">'${preset.title}' 테마를 불러오고 있습니다</div>
      <div class="ld-sub">당신을 위한 최적의 여행 DNA를 조합 중...</div>
    </div>`;
    this.showScreen('sLoad');

    setTimeout(() => {
      AppState.currentProfile = JSON.parse(JSON.stringify(preset.profile));
      localStorage.setItem('travel_dna_profile', JSON.stringify(AppState.currentProfile));
      this.renderResult(AppState.currentProfile);
    }, 1200);
  },

  /* ── AB ── */
  startFlow() {
    this._setupAB();
    // sAB 컨테이너를 먼저 채운 뒤 화면 전환
    document.getElementById('sAB').innerHTML = `<div class="ab-wrap">
      <div class="ab-round" id="abRound"></div>
      <div id="abMidNudge"></div>
      <div class="ab-q"><h2 id="abQ"></h2></div>
      <div class="ab-sub">직감적으로, 빠르게 골라 주세요</div>
      <div class="ab-cards" id="abCards"></div>
    </div>`;
    this.showScreen('sAB');
    this.setStep('STEP 1/3');
    this.renderAB();
    this.setProgress(3);
  },

  _setupAB() {
    // 10 core 중 랜덤하게 5개 선택
    const must = CONFIG.CORE_DIMENSIONS
                       .sort(() => Math.random() - .5)
                       .slice(0, 5)
                       .map(d => CONFIG.AB.find(p => p.dim === d))
                       .filter(Boolean);
    AppState.abSubset = [...must].sort(() => Math.random() - .5);
  },

  renderAB() {
    const { round, abSubset, choices } = AppState;
    if (round >= abSubset.length) { this._goMemScreen(); return; }
    this.setProgress(3 + (round / abSubset.length) * 37);
    const p = abSubset[round];
    document.getElementById('abRound').textContent = `${round + 1} / ${abSubset.length}`;
    
    // Changing container background slightly based on round
    document.getElementById('sAB').style.transition = 'background 0.5s ease';
    document.getElementById('sAB').style.background = `radial-gradient(circle at top left, ${p.a.c}11, transparent 60%), radial-gradient(circle at bottom right, ${p.b.c}11, transparent 60%)`;

    document.getElementById('abQ').textContent = p.q;
    const cardsHtml = ['a','b'].map(side => `
      <div class="ab-card" id="c${side.toUpperCase()}" data-side="${side}">
        <div class="ab-card-bg" style="background-image:url(${p[side].bgUrl})"></div>
        <div class="ab-content-wrap">
          <div class="ab-atmo" style="background:${p[side].c}"></div>
          <div><div class="ab-emoji">${p[side].emoji}</div><div class="ab-title">${p[side].title}</div></div>
          <div class="ab-desc">${p[side].desc}</div>
        </div>
      </div>`).join('');
    
    document.getElementById('abCards').innerHTML = cardsHtml;
    
    // Add logic for 3D tilt and Touch Swipe
    this._attachCardInteractions();
  },

  _attachCardInteractions() {
    const cards = document.querySelectorAll('.ab-card');
    cards.forEach(card => {
      // Click
      card.addEventListener('click', () => {
        if (!card.classList.contains('sel') && !card.classList.contains('notsel')) {
           this.selectAB(card.dataset.side);
        }
      });
      
      // Mouse Move (3D Tilt)
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        if (!card.classList.contains('sel') && !card.classList.contains('notsel')) {
           card.style.transform = `scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('sel') && !card.classList.contains('notsel')) {
           card.style.transform = `scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }
      });
      
      // Touch (Swipe)
      let touchStartX = 0;
      let touchStartY = 0;
      card.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, {passive:true});
      
      card.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Ensure its a horizontal swipe not vertical scroll
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
           // Provide visual feedback for swipe
           card.style.transition = 'transform 0.3s';
           if (deltaX > 0) {
              card.style.transform = `translateX(20px) rotate(3deg)`;
           } else {
              card.style.transform = `translateX(-20px) rotate(-3deg)`;
           }
           setTimeout(() => this.selectAB(card.dataset.side), 150);
        }
      });
    });
  },

  selectAB(side) {
    if(!AppState.abSubset[AppState.round]) return;
    AppState.choices[AppState.abSubset[AppState.round].dim] = side;
    
    const sel = document.getElementById(`c${side.toUpperCase()}`);
    const oth = document.getElementById(side === 'a' ? 'cB' : 'cA');
    
    if(!sel || !oth) return;

    // Reset inline styles for transform and add classes
    sel.style.transform = '';
    oth.style.transform = '';
    
    sel.classList.add('sel'); 
    oth.classList.add('notsel');
    sel.style.pointerEvents = oth.style.pointerEvents = 'none';
    
    // Add brief visual pulse to progress bar
    const pb = document.getElementById('prog');
    pb.style.boxShadow = '0 0 10px var(--terra), 0 0 20px var(--terra)';
    setTimeout(() => pb.style.boxShadow = 'none', 400);

    setTimeout(() => { AppState.round++; this.renderAB(); }, 800);
  },

  /* ── MEMORY ── */
  _goMemScreen() {
    document.getElementById('sMem').innerHTML = `<div class="mem-wrap">
      <h2>최고의 여행 순간을<br>하나만 떠올려 보세요</h2>
      <div class="sub">장소, 상황, 느낌 — 무엇이든 좋습니다</div>
      <div class="mem-incentive">💡 구체적일수록 정확한 취향을 찾습니다</div>
      <textarea class="mem-ta" id="memTxt" placeholder="예: 파리 골목의 작은 카페에서 비 오는 거리를 멍하니 바라보던 오후..."></textarea>
      <div class="emo-label">그때 느꼈던 감정은? (복수 선택)</div>
      <div class="emo-grid">${CONFIG.EMOTIONS.map(e =>
        `<div class="emo-chip" onclick="App.toggleEmotion(this,'${e}')">${e}</div>`
      ).join('')}</div>
      <button class="btn btn-primary" onclick="App.finMem()">다음으로</button>
      <button class="btn-skip" onclick="App.skipMem()">건너뛰기</button>
    </div>`;
    this.showScreen('sMem'); this.setStep('STEP 2/3'); this.setProgress(45);
  },

  goMem() { this._goMemScreen(); },

  toggleEmotion(el, v) {
    el.classList.toggle('sel');
    const i = AppState.selectedEmotions.indexOf(v);
    i > -1 ? AppState.selectedEmotions.splice(i, 1) : AppState.selectedEmotions.push(v);
  },

  finMem()  { AppState.memoryText = document.getElementById('memTxt')?.value || ''; this.goNeg(); },
  skipMem() { AppState.memoryText = ''; AppState.selectedEmotions = []; this.goNeg(); },

  /* ── NEGATIVE ── */
  goNeg() {
    document.getElementById('sNeg').innerHTML = `<div class="neg-wrap">
      <h2>여행에서 <em style="color:var(--rose);font-family:'Cormorant Garamond',serif;font-style:italic">절대</em> 겪고 싶지 않은 것</h2>
      <div class="sub">해당하는 것을 모두 골라 주세요</div>
      <div class="neg-promise">✓ 선택한 항목은 일정에서 제외됩니다</div>
      <div class="neg-count" id="negCnt">0개 선택</div>
      <div class="neg-grid">${CONFIG.NEGATIVES.map((n, i) =>
        `<div class="neg-card" onclick="App.toggleNeg(this,${i})"><span class="ic">${n.i}</span><span class="tx">${n.t}</span></div>`
      ).join('')}</div>
      <button class="btn btn-primary" onclick="App.finAcc()">결과 보기</button>
    </div>`;
    this.showScreen('sNeg'); this.setStep('STEP 3/3'); this.setProgress(55);
  },

  toggleNeg(el, i) {
    el.classList.toggle('sel');
    const t = CONFIG.NEGATIVES[i].t;
    const idx = AppState.selectedNegatives.indexOf(t);
    idx > -1 ? AppState.selectedNegatives.splice(idx, 1) : AppState.selectedNegatives.push(t);
    document.getElementById('negCnt').textContent = AppState.selectedNegatives.length + '개 선택';
  },



  finAcc() {
    this.setProgress(82);
    document.getElementById('sLoad').innerHTML = `<div class="ld-wrap">
      <div class="ld-spinner"></div>
      <div class="ld-txt" id="ldTxt">취향을 분석하고 있습니다...</div>
      <div class="ld-sub" id="ldSub">당신만의 고유한 여행 DNA를 조합 중...</div>
      <div class="ld-insight" id="ldInsight" style="display:none">
        <div class="ld-insight-label">흥미로운 조합 발견 ✦</div>
        <div class="ld-insight-msg" id="ldInsightMsg"></div>
      </div>
    </div>`;
    this.showScreen('sLoad'); this.setStep('');
    const ins = CONFIG.LOADING_INSIGHTS.find(i => i.cond(AppState.choices));
    if (ins) setTimeout(() => {
      document.getElementById('ldInsightMsg').textContent = ins.msg;
      document.getElementById('ldInsight').style.display = 'block';
    }, 900);
    this._analyzeProfile();
  },

  /* ── ANALYSIS API ── */
  _buildChoiceSummary() {
    return Object.entries(AppState.choices).map(([d, v]) => {
      const p = CONFIG.AB.find(x => x.dim === d);
      return p ? `${d}:"${(v==='a' ? p.a : p.b).title}"` : '';
    }).filter(Boolean).join(', ');
  },

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
      // 프로필 로컬 스토리지에 저장
      localStorage.setItem('travel_dna_profile', JSON.stringify(AppState.currentProfile));
      this.renderResult(AppState.currentProfile);
    } catch(e) {
      console.error(e); this._fallbackProfile();
    }
  },

  /* ── RESULT ── */
  renderResult(p) {
    this.setProgress(100);
    const dna = document.getElementById('vDNA');
    if (dna) dna.classList.add('v-reveal');
    const bg = document.getElementById('vBackground');
    if (bg) bg.classList.add('bg-bright');

    const { companion } = AppState;
    const dimColors = ['#C4704B','#7A9A7E','#C4A84B','#9A7AB4'];
    
    // 주 색상 결정 (DNA 기반)
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

    this.showScreen('sResult', true); this.setStep('');
    
    // 애니메이션 트리거
    setTimeout(() => {
      document.querySelectorAll('.tc-dim-fill').forEach(el => {
        const w = el.style.width; el.style.width = '0';
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
    const txt = `🧭 여행 취향 발견기\n\n✦ ${p?.typeName||''}\n${p?.typeDesc||''}\n\n키워드: ${(p?.keywords||[]).join(' · ')}\n이상적인 여행: ${p?.idealTrip||''}\n추천 도시: ${(p?.recommendCities||[]).join(', ')}`;
    navigator.clipboard.writeText(txt).then(()=>this.toast('결과가 클립보드에 복사되었습니다 ✓')).catch(()=>this.toast('복사에 실패했습니다'));
  },

  retryFromAB()  { AppState.reset(); this.startFlow(); },
  retryFromNeg() { AppState.resetFromNeg(); this.goNeg(); },

  /* ── CACHE & BYPASS ── */
  _hasCachedProfile() {
    return !!localStorage.getItem('travel_dna_profile');
  },

  loadCachedProfile() {
    const raw = localStorage.getItem('travel_dna_profile');
    if (!raw) return;
    try {
      AppState.currentProfile = JSON.parse(raw);
      this.renderResult(AppState.currentProfile);
      this.toast('이전 취향 정보를 불러왔습니다 ✦');
    } catch(e) {
      console.error('캐시 로드 실패', e);
      localStorage.removeItem('travel_dna_profile');
      this.renderIntro();
    }
  },

  _fallbackProfile() {
    const c = AppState.choices;
    const q=c.crowd==='b', l=c.local==='b', s=c.pace==='b', n=c.night==='b';
    const prim = AppState.accOrder[0] || 'comfort';
    const tns = [['고요한 골목의 관찰자','붐비는 곳을 피해 현지인의 일상 속으로 스며드는 여행자.'],
                 ['도시의 에너지 수집가','도시의 활기를 온몸으로 흡수하며 루프탑 바에서 마무리.'],
                 ['일상의 탐험가','슈퍼마켓이 더 설레는, 일상을 여행하는 여행자.'],
                 ['감각의 산책자','정해진 목적 없이 걸으며 우연한 발견에 열려 있는 여행자.']];
    const [tn, td] = q&&l&&s ? tns[0] : !q&&!s ? tns[1] : l&&s ? tns[2] : tns[3];
    this.renderResult({typeName:tn, typeDesc:td,
      keywords:[q?'고요함':'활기', l?'로컬 몰입':'랜드마크', s?'느린 여행':'알찬 일정', n?'호텔 TV':'루프탑 바', '취향 여행'],
      dimensions:{
        crowd:{score:q?78:28,leftLabel:'활기',rightLabel:'고요',desc:q?'한산한 공간에서 에너지 충전':'사람들의 에너지를 즐기는 편'},
        explore:{score:l?82:25,leftLabel:'랜드마크',rightLabel:'뒷골목',desc:l?'지도에 없는 곳에서 진짜 발견':'유명한 곳엔 이유가 있다'},
        pace:{score:s?75:22,leftLabel:'빼곡한 일정',rightLabel:'느린 여행',desc:s?'여유가 품질을 결정':'하루를 최대한 알차게'},
        immersion:{score:l?85:30,leftLabel:'관광객',rightLabel:'현지인',desc:l?'현지인의 일상이 곧 최고의 관광':'여행자로서 특별한 경험'}
      },
      accProfile:{primary:prim, scores:{purity:prim==='purity'?85:40, comfort:prim==='comfort'?85:40, sensory:prim==='sensory'?85:40}, chips:AppState.selectedAccChips.slice(0,3)},
      idealTrip: s&&q ? '한산한 유럽 소도시 카페에서 아침을 시작하고 오래된 성당의 적막 속을 걷는 일주일.' : '새로운 도시에 도착해 시장을 찾고 루프탑 바에서 야경을 보며 마무리하는 일주일.',
      hiddenTaste: n ? '호텔 방에서 현지 TV를 보는 것이 진짜 문화 체험입니다.' : '우연히 발견한 조용한 공간에서 감동을 받는 타입.',
      avoidReflection: AppState.selectedNegatives.length ? `'${AppState.selectedNegatives.slice(0,2).join("', '")}' 등을 피해 일정을 구성합니다.` : '',
      recommendCities: q&&l ? ['포르투갈 포르투','일본 교토','체코 체스키크룸로프'] : q ? ['오스트리아 빈','슬로베니아 류블랴나','벨기에 겐트'] : ['스페인 바르셀로나','태국 방콕','멕시코 멕시코시티']
    });
  },

  /* ── PLAN ── */
  goToPlan() {
    const p = AppState.currentProfile;
    const apl = CONFIG.ACC_PRIM_LABELS[AppState.accOrder[0]] || '';
    const cpl = CONFIG.COMPANION_SHORT[AppState.companion] || '';
    const ctxHtml = [
      p?.typeName ? `<span class="plan-ctx-chip dna">✦ ${p.typeName}</span>` : '',
      AppState.selectedNegatives.length ? `<span class="plan-ctx-chip avoid">✕ ${AppState.selectedNegatives.length}가지 기피</span>` : '',
      apl ? `<span class="plan-ctx-chip acc">🏨 ${apl}</span>` : '',
      cpl ? `<span class="plan-ctx-chip dna">👤 ${cpl}</span>` : ''
    ].join('');
    const cityChipsHtml = CONFIG.CITIES.map(c => 
      `<div class="city-chip ${AppState.selectedCity===c?'sel':''}" onclick="App.pickCity(this,'${c}')">${c}</div>`).join('');

    document.getElementById('sPlan').innerHTML = `<div class="plan-wrap">
      <h2>맞춤 여행 일정 만들기</h2>
      <div class="sub">취향 분석 결과를 바탕으로 나만의 일정을 생성합니다</div>
      <div class="plan-ctx">${ctxHtml}</div>
      <div class="plan-field"><label>여행지 선택</label>
        <div class="city-chips">${cityChipsHtml}</div>
        <div class="plan-or">또는 직접 입력</div>
        <input class="plan-input" type="text" id="customCity" placeholder="예: 포르투, 피렌체, 퀘벡시티..." oninput="if(this.value.trim()){document.querySelectorAll('.city-chip').forEach(x=>x.classList.remove('sel'));AppState.selectedCity='';}">
      </div>
      <div class="plan-row">
        <div class="plan-field"><label>출발일</label>
          <div class="cal-wrap" id="calWrap">
            <div class="cal-trigger" id="calTrig" onclick="App.toggleCal()">
              <span id="calDisp" class="cal-placeholder">날짜를 선택하세요</span>
              <span class="cal-arrow">▼</span>
            </div>
            <div class="cal-dd" id="calDD">
              <div class="cal-nav"><button onclick="App.calPrev()">‹</button><span class="cal-month-label" id="calMon"></span><button onclick="App.calNext()">›</button></div>
              <div class="cal-wk"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
              <div class="cal-days" id="calDays"></div>
            </div>
          </div>
        </div>
        <div class="plan-field"><label>여행 기간</label>
          <select class="plan-input" id="planDur">
            <option value="3">3일 (2박 3일)</option><option value="4">4일 (3박 4일)</option>
            <option value="5" selected>5일 (4박 5일)</option><option value="7">7일 (6박 7일)</option>
          </select>
        </div>
      </div>
      <div class="plan-field"><label>특별히 원하는 것 (선택사항)</label>
        <input class="plan-input" type="text" id="planWish" placeholder="예: 한식당 포함, 와이너리, 근교 당일치기...">
      </div>
      <div style="margin-top:1.5rem">
        <button class="btn btn-primary" onclick="App.generateItinerary()">일정 생성하기</button>
        <br><button class="btn btn-ghost" onclick="App.showScreen('sResult',true)">← 취향 결과로 돌아가기</button>
      </div>
    </div>`;

    AppState.selectedCity = '';
    const d = new Date(); d.setMonth(d.getMonth() + 1);
    AppState.calYear = d.getFullYear(); AppState.calMonth = d.getMonth();
    this.showScreen('sPlan'); this.setStep('TRIP PLANNER');
    this.renderCal();
    this._calOutsideHandlerBound = this._calOutsideHandler.bind(this);
    document.removeEventListener('click', this._calOutsideHandlerBound);
    document.addEventListener('click', this._calOutsideHandlerBound);
  },

  _calOutsideHandler(e) {
    const w = document.getElementById('calWrap');
    if (w && !w.contains(e.target)) {
      document.getElementById('calDD')?.classList.remove('show');
      document.getElementById('calTrig')?.classList.remove('open');
    }
  },

  pickCity(el, c) {
    document.querySelectorAll('.city-chip').forEach(x => x.classList.remove('sel'));
    el.classList.add('sel');
    AppState.selectedCity = c;
    document.getElementById('customCity').value = '';
  },

  toggleCal() {
    document.getElementById('calDD').classList.toggle('show');
    document.getElementById('calTrig').classList.toggle('open');
  },

  calPrev() { AppState.calMonth === 0 ? (AppState.calMonth=11, AppState.calYear--) : AppState.calMonth--; this.renderCal(); },
  calNext() { AppState.calMonth === 11 ? (AppState.calMonth=0,  AppState.calYear++) : AppState.calMonth++; this.renderCal(); },

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

  /* ── ITINERARY API ── */
  _getItinCacheKey(city, dur, profile) {
    const dnaKey = profile ? profile.typeName : 'default';
    return `itin_cache_${city}_${dur}_${dnaKey}`.replace(/\s+/g, '_');
  },

  async generateItinerary() {
    const custom = document.getElementById('customCity').value.trim();
    const city = custom || AppState.selectedCity;
    if (!city) { alert('여행지를 선택하거나 입력해 주세요.'); return; }

    const { calSelected, selectedNegatives: neg, companion, currentProfile: p } = AppState;
    const dateStr = calSelected
      ? `${calSelected.getFullYear()}-${String(calSelected.getMonth()+1).padStart(2,'0')}-${String(calSelected.getDate()).padStart(2,'0')}`
      : '미정';
    const dur      = document.getElementById('planDur').value;
    const wish     = document.getElementById('planWish').value.trim();

    // 1. 캐시 확인
    const cacheKey = this._getItinCacheKey(city, dur, p);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const it = JSON.parse(cached);
        this.renderItinerary(it, city, dur, dateStr);
        return;
      } catch(e) { localStorage.removeItem(cacheKey); }
    }

    // ── 로딩 화면 ──
    this._showItinSkeleton(city, dur);
    if (this._calOutsideHandlerBound) {
      document.removeEventListener('click', this._calOutsideHandlerBound);
      this._calOutsideHandlerBound = null;
    }
    
    // ── 도시 데이터 백그라운드 Fetch ──
    const cityMap = { '포르투': 'porto', '교토': 'kyoto', '파리': 'paris', 'paris': 'paris', '런던': 'london', 'london': 'london', '뉴욕': 'new_york', 'new_york': 'new_york', '로마': 'rome', 'rome': 'rome', '바르셀로나': 'barcelona', 'barcelona': 'barcelona', '도쿄': 'tokyo', 'tokyo': 'tokyo', '방콕': 'bangkok', 'bangkok': 'bangkok', '시드니': 'sydney', 'sydney': 'sydney', '프라하': 'prague', 'prague': 'prague' };
    
    // 로컬 환경(file://)에서의 fetch 제한을 고려한 주요 도시 데이터 내장
    const CITY_FALLBACKS = {
      'new_york': {
        "description": "세계 최고의 대도시 뉴욕. 타임스퀘어에서 자유의 여신상까지, 잠들지 않는 도시의 에너지를 느껴보세요.",
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
        "description": "도루강 언덕 위 오렌지빛 지붕이 아름다운 포르투갈의 낭만 도시.",
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
        "description": "예술과 낭만의 도시 파리. 에펠탑에서 루브르 박물관까지, 역사가 살아 숨쉬는 거리를 걸어보세요.",
        "senses": { "sight": "노란 조명을 밝힌 세느강과 에펠탑의 실루엣", "sound": "카페 테라스의 활기찬 대화 소리", "smell": "아침 일찍 문을 연 불랑제리의 고소한 바게트 향" },
        "map": { "lat": 48.8566, "lng": 2.3522, "zoom": 12, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
          {"lat":48.8584, "lng":2.2945, "name":"에펠탑", "time":"오후 8시", "note":"파리의 상징적인 랜드마크 야경 감상"},
          {"lat":48.8606, "lng":2.3376, "name":"루브르 박물관", "time":"오전 9시", "note":"모나리자 등 수천 점의 걸작이 있는 박물관"},
          {"lat":48.8867, "lng":2.3431, "name":"몽마르트르 언덕", "time":"오후 4시", "note":"파리 시내를 내려다보는 예술가들의 거리"}
        ] }
      },
      'london': {
        "description": "전통과 현대가 공존하는 런던. 템즈강을 따라 걷는 역사 산책과 세련된 마켓들을 경험하세요.",
        "senses": { "sight": "런던 아이에서 내려다보는 템즈강의 스카이라인", "sound": "빅 벤의 웅장한 종소리", "smell": "보로 마켓의 풍성한 음식 냄새" },
        "map": { "lat": 51.5074, "lng": -0.1278, "zoom": 12, "legend": [{"c":"#C4704B","l":"명소"}], "pins": [
          {"lat":51.5007, "lng":-0.1246, "name":"빅 벤", "time":"오전 10시", "note":"영국 국회의사당의 상징적인 시계탑"},
          {"lat":51.5033, "lng":-0.1195, "name":"런던 아이", "time":"오후 7시", "note":"보름달처럼 런던을 비추는 거행 관람차"},
          {"lat":51.5081, "lng":-0.0759, "name":"타워 브릿지", "time":"오후 3시", "note":"템즈강의 품격을 더하는 개폐식 도개교"}
        ] }
      }
    };

    const normCity = city.trim().normalize('NFC').toLowerCase();
    let mappedId = cityMap[normCity] || Object.values(cityMap).find(v => v === normCity) || null;
    
    if (mappedId) {
      // 1. 우선 내장 데이터 확인
      if (CITY_FALLBACKS[mappedId]) {
        AppState.cityData = CITY_FALLBACKS[mappedId];
        console.log(`Using fallback data for ${mappedId}`);
      }
      
      // 2. 외부 데이터 Fetch 시도 (내장 데이터가 있더라도 최신 정보 업데이트 시도)
      try {
        const dRes = await fetch(`taste/assets/cities/${mappedId}.json`);
        if (dRes.ok) AppState.cityData = await dRes.json();
      } catch(e) { /* fetch 실패 시 AppState.cityData는 유지됨 */ }
    } else {
      AppState.cityData = null;
    }

    const citySpots = AppState.cityData?.map?.pins 
      ? `\n[추천 장소 리스트]\n${AppState.cityData.map.pins.map(p => `- ${p.name}: ${p.note}`).join('\n')}`
      : '';

    const cityContext = AppState.cityData 
      ? `\n[도시 배경 정보]\n분위기: ${AppState.cityData.description}\n주요 감각: 시각(${AppState.cityData.senses?.sight||''}), 청각(${AppState.cityData.senses?.sound||''}), 후각(${AppState.cityData.senses?.smell||''})${citySpots}`
      : '';

    const costLevel = CONFIG.CITY_COSTS[mappedId] || 3;
    const levelMap = { 1: '매우 저렴', 2: '저렴', 3: '보통', 4: '비쌈', 5: '매우 비쌈' };
    const costHint = `이 도시의 물가 수준은 5점 만점에 ${costLevel}점(${levelMap[costLevel]}) 입니다.`;

    const prompt = `여행 일정 전문가. 실제 존재하는 장소(정확한 상호명·주소·가격 포함)로 JSON만 출력. 설명 없이 JSON만. ${cityContext}
여행자:${p?.typeName||''}의 성향을 최우선 반영하여 장소 선정. 
기피(반드시 제외):${neg.join(',')||'없음'}
여행지:${city} / 출발일:${dateStr} / 기간:${dur}일 / 요청:${wish||'없음'} / 물가참고:${costHint}
규칙: 
1. 하루 5~7개 spot(오전·점심·오후·저녁·야간 포함). 
2. [중요] '실제장소명', '주소|가격' 같은 견본 텍스트를 그대로 쓰지 말고, 반드시 실제 존재하는 구체적인 상호명과 정보를 입력할 것. 
3. 각 spot의 name은 실제 현지 장소명(한국어 표기). 
4. note에 정확한 주소, 입장료/식사 가격(현지 통화 병기), 예약 필요 여부, 로컬 팁, 공간의 분위기 묘사를 "상세히" 포함. 
5. budgetPerDay는 실제 물가를 반영하여 구체적 숫자로 제시.
6. mapFocus: 이 일정이 해당 도시의 어떤 구역에 집중되어 있는지(예: '역사지구와 강변 중심') 1문장 설명.
{"destination":"","title":"","summary":"","palette":["#hex1","#hex2","#hex3"],"cityTagline":"","heroEmoji":"","mapFocus":"","budgetPerDay":{"food":0,"transport":0,"entrance":0},"days":[{"day":1,"title":"","desc":"","spots":[{"time":"09:00","name":"[실제 장소 이름]","note":"[상세 주소] | [예상 가격] | [로컬 팁] | [분위기 묘사]","sense":"[이 공간에서 느껴지는 한 문장의 감각]","tags":["해시태그1"],"cost":0}]}],"tips":""}`;

    try {
      // ── 스트리밍 호출 ──
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4500,
          stream: true,
          messages: [{role:'user', content: prompt}]
        })
      });

      if (!res.ok) throw new Error(`API ${res.status}`);

      let buffer = '';
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // SSE 파싱 루프
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
              this._updateStreamProgress(buffer); // 실시간 진행 표시
            }
          } catch { /* 불완전 JSON 청크 무시 */ }
        }
      }

      // 완성된 JSON 파싱 및 렌더링
      const clean = buffer.replace(/```json|```/g, '').trim();
      const it = JSON.parse(clean);
      
      // 캐시에 저장 (속도 최적화)
      localStorage.setItem(cacheKey, JSON.stringify(it));
      
      this.renderItinerary(it, city, dur, dateStr);

    } catch(e) {
      console.error(e);
      this._fallbackItinerary(city, dur, dateStr);
    }
  },

  // 스트리밍 중 Day 개수를 감지해 로딩 메시지를 업데이트
  _updateStreamProgress(buf) {
    const days = (buf.match(/"day"\s*:/g) || []).length;
    const sub = document.getElementById('ldSub');
    const prog = document.getElementById('ldDetailMsg');
    
    if (sub) {
      if (days > 0) sub.textContent = `Day ${days} 일정을 상세 설계 중...`;
      else sub.textContent = `기본 동선을 구성하는 중...`;
    }

    if (prog) {
      const stepCount = Math.floor(buf.length / 400); 
      const steps = [
        "취향 포인트 분석 중...",
        "현지 베스트 스팟 매핑...",
        "최적 이동 경로 계산 중...",
        "날씨와 물가 정보 업데이트...",
        "식도락 가이드 구성 중...",
        "최종 여정 브리핑 작성 중..."
      ];
      prog.textContent = steps[Math.min(stepCount, steps.length - 1)];
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

  // 스켈레톤 로딩 화면 (스트리밍 시작 전 즉시 표시)
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

  /* ── RENDER ITINERARY ── */
  renderItinerary(it, city, dur, dateStr) {
    const { companion, accOrder, selectedNegatives: neg, currentProfile: p } = AppState;
    const cpl = {solo:'혼자',couple:'커플/친구',family:'가족',group:'그룹'}[companion] || '';
    const apl = CONFIG.ACC_PRIM_LABELS[accOrder[0]] || '';
    const palette = it.palette || ['#C4704B','#6B8BA4','#C4A84B'];

    // JSON cityData 연동 
    const cd = AppState.cityData;
    const month = dateStr !== '미정' ? new Date(dateStr).getMonth()+1 : null;
    const seasonKey = month ? (month>=3&&month<=5?'spring':month>=6&&month<=8?'summer':month>=9&&month<=11?'autumn':'winter') : null;
    const seasonLabel = {spring:'봄 (3~5월)',summer:'여름 (6~8월)',autumn:'가을 (9~11월)',winter:'겨울 (12~2월)'}[seasonKey] || '';
    
    let seasonInfo = null, senseInfo = null, mapData = null;
    if (cd) {
      if (seasonKey && cd.seasons && cd.seasons[seasonKey]) seasonInfo = cd.seasons[seasonKey];
      if (cd.senses) senseInfo = cd.senses;
      if (cd.map) mapData = cd.map;
    }

    document.getElementById('itinContent').innerHTML = `
      <div class="city-hero" style="background:linear-gradient(135deg,${palette[0]}22 0%,${palette[1]}22 100%);border:1px solid ${palette[0]}30">
        <div class="city-hero-eyebrow" style="color:${palette[0]}">✦ ${p?.typeName||'여행자'}의 맞춤 일정</div>
        <div class="city-hero-name">${it.heroEmoji||'🗺️'} ${it.destination||city}</div>
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

    this.showScreen('sItin', true); this.setStep('');
    if (mapData) {
      setTimeout(() => this._initRealMap(mapData), 80);
    }
  },

  _initRealMap(mapData) {
    const container = document.getElementById('realMapContainer');
    if (!container || !mapData) return;
    
    // Check if map already initialized
    if (this._realMap) {
      this._realMap.remove();
    }
    
    // Use Light theme tile layer
    const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    });
    
    this._realMap = L.map('realMapContainer').setView([mapData.lat, mapData.lng], mapData.zoom || 13);
    tileLayer.addTo(this._realMap);
    
    mapData.pins.forEach(p => {
      // Create custom divIcon resembling the previous pin style
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
    
    setTimeout(() => {
      if(this._realMap) this._realMap.invalidateSize();
    }, 150);
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

  /* ── CITY-AWARE FALLBACK ITINERARY ── */
  _fallbackItinerary(city, dur, dateStr) {
    const cd = AppState.cityData;
    const n = parseInt(dur), days = [];
    const makeSpot = (time, name, note, sense, tags, cost=0) => ({time, name, note, sense, tags, cost});
    
    // JSON 데이터에서 스팟 추출 (없으면 기본값)
    const pins = cd?.map?.pins || [];
    
    for (let i = 1; i <= n; i++) {
      let spots = [];
      if (pins.length > 0) {
        // 내장 데이터가 있으면 최대한 순환하며 활용
        const s1 = pins[((i-1)*2) % pins.length];
        const s2 = pins[((i-1)*2+1) % pins.length];
        spots = [
          makeSpot(s1.time||'10:00', s1.name, s1.note, '', ['추천 명소'], s1.cost||0),
          makeSpot(s2.time||'15:00', s2.name, s2.note, '', ['인기 장소'], s2.cost||0),
          makeSpot('19:00', `${city} 로컬 맛집탐방`, '리뷰와 평점이 높은 현지 식당 방문', '', ['식도락'], 30000)
        ];
      } else {
        // 데이터 부족 시 기본 템플릿
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

  _calculateDynamicBudget(mappedId) {
    const level = CONFIG.CITY_COSTS[mappedId] || 3;
    // 기본값 (Level 3 기준)
    let food = 50000, transport = 15000, entrance = 20000;
    
    // 물가 지수에 따른 보정
    const multiplier = { 1: 0.5, 2: 0.7, 3: 1, 4: 1.5, 5: 2.2 }[level];
    
    return {
      food: Math.round(food * multiplier / 100) * 100,
      transport: Math.round(transport * multiplier / 100) * 100,
      entrance: Math.round(entrance * multiplier / 100) * 100
    };
  },

  _guessArchetype() {
    const ch = AppState.choices;
    const dims = Object.keys(ch);
    if (dims.length === 0) return null;

    // Simple heuristic based on partial choices
    let scores = { zen: 0, local: 0, bold: 0, flaneur: 0 };
    
    if (ch.crowd === 'b') scores.zen += 2;
    if (ch.pace === 'b') scores.zen += 1;
    
    if (ch.local === 'b') scores.local += 2;
    if (ch.dining === 'b') scores.local += 1;
    
    if (ch.pace === 'a') scores.bold += 2;
    if (ch.discovery === 'a') scores.bold += 1;
    
    if (ch.culture === 'a') scores.flaneur += 1;
    if (ch.nature === 'b') scores.flaneur += 1;

    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    return top[1] > 0 ? top[0] : 'flaneur';
  },

  /* ── INIT ── */
  init() {
    this.setProgress(0);
    this.renderIntro();
  }
};
App.init();
