'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import StarCanvas from '@/components/StarCanvas';
import { RESULTS } from '@/data/results';
import { ResultKey } from '@/types';

const SCORE_LABELS: Record<ResultKey, string> = {
  sim: '시뮬레이션',
  parallel: '평행우주',
  brain: '통속의 뇌',
  free: '자유의지',
  bug: '우주 버그',
  loop: '시간 루프',
  observer: '우주 관찰자',
};

const SCORE_COLORS: Record<ResultKey, string> = {
  sim: '#0ea5e9',
  parallel: '#38bdf8',
  brain: '#10b981',
  free: '#fcd34d',
  bug: '#ef4444',
  loop: '#f97316',
  observer: '#f59e0b',
};

const BASE_SCORES: Record<ResultKey, Record<ResultKey, number>> = {
  sim:      { sim: 88, parallel: 32, brain: 25, loop: 40, free: 12, observer: 15, bug: 8 },
  parallel: { sim: 30, parallel: 85, brain: 22, loop: 35, free: 20, observer: 28, bug: 12 },
  brain:    { sim: 25, parallel: 20, brain: 90, loop: 30, free: 18, observer: 35, bug: 10 },
  loop:     { sim: 45, parallel: 28, brain: 32, loop: 87, free: 15, observer: 20, bug: 15 },
  free:     { sim: 12, parallel: 25, brain: 20, loop: 18, free: 89, observer: 65, bug: 8 },
  observer: { sim: 18, parallel: 35, brain: 45, loop: 22, free: 60, observer: 91, bug: 20 },
  bug:      { sim: 38, parallel: 42, brain: 40, loop: 38, free: 35, observer: 38, bug: 95 },
};

function formatRemaining(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h > 0) return `${h}시간 ${m}분 후 만료`;
  if (m > 0) return `${m}분 후 만료`;
  return '곧 만료';
}

interface Props {
  resultKey: string;
  remainingMs: number;
}

