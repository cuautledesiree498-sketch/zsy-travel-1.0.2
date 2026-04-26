import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import LegalLinks from '@/components/LegalLinks';
import { withLang, normalizeLang } from '@/lib/i18n';
import { buildBreadcrumbJsonLd, buildLocalizedAlternates, toAbsoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

export async function generateMetadata({ searchParams }: { searchParams: SearchParamsInput }): Promise<Metadata> {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const title = lang === 'zh' ? '支付说明 | 无限旅途' : 'Payment Guidance | Infinite Travel';
  const description = lang === 'zh'
    ? '定制旅行支付说明。支付方式、币种与金额以已确认行程、服务范围和书面确认为准。'
    : 'Payment guidance for custom travel planning. Payment method, currency and amount depend on confirmed itinerary, service scope and written confirmation.';
  const alternates = buildLocalizedAlternates('/payment', lang);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(alternates.canonical),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function PaymentPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const isZh = lang === 'zh';

  const pageTitle = isZh ? '付款前，我们会先把事情确认清楚' : 'Before Payment, We Make the Important Parts Clear';
  const pageSubtitle = isZh
    ? '如果路线、日期、人数、服务范围这些关键部分还没说清楚，我们不会急着让你付款。先把该确认的内容确认好，再进入对应的支付安排，会更稳。'
    : 'If the route, dates, traveler details, and service scope are still unclear, we do not rush you into payment. We first make the important parts clear, then move into the right payment arrangement.';

  const scenarios = isZh
    ? [
        { title: '咨询后确认定金', desc: '当路线方向、出行时间和服务范围已经明确时，才会进入定金确认阶段。' },
        { title: '订单确认后的尾款安排', desc: '在订单结构、执行方式和费用明细确认后，再安排后续付款。' },
        { title: '定制服务或特殊项目费用', desc: '对于更复杂的私人定制、接待或多城市组合项目，我们会先沟通清楚，再确认支付方式。' },
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

  const paymentFlow = isZh
    ? ['提交咨询并确认大致方向', '沟通路线、服务范围和报价', '书面确认单或适用合同确认', '按确认安排支付定金或全款', '进入预订执行和出行前确认', '如适用，再支付尾款']
    : ['Inquiry and basic travel direction', 'Route, service scope, and quotation discussion', 'Written confirmation or applicable contract', 'Deposit or full payment according to the confirmed arrangement', 'Booking execution and pre-trip confirmation', 'Final balance if applicable'];

  const paymentDetails = isZh
    ? [
        {
          title: '可用支付方式',
          body: '可用方式可能包括 PingPong、银行转账、支付宝、微信支付和现金。最终方式会根据确认安排、币种、付款方所在地和服务类型确定。',
        },
        {
          title: '币种',
          body: '支持币种可包括人民币、美元、欧元、英镑和港币。汇率、银行费用、平台费用和跨境汇款费用可能因支付渠道和日期而不同。',
        },
        {
          title: '定金与尾款',
          body: '定金可能为 10%、50% 或视项目而定。部分简单安排可能在确认后一次性付清。尾款可能在出发前 7 天、行程开始前、订单确认后或按确认安排支付。',
        },
        {
          title: '收据与发票',
          body: '付款后通常可提供电子收据或付款确认。发票处理取决于支付方式、税务安排和确认后的服务结构。',
        },
      ]
    : [
        {
          title: 'Available Payment Methods',
          body: 'Available methods may include PingPong, bank transfer, Alipay, WeChat Pay, and cash. The final method depends on the confirmed arrangement, currency, payer location, and service type.',
        },
        {
          title: 'Currencies',
          body: 'Supported currencies may include RMB, USD, EUR, GBP, and HKD. Exchange rates, bank fees, platform fees, and cross-border remittance fees may vary by payment channel and date.',
        },
        {
          title: 'Deposit and Final Balance',
          body: 'A deposit may be 10%, 50%, or project-dependent. Some simple arrangements may require full payment after confirmation. Final balance may be due 7 days before departure, before the trip starts, upon order confirmation, or according to the confirmed arrangement.',
        },
        {
          title: 'Receipt / Invoice',
          body: 'An electronic receipt or payment confirmation can usually be provided after payment. Invoice handling depends on the payment method, tax arrangement, and confirmed service structure.',
        },
      ];

  const principles = isZh
    ? ['未确认前，不建议直接付款。', '支付方式以双方沟通确认后的安排为准。', '当前页面不展示伪支付按钮，也不引导未确认状态下直接付款。']
    : ['We do not recommend paying before the details are confirmed.', 'The actual payment method depends on the confirmed arrangement after consultation.', 'This page does not show fake payment buttons or push unconfirmed payments.'];
  const policyNotes = isZh
    ? ['支付安排以确认后的订单文件为准。', '付款不会取代双方确认的合同、书面确认单、供应商规则或已确认服务条款。', '取消与退款处理以已确认内容和供应商规则为准。', '咨询信息的使用方式请参见隐私政策。']
    : ['Payment arrangements depend on the confirmed booking documents.', 'Payment does not override the confirmed contract, written confirmation, supplier rules, or confirmed service terms.', 'Cancellation and refund handling depends on the confirmed terms and supplier rules.', 'How inquiry information is used is explained in the Privacy Policy.'];
  const contractPaymentNote = isZh
    ? {
        title: '合同与付款说明',
        body: '当路线、服务范围、金额和执行方式确认后，如该行程适用旅游合同模板，我们会在进入对应付款节点前提供给你确认。当前页面只说明流程，不替代正式合同。最终条款以双方确认并签署的合同为准。',
      }
    : {
        title: 'Contract & Payment Note',
        body: 'After the route, service scope, pricing, and execution method are confirmed, we can provide the relevant travel contract template before the related payment step when one applies. This page explains the process only and does not replace a formal contract. The final terms are subject to the contract confirmed and signed by both parties.',
      };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: isZh ? '首页' : 'Home', url: withLang('/', lang) },
    { name: isZh ? '支付说明' : 'Payment Guidance', url: withLang('/payment', lang) },
  ]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <JsonLd id="payment-breadcrumb-jsonld" data={breadcrumbJsonLd} />
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
        <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_20px_60px_rgba(10,27,52,0.05)] md:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{isZh ? '付款流程' : 'Payment Flow'}</p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{isZh ? '从咨询到付款，通常按这个顺序推进' : 'From Inquiry to Payment, This Is the Usual Order'}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {paymentFlow.map((item, index) => (
              <div key={item} className="rounded-[1.4rem] border border-[rgba(10,27,52,0.08)] bg-[#f8fbff] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">{isZh ? `步骤 ${index + 1}` : `Step ${index + 1}`}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {paymentDetails.map((item) => (
            <section key={item.title} className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_20px_60px_rgba(10,27,52,0.05)] md:p-9">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{item.title}</h2>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">{item.body}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_20px_60px_rgba(10,27,52,0.06)] md:p-10">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{isZh ? '支付前确认' : 'Before Payment'}</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{isZh ? '付款前，我们通常会先看清这几件事' : 'Before Payment, These Are Usually the First Things We Check'}</h2>
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
          <h2 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{isZh ? '为什么我们不建议一开始就付款' : 'Why We Do Not Recommend Paying Too Early'}</h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-[var(--color-muted)]">
            {principles.map((item, index) => (
              <p key={index}>• {item}</p>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-white p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-navy)]">{isZh ? '相关政策' : 'Related Policies'}</p>
            <div className="mt-4 rounded-[1.25rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-navy)]">{contractPaymentNote.title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{contractPaymentNote.body}</p>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              {policyNotes.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </div>
            <LegalLinks lang={lang} className="mt-5 space-y-3 text-sm text-[var(--color-slate)]" />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href={withLang('/contact', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-navy-soft)]">
              {isZh ? '先把需求聊清楚' : 'Talk Through the Details First'}
            </Link>
            <Link href={withLang('/contact#inquiry-form', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
              {isZh ? '准备好了就发咨询' : 'Send an Inquiry When You Are Ready'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
