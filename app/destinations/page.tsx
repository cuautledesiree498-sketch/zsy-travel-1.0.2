import type { Metadata } from 'next';
import Link from 'next/link';
import { getDestinations } from '@/lib/sanity';
import { normalizeLang, pickLocalized, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Destinations - Infinite Travel',
  description: 'Explore the key China destinations curated by Infinite Travel, including Beijing, Shanghai, Xinjiang and more.',
};

export default async function DestinationsPage({ searchParams }: any) {
  const lang = normalizeLang(searchParams?.lang);
  const destinations = await getDestinations();

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '精选目的地' : 'Popular Destinations'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '从北京到新疆，从城市到山河，我们把中国目的地整理成更清晰、也更好卖的旅行方案。' : 'From Beijing to Xinjiang, we turn China destinations into clearer and more sellable travel plans.'}</p>

      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.length > 0 ? destinations.map((item: any) => {
          const title = markPlaceholder(pickLocalized(item.name, lang) || '');
          const desc = markPlaceholder(pickLocalized(item.description, lang) || pickLocalized(item.tagline, lang) || '');
          return (
            <article key={item._id} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{title || (lang === 'zh' ? '精选目的地' : 'Destination')}</h2>
              {desc ? (
                <p className="mt-3 line-clamp-4 text-[var(--color-muted)] leading-7">{desc}</p>
              ) : (
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{lang === 'zh' ? '可进入详情页查看该目的地的旅行亮点与行程建议。' : 'Open the detail page to explore highlights and travel suggestions for this destination.'}</p>
              )}
              <div className="mt-6">
                <Link href={withLang(`/destinations/${encodeURIComponent(item.slug || '')}`, lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
                  {lang === 'zh' ? '查看详情' : 'View Details'}
                </Link>
              </div>
            </article>
          );
        }) : (
          <div className="col-span-full rounded-[2rem] border border-dashed border-[rgba(10,27,52,0.12)] bg-[var(--color-soft-white)] px-6 py-16 text-center text-[var(--color-muted)]">
            {lang === 'zh' ? '后台添加目的地后，这里会自动生成列表和详情页入口。' : 'Once destinations are added in the CMS, the list and detail page links will appear here automatically.'}
          </div>
        )}
      </section>

      <div className="mt-14">
        <Link href={withLang('/', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </main>
  );
}
