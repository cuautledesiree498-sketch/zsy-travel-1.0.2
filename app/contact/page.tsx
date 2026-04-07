import type { Metadata } from 'next';
import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';
import { getSiteSettings } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const BRAND_NAME = '无限旅途国际旅行社';
const CONTACT_EMAIL = '1484818239@qq.com';
const WECHAT_ID = 'Superstar-_o';

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
  const footerIntro = lang === 'zh' ? '无限旅途国际旅行社当前已开放邮件与微信沟通；支付入口已预留，等 PingPong 收款链接补齐后即可启用。' : 'Infinite Travel currently accepts inquiries by email and WeChat. The payment section is already in place and can go live as soon as the PingPong payment link is added.';
  const contactAddress = lang === 'zh' ? '中国' : 'China';
  const contactHeroTitle = lang === 'zh' ? '联系我们' : 'Contact Us';
  const contactHeroSubtitle = lang === 'zh' ? '准备好开启你的中国之旅了吗？请告诉我们你的初步想法，我们将为你量身定制专属行程。' : 'Ready to start your China journey? Share your initial ideas with us, and we will tailor a unique itinerary just for you.';
  const contactGuideTitle = lang === 'zh' ? '为了更快为您提供专属方案，建议在咨询中包含以下信息：' : 'To help us design your plan faster, please consider including the following details in your message:';
  const contactGuideItems = lang === 'zh'
    ? ['预计出行时间与天数', '出行人数与人员结构（成人与儿童比例）', '偏好的旅行类型（团队游、研学游、个人定制或企业定制）', '期待的目的地或体验（如新疆风光、北京历史、成都体验等）', '大致预算与特殊需求（如住宿标准、饮食禁忌等）']
    : ['Expected travel dates and trip duration', 'Number of travelers, including the ratio of adults to children', 'Preferred travel type: group tour, educational tour, private tailor-made trip, or corporate travel', 'Destinations or experiences you hope to include, such as Xinjiang landscapes, Beijing history, or Chengdu lifestyle', 'Your approximate budget range and any special requirements, such as hotel standards or dietary restrictions'];
  const contactStatusNote = lang === 'zh' ? '我们的旅行顾问会在收到信息的 24 小时内与您联系，提供初步的行程建议与报价。' : 'Our travel consultants will get back to you within 24 hours with initial itinerary suggestions and a tailored quote.';
  const contactCtaTitle = lang === 'zh' ? '安全灵活的支付方式' : 'Secure and Flexible Payment Options';
  const contactCtaSubtitle = lang === 'zh' ? '我们支持多种国际主流支付方式。详细的支付流程与退改政策将在方案确认后，随行程合同一并发送给您。' : 'We support a range of major international payment methods. Detailed payment instructions and cancellation policies will be shared together with your travel agreement once the itinerary is confirmed.';

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
            <InfoCard title={lang === 'en' ? 'Brand' : '品牌名称'} value={BRAND_NAME} desc={lang === 'en' ? 'The public-facing brand name currently used on this website.' : '当前网站对外展示使用的品牌名称。'} />
            <InfoCard title="Email" value={CONTACT_EMAIL} desc={lang === 'en' ? 'This is the main inbox for travel inquiries and follow-up communication.' : '当前主要用于接收旅行咨询与后续沟通的邮箱。'} />
            <InfoCard title="WeChat" value={WECHAT_ID} desc={lang === 'en' ? 'Suitable for Chinese-speaking clients and direct one-to-one follow-up.' : '适合中文客户咨询，也方便后续一对一跟进沟通。'} />
            <InfoCard title={lang === 'en' ? 'Location' : '服务地区'} value={contactAddress} desc={lang === 'en' ? 'Our current service focus is China travel.' : '当前服务重点为中国旅行相关业务。'} />
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
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-navy-soft)]">{lang === 'en' ? 'Email Us' : '邮件联系'}</a>
                <button className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white" type="button">{lang === 'en' ? `WeChat: ${WECHAT_ID}` : `微信：${WECHAT_ID}`}</button>
              </div>
            </div>

            <InquiryForm lang={lang} email={CONTACT_EMAIL} />
          </div>
        </div>
      </section>

      <section className="bg-[#f8fbff] px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-14 text-center text-white shadow-[0_35px_80px_rgba(10,27,52,0.14)] md:px-16">
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,255,255,0.66)]">{lang === 'zh' ? '支付入口' : 'Payment Entry'}</p>
          <h3 className="mt-4 text-3xl font-semibold md:text-5xl">{contactCtaTitle}</h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{contactCtaSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-80" type="button">{lang === 'zh' ? '测试待接入：支付定金' : 'Test: Deposit Payment Pending'}</button>
            <button className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white opacity-80" type="button">{lang === 'zh' ? '测试待接入：支付全款' : 'Test: Full Payment Pending'}</button>
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
