import type { Metadata } from 'next';
import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';
import LegalLinks from '@/components/LegalLinks';
import { getSiteSettings } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const BRAND_NAME_ZH = '无限旅途';
const BRAND_NAME_EN = 'Infinite Travel';
const CONTACT_EMAIL = '1484818239@qq.com';
const WECHAT_ID = 'Superstar-_o';
const OFFICE_LOCATION_ZH = '中国（服务范围覆盖北京、上海、深圳、重庆、成都、陕西、新疆等目的地）';
const OFFICE_LOCATION_EN = 'China (service coverage includes Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi, Xinjiang and more)';

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
  const footerIntro = lang === 'zh' ? '无限旅途目前已开放咨询承接：你可以先提交需求，我们会根据出行时间、人数、目的地和预算做初步判断，再继续沟通路线与执行方式。' : 'Infinite Travel is open for travel inquiries now. You can submit your request first, and we will review your timing, group size, destinations and budget before discussing route design and next steps.';
  const contactAddress = lang === 'zh' ? OFFICE_LOCATION_ZH : OFFICE_LOCATION_EN;
  const contactHeroTitle = lang === 'zh' ? '先告诉我们，你想怎么去中国' : 'Tell Us How You Want to Travel in China';
  const contactHeroSubtitle = lang === 'zh'
    ? '你不需要一开始就把所有细节想清楚。先告诉我们大概时间、人数、想去的地方和预算范围，我们会判断下一步该怎么聊。'
    : 'You do not need to have every detail figured out yet. Start with your rough dates, group size, places you are considering, and budget range. We will help decide what should happen next.';
  const contactGuideTitle = lang === 'zh' ? '先给我们一个大概方向就可以' : 'A Rough Direction Is Enough to Start';
  const contactGuideItems = lang === 'zh'
    ? ['1️⃣ 出行日期、大致天数，以及日期是否灵活', '2️⃣ 同行人数和成员类型（家庭、朋友、商务、研学等）', '3️⃣ 想去的城市、地区或体验方向', '4️⃣ 预算范围和期望的服务深度', '5️⃣ 酒店风格、舒适度或希望入住的区域', '6️⃣ 特殊需求：饮食、语言、行动能力、儿童、商务、研学或旅拍']
    : ['1️⃣ Travel dates, trip length, and whether your dates are flexible', '2️⃣ Group size and traveler type, such as family, friends, business, or study travel', '3️⃣ Preferred cities, regions, or experience direction', '4️⃣ Budget range and expected service depth', '5️⃣ Hotel style, comfort level, or preferred area', '6️⃣ Special needs: diet, language, mobility, children, business, education, or photography'];
  const contactStatusNote = lang === 'zh' ? '通常会在正常工作时段内 24 小时左右回复，具体视咨询量和需求复杂度而定。' : 'We usually reply within 24 hours during normal working periods, depending on inquiry volume and request complexity.';
  const notBookingNote = lang === 'zh' ? '提交表单只是开始规划沟通，不代表订单成立、付款义务或行程已确认。' : 'Submitting this form starts the planning conversation. It does not create a booking, payment obligation, or confirmed travel arrangement.';
  const afterSubmitSteps = lang === 'zh'
    ? [
        '我们先查看你的日期、人数、目的地、预算范围和特殊需求。',
        '如果关键信息不足，只补问必要问题。',
        '我们会整理路线方向，并明确服务范围。',
        '方向可行后，再进入报价或下一步方案沟通。',
        '如果你决定继续推进，再通过书面确认单或适用合同确认安排。',
        '付款方式只会在服务范围、金额和确认节点清楚后提供。',
      ]
    : [
        'We review your dates, group size, destinations, budget range, and special needs.',
        'If key information is missing, we ask only the necessary follow-up questions.',
        'We shape a route direction and clarify the service scope.',
        'When the direction is realistic, we prepare a quotation or next-step proposal.',
        'If you decide to move forward, we confirm the arrangement through a written confirmation or applicable contract.',
        'Payment details are provided only after the relevant scope, amount, and confirmation step are clear.',
      ];
  const contactCtaTitle = lang === 'zh' ? '提交之后，我们会先帮你把方向理清' : 'After You Submit, We First Make the Direction Clear';
  const contactCtaSubtitle = lang === 'zh'
    ? '我们不会在信息还不清楚的时候就急着报价或收款。先看你的时间、人数、目的地和预算，再判断路线该怎么收、节奏是否合适，以及下一步是否需要进入报价或支付。'
    : 'We do not rush into pricing or payment while the trip is still unclear. We first review your timing, group size, destinations, and budget, then decide how the route should take shape and whether the next step should be quotation or payment.';

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
            <InfoCard title={lang === 'en' ? 'Brand' : '品牌'} value={lang === 'zh' ? BRAND_NAME_ZH : BRAND_NAME_EN} desc={lang === 'en' ? 'Private China travel planning for overseas guests, families, couples, small groups and business visitors.' : '为海外游客、家庭、情侣、私人小团和商务访客提供中国私人定制旅行规划。'} />
            <InfoCard title={lang === 'en' ? 'Email' : '邮箱'} value={CONTACT_EMAIL} desc={lang === 'en' ? 'Send your trip request here. Please include dates, group size, destinations and budget if possible.' : '你可以把行程需求发到这里。建议同时写明日期、人数、目的地和预算。'} />
            <InfoCard title="WeChat" value={WECHAT_ID} desc={lang === 'en' ? 'Available for follow-up communication after we receive your initial request.' : '收到初步需求后，可通过微信继续沟通路线细节。'} />
            <InfoCard title={lang === 'en' ? 'Follow-Up Channel' : '后续沟通方式'} value={lang === 'zh' ? '请先通过邮箱或微信联系' : 'Email or WeChat first'} desc={lang === 'en' ? 'After receiving your inquiry, we will confirm the most suitable follow-up channel for route details, quotation, and confirmation documents.' : '收到咨询后，我们会根据情况确认后续沟通方式，用于路线细节、报价和确认文件沟通。'} />
            <InfoCard title={lang === 'en' ? 'Service Area' : '服务范围'} value={contactAddress} desc={lang === 'en' ? 'China route planning and destination coordination across key cities, heritage routes and scenic regions.' : '覆盖中国核心城市、文化线路与风景目的地的路线规划和目的地协同服务。'} />
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
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-navy)]">{lang === 'zh' ? '回复时间' : 'Current Response Time'}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{contactStatusNote}</p>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-white p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-navy)]">{lang === 'zh' ? '提交后会发生什么' : 'After You Submit'}</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                  {afterSubmitSteps.map((item, index) => (
                    <p key={item}>{index + 1}. {item}</p>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-[#f8fbff] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-navy)]">{lang === 'zh' ? '还不是订单' : 'Not a Booking Yet'}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{notBookingNote}</p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#inquiry-form" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-navy-soft)]">{lang === 'en' ? 'Go to Inquiry Form' : '前往咨询表单'}</a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">{lang === 'en' ? 'Email Us Directly' : '直接邮件联系'}</a>
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
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,255,255,0.66)]">{lang === 'zh' ? '下一步' : 'Next Step'}</p>
          <h3 className="mt-4 text-3xl font-semibold md:text-5xl">{contactCtaTitle}</h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{contactCtaSubtitle}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3 text-left">
            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">{lang === 'zh' ? '第一步' : 'Step 1'}</p>
              <p className="mt-3 text-sm leading-7 text-white/88">{lang === 'zh' ? '先提交需求，我们判断行程方向与适配度。' : 'Submit your request first so we can assess fit and travel direction.'}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">{lang === 'zh' ? '第二步' : 'Step 2'}</p>
              <p className="mt-3 text-sm leading-7 text-white/88">{lang === 'zh' ? '确认路线与服务方式后，再进入报价和执行。' : 'After route and service scope are confirmed, we move into quotation and execution.'}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">{lang === 'zh' ? '第三步' : 'Step 3'}</p>
              <p className="mt-3 text-sm leading-7 text-white/88">{lang === 'zh' ? '如需锁定订单或定金，再提供对应支付方式。' : 'If a booking or deposit is needed, we then provide the appropriate payment method.'}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--color-line)] bg-[#f6f8fc] py-10 text-center text-sm text-[var(--color-muted)]">
        <div className="mx-auto max-w-7xl px-6">
          <p>{footerIntro}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[var(--color-slate)]">
            <LegalLinks lang={lang} itemClassName="contents" />
          </div>
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