export default function SharedResultView({ resultKey, remainingMs }: Props) {
  const key = resultKey as ResultKey;
  const r = RESULTS[key];
  const imageCardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const barData = useMemo(() => {
    const scores = BASE_SCORES[key];
    return (Object.entries(scores) as [ResultKey, number][])
      .sort((a, b) => b[1] - a[1]);
  }, [key]);

  function toast(msg: string) {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  async function handleSaveImage() {
    setSaving(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const card = imageCardRef.current;
      if (!card) return;

      const prev = card.style.left;
      card.style.left = '0px';
      card.style.zIndex = '-1';
      await new Promise((r) => setTimeout(r, 80));

      const canvas = await html2canvas(card, {
        backgroundColor: '#020817',
        scale: 2,
        logging: false,
        useCORS: true,
      });
      card.style.left = prev;
      card.style.zIndex = '9999';

      const link = document.createElement('a');
      link.download = `am-i-real-${key}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast('이미지 저장 완료!');
    } catch {
      toast('이미지 저장 실패. 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  }

  const rarityClass = `rarity-${r.rarity}`;

  return (
    <main className="relative bg-space-950" style={{ minHeight: '100dvh' }}>
      <StarCanvas />
      <div className="nebula-blob" style={{ width: 500, height: 500, background: 'rgba(14,165,233,0.15)', top: -100, left: -100 }} />
      <div className="nebula-blob" style={{ width: 400, height: 400, background: 'rgba(249,115,22,0.12)', bottom: -80, right: -80, animationDelay: '-4s' }} />

      {/* share-scroll: fixed inset-0 overflow-y-auto with hidden scrollbar */}
      <div className="share-scroll">
      <div className="relative z-10 flex flex-col items-center px-6 py-12">
        {/* Header */}
        <div className="w-full max-w-2xl flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-star-400/50 text-sm">🌌 나는 진짜인가?</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-nebula-500/15 border border-nebula-500/30 text-nebula-400">
              공유된 결과
            </span>
          </div>
          <span className="text-xs text-star-400/40">⏱ {formatRemaining(remainingMs)}</span>
        </div>

        {/* Main card */}
        <div className="glass-card w-full max-w-2xl p-8 sm:p-10 mb-6">
          {/* Rarity + Type */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${rarityClass}`}>
              {r.rarityLabel}
            </span>
            <span className="text-star-400/50 text-xs">{r.type}</span>
          </div>

          {/* Emoji + Title */}
          <div className="text-center mb-6">
            <span className="block text-6xl mb-3" style={{ animation: 'float 3s ease-in-out infinite' }}>
              {r.emoji}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: r.color }}>
              {r.title}
            </h1>
            <p className="text-star-300/60 text-sm">{r.shortDesc}</p>
          </div>

          {/* Description */}
          <p className="text-star-300/75 text-sm leading-relaxed mb-5">{r.desc}</p>

          {/* Quote */}
          <blockquote
            className="border-l-2 pl-4 py-3 mb-6 rounded-r-lg text-sm leading-relaxed"
            style={{
              borderColor: r.color,
              background: `${r.color}10`,
              color: `${r.color}cc`,
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
            }}
          >
            <p className="mb-2 italic">"{r.quote}"</p>
            <cite className="text-xs not-italic opacity-60 block">{r.quoteAuthor}</cite>
          </blockquote>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {r.stats.map((s) => (
              <div key={s.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3">
                <div className="text-xs text-star-400/50 uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-sm font-bold text-white/90">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Spectrum bars */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 mb-6">
            <p className="text-xs text-star-400/50 uppercase tracking-wider mb-4">존재 유형 스펙트럼</p>
            <div className="space-y-3">
              {barData.map(([k, value]) => (
                <div key={k} className="flex items-center gap-3">
                  <span className="text-xs text-star-400/60 w-20 shrink-0">{SCORE_LABELS[k]}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: SCORE_COLORS[k],
                        width: `${value}%`,
                        opacity: k === key ? 1 : 0.45,
                        transition: `width 1s ease`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-star-400/40 w-8 text-right">{value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleSaveImage}
              disabled={saving}
              className="flex-1 min-w-[140px] py-3 rounded-full font-bold text-sm bg-gradient-to-r from-star-600 to-nebula-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-star-500/25 transition-all disabled:opacity-50"
            >
              {saving ? '저장 중...' : '🖼 이미지 저장'}
            </button>
            <Link
              href="/"
              className="flex-1 min-w-[120px] py-3 rounded-full font-bold text-sm border border-white/10 text-star-400/70 hover:border-star-500/40 hover:text-star-300 transition-all text-center"
            >
              ✦ 나도 진단받기
            </Link>
          </div>
        </div>
      </div>
      </div> {/* share-scroll */}

      {/* Off-screen image card for html2canvas capture */}
      <div
        ref={imageCardRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: '-9999px',
          width: '600px',
          background: '#020817',
          padding: '40px',
          borderRadius: '20px',
          border: `2px solid ${r.color}40`,
          boxShadow: `0 0 60px ${r.color}20`,
          color: '#f0f9ff',
          fontFamily: 'system-ui, sans-serif',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        {/* Top accent */}
        <div style={{ width: '100%', height: '3px', background: `linear-gradient(90deg, ${r.color}, transparent)`, borderRadius: '3px', marginBottom: '32px' }} />

        {/* Rarity */}
        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: r.color, marginBottom: '24px', opacity: 0.8 }}>
          {r.rarityLabel} · {r.type}
        </div>

        {/* Emoji + Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '64px', marginBottom: '12px' }}>{r.emoji}</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: r.color, marginBottom: '6px' }}>{r.title}</h2>
          <p style={{ fontSize: '13px', color: '#7dd3fc', opacity: 0.7 }}>{r.shortDesc}</p>
        </div>

        {/* Description */}
        <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#bae6fd', opacity: 0.8, marginBottom: '20px' }}>{r.desc}</p>

        {/* Quote */}
        <div style={{ borderLeft: `3px solid ${r.color}`, paddingLeft: '16px', marginBottom: '24px', background: `${r.color}12`, borderRadius: '0 8px 8px 0', padding: '12px 16px' }}>
          <p style={{ fontSize: '12px', fontStyle: 'italic', color: r.color, marginBottom: '4px' }}>"{r.quote}"</p>
          <p style={{ fontSize: '11px', color: r.color, opacity: 0.6 }}>{r.quoteAuthor}</p>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {r.stats.map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '10px', color: '#7dd3fc', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Spectrum bars */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '10px', color: '#7dd3fc', opacity: 0.45, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>존재 유형 스펙트럼</div>
          {barData.map(([k, value]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
              <span style={{ fontSize: '11px', color: '#7dd3fc', opacity: 0.55, width: '60px', flexShrink: 0 }}>{SCORE_LABELS[k]}</span>
              <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${value}%`, background: SCORE_COLORS[k], borderRadius: '100px', opacity: k === key ? 1 : 0.38 }} />
              </div>
              <span style={{ fontSize: '10px', color: '#7dd3fc', opacity: 0.38, width: '28px', textAlign: 'right' }}>{value}%</span>
            </div>
          ))}
        </div>

        {/* Watermark */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#7dd3fc', opacity: 0.4 }}>나는 진짜인가? | Am I Real?</span>
          <span style={{ fontSize: '11px', color: r.color, opacity: 0.5 }}>{r.emoji} {r.rarityLabel}</span>
        </div>
      </div>

      {/* Toast */}
      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: `translateX(-50%) translateY(${showToast ? '0' : '20px'})`,
          opacity: showToast ? 1 : 0,
          transition: 'opacity 0.3s, transform 0.3s',
          background: 'rgba(16,185,129,0.95)',
          color: '#fff',
          fontWeight: 700,
          padding: '10px 24px',
          borderRadius: '100px',
          fontSize: '0.875rem',
          zIndex: 999,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {toastMsg}
      </div>
    </main>
  );
}
