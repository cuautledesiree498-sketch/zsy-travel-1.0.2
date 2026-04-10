import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettings, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';

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
  const siteDescription = lang === 'zh' ? '无限旅途是面向全球旅客的中国高端定制旅行品牌。' : 'Infinite Travel is a premium China travel brand for tailor-made journeys.';
  const footerIntro = lang === 'zh' ? '无限旅途专注中国高端定制旅行。' : 'Infinite Travel focuses on premium tailor-made journeys across China.';
  const aboutHeroTitle = lang === 'zh' ? '关于我们：重新定义你的中国旅行' : 'About Us: Redefining Your Journey in China';
  const aboutHeroSubtitle = lang === 'zh' ? '无限旅途专注于中国多城市定制旅行，提供团队游、研学游、个人定制与企业定制服务。' : 'Infinite Travel focuses on multi-city travel in China, offering group tours, study tours, private and corporate travel services.';
  const aboutHeroImage = settings?.heroBackground || settings?.heroImage;
  const aboutIntroTitle = lang === 'zh' ? '我们是谁' : 'Who We Are';
  const aboutIntroBody = lang === 'zh'
    ? '无限旅途是一家专注于中国多城市旅行的定制服务品牌，我们致力于为全球游客提供更轻松、更深入的中国旅行体验。我们的服务覆盖北京、上海、深圳、重庆、成都、陕西以及新疆等多个目的地，可根据客户需求自由组合线路。无论是家庭出游、团队旅行，还是研学项目与企业定制，我们都可以提供对应的解决方案。相比传统旅行产品，我们更强调灵活性与真实体验，让每一段行程都更贴合客户本身。'
    : 'Infinite Travel is a custom travel brand focused on multi-city journeys across China, providing easier and deeper travel experiences for global travelers. Our services cover destinations such as Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi and Xinjiang, with flexible route combinations. We serve families, groups, study tours and corporate clients with tailored solutions. Compared with traditional travel products, we focus more on flexibility and real experiences.';
  const aboutPositioningTitle = lang === 'zh' ? '品牌定位' : 'Brand Positioning';
  const aboutPositioningItems = [
    lang === 'zh' ? '中国多城市旅行服务' : 'Multi-city China travel service',
    lang === 'zh' ? '高自由度定制方案' : 'Flexible custom solutions',
    lang === 'zh' ? '多客群覆盖（家庭 / 团队 / 企业）' : 'Multi-segment coverage',
    lang === 'zh' ? '注重真实体验' : 'Experience-focused travel',
    lang === 'zh' ? '中英文双语服务' : 'Bilingual service',
  ];
  const aboutWhyTitle = lang === 'zh' ? '为什么选择我们' : 'Why Choose Us';
  const aboutWhyItems = [
    {
      title: lang === 'zh' ? '多城市资源' : 'Multi-city coverage',
      desc: lang === 'zh' ? '覆盖中国核心城市，可自由组合。' : 'Covering key destinations across China with flexible route combinations.',
    },
    {
      title: lang === 'zh' ? '灵活定制' : 'Flexible customization',
      desc: lang === 'zh' ? '可根据需求调整行程。' : 'Itineraries can be adjusted based on your needs.',
    },
    {
      title: lang === 'zh' ? '适配多种人群' : 'For different travelers',
      desc: lang === 'zh' ? '家庭、团队、企业客户都可服务。' : 'Suitable for families, groups and corporate clients.',
    },
    {
      title: lang === 'zh' ? '执行落地强' : 'Strong execution',
      desc: lang === 'zh' ? '不仅设计路线，更关注实际体验。' : 'We do more than design routes — we care about the real travel experience.',
    },
  ];
  const aboutCtaTitle = lang === 'zh' ? '开始规划你的中国之旅' : 'Start Planning Your China Trip';
  const aboutCtaSubtitle = lang === 'zh' ? '告诉我们你的需求，我们为你定制行程' : 'Tell us your needs and we will design your trip';

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
            <Link href={withLang('/', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.home}</Link>
            <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.16em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.contact}</Link>
            <Link href={withLang('/about', switchLang)} className="rounded-full border border-[rgba(10,27,52,0.12)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)] hover:border-[rgba(10,27,52,0.28)]">{t.language}</Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 pt-28 pb-24">
        <div className="absolute inset-0">
          <Image src={imageUrlFor(aboutHeroImage, 1800, fallbackImages.hero)} alt={siteTitle} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),rgba(8,19,33,0.4),rgba(8,19,33,0.68))]"></div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl text-white">
            <p className="text-xs uppercase tracking-[0.42em] text-[rgba(255,255,255,0.74)]">{t.aboutBrand}</p>
            <h2 className="mt-5 text-5xl font-semibold leading-[1.04] md:text-7xl">{aboutHeroTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[rgba(255,255,255,0.84)] md:text-xl">{aboutHeroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_25px_70px_rgba(10,27,52,0.06)] md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{t.whoWeAre}</p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-4xl">{aboutIntroTitle}</h3>
            <div className="mt-6 space-y-5 text-base leading-8 text-[var(--color-muted)]">
              {String(aboutIntroBody).split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8 shadow-[0_20px_50px_rgba(10,27,52,0.05)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">{aboutPositioningTitle}</p>
              <ul className="mt-5 space-y-4 text-[15px] leading-7 text-[var(--color-slate)]">
                {aboutPositioningItems.map((item: string, index: number) => <li key={index}>{item}</li>)}
              </ul>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white shadow-[0_20px_50px_rgba(10,27,52,0.05)]">
              <div className="relative h-72">
                <Image src={imageUrlFor(settings?.heroBackground, 1400, fallbackImages.hero)} alt="China luxury travel" fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,19,33,0.72),rgba(8,19,33,0.08))]"></div>
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-[rgba(255,255,255,0.72)]">{t.brandNote}</p>
                  <p className="mt-3 max-w-xl text-lg leading-8">{siteDescription}</p>
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
            <h3 className="mt-4 text-3xl font-semibold text-[var(--color-navy)] md:text-5xl">{aboutWhyTitle}</h3>
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
          <h3 className="mt-4 text-3xl font-semibold md:text-5xl">{aboutCtaTitle}</h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{aboutCtaSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={withLang('/contact', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-accent)]">{t.contact}</Link>
            <Link href={withLang('/', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">{t.home}</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--color-line)] bg-[#f6f8fc] py-10 text-center text-sm text-[var(--color-muted)]">
        <div className="mx-auto max-w-7xl px-6">
          <p>{footerIntro}</p>
          <p className="mt-4">{lang === 'zh' ? `© 2026 ${siteTitle}。保留所有权利。` : `© 2026 ${siteTitle}. All rights reserved.`}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_16px_40px_rgba(10,27,52,0.04)]">
      <h4 className="text-xl font-semibold text-[var(--color-navy)]">{title}</h4>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{desc}</p>
    </div>
  );
}


function displayText(value: any, fallback = '待补充') {
  return markPlaceholder(value || fallback);
}
