import type { Metadata } from 'next';
import Link from 'next/link';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FAQ - Infinite Travel',
  description: 'Frequently asked questions about planning a tailor-made China journey with Infinite Travel.',
};

const faqs = [
  { q: { en: 'How far in advance should I book?', zh: '需要提前多久预订？' }, a: { en: 'We recommend booking 2–4 weeks in advance.', zh: '建议提前 2–4 周沟通和预订。' } },
  { q: { en: 'Can I customize my itinerary?', zh: '可以定制行程吗？' }, a: { en: 'Yes. Customization is our core service.', zh: '可以，我们的核心就是定制服务。' } },
  { q: { en: 'Which destinations do you cover?', zh: '你们主要做哪些城市？' }, a: { en: 'We mainly cover Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi and Xinjiang.', zh: '我们主要覆盖北京、上海、深圳、重庆、成都、陕西以及新疆。' } },
  { q: { en: 'Do you offer group tours or private travel?', zh: '是跟团还是自由行？' }, a: { en: 'We offer both group tours and private customized travel.', zh: '我们提供团队游和定制旅行两种形式。' } },
  { q: { en: 'Can I travel alone?', zh: '可以一个人参加吗？' }, a: { en: 'Yes. We offer private solo travel plans or can help you join a group.', zh: '可以，我们支持个人定制，也可以帮你安排拼团或小团。' } },
  { q: { en: 'Do you offer long China journeys?', zh: '可以做长线中国深度游吗？' }, a: { en: 'Yes. We offer multi-city routes and can customize them further.', zh: '可以，我们有成熟的多城市路线，也可以继续个性化调整。' } },
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

      <div className="mt-14">
        <Link href={withLang('/', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </main>
  );
}
