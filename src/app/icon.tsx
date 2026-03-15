import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '6px',
        }}
      >
        {/* Gradient ring */}
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #f97316 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner dark circle */}
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#020817',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              fontSize: '13px',
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
