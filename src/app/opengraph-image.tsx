import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020817',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'rgba(14,165,233,0.15)',
            top: '-200px',
            left: '-200px',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(249,115,22,0.12)',
            bottom: '-150px',
            right: '-150px',
            filter: 'blur(80px)',
          }}
        />

        {/* Logo ring */}
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #f97316 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            boxShadow: '0 0 60px rgba(14,165,233,0.35)',
          }}
        >
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: '#020817',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              fontSize: '48px',
              fontWeight: 900,
            }}
          >
            ?
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 900,
            color: '#f0f9ff',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          나는 진짜인가?
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: '#7dd3fc',
            opacity: 0.7,
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          Am I Real?
        </div>

        {/* Description chips */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['시뮬레이션 이론', '평행우주', '통속의 뇌', '자유의지'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(14,165,233,0.12)',
                border: '1px solid rgba(14,165,233,0.3)',
                borderRadius: '100px',
                padding: '8px 20px',
                fontSize: '20px',
                color: '#38bdf8',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '18px',
            color: '#7dd3fc',
            opacity: 0.45,
          }}
        >
          8가지 철학적 질문 · 7가지 결과 유형
        </div>
      </div>
    ),
    { ...size }
  );
}
