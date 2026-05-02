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
    title: lang === 'zh' ? '服务条款 - 无限旅途' : 'Terms & Conditions - Infinite Travel',
    description: lang === 'zh'
      ? '查看无限旅途服务条款，了解网站访问、咨询、路线规划、预订沟通与相关服务的适用说明。'
      : 'Review the Infinite Travel terms that apply to website use, inquiries, itinerary planning, booking communication, and related services.',
  };
}

export default async function TermsPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const isZh = lang === 'zh';
  const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage(lang));

  const intro = isZh
    ? '本服务条款用于说明无限旅途 / Infinite Travel 在旅行规划、报价、确认、付款、取消及相关服务沟通中的基本规则。本文为网站层面的通用说明，最终安排以双方确认的合同、书面确认单、报价及供应商规则为准。'
    : 'These Terms & Conditions explain how Infinite Travel handles travel planning, quotations, confirmations, payments, cancellations, and related service communication. They are a general website-level reference. The final arrangement is subject to the contract, written confirmation, quotation, and supplier rules confirmed by both parties.';

  const sections = isZh
    ? [
        {
          title: '适用范围',
          items: [
            '本条款适用于你访问本网站、提交咨询，以及与无限旅途 / Infinite Travel 进行的旅行规划、报价、确认、付款、取消及相关服务沟通。',
            '本文为通用说明，具体服务内容和执行标准以双方确认的合同或书面确认单为准。',
          ],
        },
        {
          title: '服务范围',
          items: [
            '无限旅途可协助提供行程规划、路线设计、酒店预订与酒店区域建议、用车安排、接送机、国内交通协助、景区门票协助、导游或双语陪同协调、餐厅建议与预订协助、商务接待、研学旅行、亲子旅行、高端私人定制、目的地咨询、旅拍或跟拍等服务。',
            '具体服务项目、语言支持、执行方式和费用，以确认后的服务条款为准。',
          ],
        },
        {
          title: '报价与可用性',
          items: [
            '报价可能受出行日期、淡旺季、酒店房态、车导资源、汇率、节假日、供应商价格及最终服务范围影响。',
            '报价不等同于资源锁定，相关安排需在确认后方可执行。',
          ],
        },
        {
          title: '订单确认与付款',
          items: [
            '旅行需求通常在双方确认服务范围、报价、合同或书面确认单，并完成约定付款条件后，才视为正式确认安排。',
            '定金、尾款时间、支付方式、币种、汇率、平台费用、发票或收据处理，可能视具体安排而定。',
          ],
        },
        {
          title: '客户责任',
          items: [
            '客户应提供真实准确的个人信息、出行日期、人数、航班或交通信息、健康或饮食需求、必要证件信息及会影响行程的变更信息。',
            '客户应遵守相关法律法规、入境要求、当地习俗和约定集合时间，并按确认安排完成付款、确认与出行配合。',
          ],
        },
        {
          title: '第三方供应商',
          items: [
            '部分服务可能由酒店、车队、导游、翻译、景区、活动供应商、研学机构、支付服务商及其他合作服务方提供或协助。',
            '其资源可用性、取消规则和不可退费用可能影响最终安排。',
          ],
        },
        {
          title: '变更、取消与退款',
          items: [
            '具体变更、取消与退款安排，请结合退款与取消政策理解。',
            '最终处理以双方确认的合同或书面确认单、实际已发生费用及供应商规则为准。',
          ],
          link: { href: '/refund-policy', label: '查看退款与取消政策' },
        },
        {
          title: '限制与不承诺事项',
          items: [
            '无限旅途不保证签证结果、天气情况、交通绝对准点、景点持续开放或未确认第三方资源的可用性。',
            '因客户提供信息不准确、个人购物行为、个人违法行为或不可合理控制情形造成的损失，不应由无限旅途承担。',
          ],
        },
        {
          title: '合同与书面确认优先',
          items: [
            '如本页面内容与双方签署的合同、书面确认单或已确认供应商规则不一致，以签署或书面确认的安排为准。',
            '未写明事项可在后续确认文件中补充。',
          ],
        },
        {
          title: '法律适用与争议',
          items: [
            '争议应优先通过友好协商解决。',
            '协商不成的，可依据中华人民共和国法律或双方确认文件中约定的法律及争议解决方式处理。',
          ],
        },
        {
          title: '联系方式',
          items: [`如需联系，请发送邮件至：${CONTACT_EMAIL}`, '常规沟通时间为 9:00–19:00，中文和英文沟通均可支持。'],
        },
      ]
    : [
        {
          title: 'Who These Terms Apply To',
          items: [
            'These terms apply to your use of this website, submitted inquiries, travel planning, quotations, confirmations, payments, cancellations, and related service communication with Infinite Travel.',
            'They are a general reference. The specific service content and execution standards are subject to the confirmed contract or written confirmation.',
          ],
        },
        {
          title: 'Service Scope',
          items: [
            'Infinite Travel may assist with itinerary planning, route design, hotel booking and hotel-area advice, private car arrangements, airport transfers, domestic transport assistance, attraction ticket assistance, guide or bilingual escort coordination, restaurant suggestions, business reception, educational travel, family trips, premium private customization, destination consulting, and travel photography support.',
            'The exact services, language support, delivery method, and fees are handled as agreed in the confirmed service terms.',
          ],
        },
        {
          title: 'Pricing and Availability',
          items: [
            'Quotations may depend on travel dates, seasonality, hotel availability, vehicle and guide resources, exchange rates, holidays, supplier pricing, and the final confirmed service scope.',
            'A quotation is not a guarantee of availability until the relevant arrangements are confirmed.',
          ],
        },
        {
          title: 'Order Confirmation and Payment',
          items: [
            'A travel request becomes a confirmed arrangement only after the service scope, quotation, contract or written confirmation, and agreed payment terms are confirmed by both parties.',
            'Deposit, final balance timing, payment method, currency, exchange rate, platform fee, invoice, and receipt handling may vary by arrangement.',
          ],
        },
        {
          title: 'Customer Responsibilities',
          items: [
            'Customers are responsible for providing accurate personal information, travel dates, traveler numbers, flight or transport details, health or dietary notes, document information where required, and any changes that may affect the itinerary.',
            'Customers are also responsible for complying with applicable laws, entry requirements, local customs, agreed meeting times, and confirmed payment or travel steps.',
          ],
        },
        {
          title: 'Third-Party Suppliers',
          items: [
            'Some services may be provided or supported by third-party suppliers such as hotels, transport providers, guides, translators, attractions, activity operators, educational institutions, payment providers, and other service partners.',
            'Their availability, cancellation rules, and non-refundable costs may affect the final arrangement.',
          ],
        },
        {
          title: 'Changes, Cancellations, and Refunds',
          items: [
            'Please read this together with our Refund & Cancellation Policy.',
            'Final handling is subject to the confirmed contract or written confirmation, actual incurred costs, and the relevant supplier rules.',
          ],
          link: { href: '/refund-policy', label: 'View Refund & Cancellation Policy' },
        },
        {
          title: 'Limits and Non-Guarantees',
          items: [
            'Infinite Travel does not guarantee visa results, weather conditions, absolute transport punctuality, continuous attraction availability, or unconfirmed third-party resources.',
            'We are not responsible for losses caused by inaccurate information provided by the customer, personal shopping decisions, personal unlawful behavior, or circumstances beyond reasonable control.',
          ],
        },
        {
          title: 'Contract and Written Confirmation Priority',
          items: [
            'If there is any inconsistency between this website page and a signed contract, written confirmation, or confirmed supplier rule, the signed or written arrangement will prevail.',
            'Matters not described here may be clarified in later confirmation documents.',
          ],
        },
        {
          title: 'Applicable Law and Disputes',
          items: [
            'Disputes should first be handled through friendly communication.',
            'If no agreement can be reached, the matter may be handled under the laws of the People’s Republic of China or the law or forum agreed in the confirmed document.',
          ],
        },
        {
          title: 'Contact',
          items: [`For questions, please contact: ${CONTACT_EMAIL}`, 'Regular communication hours are 9:00–19:00. Chinese and English communication are supported.'],
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
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold text-[var(--color-navy)] md:text-7xl">{isZh ? '服务条款' : 'Terms & Conditions'}</h1>
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
              {section.link ? (
                <Link href={withLang(section.link.href, lang)} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
                  {section.link.label}
                </Link>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-6xl rounded-[1.9rem] border border-[rgba(10,27,52,0.08)] bg-[#f8fbff] p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)] md:p-9">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{isZh ? '继续查看' : 'Continue'}</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{isZh ? '如需继续看隐私、退款取消或直接发起咨询，可从以下入口继续。' : 'If you want to review privacy, cancellations, or move into inquiry, continue from the links below.'}</p>
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
