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
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '可定制线路参考' : 'China Trip Cases You Can Customize'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '这些不是只能照搬的固定产品，更适合作为你发起咨询时的参考版本。先挑一个最接近你需求的方向，再把出行时间、人数、预算和偏好发给我们，我们会继续往成交版本收。' : 'These are not rigid package tours. They work better as reference cases when you start an inquiry. Pick the route that is closest to your idea first, then share your dates, group size, budget and preferences so we can turn it into a sellable, traveler-ready plan.'}</p>

      <section className="mt-10 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f6f8fc)] p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)] md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '怎么用这些页面' : 'How to use these pages'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '先选最接近的路线方向，不需要一开始就完全匹配。' : 'Start with the closest route, not the perfect one.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '发什么信息给我们' : 'What to send us'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '日期、人数、想去的城市、旅行风格和大概预算。' : 'Your dates, group size, target cities, travel style and rough budget.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '下一步' : 'Next step'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '我们会把参考案例继续整理成更适合你的一版。' : 'We reshape the reference case into a version that fits you better.'}</p>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {tours.map((tour: any) => {
          const title = markPlaceholder(pickLocalized(tour.title, lang) || (lang === 'zh' ? '案例路线' : 'Tour Package'));
          const description = markPlaceholder(pickLocalized(tour.description, lang) || pickLocalized(tour.tagline, lang) || (lang === 'zh' ? '可进一步定制的中国旅行案例。' : 'A China travel case that can be further customized.'));
          const audience = markPlaceholder(pickLocalized(tour.idealFor, lang) || '');
          const durationLabel = tour?.duration ? `${tour.duration} ${lang === 'zh' ? '天' : 'days'}` : '';
          return (
            <article key={tour._id} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(10,27,52,0.1)]">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {durationLabel ? <span className="rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] px-3 py-1.5">{durationLabel}</span> : null}
                {audience ? <span className="rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] px-3 py-1.5">{audience}</span> : null}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--color-navy)]">{title}</h2>
              <p className="mt-3 text-[var(--color-muted)] leading-7 line-clamp-4">{description}</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href={withLang(`/tours/${encodeURIComponent(tour.slug || '')}`, lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '看这个方案怎么做' : 'See How This Route Works'}
                </Link>
                <Link href={withLang('/contact', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '按这个方向咨询' : 'Inquire With This Direction'}
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-16 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8 md:p-10">
        <h2 className="text-2xl font-semibold text-[var(--color-navy)] md:text-3xl">{lang === 'zh' ? '不知道先选哪条？' : 'Not sure which route to start with?'}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '没关系，直接把你想去的地方、预计出行时间、人数和预算告诉我们，我们会先帮你判断更适合走首访中国城市线、风景文化组合线，还是私人定制长线。' : 'That is fine. Just send us your target destinations, expected travel dates, group size and budget. We can help you decide whether you are better suited to a first-time China route, a scenery-plus-culture combination, or a longer private custom plan.'}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={withLang('/contact', lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
            {lang === 'zh' ? '发送行程需求' : 'Send Your Trip Request'}
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
