import type { Metadata } from 'next';
import Link from 'next/link';
import { withLang, normalizeLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang);
  return {
    title: lang === 'zh' ? '支付说明 - 无限旅途' : 'Payment - Infinite Travel',
    description: lang === 'zh'
      ? '查看无限旅途当前的支付说明、确认流程与后续支付安排。'
      : 'Review the current payment guidance, confirmation steps and booking payment process for Infinite Travel.',
  };
}

export default async function PaymentPage({ searchParams }: any) {
  const lang = normalizeLang((await searchParams)?.lang);
  const isZh = lang === 'zh';

  const pageTitle = isZh ? '支付说明与确认流程' : 'Payment Guidance and Confirmation Flow';
  const pageSubtitle = isZh
    ? '当前支付页面先作为正式说明页使用：在路线、人数、日期、金额和服务范围确认后，我们再提供对应的支付方式。'
    : 'For now, this page serves as a formal payment guidance page. We provide the payment method after route, traveler details, dates, amount and service scope are confirmed.';

  const scenarios = isZh
    ? [
        { title: '咨询后确认定金', desc: '当路线方向、出行时间和服务范围已经明确时，可能进入定金确认阶段。' },
        { title: '订单确认后的尾款安排', desc: '在订单结构、执行方式和费用明细确认后，再安排后续付款。' },
        { title: '定制服务或特殊项目费用', desc: '对于更复杂的私人定制、接待或多城市组合项目，会先沟通再确认支付方式。' },
      ]
    : [
        { title: 'Deposit after consultation', desc: 'A deposit may be arranged only after the route direction, travel timing and service scope are clarified.' },
        { title: 'Final payment after booking confirmation', desc: 'The next payment step is arranged after the booking structure, execution details and cost breakdown are confirmed.' },
        { title: 'Custom service or special project fees', desc: 'For more complex private journeys, hosting requests or multi-city combinations, payment is confirmed only after discussion.' },
      ];

  const checks = isZh
    ? ['出行日期与大致行程时长', '人数与同行结构', '意向目的地与路线方向', '预算范围与服务预期', '金额、币种与付款节点']
    : ['Travel dates and expected trip length', 'Group size and traveler profile', 'Preferred destinations and route direction', 'Budget range and service expectations', 'Amount, currency and payment timing'];

  const afterPayment = isZh
    ? ['收到确认信息或后续沟通说明', '进入下一步路线推进或订单执行流程', '如需补充材料或信息，会继续与您确认']
    : ['You receive a confirmation message or next-step instruction', 'We move forward with route planning or booking execution', 'If any additional information is needed, we follow up with you directly'];

  const principles = isZh
    ? ['未确认前，不建议直接付款。', '支付方式以双方沟通确认后的安排为准。', '当前页面不展示伪支付按钮，也不引导未确认状态下直接付款。']
    : ['We do not recommend paying before the details are confirmed.', 'The actual payment method depends on the confirmed arrangement after consultation.', 'This page does not show fake payment buttons or push unconfirmed payments.'];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <section className="px-6 py-24 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Link href={withLang('/', lang)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            {isZh ? '← 返回首页' : '← Back to Home'}
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">{isZh ? '支付' : 'Payment'}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold text-[var(--color-navy)] md:text-7xl">{pageTitle}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">{pageSubtitle}</p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {scenarios.map((item, index) => (
              <div key={index} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{isZh ? `场景 ${index + 1}` : `Scenario ${index + 1}`}</p>
                <h2 className="mt-4 text-2xl font-semibold text-[var(--color-navy)]">{item.title}</h2>
                <p className="mt-4 leading-8 text-[var(--color-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_20px_60px_rgba(10,27,52,0.06)] md:p-10">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{isZh ? '支付前确认' : 'Before Payment'}</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{isZh ? '我们会先确认这些信息' : 'We Confirm These Details First'}</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--color-muted)]">
              {checks.map((item, index) => (
                <p key={index}>• {item}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] p-8 text-white shadow-[0_24px_60px_rgba(10,27,52,0.08)] md:p-10">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">{isZh ? '支付后' : 'After Payment'}</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{isZh ? '后续会怎么推进' : 'What Happens Next'}</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-white/84">
              {afterPayment.map((item, index) => (
                <p key={index}>• {item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-[#f8fbff] p-8 shadow-[0_20px_60px_rgba(10,27,52,0.05)] md:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{isZh ? '当前原则' : 'Current Principles'}</p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{isZh ? '先确认，再支付' : 'Confirm First, Pay Second'}</h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-[var(--color-muted)]">
            {principles.map((item, index) => (
              <p key={index}>• {item}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href={withLang('/contact', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-navy-soft)]">
              {isZh ? '先联系确认需求' : 'Contact Us First'}
            </Link>
            <Link href={withLang('/contact#inquiry-form', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
              {isZh ? '先提交咨询表单' : 'Submit an Inquiry First'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
