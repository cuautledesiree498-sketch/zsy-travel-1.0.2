import type { Metadata } from 'next';
import Link from 'next/link';
import { normalizeLang, withLang, pickLocalized, markPlaceholder } from '@/lib/i18n';
import { getTours } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tours - Infinite Travel',
  description: 'Featured tours and case references for tailor-made journeys across China.',
};

export default async function ToursPage({ searchParams }: any) {
  const lang = normalizeLang(searchParams?.lang);
  const tours = dedupeTours(await getTours());
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '案例参考' : 'Featured Tour Packages'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '从多城市深度游到主题路线，这里整理了可进一步定制的旅行案例。' : 'From multi-city journeys to thematic routes, here are the travel cases you can further customize.'}</p>

      <section className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {tours.map((tour: any) => {
          const title = markPlaceholder(pickLocalized(tour.title, lang) || (lang === 'zh' ? '案例路线' : 'Tour Package'));
          const description = markPlaceholder(pickLocalized(tour.description, lang) || pickLocalized(tour.tagline, lang) || (lang === 'zh' ? '可进一步定制的中国旅行案例。' : 'A China travel case that can be further customized.'));
          const audience = markPlaceholder(pickLocalized(tour.idealFor, lang) || '');
          const durationLabel = tour?.duration ? `${tour.duration} ${lang === 'zh' ? '天' : 'days'}` : '';
          return (
            <article key={tour._id} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {durationLabel ? <span className="rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] px-3 py-1.5">{durationLabel}</span> : null}
                {audience ? <span className="rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] px-3 py-1.5">{audience}</span> : null}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--color-navy)]">{title}</h2>
              <p className="mt-3 text-[var(--color-muted)] leading-7 line-clamp-4">{description}</p>
              <div className="mt-6">
                <Link href={withLang(`/tours/${encodeURIComponent(tour.slug || '')}`, lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
                  {lang === 'zh' ? '查看详情' : 'View Details'}
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <div className="mt-14">
        <Link href={withLang('/', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
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
