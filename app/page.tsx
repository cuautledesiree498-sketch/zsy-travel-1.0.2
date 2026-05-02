import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LegalLinks from '@/components/LegalLinks';
import JsonLd from '@/components/JsonLd';
import { buildWhatsAppUrl, defaultWhatsAppMessage, WHATSAPP_DISPLAY } from '@/lib/contact';
import { getTours, getArticles, getDestinations, getSiteSettings, getHomeSettings, imageUrlFor, fallbackImages, getDestinationFallbackImage, normalizeDestinationSlug, shouldForceLocalDestinationImage } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder, type Lang } from '@/lib/i18n';
import { SITE_URL, buildLocalizedAlternates, buildOrganizationJsonLd, buildWebSiteJsonLd, toAbsoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

export async function generateMetadata({ searchParams }: { searchParams: SearchParamsInput }): Promise<Metadata> {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const description = lang === 'zh'
    ? '为全球旅行者设计的中国多城市私人定制旅行，覆盖北京、上海、成都、新疆等多个目的地。'
    : 'Private multi-city travel across China designed for global travelers. Custom itineraries covering Beijing, Shanghai, Chengdu, Xinjiang and more.';
  const alternates = buildLocalizedAlternates('/', lang);

  return {
    title: `${siteTitle} | ${lang === 'zh' ? '中国定制旅行顾问' : 'Tailor-Made China Journeys'}`,
    description,
    alternates,
    openGraph: {
      title: `${siteTitle} | ${lang === 'zh' ? '中国定制旅行顾问' : 'Tailor-Made China Journeys'}`,
      description,
      url: toAbsoluteUrl(alternates.canonical),
      siteName: siteTitle,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteTitle} | ${lang === 'zh' ? '中国定制旅行顾问' : 'Tailor-Made China Journeys'}`,
      description,
    },
  };
}

export default async function Home({ searchParams }: any) {
  const rawParams = await searchParams;
  const lang = normalizeLang(Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang);
  const [settings, homeSettings, tours, articles, destinations] = await Promise.all([
    getSiteSettings(),
    getHomeSettings(),
    getTours(),
    getArticles(),
    getDestinations(),
  ]);
  const t = uiText[lang];

  const sections = Array.isArray(homeSettings?.sections) ? homeSettings.sections.filter((section: any) => section?.enabled !== false) : [];
  const hasCmsSections = sections.length > 0;
  const heroSection = sections.find((section: any) => section._type === 'heroSection');
  const nonHeroSections = sections.filter((section: any) => section._type !== 'heroSection');

  const fallbackHeroTitle = lang === 'zh' ? '把中国旅程先理顺。' : 'Get Your China Trip Straightened Out First.';
  const fallbackHeroSubtitle = lang === 'zh' ? '先判断路线是否顺，再谈酒店、车导和报价。' : 'China journeys planned with clarity before hotels, guides and quotes.';
  const heroTitle = useDisplayText(heroSection?.title, lang, fallbackHeroTitle);
  const heroSubtitle = useDisplayText(heroSection?.subtitle, lang, fallbackHeroSubtitle);
  const heroSupporting = lang === 'zh' ? '告诉我们日期、人数和重点偏好，我们会先给出更清楚的路线方向，帮助你判断这趟中国旅行该怎么开始。' : 'Share your dates, group size and priorities. We will shape a route direction first, so the trip is easier to judge before committing.';
  const heroImage = '/media/custom/hero/jiangnan-cool-home.png';
  const heroVideoUrl = heroSection?.backgroundVideoUrl;
  const footerIntro = pickLocalized(settings?.footerIntro, lang) || (lang === 'zh' ? '无限旅途专注中国高端定制旅行，为家庭、情侣、商务接待、私人小团与主题旅客提供更有结构、更贴近真实需求的旅程设计与咨询支持。' : 'Infinite Travel focuses on premium tailor-made travel across China for families, couples, executive visits, private groups and theme-driven travelers who need a more structured journey design and consultation support.');
  const contactAddress = pickLocalized(settings?.address, lang) || '';
  const navCtaText = pickLocalized(settings?.headerCtaText, lang) || (lang === 'zh' ? '开始规划' : 'Start Planning');
  const navCtaLink = settings?.headerCtaLink || '/contact#inquiry-form';
  const siteTitle = pickLocalized(settings?.siteTitle, lang) || (lang === 'zh' ? '无限旅途' : 'Infinite Travel');
  const siteDescription = pickLocalized(settings?.siteDescription, lang) || (lang === 'zh' ? '为全球旅行者设计的中国多城市私人定制旅行，覆盖北京、上海、成都、新疆等多个目的地。' : 'Private multi-city travel across China designed for global travelers. Custom itineraries covering Beijing, Shanghai, Chengdu, Xinjiang and more.');
  const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage(lang));
  const faqItems = Array.isArray(settings?.faqItems) ? settings.faqItems : [];
  const languageSwitchLabel = t.language;
  const switchLang: Lang = lang === 'en' ? 'zh' : 'en';
  const heroEyebrow = lang === 'zh' ? '面向海外旅客的中国私人定制行程' : 'Tailor-Made China Journeys for Overseas Travelers';
  const heroBrandLabel = lang === 'zh' ? 'Infinite Travel | 中国定制旅行顾问' : 'Infinite Travel | China Travel Planning';
  const heroPrimaryText = useDisplayText(heroSection?.primaryButtonText, lang, lang === 'zh' ? '开始规划' : 'Start Planning');
  const heroPrimaryHref = resolveManagedLink(heroSection?.primaryButtonTarget, heroSection?.primaryButtonLink) || '/contact#inquiry-form';
  const heroSecondaryText = heroSection ? useDisplayText(heroSection?.secondaryButtonText, lang) : (lang === 'zh' ? '查看示例行程' : 'View Sample Journeys');
  const heroSecondaryHref = heroSection ? resolveManagedLink(heroSection?.secondaryButtonTarget, heroSection?.secondaryButtonLink) : '#cases';
  const trustSectionEyebrow = lang === 'zh' ? '为什么更好判断' : 'Why It’s Easier to Decide';
  const trustSectionTitle = lang === 'zh' ? '先把路线判断对。' : 'Start With the Right Route.';
  const trustSectionBody = lang === 'zh' ? '我们会根据你的时间、人数和重点偏好，先判断路线是否顺、节奏是否合适、后面的确认会不会卡住。' : 'We look at your dates, group size, and priorities first, so it’s easier to see whether the route flows well, the pace makes sense, and the confirmation process will stay clear.';
  const trustDecisionItems = lang === 'zh'
    ? [
        { label: '多城市路线设计', value: '北京、上海、成都、西安、新疆等目的地都可以灵活组合。' },
        { label: '按节奏定制行程', value: '根据你的时间安排、出行方式和团队需求来规划。' },
        { label: '双语沟通支持', value: '从首次咨询到行程确认，沟通始终清晰直接。' },
      ]
    : [
        { label: 'Multi-city route design', value: 'Beijing, Shanghai, Chengdu, Xi’an, Xinjiang and beyond.' },
        { label: 'Tailor-made pacing', value: 'Planned around your schedule, travel style and group needs.' },
        { label: 'Bilingual communication', value: 'Clear support from first inquiry to trip confirmation.' },
      ];
  const highlightSectionEyebrow = lang === 'zh' ? '适合谁' : 'Who It’s For';
  const highlightSectionTitle = lang === 'zh' ? '适合想先把方向理清的人' : 'For Travelers Who Want the Direction Clear First';
  const highlightSectionBody = lang === 'zh'
    ? '适合不想上来就套模板，而是先确认路线值不值得做的人。'
    : 'Best for travelers who do not want a copied template and prefer to confirm whether the route is worth doing first.';
  const highlightItems = lang === 'zh'
    ? [
        {
          eyebrow: '首访中国',
          title: '第一次来中国的旅行者',
          desc: '适合先从一条更清晰、更容易确认的主线开始。',
          featured: true,
        },
        {
          eyebrow: '家庭与小团',
          title: '私人小团与家庭出行',
          desc: '安排会围绕同行结构、节奏和偏好来调整。',
        },
        {
          eyebrow: '研学与商务',
          title: '研学与商务出行',
          desc: '兼顾路线安排、沟通衔接与执行细节。',
        },
      ]
    : [
        {
          eyebrow: 'First-Time Travel',
          title: 'First-time visitors',
          desc: 'Start with a clearer route before adding anything extra.',
          featured: true,
        },
        {
          eyebrow: 'Families and Groups',
          title: 'Private groups and families',
          desc: 'Planned around group structure, pace and preferences.',
        },
        {
          eyebrow: 'Study and Business',
          title: 'Study and corporate travel',
          desc: 'Balanced around logistics, communication and execution.',
        },
      ];

  return (
    <>
      <HomeStructuredData lang={lang} settings={settings} siteTitle={siteTitle} siteDescription={siteDescription} />
      <div className="min-h-screen bg-[#07111F] text-[var(--color-foreground)]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[rgba(7,17,31,0.86)] text-white backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href={withLang('/', lang)} className="flex items-center">
              <div>
                <p className="text-base font-semibold tracking-[0.04em] text-white md:text-lg">{siteTitle}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/55">{lang === 'en' ? 'China Travel Planning' : '中国定制旅行规划'}</p>
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <Link href={withLang('/services', lang)} className="text-sm uppercase tracking-[0.18em] text-white/62 transition hover:text-white">{lang === 'zh' ? '服务' : 'Services'}</Link>
              <Link href={withLang('/destinations', lang)} className="text-sm uppercase tracking-[0.18em] text-white/62 transition hover:text-white">{lang === 'zh' ? '目的地' : 'Destinations'}</Link>
              <Link href={withLang('/insights', lang)} className="text-sm uppercase tracking-[0.18em] text-white/62 transition hover:text-white">{lang === 'zh' ? '灵感' : 'Insights'}</Link>
              <Link href={withLang('/payment', lang)} className="text-sm uppercase tracking-[0.18em] text-white/62 transition hover:text-white">{lang === 'zh' ? '支付' : 'Payment'}</Link>
              <Link href={withLang('/about', lang)} className="text-sm uppercase tracking-[0.18em] text-white/62 transition hover:text-white">{t.about}</Link>
              <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.18em] text-white/62 transition hover:text-white">{t.contact}</Link>
              <Link href={withLang('/', switchLang)} className="rounded-full border border-white/18 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/72 transition hover:border-white/38 hover:text-white">{languageSwitchLabel}</Link>
            </div>

            <SmartLink href={navCtaLink} lang={lang} className="inline-flex items-center rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-semibold text-[#07111F] transition hover:bg-[#B8914F]">
              {navCtaText}
            </SmartLink>
          </div>
        </div>
      </nav>

      <main className="relative flex min-h-screen items-center overflow-hidden px-4 pb-10 pt-24 text-white md:px-8">
        <div className="absolute inset-0 bg-[#D7E2EA]">
          {heroVideoUrl ? (
            <video className="hidden h-full w-full object-cover md:block" autoPlay muted loop playsInline poster={imageUrlFor(heroImage, 1800, fallbackImages.hero)}>
              <source src={heroVideoUrl} />
            </video>
          ) : null}
          <div className={`absolute inset-0 ${heroVideoUrl ? 'block md:hidden' : 'block'}`}>
            <Image src={imageUrlFor(heroImage, 2200, fallbackImages.hero)} alt={heroTitle || siteTitle} fill className="object-cover" sizes="100vw" preload />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.78)_0%,rgba(16,35,61,0.52)_38%,rgba(246,249,252,0.1)_72%,rgba(246,249,252,0.38)_100%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,249,252,0.44)_0%,rgba(215,226,234,0.08)_22%,rgba(7,17,31,0.28)_68%,rgba(246,249,252,0.92)_100%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(215,226,234,0.24),transparent_26%)]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[88rem] py-16">
          <div className="max-w-5xl">
            <p className={eyebrowClass(lang, 'text-[#E5D6B8]')}>{heroEyebrow}</p>
            <div className="mt-5 inline-flex rounded-full border border-white/22 bg-[#07111F]/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/86 backdrop-blur-md">{heroBrandLabel}</div>
            <h1 className="mt-7 max-w-5xl text-5xl font-normal leading-[0.94] tracking-[-0.045em] text-[#FFFDF8] drop-shadow-[0_3px_22px_rgba(7,17,31,0.44)] md:text-7xl xl:text-[6.7rem]" style={editorialHeadingStyle}>{heroTitle}</h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-white/92 drop-shadow-[0_2px_12px_rgba(7,17,31,0.3)] md:text-2xl md:leading-9">{heroSubtitle}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78 drop-shadow-[0_2px_10px_rgba(7,17,31,0.28)] md:text-base md:leading-8">{heroSupporting}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <SmartLink href={heroPrimaryHref} lang={lang} newTab={heroSection?.primaryButtonNewTab} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#C8A96A] px-8 py-4 text-sm font-bold text-[#07111F] shadow-[0_18px_42px_rgba(7,17,31,0.24)] transition hover:bg-[#B8914F]">
                {heroPrimaryText}
              </SmartLink>
              {heroSecondaryText && heroSecondaryHref ? (
                <SmartLink href={heroSecondaryHref} lang={lang} newTab={heroSection?.secondaryButtonNewTab} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/34 bg-[#07111F]/24 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/14">
                  {heroSecondaryText}
                </SmartLink>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <section className="relative z-20 bg-[#07111F] px-4 pb-12 pt-14 md:px-8 md:pt-18">
        <div className="mx-auto max-w-[88rem] overflow-hidden rounded-[2.15rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(226,236,244,0.8))] p-3 shadow-[0_28px_90px_rgba(7,17,31,0.3),inset_0_1px_0_rgba(255,255,255,0.72)] md:p-4">
          <div className="grid gap-px overflow-hidden rounded-[1.65rem] bg-[#BFCFDC]/70 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-white/56 p-6 md:p-8 lg:p-10">
              <p className={eyebrowClass(lang, 'text-[#B98D45]')}>{trustSectionEyebrow}</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-normal leading-[1.05] tracking-[-0.035em] text-[#10233D] md:text-5xl" style={editorialHeadingStyle}>{trustSectionTitle}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5D7084] md:text-base md:leading-8">{trustSectionBody}</p>
            </div>
            <div className="grid bg-white/40 md:grid-cols-3">
              {trustDecisionItems.map((item, index) => (
                <div key={item.label} className="border-t border-white/70 p-6 transition hover:bg-white/48 md:border-l md:border-t-0 md:p-8">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B98D45]">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="mt-4 text-base font-semibold leading-6 text-[#10233D]">{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5D7084]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!hasCmsSections ? <section className="relative z-20 -mt-14 px-6">
        <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-[rgba(10,27,52,0.08)] bg-white/95 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.14)] backdrop-blur-sm md:p-7">
          <div className="flex flex-col gap-4 border-b border-[rgba(10,27,52,0.08)] pb-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{highlightSectionEyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-[var(--color-navy)] md:text-3xl">{highlightSectionTitle}</h2>
            </div>
            <p className="max-w-lg text-sm leading-6.5 text-[var(--color-muted)]">{highlightSectionBody}</p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
            {highlightItems.map((item) => (
              <HighlightChip key={item.title} eyebrow={item.eyebrow} title={item.title} desc={item.desc} featured={item.featured} />
            ))}
          </div>
        </div>
      </section> : null}

      {hasCmsSections ? nonHeroSections.map((section: any, index: number) => {
        switch (section._type) {
          case 'featureIconsSection':
            return <FeatureIconsSection key={`${section._type}-${index}`} section={section} lang={lang} />;
          case 'audienceSolutionsSection':
            return <AudienceSolutionsSection key={`${section._type}-${index}`} section={section} lang={lang} />;
          case 'destinationCardsSection':
            return <DestinationCardsSection key={`${section._type}-${index}`} section={section} destinations={destinations} lang={lang} />;
          case 'tourListSection':
            return <CaseInspirationsSection key={`${section._type}-${index}`} section={section} tours={getSectionTours(section, tours)} lang={lang} />;
          case 'articleListSection':
            return <ArticleListSection key={`${section._type}-${index}`} section={section} articles={getSectionArticles(section, articles)} lang={lang} />;
          case 'faqPreviewSection':
            return <FaqPreviewSection key={`${section._type}-${index}`} section={section} faqItems={faqItems} lang={lang} />;
          case 'testimonialsSection':
            return <TestimonialsSection key={`${section._type}-${index}`} section={section} lang={lang} />;
          case 'statsSection':
            return <StatsSection key={`${section._type}-${index}`} section={section} lang={lang} />;
          case 'ctaSection':
            return <CtaSection key={`${section._type}-${index}`} section={section} lang={lang} />;
          default:
            return null;
        }
      }) : (
        <>
          <FeaturedDestinationsShowcase lang={lang} />
          <RouteIdeasShowcase lang={lang} />
          <PlanningProcessSection lang={lang} />
          <FinalHomeCta lang={lang} />
        </>
      )}

      <footer id="footer-contact" className="border-t border-[var(--color-line)] bg-[#f6f8fc] py-18 text-[var(--color-navy)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">Infinite Travel</p>
              <h4 className="mt-3 text-2xl font-semibold text-[var(--color-navy)]">{siteTitle}</h4>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--color-muted)]">{footerIntro}</p>
            </div>
            <div>
              <h5 className="text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">{t.contact}</h5>
              <ul className="mt-4 space-y-3 text-sm text-[var(--color-slate)]">
                {settings?.contactEmail && <li>{settings.contactEmail}</li>}
                <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--color-navy)]">WhatsApp: {WHATSAPP_DISPLAY}</a></li>
                {(settings?.contactPhone || settings?.whatsappNumber) && <li>{settings.contactPhone || settings.whatsappNumber}</li>}
                {settings?.wechat && <li>WeChat: {settings.wechat}</li>}
                {contactAddress && <li>{contactAddress}</li>}
              </ul>
            </div>
            <div>
              <h5 className="text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">{t.quickLinks}</h5>
              <ul className="mt-4 space-y-3 text-sm text-[var(--color-slate)]">
                <li><Link href={withLang('/services', lang)} className="transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '服务' : 'Services'}</Link></li>
                <li><Link href={withLang('/destinations', lang)} className="transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '目的地' : 'Destinations'}</Link></li>
                <li><Link href={withLang('/insights', lang)} className="transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '灵感' : 'Insights'}</Link></li>
                <li><Link href={withLang('/payment', lang)} className="transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '支付' : 'Payment'}</Link></li>
                <li><Link href={withLang('/contact', lang)} className="transition hover:text-[var(--color-navy)]">{t.contact}</Link></li>
                <li><Link href={withLang('/faq', lang)} className="transition hover:text-[var(--color-navy)]">{t.faq}</Link></li>
                <li><Link href={withLang('/about', lang)} className="transition hover:text-[var(--color-navy)]">{t.about}</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">{t.siteIntro}</h5>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{siteDescription}</p>
              <LegalLinks lang={lang} title={lang === 'zh' ? '法务' : 'Legal'} className="mt-6 space-y-3 text-sm text-[var(--color-slate)]" />
            </div>
          </div>
          <div className="mt-12 border-t border-[rgba(10,27,52,0.08)] pt-6 text-center text-sm text-[var(--color-muted)]">
            <p>{lang === 'zh' ? `© 2026 ${siteTitle}。保留所有权利。` : `© 2026 ${siteTitle}. All rights reserved.`}</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

function resolveManagedLink(target?: string, custom?: string) {
  if (!target || target === 'none') return custom || '';
  if (target === 'custom') return custom || '';
  return target;
}

function HomeStructuredData({ lang, settings, siteTitle, siteDescription }: { lang: Lang; settings: any; siteTitle: string; siteDescription: string }) {
  const contactEmail = pickLocalized(settings?.contactEmail, lang) || settings?.contactEmail || undefined;
  const organization = buildOrganizationJsonLd({
    name: siteTitle,
    description: siteDescription,
    email: contactEmail,
    url: SITE_URL,
  });
  const website = buildWebSiteJsonLd({
    name: siteTitle,
    description: siteDescription,
    url: SITE_URL,
  });

  return (
    <>
      <JsonLd id="home-organization-jsonld" data={organization} />
      <JsonLd id="home-website-jsonld" data={website} />
    </>
  );
}

function useDisplayText(value: any, lang: Lang, fallback = '') {
  const picked = pickLocalized(value, lang) || fallback;
  return markPlaceholder(picked);
}

const editorialHeadingStyle = { fontFamily: 'Georgia, "Times New Roman", serif' };

function eyebrowClass(lang: Lang, color = 'text-[#b9965b]') {
  return lang === 'zh'
    ? `text-sm font-medium ${color}`
    : `text-xs font-semibold uppercase tracking-[0.32em] ${color}`;
}

function SmartLink({ href, newTab, className, children, lang }: any) {
  if (!href) return <span className={className}>{children}</span>;
  const finalHref = withLang(href, lang || 'en');
  const isAnchor = finalHref.startsWith('#');
  const isInternal = finalHref.startsWith('/') || isAnchor;
  if (isInternal) return <Link href={finalHref} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</Link>;
  return <a href={finalHref} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</a>;
}

function getSectionTours(section: any, tours: any[]) {
  const source = section?.sourceMode === 'manual' ? section?.selectedTours : tours;
  return (Array.isArray(source) ? source : []).filter((item: any) => item?.published !== false);
}

function getSectionArticles(section: any, articles: any[]) {
  const source = section?.sourceMode === 'manual' ? section?.selectedArticles : articles;
  return (Array.isArray(source) ? source : []).filter((item: any) => item?.published !== false).slice(0, section?.maxItems || 3);
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title?: string; subtitle?: string }) {
  return (
    <div className="mb-14 max-w-4xl">
      {eyebrow && <p className="text-sm font-medium text-[#b9965b]">{eyebrow}</p>}
      {title && <p className="mt-4 text-5xl font-normal leading-[0.98] tracking-[-0.035em] text-[#142033] md:text-7xl" style={editorialHeadingStyle}>{title}</p>}
      {subtitle && <p className="mt-4 text-base leading-8 text-[var(--color-muted)] md:text-lg">{subtitle}</p>}
    </div>
  );
}

function HighlightChip({ title, desc, eyebrow, featured }: { title: string; desc: string; eyebrow?: string; featured?: boolean }) {
  return (
    <div className={`rounded-[1.5rem] border p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(10,27,52,0.08)] ${featured ? 'border-[rgba(10,27,52,0.14)] bg-[linear-gradient(180deg,#f8fbff,white)] shadow-[0_18px_45px_rgba(10,27,52,0.08)]' : 'border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)]'}`}>
      {eyebrow && <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">{eyebrow}</div>}
      <div className="mt-3 text-base font-semibold leading-7 text-[var(--color-navy)]">{title}</div>
      <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{desc}</p>
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[rgba(10,27,52,0.08)] bg-white p-4">
      <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">{label}</div>
      <div className="mt-2 text-lg font-semibold text-[var(--color-navy)]">{value}</div>
    </div>
  );
}

function FeaturedDestinationsShowcase({ lang }: { lang: Lang }) {
  const items = getHomeDestinationCards(lang);

  return (
    <section id="destinations" className="bg-[linear-gradient(180deg,#f7f9fc_0%,#ffffff_42%,#f5f8fc_100%)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[#b9965b]">{lang === 'zh' ? '精选目的地' : 'Featured Destinations'}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--color-navy)] md:text-5xl">{lang === 'zh' ? '先看目的地的性格，再决定路线。' : 'Choose the place by its travel logic, not just its name.'}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)] md:text-base">
            {lang === 'zh'
              ? '这些目的地可以单独成行，也可以组合成更顺的中国多城市路线。每张卡片只保留一个判断重点。'
              : 'Each destination can stand alone or become part of a smoother multi-city China route. The point is to understand what each place is best for.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <SmartCardLink key={item.slug} href={`/destinations/${item.slug}`} lang={lang} className={`group relative block overflow-hidden rounded-[2rem] bg-[var(--color-night)] shadow-[0_24px_70px_rgba(10,27,52,0.15)] ${index === 0 ? 'md:col-span-2 xl:col-span-2' : ''}`}>
              <div className={`${index === 0 ? 'h-[30rem]' : 'h-[26rem]'} relative`}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.86),rgba(4,10,18,0.26)_58%,rgba(4,10,18,0.04))]"></div>
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/78 backdrop-blur-md">{item.fit}</div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-7">
                  <h3 className="text-2xl font-semibold md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/78">{item.line}</p>
                  <span className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-[#d8c49a]">{lang === 'zh' ? '查看目的地' : 'View Destination'}</span>
                </div>
              </div>
            </SmartCardLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteIdeasShowcase({ lang }: { lang: Lang }) {
  const items = getHomeRouteIdeas(lang);

  return (
    <section id="cases" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.34em] text-[#b9965b]">{lang === 'zh' ? '路线灵感' : 'Sample Journeys'}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--color-navy)] md:text-5xl">{lang === 'zh' ? '不是固定套餐，而是起点。' : 'Starting points, not fixed packages.'}</h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              {lang === 'zh'
                ? '先从一条最接近你想法的路线开始，再根据日期、人数、预算和节奏做取舍。'
                : 'Begin with the route that feels closest, then adjust around dates, group size, budget and pace.'}
            </p>
            <SmartLink href="/tours" lang={lang} className="mt-8 inline-flex rounded-full border border-[rgba(10,27,52,0.14)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
              {lang === 'zh' ? '查看路线案例' : 'View Route Cases'}
            </SmartLink>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <SmartCardLink key={item.title} href={item.href} lang={lang} className="group grid overflow-hidden rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] shadow-[0_20px_55px_rgba(10,27,52,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(10,27,52,0.12)] md:grid-cols-[0.46fr_0.54fr]">
                <div className="relative min-h-72 md:min-h-full">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 38vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.34),transparent)]"></div>
                </div>
                <div className="flex min-h-72 flex-col justify-between p-7 md:p-9">
                  <div>
                    <div className="inline-flex rounded-full border border-[rgba(16,35,61,0.1)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">{item.kicker}</div>
                    <h3 className="mt-5 text-2xl font-semibold leading-snug text-[var(--color-navy)] md:text-3xl">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base md:leading-8">{item.description}</p>
                  </div>
                  <div className="mt-7 border-t border-[rgba(16,35,61,0.1)] pt-5 text-sm leading-6 text-[var(--color-slate)]">
                    <span className="font-semibold text-[var(--color-navy)]">{lang === 'zh' ? '适合：' : 'Best for: '}</span>{item.bestFor}
                  </div>
                </div>
              </SmartCardLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanningProcessSection({ lang }: { lang: Lang }) {
  const steps = getPlanningSteps(lang);

  return (
    <section className="bg-[var(--color-panel-2)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.34em] text-[#b9965b]">{lang === 'zh' ? '规划流程' : 'How Planning Works'}</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--color-navy)] md:text-5xl">{lang === 'zh' ? '每一步都先讲清楚。' : 'A clear process before you commit.'}</h2>
          <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
            {lang === 'zh'
              ? '我们不会催你马上付款。先把路线方向、确认范围和报价边界说清楚，再进入下一步。'
              : 'No pressure to pay before the route makes sense. We clarify direction, confirmation scope and quote boundaries first.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-[1.8rem] border border-[rgba(16,35,61,0.09)] bg-white/85 p-7 shadow-[0_18px_45px_rgba(10,27,52,0.06)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-navy)] text-sm font-semibold text-white">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="mt-6 text-xl font-semibold leading-snug text-[var(--color-navy)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalHomeCta({ lang }: { lang: Lang }) {
  return (
    <section className="bg-white px-6 py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] bg-[var(--color-night)] px-7 py-16 text-white shadow-[0_35px_90px_rgba(8,19,33,0.18)] md:px-14 lg:px-20">
        <Image src="/media/custom/destinations/yunnan/yunnan-selected.jpg" alt={lang === 'zh' ? '云南风景' : 'Yunnan landscape'} fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,19,33,0.94),rgba(8,19,33,0.78)_54%,rgba(8,19,33,0.48))]"></div>
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.34em] text-[#d8c49a]">{lang === 'zh' ? '开始咨询' : 'Start With A Conversation'}</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{lang === 'zh' ? '先把你的中国旅行想法发给我们。' : 'Send the shape of your China trip first.'}</h2>
          <p className="mt-5 text-base leading-8 text-white/78 md:text-lg">
            {lang === 'zh'
              ? '不需要一次说完整。日期、人数、想去的城市和大致预算就足够我们先判断方向。'
              : 'It does not need to be complete. Dates, group size, cities in mind and a rough budget are enough for a first route direction.'}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <SmartLink href="/contact#inquiry-form" lang={lang} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#d8c49a] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-night)] transition hover:bg-[#ead9b6]">{lang === 'zh' ? '提交旅行需求' : 'Start Planning'}</SmartLink>
            <SmartLink href="/destinations" lang={lang} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/28 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/50">{lang === 'zh' ? '先看目的地' : 'View Destinations'}</SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function getHomeDestinationCards(lang: Lang) {
  return lang === 'zh'
    ? [
        { slug: 'beijing', title: '北京', fit: '首访中国', line: '适合把历史、城市秩序和经典地标作为中国旅行的起点。', image: '/media/custom/destinations/beijing/beijing-selected.jpg' },
        { slug: 'shanghai', title: '上海', fit: '现代城市', line: '适合作为国际抵达、商务停留或江南路线的清晰入口。', image: '/media/custom/destinations/shanghai/shanghai-selected.jpg' },
        { slug: 'xinjiang', title: '新疆', fit: '风景主线', line: '适合愿意留出更长时间，重视自然景观和交通节奏的旅客。', image: '/media/custom/destinations/xinjiang/xinjiang-selected.jpg' },
        { slug: 'yunnan', title: '云南', fit: '慢节奏', line: '适合把城市、古镇、山地风景和更柔和的节奏放在一起。', image: '/media/custom/destinations/yunnan/yunnan-selected.jpg' },
        { slug: 'chengdu', title: '成都', fit: '生活方式', line: '适合在熊猫、川菜和西南城市节奏之间加入一段松弛停留。', image: '/media/custom/destinations/chengdu/chengdu-selected.jpg' },
        { slug: 'guilin', title: '桂林', fit: '山水收尾', line: '适合给城市路线加入更柔和的自然段落，常用于放慢中后段节奏。', image: '/media/custom/destinations/guilin/guilin-selected.jpg' },
      ]
    : [
        { slug: 'beijing', title: 'Beijing', fit: 'First China Trip', line: 'A strong starting point when history, landmarks and route clarity matter.', image: '/media/custom/destinations/beijing/beijing-selected.jpg' },
        { slug: 'shanghai', title: 'Shanghai', fit: 'Modern Gateway', line: 'Useful for international arrivals, business stops and routes into eastern China.', image: '/media/custom/destinations/shanghai/shanghai-selected.jpg' },
        { slug: 'xinjiang', title: 'Xinjiang', fit: 'Landscape Route', line: 'Best when scenery is the focus and the schedule can respect longer distances.', image: '/media/custom/destinations/xinjiang/xinjiang-selected.jpg' },
        { slug: 'yunnan', title: 'Yunnan', fit: 'Softer Pace', line: 'Good for mixing old towns, mountain scenery and a less hurried rhythm.', image: '/media/custom/destinations/yunnan/yunnan-selected.jpg' },
        { slug: 'chengdu', title: 'Chengdu', fit: 'Lifestyle Stop', line: 'A relaxed southwest base for pandas, food and a softer middle section.', image: '/media/custom/destinations/chengdu/chengdu-selected.jpg' },
        { slug: 'guilin', title: 'Guilin', fit: 'Scenic Reset', line: 'A calm nature segment that works well after heavier city days.', image: '/media/custom/destinations/guilin/guilin-selected.jpg' },
      ];
}

function getHomeRouteIdeas(lang: Lang) {
  return lang === 'zh'
    ? [
        { title: '首次中国经典主线', kicker: '北京 + 西安 + 上海', description: '适合第一次来中国，希望用一条稳定路线理解历史、城市和交通节奏的旅客。', bestFor: '家庭、私人小团、首次访华客人', image: '/media/custom/destinations/xian/xian-selected.jpg', href: '/tours' },
        { title: '城市与山水平衡路线', kicker: '上海 + 桂林 + 成都', description: '把现代城市、自然景观和更松弛的西南生活方式放在一条不太赶的路线里。', bestFor: '想降低疲劳感的家庭或情侣', image: '/media/custom/destinations/guilin/guilin-selected.jpg', href: '/tours' },
        { title: '风景导向型西部路线', kicker: '新疆 + 成都或北京', description: '适合把自然景观放在核心位置，同时保留一个更容易抵达和衔接的城市节点。', bestFor: '摄影、自然风景和长线旅行需求', image: '/media/custom/destinations/xinjiang/xinjiang-selected.jpg', href: '/tours' },
      ]
    : [
        { title: 'Classic First China Direction', kicker: 'Beijing + Xi\'an + Shanghai', description: 'A stable first-trip route for travelers who want history, cities and logistics to make sense from the start.', bestFor: 'Families, private groups and first-time visitors', image: '/media/custom/destinations/xian/xian-selected.jpg', href: '/tours' },
        { title: 'Cities and Scenery in Balance', kicker: 'Shanghai + Guilin + Chengdu', description: 'Combines a modern gateway, a softer landscape section and a relaxed southwest city rhythm without overloading the trip.', bestFor: 'Families or couples who want a lower-fatigue route', image: '/media/custom/destinations/guilin/guilin-selected.jpg', href: '/tours' },
        { title: 'Western China Landscape Route', kicker: 'Xinjiang + Chengdu or Beijing', description: 'For travelers who want scenery to lead the journey while keeping one practical city anchor for arrival or recovery.', bestFor: 'Photography, nature and longer private journeys', image: '/media/custom/destinations/xinjiang/xinjiang-selected.jpg', href: '/tours' },
      ];
}

function getPlanningSteps(lang: Lang) {
  return lang === 'zh'
    ? [
        { title: '分享你的初步想法', body: '日期、人数、城市偏好、预算范围和出行目的即可，不需要准备完整行程。' },
        { title: '收到路线方向', body: '我们先判断城市组合、顺序和节奏是否合理，再说明可以调整的地方。' },
        { title: '确认细节与报价', body: '在路线方向清楚后，再确认酒店、交通、车导、活动和书面报价。' },
        { title: '带着支持出行', body: '行前和旅途中保持必要沟通，让执行细节更可控。' },
      ]
    : [
        { title: 'Share your rough idea', body: 'Dates, group size, cities in mind, budget range and travel purpose are enough to begin.' },
        { title: 'Receive a route direction', body: 'We check whether the city mix, order and pace are sensible before adding detail.' },
        { title: 'Confirm details and quote', body: 'Once the direction is clear, hotels, transport, guiding, activities and written quote can be confirmed.' },
        { title: 'Travel with support', body: 'Pre-trip and on-trip communication keeps the practical details easier to manage.' },
      ];
}

function FeatureIconsSection({ section, lang }: { section: any; lang: Lang }) {
  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <section id={section.anchorId || 'travel-styles'} className="bg-[linear-gradient(180deg,#F6F9FC_0%,#E7EEF3_100%)] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-[88rem] overflow-hidden rounded-[2.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(232,240,246,0.72))] text-[#10233D] shadow-[0_28px_90px_rgba(16,35,61,0.14)] backdrop-blur">
        <div className="grid gap-px bg-white/50 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-white/42 p-7 md:p-12 lg:p-14">
            <div className="lg:sticky lg:top-28">
              <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{uiText[lang].capabilities}</p>
              <h2 className="mt-5 text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-[#10233D] md:text-6xl" style={editorialHeadingStyle}>{useDisplayText(section.title, lang)}</h2>
              {useDisplayText(section.subtitle, lang) ? <p className="mt-5 max-w-xl text-base leading-8 text-[#5D7084]">{useDisplayText(section.subtitle, lang)}</p> : null}
              <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 text-sm leading-7 text-white/68">
                {lang === 'zh'
                  ? '能力不是单独售卖的功能点，而是一次路线判断中连续发生的取舍：城市顺序、节奏、沟通、确认边界。'
                  : 'Capabilities are not separate feature boxes. They work together as route judgment: city order, pace, communication and confirmation boundaries.'}
              </div>
            </div>
          </div>
          <div className="bg-white/30 p-4 md:p-8 lg:p-10">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-[#07111F]">
              {items.map((item: any, index: number) => <CapabilityMatrixRow key={index} item={item} index={index} total={items.length} lang={lang} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceSolutionsSection({ section, lang }: { section: any; lang: Lang }) {
  return (
    <section id={section.anchorId || 'audiences'} className="bg-[#EAF0F5] px-4 py-28 md:px-8">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader eyebrow={uiText[lang].audienceSolutions} title={useDisplayText(section.title, lang)} subtitle={useDisplayText(section.subtitle, lang)} />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {(section.items || []).map((item: any, index: number) => <AudienceCard key={index} item={item} lang={lang} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationCardsSection({ section, destinations, lang }: { section: any; destinations: any[]; lang: Lang }) {
  const manualItems = Array.isArray(section.items) ? section.items.map((item: any) => {
    const titleEn = pickLocalized(item.title, 'en') || '';
    const titleZh = pickLocalized(item.title, 'zh') || '';
    const inferredSlug = normalizeDestinationSlug(titleEn) || normalizeDestinationSlug(titleZh);
    return inferredSlug
      ? {
          ...item,
          linkTarget: item.linkTarget || `/destinations/${encodeURIComponent(inferredSlug)}`,
          backgroundImage: shouldForceLocalDestinationImage(inferredSlug) ? null : item.backgroundImage,
        }
      : item;
  }) : [];
  const dedupedDestinations = Array.isArray(destinations) ? prioritizeDestinations(dedupeDestinations(destinations)) : [];
  const autoItems = dedupedDestinations
    .slice(0, Math.max(section.maxItems || 6, 6))
    .map((destination: any) => ({
      title: destination.name,
      description: destination.tagline || destination.description,
      linkTarget: destination.slug ? `/destinations/${encodeURIComponent(destination.slug)}` : '/destinations',
      backgroundImage: destination.image,
      iconType: 'preset',
      presetIcon: 'compass',
    }));
  const items = manualItems.length > 0 ? manualItems : autoItems;
  return (
    <section id={section.anchorId || 'destinations'} className="bg-[linear-gradient(180deg,#07111F_0%,#10233D_42%,#EEF3F9_100%)] px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="max-w-4xl">
            <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{uiText[lang].destinations}</p>
            <h2 className="mt-4 text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-white md:text-6xl" style={editorialHeadingStyle}>{useDisplayText(section.title, lang)}</h2>
            {useDisplayText(section.subtitle, lang) ? <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 md:text-lg">{useDisplayText(section.subtitle, lang)}</p> : null}
          </div>
          <div className="rounded-[2rem] border border-white/14 bg-white/[0.08] p-6 text-base leading-8 text-white/72 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur md:p-8 lg:mb-3">
            <div className="mb-5 h-px w-24 bg-[#C8A96A]"></div>
            {lang === 'zh'
              ? '每个目的地都先作为路线判断的一部分来呈现：适合谁、放在行程哪一段、和哪些城市组合更顺。'
              : 'Each destination is presented as part of route judgment: who it fits, where it belongs in the journey, and how it can connect with other cities.'}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item: any, index: number) => <DestinationCard key={index} item={item} index={index} lang={lang} />)}
        </div>
        <div className="mt-12 text-center">
          <SmartLink href={withLang('/destinations', lang)} lang={lang} className="inline-flex rounded-full border border-[rgba(16,35,61,0.2)] bg-white/72 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
            {lang === 'zh' ? '查看更多目的地' : 'View More Destinations'}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

function CaseInspirationsSection({ section, tours, lang }: { section: any; tours: any[]; lang: Lang }) {
  const maxItems = section.maxItems || 3;
  const focusedTours = (section.sourceMode === 'manual' ? tours : prioritizeTours(tours)).slice(0, maxItems);
  const viewMoreHref = resolveManagedLink(section.viewMoreTarget, section.viewMoreLink) || '/tours';
  const viewMoreText = useDisplayText(section.viewMoreText, lang, lang === 'zh' ? '查看更多路线案例' : 'View More Tour Cases');
  return (
    <section id={section.anchorId || 'cases'} className="bg-[linear-gradient(180deg,#F7F9FC_0%,#E7EEF3_45%,#F7F9FC_100%)] px-4 py-16 text-[#10233D] md:px-8 md:py-20">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-8 lg:grid-cols-[0.64fr_1.36fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="mb-8 max-w-4xl">
              <p className={eyebrowClass(lang, 'text-[#B98D45]')}>{uiText[lang].sampleCases}</p>
              <h2 className="mt-4 text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-[#10233D] md:text-6xl" style={editorialHeadingStyle}>{useDisplayText(section.title, lang, lang === 'zh' ? '三条最容易理解的中国旅行主线' : 'Three Clear China Travel Directions')}</h2>
              <p className="mt-5 text-base leading-8 text-[#5D7084] md:text-lg">{useDisplayText(section.subtitle, lang, lang === 'zh' ? '它们更像 3 条容易理解的咨询入口，而不是只能照搬的固定团。先选一个最接近你的方向，再继续按日期、人数和预算往下收束。' : 'Think of these as three clear inquiry entry points rather than rigid fixed packages. Start with the direction closest to your idea, then tighten it around your dates, group size and budget.')}</p>
            </div>
            <SmartLink href={viewMoreHref} lang={lang} newTab={section.viewMoreNewTab} className="inline-flex rounded-full border border-[#10233D]/16 px-6 py-3 text-sm font-semibold text-[#10233D] transition hover:bg-[#10233D] hover:text-white">
              {viewMoreText}
            </SmartLink>
          </div>
          <div>
        {focusedTours && focusedTours.length > 0 ? (
          <div className="space-y-4">{focusedTours.map((tour: any, index: number) => <TourCard key={tour._id} tour={tour} lang={lang} index={index} />)}</div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[rgba(10,27,52,0.12)] bg-white px-6 py-16 text-center text-[var(--color-muted)]">
            <p className="text-lg">{uiText[lang].sampleCasesCanBeAdded}</p>
          </div>
        )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleListSection({ section, articles, lang }: { section: any; articles: any[]; lang: Lang }) {
  const viewMoreHref = resolveManagedLink(section.viewMoreTarget, section.viewMoreLink) || '/insights';
  const viewMoreText = useDisplayText(section.viewMoreText, lang, lang === 'zh' ? '查看更多灵感' : 'Explore More Insights');
  const featuredArticle = Array.isArray(articles) ? articles[0] : null;
  const supportingArticles = Array.isArray(articles) ? articles.slice(1) : [];

  return (
    <section id={section.anchorId || 'articles'} className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F9FC_0%,#EAF0F5_52%,#F7F9FC_100%)] px-4 py-20 text-[#10233D] md:px-8 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_20%_18%,rgba(200,169,106,0.16),transparent_24%),radial-gradient(circle_at_78%_8%,rgba(234,240,245,0.12),transparent_28%)]"></div>
      <div className="mx-auto max-w-[88rem] relative">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{uiText[lang].insights}</p>
            <h2 className="mt-4 text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-[#10233D] md:text-6xl" style={editorialHeadingStyle}>{useDisplayText(section.title, lang)}</h2>
          </div>
          <div className="max-w-2xl text-base leading-8 text-[#5D7084] md:text-lg">
            {useDisplayText(section.subtitle, lang) || (lang === 'zh' ? '把灵感内容整理成可扫描的判断材料，先理解路线逻辑，再决定是否深入规划。' : 'Guides are arranged as scannable planning references, so route logic comes before deep itinerary detail.')}
          </div>
        </div>
        {featuredArticle ? (
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <ArticleCard article={featuredArticle} lang={lang} featured />
            <div className="flex flex-col rounded-[2.1rem] border border-white/70 bg-white/54 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur">
              <div className="border-b border-white/70 p-6 md:p-7">
                <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{lang === 'zh' ? '继续阅读' : 'Planning Notes'}</p>
                <p className="mt-3 text-sm leading-7 text-[#5D7084]">
                  {lang === 'zh' ? '更短的文章入口，适合快速判断一个城市、路线或准备步骤是否与你有关。' : 'Shorter entries for quickly judging whether a city, route or preparation step is relevant to your trip.'}
                </p>
              </div>
              <div className="divide-y divide-white/10">
                {supportingArticles.length > 0 ? supportingArticles.map((article: any) => <ArticleListItem key={article._id || article.slug} article={article} lang={lang} />) : <ArticleListItem article={featuredArticle} lang={lang} />}
              </div>
              {viewMoreText && viewMoreHref ? (
                <div className="mt-auto border-t border-white/70 p-6 md:p-7">
                  <SmartLink href={viewMoreHref} lang={lang} newTab={section.viewMoreNewTab} className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C8A96A] hover:text-[#07111F]">
                    {viewMoreText}
                  </SmartLink>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[rgba(10,27,52,0.12)] bg-[var(--color-soft-white)] px-6 py-16 text-center text-[var(--color-muted)]">
            <p className="text-lg">{uiText[lang].planningInsightsCanBeAdded}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function StatsSection({ section, lang }: { section: any; lang: Lang }) {
  const defaultItems = lang === 'zh'
    ? [
        { number: '路线逻辑更清楚', label: '' },
        { number: '定制方式更灵活', label: '' },
        { number: '规划支持更务实', label: '' },
      ]
    : [
        { number: 'Clear route logic', label: '' },
        { number: 'Flexible customization', label: '' },
        { number: 'Practical planning support', label: '' },
      ];
  const items = Array.isArray(section.items) && section.items.length > 0 ? section.items : defaultItems;

  return (
    <section className="bg-[linear-gradient(180deg,#F7F9FC_0%,#EAF0F5_100%)] px-4 py-8 text-[#10233D] md:px-8">
      <div className="mx-auto max-w-[88rem] rounded-[2.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(232,240,246,0.72))] px-6 py-20 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="mb-14 max-w-4xl lg:mb-0">
            <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{uiText[lang].whyUs}</p>
            <h2 className="mt-4 text-5xl font-normal leading-[0.98] tracking-[-0.04em] text-[#10233D] md:text-7xl" style={editorialHeadingStyle}>{useDisplayText(section.title, lang, lang === 'zh' ? '为什么选择 Infinite Travel' : 'Why Infinite Travel')}</h2>
            {useDisplayText(section.subtitle, lang) ? <p className="mt-5 text-base leading-8 text-[#5D7084] md:text-lg">{useDisplayText(section.subtitle, lang)}</p> : null}
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 md:grid-cols-2">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-white/50 p-8 text-left md:p-10">
              <div className="text-4xl font-semibold tracking-[-0.03em] text-[#10233D] md:text-5xl">{useDisplayText(item.number, lang)}</div>
              {useDisplayText(item.label, lang) ? <div className="mt-3 text-sm uppercase tracking-[0.18em] text-[#5D7084]">{useDisplayText(item.label, lang)}</div> : null}
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ section, lang }: { section: any; lang: Lang }) {
  const defaultItems = lang === 'zh'
    ? [
        {
          rating: 5,
          quote: '我们原本在北京、西安和桂林之间拿不定主线，他们帮我们把路线节奏整理清楚之后，整个行程一下子就更容易决定了。',
          name: 'Emily',
          country: 'UK',
        },
        {
          rating: 5,
          quote: '新疆一开始看起来很难规划，但他们给出的结构把城市、风景和交通节奏讲清楚后，整个方向就没有那么吓人了。',
          name: 'Daniel',
          country: 'Singapore',
        },
        {
          rating: 5,
          quote: '最有帮助的不是“推荐景点”，而是他们会直接告诉我们哪些组合太赶，哪些更适合第一次来中国。',
          name: 'Sofia',
          country: 'Spain',
        },
      ]
    : [
        {
          rating: 5,
          quote: 'We were unsure whether to do Beijing, Xi’an or Guilin first. Once they restructured the pacing, the whole route became much easier to decide.',
          name: 'Emily',
          country: 'UK',
        },
        {
          rating: 5,
          quote: 'Xinjiang looked difficult to plan at first, but their route logic made the transport rhythm and scenery balance feel much more manageable.',
          name: 'Daniel',
          country: 'Singapore',
        },
        {
          rating: 5,
          quote: 'The most useful part was not just attraction suggestions. They were clear about which combinations were too rushed and which ones fit a first China trip better.',
          name: 'Sofia',
          country: 'Spain',
        },
      ];
  const items = Array.isArray(section.items) && section.items.length > 0 ? section.items : defaultItems;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F9FC_0%,#EAF0F5_48%,#F7F9FC_100%)] px-4 py-20 text-[#10233D] md:px-8 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(circle_at_12%_20%,rgba(207,174,106,0.16),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(199,212,221,0.14),transparent_30%)]"></div>
      <div className="mx-auto max-w-[88rem] relative">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{uiText[lang].testimonials}</p>
            <h2 className="mt-4 text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-[#10233D] md:text-6xl" style={editorialHeadingStyle}>{useDisplayText(section.title, lang)}</h2>
          </div>
          {useDisplayText(section.subtitle, lang) ? <p className="max-w-2xl text-base leading-8 text-[#5D7084] md:text-lg">{useDisplayText(section.subtitle, lang)}</p> : null}
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/56 md:grid-cols-3">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-white/58 p-7 backdrop-blur md:p-8 lg:p-10">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="h-px w-16 bg-[#C8A96A]/60"></div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">{String(index + 1).padStart(2, '0')}</div>
              </div>
              <p className="text-xl leading-8 text-[#10233D] md:text-2xl md:leading-9" style={editorialHeadingStyle}>“{useDisplayText(item.quote, lang)}”</p>
              <div className="mt-8 text-sm text-[#5D7084]">{item.name} · {item.country}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <SmartLink href={withLang('/about', lang)} lang={lang} className="inline-flex rounded-full border border-[#10233D]/16 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10233D] transition hover:bg-[#10233D] hover:text-white">
            {lang === 'zh' ? '查看更多客户反馈' : 'View More Testimonials'}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

function FaqPreviewSection({ section, faqItems, lang }: { section: any; faqItems: any[]; lang: Lang }) {
  const fallbackFaqItems = lang === 'zh'
    ? [
        { question: '多久可以收到初步路线方向？', answer: '通常 24 小时内可以先给出一个方向判断，包括城市组合、节奏和下一步需要确认的信息。' },
        { question: '可以只先咨询路线，不马上付款吗？', answer: '可以。我们建议先把路线方向判断清楚，再进入具体报价、酒店、交通和服务确认。' },
        { question: '适合第一次来中国的旅客吗？', answer: '适合。第一次来中国更需要先确认城市顺序、交通节奏和每天安排密度，避免路线看起来丰富但实际过赶。' },
        { question: '可以做家庭或私人小团吗？', answer: '可以。我们会根据人数、年龄结构、预算和节奏偏好调整路线，而不是直接套固定团。' },
      ]
    : [
        { question: 'How soon can I receive an initial route direction?', answer: 'Usually within 24 hours, we can give an initial judgment on city order, pacing and what details should be confirmed next.' },
        { question: 'Can I ask about the route before paying?', answer: 'Yes. We recommend clarifying the route direction first, then moving into quote, hotel, transport and service confirmation.' },
        { question: 'Is this suitable for a first trip to China?', answer: 'Yes. First-time travelers benefit most from clear city order, transport rhythm and realistic daily pacing.' },
        { question: 'Can you plan for families or private groups?', answer: 'Yes. Routes can be adjusted around group size, age mix, budget and travel style instead of using a fixed package.' },
      ];
  const sourceFaqItems = Array.isArray(faqItems) && faqItems.length > 0 ? faqItems : fallbackFaqItems;
  const list = sourceFaqItems.slice(0, section.maxItems || 4);
  const customViewMoreHref = resolveManagedLink(section.viewMoreTarget, section.viewMoreLink);
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F9FC_0%,#EAF0F5_50%,#F7F9FC_100%)] px-4 py-20 text-[#10233D] md:px-8 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:linear-gradient(180deg,rgba(234,240,245,0.08),transparent_28%,rgba(200,169,106,0.08)_72%,transparent)]"></div>
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[0.68fr_1.32fr] relative">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2.25rem] border border-white/70 bg-white/54 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur md:p-9">
            <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{uiText[lang].faq}</p>
            <h2 className="mt-4 text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-[#10233D] md:text-6xl" style={editorialHeadingStyle}>{useDisplayText(section.title, lang)}</h2>
            {useDisplayText(section.subtitle, lang) ? <p className="mt-5 text-base leading-8 text-[#5D7084]">{useDisplayText(section.subtitle, lang)}</p> : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <SmartLink href="/faq" lang={lang} className="inline-flex justify-center rounded-full bg-[#C8A96A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#07111F] transition hover:bg-[#B8914F]">
                {lang === 'zh' ? '查看更多常见问题' : 'View More FAQ'}
              </SmartLink>
              {section.viewMoreText && customViewMoreHref ? (
                <SmartLink href={customViewMoreHref} lang={lang} className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/50">
                  {useDisplayText(section.viewMoreText, lang)}
                </SmartLink>
              ) : null}
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/54 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur">
          {list.map((faq: any, index: number) => (
            <details key={index} className="group border-b border-white/70 last:border-b-0">
              <summary className="flex cursor-pointer items-center justify-between gap-5 p-6 text-base font-semibold text-[#10233D] md:p-7">
                <span className="flex items-start gap-4">
                  <span className="mt-1 text-xs font-semibold tracking-[0.22em] text-[#C8A96A]">{String(index + 1).padStart(2, '0')}</span>
                  <span>{useDisplayText(faq.question, lang)}</span>
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/16 text-[#5D7084] transition group-open:rotate-45 group-open:bg-[#C8A96A] group-open:text-[#07111F]">+</span>
              </summary>
              <div className="px-6 pb-7 pl-[4.25rem] text-[#5D7084] leading-8 md:px-7 md:pb-8 md:pl-[4.75rem]">{useDisplayText(faq.answer, lang)}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ section, lang }: { section: any; lang: Lang }) {
  const ctaTitle = useDisplayText(section.title, lang, lang === 'zh' ? '告诉我们你的日期、人数和预算。' : 'Tell us your dates, group size and budget.');
  const ctaSubtitle = useDisplayText(section.subtitle, lang, lang === 'zh'
    ? '我们会帮你整理出一条更清晰、更容易确认的路线。'
    : 'We will help shape a route you can review and confirm with confidence.');
  const primaryButtonText = useDisplayText(section.primaryButtonText, lang, lang === 'zh' ? '提交旅行需求' : 'Send Trip Request');
  const primaryButtonHref = resolveManagedLink(section.primaryButtonTarget, section.primaryButtonLink) || '/contact#inquiry-form';
  const secondaryButtonText = useDisplayText(section.secondaryButtonText, lang, lang === 'zh' ? '查看联系方式' : 'View Contact Details');
  const secondaryButtonHref = resolveManagedLink(section.secondaryButtonTarget, section.secondaryButtonLink) || '/contact';

  return (
    <section className="bg-[#07111F] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-[88rem]">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-[#0B1B2B] px-8 py-20 text-white shadow-[0_36px_110px_rgba(0,0,0,0.34)] md:px-16 lg:px-20">
          {section.backgroundImage && (
            <div className="absolute inset-0">
              <Image src={imageUrlFor(section.backgroundImage, 1400, fallbackImages.destination)} alt={useDisplayText(section.title, lang) || 'CTA background'} fill className="object-cover" />
            </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.96),rgba(7,17,31,0.84)_56%,rgba(7,17,31,0.5))]"></div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-6 h-px w-24 bg-[#C8A96A]"></div>
              <h3 className="max-w-4xl text-5xl font-normal leading-[0.98] tracking-[-0.04em] md:text-7xl" style={editorialHeadingStyle}>{ctaTitle}</h3>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">{ctaSubtitle}</p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <SmartLink href={primaryButtonHref} lang={lang} newTab={section.primaryButtonNewTab} className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-[#C8A96A] px-9 py-4 text-sm font-bold text-[#07111F] transition hover:bg-[#B8914F]">{primaryButtonText}</SmartLink>
              {secondaryButtonText && secondaryButtonHref ? (
                <SmartLink href={secondaryButtonHref} lang={lang} newTab={section.secondaryButtonNewTab} className="inline-flex min-w-[240px] items-center justify-center rounded-full border border-white/24 px-9 py-4 text-sm font-bold text-white transition hover:bg-white/14">{secondaryButtonText}</SmartLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconInfoCard({ item, lang }: { item: any; lang: Lang }) {
  const icon = renderManagedIcon(item, 'text-4xl');
  return (
    <div className="flex h-full flex-col bg-[#FFFDF8] p-7 transition hover:bg-[#F7F1E7] md:p-8">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0F5] text-2xl text-[#0B1B2B]">{icon}</div>
      <h4 className="text-xl font-semibold text-[var(--color-navy)]">{useDisplayText(item.title, lang)}</h4>
      {item.description && <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-muted)]">{useDisplayText(item.description, lang)}</p>}
      {resolveManagedLink(item.linkTarget, item.link) && item.linkText && (
        <SmartLink href={resolveManagedLink(item.linkTarget, item.link)} lang={lang} newTab={item.newTab} className="mt-6 inline-flex text-sm font-semibold text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
          {useDisplayText(item.linkText, lang)}
        </SmartLink>
      )}
    </div>
  );
}

function CapabilityMatrixRow({ item, index, total, lang }: { item: any; index: number; total: number; lang: Lang }) {
  const icon = renderManagedIcon(item, 'text-base');
  const href = resolveManagedLink(item.linkTarget, item.link);

  return (
    <div className={`grid gap-5 p-6 md:grid-cols-[5rem_1fr_auto] md:items-start md:p-8 ${index < total - 1 ? 'border-b border-white/70' : ''}`}>
      <div className="flex items-center gap-3 text-white/54">
        <span className="text-sm font-semibold tracking-[0.22em] text-[#C8A96A]">{String(index + 1).padStart(2, '0')}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-white/[0.045] text-white/60">{icon}</span>
      </div>
      <div>
        <h4 className="text-xl font-normal leading-snug text-white md:text-2xl" style={editorialHeadingStyle}>{useDisplayText(item.title, lang)}</h4>
        {item.description && <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">{useDisplayText(item.description, lang)}</p>}
      </div>
      {href && item.linkText ? (
        <SmartLink href={href} lang={lang} newTab={item.newTab} className="inline-flex rounded-full border border-white/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/74 transition hover:border-white/36 hover:text-white">
          {useDisplayText(item.linkText, lang)}
        </SmartLink>
      ) : null}
    </div>
  );
}

function AudienceCard({ item, lang }: { item: any; lang: Lang }) {
  const icon = renderManagedIcon(item, 'text-4xl');
  return (
    <div className="flex min-h-[18rem] flex-col justify-between rounded-[2.25rem] border border-[rgba(20,32,51,0.1)] bg-[#FFFDF8] p-8 shadow-[0_24px_70px_rgba(20,32,51,0.07)]">
      <div className="mb-8 flex items-center gap-4 text-[#C8A96A]"><span className="text-3xl">{icon}</span><span className="h-px flex-1 bg-[rgba(20,32,51,0.14)]"></span></div>
      <h4 className="text-2xl font-normal leading-snug text-[var(--color-navy)]" style={editorialHeadingStyle}>{useDisplayText(item.title, lang)}</h4>
      {item.description && <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-muted)]">{useDisplayText(item.description, lang)}</p>}
      {resolveManagedLink(item.linkTarget, item.link) && item.linkText && (
        <SmartLink href={resolveManagedLink(item.linkTarget, item.link)} lang={lang} newTab={item.newTab} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
          {useDisplayText(item.linkText, lang)}
        </SmartLink>
      )}
    </div>
  );
}

function DestinationCard({ item, index, lang }: { item: any; index: number; lang: Lang }) {
  const resolvedLink = resolveManagedLink(item.linkTarget, item.link);
  const titleText = useDisplayText(item.title, lang);
  const titleSlug = normalizeDestinationSlug(titleText);
  const destinationSlug = titleSlug || normalizeDestinationSlug(resolvedLink);
  const forcedLocal = shouldForceLocalDestinationImage(destinationSlug || titleSlug);
  const fallback = getDestinationFallbackImage(destinationSlug || titleSlug);
  const cardImageSrc = forcedLocal
    ? fallback
    : (item.backgroundImage ? imageUrlFor(item.backgroundImage, 1000, fallback) : fallback);

  return (
    <SmartCardLink href={resolvedLink} lang={lang} newTab={item.newTab} className={`${index === 0 ? 'xl:col-span-2 xl:row-span-2' : index === 3 ? 'xl:col-span-2' : ''} group relative block overflow-hidden rounded-[2.1rem] border border-white/70 bg-[#07111F] shadow-[0_26px_75px_rgba(0,0,0,0.2)]`}>
      <div className={`relative ${index === 0 ? 'h-[34rem] xl:h-full' : index === 3 ? 'h-[25rem]' : 'h-[27rem]'} bg-[#0B1B2B]`}>
        <Image src={cardImageSrc} alt={useDisplayText(item.title, lang) || 'Destination'} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.9),rgba(4,10,18,0.34)_55%,rgba(4,10,18,0.06))]"></div>
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#07111F]/34 px-3 py-1.5 text-[11px] text-white/84 backdrop-blur-sm">{String(index + 1).padStart(2, '0')}</div>
        <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
          <h4 className="text-3xl font-normal leading-tight" style={editorialHeadingStyle}>{useDisplayText(item.title, lang)}</h4>
          <p className="mt-3 max-w-md text-sm leading-7 text-[rgba(255,255,255,0.8)]">{useDisplayText(item.description, lang)}</p>
        </div>
      </div>
    </SmartCardLink>
  );
}

