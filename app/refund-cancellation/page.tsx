import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLinks from '@/components/LegalLinks';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const CONTACT_EMAIL = '1484818239@qq.com';
type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

export async function generateMetadata({ searchParams }: { searchParams: SearchParamsInput }): Promise<Metadata> {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  return {
    title: lang === 'zh' ? '退款与取消政策 - 无限旅途' : 'Refund & Cancellation Policy - Infinite Travel',
    description: lang === 'zh'
      ? '查看无限旅途退款与取消政策，了解已确认服务的取消、变更、退款和处理流程。'
      : 'Review the Infinite Travel refund and cancellation policy for confirmed services, including changes, refunds, and handling steps.',
  };
}

export default async function RefundCancellationPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const isZh = lang === 'zh';

  const intro = isZh
    ? '本页为通用说明。具体取消、变更与退款安排，以订单确认文件、供应商规则和双方确认内容为准。'
    : 'This page provides general guidance only. Specific cancellation, change, and refund handling depends on the confirmed booking documents, supplier rules, and the arrangements confirmed by both parties.';

  const sections = isZh
    ? [
        {
          title: '适用范围',
          items: ['适用于已确认的定制旅行、路线规划、预订协助及相关服务。'],
        },
        {
          title: '付款前取消',
          items: ['仅提交咨询、尚未确认订单或尚未付款时，通常不产生退款问题。'],
        },
        {
          title: '付款后取消',
          items: [
            '付款后取消的处理，可能取决于已发生费用、第三方供应商规则、取消时间和服务进度。',
            '具体比例、期限或费用安排，应以后续确认文件和实际订单情况为准。',
          ],
        },
        {
          title: '不可退款项目',
          items: [
            '已发生或第三方不可退费用，可能无法退款。',
            '例如酒店预付款、门票、交通票、车导资源、活动费用、支付或汇款手续费，以及规划服务费等。',
          ],
        },
        {
          title: '改期与变更',
          items: [
            '我们可视资源情况协助协调改期或调整。',
            '如产生额外费用，可能由客户承担，或由双方另行确认。',
          ],
        },
        {
          title: '供应商或不可抗力',
          items: [
            '如遇天气、政策、景区关闭、交通管制、自然灾害或公共卫生事件等情况，我们会优先协调调整。',
            '退款结果取决于供应商规则和已发生费用。',
          ],
        },
        {
          title: '退款流程',
          items: [
            '客户需通过官方联系渠道提出申请。',
            '我们会核对订单、已发生费用和供应商规则后处理。',
            '到账时间还会受到支付平台和银行处理进度影响。',
          ],
        },
        {
          title: '联系方式',
          items: [`如需联系，请发送邮件至：${CONTACT_EMAIL}`],
        },
      ]
    : [
        {
          title: 'Scope',
          items: ['This policy applies to confirmed tailor-made travel services, itinerary planning, booking assistance, and related services.'],
        },
        {
          title: 'Cancellation Before Payment',
          items: ['If only an inquiry has been submitted and no booking or payment has been confirmed, a refund issue usually does not arise.'],
        },
        {
          title: 'Cancellation After Payment',
          items: [
            'Handling after payment may depend on costs already incurred, third-party supplier rules, timing of cancellation, and service progress.',
            'Any specific percentage, period, or charge should be confirmed later in the relevant booking documents and order details.',
          ],
        },
        {
          title: 'Non-Refundable Items',
          items: [
            'Costs already incurred or made non-refundable by third parties may not be refundable.',
            'Examples may include hotel prepayments, attraction tickets, transport tickets, vehicle or guide allocations, activity fees, payment or transfer charges, and planning fees.',
          ],
        },
        {
          title: 'Rescheduling and Changes',
          items: [
            'We may help coordinate changes or rescheduling subject to availability.',
            'Any additional costs may be payable by the traveler or confirmed separately by both parties.',
          ],
        },
        {
          title: 'Suppliers and Force Majeure',
          items: [
            'If weather, policy changes, attraction closures, traffic controls, natural disasters, or public health events affect the trip, we will prioritize adjustment where possible.',
            'Any refund outcome depends on supplier rules and costs already incurred.',
          ],
        },
        {
          title: 'Refund Process',
          items: [
            'Requests should be submitted through our official contact channels.',
            'We review the order, incurred costs, and supplier rules before handling the request.',
            'The final arrival time of any refund also depends on payment platform and banking timelines.',
          ],
        },
        {
          title: 'Contact',
          items: [`For questions, please contact: ${CONTACT_EMAIL}`],
        },
      ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <section className="px-6 py-24 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Link href={withLang('/', lang)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            {isZh ? '← 返回首页' : '← Back to Home'}
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">{isZh ? '法务' : 'Legal'}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold text-[var(--color-navy)] md:text-7xl">{isZh ? '退款与取消政策' : 'Refund & Cancellation Policy'}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">{intro}</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[1.9rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)] md:p-9">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{section.title}</h2>
              <div className="mt-5 space-y-3 text-base leading-8 text-[var(--color-muted)]">
                {section.items.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-6xl rounded-[1.9rem] border border-[rgba(10,27,52,0.08)] bg-[#f8fbff] p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)] md:p-9">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{isZh ? '继续查看' : 'Continue'}</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{isZh ? '如需继续看服务条款、隐私政策，或直接提交咨询确认你的安排，可以从以下入口继续。' : 'If you want to continue into terms, privacy, or submit an inquiry for your own arrangements, use the links below.'}</p>
          <LegalLinks lang={lang} className="mt-6 space-y-3 text-sm text-[var(--color-slate)]" />
          <Link href={withLang('/contact#inquiry-form', lang)} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
            {isZh ? '提交咨询' : 'Submit an Inquiry'}
          </Link>
        </div>
      </section>
    </div>
  );
}
