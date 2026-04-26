import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { normalizeLang, withLang, pickLocalized, markPlaceholder } from '@/lib/i18n';
import { getTours } from '@/lib/sanity';
import { buildBreadcrumbJsonLd, buildItemListJsonLd, buildLocalizedAlternates, toAbsoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

export async function generateMetadata({ searchParams }: { searchParams: SearchParamsInput }): Promise<Metadata> {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const title = lang === 'zh' ? '路线案例 | 无限旅途' : 'Route Cases | Infinite Travel';
  const description = lang === 'zh'
    ? '中国定制旅行路线案例。先选择最接近的路线起点，再根据日期、节奏、人数、酒店与服务范围调整后报价。'
    : 'Reference route cases for custom China travel. Choose the closest starting point, then adjust dates, pace, group size, hotels and service scope before quotation.';
  const alternates = buildLocalizedAlternates('/tours', lang);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(alternates.canonical),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ToursPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const isZh = lang === 'zh';
  const tours = dedupeTours(await getTours());
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: isZh ? '首页' : 'Home', url: withLang('/', lang) },
    { name: isZh ? '路线案例' : 'Route Cases', url: withLang('/tours', lang) },
  ]);
  const tourListJsonLd = buildItemListJsonLd(isZh ? '路线案例' : 'Route Cases', tours.map((tour: any) => ({
    name: markPlaceholder(pickLocalized(tour.title, lang) || (lang === 'zh' ? '案例路线' : 'Tour Package')),
    description: markPlaceholder(pickLocalized(tour.description, lang) || pickLocalized(tour.tagline, lang) || (lang === 'zh' ? '可进一步定制的中国旅行案例。' : 'A China travel case that can be further customized.')),
    url: withLang(`/tours/${encodeURIComponent(tour.slug || '')}`, lang),
  })));

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <JsonLd id="tours-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <JsonLd id="tours-itemlist-jsonld" data={tourListJsonLd} />
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{isZh ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{isZh ? '可定制路线参考' : 'Route Cases You Can Start From'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{isZh ? '这页不是让你直接照搬固定产品，而是先看一条接近你需求的路线参考。它更适合“先看路线组合，再改成自己版本”的旅行方式。' : 'This page is not for copying a fixed package. It is for starting with a route case that feels close to what you want, then adapting it into your own version.'}</p>

      <section className="mt-10 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f6f8fc)] p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)] md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{isZh ? '先找一条接近的路线参考' : 'Start with a route case that feels close'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{isZh ? '不用一开始就完全定稿，先找到一条在节奏、城市组合或旅行风格上接近你的参考版本。' : 'You do not need a final decision at the start. First find a route case that is close in pace, city combination, or travel style.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{isZh ? '再判断它哪里需要改' : 'Then decide what should change'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{isZh ? '看完详情后，你可以更容易判断哪些部分适合保留，哪些部分应该按你的时间、人数和预算调整。' : 'After reading the details, it becomes easier to judge what should stay and what should change around your dates, group size, and budget.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{isZh ? '最后把参考版本收成成交版本' : 'Then turn the reference into your version'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{isZh ? '当你找到最接近的一条路线后，把需求发给我们，我们会继续把它收成更适合你的正式方案。' : 'Once you find the closest route case, send us your requirements and we can turn it into a clearer, traveler-ready version.'}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.05)] md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{isZh ? '怎么选路线' : 'How to Choose'}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--color-navy)] md:text-3xl">{isZh ? '不用先选“最完美”的，只要选“最接近”的。' : 'Do not look for the perfect route first. Choose the closest one.'}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{isZh ? '路线案例只是起点。真正的版本会根据你的日期、人数、预算、体力、酒店偏好和想看的内容继续调整。' : 'Route cases are starting points. The final version is adjusted around your dates, group size, budget, stamina, hotel preference, and what you care about most.'}</p>
          </div>
          <div className="grid flex-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[1.25rem] bg-[var(--color-soft-white)] p-4 text-sm leading-7 text-[var(--color-slate)]">
              <p className="font-semibold text-[var(--color-navy)]">{isZh ? '首次来华' : 'First China trip'}</p>
              <p className="mt-2">{isZh ? '优先看北京 / 西安 / 上海这类经典城市组合。' : 'Start with Beijing / Xi’an / Shanghai style classic city combinations.'}</p>
            </div>
            <div className="rounded-[1.25rem] bg-[var(--color-soft-white)] p-4 text-sm leading-7 text-[var(--color-slate)]">
              <p className="font-semibold text-[var(--color-navy)]">{isZh ? '风景优先' : 'Scenery first'}</p>
              <p className="mt-2">{isZh ? '优先看新疆、云南、桂林、张家界这类自然风景线。' : 'Look at Xinjiang, Yunnan, Guilin, or Zhangjiajie-style scenic routes.'}</p>
            </div>
            <div className="rounded-[1.25rem] bg-[var(--color-soft-white)] p-4 text-sm leading-7 text-[var(--color-slate)]">
              <p className="font-semibold text-[var(--color-navy)]">{isZh ? '轻松舒适' : 'Slower comfort'}</p>
              <p className="mt-2">{isZh ? '优先选择城市少、停留长、车程密度低的版本。' : 'Choose fewer cities, longer stays, and lower transfer density.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {tours.map((tour: any) => {
          const title = markPlaceholder(pickLocalized(tour.title, lang) || (lang === 'zh' ? '案例路线' : 'Tour Package'));
          const description = markPlaceholder(pickLocalized(tour.description, lang) || pickLocalized(tour.tagline, lang) || (lang === 'zh' ? '可进一步定制的中国旅行案例。' : 'A China travel case that can be further customized.'));
          const audience = markPlaceholder(pickLocalized(tour.idealFor, lang) || '');
          const durationLabel = tour?.duration ? `${tour.duration} ${lang === 'zh' ? '天' : 'days'}` : '';
          const travelStyle = markPlaceholder(pickLocalized(tour.travelStyle, lang) || (lang === 'zh' ? '可定制参考线路' : 'Customizable route reference'));
          const planningLogic = markPlaceholder(pickLocalized(tour.howToUse, lang) || (lang === 'zh' ? '先把这条线路当作方向参考，再按你的日期、人数、预算和偏好继续收束。' : 'Use this as a starting direction first, then tighten it around your dates, group size, budget and preferences.'));
          return (
            <article key={tour._id} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(10,27,52,0.1)]">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {durationLabel ? <span className="rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] px-3 py-1.5">{durationLabel}</span> : null}
                <span className="rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] px-3 py-1.5">{travelStyle}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--color-navy)]">{title}</h2>
              <p className="mt-3 text-[var(--color-muted)] leading-7 line-clamp-4">{description}</p>
              <div className="mt-5 rounded-[1.25rem] bg-[var(--color-soft-white)] p-4 text-sm leading-7 text-[var(--color-slate)]">
                <p>
                  <span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '适合：' : 'Best for: '}</span>
                  {audience || (lang === 'zh' ? '首次来华旅客、情侣、家庭、小团或想先找一条可比较方向的游客。' : 'First-time China visitors, couples, families, private groups and travelers who want a route direction they can compare first.')}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '这类线路怎么用：' : 'How to use this case: '}</span>
                  {planningLogic}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '可以调整：' : 'You can adjust: '}</span>
                  {lang === 'zh' ? '城市顺序、天数、节奏、酒店标准、活动密度和自由活动时间。' : 'City order, trip length, pace, hotel level, activity density, and free time.'}
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link href={withLang(`/tours/${encodeURIComponent(tour.slug || '')}`, lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '看这个方案怎么做' : 'See How This Route Works'}
                </Link>
                <Link href={withLang('/contact#inquiry-form', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '提交咨询' : 'Submit an Inquiry'}
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-16 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8 md:p-10">
        <h2 className="text-2xl font-semibold text-[var(--color-navy)] md:text-3xl">{isZh ? '还不确定哪条更接近你？' : 'Not sure which route is closest yet?'}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{isZh ? '直接告诉我们你最想去的城市、出行时间、人数和预算，我们会先帮你判断哪条路线参考更适合，再继续往你的版本收。' : 'Tell us the cities you care about most, your travel dates, group size, and budget, and we can help you decide which route case is the best starting point before refining it further.'}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={withLang('/contact#inquiry-form', lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
            {isZh ? '按路线参考发起咨询' : 'Start from a Route Case'}
          </Link>
          <Link href={withLang('/', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
            {lang === 'zh' ? '回首页继续看' : 'Back to Home'}
          </Link>
        </div>
      </section>
    </main>
  );
}

function dedupeTours(tours: any[]) {
  const map = new Map<string, any>();

  for (const tour of Array.isArray(tours) ? tours : []) {
    const key = String(tour?.slug || '').trim().toLowerCase() || String(tour?._id || '');
    if (!key) continue;

    const existing = map.get(key);
    if (!existing) {
      map.set(key, tour);
      continue;
    }

    const existingScore = tourCompletenessScore(existing);
    const incomingScore = tourCompletenessScore(tour);
    if (incomingScore > existingScore) {
      map.set(key, tour);
    }
  }

  return Array.from(map.values());
}

function tourCompletenessScore(tour: any) {
  let score = 0;
  if (pickLocalized(tour?.description, 'en') || pickLocalized(tour?.description, 'zh')) score += 4;
  if (pickLocalized(tour?.tagline, 'en') || pickLocalized(tour?.tagline, 'zh')) score += 2;
  if (pickLocalized(tour?.idealFor, 'en') || pickLocalized(tour?.idealFor, 'zh')) score += 2;
  if (Array.isArray(tour?.highlights) && tour.highlights.length > 0) score += 2;
  if (Array.isArray(tour?.itinerary) && tour.itinerary.length > 0) score += 3;
  if (tour?.image) score += 1;
  if (tour?.duration) score += 1;
  if (typeof tour?.order === 'number') score += 1;
  return score;
}
