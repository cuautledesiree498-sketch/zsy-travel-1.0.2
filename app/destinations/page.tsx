import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getDestinationFallbackImage } from '@/lib/sanity';
import { normalizeLang, withLang } from '@/lib/i18n';
import { destinationContent, getDestinationContent } from '@/lib/destinationContent';
import { buildBreadcrumbJsonLd, buildItemListJsonLd, buildLocalizedAlternates, toAbsoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

export async function generateMetadata({ searchParams }: { searchParams: SearchParamsInput }): Promise<Metadata> {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const title = lang === 'zh' ? '中国目的地 | 无限旅途' : 'China Destinations | Infinite Travel';
  const description = lang === 'zh'
    ? '浏览中国经典城市、风景路线与文化主题目的地，把它们作为定制行程的起点，而不是固定产品。'
    : 'Explore China destination ideas across classic cities, scenic routes and culture-focused journeys. Use them as starting points for a custom itinerary.';
  const alternates = buildLocalizedAlternates('/destinations', lang);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(alternates.canonical),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function DestinationsPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const destinations = getStableDestinations();
  const isZh = lang === 'zh';
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: isZh ? '首页' : 'Home', url: withLang('/', lang) },
    { name: isZh ? '中国目的地' : 'China Destinations', url: withLang('/destinations', lang) },
  ]);
  const destinationListJsonLd = buildItemListJsonLd(isZh ? '中国目的地' : 'China Destinations', destinations.map((item) => {
    const meta = getDestinationContent(item.slug);
    return {
      name: meta?.name?.[lang] || item.slug,
      description: meta?.summary?.[lang],
      url: withLang(`/destinations/${encodeURIComponent(item.slug || '')}`, lang),
    };
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <JsonLd id="destinations-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <JsonLd id="destinations-itemlist-jsonld" data={destinationListJsonLd} />
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{isZh ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{isZh ? '中国目的地选择' : 'Explore China by Destination'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{isZh ? '如果你已经大致知道自己更想去什么地方——比如古都、城市、山水、草原，或者长线风景——可以先从目的地开始。这里更适合“先有地点偏好、后定完整路线”的旅行方式。' : 'If you already have a rough sense of the kind of place you want to begin with — historic cities, big-city contrast, landscapes, grasslands, or a longer scenic region — start here. This page is for travelers who have a place preference first and want to build the full route after that.'}</p>

      <section className="mt-10 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f6f8fc)] p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)] md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{isZh ? '先从想去的地方开始' : 'Start with the place you feel drawn to'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{isZh ? '不用先把整条路线想清楚，先选一个你最想展开的城市或地区就够了。' : 'You do not need the whole route figured out yet. Start with the city or region you most want to build around.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{isZh ? '再看它适合怎么接路线' : 'Then see how it fits into a wider route'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{isZh ? '点进详情页后，你会更清楚这个目的地适合独立成行，还是更适合接在另一段中国路线里。' : 'Once you open the detail page, you can judge whether that destination works best on its own or as part of a wider China route.'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{isZh ? '最后再收成你的版本' : 'Then turn it into your version'}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{isZh ? '当你确定了大方向，再把日期、人数、预算和偏好发给我们，我们会继续把它整理成更完整的行程方案。' : 'Once the direction feels right, send us your dates, group size, budget, and preferences, and we can turn it into a fuller route plan.'}</p>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.length > 0 ? destinations.map((item) => {
          const meta = getDestinationContent(item.slug);
          const title = meta?.name?.[lang] || item.slug;
          const desc = meta?.summary?.[lang] || (lang === 'zh' ? '进入详情页查看这个目的地在整条中国路线里适合承担什么角色。' : 'Open the detail page to see what role this destination can play inside a wider China route.');
          const audience = meta?.audience?.[lang];
          const stay = meta?.stay?.[lang];
          const pairing = getDestinationPairing(item.slug, lang);
          const destinationImage = getDestinationFallbackImage(item.slug);
          return (
            <article key={item.slug} className="overflow-hidden rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
              <div className="relative h-56 w-full bg-[var(--color-soft-white)]">
                <img src={destinationImage} alt={title || (lang === 'zh' ? '精选目的地' : 'Destination')} className="h-full w-full object-cover rounded-t-[1.75rem]" />
              </div>
              <div className="p-7">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{title || (lang === 'zh' ? '精选目的地' : 'Destination')}</h2>
              {desc ? (
                <p className="mt-3 line-clamp-4 text-[var(--color-muted)] leading-7">{desc}</p>
              ) : (
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{lang === 'zh' ? '可进入详情页查看该目的地的旅行亮点与行程建议。' : 'Open the detail page to explore highlights and travel suggestions for this destination.'}</p>
              )}
              <div className="mt-5 rounded-[1.25rem] bg-[var(--color-soft-white)] p-4 text-sm leading-7 text-[var(--color-slate)]">
                <p>
                  <span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '适合：' : 'Best for: '}</span>
                  {audience || (lang === 'zh' ? '首次来华旅客、想按风格筛选路线的家庭、情侣与私人定制旅客。' : 'First-time China visitors, couples, families and private travelers choosing a route by style and pace.')}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '建议停留：' : 'Recommended stay: '}</span>
                  {stay || (lang === 'zh' ? '可先按 2–4 天理解这个方向，再按整体线路继续增减。' : 'A practical starting range is 2–4 days before adjusting it within the wider route.')}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '适合搭配：' : 'Works well with: '}</span>
                  {pairing}
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link href={withLang(`/destinations/${encodeURIComponent(item.slug || '')}`, lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '看这个目的地适不适合你' : 'See If This Destination Fits You'}
                </Link>
                <Link href={withLang('/contact#inquiry-form', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '提交咨询' : 'Submit an Inquiry'}
                </Link>
              </div>
              </div>
            </article>
          );
        }) : (
          <div className="col-span-full rounded-[2rem] border border-dashed border-[rgba(10,27,52,0.12)] bg-[var(--color-soft-white)] px-6 py-16 text-center text-[var(--color-muted)]">
            {lang === 'zh' ? '更多目的地会陆续上线。你也可以直接联系我们，按你想去的城市或风格来定制路线。' : 'More destinations will be added soon. You can also contact us directly to build a route around your target cities or travel style.'}
          </div>
        )}
      </section>

      <div className="mt-14">
        <p className="max-w-3xl text-base leading-8 text-[var(--color-muted)]">{isZh ? '如果你已经找到一个大致想去的方向，就从那个目的地开始，我们再一起把路线收清楚。' : 'If one destination already feels like the right starting point, begin there and we can help you shape the full route after that.'}</p>
        <Link href={withLang('/contact#inquiry-form', lang)} className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {isZh ? '从目的地开始咨询' : 'Start from a Destination'}
        </Link>
      </div>
    </main>
  );
}

