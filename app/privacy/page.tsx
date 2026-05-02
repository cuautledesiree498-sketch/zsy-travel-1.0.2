import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLinks from '@/components/LegalLinks';
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/contact';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const CONTACT_EMAIL = '1484818239@qq.com';
type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

export async function generateMetadata({ searchParams }: { searchParams: SearchParamsInput }): Promise<Metadata> {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  return {
    title: lang === 'zh' ? '隐私政策 - 无限旅途' : 'Privacy Policy - Infinite Travel',
    description: lang === 'zh'
      ? '查看无限旅途隐私政策，了解我们收集、使用、共享、保存和保护咨询信息的方式。'
      : 'Review the Infinite Travel privacy policy to understand how inquiry information is collected, used, shared, stored, and protected.',
  };
}

export default async function PrivacyPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const isZh = lang === 'zh';
  const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage(lang));

  const intro = isZh
    ? '本隐私政策说明无限旅途 / Infinite Travel 如何收集、使用、共享和保存你通过网站或旅行规划沟通中提供的信息。'
    : 'This Privacy Policy explains how Infinite Travel collects, uses, shares, and stores information submitted through the website or during travel planning communication.';

  const sections = isZh
    ? [
        {
          title: '我们收集的信息',
          items: [
            '我们可能收集你的姓名、邮箱、WhatsApp 或其他联系方式。',
            '我们也可能收集目的地偏好、出行日期、出行人数、预算范围、酒店偏好、特殊需求以及你主动填写的备注信息。',
          ],
        },
        {
          title: '信息使用目的',
          items: [
            '我们会将这些信息用于回复咨询、设计路线、提供报价、确认安排、沟通付款或服务细节、进行售后跟进。',
            '在允许的情况下，我们也可能用于发送相关旅行信息或后续旅行更新。',
          ],
        },
        {
          title: '信息共享',
          items: [
            '为完成已确认或正在沟通的行程安排，我们可能在必要范围内向酒店、交通服务方、导游、翻译、景区、活动供应商、研学机构、支付服务商、邮件服务商、网站托管服务商、数据分析服务商共享相关信息。',
            '根据法律要求，我们也可能向政府或监管机构提供必要信息。',
          ],
        },
        {
          title: '营销与跟进联系',
          items: [
            '如我们发送旅行资讯或营销信息，你可以要求停止此类联系。',
            '常规服务沟通、订单确认、付款沟通和售后支持可能仍会根据具体安排继续进行。',
          ],
        },
        {
          title: '数据保存',
          items: [
            '我们仅会在处理咨询、服务安排、售后支持、财务记录、法律义务或合理业务目的所需期间保存相关信息。',
          ],
        },
        {
          title: '数据安全',
          items: [
            '我们会采取合理措施保护所持有的信息，并尽量限制仅由有业务需要的人员或服务方访问。',
            '但互联网传输和存储无法保证绝对安全。',
          ],
        },
        {
          title: 'Cookies 与分析',
          items: [
            '网站可能使用基础 cookie、托管服务日志或分析工具来改善体验和运营。',
            '如果未来引入新的分析服务，我们会相应更新本政策。',
          ],
        },
        {
          title: '跨境服务说明',
          items: [
            '由于我们可能服务海外客户并使用不同地区的服务提供商，你的信息可能在中国及相关服务商所在地被处理。',
          ],
        },
        {
          title: '用户权利',
          items: [
            '你可以要求查询个人信息、更正不准确信息、在适用情况下撤回授权，或停止营销联系。',
          ],
        },
        {
          title: '联系方式',
          items: [`如需联系，请发送邮件至：${CONTACT_EMAIL}`],
        },
      ]
    : [
        {
          title: 'Information We Collect',
          items: [
            'We may collect your name, email address, WhatsApp or other contact details.',
            'We may also collect destination preferences, travel dates, number of travelers, budget range, hotel preferences, special requirements, and any notes you choose to provide.',
          ],
        },
        {
          title: 'How We Use Information',
          items: [
            'We use this information to respond to your inquiry, prepare route suggestions, provide quotations, confirm arrangements, communicate payment or service details, and support after-sales communication.',
            'Where allowed, we may also use it to send relevant travel updates or future travel information.',
          ],
        },
        {
          title: 'Information Sharing',
          items: [
            'Where necessary for a confirmed or requested itinerary, we may share relevant information with hotels, transport providers, guides, translators, attractions, activity suppliers, educational institutions, payment providers, email service providers, hosting providers, and analytics providers.',
            'Where required by law, we may also share necessary information with government or regulatory authorities.',
          ],
        },
        {
          title: 'Marketing and Follow-Up Contact',
          items: [
            'If we send travel updates or marketing messages, you may ask us to stop such contact.',
            'Service communication, order confirmation, payment communication, and after-sales support may continue depending on the specific arrangement.',
          ],
        },
        {
          title: 'Data Retention',
          items: [
            'We retain information only for as long as needed for inquiry handling, service arrangement, after-sales support, finance records, legal obligations, or legitimate business purposes.',
          ],
        },
        {
          title: 'Data Security',
          items: [
            'We use reasonable measures to protect the information we hold and aim to limit access to people or service providers with a business need.',
            'However, no internet transmission or storage method can be guaranteed as absolutely secure.',
          ],
        },
        {
          title: 'Cookies and Analytics',
          items: [
            'The site may use basic cookies, hosting logs, or analytics tools to improve user experience and operations.',
            'If additional analytics services are introduced in the future, this policy may be updated.',
          ],
        },
        {
          title: 'Cross-Border Services',
          items: [
            'Because we may serve overseas customers and use service providers in different locations, your information may be processed in China and/or in the locations of relevant service providers.',
          ],
        },
        {
          title: 'Your Rights',
          items: [
            'You may request access to your information, correction of inaccurate information, withdrawal of authorization where applicable, or cessation of marketing contact.',
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
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold text-[var(--color-navy)] md:text-7xl">{isZh ? '隐私政策' : 'Privacy Policy'}</h1>
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
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{isZh ? '如果你还需要查看服务条款、退款取消说明或直接发起咨询，可以继续使用以下入口。' : 'If you also want to review our terms, refund handling, or move into inquiry, continue from the links below.'}</p>
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
