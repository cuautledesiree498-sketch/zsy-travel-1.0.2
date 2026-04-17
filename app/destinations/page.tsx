import type { Metadata } from 'next';
import Link from 'next/link';
import { getDestinations } from '@/lib/sanity';
import { normalizeLang, pickLocalized, withLang, markPlaceholder } from '@/lib/i18n';
import { getDestinationContent } from '@/lib/destinationContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Destinations - Infinite Travel',
  description: 'Explore the key China destinations curated by Infinite Travel, including Beijing, Shanghai, Xinjiang and more.',
};

export default async function DestinationsPage({ searchParams }: any) {
  const lang = normalizeLang(searchParams?.lang);
  const destinations = dedupeDestinations(await getDestinations());

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '中国热门目的地' : 'China Destinations to Explore'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '如果你已经知道想看城市、古都、山水还是长线风景，可以先从这里选一个最接近你想法的目的地，再继续细化行程。' : 'If you already know you want cities, heritage, scenery or a longer route, start with the destination closest to your idea and refine the itinerary from there.'}</p>

      <section className="mt-10 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f6f8fc)] p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)] md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '先选一个目的地' : 'Choose one destination first'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '先从最接近你偏好的城市或地区开始，不需要一次选完。' : 'Start with the city or region closest to your preference. You do not need to decide everything at once.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '再补充需求' : 'Then add your details'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '把日期、人数、预算和偏好告诉我们，我们会继续细化。' : 'Share your dates, group size, budget and preferences, and we will refine from there.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '最后变成路线' : 'Turn it into a route'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '把一个目的地想法整理成真正可执行、可比较、可预订的旅行方案。' : 'Turn a destination idea into a route that is practical, comparable and ready to book.'}</p>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.length > 0 ? destinations.map((item: any) => {
          const meta = getDestinationContent(item.slug);
          const title = markPlaceholder(pickLocalized(item.name, lang) || '');
          const desc = markPlaceholder(
            pickLocalized(item.description, lang)
            || pickLocalized(item.tagline, lang)
            || meta?.summary?.[lang]
            || ''
          );
          const audience = meta?.audience?.[lang];
          const stay = meta?.stay?.[lang];
          return (
            <article key={item._id} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{title || (lang === 'zh' ? '精选目的地' : 'Destination')}</h2>
              {desc ? (
                <p className="mt-3 line-clamp-4 text-[var(--color-muted)] leading-7">{desc}</p>
              ) : (
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{lang === 'zh' ? '可进入详情页查看该目的地的旅行亮点与行程建议。' : 'Open the detail page to explore highlights and travel suggestions for this destination.'}</p>
              )}
              {(audience || stay) && (
                <div className="mt-5 rounded-[1.25rem] bg-[var(--color-soft-white)] p-4 text-sm leading-7 text-[var(--color-slate)]">
                  {audience ? <p><span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '适合：' : 'Best for: '}</span>{audience}</p> : null}
                  {stay ? <p className="mt-2"><span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '建议停留：' : 'Recommended stay: '}</span>{stay}</p> : null}
                </div>
              )}
              <div className="mt-6 flex flex-col gap-3">
                <Link href={withLang(`/destinations/${encodeURIComponent(item.slug || '')}`, lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '看这个目的地适不适合你' : 'See If This Destination Fits You'}
                </Link>
                <Link href={withLang('/contact', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '按这个方向咨询' : 'Inquire About This Direction'}
                </Link>
              </div>
            </article>
          );
        }) : (
          <div className="col-span-full rounded-[2rem] border border-dashed border-[rgba(10,27,52,0.12)] bg-[var(--color-soft-white)] px-6 py-16 text-center text-[var(--color-muted)]">
            {lang === 'zh' ? '更多目的地会陆续上线。你也可以直接联系我们，按你想去的城市或风格来定制路线。' : 'More destinations will be added soon. You can also contact us directly to build a route around your target cities or travel style.'}
          </div>
        )}
      </section>

      <div className="mt-14">
        <Link href={withLang('/contact', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '直接咨询这个方向' : 'Inquire About This Direction'}
        </Link>
      </div>
    </main>
  );
}

function dedupeDestinations(destinations: any[]) {
  const map = new Map<string, any>();

  for (const destination of Array.isArray(destinations) ? destinations : []) {
    const key = String(destination?.slug || '').trim().toLowerCase() || String(destination?._id || '');
    if (!key) continue;

    const existing = map.get(key);
    if (!existing) {
      map.set(key, destination);
      continue;
    }

    const existingScore = destinationCompletenessScore(existing);
    const incomingScore = destinationCompletenessScore(destination);
    if (incomingScore > existingScore) {
      map.set(key, destination);
    }
  }

  return Array.from(map.values());
}

function destinationCompletenessScore(destination: any) {
  let score = 0;
  if (destination?.image) score += 3;
  if (pickLocalized(destination?.tagline, 'en') || pickLocalized(destination?.tagline, 'zh')) score += 2;
  if (pickLocalized(destination?.description, 'en') || pickLocalized(destination?.description, 'zh')) score += 4;
  if (Array.isArray(destination?.highlights) && destination.highlights.length > 0) score += 2;
  if (Array.isArray(destination?.heroFacts) && destination.heroFacts.length > 0) score += 1;
  if (typeof destination?.order === 'number') score += 1;
  return score;
}
