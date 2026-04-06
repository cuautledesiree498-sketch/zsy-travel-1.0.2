import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getSiteSettings, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = 'ZSY Travel';

  if (!article) {
    return {
      title: lang === 'zh' ? `文章未找到 - ${siteTitle}` : `Article Not Found - ${siteTitle}`,
    };
  }

  const articleTitle = markPlaceholder(pickLocalized(article.title, lang) || (lang === 'zh' ? '待填写：文章标题' : 'Article title to be filled'));
  return {
    title: `${articleTitle} - ${siteTitle}`,
    description: lang === 'zh' ? '旅行灵感与定制策划内容。' : 'Travel inspiration and tailor-made planning insights.',
  };
}

export default async function ArticleDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];

  if (!article) {
    notFound();
  }

  const siteTitle = 'ZSY Travel';
  const footerIntro = lang === 'zh' ? 'ZSY Travel 灵感内容页；缺少正文或字段时会显示测试标记。' : 'ZSY Travel insights page; missing fields are intentionally shown with test markers.';
  const articleTitle = markPlaceholder(pickLocalized(article.title, lang) || (lang === 'zh' ? '待填写：文章标题' : 'Article title to be filled'));
  const formattedDate = article.publishDate
    ? new Date(article.publishDate).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : '';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={withLang('/', lang)} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] text-lg text-[var(--color-navy)] shadow-sm">✦</span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-muted)]">{lang === 'en' ? 'China Private Journeys' : '中国高端定制旅行'}</p>
              <h1 className="text-lg font-semibold tracking-[0.04em] text-[var(--color-navy)] md:text-xl">{siteTitle}</h1>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href={withLang('/', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.home}</Link>
            <Link href={withLang('/about', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.about}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.contact}</Link>
          </div>
        </div>
      </nav>

      <section className="relative h-[42vh] overflow-hidden mt-16">
        <Image src={imageUrlFor(article.mainImage, 1600, fallbackImages.article)} alt={articleTitle} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.78),rgba(4,10,18,0.18),rgba(4,10,18,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-10 text-white">
          <Link href={withLang('/#articles', lang)} className="inline-flex rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:bg-white/10">
            {lang === 'zh' ? '← 返回灵感内容' : '← Back to Insights'}
          </Link>
          <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] md:text-6xl">{articleTitle}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/76">
            <span>{t.by} {markPlaceholder(article.author || (lang === 'zh' ? '待填写：作者' : 'Author to be filled'))}</span>
            {formattedDate && <span>• {formattedDate}</span>}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10">
          {article.content ? (
            <div className="prose prose-lg max-w-none prose-headings:text-[var(--color-navy)] prose-p:text-[var(--color-muted)] prose-li:text-[var(--color-muted)]">
              <PortableText value={article.content} />
            </div>
          ) : (
            <p className="py-12 text-center text-[var(--color-muted)]">{markPlaceholder(lang === 'zh' ? '待填写：文章正文' : 'Article body to be filled')}</p>
          )}

          <div className="mt-12 border-t border-[rgba(10,27,52,0.08)] pt-8 text-center">
            <Link href={withLang('/#articles', lang)} className="inline-flex rounded-full bg-[var(--color-navy)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
              {lang === 'zh' ? '查看更多文章' : 'More Articles'}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--color-line)] bg-[#f6f8fc] py-10 text-center text-sm text-[var(--color-muted)]">
        <div className="mx-auto max-w-7xl px-6">
          <p>{footerIntro}</p>
          <p className="mt-4">&copy; 2026 {siteTitle}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


function displayText(value: any, fallback = '测试待补充') {
  return markPlaceholder(value || fallback);
}
