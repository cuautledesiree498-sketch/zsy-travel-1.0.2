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
        ? '适合多人同行，需要把整体节奏、资源衔接和出行效率先梳理清楚。'
        : 'Suitable for larger parties that need overall pacing, resource coordination, and travel efficiency clarified early.',
      fit: isZh ? '朋友团、家庭团、多代同行、小型同行团队' : 'Friend groups, family groups, mixed-age travel parties, small group departures',
      chooseWhen: isZh ? '当你希望整体安排更统一、预算更容易控制、多人协同时更省心。' : 'Choose this when you want one coordinated structure, easier budget control, and less friction across multiple travelers.',
      example: isZh ? '北京 + 上海 + 西安这类多城市经典线路' : 'A classic multi-city route such as Beijing, Shanghai, and Xi’an',
      whatWeArrange: isZh ? '路线规划、城市衔接、酒店区域建议、接送机协调、整体节奏安排' : 'Route planning, city connections, hotel area advice, airport transfers, and overall pacing',
      duration: '7–12 days',
    },
    {
      title: isZh ? '研学游' : 'Educational Tours',
      desc: isZh
        ? '面向学校、机构与青少年群体，重点是学习目标、参访顺序和执行安全感。'
        : 'Designed for schools, institutions, and youth groups with emphasis on learning goals, visit order, and safer execution.',
      fit: isZh ? '学校、机构、冬夏令营、文化交流与主题学习团队' : 'Schools, institutions, camps, exchange groups, and themed learning programs',
      chooseWhen: isZh ? '当行程不只是游览，还需要内容主题、参访结构和带队沟通配合。' : 'Choose this when the trip needs more than sightseeing and requires program themes, visit structure, and group coordination.',
      example: isZh ? '历史文化参访 + 城市观察 + 主题课程的组合' : 'A mix of heritage visits, city observation, and themed sessions',
      whatWeArrange: isZh ? '主题结构、参访节奏、双语沟通、活动衔接、安全与陪同建议' : 'Program structure, visit pacing, bilingual communication, activity coordination, and safety support',
      duration: '5–10 days',
    },
    {
      title: isZh ? '个人定制' : 'Private Tailor-Made Trips',
      desc: isZh
        ? '面向个人、情侣与家庭，更适合需要灵活节奏、私密度和偏好定制的安排。'
        : 'For solo travelers, couples, and families who need more flexibility, privacy, and preference-based pacing.',
      fit: isZh ? '情侣蜜月、亲子家庭、私人小团、偏好明确的旅行者' : 'Couples, honeymoons, families, private parties, and travelers with clearer preferences',
      chooseWhen: isZh ? '当你更在意节奏感、住宿风格、体验顺序和个人偏好，而不是统一模板。' : 'Choose this when pacing, hotel style, experience order, and personal preferences matter more than a standard format.',
      example: isZh ? '新疆深度行程、成都慢旅行、精品酒店组合' : 'Xinjiang depth travel, slow-paced Chengdu, and boutique stay combinations',
      whatWeArrange: isZh ? '行程定制、酒店区域建议、交通衔接、私人节奏调整' : 'Itinerary design, hotel area advice, transport coordination, and private pace adjustment',
      duration: '6–14 days',
    },
    {
      title: isZh ? '企业定制' : 'Corporate Travel Solutions',
      desc: isZh
        ? '适合商务接待、企业团建、客户拜访与高端接待，重点是时间配合和接待衔接。'
        : 'For business hosting, team building, client visits, and premium corporate travel with tighter time coordination.',
      fit: isZh ? '商务客户、考察团、企业活动、接待安排与城市延伸' : 'Business delegations, inspection groups, corporate events, executive hosting, and city extensions',
      chooseWhen: isZh ? '当行程需要围绕会议、拜访、接待标准和时间窗口来安排。' : 'Choose this when the schedule needs to work around meetings, visits, hosting standards, and tight time windows.',
      example: isZh ? '商务拜访 + 城市延伸 + 餐饮与接待协调' : 'Business visits with city extensions plus dining and hosting coordination',
      whatWeArrange: isZh ? '接送机、行程对接、会议/拜访节奏、餐饮建议、城市延伸' : 'Airport pickup, schedule coordination, meeting pacing, dining suggestions, and city extensions',
      duration: '2–7 days',
    },
  ];

  const pageIntro = isZh
    ? '如果你还没想清楚自己更适合哪一种出行方式，先看这一页。我们把常见的几种服务组织方式拆开，是为了让你更容易判断，不是让你自己硬选。'
    : 'If you are not yet sure which kind of travel format fits you best, start here. We separate the common service formats so it is easier to judge, not so you have to force yourself into one too early.';
  const chooseGuideTitle = isZh ? '先别急着选，先看你更像哪一种情况' : 'Do Not Rush the Choice, Start by Seeing Which Situation Feels Closest';
  const chooseGuideItems = isZh
    ? [
        '如果你最担心的是多人怎么协调、节奏怎么统一，先看团队游。',
        '如果你更在意学习目标、参访内容和带队配合，先看研学游。',
        '如果你更在意旅行节奏、私密度和偏好自由度，先看个人定制。',
        '如果你的重点是会议、接待、拜访或时间窗口，先看企业定制。',
      ]
    : [
        'Start with Group Tours if the real concern is how to coordinate multiple travelers and keep the pace aligned.',
        'Start with Educational Tours if learning goals, visit content, and group guidance matter most.',
        'Start with Private Tailor-Made Trips if pace, privacy, and personal preference matter more than a standard format.',
        'Start with Corporate Travel Solutions if the trip is mainly shaped by meetings, hosting, business visits, or tight timing windows.',
      ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{isZh ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{isZh ? '服务类型' : 'Our Services'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{pageIntro}</p>

      <section className="mt-10 rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-6 shadow-[0_18px_50px_rgba(10,27,52,0.04)] md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{isZh ? '选择建议' : 'Selection Guide'}</p>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--color-navy)] md:text-3xl">{chooseGuideTitle}</h2>
        <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--color-slate)] md:grid-cols-2">
          {chooseGuideItems.map((item) => (
            <p key={item}>• {item}</p>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        {services.map((item) => (
          <article key={item.title} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
            <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{item.title}</h2>
            <p className="mt-3 leading-8 text-[var(--color-muted)]">{item.desc}</p>
            <div className="mt-5 grid gap-3 rounded-[1.25rem] bg-[var(--color-soft-white)] p-5 text-sm leading-7 text-[var(--color-slate)]">
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '适合人群：' : 'Best for: '}</span>{item.fit}</p>
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '适合选择时机：' : 'Choose this when: '}</span>{item.chooseWhen}</p>
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '常见时长：' : 'Duration: '}</span>{item.duration}</p>
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '我们负责：' : 'What we arrange: '}</span>{item.whatWeArrange}</p>
              <p><span className="font-semibold text-[var(--color-navy)]">{isZh ? '示例路线：' : 'Example route: '}</span>{item.example}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-10 text-white">
        <h3 className="text-2xl font-semibold">{isZh ? '如果你现在还分不清该从哪一种开始' : 'If You Still Cannot Tell Which One You Should Start From'}</h3>
        <p className="mt-4 max-w-3xl leading-8 text-[rgba(255,255,255,0.82)]">{isZh ? '没关系，很多人一开始也说不清自己到底算哪一种。你可以先把时间、人数、预算和旅行目标告诉我们，我们会先帮你判断更接近哪种服务组织方式，再往下谈路线怎么做。' : 'That is normal. Many travelers do not know the right format at the beginning either. Start with your dates, group size, budget, and travel goal, and we will help judge which service structure is closest before moving into the route itself.'}</p>
        <div className="mt-8">
          <Link href={withLang('/contact#inquiry-form', lang)} className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)]">{isZh ? '提交咨询' : 'Submit an Inquiry'}</Link>
        </div>
      </section>
    </main>
  );
}
