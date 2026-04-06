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
  const footerIntro = lang === 'zh' ? '无限旅途国际旅行社当前已开放邮件与微信沟通；支付入口已预留，等 PingPong 收款链接补齐后即可启用。' : 'Infinite Travel currently accepts inquiries by email and WeChat; the payment area is ready and can be activated as soon as the PingPong payment link is provided.';
  const contactAddress = lang === 'zh' ? '测试待填写：办公地点 / 服务基地' : 'Test: location / service base to be added';
  const contactHeroTitle = lang === 'zh' ? '联系无限旅途国际旅行社' : 'Contact Infinite Travel';
  const contactHeroSubtitle = lang === 'zh' ? '现在已经可以通过邮件和微信发起咨询。你只需要告诉我们出行时间、目的地偏好、人数和大致需求，我们会基于你的情况继续沟通。' : 'You can now start your inquiry by email or WeChat. Just tell us your travel timing, destination ideas, traveler count and general expectations, and we will continue from there.';
  const contactGuideTitle = lang === 'zh' ? '为了更快给你方案，建议先提供这些信息' : 'What To Send Us For A Faster Proposal';
  const contactGuideItems = lang === 'zh'
    ? ['出行月份或预计日期', '目的地偏好（北京 / 上海 / 新疆 / 云南 / 多城组合）', '人数与客群类型（情侣 / 家庭 / 私人小团 / 商务）', '预算方向（定金咨询 / 全款规划 / 待沟通）']
    : ['Travel month or estimated dates', 'Preferred destinations (Beijing / Shanghai / Xinjiang / Yunnan / multi-city combinations)', 'Traveler profile (couple / family / private small group / executive)', 'Budget direction (deposit inquiry / full payment / to be discussed)'];
  const contactStatusNote = lang === 'zh' ? '当前页面已经具备真实承接能力：可直接邮件咨询、查看微信号，并使用下方询盘表单快速生成咨询邮件。' : 'This page now works as a real intake point: you can email us directly, use the WeChat contact, and generate a ready-to-send inquiry email through the form below.';
  const contactCtaTitle = lang === 'zh' ? '支付入口已准备好' : 'Payment Area Is Ready';
  const contactCtaSubtitle = lang === 'zh' ? 'PingPong 收款链接暂未提供，所以这里先保留支付入口占位。你补上链接后，我们可以立即启用“支付定金 / 支付全款”按钮。' : 'The PingPong payment link has not been provided yet, so the payment area is currently reserved as a placeholder. Once the link is available, we can immediately activate the deposit and full-payment buttons.';

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
            <InfoCard title="Brand" value={BRAND_NAME} desc={lang === 'en' ? 'Current public-facing brand name used for this site.' : '当前网站对外使用的品牌名称。'} />
            <InfoCard title="Email" value={CONTACT_EMAIL} desc={lang === 'en' ? 'This is the main inquiry mailbox. All form submissions currently route here.' : '当前主询盘邮箱，表单咨询也会发送到这里。'} />
            <InfoCard title="WeChat" value={WECHAT_ID} desc={lang === 'en' ? 'Preferred for Chinese-speaking customers and direct follow-up.' : '适合中文客户以及后续直接沟通。'} />
            <InfoCard title={lang === 'en' ? 'Location' : '所在地'} value={contactAddress} desc={lang === 'en' ? 'You can replace this with your real office or service base later.' : '后续可替换为真实办公地点或服务基地。'} />
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
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-navy)]">{t.currentStatus}</p>
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
