'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

// Deterministic bar values per result type (avoids random re-renders)
const BASE_SCORES: Record<ResultKey, Record<ResultKey, number>> = {
  sim:      { sim: 88, parallel: 32, brain: 25, loop: 40, free: 12, observer: 15, bug: 8 },
  parallel: { sim: 30, parallel: 85, brain: 22, loop: 35, free: 20, observer: 28, bug: 12 },
  brain:    { sim: 25, parallel: 20, brain: 90, loop: 30, free: 18, observer: 35, bug: 10 },
  loop:     { sim: 45, parallel: 28, brain: 32, loop: 87, free: 15, observer: 20, bug: 15 },
  free:     { sim: 12, parallel: 25, brain: 20, loop: 18, free: 89, observer: 65, bug: 8 },
  observer: { sim: 18, parallel: 35, brain: 45, loop: 22, free: 60, observer: 91, bug: 20 },
  bug:      { sim: 38, parallel: 42, brain: 40, loop: 38, free: 35, observer: 38, bug: 95 },
};

interface Props {
  active: boolean;
  resultKey: ResultKey;
  onRestart: () => void;
}

export default function ResultScreen({ active, resultKey, onRestart }: Props) {
  const r = RESULTS[resultKey];
  const imageCardRef = useRef<HTMLDivElement>(null);
  const [barsVisible, setBarsVisible] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setBarsVisible(true), 400);
      return () => clearTimeout(t);
    } else {
      setBarsVisible(false);
    }
  }, [active]);

  const barData = useMemo(() => {
    const scores = BASE_SCORES[resultKey];
    return (Object.entries(scores) as [ResultKey, number][])
      .sort((a, b) => b[1] - a[1]);
  }, [resultKey]);

  function showToast(msg: string) {
    setToastMsg(msg);
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2800);
  }

  async function handleShare() {
    setSharing(true);
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultKey }),
      });
      if (!res.ok) throw new Error('Share API error');
      const { id } = await res.json();
      const url = `${window.location.origin}/share/${id}`;
      await navigator.clipboard.writeText(url);
      showToast('🔗 링크 복사됨! (3시간 유효)');
    } catch {
      showToast('공유 링크 생성 실패. 다시 시도해주세요.');
    } finally {
      setSharing(false);
    }
  }

  async function handleSaveImage() {
    setSaving(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const card = imageCardRef.current;
      if (!card) return;

      // Move card into viewport but behind all content so html2canvas can render it
      card.style.left = '0px';
      card.style.zIndex = '-1';
      await new Promise((resolve) => setTimeout(resolve, 80));

      const canvas = await html2canvas(card, {
        backgroundColor: '#020817',
        scale: 2,
        logging: false,
        useCORS: true,
      });

      card.style.left = '-9999px';
      card.style.zIndex = '9999';

      const link = document.createElement('a');
      link.download = `am-i-real-${resultKey}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('🖼 이미지 저장 완료!');
    } catch {
      showToast('이미지 저장 실패. 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  }

  const rarityClass = `rarity-${r.rarity}`;

  return (
    <>
      <div className={`screen-wrap screen-scroll ${active ? 'visible' : 'hidden-down'}`}>
        <div className="glass-card w-full max-w-2xl p-8 sm:p-10">
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

          {/* Score spectrum */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 mb-6">
            <p className="text-xs text-star-400/50 uppercase tracking-wider mb-4">존재 유형 스펙트럼</p>
            <div className="space-y-3">
              {barData.map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-xs text-star-400/60 w-20 shrink-0">{SCORE_LABELS[key]}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: SCORE_COLORS[key],
                        width: barsVisible ? `${value}%` : '0%',
                        transition: `width 1s ease ${barData.findIndex(([k]) => k === key) * 0.08}s`,
                        opacity: key === resultKey ? 1 : 0.45,
                      }}
                    />
                  </div>
                  <span className="text-xs text-star-400/40 w-8 text-right">{value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            {/* Share link */}
            <button
              onClick={handleShare}
              disabled={sharing}
              className="flex-1 min-w-[140px] py-3 rounded-full font-bold text-sm bg-gradient-to-r from-star-600 to-nebula-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-star-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sharing ? '생성 중...' : '🔗 링크 공유'}
            </button>

            {/* Save image */}
            <button
              onClick={handleSaveImage}
              disabled={saving}
              className="flex-1 min-w-[120px] py-3 rounded-full font-bold text-sm border border-star-500/30 text-star-400 hover:border-star-400 hover:text-star-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '저장 중...' : '🖼 이미지 저장'}
            </button>

            {/* Restart */}
            <button
              onClick={onRestart}
              className="py-3 px-5 rounded-full font-bold text-sm border border-white/10 text-star-400/50 hover:border-white/20 hover:text-star-400/80 transition-all"
            >
              ↩
            </button>
          </div>
        </div>
      </div>

      {/* ── Off-screen card for image capture ── */}
      {active && (
        <div
          ref={imageCardRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: '-9999px',
            width: '600px',
            background: '#020817',
            padding: '44px',
            borderRadius: '20px',
            border: `2px solid ${r.color}40`,
            boxShadow: `0 0 80px ${r.color}18`,
            color: '#f0f9ff',
            fontFamily: 'system-ui, sans-serif',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {/* Top accent bar */}
          <div style={{ width: '100%', height: '3px', background: `linear-gradient(90deg, ${r.color}, transparent)`, borderRadius: '3px', marginBottom: '32px' }} />

          {/* Rarity */}
          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: r.color, marginBottom: '24px', opacity: 0.8 }}>
            {r.rarityLabel} · {r.type}
          </div>

          {/* Emoji + Title */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '64px', marginBottom: '12px' }}>{r.emoji}</div>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: r.color, margin: '0 0 8px' }}>{r.title}</h2>
            <p style={{ fontSize: '13px', color: '#7dd3fc', opacity: 0.7, margin: 0 }}>{r.shortDesc}</p>
          </div>

          {/* Description */}
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#bae6fd', opacity: 0.8, marginBottom: '20px' }}>{r.desc}</p>

          {/* Quote */}
          <div style={{ borderLeft: `3px solid ${r.color}`, padding: '12px 16px', marginBottom: '24px', background: `${r.color}12`, borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontSize: '12px', fontStyle: 'italic', color: r.color, marginBottom: '4px' }}>"{r.quote}"</p>
            <p style={{ fontSize: '11px', color: r.color, opacity: 0.6, margin: 0 }}>{r.quoteAuthor}</p>
          </div>

          {/* Stats 2×2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {r.stats.map((s) => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '10px', color: '#7dd3fc', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Spectrum bars */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '10px', color: '#7dd3fc', opacity: 0.45, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>존재 유형 스펙트럼</div>
            {barData.map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
                <span style={{ fontSize: '11px', color: '#7dd3fc', opacity: 0.55, width: '60px', flexShrink: 0 }}>{SCORE_LABELS[key]}</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${value}%`, background: SCORE_COLORS[key], borderRadius: '100px', opacity: key === resultKey ? 1 : 0.38 }} />
                </div>
                <span style={{ fontSize: '10px', color: '#7dd3fc', opacity: 0.38, width: '28px', textAlign: 'right' }}>{value}%</span>
              </div>
            ))}
          </div>

          {/* Watermark */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#7dd3fc', opacity: 0.35 }}>나는 진짜인가? | Am I Real?</span>
            <span style={{ fontSize: '11px', color: r.color, opacity: 0.5 }}>{r.emoji} {r.rarityLabel}</span>
          </div>
        </div>
      )}
    </>
  );
}
