'use client';

import { useEffect, useRef } from 'react';

const LOG_LINES = [
  '> 의식 패턴 스캔 초기화...',
  '> 자유의지 지수 측정 중...',
  '> 평행우주 간섭 신호 감지...',
  '> 시뮬레이션 데이터베이스 대조 중...',
  '> 통속의 뇌 가능성 계산...',
  '> 시간 루프 흔적 분석...',
  '> 우주 관찰자 지수 산출...',
  '> 존재 분류 알고리즘 실행 완료.',
  '> 결과 렌더링 중...',
];

interface Props {
  active: boolean;
  onComplete: () => void;
}

export default function AnalysisScreen({ active, onComplete }: Props) {
  const logRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) {
      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];
      if (logRef.current) logRef.current.innerHTML = '';
      return;
    }

    if (logRef.current) logRef.current.innerHTML = '';

    let delay = 0;
    LOG_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        if (!logRef.current) return;
        const div = document.createElement('div');
        div.className = 'log-line font-mono text-xs text-aurora-400 leading-relaxed';
        div.style.animationDelay = '0s';
        div.textContent = line;
        logRef.current.appendChild(div);
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }, delay);
      timerRef.current.push(t);
      delay += 380 + Math.random() * 180;
    });

    const done = setTimeout(onComplete, delay + 500);
    timerRef.current.push(done);

    return () => {
      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];
    };
  }, [active, onComplete]);

  return (
    <div className={`screen-wrap ${active ? 'visible' : 'hidden-down'}`}>
      <div className="glass-card w-full max-w-md p-10 flex flex-col items-center gap-7">
        {/* Orbit */}
        <div className="relative w-32 h-32 flex-shrink-0">
          {/* Center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-star-500 to-nebula-500"
            style={{ boxShadow: '0 0 20px #0ea5e9' }}
          />
          {/* Rings */}
          <div className="orbit-ring orbit-ring-1">
            <div
              className="orbit-dot"
              style={{ background: '#0ea5e9', boxShadow: '0 0 8px #0ea5e9' }}
            />
          </div>
          <div className="orbit-ring orbit-ring-2">
            <div
              className="orbit-dot"
              style={{ background: '#f97316', boxShadow: '0 0 8px #f97316' }}
            />
          </div>
          <div className="orbit-ring orbit-ring-3">
            <div
              className="orbit-dot"
              style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }}
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-1">
            우주 시뮬레이션 분석 중...
          </h2>
          <p className="text-star-400/50 text-xs">
            당신의 의식 패턴을 우주 데이터베이스와 대조하고 있습니다
          </p>
        </div>

        {/* Log */}
        <div
          ref={logRef}
          className="w-full bg-aurora-500/5 border border-aurora-500/15 rounded-xl p-4 max-h-44 overflow-y-auto space-y-1"
        />
      </div>
    </div>
  );
}
