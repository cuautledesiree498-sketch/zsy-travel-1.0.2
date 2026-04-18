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
  const articles = dedupeArticles(await getArticles());

  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '旅行灵感' : 'Travel Guides'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '围绕中国目的地、路线搭配、行程节奏和定制判断的旅行内容。这里不是单纯种草，更重要的是帮你更快看出哪些路线成立，哪些组合其实太赶。' : 'Travel content around China destinations, route combinations, pacing and custom planning decisions. These guides are less about generic inspiration and more about helping you see which route ideas work, and which combinations are likely too rushed.'}</p>

      <section className="mt-10 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f6f8fc)] p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)] md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '先看主题' : 'Start with a topic'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '先挑一个和你当前路线想法最接近的问题入口。' : 'Start with the article that matches the route question you are trying to solve.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '再看判断逻辑' : 'Read the planning logic'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '重点不是“哪里好看”，而是帮你判断哪些组合更顺、哪些节奏太赶。' : 'The real value is not just where to go, but which combinations flow better and which pacing choices are too heavy.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '拿着问题来咨询' : 'Bring the question into inquiry'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{lang === 'zh' ? '如果某篇内容刚好对应你的犹豫点，可以直接带着这篇文章来继续咨询。' : 'If a guide matches the decision you are struggling with, you can bring that exact question into your inquiry.'}</p>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.length > 0 ? articles.map((item: any) => {
          const title = markPlaceholder(pickLocalized(item.title, lang) || (lang === 'zh' ? '精选旅行内容' : 'Travel Insight'));
          const rawExcerpt = pickLocalized(item.excerpt, lang);
          const rawTagline = pickLocalized(item.tagline, lang);
          const desc = markPlaceholder(rawExcerpt || rawTagline || (lang === 'zh' ? '围绕目的地、路线设计与出行判断的旅行参考内容。' : 'Planning notes and destination insights for building a better China journey.'));
          const articleCue = lang === 'zh' ? '这篇内容更适合用来判断路线，不只是看灵感。' : 'This guide is better used for route judgment, not just inspiration.';
          return (
            <article key={item._id} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{title}</h2>
              <p className="mt-3 text-[var(--color-muted)] leading-7 line-clamp-4">{desc}</p>
              <div className="mt-5 rounded-[1.25rem] bg-[var(--color-soft-white)] p-4 text-sm leading-7 text-[var(--color-slate)]">{articleCue}</div>
              <div className="mt-6">
                <Link href={withLang(`/articles/${encodeURIComponent(item.slug || '')}`, lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
                  {lang === 'zh' ? '查看详情' : 'View Details'}
                </Link>
              </div>
            </article>
          );
        }) : (
          <div className="col-span-full rounded-[2rem] border border-dashed border-[rgba(10,27,52,0.12)] bg-[var(--color-soft-white)] px-6 py-16 text-center text-[var(--color-muted)]">
            {lang === 'zh' ? '更多旅行内容会陆续更新。你也可以直接联系我们，按你的目的地、出行时间和预算来一起整理路线。' : 'More travel content will be added over time. You can also contact us directly to shape a route around your destinations, timing and budget.'}
          </div>
        )}
      </section>

      <div className="mt-14">
        <Link href={withLang('/contact', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '按内容方向咨询' : 'Inquire From This Content'}
        </Link>
      </div>
    </main>
  );
}

function dedupeArticles(articles: any[]) {
  const map = new Map<string, any>();

  for (const article of Array.isArray(articles) ? articles : []) {
    const key = String(article?.slug || '').trim().toLowerCase() || String(article?._id || '');
    if (!key) continue;

    const existing = map.get(key);
    if (!existing) {
      map.set(key, article);
      continue;
    }

    const existingScore = articleCompletenessScore(existing);
    const incomingScore = articleCompletenessScore(article);
    if (incomingScore > existingScore) {
      map.set(key, article);
    }
  }

  return Array.from(map.values());
}

function articleCompletenessScore(article: any) {
  let score = 0;
  if (pickLocalized(article?.excerpt, 'en') || pickLocalized(article?.excerpt, 'zh')) score += 4;
  if (pickLocalized(article?.tagline, 'en') || pickLocalized(article?.tagline, 'zh')) score += 2;
  if (Array.isArray(article?.content) && article.content.length > 0) score += 4;
  if (Array.isArray(article?.heroFacts) && article.heroFacts.length > 0) score += 1;
  if (article?.mainImage) score += 1;
  return score;
}
