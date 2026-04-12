import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, imageUrlFor, getDestinationFallbackImage } from '@/lib/sanity';
import { normalizeLang, pickLocalized, withLang, markPlaceholder } from '@/lib/i18n';
import { getDestinationContent } from '@/lib/destinationContent';

export const dynamic = 'force-dynamic';

function text(value: any, lang: 'en' | 'zh', fallback = '') {
  return markPlaceholder(pickLocalized(value, lang) || fallback);
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';

  if (!destination) {
    return {
      title: lang === 'zh' ? `目的地未找到 - ${siteTitle}` : `Destination Not Found - ${siteTitle}`,
    };
  }

  return {
    title: `${text(destination.name, lang, lang === 'zh' ? '目的地详情' : 'Destination Details')} - ${siteTitle}`,
    description: text(destination.description, lang, lang === 'zh' ? '中国定制旅行目的地详情。' : 'Destination details for tailor-made China travel.'),
  };
}

export default async function DestinationDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  const lang = normalizeLang((await searchParams)?.lang);

  if (!destination) notFound();

  const name = text(destination.name, lang, lang === 'zh' ? '精选目的地' : 'Destination');
  const content = getDestinationContent(destination.slug);
  const tagline = markPlaceholder(pickLocalized(destination.tagline, lang) || '');
  const description = markPlaceholder(pickLocalized(destination.description, lang) || content?.summary?.[lang] || '');
  const idealFor = markPlaceholder(pickLocalized(destination.idealFor, lang) || content?.audience?.[lang] || '');
  const bestTime = markPlaceholder(pickLocalized(destination.bestTime, lang) || content?.bestSeason?.[lang] || '');
  const suggestedStay = markPlaceholder(pickLocalized(destination.suggestedStay, lang) || content?.stay?.[lang] || '');
  const highlights = Array.isArray(destination.highlights) && destination.highlights.length > 0
    ? destination.highlights.map((item: any) => text(item, lang)).filter(Boolean)
    : (content?.highlights?.map((item: any) => item?.[lang]).filter(Boolean) || []);
  const experiences = Array.isArray(destination.experiences) ? destination.experiences : [];
  const samplePlan = Array.isArray(destination.samplePlan) ? destination.samplePlan : [];
  const heroFacts = Array.isArray(destination.heroFacts) ? destination.heroFacts : [];
  const gallery = Array.isArray(destination.gallery) ? destination.gallery.filter(Boolean) : [];
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={withLang('/', lang)} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] text-lg text-[var(--color-navy)] shadow-sm">✦</span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-muted)]">{lang === 'en' ? 'Tailor-Made China Journeys' : '中国高端定制旅行'}</p>
              <h1 className="text-lg font-semibold tracking-[0.04em] text-[var(--color-navy)] md:text-xl">{siteTitle}</h1>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href={withLang('/destinations', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '目的地' : 'Destinations'}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '联系我们' : 'Contact'}</Link>
          </div>
        </div>
      </nav>

      <section className="relative mt-16 h-[54vh] overflow-hidden">
        <Image src={imageUrlFor(destination.image, 1600, getDestinationFallbackImage(destination.slug))} alt={name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.82),rgba(4,10,18,0.26),rgba(4,10,18,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10 text-white">
          <Link href={withLang('/destinations', lang)} className="inline-flex rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:bg-white/10">
            {lang === 'zh' ? '← 返回目的地' : '← Back to Destinations'}
          </Link>
          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] md:text-6xl">{name}</h2>
          {tagline ? <p className="mt-4 max-w-3xl text-lg leading-8 text-white/88 md:text-xl">{tagline}</p> : null}
          {heroFacts.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {heroFacts.slice(0, 4).map((item: any, index: number) => (
                <span key={index} className="rounded-full bg-white/14 px-4 py-2 text-sm font-semibold tracking-[0.08em]">
                  {text(item.label, lang)}: {text(item.value, lang)}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '目的地概览' : 'Overview'}</p>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)] md:text-lg whitespace-pre-line">{description || (lang === 'zh' ? '这个目的地页面已准备好展示结构，后续会继续补充更完整的亮点、体验与行程建议。' : 'This destination page is ready as a structured overview, with more highlights, experiences, and route suggestions to be added in future updates.')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <MiniCard title={lang === 'zh' ? '适合人群' : 'Ideal For'} value={idealFor || (lang === 'zh' ? '可按旅行方式、同行人群与出行节奏进一步细化。' : 'Can be tailored further by travel style, traveler profile, and preferred pace.')} />
              <MiniCard title={lang === 'zh' ? '最佳时间' : 'Best Time'} value={bestTime || (lang === 'zh' ? '可根据季节、气候和你想看的景观类型进一步建议。' : 'Best timing can be refined further based on season, climate, and the type of scenery you want to focus on.')} />
              <MiniCard title={lang === 'zh' ? '建议停留' : 'Suggested Stay'} value={suggestedStay || (lang === 'zh' ? '可根据行程长度与组合城市灵活调整。' : 'Length of stay can be adjusted flexibly based on your wider route and travel rhythm.')} />
            </div>

            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8 shadow-[0_18px_46px_rgba(10,27,52,0.05)] md:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '核心亮点' : 'Highlights'}</p>
              <ul className="mt-5 space-y-4">
                {(highlights.length ? highlights : [lang === 'zh' ? '后续可在此补充这个目的地最值得卖给游客的 3-5 个核心亮点。' : 'Core selling highlights for this destination can be expanded here in future updates.']).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--color-slate)]">
                    <span className="mt-1 text-[var(--color-navy)]">✦</span>
                    <span className="leading-8">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <SectionBlock
              title={lang === 'zh' ? '推荐体验' : 'Recommended Experiences'}
              items={experiences}
              lang={lang}
              emptyTitle={lang === 'zh' ? '后续可继续补充推荐体验模块。' : 'Recommended experience sections can be added here in future updates.'}
            />

            <SectionBlock
              title={lang === 'zh' ? '示例安排' : 'Sample Plan'}
              items={samplePlan}
              lang={lang}
              emptyTitle={lang === 'zh' ? '后续可继续补充示例行程安排。' : 'A fuller sample plan can be added here in future updates.'}
            />
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7faff)] p-8 shadow-[0_24px_60px_rgba(10,27,52,0.08)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '页面用途' : 'How to Use This Page'}</p>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                {lang === 'zh'
                  ? '这个详情页框架适合后台按目的地分别填充内容。你可以先做 1 个标准版本，确认结构满意后，再复制到更多目的地并分别补图、亮点、体验和示例安排。'
                  : 'This destination page is designed as a reusable CMS-driven template. Create one strong standard version first, then duplicate the structure across more destinations and customize the details.'}
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <Link href={withLang('/contact', lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '咨询这个目的地' : 'Ask About This Destination'}
                </Link>
                <Link href={withLang('/destinations', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '返回目的地列表' : 'Back to Destinations'}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-6 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '图集' : 'Gallery'}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {(gallery.length ? gallery.slice(0, 4) : [destination.image]).filter(Boolean).map((image: any, index: number) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[var(--color-soft-white)]">
                    <Image src={imageUrlFor(image, 900, getDestinationFallbackImage(destination.slug))} alt={`${name} ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
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

function SectionBlock({ title, items, lang, emptyTitle }: { title: string; items: any[]; lang: 'en' | 'zh'; emptyTitle: string }) {
  return (
    <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{title}</p>
      <div className="mt-6 space-y-6">
        {items.length > 0 ? items.map((item: any, index: number) => (
          <div key={index} className="border-b border-[rgba(10,27,52,0.08)] pb-6 last:border-b-0">
            <h3 className="text-xl font-semibold text-[var(--color-navy)]">{text(item.title, lang, emptyTitle)}</h3>
            <p className="mt-2 leading-8 text-[var(--color-muted)] whitespace-pre-line">{text(item.description, lang)}</p>
          </div>
        )) : (
          <div className="text-[var(--color-muted)] leading-8">{emptyTitle}</div>
        )}
      </div>
    </div>
  );
}
