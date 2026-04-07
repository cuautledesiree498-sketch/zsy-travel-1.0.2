import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = 'ZSY Travel';
  const title = lang === 'zh' ? `常见问题 - ${siteTitle}` : `FAQ - ${siteTitle}`;
  const description = pickLocalized(settings?.faqSubtitle, lang)
    || pickLocalized(settings?.siteDescription, lang)
    || 'Frequently asked questions about our tailor-made China travel services.';

  return { title, description };
}

export default async function FAQPage({ searchParams }: any) {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];
  const switchLang = lang === 'en' ? 'zh' : 'en';
  const siteTitle = 'ZSY Travel';
  const footerIntro = lang === 'zh' ? '如果你还有其他关于中国旅行规划的问题，欢迎随时联系我们，我们会根据你的需求进一步说明。' : 'If you have any other questions about planning your trip in China, feel free to contact us and we will be happy to explain the best options for your needs.';
  const faqs = settings?.faqItems?.length
    ? settings.faqItems
    : [
        { question: markPlaceholder(lang === 'zh' ? '待填写：FAQ 问题 1' : 'FAQ question 1 to be filled'), answer: markPlaceholder(lang === 'zh' ? '待填写：FAQ 回答 1' : 'FAQ answer 1 to be filled') },
        { question: markPlaceholder(lang === 'zh' ? '待填写：FAQ 问题 2' : 'FAQ question 2 to be filled'), answer: markPlaceholder(lang === 'zh' ? '待填写：FAQ 回答 2' : 'FAQ answer 2 to be filled') },
      ];

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
            <Link href={withLang('/about', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.about}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.contact}</Link>
            <Link href={withLang('/faq', switchLang)} className="rounded-full border border-[rgba(10,27,52,0.12)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)] hover:border-[rgba(10,27,52,0.28)]">{t.language}</Link>
          </div>
        </div>
      </nav>

      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.42em] text-[var(--color-muted)]">{t.faq}</p>
          <h2 className="mt-5 text-5xl font-semibold leading-[1.04] text-[var(--color-navy)] md:text-7xl">{markPlaceholder(pickLocalized(settings?.faqTitle, lang) || (lang === 'zh' ? '常见问题' : 'Frequently Asked Questions'))}</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">{markPlaceholder(pickLocalized(settings?.faqSubtitle, lang) || (lang === 'zh' ? '如果你正在计划中国旅行，这里整理了最常见的问题，帮助你更快了解我们的服务。' : 'If you are planning a trip to China, here are the most common questions to help you better understand our services.'))}</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-5">
          {faqs.map((faq: any, index: number) => (
            <details key={index} className="group overflow-hidden rounded-[1.6rem] border border-[rgba(10,27,52,0.08)] bg-white shadow-[0_16px_40px_rgba(10,27,52,0.04)]">
              <summary className="flex cursor-pointer items-center justify-between gap-6 px-7 py-6 text-left text-lg font-semibold text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
                <span>{markPlaceholder(pickLocalized(faq.question, lang) || (lang === 'zh' ? '待填写：FAQ 问题' : 'FAQ question to be filled'))}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-soft-white)] text-[var(--color-navy)] transition group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-[rgba(10,27,52,0.08)] px-7 py-6 text-[15px] leading-8 text-[var(--color-muted)]">{markPlaceholder(pickLocalized(faq.answer, lang) || (lang === 'zh' ? '待填写：FAQ 回答' : 'FAQ answer to be filled'))}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fbff] px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-14 text-center text-white shadow-[0_35px_80px_rgba(10,27,52,0.14)] md:px-16">
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,255,255,0.66)]">{t.needMoreGuidance}</p>
          <h3 className="mt-4 text-3xl font-semibold md:text-5xl">{markPlaceholder(pickLocalized(settings?.faqCtaTitle, lang) || (lang === 'zh' ? '还有其他问题？联系我们' : 'Still Have Questions? Contact Us'))}</h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{markPlaceholder(pickLocalized(settings?.faqCtaSubtitle, lang) || (lang === 'zh' ? '把你的需求告诉我们，我们会尽快给你更合适的建议。' : 'Tell us what you are looking for, and we will get back to you with the most suitable suggestion as soon as possible.'))}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={withLang('/contact', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-accent)]">{t.contact}</Link>
            <Link href={withLang('/about', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">{t.about}</Link>
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