function SmartCardLink({ href, newTab, className, children, lang }: any) {
  if (!href) return <div className={className}>{children}</div>;
  const finalHref = withLang(href, lang || 'en');
  const isInternal = finalHref.startsWith('/') || finalHref.startsWith('#');
  if (isInternal) return <Link href={finalHref} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</Link>;
  return <a href={finalHref} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</a>;
}

function prioritizeTours(tours: any[]) {
  const list = Array.isArray(tours) ? [...tours] : [];
  const score = (tour: any) => {
    const slug = String(tour?.slug || '').toLowerCase();
    if (slug.includes('classic-china-first-journey') || slug.includes('golden-triangle') || slug.includes('beijing-xian-shanghai')) return 100;
    if (slug.includes('panda-and-spice-discovery') || slug.includes('chengdu')) return 90;
    if (slug.includes('guilin-zhangjiajie') || slug.includes('scenic-china') || slug.includes('china-scenic-escape')) return 80;
    if (slug.includes('yunnan')) return 70;
    if (slug.includes('xinjiang')) return 50;
    return 10;
  };
  return list.sort((a, b) => score(b) - score(a));
}

function TourCard({ tour, lang, index = 0 }: { tour: any; lang: Lang; index?: number }) {
  const tourTitle = useDisplayText(tour.title, lang);
  const tourDescription = useDisplayText(tour.tagline || tour.description, lang);
  const duration = useDisplayText(tour.duration, lang);
  const idealFor = useDisplayText(tour.idealFor, lang);

  return (
    <div className={`${index % 2 === 1 ? 'md:grid-cols-[0.58fr_0.42fr]' : 'md:grid-cols-[0.42fr_0.58fr]'} group grid overflow-hidden rounded-[1.9rem] border border-[#D9E3EA] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(238,244,248,0.88))] text-[#10233D] shadow-[0_22px_62px_rgba(16,35,61,0.12)] backdrop-blur transition hover:-translate-y-0.5`}>
      <div className={`${index % 2 === 1 ? 'md:order-2' : ''} relative min-h-56 md:min-h-full`}>
        <Image src={imageUrlFor(tour.image, 1000, fallbackImages.tour)} alt={tourTitle || 'Tour'} fill sizes="(max-width: 768px) 100vw, 44vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,19,33,0.36),transparent)]"></div>
      </div>
      <div className="flex min-h-56 flex-col justify-between p-6 md:min-h-72 md:p-7 lg:p-8">
        <div>
          <div className="mb-4 flex flex-wrap gap-2 text-xs text-[var(--color-muted)]">
            <span className="rounded-full border border-[rgba(16,35,61,0.1)] bg-[var(--color-soft-white)] px-3 py-1.5">{uiText[lang].sampleCase}</span>
            {duration ? <span className="rounded-full border border-[rgba(16,35,61,0.1)] bg-[var(--color-soft-white)] px-3 py-1.5">{duration}</span> : null}
          </div>
          <h4 className="text-2xl font-normal leading-tight text-[var(--color-navy)] md:text-3xl" style={editorialHeadingStyle}>{tourTitle}</h4>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--color-muted)]">{tourDescription}</p>
        </div>
        <div className="mt-5 flex flex-col gap-4 border-t border-[rgba(16,35,61,0.1)] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-6 text-[var(--color-slate)]">
            <span className="font-semibold text-[var(--color-navy)]">{uiText[lang].reference}</span>
            {idealFor ? <span className="ml-2 text-[var(--color-muted)]">{idealFor}</span> : <span className="ml-2 text-[var(--color-muted)]">{uiText[lang].privatePlanning}</span>}
          </div>
          <Link href={withLang(`/tours/${encodeURIComponent(tour.slug)}`, lang)} className="inline-flex rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-navy-soft)]">{lang === 'en' ? 'View route' : '查看路线'}</Link>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, lang, featured = false }: { article: any; lang: Lang; featured?: boolean }) {
  const articleTitle = useDisplayText(article.title, lang);
  const articleExcerpt = useDisplayText(article.excerpt || article.tagline, lang);

  return (
    <div className="group overflow-hidden rounded-[2.1rem] border border-white/70 bg-white/[0.09] shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.12]">
      <div className={`relative ${featured ? 'h-[24rem]' : 'h-64'} overflow-hidden`}>
        <Image src={imageUrlFor(article.mainImage, featured ? 1100 : 800, fallbackImages.article)} alt={articleTitle || 'Article'} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,19,33,0.36),transparent)]"></div>
      </div>
      <div className={`${featured ? 'p-7 md:p-9' : 'p-7 md:p-8'}`}>
        {article.author && <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{uiText[lang].by} {article.author}</p>}
        <h4 className={`${featured ? 'text-3xl md:text-5xl' : 'text-2xl'} mt-3 font-normal leading-tight text-[#10233D]`} style={editorialHeadingStyle}>{articleTitle}</h4>
        {articleExcerpt ? <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#5D7084]">{articleExcerpt}</p> : null}
        <Link href={withLang(`/articles/${article.slug}`, lang)} className="mt-7 inline-flex text-sm font-semibold text-[#C8A96A] transition hover:text-[#10233D]">{uiText[lang].readMore}</Link>
      </div>
    </div>
  );
}

