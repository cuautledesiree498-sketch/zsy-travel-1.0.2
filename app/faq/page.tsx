import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLinks from '@/components/LegalLinks';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FAQ - Infinite Travel',
  description: 'Frequently asked questions about planning a tailor-made China journey with Infinite Travel.',
};

const faqs = [
  { q: { en: 'Do you provide bilingual communication?', zh: '你们提供中英双语沟通吗？' }, a: { en: 'Yes. We can communicate in English and Chinese for planning and follow-up.', zh: '可以，我们支持英文和中文沟通，方便前期规划与后续确认。' } },
  { q: { en: 'How far in advance should I book?', zh: '需要提前多久预订？' }, a: { en: 'We recommend booking 2–4 weeks in advance.', zh: '建议提前 2–4 周沟通和预订。' } },
  { q: { en: 'Can I customize my itinerary?', zh: '可以定制行程吗？' }, a: { en: 'Yes. Customization is our core service.', zh: '可以，我们的核心就是定制服务。' } },
  { q: { en: 'Which destinations do you cover?', zh: '你们主要做哪些城市？' }, a: { en: 'We mainly cover Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi and Xinjiang.', zh: '我们主要覆盖北京、上海、深圳、重庆、成都、陕西以及新疆。' } },
  { q: { en: 'Can you arrange airport pickup?', zh: '可以安排接送机吗？' }, a: { en: 'Yes, airport pickup and drop-off can be arranged as part of the trip plan.', zh: '可以，接机和送机都可以纳入行程安排。' } },
  { q: { en: 'Do you book hotels and transportation?', zh: '你们会帮忙订酒店和交通吗？' }, a: { en: 'Yes. We can arrange route suggestions, hotel area advice and transport coordination.', zh: '可以，我们会提供路线建议、酒店区域建议和交通协调。' } },
  { q: { en: 'Do you offer group tours or private travel?', zh: '是跟团还是自由行？' }, a: { en: 'We offer both group tours and private customized travel.', zh: '我们提供团队游和定制旅行两种形式。' } },
  { q: { en: 'Can I travel alone?', zh: '可以一个人参加吗？' }, a: { en: 'Yes. We offer private solo travel plans or can help you join a group.', zh: '可以，我们支持个人定制，也可以帮你安排拼团或小团。' } },
  { q: { en: 'Do you support families with children?', zh: '可以接待带孩子的家庭吗？' }, a: { en: 'Yes. We can adjust pace, hotel areas and sightseeing structure for families.', zh: '可以，我们会根据家庭节奏调整行程、酒店区域和活动安排。' } },
  { q: { en: 'Can you handle dietary restrictions?', zh: '可以处理饮食要求吗？' }, a: { en: 'Yes. Please tell us in advance and we will plan accordingly.', zh: '可以，请提前告诉我们，我们会尽量配合安排。' } },
  { q: { en: 'Do you offer corporate hosting routes?', zh: '可以做商务接待路线吗？' }, a: { en: 'Yes. We can support business visits, hosting routes and city extensions.', zh: '可以，我们支持商务参访、接待路线和城市延伸安排。' } },
  { q: { en: 'How do payments work?', zh: '付款流程是怎样的？' }, a: { en: 'Payment details are confirmed after route and service scope are finalized.', zh: '在路线和服务范围确认后，我们再提供付款说明。' } },
  { q: { en: 'What happens after I submit an inquiry?', zh: '提交询盘后会发生什么？' }, a: { en: 'We review your needs first, then reply with next steps or a follow-up question.', zh: '我们会先查看你的需求，再回复下一步建议或补充问题。' } },
  { q: { en: 'Do you offer educational or school trips?', zh: '可以做研学或学校团吗？' }, a: { en: 'Yes. We can help with educational, school and study-focused routes.', zh: '可以，我们支持研学、学校团和学习型路线。' } },
  { q: { en: 'Do you offer long China journeys?', zh: '可以做长线中国深度游吗？' }, a: { en: 'Yes. We offer multi-city routes and can customize them further.', zh: '可以，我们有成熟的多城市路线，也可以继续个性化调整。' } },
  { q: { en: 'Does sending an inquiry create a booking?', zh: '提交咨询后算订单成立吗？' }, a: { en: 'No. An inquiry is only the start of communication. A booking is usually formed after scope, pricing, payment arrangements, and the required confirmation are agreed.', zh: '不算。提交咨询只是开始沟通，通常需要在服务范围、价格、付款安排和确认条件明确后，订单才会成立。' } },
  { q: { en: 'What do you confirm before payment?', zh: '付款前会先确认什么？' }, a: { en: 'We normally confirm route direction, travel dates, traveler details, service scope, and the relevant payment arrangement before asking you to proceed.', zh: '通常会先确认路线方向、出行日期、人数与服务范围，再说明对应的付款安排。' } },
  { q: { en: 'How are cancellations and refunds handled?', zh: '取消与退款怎么处理？' }, a: { en: 'Handling depends on the confirmed booking terms, supplier rules, service progress, and costs already incurred. Please review the Refund & Cancellation Policy for the general framework.', zh: '处理方式取决于已确认订单内容、供应商规则、服务进度和已发生费用。可先参考退款与取消政策中的通用说明。' } },
  { q: { en: 'How do you use my inquiry information?', zh: '你们如何使用我的咨询信息？' }, a: { en: 'We use the information you submit to respond to your request, shape route suggestions, and support related service communication. Please review the Privacy Policy for more detail.', zh: '我们会使用你提交的信息来回复需求、提供路线建议并支持相关服务沟通。更详细说明请查看隐私政策。' } },
];

export default function FAQPage({ searchParams }: any) {
  const lang = normalizeLang(searchParams?.lang);
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '常见问题' : 'Frequently Asked Questions'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '关于行程、定制、价格和服务的常见问题解答。' : 'Answers to common questions about itineraries, customization, pricing and services.'}</p>

      <section className="mt-14 space-y-4">
        {faqs.map((item) => (
          <details key={item.q.zh} className="rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-white p-6 shadow-[0_12px_30px_rgba(10,27,52,0.05)]">
            <summary className="cursor-pointer text-base font-semibold text-[var(--color-navy)]">{lang === 'zh' ? item.q.zh : item.q.en}</summary>
            <div className="mt-4 text-[var(--color-muted)] leading-8">{lang === 'zh' ? item.a.zh : item.a.en}</div>
          </details>
        ))}
      </section>

      <section className="mt-14 rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{lang === 'zh' ? '相关政策' : 'Related Policies'}</p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '关于支付、取消、隐私和订单成立方式的原则性说明，也可以结合以下政策页面一起查看。' : 'For the general principles around payment, cancellation, privacy, and when a booking is formed, you can also review the policy pages below.'}</p>
        <LegalLinks lang={lang} className="mt-6 space-y-3 text-sm text-[var(--color-slate)]" />
      </section>

      <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link href={withLang('/contact#inquiry-form', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '提交咨询' : 'Submit an Inquiry'}
        </Link>
        <Link href={withLang('/', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </main>
  );
}
