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

  const intro = isZh
    ? '本政策说明我们如何收集、使用、保存和保护你在咨询、路线规划和相关沟通中提供的信息。'
    : 'This policy explains how we collect, use, store, and protect the information you provide during inquiries, itinerary planning, and related communications.';

  const sections = isZh
    ? [
        {
          title: '我们收集的信息',
          items: [
            '姓名、邮箱、WhatsApp 或其他联系方式。',
            '目的地、出行日期、人数、预算、酒店偏好和备注等旅行信息。',
          ],
        },
        {
          title: '信息使用目的',
          items: [
            '回复咨询、提供路线规划建议和报价沟通。',
            '处理订单沟通、客户服务和必要的运营记录。',
          ],
        },
        {
          title: '信息共享',
          items: [
            '在履行服务所需范围内，信息可能与酒店、车队、导游、供应商、支付服务商、邮件服务商或网站托管服务商共享。',
            '我们仅在提供相关服务所需范围内共享必要信息。',
          ],
        },
        {
          title: '数据保存',
          items: [
            '我们通常仅在提供服务、处理咨询以及履行法律或财务义务所需期间保存信息。',
          ],
        },
        {
          title: '数据安全',
          items: [
            '我们会采取合理措施保护所持有的信息。',
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
            '当服务面向海外旅客时，相关信息可能在中国及相关服务商所在地处理。',
          ],
        },
        {
          title: '用户权利',
          items: [
            '你可以联系我们请求查询、更正、删除信息或停止继续联系。',
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
            'Name, email address, WhatsApp number, and other contact details.',
            'Travel details such as destinations, dates, group size, budget, hotel preferences, and notes.',
          ],
        },
        {
          title: 'How We Use Information',
          items: [
            'To respond to inquiries, shape itineraries, and prepare quotations.',
            'To communicate about bookings, customer support, and necessary operational records.',
          ],
        },
        {
          title: 'Information Sharing',
          items: [
            'Where necessary to provide services, information may be shared with hotels, transport providers, guides, suppliers, payment providers, email providers, or hosting providers.',
            'We share only what is reasonably necessary for service delivery.',
          ],
        },
        {
          title: 'Data Retention',
          items: [
            'We generally keep information only for as long as needed to provide services, handle inquiries, and meet legal or financial obligations.',
          ],
        },
        {
          title: 'Data Security',
          items: [
            'We use reasonable measures to protect the information we hold.',
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
            'For overseas travelers, information may be processed in China and in the locations of relevant service providers.',
          ],
        },
        {
          title: 'Your Rights',
          items: [
            'You may contact us to request access, correction, deletion, or that we stop contacting you.',
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
          <Link href={withLang('/contact#inquiry-form', lang)} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
            {isZh ? '提交咨询' : 'Submit an Inquiry'}
          </Link>
        </div>
      </section>
    </div>
  );
}
