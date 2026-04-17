import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettings, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const title = lang === 'zh' ? `关于我们 - ${siteTitle}` : `About Us - ${siteTitle}`;
  const description = pickLocalized(settings?.aboutHeroSubtitle, lang)
    || pickLocalized(settings?.siteDescription, lang)
    || 'Learn about Infinite Travel and our approach to tailor-made travel across China.';

  return { title, description };
}

export default async function AboutPage({ searchParams }: any) {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];
  const switchLang = lang === 'en' ? 'zh' : 'en';
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const footerIntro = lang === 'zh' ? '无限旅途专注于中国高端定制旅行。' : 'Infinite Travel focuses on premium tailor-made journeys across China.';
  const aboutHeroTitle = lang === 'zh' ? '关于我们：让中国行程更清晰、更可执行' : 'About Us: Making China Travel Clearer and More Executable';
  const aboutHeroSubtitle = lang === 'zh' ? '我们专注于中国多城市定制旅行，为家庭、情侣、研学、商务和私人客户提供更清楚的路线结构、双语沟通和落地支持。' : 'We focus on multi-city travel in China, offering clearer route structure, bilingual communication, and execution support for families, couples, study groups, corporate clients and private travelers.';
  const aboutIntroTitle = lang === 'zh' ? '我们做什么' : 'What We Do';
  const aboutIntroBody = lang === 'zh'
    ? '无限旅途不是单纯的机票或酒店代理，也不是只卖固定团的传统旅行社。我们更关注的是：怎么把中国旅行设计得更顺、更清楚、更符合真实需求。我们会根据出行时间、人数、预算、目的地和节奏，去做路线组合、城市衔接、体验排序和执行建议。无论是第一次来中国，还是想做更深度的多城市旅行，我们都可以提供相应的行程设计与沟通支持。'
    : 'Infinite Travel is not just a ticket or hotel agent, and it is not a fixed-package seller either. Our focus is on making China trips smoother, clearer, and better aligned with real travel needs. We build route combinations, city connections, experience order, and execution advice based on your travel time, group size, budget, destinations and pace. Whether it is your first time in China or a deeper multi-city journey, we can support the planning process.';
  const aboutPositioningTitle = lang === 'zh' ? '我们的定位' : 'Our Positioning';
  const aboutPositioningItems = [
    lang === 'zh' ? '中国多城市旅行服务' : 'Multi-city China travel service',
    lang === 'zh' ? '行程设计与路线组织' : 'Itinerary design and route organization',
    lang === 'zh' ? '双语沟通与出行确认' : 'Bilingual communication and trip confirmation',
    lang === 'zh' ? '更重视节奏与真实体验' : 'Experience-focused pacing and delivery',
    lang === 'zh' ? '适配家庭 / 研学 / 商务 / 私人客群' : 'Built for family, study, business and private travelers',
  ];
  const aboutWhyTitle = lang === 'zh' ? '为什么选择我们' : 'Why Choose Us';
  const aboutWhyItems = [
    {
      title: lang === 'zh' ? '路线不是拍脑袋' : 'Routes are not guesswork',
      desc: lang === 'zh' ? '我们会先看节奏、城市间移动成本和体验顺序，再决定路线。' : 'We look at pacing, city transfer cost and experience order before deciding the route.',
    },
    {
      title: lang === 'zh' ? '沟通更清楚' : 'Clearer communication',
      desc: lang === 'zh' ? '先把人数、时间、预算、偏好和限制说清楚，再推进下一步。' : 'We clarify group size, timing, budget, preferences and constraints before moving on.',
    },
    {
      title: lang === 'zh' ? '不只给模板' : 'More than templates',
      desc: lang === 'zh' ? '我们会根据目标做组合，而不是把固定产品直接套上去。' : 'We build combinations around your goal instead of forcing a fixed product onto you.',
    },
    {
      title: lang === 'zh' ? '更适合海外客人' : 'Better for international travelers',
      desc: lang === 'zh' ? '重视双语表达、出发前确认和执行中的连续沟通。' : 'We pay attention to bilingual clarity, pre-trip confirmation and continuous communication.',
    },
  ];
  const aboutCtaTitle = lang === 'zh' ? '开始规划你的中国之旅' : 'Start Planning Your China Trip';
  const aboutCtaSubtitle = lang === 'zh' ? '如果你想让行程更清楚、更稳妥，把时间、人数、预算和偏好告诉我们即可。' : 'If you want your trip to feel clearer and more reliable, just share your dates, group size, budget and preferences.';

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <section className="relative overflow-hidden px-6 pt-28 pb-24">
        <div className="absolute inset-0">
          <Image src={imageUrlFor(settings?.heroBackground, 1800, fallbackImages.hero)} alt={siteTitle} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),rgba(8,19,33,0.4),rgba(8,19,33,0.68))]"></div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl text-white">
            <p className="text-xs uppercase tracking-[0.42em] text-[rgba(255,255,255,0.74)]">{t.aboutBrand}</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.04] md:text-7xl">{aboutHeroTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[rgba(255,255,255,0.84)] md:text-xl">{aboutHeroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_25px_70px_rgba(10,27,52,0.06)] md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{lang === 'zh' ? '我们做什么' : 'What We Do'}</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{aboutIntroTitle}</h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] whitespace-pre-line">{aboutIntroBody}</p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8 shadow-[0_20px_50px_rgba(10,27,52,0.05)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{aboutPositioningTitle}</p>
              <ul className="mt-5 space-y-4 text-[15px] leading-7 text-[var(--color-slate)]">
                {aboutPositioningItems.map((item: string, index: number) => <li key={index}>• {item}</li>)}
              </ul>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white shadow-[0_20px_50px_rgba(10,27,52,0.05)]">
              <div className="relative h-72">
                <Image src={imageUrlFor(settings?.heroBackground, 1400, fallbackImages.hero)} alt="China luxury travel" fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,19,33,0.72),rgba(8,19,33,0.08))]"></div>
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-[rgba(255,255,255,0.72)]">{lang === 'zh' ? '品牌说明' : 'Brand Note'}</p>
                  <p className="mt-3 max-w-xl text-lg leading-8">{footerIntro}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fbff] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{t.whyTravelersChooseUs}</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-5xl">{aboutWhyTitle}</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutWhyItems.map((item: any, index: number) => (
              <FeatureCard key={index} title={item?.title || 'Feature'} desc={item?.desc || ''} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] px-8 py-14 text-center text-white shadow-[0_35px_80px_rgba(10,27,52,0.14)] md:px-16">
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,255,255,0.66)]">{t.startConversation}</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">{aboutCtaTitle}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{aboutCtaSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={withLang('/contact', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-accent)]">{t.contact}</Link>
            <Link href={withLang('/', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">{t.home}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_16px_40px_rgba(10,27,52,0.04)]">
      <h3 className="text-xl font-semibold text-[var(--color-navy)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{desc}</p>
    </div>
  );
}
