import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLinks from '@/components/LegalLinks';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FAQ - Infinite Travel',
  description: 'Frequently asked questions about planning a tailor-made China journey with Infinite Travel.',
};

type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

const faqs = [
  { q: { en: 'Do you provide bilingual communication?', zh: '你们提供中英双语沟通吗？' }, a: { en: 'Yes. We can communicate in English and Chinese for planning and follow-up.', zh: '可以，我们支持英文和中文沟通，方便前期规划与后续确认。' } },
  { q: { en: 'What should I include in my inquiry?', zh: '咨询时建议写哪些信息？' }, a: { en: 'Please include your rough dates, trip length, number of travelers, traveler type, preferred destinations, budget range, hotel style, and any special needs such as diet, language, mobility, children, business visits, study focus, or photography.', zh: '建议写明大致日期、行程天数、人数和同行类型、想去的目的地、预算范围、酒店偏好，以及饮食、语言、行动能力、儿童、商务、研学或旅拍等特殊需求。' } },
  { q: { en: 'How far in advance should I book?', zh: '需要提前多久预订？' }, a: { en: 'We recommend booking 2–4 weeks in advance.', zh: '建议提前 2–4 周沟通和预订。' } },
  { q: { en: 'Can I customize my itinerary?', zh: '可以定制行程吗？' }, a: { en: 'Yes. But we usually do not start by handing you a fixed template. We first look at where you want to go, who is traveling, how much time you have, and your rough budget, then shape the route from there.', zh: '可以。但我们通常不是先塞给你一条固定模板路线，而是先看你想去哪里、和谁出行、时间多长、预算大概在哪个范围，再慢慢把路线收清楚。' } },
  { q: { en: 'Which destinations do you cover?', zh: '你们主要做哪些城市？' }, a: { en: 'We are currently most familiar with Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi, and Xinjiang. We can also connect them into a more complete route based on your interests. If you already have a specific place in mind, you can simply start there.', zh: '目前我们更熟悉北京、上海、深圳、重庆、成都、陕西和新疆这些方向，也可以根据你的兴趣把它们接成一条更完整的路线。如果你已经有明确想去的地方，也可以直接告诉我们。' } },
  { q: { en: 'Can you arrange airport pickup?', zh: '可以安排接送机吗？' }, a: { en: 'Yes. If you need airport pickup, drop-off, or help with the first transfer after arrival, we can include that in the trip plan instead of leaving it as a separate problem for you to solve on your own.', zh: '可以。如果你的行程需要接机、送机，或者落地后的第一段衔接，我们可以一起纳入路线安排里处理，而不是把它单独丢给你自己解决。' } },
  { q: { en: 'Do you book hotels and transportation?', zh: '你们会帮忙订酒店和交通吗？' }, a: { en: 'Yes. We first look at the route, pace, and budget, then help you judge which hotel area makes sense and how transportation should connect. The point is not just booking a hotel or a ride in isolation, but making the whole trip flow better.', zh: '可以。我们会先根据路线方向、节奏和预算，帮你判断更适合住在哪一带、交通怎么接更顺，再进入后续确认。重点不是单独订一个酒店或车，而是让整段行程更顺。' } },
  { q: { en: 'Do you offer group tours or private travel?', zh: '是跟团还是自由行？' }, a: { en: 'We offer both group tours and private customized travel.', zh: '我们提供团队游和定制旅行两种形式。' } },
  { q: { en: 'Can I travel alone?', zh: '可以一个人参加吗？' }, a: { en: 'Yes. We offer private solo travel plans or can help you join a group.', zh: '可以，我们支持个人定制，也可以帮你安排拼团或小团。' } },
  { q: { en: 'Do you support families with children?', zh: '可以接待带孩子的家庭吗？' }, a: { en: 'Yes. We can adjust pace, hotel areas and sightseeing structure for families.', zh: '可以，我们会根据家庭节奏调整行程、酒店区域和活动安排。' } },
  { q: { en: 'Can you handle dietary restrictions?', zh: '可以处理饮食要求吗？' }, a: { en: 'Yes. Please tell us in advance and we will plan accordingly.', zh: '可以，请提前告诉我们，我们会尽量配合安排。' } },
  { q: { en: 'Do you offer corporate hosting routes?', zh: '可以做商务接待路线吗？' }, a: { en: 'Yes. We can support business visits, hosting routes and city extensions.', zh: '可以，我们支持商务参访、接待路线和城市延伸安排。' } },
  { q: { en: 'How do payments work?', zh: '付款流程是怎样的？' }, a: { en: 'We do not ask you to pay while the trip is still unclear. In most cases, we first confirm the route direction, dates, traveler details, service scope, and amount, then move into the relevant payment arrangement. The exact method is explained after that stage is clear.', zh: '我们不会在信息还很模糊的时候就让你直接付款。通常会先把路线方向、日期、人数、服务范围和金额确认清楚，再进入对应的付款安排。具体方式会在确认后再说明。' } },
  { q: { en: 'Which payment methods do you support?', zh: '你们支持哪些付款方式？' }, a: { en: 'Possible methods include PingPong, bank transfer, Alipay, WeChat Pay, and cash. The final method depends on the confirmed arrangement, currency, payer location, and service type.', zh: '可用方式可能包括 PingPong、银行转账、支付宝、微信支付和现金。最终方式取决于确认安排、币种、付款方所在地和服务类型。' } },
  { q: { en: 'Which currencies can be used?', zh: '可以使用哪些币种？' }, a: { en: 'Supported currencies may include RMB, USD, EUR, GBP, and HKD. Exchange rates, bank fees, platform fees, and cross-border remittance fees may vary by payment channel and date.', zh: '支持币种可包括人民币、美元、欧元、英镑和港币。汇率、银行费用、平台费用和跨境汇款费用可能因支付渠道和日期而不同。' } },
  { q: { en: 'When is the final balance due?', zh: '尾款通常什么时候支付？' }, a: { en: 'Final balance may be due 7 days before departure, before the trip starts, upon order confirmation, or according to the confirmed arrangement. The timing is clarified before the relevant payment step.', zh: '尾款可能在出发前 7 天、行程开始前、订单确认后或按确认安排支付。具体时间会在对应付款节点前说明清楚。' } },
  { q: { en: 'Do you provide receipts or invoices?', zh: '可以提供收据或发票吗？' }, a: { en: 'An electronic receipt or payment confirmation can usually be provided after payment. Invoice handling depends on the payment method, tax arrangement, and confirmed service structure.', zh: '付款后通常可提供电子收据或付款确认。发票处理取决于支付方式、税务安排和确认后的服务结构。' } },
  { q: { en: 'When do you provide the travel contract template?', zh: '旅游合同模板通常在什么时候提供？' }, a: { en: 'If the itinerary, traveler details, service scope, and execution method are already confirmed, we can provide the relevant contract template before the related confirmation or payment step. We do not send contract text as a substitute for the planning discussion.', zh: '当行程方向、人数、服务范围和执行方式已经确认后，我们会在对应的确认或付款节点前提供适用的合同模板。合同不会代替前期沟通本身。' } },
  { q: { en: 'Which contract applies to my trip?', zh: '我的行程一般对应哪一类合同？' }, a: { en: 'It depends on the confirmed trip type. The usual categories include domestic group travel, outbound group travel, study tours, one-day trips, Taiwan travel, and some coordination projects. We match the template to the actual itinerary instead of assigning one too early.', zh: '要看最终确认的出行类型。常见类别包括团队境内游、团队出境游、研学游、一日游、赴台行程，以及部分协同项目。我们会按实际行程匹配，而不是过早套用。' } },
  { q: { en: 'Does the website text replace the signed contract?', zh: '网站上的说明能代替正式合同吗？' }, a: { en: 'No. The website gives general service and process information only. It does not replace a formal contract. The final terms are subject to the contract confirmed and signed by both parties.', zh: '不能。网站页面只提供服务和流程层面的通用说明，不替代正式合同。最终条款以双方确认并签署的合同为准。' } },
  { q: { en: 'Is the deposit refundable?', zh: '定金可以退吗？' }, a: { en: 'A deposit is not automatically refundable in full. Handling depends on the confirmed contract or written confirmation, supplier rules, service progress, and actual non-refundable costs already incurred.', zh: '定金不自动等同于全额可退。具体处理取决于已确认合同或书面确认单、供应商规则、服务进度和已发生且不可退费用。' } },
  { q: { en: 'What happens after I submit an inquiry?', zh: '提交询盘后会发生什么？' }, a: { en: 'We first review the basics, such as your timing, group size, destinations, and budget, then decide how the request should move forward. If the direction is already clear, we reply with the next step. If key information is still missing, we follow up with a few necessary questions first.', zh: '我们会先看你的时间、人数、目的地和预算这些基础信息，然后判断这条需求该怎么继续推进。情况清楚的话，我们会直接回复下一步；如果还有关键空缺，也会先补问你几个最必要的问题。' } },
  { q: { en: 'When do I receive a quote?', zh: '什么时候会收到报价？' }, a: { en: 'We usually prepare a quote after the route direction, service scope, traveler details, and timing are clear enough. If key information is missing, we ask a few questions first rather than giving an unreliable price.', zh: '通常会在路线方向、服务范围、人数信息和时间安排足够清楚后再报价。如果关键信息不足，我们会先补问必要问题，而不是给一个不可靠的价格。' } },
  { q: { en: 'Do you offer educational or school trips?', zh: '可以做研学或学校团吗？' }, a: { en: 'Yes. We can help with educational, school and study-focused routes.', zh: '可以，我们支持研学、学校团和学习型路线。' } },
  { q: { en: 'Do you offer long China journeys?', zh: '可以做长线中国深度游吗？' }, a: { en: 'Yes. We offer multi-city routes and can customize them further.', zh: '可以，我们有成熟的多城市路线，也可以继续个性化调整。' } },
  { q: { en: 'Does sending an inquiry create a booking?', zh: '提交咨询后算订单成立吗？' }, a: { en: 'No. Sending an inquiry only starts the conversation; it does not mean a booking already exists. A booking normally moves into confirmation only after the service scope, pricing, payment arrangement, and confirmation conditions are clearly agreed.', zh: '不算。提交咨询只是开始沟通，不代表订单已经成立。通常要在服务范围、价格、付款安排和确认条件都明确之后，订单关系才会真正进入确认阶段。' } },
  { q: { en: 'Why is there no direct pay button?', zh: '为什么没有直接付款按钮？' }, a: { en: 'We do not push customers to pay before the trip is clear. Payment details are provided only after route, scope, amount, and confirmation steps are clear.', zh: '我们不希望在行程还不清楚时就推动付款。付款方式只会在路线、服务范围、金额和确认节点清楚后提供。' } },
  { q: { en: 'How are third-party resources confirmed?', zh: '第三方资源如何确认？' }, a: { en: 'Hotels, vehicles, guides, tickets, activities, and educational resources may depend on supplier availability. They are not treated as locked until the relevant confirmation step is completed.', zh: '酒店、用车、导游、门票、活动和研学资源都可能受供应商可用性影响。相关确认节点完成前，不应视为已经锁定。' } },
  { q: { en: 'How are cancellations and refunds handled?', zh: '取消与退款怎么处理？' }, a: { en: 'Handling depends on the confirmed booking terms, supplier rules, service progress, and costs already incurred. Please review the Refund & Cancellation Policy for the general framework.', zh: '处理方式取决于已确认订单内容、供应商规则、服务进度和已发生费用。可先参考退款与取消政策中的通用说明。' } },
  { q: { en: 'How do you use my inquiry information?', zh: '你们如何使用我的咨询信息？' }, a: { en: 'We use the information you submit to respond to your request, shape route suggestions, and support related service communication. Please review the Privacy Policy for more detail.', zh: '我们会使用你提交的信息来回复需求、提供路线建议并支持相关服务沟通。更详细说明请查看隐私政策。' } },
];

export default async function FAQPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '常见问题' : 'Frequently Asked Questions'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '如果你还在判断这趟旅行适不适合、该怎么开始，先看这里。这里回答的是咨询前最常见、也最实际的问题。' : 'If you are still figuring out whether this trip fits you or how to start, begin here. These are the practical questions travelers usually ask before moving into a real inquiry.'}</p>

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
          {lang === 'zh' ? '还是拿不准？直接发咨询' : 'Still unsure? Start an inquiry'}
        </Link>
        <Link href={withLang('/', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '先回首页看看路线' : 'Back to the route overview'}
        </Link>
      </div>
    </main>
  );
}