function ArticleListItem({ article, lang }: { article: any; lang: Lang }) {
  const articleTitle = useDisplayText(article.title, lang);
  const articleExcerpt = useDisplayText(article.excerpt || article.tagline, lang);

  return (
    <Link href={withLang(`/articles/${article.slug}`, lang)} className="group block p-6 transition hover:bg-white/54 md:p-7">
      {article.author && <p className={eyebrowClass(lang, 'text-[#C8A96A]')}>{uiText[lang].by} {article.author}</p>}
      <h4 className="mt-2 text-xl font-normal leading-snug text-[#10233D] transition group-hover:text-[#C8A96A]" style={editorialHeadingStyle}>{articleTitle}</h4>
      {articleExcerpt ? <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#5D7084]">{articleExcerpt}</p> : null}
      <span className="mt-4 inline-flex text-sm font-semibold text-[#C8A96A]">{uiText[lang].readMore}</span>
    </Link>
  );
}

function renderManagedIcon(item: any, className = 'text-5xl') {
  if (item?.iconType === 'upload' && item?.uploadedIcon) return <div className="relative h-16 w-16"><Image src={imageUrlFor(item.uploadedIcon, 128, fallbackImages.icon)} alt={item.title || 'Icon'} fill className="object-contain" /></div>;
  if (item?.iconType === 'emoji' && item?.emoji) return <span className={className}>{item.emoji}</span>;
  return <span className={className}>{presetIconMap[item?.presetIcon] || '✦'}</span>;
}

const presetIconMap: Record<string, string> = { compass: '✦', map: '◌', camera: '◈', star: '✧', shield: '⬒', chat: '◍', plane: '➝', mountain: '△', heart: '♡', clock: '◷' };

function prioritizeDestinations(destinations: any[]) {
  const list = Array.isArray(destinations) ? [...destinations] : [];
  const score = (destination: any) => {
    const slug = normalizeDestinationSlug(destination?.slug) || normalizeDestinationSlug(pickLocalized(destination?.name, 'en'));
    if (slug.includes('beijing')) return 100;
    if (slug.includes('xian') || slug.includes('xi-an') || slug.includes('shaanxi')) return 95;
    if (slug.includes('shanghai')) return 90;
    if (slug.includes('chengdu')) return 85;
    if (slug.includes('guilin')) return 80;
    if (slug.includes('zhangjiajie')) return 75;
    if (slug.includes('yunnan')) return 65;
    if (slug.includes('chongqing')) return 60;
    if (slug.includes('shenzhen')) return 55;
    if (slug.includes('xinjiang')) return 45;
    return 10;
  };
  return list.sort((a, b) => score(b) - score(a));
}

function dedupeDestinations(destinations: any[]) {
  const map = new Map<string, any>();

  for (const destination of destinations) {
    const key = normalizeDestinationSlug(destination?.slug) || normalizeDestinationSlug(pickLocalized(destination?.name, 'en')) || String(destination?._id || '');
    if (!key) continue;

    const existing = map.get(key);
    if (!existing) {
      map.set(key, destination);
      continue;
    }

    const existingScore = destinationCompletenessScore(existing);
    const incomingScore = destinationCompletenessScore(destination);
    if (incomingScore > existingScore) {
      map.set(key, destination);
    }
  }

  return Array.from(map.values());
}

function destinationCompletenessScore(destination: any) {
  let score = 0;
  if (destination?.image) score += 3;
  if (pickLocalized(destination?.tagline, 'en') || pickLocalized(destination?.tagline, 'zh')) score += 2;
  if (pickLocalized(destination?.description, 'en') || pickLocalized(destination?.description, 'zh')) score += 4;
  if (Array.isArray(destination?.highlights) && destination.highlights.length > 0) score += 2;
  if (Array.isArray(destination?.heroFacts) && destination.heroFacts.length > 0) score += 1;
  if (typeof destination?.order === 'number') score += 1;
  return score;
}

function getDefaultSectionLabel(type: string, lang: Lang) {
  const map = {
    en: { heroSection: 'Home', featureIconsSection: 'Services', audienceSolutionsSection: 'Solutions', destinationCardsSection: 'Destinations', tourListSection: 'Cases', articleListSection: 'Insights', faqPreviewSection: 'FAQ', statsSection: 'Why Us', testimonialsSection: 'Reviews', ctaSection: 'Contact' },
    zh: { heroSection: '首页', featureIconsSection: '服务优势', audienceSolutionsSection: '人群方案', destinationCardsSection: '目的地', tourListSection: '案例灵感', articleListSection: '灵感内容', faqPreviewSection: '常见问题', statsSection: '为什么选择我们', testimonialsSection: '客户评价', ctaSection: '联系我们' },
  } as const
  return map[lang][type as keyof typeof map.en] || 'Section'
}
