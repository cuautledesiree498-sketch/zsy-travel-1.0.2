import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { withLang, normalizeLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang);
  return {
    title: lang === 'zh' ? '目的地 - Infinite Travel / 无限旅途' : 'Destinations - Infinite Travel / 无限旅途',
    description: lang === 'zh'
      ? '查看 Infinite Travel / 无限旅途 重点覆盖的中国目的地，包括北京、上海、深圳、重庆、成都、陕西、新疆等。'
      : 'Explore the China destinations covered by Infinite Travel, including Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi, and Xinjiang.',
  };
}

export default async function DestinationsPage({ searchParams }: any) {
  const lang = normalizeLang((await searchParams)?.lang);
  const isZh = lang === 'zh';
  const destinations = [
    {
      zh: '北京',
      en: 'Beijing',
      image: '/media/custom/destinations/beijing/beijing-1.jpg',
      textZh: '适合首次来华、文化体验、亲子家庭与经典中国行程开场。',
      textEn: 'Ideal for first-time China trips, cultural exploration, family travel, and classic itinerary starts.',
    },
    {
      zh: '上海',
      en: 'Shanghai',
      image: '/media/custom/destinations/shanghai/shanghai-1.jpg',
      textZh: '适合都市体验、商务接待、高端酒店与现代中国印象。',
      textEn: 'Well suited to city experiences, business hosting, premium hotels, and a modern China impression.',
    },
    {
      zh: '深圳',
      en: 'Shenzhen',
      image: '/media/custom/destinations/shenzhen/shenzhen-1.jpg',
      textZh: '适合商务出行、科技产业参访与粤港澳联动路线。',
      textEn: 'Suitable for business travel, tech-industry visits, and Greater Bay Area routing.',
    },
    {
      zh: '重庆',
      en: 'Chongqing',
      image: '/media/destinations/chongqing.jpg',
      textZh: '适合山城城市景观、美食体验和西南路线串联。',
      textEn: 'Great for mountain-city views, food experiences, and southwest route combinations.',
    },
    {
      zh: '成都',
      en: 'Chengdu',
      image: '/media/custom/destinations/chengdu/chengdu-1.jpg',
      textZh: '适合慢节奏旅行、熊猫主题、人文生活方式与川西延展。',
      textEn: 'Excellent for slower travel, panda-themed experiences, local lifestyle, and western Sichuan extensions.',
    },
    {
      zh: '陕西',
      en: 'Shaanxi',
      image: '/media/destinations/shaanxi.jpg',
      textZh: '适合历史文化深度游、古都线路与中华文明主题行程。',
      textEn: 'Strong for heritage travel, ancient-capital routes, and civilization-focused journeys.',
    },
    {
      zh: '新疆',
      en: 'Xinjiang',
      image: '/media/custom/destinations/xinjiang/xinjiang-1.jpg',
      textZh: '适合自然风光、公路旅行、民族文化与高辨识度长线产品。',
      textEn: 'Ideal for landscapes, road trips, ethnic culture, and distinctive long-haul itineraries.',
    },
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
            {destinations.map((destination) => (
              <div key={destination.en} className="overflow-hidden rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
                <div className="relative h-56">
                  <Image src={destination.image} alt={isZh ? destination.zh : destination.en} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{isZh ? destination.zh : destination.en}</h2>
                  <p className="mt-4 leading-8 text-[var(--color-muted)]">
                    {isZh ? destination.textZh : destination.textEn}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    {isZh ? `${destination.zh} 可作为独立目的地，也可与其他城市或地区组合成更完整的中国行程。` : `${destination.en} can be experienced as a standalone destination or combined with other regions to create a richer journey across China.`}
                  </p>
                </div>
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
