import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = 'Infinite Travel / 无限旅途';
  const title = lang === 'zh' ? `常见问题 - ${siteTitle}` : `FAQ - ${siteTitle}`;
  const description = pickLocalized(settings?.faqSubtitle, lang)
    || pickLocalized(settings?.siteDescription, lang)
    || 'Frequently asked questions about our tailor-made China travel services.';

  return { title, description };
}

export default async function FAQPage({ searchParams }: any) {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];
  const switchLang = lang === 'en' ? 'zh' : 'en';
  const siteTitle = 'Infinite Travel / 无限旅途';
  const footerIntro = lang === 'zh' ? '如果你还有其他问题，欢迎直接联系我们，我们会根据你的需求进一步说明。' : 'If you still have other questions, feel free to contact us and we will explain the best options based on your needs.';
  const faqs = [
    {
      question: { zh: '需要提前多久预订？', en: 'How far in advance should I book?' },
      answer: { zh: '建议提前 2-4 周沟通和预订，旺季（节假日）建议更早安排，以保证行程和资源的可用性。', en: 'We recommend booking 2–4 weeks in advance. For peak seasons and holidays, earlier planning is advised to ensure availability.' },
    },
    {
      question: { zh: '可以定制行程吗？', en: 'Can I customize my itinerary?' },
      answer: { zh: '可以，我们的核心就是定制服务，可以根据你的时间、人数、预算和兴趣灵活调整。', en: 'Yes. Customization is our core service. We design trips based on your schedule, group size, budget and preferences.' },
    },
    {
      question: { zh: '你们主要做哪些城市？', en: 'Which destinations do you cover?' },
      answer: { zh: '我们主要覆盖北京、上海、深圳、重庆、成都、陕西以及新疆，同时也可以根据需求扩展其他城市。', en: 'We mainly cover Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi and Xinjiang, with flexibility to include other destinations.' },
    },
    {
      question: { zh: '是跟团还是自由行？', en: 'Is it a group tour or private travel?' },
      answer: { zh: '我们提供团队游和定制旅行两种形式，可以根据你的需求安排私密小团或标准团队。', en: 'We offer both group tours and private customized travel, depending on your preference.' },
    },
    {
      question: { zh: '会不会有隐形消费？', en: 'Are there any hidden costs?' },
      answer: { zh: '不会，我们会在前期沟通中说明费用结构，避免不必要的额外支出。', en: 'No. We clearly explain the cost structure in advance to avoid unexpected expenses.' },
    },
    {
      question: { zh: '不会中文可以吗？', en: 'Is it okay if I don’t speak Chinese?' },
      answer: { zh: '可以，我们支持中英文沟通，并可安排英文服务，方便国际游客出行。', en: 'Yes. We provide bilingual support and can arrange English-speaking services for international travelers.' },
    },
    {
      question: { zh: '可以一个人参加吗？', en: 'Can I travel alone?' },
      answer: { zh: '可以，我们支持个人定制，也可以帮你安排拼团或小团形式。', en: 'Yes. We offer private solo travel plans or can help you join a group if preferred.' },
    },
    {
      question: { zh: '价格大概是多少？', en: 'What is the price range?' },
      answer: { zh: '价格根据行程天数、城市、住宿标准和人数不同而变化，我们会根据你的需求给出具体方案和报价。', en: 'Pricing varies based on trip length, destinations, accommodation level and group size. We will provide a detailed quote based on your needs.' },
    },
    {
      question: { zh: '你们适合什么类型的客户？', en: 'What types of travelers do you serve?' },
      answer: { zh: '适合家庭游客、团队出行、研学项目、个人定制以及企业客户。', en: 'We serve families, groups, study tours, private travelers and corporate clients.' },
    },
    {
      question: { zh: '可以做 20 天中国深度游吗？', en: 'Do you offer long trips like a 20-day China journey?' },
      answer: { zh: '可以，我们有成熟的“20天玩转中国”路线，也可以根据需求进行个性化调整。', en: 'Yes. We offer a well-designed 20-day China itinerary and can customize it further based on your needs.' },
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={withLang('/', lang)} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] text-lg text-[var(--color-navy)] shadow-sm">✦</span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-muted)]">{lang === 'en' ? 'Tailor-Made China Journeys' : '中国高端定制旅行'}</p>
              <h1 className="text-lg font-semibold tracking-[0.04em] text-[var(--color-navy)] md:text-xl">{siteTitle}</h1>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href={withLang('/about', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.about}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.contact}</Link>
            <Link href={withLang('/faq', switchLang)} className="rounded-full border border-[rgba(10,27,52,0.12)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)] hover:border-[rgba(10,27,52,0.28)]">{t.language}</Link>
          </div>
        </div>
      </nav>

      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.42em] text-[var(--color-muted)]">{t.faq}</p>
          <h2 className="mt-5 text-5xl font-semibold leading-[1.04] text-[var(--color-navy)] md:text-7xl">{lang === 'zh' ? '常见问题' : 'Frequently Asked Questions'}</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">{lang === 'zh' ? '关于行程、定制、价格和服务的常见问题解答' : 'Answers to common questions about itineraries, customization, pricing and services'}</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-5">
          {faqs.map((faq: any, index: number) => (
            <details key={index} className="group overflow-hidden rounded-[1.6rem] border border-[rgba(10,27,52,0.08)] bg-white shadow-[0_16px_40px_rgba(10,27,52,0.04)]">
              <summary className="flex cursor-pointer items-center justify-between gap-6 px-7 py-6 text-left text-lg font-semibold text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
                <span>{markPlaceholder(pickLocalized(faq.question, lang) || (lang === 'zh' ? '待填写：FAQ 问题' : 'FAQ question to be filled'))}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-soft-white)] text-[var(--color-navy)] transition group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-[rgba(10,27,52,0.08)] px-7 py-6 text-[15px] leading-8 text-[var(--color-muted)]">{markPlaceholder(pickLocalized(faq.answer, lang) || (lang === 'zh' ? '待填写：FAQ 回答' : 'FAQ answer to be filled'))}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fbff] px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-14 text-center text-white shadow-[0_35px_80px_rgba(10,27,52,0.14)] md:px-16">
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,255,255,0.66)]">{t.needMoreGuidance}</p>
          <h3 className="mt-4 text-3xl font-semibold md:text-5xl">{lang === 'zh' ? '还有问题？直接联系我们' : 'Still have questions? Contact us'}</h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{lang === 'zh' ? '把你的需求告诉我们，我们会给你更具体的建议和方案' : 'Tell us your needs and we will provide a tailored recommendation'}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={withLang('/contact', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-accent)]">{t.contact}</Link>
            <Link href={withLang('/about', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">{t.about}</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--color-line)] bg-[#f6f8fc] py-10 text-center text-sm text-[var(--color-muted)]">
        <div className="mx-auto max-w-7xl px-6">
          <p>{footerIntro}</p>
          <p className="mt-4">&copy; 2026 {siteTitle}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


function displayText(value: any, fallback = '测试待补充') {
  return markPlaceholder(value || fallback);
}
