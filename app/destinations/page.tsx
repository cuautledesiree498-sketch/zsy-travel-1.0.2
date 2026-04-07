import type { Metadata } from 'next';
import Link from 'next/link';
import { withLang, normalizeLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang);
  return {
    title: lang === 'zh' ? '目的地 - ZSY Travel' : 'Destinations - ZSY Travel',
    description: lang === 'zh'
      ? '查看 ZSY Travel 重点覆盖的中国目的地，包括北京、上海、深圳、重庆、成都、陕西、新疆等。'
      : 'Explore the China destinations covered by ZSY Travel, including Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi, and Xinjiang.',
  };
}

export default async function DestinationsPage({ searchParams }: any) {
  const lang = normalizeLang((await searchParams)?.lang);
  const isZh = lang === 'zh';
  const destinations = [
    ['北京', 'Beijing'],
    ['上海', 'Shanghai'],
    ['深圳', 'Shenzhen'],
    ['重庆', 'Chongqing'],
    ['成都', 'Chengdu'],
    ['陕西', 'Shaanxi'],
    ['新疆', 'Xinjiang'],
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Link href={withLang('/', lang)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            {isZh ? '← 返回首页' : '← Back to Home'}
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">{isZh ? '目的地' : 'Destinations'}</p>
          <h1 className="mt-4 text-5xl font-semibold text-[var(--color-navy)] md:text-7xl">{isZh ? '中国代表性目的地' : 'Representative Destinations Across China'}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            {isZh
              ? '我们以中国为重点，覆盖代表性城市、人文目的地与西部自然风景，可根据不同需求组合成更完整的中国旅程。'
              : 'We focus on China and cover representative cities, cultural destinations, and western landscapes that can be combined into a more complete China journey.'}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map(([zh, en]) => (
              <div key={en} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
                <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{isZh ? zh : en}</h2>
                <p className="mt-4 leading-8 text-[var(--color-muted)]">
                  {isZh ? `${zh} 可作为独立目的地，也可与其他城市或地区组合成更完整的中国行程。` : `${en} can be experienced as a standalone destination or combined with other regions to create a richer journey across China.`}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-10 text-white">
            <h3 className="text-2xl font-semibold">{isZh ? '如何把目的地串成路线' : 'How destinations become an itinerary'}</h3>
            <p className="mt-4 max-w-3xl leading-8 text-[rgba(255,255,255,0.82)]">
              {isZh
                ? '你可以把北京、上海、成都、重庆、陕西和新疆等目的地按主题、节奏和出行目标组合成更适合你的路线。'
                : 'You can combine destinations like Beijing, Shanghai, Chengdu, Chongqing, Shaanxi, and Xinjiang into a route shaped around theme, pace, and travel goals.'}
            </p>
            <div className="mt-8">
              <Link href={withLang('/contact', lang)} className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)]">
                {isZh ? '告诉我们你的目的地偏好' : 'Tell us your destination preferences'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
