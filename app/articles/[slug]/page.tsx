import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { getArticleBySlug, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { normalizeLang, pickLocalized, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

function text(value: any, lang: 'en' | 'zh', fallback = '') {
  return markPlaceholder(pickLocalized(value, lang) || fallback);
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';

  if (!article) {
    return {
      title: lang === 'zh' ? `文章未找到 - ${siteTitle}` : `Article Not Found - ${siteTitle}`,
    };
  }

  return {
    title: `${text(article.title, lang, lang === 'zh' ? '文章详情' : 'Article Details')} - ${siteTitle}`,
    description: text(article.excerpt, lang, lang === 'zh' ? '旅行灵感与定制策划内容。' : 'Travel inspiration and tailor-made planning insights.'),
  };
}

export default async function ArticleDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const lang = normalizeLang((await searchParams)?.lang);

  if (!article) notFound();

  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const title = text(article.title, lang, lang === 'zh' ? '精选旅行内容' : 'Travel Insight');
  const rawTagline = pickLocalized(article.tagline, lang);
  const rawExcerpt = pickLocalized(article.excerpt, lang);
  const tagline = markPlaceholder(rawTagline || rawExcerpt || (lang === 'zh' ? '围绕目的地、路线设计与出行判断的旅行参考内容。' : 'Planning notes and destination insights for building a better China journey.'));
  const excerpt = markPlaceholder(rawExcerpt || rawTagline || (lang === 'zh' ? '这是一篇用于帮助旅行者理解目的地、路线搭配与出行判断的参考内容。' : 'This article is designed to help travelers think through destinations, route combinations and planning decisions.'));
  const author = markPlaceholder(article.author || (lang === 'zh' ? '作者待补充' : 'Author coming soon'));
  const formattedDate = article.publishDate
    ? new Date(article.publishDate).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : (lang === 'zh' ? '发布日期待补充' : 'Publish date coming soon');
  const heroFacts = Array.isArray(article.heroFacts) ? article.heroFacts : [];

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
            <Link href={withLang('/insights', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '灵感内容' : 'Insights'}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '联系我们' : 'Contact'}</Link>
          </div>
        </div>
      </nav>

      <section className="relative mt-16 h-[44vh] overflow-hidden">
        <Image src={imageUrlFor(article.mainImage, 1600, fallbackImages.article)} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.78),rgba(4,10,18,0.18),rgba(4,10,18,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-10 text-white">
          <Link href={withLang('/insights', lang)} className="inline-flex rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:bg-white/10">
            {lang === 'zh' ? '← 返回内容' : '← Back to Insights'}
          </Link>
          <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] md:text-6xl">{title}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/88 md:text-xl">{tagline}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span>{author}</span>
            <span>• {formattedDate}</span>
          </div>
          {heroFacts.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_0.22fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '内容摘要' : 'Overview'}</p>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)] md:text-lg whitespace-pre-line">{excerpt}</p>
            </div>

            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '正文内容' : 'Article Body'}</p>
              {Array.isArray(article.content) && article.content.length > 0 ? (
                <div className="prose prose-lg mt-6 max-w-none prose-headings:text-[var(--color-navy)] prose-p:text-[var(--color-muted)] prose-li:text-[var(--color-muted)]">
                  <PortableText value={article.content} />
                </div>
              ) : (
                <div className="mt-6 rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-6 text-[var(--color-muted)]">
                  <p className="leading-7">
                    {lang === 'zh'
                      ? '这篇内容的完整正文还在整理中。你可以先根据上方摘要判断主题是否接近你的旅行想法；如果接近，可以直接带着这个方向来咨询，我们会继续把它整理成目的地组合、天数安排和预算范围。'
                      : 'The full article body is still being prepared. You can use the summary above to decide whether the topic is close to your trip idea; if it is, bring this direction into an inquiry and we will shape it into destination combinations, trip length and budget range.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7faff)] p-8 shadow-[0_24px_60px_rgba(10,27,52,0.08)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '怎么继续' : 'How to Continue'}</p>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                {lang === 'zh'
                  ? '如果这篇内容刚好对应你的旅行想法，可以直接把它作为咨询起点。告诉我们出行时间、人数、想去的城市和预算，我们会继续整理成更具体的路线方案。'
                  : 'If this guide matches your trip idea, use it as the starting point for an inquiry. Tell us your timing, group size, target cities and budget, and we will shape it into a more specific route proposal.'}
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <Link href={withLang('/insights', lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '查看更多内容' : 'More Insights'}
                </Link>
                <Link href={withLang('/contact', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '联系咨询' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
