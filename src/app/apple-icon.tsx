import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020817',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #f97316 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(14,165,233,0.4)',
          }}
        >
          {/* Inner dark circle */}
          <div
            style={{
              width: '108px',
              height: '108px',
              borderRadius: '50%',
              background: '#020817',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              fontSize: '68px',
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            ?
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
