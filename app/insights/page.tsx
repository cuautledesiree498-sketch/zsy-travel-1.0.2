import type { Metadata } from 'next';
import Link from 'next/link';
import { withLang, normalizeLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang);
  return {
    title: lang === 'zh' ? '旅行灵感 - ZSY Travel' : 'Insights - ZSY Travel',
    description: lang === 'zh'
      ? '查看 ZSY Travel 的旅行灵感与中国定制旅行相关建议。'
      : 'Explore travel inspiration and planning insights for tailor-made journeys across China.',
  };
}

export default async function InsightsPage({ searchParams }: any) {
  const lang = normalizeLang((await searchParams)?.lang);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Link href={withLang('/', lang)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]">
          {isZh ? '← 返回首页' : '← Back to Home'}
        </Link>
        <h1 className="mt-6 text-5xl font-semibold text-[var(--color-navy)]">{isZh ? '旅行灵感与策划建议' : 'Travel Insights and Inspiration'}</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">
          {isZh
            ? '这里的内容用于帮助你了解目的地灵感、旅行规划思路，以及中国定制旅行可以如何展开。'
            : 'This section is designed to help you explore destination ideas, planning logic, and different ways a tailor-made journey across China can take shape.'}
        </p>
        <div className="mt-10 rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
          <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{isZh ? '当前说明' : 'Current Note'}</h2>
          <p className="mt-4 leading-8 text-[var(--color-muted)]">
            {isZh
              ? '当前页面先作为内容承接页，后续可继续接入真实文章、目的地灵感、规划建议与品牌内容。'
              : 'For now, this page serves as a structured entry point. It can later be expanded with real articles, destination inspiration, planning advice, and broader brand content.'}
          </p>
        </div>
      </div>
    </div>
  );
}
