import type { Metadata } from 'next';
import Link from 'next/link';
import { normalizeLang, withLang } from '@/lib/i18n';
import { getTours } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tours - Infinite Travel',
  description: 'Featured tours and case references for tailor-made journeys across China.',
};

export default async function ToursPage({ searchParams }: any) {
  const lang = normalizeLang(searchParams?.lang);
  const tours = await getTours();
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '案例参考' : 'Featured Tour Packages'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '从多城市深度游到主题路线，这里整理了可进一步定制的旅行案例。' : 'From multi-city journeys to thematic routes, here are the travel cases you can further customize.'}</p>

      <section className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {tours.map((tour: any) => (
          <article key={tour._id} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
            <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{lang === 'zh' ? tour.title?.zh : tour.title?.en}</h2>
            <p className="mt-3 text-[var(--color-muted)] leading-7">{lang === 'zh' ? tour.description?.zh : tour.description?.en}</p>
            <div className="mt-6">
              <Link href={withLang(`/tours/${encodeURIComponent(tour.slug || '')}`, lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
                {lang === 'zh' ? '查看详情' : 'View Details'}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-14">
        <Link href={withLang('/', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </main>
  );
}
