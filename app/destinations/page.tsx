import type { Metadata } from 'next';
import Link from 'next/link';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Destinations - Infinite Travel',
  description: 'Explore the key China destinations curated by Infinite Travel, including Beijing, Shanghai, Xinjiang and more.',
};

const destinations = [
  {
    title: { en: 'Beijing', zh: '北京' },
    desc: { en: 'Great Wall, Forbidden City and imperial heritage', zh: '长城、故宫与皇城文化' },
  },
  {
    title: { en: 'Shanghai', zh: '上海' },
    desc: { en: 'Modern skyline and urban lifestyle', zh: '现代都市天际线与城市生活' },
  },
  {
    title: { en: 'Xinjiang', zh: '新疆' },
    desc: { en: 'Silk Road landscapes, lakes and grasslands', zh: '丝路风光、湖泊草原与西部景观' },
  },
  {
    title: { en: 'Yunnan', zh: '云南' },
    desc: { en: 'Old towns, mountain scenery and slower travel', zh: '古城、山景与慢旅行' },
  },
  {
    title: { en: 'Chengdu', zh: '成都' },
    desc: { en: 'Leisure pace, food and local city culture', zh: '休闲节奏、美食与城市文化' },
  },
  {
    title: { en: 'Xi’an', zh: '西安' },
    desc: { en: 'History, the Silk Road and classic cultural routes', zh: '历史、丝路与经典文化路线' },
  },
];

export default function DestinationsPage({ searchParams }: any) {
  const lang = normalizeLang(searchParams?.lang);
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '精选目的地' : 'Popular Destinations'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '从北京到新疆，从城市到山河，我们把中国目的地组合成更清晰、也更好卖的旅行方案。' : 'From Beijing to Xinjiang, we turn China destinations into clearer and more sellable travel plans.'}</p>

      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((item) => (
          <div key={item.title.zh} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
            <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{lang === 'zh' ? item.title.zh : item.title.en}</h2>
            <p className="mt-3 text-[var(--color-muted)] leading-7">{lang === 'zh' ? item.desc.zh : item.desc.en}</p>
          </div>
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
