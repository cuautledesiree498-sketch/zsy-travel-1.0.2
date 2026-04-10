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
    },
    {
      title: isZh ? '研学游' : 'Educational Tours',
      desc: isZh
        ? '面向学校、机构与青少年群体，强调学习、体验与内容设计。'
        : 'Designed for schools, institutions, and youth groups with an emphasis on learning, experience, and program design.',
      fit: isZh ? '适合：学校、机构、冬夏令营与文化交流' : 'Best for: schools, institutions, camps, and exchange programs',
      example: isZh ? '典型场景：历史文化 + 城市参访 + 主题课程' : 'Typical case: heritage learning, city visits, and themed sessions',
    },
    {
      title: isZh ? '个人定制' : 'Private Tailor-Made Trips',
      desc: isZh
        ? '面向个人、情侣与家庭，提供更灵活、更私密的专属行程。'
        : 'For solo travelers, couples, and families seeking a more flexible and private travel experience.',
      fit: isZh ? '适合：情侣蜜月、亲子家庭、高端私人行程' : 'Best for: couples, honeymoons, families, premium private journeys',
      example: isZh ? '典型场景：新疆深度 + 成都慢旅行 + 精品酒店' : 'Typical case: Xinjiang depth travel, Chengdu slow travel, and boutique stays',
    },
    {
      title: isZh ? '企业定制' : 'Corporate Travel Solutions',
      desc: isZh
        ? '适合商务接待、企业团建、客户拜访与高端接待需求。'
        : 'For business hosting, team building, client visits, and premium corporate travel needs.',
      fit: isZh ? '适合：商务客户、考察团、企业活动与接待安排' : 'Best for: business delegations, inspection groups, team events, executive hosting',
      example: isZh ? '典型场景：深圳商务接待 + 上海会议 + 城市延展体验' : 'Typical case: Shenzhen business hosting, Shanghai meetings, and city extensions',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Link href={withLang('/', lang)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            {isZh ? '← 返回首页' : '← Back to Home'}
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">{isZh ? '服务类型' : 'Services'}</p>
          <h1 className="mt-4 text-5xl font-semibold text-[var(--color-navy)] md:text-7xl">{isZh ? '我们的四大业务方向' : 'Our Four Core Service Types'}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            {isZh
              ? '不论是团队出行、学习交流，还是私人旅行与企业接待，我们都能提供对应方案。'
              : 'Whether you are planning a group trip, an educational journey, a private tour, or corporate hosting, we can build the right solution for you.'}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
                <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{service.title}</h2>
                <p className="mt-4 leading-8 text-[var(--color-muted)]">{service.desc}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]"><span className="font-semibold text-[var(--color-navy)]">{isZh ? '适合人群：' : 'Best for: '}</span>{service.fit.replace(/^适合：|^Best for: /, '')}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]"><span className="font-semibold text-[var(--color-navy)]">{isZh ? '案例方向：' : 'Example: '}</span>{service.example.replace(/^典型场景：|^Typical case: /, '')}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8">
              <h3 className="text-xl font-semibold text-[var(--color-navy)]">{isZh ? '我们会先做什么' : 'What We Do First'}</h3>
              <p className="mt-4 leading-8 text-[var(--color-muted)]">
                {isZh ? '先了解人数、时间、预算、偏好和旅行目的，再决定最合适的服务方向。' : 'We first understand your group size, timing, budget, preferences, and travel purpose before recommending the best service type.'}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8">
              <h3 className="text-xl font-semibold text-[var(--color-navy)]">{isZh ? '我们交付什么' : 'What We Deliver'}</h3>
              <p className="mt-4 leading-8 text-[var(--color-muted)]">
                {isZh ? '我们交付的不只是路线，还包括节奏安排、体验结构、资源匹配与沟通支持。' : 'We deliver more than a route: pacing, experience design, resource matching, and communication support are all part of the service.'}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8">
              <h3 className="text-xl font-semibold text-[var(--color-navy)]">{isZh ? '为什么适合海外客户' : 'Why It Works for International Travelers'}</h3>
              <p className="mt-4 leading-8 text-[var(--color-muted)]">
                {isZh ? '我们更重视双语沟通、行前理解成本和整体体验的顺畅度。' : 'We pay close attention to bilingual communication, pre-trip clarity, and a smoother overall experience for overseas travelers.'}
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-10 text-white">
            <h3 className="text-2xl font-semibold">{isZh ? '如果你不确定选哪种服务' : 'If you are not sure which service fits best'}</h3>
            <p className="mt-4 max-w-3xl leading-8 text-[rgba(255,255,255,0.82)]">
              {isZh
                ? '告诉我们你的出行时间、人数、预算和旅行目标，我们会帮你从四种方向里选出最合适的方案。'
                : 'Share your travel dates, group size, budget, and travel goal, and we will help you choose the best direction from the four options.'}
            </p>
            <div className="mt-8">
              <Link href={withLang('/contact', lang)} className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)]">
                {isZh ? '开始咨询' : 'Start Planning'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
