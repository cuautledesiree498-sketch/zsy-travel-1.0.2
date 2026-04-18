import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getDestinationFallbackImage } from '@/lib/sanity';
import { getDestinationContent } from '@/lib/destinationContent';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lang = normalizeLang((await searchParams)?.lang);
  const meta = getDestinationContent(slug);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const displayName = meta?.name?.[lang] || slug;
  const title = meta ? (lang === 'zh' ? `${displayName} 目的地详情 - ${siteTitle}` : `${displayName} Destination - ${siteTitle}`) : (lang === 'zh' ? `目的地详情 - ${siteTitle}` : `Destination Details - ${siteTitle}`);
  const description = meta ? meta.summary[lang] : (lang === 'zh' ? '中国定制旅行目的地详情。' : 'Destination details for tailor-made China travel.');

  return { title, description };
}

export default async function DestinationDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const lang = normalizeLang((await searchParams)?.lang);
  const meta = getDestinationContent(slug);
  const displayName = meta?.name?.[lang] || slug;
  const name = displayName;
  const titleLabel = meta ? (lang === 'zh' ? `${displayName} / 目的地详情` : `${displayName} / Destination`) : (lang === 'zh' ? '中国目的地' : 'China Destination');
  const summary = meta?.summary[lang] || (lang === 'zh' ? '这个目的地页面目前使用最小稳定模板，先保证可访问。' : 'This destination page currently uses a minimal stable template so it stays accessible.');
  const audience = meta?.audience[lang] || (lang === 'zh' ? '适合先按风格和节奏理解这条线路的人群。' : 'Suitable for travelers who want to judge the route by style and pace first.');
  const bestSeason = meta?.bestSeason[lang] || (lang === 'zh' ? '最佳时间会因季节和天气而变化。' : 'The best time depends on season and weather.');
  const stay = meta?.stay[lang] || (lang === 'zh' ? '可按整条中国路线灵活安排。' : 'Can be arranged flexibly within the wider China route.');
  const introLine = lang === 'zh'
    ? `如果你考虑把 ${displayName} 放进整条中国路线里，我们不会只把它当成一个景点，而会把它放回整段旅程的节奏、风格和情绪曲线里去看。`
    : `If you are considering ${displayName} inside a wider China itinerary, we do not treat it as an isolated stop — we place it back into the rhythm, style and emotional arc of the whole journey.`;
  const valueLine = lang === 'zh'
    ? '真正的定制，不是简单决定“去哪里”，而是判断它适合放在开场、中段、收尾，还是作为整条路线里最有记忆点的一章。'
    : 'Real custom planning is not just deciding where to go — it is deciding whether a place belongs at the opening, in the middle, at the close, or as the most memorable chapter of the route.';
  const consultLine = lang === 'zh'
    ? '如果你已经有出行日期、人数、预算，或者更偏好的城市感、风景感、历史感与舒适度，我们可以按这些条件为你整理更完整的路线建议。'
    : 'If you already have dates, group size, budget, or a stronger preference for cities, scenery, heritage or comfort, we can shape those into a more complete route recommendation.';
  const highlights = meta?.highlights || [];
  const experiences = meta?.experiences || [];
  const samplePlan = meta?.samplePlan?.[lang] || [];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={withLang('/', lang)} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] text-lg text-[var(--color-navy)] shadow-sm">✦</span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-muted)]">{lang === 'en' ? 'Tailor-Made China Journeys' : '中国高端定制旅行'}</p>
              <h1 className="text-lg font-semibold tracking-[0.04em] text-[var(--color-navy)] md:text-xl">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</h1>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href={withLang('/destinations', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '目的地' : 'Destinations'}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '联系我们' : 'Contact'}</Link>
          </div>
        </div>
      </nav>

      <section className="relative mt-16 h-[54vh] overflow-hidden">
        <Image src={getDestinationFallbackImage(slug)} alt={name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.82),rgba(4,10,18,0.26),rgba(4,10,18,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10 text-white">
          <Link href={withLang('/destinations', lang)} className="inline-flex rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:bg-white/10">
            {lang === 'zh' ? '← 返回目的地' : '← Back to Destinations'}
          </Link>
          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] md:text-6xl">{titleLabel}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/88 md:text-xl">{summary}</p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Card title={lang === 'zh' ? '为什么这一站值得放进路线' : 'Why This Stop Works'}>
              <p className="text-base leading-8 text-[var(--color-muted)] md:text-lg whitespace-pre-line">{summary}</p>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              <MiniCard title={lang === 'zh' ? '适合的客人' : 'Best For'} value={audience} />
              <MiniCard title={lang === 'zh' ? '更适合的季节' : 'Best Season'} value={bestSeason} />
              <MiniCard title={lang === 'zh' ? '建议路线节奏' : 'Suggested Rhythm'} value={stay} />
            </div>

            <Card title={lang === 'zh' ? '它为整条旅程增加什么' : 'What It Adds To The Journey'} soft>
              {highlights.length > 0 ? (
                <ul className="space-y-4 text-[var(--color-muted)] leading-8">
                  {highlights.map((item, index) => (
                    <li key={index}>• {item[lang]}</li>
                  ))}
                </ul>
              ) : (
                <p className="leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '亮点内容后续补充。' : 'Highlights will be added later.'}</p>
              )}
            </Card>

            <Card title={lang === 'zh' ? '停留在这里会是什么感觉' : 'How The Stay Feels'}>
              {experiences.length > 0 ? (
                <ul className="space-y-4 text-[var(--color-muted)] leading-8">
                  {experiences.map((item, index) => (
                    <li key={index}>• {item[lang]}</li>
                  ))}
                </ul>
              ) : (
                <p className="leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '体验内容后续补充。' : 'Experience content will be added later.'}</p>
              )}
            </Card>

            <Card title={lang === 'zh' ? '它如何嵌入一条完整路线' : 'How It Fits Into A Wider Route'}>
              {samplePlan.length > 0 ? (
                <div className="space-y-5">
                  {samplePlan.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-[rgba(10,27,52,0.08)] bg-white p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '行程内容后续补充。' : 'Sample itinerary will be added later.'}</p>
              )}
            </Card>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7faff)] p-8 shadow-[0_24px_60px_rgba(10,27,52,0.08)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '定制路线建议' : 'Tailor-Made Route Note'}</p>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">{introLine}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{valueLine}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{consultLine}</p>
              <div className="mt-7 flex flex-col gap-3">
                <Link href={withLang('/contact', lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '开始定制你的路线' : 'Start Planning Your Journey'}
                </Link>
                <Link href={withLang('/destinations', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '返回目的地列表' : 'Back to Destinations'}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Card({ title, children, soft = false }: { title: string; children: React.ReactNode; soft?: boolean }) {
  return (
    <div className={`rounded-[2rem] border border-[rgba(10,27,52,0.08)] p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10 ${soft ? 'bg-[var(--color-soft-white)]' : 'bg-white'}`}>
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{title}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function MiniCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-6 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{title}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{value}</p>
    </div>
  );
}
