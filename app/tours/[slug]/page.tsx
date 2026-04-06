import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTourBySlug, getSiteSettings, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = 'ZSY Travel';

  if (!tour) {
    return {
      title: lang === 'zh' ? `路线未找到 - ${siteTitle}` : `Tour Not Found - ${siteTitle}`,
    };
  }

  const tourTitle = markPlaceholder(pickLocalized(tour.title, lang) || (lang === 'zh' ? '待填写：案例标题' : 'Case title to be filled'));
  const description = pickLocalized(tour.description, lang)
    || (lang === 'zh' ? '中国高端定制旅行案例参考。' : 'A premium China travel inspiration case.');

  return {
    title: `${tourTitle} - ${siteTitle}`,
    description,
  };
}

export default async function TourDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];

  if (!tour) {
    notFound();
  }

  const siteTitle = 'ZSY Travel';
  const footerIntro = lang === 'zh' ? 'ZSY Travel 案例详情页；未填好的字段会显示测试标记。' : 'ZSY Travel case detail page; unfinished fields are displayed with test markers.';
  const tourTitle = markPlaceholder(pickLocalized(tour.title, lang) || (lang === 'zh' ? '待填写：案例标题' : 'Case title to be filled'));
  const tourDescription = markPlaceholder(pickLocalized(tour.description, lang) || (lang === 'zh' ? '待填写：路线概览' : 'Overview to be filled'));
  const tourHighlights = Array.isArray(tour.highlights) && tour.highlights.length ? tour.highlights.map((item: any) => markPlaceholder(pickLocalized(item, lang) || '待填写')).filter(Boolean) : [markPlaceholder(lang === 'zh' ? '待填写：亮点 1' : 'Highlight 1 to be filled'), markPlaceholder(lang === 'zh' ? '待填写：亮点 2' : 'Highlight 2 to be filled')];
  const itinerary = Array.isArray(tour.itinerary) && tour.itinerary.length
    ? tour.itinerary.map((day: any) => ({
        day: day?.day,
        title: markPlaceholder(pickLocalized(day?.title, lang) || (lang === 'zh' ? '待填写：行程标题' : 'Itinerary title to be filled')),
        description: markPlaceholder(pickLocalized(day?.description, lang) || (lang === 'zh' ? '待填写：行程描述' : 'Itinerary description to be filled')),
      }))
    : [{ day: 1, title: markPlaceholder(lang === 'zh' ? '待填写：第 1 天行程' : 'Day 1 itinerary to be filled'), description: markPlaceholder(lang === 'zh' ? '待填写：第 1 天说明' : 'Day 1 description to be filled') }];

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

      <section className="relative h-[52vh] overflow-hidden mt-16">
        <Image src={imageUrlFor(tour.image, 1600, fallbackImages.tour)} alt={tourTitle} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.82),rgba(4,10,18,0.24),rgba(4,10,18,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10 text-white">
          <Link href={withLang('/#cases', lang)} className="inline-flex rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:bg-white/10">
            {lang === 'zh' ? '← 返回案例参考' : '← Back to Cases'}
          </Link>
          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] md:text-6xl">{tourTitle}</h2>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-white">
            {!!tour.duration && <span className="rounded-full bg-white/14 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em]">{tour.duration} {lang === 'zh' ? '天' : 'Days'}</span>}
            {!!tour.price && <span className="text-3xl font-semibold">${tour.price}</span>}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '路线概览' : 'Overview'}</p>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)] md:text-lg">{tourDescription}</p>
            </div>

            {tourHighlights.length > 0 && (
              <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8 shadow-[0_18px_46px_rgba(10,27,52,0.05)] md:p-10">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '亮点' : 'Highlights'}</p>
                <ul className="mt-5 space-y-4">
                  {tourHighlights.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--color-slate)]">
                      <span className="mt-1 text-[var(--color-navy)]">✦</span>
                      <span className="leading-8">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {itinerary.length > 0 && (
              <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '行程安排' : 'Itinerary'}</p>
                <div className="mt-6 space-y-6">
                  {itinerary.map((day: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-sm font-semibold text-white">
                        {lang === 'zh' ? `第${day.day || i + 1}天` : `Day ${day.day || i + 1}`}
                      </div>
                      <div className="flex-1 border-b border-[rgba(10,27,52,0.08)] pb-6 last:border-b-0">
                        <h3 className="text-xl font-semibold text-[var(--color-navy)]">{day.title || (lang === 'zh' ? '行程安排' : 'Schedule')}</h3>
                        {day.description && <p className="mt-2 leading-8 text-[var(--color-muted)]">{day.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="sticky top-24 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7faff)] p-8 shadow-[0_24px_60px_rgba(10,27,52,0.08)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '案例参考信息' : 'Reference Info'}</p>
              <div className="mt-5 space-y-4 border-y border-[rgba(10,27,52,0.08)] py-5 text-sm text-[var(--color-slate)]">
                <div className="flex items-center justify-between gap-4">
                  <span>{lang === 'zh' ? '时长' : 'Duration'}</span>
                  <span className="font-semibold text-[var(--color-navy)]">{tour.duration ? `${tour.duration} ${lang === 'zh' ? '天' : 'Days'}` : markPlaceholder(lang === 'zh' ? '待填写：时长' : 'Duration to be filled')}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>{lang === 'zh' ? '参考预算' : 'Reference Budget'}</span>
                  <span className="font-semibold text-[var(--color-navy)]">{tour.price ? `$${tour.price}` : markPlaceholder(lang === 'zh' ? '待填写：预算' : 'Budget to be filled')}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>{lang === 'zh' ? '类型' : 'Type'}</span>
                  <span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '定制案例' : 'Custom Case'}</span>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">{lang === 'zh' ? '这类页面更适合作为灵感案例和定制参考，不代表唯一固定可售产品。你可以直接联系我们，基于你的时间、客群和目的地偏好重新定制。' : 'This page is designed as an inspiration case and planning reference, not the only fixed product. You can contact us directly to reshape it around your travel dates, traveler type and destination preferences.'}</p>
              <div className="mt-7 flex flex-col gap-3">
                <Link href={withLang('/contact', lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '咨询这个方向' : 'Discuss This Journey'}
                </Link>
                <Link href={withLang('/#cases', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '返回案例区' : 'Back to Cases'}
                </Link>
              </div>
            </div>
          </aside>
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
