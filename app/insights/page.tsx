import type { Metadata } from 'next';
import Link from 'next/link';
import { withLang, normalizeLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang);
  return {
    title: lang === 'zh' ? '旅行灵感 - Infinite Travel / 无限旅途' : 'Insights - Infinite Travel / 无限旅途',
    description: lang === 'zh'
      ? '查看 Infinite Travel / 无限旅途 的旅行灵感与中国定制旅行相关建议。'
      : 'Explore travel inspiration and planning insights for tailor-made journeys across China.',
  };
}

export default async function InsightsPage({ searchParams }: any) {
  const lang = normalizeLang((await searchParams)?.lang);
  const isZh = lang === 'zh';

  const cards = [
    {
      title: isZh ? '中国全景式路线' : 'Panoramic China Routes',
      desc: isZh
        ? '把北京、上海、深圳、重庆、成都、陕西、新疆等目的地组合成更完整的旅程。'
        : 'Combine Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi, Xinjiang, and other destinations into a more complete journey.',
    },
    {
      title: isZh ? '团队与研学设计' : 'Group and Educational Planning',
      desc: isZh
        ? '适合学校、机构、企业团队与其他有明确目标的人群。'
        : 'Well suited to schools, institutions, corporate groups, and other audiences with a clear purpose.',
    },
    {
      title: isZh ? '个人与家庭定制' : 'Private and Family Tailor-Made Trips',
      desc: isZh
        ? '围绕节奏、舒适度和体验感，为个人、情侣与家庭做更灵活的安排。'
        : 'Designed around pace, comfort, and overall experience for solo travelers, couples, and families.',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Link href={withLang('/', lang)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            {isZh ? '← 返回首页' : '← Back to Home'}
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">{isZh ? '灵感' : 'Insights'}</p>
          <h1 className="mt-4 text-5xl font-semibold text-[var(--color-navy)] md:text-7xl">{isZh ? '旅行灵感与策划建议' : 'Travel Insights and Inspiration'}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            {isZh
              ? '这里的内容用于帮助你了解目的地灵感、旅行规划思路，以及中国定制旅行可以如何展开。'
              : 'This section is designed to help you explore destination ideas, planning logic, and different ways a tailor-made journey across China can take shape.'}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
                <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{card.title}</h2>
                <p className="mt-4 leading-8 text-[var(--color-muted)]">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-10 text-white">
            <h3 className="text-2xl font-semibold">{isZh ? '当前说明' : 'Current Note'}</h3>
            <p className="mt-4 max-w-3xl leading-8 text-[rgba(255,255,255,0.82)]">
              {isZh
                ? '当前页面先作为内容承接页，后续可继续接入真实文章、目的地灵感、规划建议与品牌内容。'
                : 'For now, this page serves as a structured entry point. It can later be expanded with real articles, destination inspiration, planning advice, and broader brand content.'}
            </p>
            <div className="mt-8">
              <Link href={withLang('/contact', lang)} className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)]">
                {isZh ? '获取定制灵感' : 'Get Custom Inspiration'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
