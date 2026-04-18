import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, imageUrlFor, getDestinationFallbackImage, shouldForceLocalDestinationImage } from '@/lib/sanity';
import { normalizeLang, pickLocalized, withLang, markPlaceholder } from '@/lib/i18n';
import { getDestinationContent } from '@/lib/destinationContent';

export const dynamic = 'force-dynamic';

function text(value: any, lang: 'en' | 'zh', fallback = '') {
  return markPlaceholder(pickLocalized(value, lang) || fallback);
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';

  if (!destination) {
    return {
      title: lang === 'zh' ? `目的地未找到 - ${siteTitle}` : `Destination Not Found - ${siteTitle}`,
    };
  }

  return {
    title: `${text(destination.name, lang, lang === 'zh' ? '目的地详情' : 'Destination Details')} - ${siteTitle}`,
    description: text(destination.description, lang, lang === 'zh' ? '中国定制旅行目的地详情。' : 'Destination details for tailor-made China travel.'),
  };
}

export default async function DestinationDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  const lang = normalizeLang((await searchParams)?.lang);

  if (!destination) notFound();

  const content = getDestinationContent(destination.slug);
  const name = text(destination.name, lang, lang === 'zh' ? '中国目的地' : 'China Destination');
  const tagline = text(destination.tagline, lang, '');
  const description = text(destination.description, lang, content.summary?.[lang] || '');
  const idealFor = text(destination.idealFor, lang, content.audience?.[lang] || '');
  const bestTime = text(destination.bestTime, lang, content.bestSeason?.[lang] || '');
  const stay = text(destination.suggestedStay, lang, content.stay?.[lang] || '');

  const highlights = Array.isArray(destination.highlights) && destination.highlights.length > 0
    ? destination.highlights.map((item: any) => text(item, lang)).filter(Boolean)
    : (content.highlights || []).map((item: any) => text(item, lang)).filter(Boolean);

  const experiences = Array.isArray(destination.experiences) && destination.experiences.length > 0
    ? destination.experiences.map((item: any) => text(item, lang)).filter(Boolean)
    : (content.experiences || []).map((item: any) => text(item, lang)).filter(Boolean);

  const samplePlan = Array.isArray(destination.samplePlan) && destination.samplePlan.length > 0
    ? destination.samplePlan.map((item: any, index: number) => ({
        day: item?.day || index + 1,
        title: text(item?.title, lang),
        description: text(item?.description, lang),
      }))
    : (content.samplePlan?.[lang] || []).map((item: any, index: number) => ({
        day: index + 1,
        title: item.title,
        description: item.description,
      }));

  const heroFacts = Array.isArray(destination.heroFacts) ? destination.heroFacts : [];
  const gallery = Array.isArray(destination.gallery) ? destination.gallery.filter(Boolean) : [];
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const destinationHeroImage = shouldForceLocalDestinationImage(destination.slug)
    ? getDestinationFallbackImage(destination.slug)
    : imageUrlFor(destination.image, 1600, getDestinationFallbackImage(destination.slug));

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
            <Link href={withLang('/destinations', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '目的地' : 'Destinations'}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '联系我们' : 'Contact'}</Link>
          </div>
        </div>
      </nav>

      <section className="relative mt-16 h-[54vh] overflow-hidden">
        <Image src={destinationHeroImage} alt={name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.82),rgba(4,10,18,0.26),rgba(4,10,18,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10 text-white">
          <Link href={withLang('/destinations', lang)} className="inline-flex rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:bg-white/10">
            {lang === 'zh' ? '← 返回目的地' : '← Back to Destinations'}
          </Link>
          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] md:text-6xl">{name}</h2>
          {tagline ? <p className="mt-4 max-w-3xl text-lg leading-8 text-white/88 md:text-xl">{tagline}</p> : null}
          {heroFacts.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {heroFacts.slice(0, 4).map((item: any, index: number) => (
                <span key={index} className="rounded-full bg-white/14 px-4 py-2 text-sm font-semibold tracking-[0.08em]">
                  {text(item.label, lang)}: {text(item.value, lang)}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Card title={lang === 'zh' ? '目的地概览' : 'Overview'}>
              <p className="text-base leading-8 text-[var(--color-muted)] md:text-lg whitespace-pre-line">
                {description || (lang === 'zh' ? '这里会为你展示这个目的地最值得去看的内容、适合的人群、建议停留时间，以及如何把它放进整条中国路线里。' : 'This page helps you understand what makes the destination worth visiting, who it suits, how long to stay and how it can fit into a wider China route.')}
              </p>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              <MiniCard title={lang === 'zh' ? '适合人群' : 'Ideal For'} value={idealFor || (lang === 'zh' ? '适合想把这个目的地放进家庭游、情侣游、小团或深度中国线路的旅行者。' : 'Suitable for travelers considering this destination for a family trip, couple route, private group or deeper China itinerary.')} />
              <MiniCard title={lang === 'zh' ? '最佳时间' : 'Best Time'} value={bestTime || (lang === 'zh' ? '最佳时间会因季节、天气和你想看的风景类型而变化。' : 'The best time depends on season, weather and the type of scenery or experience you want.')} />
              <MiniCard title={lang === 'zh' ? '建议停留' : 'Suggested Stay'} value={stay || (lang === 'zh' ? '可按整条中国路线的长短灵活安排。' : 'Can be adjusted flexibly based on the length of your wider China route.')} />
            </div>

            <Card title={lang === 'zh' ? '核心亮点' : 'Highlights'} soft>
              <ul className="space-y-4">
                {(highlights.length ? highlights : [lang === 'zh' ? '这个目的地适合作为中国行程中的重点停留城市或风景段落，具体亮点会按你的路线方向继续细化。' : 'This destination can work as a key stop in a wider China itinerary, and the strongest highlights can be refined further around your route direction.']).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--color-slate)]">
                    <span className="mt-1 text-[var(--color-navy)]">✦</span>
                    <span className="leading-8">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title={lang === 'zh' ? '推荐体验' : 'Recommended Experiences'}>
              {experiences.length > 0 ? (
                <div className="space-y-4">
                  {experiences.map((item: string, index: number) => (
                    <p key={index} className="leading-8 text-[var(--color-muted)]">• {item}</p>
                  ))}
                </div>
              ) : (
                <p className="leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '如果你准备把这个目的地放进完整中国路线里，我们可以继续按时间、同行人群和预算，把体验内容收成更具体的一版。' : 'If you want to place this destination inside a wider China route, we can refine the experience mix around your timing, travel party and budget.'}</p>
              )}
            </Card>

            <Card title={lang === 'zh' ? '示例安排' : 'Sample Plan'}>
              {samplePlan.length > 0 ? (
                <div className="space-y-6">
                  {samplePlan.map((item: any, index: number) => (
                    <div key={index} className="border-b border-[rgba(10,27,52,0.08)] pb-6 last:border-b-0">
                      <h3 className="text-xl font-semibold text-[var(--color-navy)]">{lang === 'zh' ? `第${item.day}天` : `Day ${item.day}`} · {item.title}</h3>
                      <p className="mt-2 leading-8 text-[var(--color-muted)] whitespace-pre-line">{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '如果你想把这个目的地放进完整中国行程里，我们可以按天数、预算和城市组合继续整理成更具体的参考方案。' : 'If you want to place this destination inside a full China itinerary, we can shape it into a more specific route suggestion based on trip length, budget and city combinations.'}</p>
              )}
            </Card>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(180deg,#ffffff,#f7faff)] p-8 shadow-[0_24px_60px_rgba(10,27,52,0.08)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{lang === 'zh' ? '按这个目的地继续' : 'Continue From This Destination'}</p>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                {lang === 'zh'
                  ? '如果你喜欢这个目的地，但还没完全想好怎么排整条路线，也没关系。你可以先告诉我们想去几天、和谁一起去、预算大概多少，以及还想搭配哪些城市，我们会继续帮你整理。'
                  : 'If you like this destination but are not yet sure how to build the full route, that is fine. Just tell us how many days you have, who is traveling with you, your rough budget and what other cities you may want to combine with it.'}
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <Link href={withLang('/contact', lang)} className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-navy-soft)]">
                  {lang === 'zh' ? '按这个目的地发起咨询' : 'Inquire About This Destination'}
                </Link>
                <Link href={withLang('/destinations', lang)} className="inline-flex items-center justify-center rounded-full border border-[rgba(10,27,52,0.14)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
                  {lang === 'zh' ? '返回目的地列表' : 'Back to Destinations'}
                </Link>
              </div>
            </div>

            <Card title={lang === 'zh' ? '图集' : 'Gallery'}>
              <div className="grid grid-cols-2 gap-3">
                {(gallery.length ? gallery.slice(0, 4) : [destination.image]).filter(Boolean).map((image: any, index: number) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[var(--color-soft-white)]">
                    <Image src={imageUrlFor(image, 900, getDestinationFallbackImage(destination.slug))} alt={`${name} ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Card({ title, children, soft = false }: { title: string; children: React.ReactNode; soft?: boolean }) {
  return (
    <div className={`rounded-[2rem] border border-[rgba(10,27,52,0.08)] p-8 shadow-[0_24px_60px_rgba(10,27,52,0.06)] md:p-10 ${soft ? 'bg-[var(--color-soft-white)]' : 'bg-white'}`}>
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{title}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function MiniCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-6 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">{title}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{value}</p>
    </div>
  );
}