function getStableDestinations() {
  return Object.keys(destinationContent).map((slug) => ({ slug }));
}

function getDestinationPairing(slug: string, lang: 'en' | 'zh') {
  const pairings: Record<string, { en: string; zh: string }> = {
    beijing: {
      en: 'Pairs naturally with Xi’an for historical depth, Shanghai for contrast, or a wider first-time China route.',
      zh: '适合搭配西安形成历史纵深，搭配上海形成传统与现代反差，也适合作为首访中国路线的开场。',
    },
    shanghai: {
      en: 'Works well after Beijing or Xi’an, and can also extend smoothly into Suzhou or Hangzhou.',
      zh: '适合接在北京或西安之后，也可以顺势延展到苏州、杭州等更柔和的江南方向。',
    },
    xian: {
      en: 'Combines especially well with Beijing and Shanghai to form a more complete first-time China route.',
      zh: '和北京、上海组合时尤其自然，能把首访中国路线做得更完整、更有层次。',
    },
    chengdu: {
      en: 'Pairs well with Chongqing, Jiuzhaigou or a larger Southwest route when the trip needs a softer middle section.',
      zh: '适合搭配重庆、九寨沟或更完整的西南段落，在路线中提供更舒适的中段缓冲。',
    },
    guilin: {
      en: 'Works beautifully as the scenic contrast to city-led routes such as Beijing, Shanghai or Xi’an.',
      zh: '很适合作为北京、上海、西安等城市主线后的风景反差段，让路线更舒展。',
    },
    zhangjiajie: {
      en: 'Best used as the scenic climax inside a city-led China route before the journey softens or closes.',
      zh: '最适合作为城市型中国路线中的自然高潮段，放在中后段尤其出效果。',
    },
    xinjiang: {
      en: 'Can stand alone as a major long-form trip, or become the most differentiated chapter inside a bigger China itinerary.',
      zh: '既可以独立成立为长线旅行，也可以作为更大中国路线里最有差异化的一章。',
    },
  };

  return pairings[slug]?.[lang] || (lang === 'zh'
    ? '可按你的时间、预算和偏好，继续整理成更完整的中国路线。'
    : 'Can be shaped further into a fuller China route around your timing, budget and preferences.');
}
