import type { Metadata } from 'next';
import { getShare, getRemainingMs } from '@/lib/shareStore';
import { RESULTS } from '@/data/results';
import SharedResultView from '@/components/SharedResultView';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// ── Dynamic OG metadata per share ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const share = getShare(params.id);

  if (!share) {
    return {
      title: '만료된 결과',
      description: '이 공유 링크는 만료되었습니다. 직접 진단받아 보세요.',
      robots: { index: false, follow: false },
    };
  }

  const r = RESULTS[share.resultKey];
  const title = `${r.emoji} ${r.title}`;
  const description = `${r.shortDesc} — ${r.desc.slice(0, 80)}...`;
  const pageUrl = `${SITE_URL}/share/${params.id}`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    // Shared result pages should not appear in search results
    robots: { index: false, follow: false },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: pageUrl,
      siteName: '나는 진짜인가?',
      title: `${title} | 나는 진짜인가?`,
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${r.title} — 나는 진짜인가?`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | 나는 진짜인가?`,
      description,
      images: ['/og-image.png'],
    },
  };
}

// ── Page component ──────────────────────────────────────────────────────────
export default function SharePage({ params }: { params: { id: string } }) {
  const share = getShare(params.id);

  if (!share) {
    return (
      <main className="relative w-full h-screen overflow-hidden bg-space-950 flex items-center justify-center p-6">
        <div
          className="nebula-blob"
          style={{ width: 400, height: 400, background: 'rgba(249,115,22,0.12)', top: -80, left: -80 }}
        />
        <div
          className="nebula-blob"
          style={{ width: 350, height: 350, background: 'rgba(14,165,233,0.10)', bottom: -60, right: -60, animationDelay: '-3s' }}
        />

        <div className="glass-card w-full max-w-md p-10 text-center relative z-10">
          <div className="text-5xl mb-6">🕳️</div>
          <h1 className="text-2xl font-extrabold text-white mb-3">
            링크가 만료되었습니다
          </h1>
          <p className="text-star-300/60 text-sm leading-relaxed mb-8">
            공유 링크는 생성 후 3시간 동안만 유효합니다.
            <br />
            직접 진단받아 보시겠어요?
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-star-600 to-nebula-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-star-500/25 transition-all"
          >
            ✦ 나도 진단받기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <SharedResultView
      resultKey={share.resultKey}
      remainingMs={getRemainingMs(params.id)}
    />
  );
}
