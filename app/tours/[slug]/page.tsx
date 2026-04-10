import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTourBySlug, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { getFeaturedCaseCopy } from '@/lib/featuredCases';
import { normalizeLang, pickLocalized, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const CONTACT_EMAIL = 'contact@infinitravel.net';
const WECHAT_ID = '待补充';

function text(value: any, lang: 'en' | 'zh', fallback = '') {
  return markPlaceholder(pickLocalized(value, lang) || fallback);
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';

  if (!tour) {
    return {
      title: lang === 'zh' ? `路线未找到 - ${siteTitle}` : `Tour Not Found - ${siteTitle}`,
    };
  }

  return {
    title: `${text(tour.title, lang, lang === 'zh' ? '案例详情' : 'Tour Details')} - ${siteTitle}`,
    description: text(tour.description, lang, lang === 'zh' ? '中国高端定制旅行案例参考。' : 'A premium China travel inspiration case.'),
  };
}

export default async function TourDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const lang = normalizeLang((await searchParams)?.lang);

  if (!tour) notFound();

  const fallback = getFeaturedCaseCopy(String(tour.slug || slug), lang);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const title = text(tour.title, lang, lang === 'zh' ? '案例标题待补充' : 'Case title coming soon');
  const tagline = text(tour.tagline, lang, fallback.style);
  const description = text(tour.description, lang, fallback.overview);
  const idealFor = text(tour.idealFor, lang, fallback.audience);
  const travelStyle = text(tour.travelStyle, lang, fallback.style);
  const howToUse = text(tour.howToUse, lang, fallback.cta);
  const bestTime = text(
    tour.bestTime,
    lang,
    lang === 'zh'
      ? '春秋通常更适合出行；如果是新疆等长线目的地，建议按具体线路与景观季节选择月份。'
      : 'Spring and autumn usually work best; for long scenic regions like Xinjiang, the ideal month depends on the exact route.'
  );
  const extensions = text(
    tour.extensions,
    lang,
    lang === 'zh'
      ? '可以继续延展成更多城市组合版本，也可以压缩成更短、更好成交的轻量版案例。'
      : 'This case can be extended into broader multi-city combinations or compressed into a shorter, more conversion-friendly version.'
  );

  const highlights = Array.isArray(tour.highlights) && tour.highlights.length
    ? tour.highlights.map((item: any) => text(item, lang)).filter(Boolean)
    : fallback.highlights;

  const itinerary = Array.isArray(tour.itinerary) && tour.itinerary.length
    ? tour.itinerary.map((day: any, index: number) => ({
        day: day?.day || index + 1,
        title: text(day?.title, lang, lang === 'zh' ? '行程标题待补充' : 'Itinerary title coming soon'),
        description: text(day?.description, lang, lang === 'zh' ? '行程描述待补充' : 'Itinerary description coming soon'),
      }))
    : fallback.itinerary.map((day: any, index: number) => ({ day: index + 1, ...day }));

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
            <Link href={withLang('/tours', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '旅游线路' : 'Tours'}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '联系我们' : 'Contact'}</Link>
          </div>
        </div>
      </nav>

      <section className="relative mt-16 h-[52vh] overflow-hidden">
        <Image src={imageUrlFor(tour.image, 1600, fallbackImages.tour)} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.82),rgba(4,10,18,0.24),rgba(4,10,18,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10 text-white">
          <Link href={withLang('/tours', lang)} className="inline-flex rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:bg-white/10">
            {lang === 'zh' ? '← 返回线路' : '← Back to Tours'}
          </Link>
          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/88 md:text-xl">{tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-white">
            {!!tour.duration && <span className="rounded-full bg-white/14 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em]">{tour.duration} {lang === 'zh' ? '天' : 'Days'}</span>}
            {!!tour.price && <span className="text-3xl font-semibold">${tour.price}</span>}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <SectionCard title={lang === 'zh' ? '路线概览' : 'Overview'}>
              <p className="text-base leading-8 text-[var(--color-muted)] md:text-lg whitespace-pre-line">{description}</p>
            </SectionCard>

            <div className="grid gap-6 md:grid-cols-3">
              <MiniCard title={lang === 'zh' ? '适合人群' : 'Ideal For'} value={idealFor} />
              <MiniCard title={lang === 'zh' ? '旅行风格' : 'Travel Style'} value={travelStyle} />
              <MiniCard title={lang === 'zh' ? '页面用途' : 'How To Use'} value={howToUse} />
            </div>

            <SectionCard title={lang === 'zh' ? '核心亮点' : 'Highlights'} soft>
              <ul className="space-y-4">
                {highlights.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--color-slate)]">
                    <span className="mt-1 text-[var(--color-navy)]">✦</span>
                    <span className="leading-8">{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title={lang === 'zh' ? '行程安排' : 'Itinerary'}>
              <div className="space-y-6">
                {itinerary.map((day: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-sm font-semibold text-white">
                      {lang === 'zh' ? `第${day.day}天` : `Day ${day.day}`}
                    </div>
                    <div className="flex-1 border-b border-[rgba(10,27,52,0.08)] pb-6 last:border-b-0">
                      <h3 className="text-xl font-semibold text-[var(--color-navy)]">{day.title}</h3>
                      <p className="mt-2 leading-8 text-[var(--color-muted)] whitespace-pre-line">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <div className="grid gap-6 md:grid-cols-2">
              <MiniCard title={lang === 'zh' ? '最佳时间' : 'Best Time'} value={bestTime} />
              <MiniCard title={lang === 'zh' ? '可延展方向' : 'Extensions'} value={extensions} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7faff)] p-8 shadow-[0_24px_60px_rgba(10,27,52,0.08)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '参考信息' : 'Reference Info'}</p>
              <div className="mt-5 space-y-4 border-y border-[rgba(10,27,52,0.08)] py-5 text-sm text-[var(--color-slate)]">
                <InfoRow label={lang === 'zh' ? '时长' : 'Duration'} value={tour.duration ? `${tour.duration} ${lang === 'zh' ? '天' : 'Days'}` : (lang === 'zh' ? '待补充' : 'Coming soon')} />
                <InfoRow label={lang === 'zh' ? '参考预算' : 'Reference Budget'} value={tour.price ? `$${tour.price}` : (lang === 'zh' ? '待补充' : 'Coming soon')} />
                <InfoRow label={lang === 'zh' ? '联系邮箱' : 'Email'} value={CONTACT_EMAIL} />
                <InfoRow label="WeChat" value={WECHAT_ID} />
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                {lang === 'zh'
                  ? '这类页面更适合作为案例参考和成交辅助，不必把它理解成唯一固定产品。你可以先用一条标准案例打样，再复制成更多可售卖版本。'
                  : 'This type of page works best as a reference case and conversion aid rather than a single rigid product. Build one strong standard case first, then duplicate it into more sellable versions.'}
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '咨询这个方向' : 'Discuss This Itinerary'}
                </a>
                <Link href={withLang('/tours', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '返回线路列表' : 'Back to Tours'}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function SectionCard({ title, children, soft = false }: { title: string; children: React.ReactNode; soft?: boolean }) {
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="font-semibold text-[var(--color-navy)] break-all text-right">{value}</span>
    </div>
  );
}
