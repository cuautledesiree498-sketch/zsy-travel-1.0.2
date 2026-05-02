import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLinks from '@/components/LegalLinks';
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/contact';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const CONTACT_EMAIL = 'contact@infinitravel.net';
type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

export async function generateMetadata({ searchParams }: { searchParams: SearchParamsInput }): Promise<Metadata> {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  return {
    title: lang === 'zh' ? '退款与取消政策 - 无限旅途' : 'Refund & Cancellation Policy - Infinite Travel',
    description: lang === 'zh'
      ? '查看无限旅途退款与取消政策，了解确认服务、供应商规则、已发生费用和付款渠道对退款取消处理的影响。'
      : 'Review the Infinite Travel refund and cancellation policy to understand how confirmed services, supplier rules, incurred costs, and payment channels affect handling.',
  };
}

export default async function RefundPolicyPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const isZh = lang === 'zh';
  const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage(lang));

  const intro = isZh
    ? '本退款与取消政策是旅行规划及已安排服务的参考框架。最终处理以双方确认的服务条款、合同或书面确认单、实际已发生费用及供应商规则为准。'
    : 'This Refund & Cancellation Policy is a reference framework for travel planning and arranged services. The final handling is subject to the confirmed service terms, contract or written confirmation, actual incurred costs, and supplier rules.';

  const sections = isZh
    ? [
        {
          title: '政策性质',
          items: [
            '本政策为网站层面的参考框架，不构成统一固定退款承诺。',
            '具体取消、变更和退款处理，以双方确认的服务条款、合同或书面确认单、实际已发生费用及供应商规则为准。',
          ],
        },
        {
          title: '取消时间原则',
          items: [
            '随着出发日期临近，酒店、交通、导游、景区、活动供应商及其他服务方可能已经预留资源或产生不可退费用，因此取消扣费可能逐步增加。',
            '一般情况下，出发前 30 天以上取消可能产生较低扣费；出发前 15–30 天、7–14 天、3–7 天或 72 小时内取消，扣费比例可能逐步提高；行程开始后取消或未出现，可能产生较高甚至全部扣费。实际金额以确认安排和供应商规则为准。',
          ],
        },
        {
          title: '可能不可退项目',
          items: [
            '可能不可退的项目包括已出票机票、火车票、景区门票、酒店预付款、车导预留费、活动场地费、研学课程费、第三方供应商不可退费用、规划或服务费、支付手续费和汇款手续费等。',
            '可退金额通常需扣除已发生且不可退费用后，根据确认安排和供应商规则计算。',
          ],
        },
        {
          title: '改期',
          items: [
            '是否可以改期取决于酒店、交通、导游、景区、活动及供应商资源情况。',
            '由改期产生的差价、额外费用或已发生费用，将根据确认安排、变更原因及供应商规则处理。',
          ],
        },
        {
          title: '不可抗力',
          items: [
            '如发生极端天气、自然灾害、公共卫生事件、政策变化、交通管制、景区临时关闭、战争、罢工或其他不可合理控制事件，我们会优先尝试调整行程。',
            '如无法调整，将尽量协调供应商退款，并在扣除已发生且不可退费用后处理可退部分；仍无法解决的，由双方继续协商处理。',
          ],
        },
        {
          title: '退款时间',
          items: [
            '退款到账时间可能受支付渠道、银行、平台、币种及个案复杂程度影响。',
            '跨币种或跨境支付的汇率、平台费、银行费用或汇款费用，可能根据实际安排处理。',
          ],
        },
        {
          title: '供应商规则与确认文件优先',
          items: [
            '酒店、交通、门票、导游、活动、研学机构及其他第三方供应商可能适用各自的取消或退款规则。',
            '如本页面内容与双方确认的合同、书面确认单或供应商规则不一致，以已确认文件和供应商规则为准。',
          ],
        },
        {
          title: '联系方式',
          items: [`如需进一步确认，请发送邮件至：${CONTACT_EMAIL}`],
        },
      ]
    : [
        {
          title: 'Reference Nature',
          items: [
            'This policy is a website-level reference framework and does not create a universal fixed refund promise.',
            'Specific cancellation, change, and refund handling is subject to the confirmed service terms, contract or written confirmation, actual incurred costs, and supplier rules.',
          ],
        },
        {
          title: 'Cancellation Timing Principle',
          items: [
            'Cancellation fees may increase as the departure date approaches because hotels, transport providers, guides, attractions, activity operators, and other suppliers may already have reserved resources or charged non-refundable costs.',
            'As a general reference, cancellations made more than 30 days before departure may involve lower deductions; cancellations within 15–30 days, 7–14 days, 3–7 days, or within 72 hours may involve progressively higher deductions; cancellations after the trip starts or no-shows may result in substantial or full deductions. The actual amount depends on the confirmed arrangement and supplier rules.',
          ],
        },
        {
          title: 'Potential Non-Refundable Items',
          items: [
            'Potentially non-refundable items may include issued flight tickets, train tickets, attraction tickets, hotel prepayments, car or guide reservations, activity venue fees, educational course fees, third-party supplier non-refundable charges, planning or service fees, payment fees, and remittance fees.',
            'Refundable amounts are usually calculated after deducting actual incurred and non-refundable costs, depending on the confirmed arrangement and supplier rules.',
          ],
        },
        {
          title: 'Rescheduling',
          items: [
            'Rescheduling may be possible depending on hotel, transport, guide, attraction, activity, and supplier availability.',
            'Any price difference, extra supplier cost, or already incurred cost will be handled according to the confirmed arrangement, the reason for the change, and supplier rules.',
          ],
        },
        {
          title: 'Force Majeure',
          items: [
            'For events beyond reasonable control, such as extreme weather, natural disasters, public health events, policy changes, traffic control, attraction closures, war, strikes, or similar events, we will first try to adjust the itinerary.',
            'If adjustment is not possible, we will coordinate with suppliers where possible and handle refunds after deducting actual incurred and non-refundable costs. If needed, the parties will continue to resolve the matter by mutual discussion.',
          ],
        },
        {
          title: 'Refund Processing Time',
          items: [
            'Refund processing time may vary depending on the payment channel, bank, platform, currency, and case complexity.',
            'Exchange rates, platform fees, bank fees, or remittance fees for cross-currency or cross-border payments may be handled according to the actual arrangement.',
          ],
        },
        {
          title: 'Supplier Rules and Confirmation Priority',
          items: [
            'Hotels, transport, tickets, guides, activities, educational institutions, and other third-party suppliers may apply their own cancellation or refund rules.',
            'If this page differs from a confirmed contract, written confirmation, or supplier rule, the confirmed document and supplier rule will prevail.',
          ],
        },
        {
          title: 'Contact',
          items: [`For clarification, please contact: ${CONTACT_EMAIL}`],
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
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{isZh ? '如果你还需要查看服务条款、隐私说明或直接发起咨询，可以继续使用以下入口。' : 'If you also want to review our terms, privacy page, or move into inquiry, continue from the links below.'}</p>
          <LegalLinks lang={lang} className="mt-6 space-y-3 text-sm text-[var(--color-slate)]" />
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 mr-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[#1f9f55] transition hover:text-[#167c42]">
            WhatsApp
          </a>
          <Link href={withLang('/contact#inquiry-form', lang)} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
            {isZh ? '提交咨询' : 'Submit an Inquiry'}
          </Link>
        </div>
      </section>
    </div>
  );
}
