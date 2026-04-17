import type { Metadata } from 'next';
import Link from 'next/link';
import { withLang, normalizeLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang);
  return {
    title: lang === 'zh' ? '服务类型 - 无限旅途' : 'Services - Infinite Travel',
    description: lang === 'zh'
      ? '查看无限旅途提供的团队游、研学游、个人定制与企业定制服务。'
      : 'Explore Infinite Travel services including group tours, educational tours, private tailor-made trips, and corporate travel solutions.',
  };
}

export default async function ServicesPage({ searchParams }: any) {
  const lang = normalizeLang((await searchParams)?.lang);
  const isZh = lang === 'zh';

  const services = [
    {
      title: isZh ? '团队游' : 'Group Tours',
      desc: isZh
        ? '适合多人同行，注重整体安排、性价比与出行效率。'
        : 'Ideal for larger parties that value organized planning, good value, and travel efficiency.',
      fit: isZh ? '适合：朋友团、家庭团、拼团与多代同行' : 'Best for: friend groups, family groups, mixed-age travel parties',
      example: isZh ? '典型场景：北京 + 上海 + 西安经典中国线路' : 'Typical case: a classic China route across Beijing, Shanghai, and Xi’an',
      whatWeArrange: isZh ? '路线规划、城市衔接、酒店区域建议、接送机协调、节奏安排' : 'Route planning, city connections, hotel area advice, airport transfers, pacing',
      duration: '7–12 days',
    },
    {
      title: isZh ? '研学游' : 'Educational Tours',
      desc: isZh
        ? '面向学校、机构与青少年群体，强调学习、体验与内容设计。'
        : 'Designed for schools, institutions, and youth groups with an emphasis on learning, experience, and program design.',
      fit: isZh ? '适合：学校、机构、冬夏令营与文化交流' : 'Best for: schools, institutions, camps, and exchange programs',
      example: isZh ? '典型场景：历史文化 + 城市参访 + 主题课程' : 'Typical case: heritage learning, city visits, and themed sessions',
      whatWeArrange: isZh ? '主题结构、参访节奏、双语沟通、活动衔接、安全与陪同建议' : 'Program structure, visit pacing, bilingual communication, activity coordination, safety support',
      duration: '5–10 days',
    },
    {
      title: isZh ? '个人定制' : 'Private Tailor-Made Trips',
      desc: isZh
        ? '面向个人、情侣与家庭，提供更灵活、更私密的专属行程。'
        : 'For solo travelers, couples, and families seeking a more flexible and private travel experience.',
      fit: isZh ? '适合：情侣蜜月、亲子家庭、高端私人行程' : 'Best for: couples, honeymoons, families, premium private journeys',
      example: isZh ? '典型场景：新疆深度 + 成都慢旅行 + 精品酒店' : 'Typical case: Xinjiang depth travel, Chengdu slow travel, and boutique stays',
      whatWeArrange: isZh ? '行程定制、酒店区域建议、交通衔接、私人节奏调整' : 'Itinerary design, hotel area advice, transport coordination, pace adjustment',
      duration: '6–14 days',
    },
    {
      title: isZh ? '企业定制' : 'Corporate Travel Solutions',
      desc: isZh
        ? '适合商务接待、企业团建、客户拜访与高端接待需求。'
        : 'For business hosting, team building, client visits, and premium corporate travel needs.',
      fit: isZh ? '适合：商务客户、考察团、企业活动与接待安排' : 'Best for: business delegations, inspection groups, team events, executive hosting',
      example: isZh ? '典型场景：商务拜访 + 城市延伸 + 高端餐饮安排' : 'Typical case: business visits, city extensions, and premium dining coordination',
      whatWeArrange: isZh ? '接送机、行程对接、会议/拜访节奏、餐饮建议、城市延伸' : 'Airport pickup, schedule coordination, meeting pacing, dining suggestions, city extensions',
      duration: '2–7 days',
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{isZh ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{isZh ? '服务类型' : 'Our Services'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{isZh ? '如果你要的是更清楚、更省心的中国行程，我们会围绕人群、节奏和目标来设计真正可执行的方案，而不是直接把固定产品推给你。' : 'If you want a clearer, less stressful China trip, we design an executable plan around people, pace and purpose instead of pushing a fixed product at you.'}</p>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        {services.map((item) => (
          <article key={item.title} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
            <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{item.title}</h2>
            <p className="mt-3 leading-8 text-[var(--color-muted)]">{item.desc}</p>
            <div className="mt-5 grid gap-3 rounded-[1.25rem] bg-[var(--color-soft-white)] p-5 text-sm leading-7 text-[var(--color-slate)]">
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '适合人群：' : 'Best for: '}</span>{item.fit}</p>
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '常见时长：' : 'Duration: '}</span>{item.duration}</p>
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '我们负责：' : 'What we arrange: '}</span>{item.whatWeArrange}</p>
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '示例路线：' : 'Example route: '}</span>{item.example}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-10 text-white">
        <h3 className="text-2xl font-semibold">{isZh ? '如果你不确定选哪种服务' : 'If you are not sure which service fits best'}</h3>
        <p className="mt-4 max-w-3xl leading-8 text-[rgba(255,255,255,0.82)]">{isZh ? '告诉我们你的出行时间、人数、预算和旅行目标，我们会帮你从四种方向里挑最合适的方案。' : 'Share your travel dates, group size, budget, and travel goal, and we will help you choose the best direction from the four options.'}</p>
        <div className="mt-8">
          <Link href={withLang('/contact', lang)} className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)]">{isZh ? '开始咨询' : 'Start Planning'}</Link>
        </div>
      </section>
    </main>
  );
}
