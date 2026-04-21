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

  const intro = isZh
    ? '这些条款适用于你对本网站的访问，以及与我们之间发生的咨询、路线规划、预订沟通与相关服务。'
    : 'These terms apply to your use of this website, as well as inquiries, itinerary planning, booking communications, and related services provided by us.';

  const sections = isZh
    ? [
        {
          title: '服务性质',
          items: [
            '我们提供中国旅行咨询、路线设计、定制旅行安排与相关协调支持。',
            '具体服务范围以双方确认的报价单、行程单、确认邮件或合同为准。',
          ],
        },
        {
          title: '咨询与预订流程',
          items: [
            '提交咨询不等于订单成立。',
            '订单通常在双方确认服务范围、价格、付款安排并完成约定付款后成立。',
            '未写明的具体预订规则，可在后续确认文件中补充。',
          ],
        },
        {
          title: '报价与可用性',
          items: [
            '报价可能受酒店、交通、供应商资源、季节和汇率等因素影响。',
            '在订单确认前，我们不保证价格或资源持续可用。',
          ],
        },
        {
          title: '客户责任',
          items: [
            '提供真实、准确、完整的出行与身份信息。',
            '自行确认护照、签证、保险、健康状况和入境要求。',
            '遵守中国及相关目的地的法律法规。',
            '按时完成付款、确认与出行安排。',
          ],
        },
        {
          title: '第三方供应商',
          items: [
            '酒店、交通、导游、景区、支付平台等服务可能由第三方提供。',
            '第三方规则可能影响变更、取消、退款和最终执行。',
          ],
        },
        {
          title: '变更、取消与退款',
          items: [
            '具体变更、取消与退款安排，请结合退款与取消政策理解。',
            '最终处理以已确认订单文件及相关供应商规则为准。',
          ],
          link: { href: '/refund-cancellation', label: '查看退款与取消政策' },
        },
        {
          title: '责任限制',
          items: [
            '我们不承诺天气、交通绝对准点、景点持续开放或签证结果。',
            '对于客户个人行为、违法行为或未提供准确信息导致的损失，我们不承担相应责任。',
          ],
        },
        {
          title: '知识产权',
          items: [
            '网站中的文字、图片、页面设计和相关内容受适用法律保护。',
            '未经授权，不得复制、转载、改编或用于商业用途。',
          ],
        },
        {
          title: '法律适用与争议',
          items: [
            '双方应优先通过友好协商解决争议。',
            '未尽事项以双方后续确认文件和适用法律为准。',
          ],
        },
        {
          title: '联系方式',
          items: [`如需联系，请发送邮件至：${CONTACT_EMAIL}`],
        },
      ]
    : [
        {
          title: 'Nature of Services',
          items: [
            'We provide China travel consultation, itinerary design, tailor-made trip arrangements, and related coordination support.',
            'The exact service scope is defined by the quotation, itinerary, confirmation email, or contract agreed by both parties.',
          ],
        },
        {
          title: 'Inquiry and Booking Process',
          items: [
            'Submitting an inquiry does not create a booking.',
            'A booking is usually formed only after the service scope, price, payment arrangement, and required payment are confirmed.',
            'Any detailed booking rules not yet confirmed may be clarified in later documents.',
          ],
        },
        {
          title: 'Pricing and Availability',
          items: [
            'Pricing may change due to hotels, transport, supplier inventory, seasonality, currency movement, and related factors.',
            'Until confirmation, prices and availability are not guaranteed.',
          ],
        },
        {
          title: 'Customer Responsibilities',
          items: [
            'Provide accurate and complete travel and identity information.',
            'Check passports, visas, insurance, health conditions, and entry requirements.',
            'Comply with applicable local laws and regulations.',
            'Complete payment, confirmation, and travel steps on time.',
          ],
        },
        {
          title: 'Third-Party Suppliers',
          items: [
            'Hotels, transport, guides, attractions, and payment services may be provided by third parties.',
            'Their rules may affect changes, cancellations, refunds, and service execution.',
          ],
        },
        {
          title: 'Changes, Cancellations, and Refunds',
          items: [
            'Please read this together with our Refund & Cancellation Policy.',
            'Final handling depends on confirmed booking documents and the relevant supplier rules.',
          ],
          link: { href: '/refund-cancellation', label: 'View Refund & Cancellation Policy' },
        },
        {
          title: 'Limitation of Liability',
          items: [
            'We do not guarantee weather conditions, exact transport timing, attraction availability, or visa outcomes.',
            'We are not responsible for losses caused by personal conduct, unlawful acts, or inaccurate information supplied by the traveler.',
          ],
        },
        {
          title: 'Intellectual Property',
          items: [
            'The website text, images, layout, and related content are protected by applicable law.',
            'They may not be copied, republished, adapted, or used commercially without permission.',
          ],
        },
        {
          title: 'Applicable Law and Disputes',
          items: [
            'The parties should first seek an amicable resolution.',
            'Any matter not covered here is subject to later confirmation documents and applicable law.',
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
          <Link href={withLang('/contact#inquiry-form', lang)} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
            {isZh ? '提交咨询' : 'Submit an Inquiry'}
          </Link>
        </div>
      </section>
    </div>
  );
}
