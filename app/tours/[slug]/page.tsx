import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTourBySlug, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { getFeaturedCaseCopy } from '@/lib/featuredCases';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const CONTACT_EMAIL = '1484818239@qq.com';
const WECHAT_ID = 'Superstar-_o';

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
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
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];

  if (!tour) {
    notFound();
  }

  const siteTitle = 'ZSY Travel';
  const footerIntro = lang === 'zh' ? 'ZSY Travel 案例详情页；如你希望把现有案例改成更适合你的版本，可以直接联系我们继续定制。' : 'This case page is designed as an inspiration reference. If you would like to adapt it into a version that suits you better, feel free to contact us for further customization.';
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
  const caseCopy = getFeaturedCaseCopy(String(tour.slug || slug), lang);
  const displayDescription = (tourDescription.includes('测试待填写') || !pickLocalized(tour.description, lang)) ? caseCopy.overview : tourDescription;
  const displayHighlights = (!Array.isArray(tour.highlights) || tour.highlights.length === 0 || tourHighlights.some((item: string) => item.includes('测试待填写')))
    ? caseCopy.highlights
    : tourHighlights;
  const displayItinerary = (!Array.isArray(tour.itinerary) || tour.itinerary.length === 0 || itinerary.some((day: any) => day.title?.includes('测试待填写') || day.description?.includes('测试待填写')))
    ? caseCopy.itinerary.map((day: any, index: number) => ({ day: index + 1, ...day }))
    : itinerary;
  const bestSeason = lang === 'zh' ? '春季、秋季以及各地景观最适合出行的季节；新疆建议结合具体线路选择最佳月份。' : 'Spring and autumn are generally best; for Xinjiang, the ideal month depends on the specific route and scenery.';
  const extensions = lang === 'zh' ? '可根据客户需求延展为北京 + 上海、成都 + 重庆、陕西 + 新疆等组合，也可扩展为更长的全国多地线路。' : 'This route can be extended into combinations such as Beijing + Shanghai, Chengdu + Chongqing, Shaanxi + Xinjiang, or developed into a longer multi-city China journey.';

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
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)] md:text-lg">{displayDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <CaseMiniCard title={lang === 'zh' ? '适合人群' : 'Best For'} value={caseCopy.audience} />
              <CaseMiniCard title={lang === 'zh' ? '旅行风格' : 'Travel Style'} value={caseCopy.style} />
              <CaseMiniCard title={lang === 'zh' ? '建议使用方式' : 'How To Use This Case'} value={caseCopy.cta} />
            </div>

            {tourHighlights.length > 0 && (
              <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8 shadow-[0_18px_46px_rgba(10,27,52,0.05)] md:p-10">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '亮点' : 'Highlights'}</p>
                <ul className="mt-5 space-y-4">
                  {displayHighlights.map((item: string, i: number) => (
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
                  {displayItinerary.map((day: any, i: number) => (
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

            <div className="grid gap-6 md:grid-cols-2">
              <CaseMiniCard title={lang === 'zh' ? '最佳出行季节' : 'Best Time to Travel'} value={bestSeason} />
              <CaseMiniCard title={lang === 'zh' ? '可延展方向' : 'Possible Extensions'} value={extensions} />
            </div>
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
                  <span>{lang === 'zh' ? '联系邮箱' : 'Email'}</span>
                  <span className="font-semibold text-[var(--color-navy)] break-all">{CONTACT_EMAIL}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>WeChat</span>
                  <span className="font-semibold text-[var(--color-navy)]">{WECHAT_ID}</span>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">{lang === 'zh' ? '这类页面更适合作为灵感案例和定制参考，不代表唯一固定可售产品。你可以直接联系我们，基于你的时间、客群和目的地偏好重新定制。' : 'This page is designed as an inspiration case and planning reference, not the only fixed product. You can contact us directly to reshape it around your travel dates, traveler type and destination preferences.'}</p>
              <div className="mt-7 flex flex-col gap-3">
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '邮件咨询这个方向' : 'Discuss by Email'}
                </a>
                <button className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)]" type="button">
                  {lang === 'zh' ? '测试待接入：支付定金' : 'Test: Deposit Pending'}
                </button>
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

function CaseMiniCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-6 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{title}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{value}</p>
    </div>
  );
}
