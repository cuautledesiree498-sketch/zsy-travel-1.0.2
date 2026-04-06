import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = 'ZSY Travel';
  const title = lang === 'zh' ? `联系我们 - ${siteTitle}` : `Contact - ${siteTitle}`;
  const description = pickLocalized(settings?.contactHeroSubtitle, lang)
    || pickLocalized(settings?.siteDescription, lang)
    || 'Contact Infinite Journeys for tailor-made China travel planning.';

  return { title, description };
}

export default async function ContactPage({ searchParams }: any) {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];
  const switchLang = lang === 'en' ? 'zh' : 'en';
  const siteTitle = 'ZSY Travel';
  const footerIntro = lang === 'zh' ? 'ZSY Travel 专注中国高端定制旅行；空缺字段已加测试标记，方便继续填充。' : 'ZSY Travel focuses on premium tailor-made China journeys; empty areas are marked as test content for easy completion.';
  const contactAddress = markPlaceholder(pickLocalized(settings?.address, lang) || (lang === 'zh' ? '待填写：办公地点 / 服务基地' : 'Location / service base to be filled'));
  const contactHeroTitle = pickLocalized(settings?.contactHeroTitle, lang) || 'Let’s plan a more refined journey across China.';
  const contactHeroSubtitle = pickLocalized(settings?.contactHeroSubtitle, lang) || 'Tell us your travel time, preferred destinations and traveler profile.';
  const contactGuideTitle = pickLocalized(settings?.contactGuideTitle, lang) || 'What to send us for a faster proposal';
  const contactGuideItems = settings?.contactGuideItems?.length ? settings.contactGuideItems.map((item: string) => markPlaceholder(pickLocalized(item, lang) || '待填写')) : [markPlaceholder(lang === 'zh' ? '待填写：出行月份 / 天数' : 'Travel month / length to be filled'), markPlaceholder(lang === 'zh' ? '待填写：人数与客群类型' : 'Traveler count / profile to be filled'), markPlaceholder(lang === 'zh' ? '待填写：目的地偏好与预算范围' : 'Destination preference / budget range to be filled')];
  const contactStatusNote = pickLocalized(settings?.contactStatusNote, lang) || 'This page is ready as a presentation and planning entry point.';
  const contactCtaTitle = pickLocalized(settings?.contactCtaTitle, lang) || 'We can begin with a simple message and shape the rest with you.';
  const contactCtaSubtitle = pickLocalized(settings?.contactCtaSubtitle, lang) || 'If you are not sure where to start, simply tell us the month, destinations and traveler type.';

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
            <Link href={withLang('/', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.home}</Link>
            <Link href={withLang('/contact', switchLang)} className="rounded-full border border-[rgba(10,27,52,0.12)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)] hover:border-[rgba(10,27,52,0.28)]">{t.language}</Link>
          </div>
        </div>
      </nav>

      <section className="px-6 pt-32 pb-18">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.42em] text-[var(--color-muted)]">{t.contactPlanning}</p>
            <h2 className="mt-5 text-5xl font-semibold leading-[1.04] text-[var(--color-navy)] md:text-7xl">{contactHeroTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">{contactHeroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-6">
            <InfoCard title="Email" value={markPlaceholder(settings?.contactEmail || '待填写：联系邮箱')} desc={lang === 'en' ? 'Suitable for itinerary requests, partnership communication and detailed planning needs.' : '适合提交定制需求、合作沟通与较详细的行程讨论。'} />
            <InfoCard title="Phone / WhatsApp" value={markPlaceholder(settings?.contactPhone || settings?.whatsappNumber || '待填写：电话 / WhatsApp')} desc={lang === 'en' ? 'Useful for faster communication, urgent planning questions or direct follow-up.' : '适合更快速沟通、紧急咨询与直接跟进。'} />
            <InfoCard title="WeChat" value={markPlaceholder(settings?.wechat || '待填写：微信号')} desc={lang === 'en' ? 'Ideal for Chinese-speaking customers or clients already using WeChat.' : '适合中文客户或习惯使用微信沟通的客人。'} />
            <InfoCard title={lang === 'en' ? 'Location' : '所在地'} value={contactAddress} desc={lang === 'en' ? 'Your actual office or service base can be updated later in the CMS.' : '后续可在后台继续更新真实办公地址或服务基地。'} />
          </div>

          <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_25px_70px_rgba(10,27,52,0.06)] md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{t.quickInquiryGuide}</p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{contactGuideTitle}</h3>
            <div className="mt-6 space-y-5 text-base leading-8 text-[var(--color-muted)]">
              {contactGuideItems.map((item: string, index: number) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-navy)]">{t.currentStatus}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{contactStatusNote}</p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href={`mailto:${settings?.contactEmail || 'info@example.com'}`} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-navy-soft)]">{lang === 'en' ? 'Email Us' : '邮件联系'}</a>
              <Link href={withLang('/about', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">{t.about}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fbff] px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-14 text-center text-white shadow-[0_35px_80px_rgba(10,27,52,0.14)] md:px-16">
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,255,255,0.66)]">{t.needStartingPoint}</p>
          <h3 className="mt-4 text-3xl font-semibold md:text-5xl">{contactCtaTitle}</h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{contactCtaSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={`mailto:${settings?.contactEmail || 'info@example.com'}`} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-accent)]">{lang === 'en' ? 'Start By Email' : '从邮件开始'}</a>
            <Link href={withLang('/', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">{t.home}</Link>
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

function InfoCard({ title, value, desc }: { title: string; value: string; desc: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_16px_40px_rgba(10,27,52,0.04)]">
      <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">{title}</p>
      <h3 className="mt-3 text-xl font-semibold text-[var(--color-navy)] break-words">{value}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{desc}</p>
    </div>
  );
}


function displayText(value: any, fallback = '测试待补充') {
  return markPlaceholder(value || fallback);
}
