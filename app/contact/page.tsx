import type { Metadata } from 'next';
import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';
import { getSiteSettings } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const BRAND_NAME_ZH = '无限旅途';
const BRAND_NAME_EN = 'Infinite Travel';
const CONTACT_EMAIL = 'contact@infinitravel.net';
const WECHAT_ID = '待补充';
const WHATSAPP = 'Coming soon';
const OFFICE_LOCATION_ZH = '待补充';
const OFFICE_LOCATION_EN = 'Coming soon';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const title = lang === 'zh' ? `联系我们 - ${siteTitle}` : `Contact - ${siteTitle}`;
  const description = pickLocalized(settings?.contactHeroSubtitle, lang)
    || pickLocalized(settings?.siteDescription, lang)
    || 'Contact Infinite Travel for tailor-made China travel planning.';

  return { title, description };
}

export default async function ContactPage({ searchParams }: any) {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];
  const switchLang = lang === 'en' ? 'zh' : 'en';
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const footerIntro = lang === 'zh' ? '无限旅途的联系信息与支付信息仍在补充中；你可以先通过咨询表单提交需求，我们会在信息完善后继续对接。' : 'Infinite Travel is still completing its contact and payment details. You can submit your needs through the inquiry form first, and we will continue the conversation once the details are finalized.';
  const contactAddress = lang === 'zh' ? OFFICE_LOCATION_ZH : OFFICE_LOCATION_EN;
  const contactHeroTitle = lang === 'zh' ? '联系我们，开始你的中国旅程' : 'Contact Us to Start Your Journey in China';
  const contactHeroSubtitle = lang === 'zh' ? '告诉我们你的出行时间、人数、目的地和预算，我们会尽快为你安排合适的咨询方式。' : 'Share your travel dates, group size, destinations and budget, and we will arrange the right consultation for you as soon as possible.';
  const contactGuideTitle = lang === 'zh' ? '咨询前请准备以下信息' : 'Please Prepare the Following Information Before Inquiry';
  const contactGuideItems = lang === 'zh'
    ? ['1️⃣ 出行日期和大致天数', '2️⃣ 同行人数和成员情况', '3️⃣ 想去的城市或地区', '4️⃣ 预算范围', '5️⃣ 是否有特殊需求（饮食 / 语言 / 节奏等）']
    : ['1️⃣ Travel dates and trip length', '2️⃣ Group size and traveler type', '3️⃣ Preferred destinations', '4️⃣ Budget range', '5️⃣ Any special needs (diet / language / pace)'];
  const contactStatusNote = lang === 'zh' ? '我们会在收到信息后尽快回复，通常会在 24 小时内与您取得联系。' : 'We will reply as soon as possible after receiving your message, usually within 24 hours.';
  const contactCtaTitle = lang === 'zh' ? '支付方式说明' : 'Payment Methods';
  const contactCtaSubtitle = lang === 'zh' ? '如需确认订单或支付定金，我们会在沟通后提供对应的支付方式与流程。' : 'If a deposit or booking payment is needed, we will provide the payment methods and process after consultation.';

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
            <InfoCard title={lang === 'en' ? 'Brand' : '品牌名称'} value={lang === 'zh' ? BRAND_NAME_ZH : BRAND_NAME_EN} desc={lang === 'en' ? 'The public-facing brand name currently used on this website.' : '当前网站对外展示使用的品牌名称。'} />
            <InfoCard title={lang === 'en' ? 'Email' : '邮箱'} value={CONTACT_EMAIL} desc={lang === 'en' ? 'Available for inquiries.' : '可用于咨询联系。'} />
            <InfoCard title="WeChat" value={WECHAT_ID} desc={lang === 'en' ? 'Coming soon.' : '即将补充。'} />
            <InfoCard title="WhatsApp" value={WHATSAPP} desc={lang === 'en' ? 'Coming soon.' : '即将补充。'} />
            <InfoCard title={lang === 'en' ? 'Office / Service Base' : '办公地点 / 服务基地'} value={contactAddress} desc={lang === 'en' ? 'Coming soon.' : '即将补充。'} />
          </div>

          <div className="grid gap-8">
            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_25px_70px_rgba(10,27,52,0.06)] md:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{t.quickInquiryGuide}</p>
              <h3 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{contactGuideTitle}</h3>
              <div className="mt-6 space-y-5 text-base leading-8 text-[var(--color-muted)]">
                {contactGuideItems.map((item: string, index: number) => (
                  <p key={index}>• {item}</p>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-navy)]">{lang === 'zh' ? '状态说明' : 'Current Response Time'}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{contactStatusNote}</p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#inquiry-form" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-navy-soft)]">{lang === 'en' ? 'Go to Inquiry Form' : '前往咨询表单'}</a>
                <button className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white" type="button">{lang === 'en' ? 'Contact Details Pending' : '联系信息待补充'}</button>
              </div>
            </div>

            <div id="inquiry-form">
              <InquiryForm lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fbff] px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-14 text-center text-white shadow-[0_35px_80px_rgba(10,27,52,0.14)] md:px-16">
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,255,255,0.66)]">{lang === 'zh' ? '支付入口' : 'Payment Entry'}</p>
          <h3 className="mt-4 text-3xl font-semibold md:text-5xl">{contactCtaTitle}</h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{contactCtaSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-80" type="button">{lang === 'zh' ? '沟通后提供支付方式' : 'Payment Details After Consultation'}</button>
            <button className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white opacity-80" type="button">{lang === 'zh' ? '定金 / 订单支付流程待确认' : 'Deposit / Booking Process To Be Confirmed'}</button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--color-line)] bg-[#f6f8fc] py-10 text-center text-sm text-[var(--color-muted)]">
        <div className="mx-auto max-w-7xl px-6">
          <p>{footerIntro}</p>
          <p className="mt-4">{lang === 'zh' ? `© 2026 ${siteTitle}。保留所有权利。` : `© 2026 ${siteTitle}. All rights reserved.`}</p>
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
