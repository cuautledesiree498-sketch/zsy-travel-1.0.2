import type { Metadata } from 'next';
import Link from 'next/link';
import { normalizeLang, withLang, pickLocalized, markPlaceholder } from '@/lib/i18n';
import { getArticles } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insights - Infinite Travel',
  description: 'Travel guides, planning notes and inspiration for tailor-made journeys across China.',
};

export default async function InsightsPage({ searchParams }: any) {
  const lang = normalizeLang(searchParams?.lang);
  const articles = await getArticles();

  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '旅行灵感' : 'Travel Guides'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '帮助你规划旅程的建议与故事。' : 'Tips and stories for planning your journey.'}</p>

      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.length > 0 ? articles.map((item: any) => {
          const title = markPlaceholder(pickLocalized(item.title, lang) || (lang === 'zh' ? '文章标题待补充' : 'Article title coming soon'));
          const desc = markPlaceholder(pickLocalized(item.excerpt, lang) || (lang === 'zh' ? '文章摘要待补充' : 'Article excerpt coming soon'));
          return (
            <article key={item._id} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{title}</h2>
              <p className="mt-3 text-[var(--color-muted)] leading-7 line-clamp-4">{desc}</p>
              <div className="mt-6">
                <Link href={withLang(`/articles/${encodeURIComponent(item.slug || '')}`, lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
                  {lang === 'zh' ? '查看详情' : 'View Details'}
                </Link>
              </div>
            </article>
          );
        }) : (
          <div className="col-span-full rounded-[2rem] border border-dashed border-[rgba(10,27,52,0.12)] bg-[var(--color-soft-white)] px-6 py-16 text-center text-[var(--color-muted)]">
            {lang === 'zh' ? '后台添加文章后，这里会自动生成列表和详情页入口。' : 'Once articles are added in the CMS, the list and detail page links will appear here automatically.'}
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
