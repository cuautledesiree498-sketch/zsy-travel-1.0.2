import type { Metadata } from 'next';
import Link from 'next/link';
import { withLang, normalizeLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang);
  return {
    title: lang === 'zh' ? '服务类型 - ZSY Travel' : 'Services - ZSY Travel',
    description: lang === 'zh'
      ? '查看 ZSY Travel 提供的团队游、研学游、个人定制与企业定制服务。'
      : 'Explore ZSY Travel services including group tours, educational tours, private tailor-made trips, and corporate travel solutions.',
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
    },
    {
      title: isZh ? '研学游' : 'Educational Tours',
      desc: isZh
        ? '面向学校、机构与青少年群体，强调学习、体验与内容设计。'
        : 'Designed for schools, institutions, and youth groups with an emphasis on learning, experience, and program design.',
    },
    {
      title: isZh ? '个人定制' : 'Private Tailor-Made Trips',
      desc: isZh
        ? '面向个人、情侣与家庭，提供更灵活、更私密的专属行程。'
        : 'For solo travelers, couples, and families seeking a more flexible and private travel experience.',
    },
    {
      title: isZh ? '企业定制' : 'Corporate Travel Solutions',
      desc: isZh
        ? '适合商务接待、企业团建、客户拜访与高端接待需求。'
        : 'For business hosting, team building, client visits, and premium corporate travel needs.',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Link href={withLang('/', lang)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]">
          {isZh ? '← 返回首页' : '← Back to Home'}
        </Link>
        <h1 className="mt-6 text-5xl font-semibold text-[var(--color-navy)]">{isZh ? '服务类型' : 'Our Services'}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
          {isZh
            ? '我们围绕不同客群与出行目标，提供团队游、研学游、个人定制与企业定制四大服务方向。'
            : 'We provide four core service types built around different traveler profiles and travel goals: group tours, educational tours, private tailor-made trips, and corporate travel solutions.'}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{service.title}</h2>
              <p className="mt-4 leading-8 text-[var(--color-muted)]">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
