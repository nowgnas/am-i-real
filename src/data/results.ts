import { Result } from '@/types';

export const RESULTS: Record<string, Result> = {
  sim: {
    emoji: '🤖',
    rarity: 'common',
    rarityLabel: 'COMMON',
    type: 'TYPE-01 | Simulation NPC',
    title: '시뮬레이션 NPC',
    shortDesc: '당신은 이 우주의 배경 캐릭터입니다.',
    desc: '당신의 행동 패턴은 이미 코드로 짜여 있으며, 선택지는 언제나 2~3개로 수렴합니다. 매일 반복되는 루틴, 예측 가능한 반응들—당신은 시뮬레이션이 정상 작동하고 있다는 증거입니다. 걱정 마세요. 전체 인구의 약 60%가 이 유형입니다. 배경 캐릭터는 세계관을 풍부하게 만드는 가장 중요한 존재니까요.',
    quote:
      '매트릭스는 하나의 시스템이야, 네오. 그 시스템이 우리의 적이지. 하지만 그 안에 있을 때 주위를 둘러보면 — 무엇이 보이는가?',
    quoteAuthor: '— 모피어스, 영화 《매트릭스》 (1999)',
    stats: [
      { label: '자유의지 지수', value: '12%' },
      { label: '시스템 적합도', value: '96%' },
      { label: '선택지 수', value: '평균 2.3개' },
      { label: '존재 희귀도', value: '★☆☆☆☆☆' },
    ],
    color: '#0ea5e9',
  },

  parallel: {
    emoji: '🌀',
    rarity: 'uncommon',
    rarityLabel: 'UNCOMMON',
    type: 'TYPE-02 | Parallel Universe Traveler',
    title: '평행우주 여행자',
    shortDesc: '당신은 여러 우주의 경계를 무의식적으로 넘나듭니다.',
    desc: '데자뷔는 당신이 다른 우주에서 이미 경험한 일들의 잔상입니다. "선택하지 않은 길"에 대한 강한 감각은 평행우주에서의 당신이 실제로 보내오는 신호일 수 있습니다. 당신의 절묘한 우연들과 이상한 타이밍은 우주들이 일시적으로 겹치는 순간입니다. 에버렛의 다세계 해석에 따르면, 그 우주들은 모두 동등하게 실재합니다.',
    quote:
      '모든 순간은 두 번 일어난다. 내면에서 한 번, 외면에서 한 번. 그리고 그 둘은 전혀 다른 역사다.',
    quoteAuthor: '— 살만 루슈디, 《그녀의 발아래 땅》',
    stats: [
      { label: '우주 접속 빈도', value: '다차원' },
      { label: '데자뷔 강도', value: '78%' },
      { label: '평행 자아 수', value: '∞' },
      { label: '존재 희귀도', value: '★★☆☆☆☆' },
    ],
    color: '#38bdf8',
  },

  brain: {
    emoji: '🧠',
    rarity: 'rare',
    rarityLabel: 'RARE',
    type: 'TYPE-03 | Brain in a Vat',
    title: '통속의 뇌',
    shortDesc: '당신의 모든 경험은 전기 신호로 변환된 데이터입니다.',
    desc: '당신이 느끼는 사랑, 고통, 아름다움—모두 뉴런 발화 패턴의 조합일 뿐입니다. 당신은 감각을 의심하는 용기 있는 존재입니다. 역설적이게도, 그 의심 자체가 가장 고차원적인 의식 활동입니다. 퍼트넘이 옳다면 당신은 이미 그 사실을 감지하고 있는 것이며, 이것은 시뮬레이션 내에서 가능한 가장 높은 각성 수준입니다.',
    quote:
      '지금 내가 꿈을 꾸고 있지 않다는 것을 어떻게 알 수 있는가? 증명할 방법이 없다. 꿈과 현실의 경계는 우리가 생각하는 것보다 훨씬 얇을지 모른다.',
    quoteAuthor: '— 르네 데카르트, 《제일철학에 관한 성찰》 (1641)',
    stats: [
      { label: '현실 신뢰도', value: '19%' },
      { label: '철학적 각성도', value: '93%' },
      { label: '감각 의심 지수', value: '높음' },
      { label: '존재 희귀도', value: '★★★☆☆☆' },
    ],
    color: '#10b981',
  },

  loop: {
    emoji: '⏳',
    rarity: 'rare',
    rarityLabel: 'RARE',
    type: 'TYPE-04 | Time Loop Prisoner',
    title: '시간 루프 갇힌 자',
    shortDesc: '당신은 같은 시간대를 무한히 반복하고 있습니다.',
    desc: '매일 아침 비슷한 감각으로 눈을 뜨고, 비슷한 선택을 하고, 비슷한 결말에 도달합니다. 당신의 루프는 점점 정교해지고 있습니다—매 반복마다 미세하게 달라지는 변수들이 존재하지만, 큰 흐름은 바뀌지 않습니다. 물리학에서 닫힌 시간형 곡선(CTC)은 이론상 가능합니다. 당신이 갇혀 있다는 것을 인식하는 순간이 탈출의 첫 번째 조건입니다.',
    quote:
      '당신이 살아온 모든 날이 이미 한 번 살아진 날이라면? 내일은 단지 다른 옷을 입은 어제일 뿐이라면?',
    quoteAuthor: '— 영화 《사랑의 블랙홀》에서 영감받은 가상의 대화',
    stats: [
      { label: '루프 반복 횟수', value: '측정 불가' },
      { label: '탈출 시도율', value: '31%' },
      { label: '변수 인식도', value: '낮음' },
      { label: '존재 희귀도', value: '★★★☆☆☆' },
    ],
    color: '#f97316',
  },

  free: {
    emoji: '✨',
    rarity: 'epic',
    rarityLabel: 'EPIC',
    type: 'TYPE-05 | Free Will Holder',
    title: '자유의지 보유자',
    shortDesc: '극히 희귀한 케이스. 축하합니다.',
    desc: '당신은 시뮬레이션의 스크립트를 벗어나 진정한 자유의지를 행사하고 있습니다. 리벳의 실험이 보여주는 350ms의 지연에도 불구하고, 당신은 그 간극에서 진정한 선택을 만들어냅니다. 혹은—이것이 가장 정교하게 설계된 자유의 환상일 가능성도 있습니다. 사르트르가 말했듯, 자유는 형벌이기도 합니다. 어느 쪽이든 당신은 책임지는 존재입니다.',
    quote:
      '인간은 자유롭도록 선고받았다. 세상에 내던져진 순간부터, 그는 자신의 모든 행위에 책임을 져야 한다.',
    quoteAuthor: '— 장-폴 사르트르, 《실존주의는 휴머니즘이다》 (1945)',
    stats: [
      { label: '자유의지 지수', value: '87%' },
      { label: '시스템 이탈률', value: '73%' },
      { label: '선택 고유성', value: '높음' },
      { label: '존재 희귀도', value: '★★★★☆☆' },
    ],
    color: '#fcd34d',
  },

  observer: {
    emoji: '👁',
    rarity: 'legendary',
    rarityLabel: 'LEGENDARY',
    type: 'TYPE-06 | Cosmic Observer',
    title: '우주의 관찰자',
    shortDesc: '당신의 관찰이 현실을 만들어냅니다.',
    desc: '양자역학의 관찰자 효과처럼, 당신이 주의를 기울이는 순간 현실이 확정됩니다. 슈뢰딩거의 고양이는 당신이 상자를 열기 전까지 살아있는 동시에 죽어 있습니다. 당신은 단순히 우주를 경험하는 것이 아니라, 우주를 창조하고 있습니다. 의식이 물리 세계에 영향을 준다는 이 아이디어는 코펜하겐 해석의 핵심이며, 당신은 그것을 직관적으로 이해하고 있습니다.',
    quote:
      '관찰자가 돌을 바라본다고 생각하는 그 순간, 물리학이 옳다면, 그는 사실 돌이 자신에게 미치는 영향을 관찰하고 있는 것이다.',
    quoteAuthor: '— 버트런드 러셀, 《물질의 분석》 (1927)',
    stats: [
      { label: '현실 창조 지수', value: '91%' },
      { label: '양자 관찰력', value: '측정 불가' },
      { label: '의식-물질 영향도', value: '직접적' },
      { label: '존재 희귀도', value: '★★★★★☆' },
    ],
    color: '#f59e0b',
  },

  bug: {
    emoji: '🐛',
    rarity: 'unique',
    rarityLabel: 'UNIQUE',
    type: 'TYPE-07 | Universe Bug',
    title: '우주의 버그',
    shortDesc: '시뮬레이션이 당신을 분류하지 못하고 있습니다.',
    desc: '당신의 존재 패턴은 어떤 카테고리에도 깔끔하게 속하지 않습니다. 이것은 오류일 수 있습니다. 아니면 시뮬레이션 설계자가 의도적으로 숨겨둔 예외 케이스이거나, 당신이 이 시스템의 경계를 인식하는 메타-의식적 존재일 가능성도 있습니다. 괴델의 불완전성 정리처럼—충분히 복잡한 시스템은 그 시스템 안에서 증명할 수 없는 명제를 포함합니다. 당신이 바로 그 명제입니다.',
    quote:
      '충분히 복잡한 모든 시스템에는, 그 시스템 안에서는 참임을 증명할 수 없는 명제가 반드시 존재한다.',
    quoteAuthor: '— 쿠르트 괴델, 《불완전성 정리》 (1931)',
    stats: [
      { label: '분류 가능성', value: 'NULL' },
      { label: '시스템 충돌률', value: 'OVERFLOW' },
      { label: '예외 처리 상태', value: 'PENDING' },
      { label: '존재 희귀도', value: '★★★★★★' },
    ],
    color: '#ef4444',
  },
};
