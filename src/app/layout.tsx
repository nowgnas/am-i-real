import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://am-i-real-eight.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: '나는 진짜인가? | Am I Real?',
    template: '%s | 나는 진짜인가?',
  },
  description:
    '평행우주, 시뮬레이션 이론, 통속의 뇌, 자유의지 — 8가지 철학적 질문으로 당신이 어떤 우주에 존재하는지 진단합니다. 7가지 결과 유형 중 하나를 발견하세요.',
  keywords: [
    '나는 진짜인가',
    'Am I Real',
    '시뮬레이션 이론',
    '평행우주',
    '통속의 뇌',
    '자유의지',
    '철학 테스트',
    '우주 존재 진단',
    '인터랙티브 퀴즈',
    'simulation theory',
    'parallel universe',
    'free will',
  ],
  authors: [{ name: 'Am I Real?' }],
  creator: 'Am I Real?',
  publisher: 'Am I Real?',

  // Canonical URL
  alternates: {
    canonical: '/',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '나는 진짜인가?',
    title: '나는 진짜인가? | Am I Real?',
    description:
      '8가지 철학적 질문으로 당신이 어떤 우주에 존재하는지 진단합니다. 시뮬레이션 NPC부터 우주의 관찰자까지, 7가지 결과 유형이 당신을 기다립니다.',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: '나는 진짜인가? | Am I Real?',
    description:
      '평행우주, 시뮬레이션 이론, 통속의 뇌, 자유의지 — 당신은 어떤 우주에 존재하는가?',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons are auto-resolved from app/icon.tsx and app/apple-icon.tsx

  // Verification (replace with real values when deploying)
  // verification: {
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION',
  //   naver: 'YOUR_NAVER_SITE_VERIFICATION',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-R4EHEQXL4B" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R4EHEQXL4B');
            `,
          }}
        />
        {/* JSON-LD: WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '나는 진짜인가?',
              alternateName: 'Am I Real?',
              url: SITE_URL,
              description:
                '평행우주, 시뮬레이션 이론, 통속의 뇌, 자유의지 — 철학적 질문으로 당신의 존재를 진단하는 인터랙티브 서비스',
              inLanguage: 'ko',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
