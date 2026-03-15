'use client';

import { useEffect, useState } from 'react';

interface Props {
  active: boolean;
  onStart: () => void;
}

const TITLE = '나는 진짜인가?';
const TOPICS = [
  '평행우주',
  '시뮬레이션 이론',
  '통속의 뇌',
  '자유의지',
  '시간 루프',
  '양자 의식',
  '우주적 목적',
];

export default function IntroScreen({ active, onStart }: Props) {
  const [typed, setTyped] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!active) {
      setTyped('');
      setShowContent(false);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      setTyped(TITLE.slice(0, ++i));
      if (i >= TITLE.length) {
        clearInterval(t);
        setTimeout(() => setShowContent(true), 300);
      }
    }, 110);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className={`screen-wrap ${active ? 'visible' : 'hidden-down'}`}>
      <div className="glass-card w-full max-w-xl p-10 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-star-500/30 text-star-400 text-xs tracking-widest uppercase mb-6">
          <span>🔭</span> 우주적 존재 진단
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 min-h-[1.2em]">
          <span className="text-grd-main">
            {typed}
            {typed.length < TITLE.length && (
              <span className="typing-cursor" />
            )}
          </span>
        </h1>
        <p className="text-star-400 text-sm mb-6 tracking-wider">
          Am I Real?
        </p>

        {/* Topic chips */}
        <div
          className={`flex flex-wrap gap-2 justify-center mb-8 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          {TOPICS.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full border border-white/10 text-star-300/70 bg-white/[0.03]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className={`text-star-300/60 text-sm leading-relaxed mb-8 transition-all duration-700 delay-100 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          당신이 지금 이 화면을 보고 있다는 사실 자체가,
          <br />
          이미 설계된 것일 수 있습니다.
          <br />
          <br />
          8가지 질문으로 당신이 어떤 우주에 존재하는지
          <br />
          진단해 드립니다. 정직하게 답해주세요.
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className={`w-full py-4 rounded-full font-bold text-base bg-gradient-to-r from-star-600 to-nebula-500 text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-star-500/30 active:translate-y-0 transition-all duration-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: showContent ? '200ms' : '0ms' }}
        >
          ✦ 진단 시작하기
        </button>

        {/* Type count hint */}
        <p
          className={`text-star-400/40 text-xs mt-4 transition-all duration-700 delay-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        >
          7가지 결과 유형 · 8개 질문 · 약 2분
        </p>
      </div>
    </div>
  );
}
