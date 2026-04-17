import Image from 'next/image';
import Link from 'next/link';
import { getTours, getArticles, getDestinations, getSiteSettings, getHomeSettings, imageUrlFor, fallbackImages, getDestinationFallbackImage, normalizeDestinationSlug } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder, type Lang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: any) {
  const tours = await getTours();
  const articles = await getArticles();
  const destinations = await getDestinations();
  const settings = await getSiteSettings();
  const homeSettings = await getHomeSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];

  const sections = Array.isArray(homeSettings?.sections) ? homeSettings.sections.filter((section: any) => section?.enabled !== false) : [];
  const heroSection = sections.find((section: any) => section._type === 'heroSection');
  const nonHeroSections = sections.filter((section: any) => section._type !== 'heroSection');

  const heroTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const heroSubtitle = lang === 'zh' ? '中国高端定制旅行' : 'Tailor-Made China Journeys';
  const heroSupporting = lang === 'zh' ? '为全球旅行者设计的中国多城市私人定制旅程。' : 'Multi-city private travel across China for global travelers.';
  const heroImage = heroSection?.backgroundImage || settings?.heroImage || settings?.heroBackground;
  const heroVideoUrl = heroSection?.backgroundVideoUrl;
  const footerIntro = lang === 'zh' ? '无限旅途专注中国高端定制旅行，为家庭、情侣、商务接待、私人小团与主题旅客提供更有结构、更贴近真实需求的旅程设计。' : 'Infinite Travel focuses on premium tailor-made travel across China for families, couples, executive visits, private groups and theme-driven travelers who need a more structured journey design.';
  const contactAddress = pickLocalized(settings?.address, lang) || '';
  const navCtaText = lang === 'zh' ? '定制我的旅程' : 'Tailor My Journey';
  const navCtaLink = resolveManagedLink(settings?.headerCtaLink, settings?.headerCtaLink) || '/contact';
  const faqItems = Array.isArray(settings?.faqItems) ? settings.faqItems : [];
  const siteTitle = lang === 'zh' ? '无限旅途' : 'Infinite Travel';
  const siteDescription = lang === 'zh' ? '为全球旅行者设计的中国多城市私人定制旅行，覆盖北京、上海、成都、新疆等多个目的地。' : 'Private multi-city travel across China designed for global travelers. Custom itineraries covering Beijing, Shanghai, Chengdu, Xinjiang and more.';
  const languageSwitchLabel = t.language;
  const switchLang: Lang = lang === 'en' ? 'zh' : 'en';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href={withLang('/', lang)} className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] text-lg text-[var(--color-navy)] shadow-sm">✦</span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-muted)]">{lang === 'en' ? 'Tailor-Made China Journeys' : '中国高端定制旅行'}</p>
                <h1 className="text-lg font-semibold tracking-[0.04em] text-[var(--color-navy)] md:text-xl">{siteTitle}</h1>
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {sections.filter((section: any) => section?.anchorId).map((section: any, index: number) => (
                <a key={`${section._type}-${index}`} href={`#${section.anchorId}`} className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">
                  {getDefaultSectionLabel(section._type, lang)}
                </a>
              ))}
              <Link href={withLang('/services', lang)} className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '服务' : 'Services'}</Link>
              <Link href={withLang('/destinations', lang)} className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '目的地' : 'Destinations'}</Link>
              <Link href={withLang('/insights', lang)} className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '灵感' : 'Insights'}</Link>
              <Link href={withLang('/payment', lang)} className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{lang === 'zh' ? '支付' : 'Payment'}</Link>
              <Link href={withLang('/about', lang)} className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.about}</Link>
              <Link href={withLang('/contact', lang)} className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)]">{t.contact}</Link>
              <Link href={withLang('/', switchLang)} className="rounded-full border border-[rgba(10,27,52,0.12)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] transition hover:text-[var(--color-navy)] hover:border-[rgba(10,27,52,0.28)]">{languageSwitchLabel}</Link>
            </div>

            <SmartLink href={navCtaLink} lang={lang} className="inline-flex items-center rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-navy)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-navy-soft)]">
              {navCtaText}
            </SmartLink>
          </div>
        </div>
      </nav>

      <main className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0">
          {heroVideoUrl ? (
            <video className="hidden h-full w-full object-cover md:block" autoPlay muted loop playsInline poster={imageUrlFor(heroImage, 1800, fallbackImages.hero)}>
              <source src={heroVideoUrl} />
            </video>
          ) : null}
          <div className={`absolute inset-0 ${heroVideoUrl ? 'block md:hidden' : 'block'}`}>
            <Image src={imageUrlFor(heroImage, 1800, fallbackImages.hero)} alt={siteTitle} fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12),rgba(4,10,18,0.36),rgba(4,10,18,0.66))]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_30%)]"></div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="text-white">
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[rgba(255,255,255,0.76)]">{t.tailorMadeLuxuryTravelInChina}</p>
            <h2 className="max-w-5xl text-5xl font-semibold leading-[1.02] md:text-7xl">{heroTitle}</h2>
            <p className="mt-7 max-w-3xl text-2xl font-medium leading-[1.4] text-[rgba(255,255,255,0.95)] md:text-3xl">{heroSubtitle}</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[rgba(255,255,255,0.82)] md:text-xl">{heroSupporting}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {heroSection?.primaryButtonText && (
                <SmartLink href={resolveManagedLink(heroSection.primaryButtonTarget, heroSection.primaryButtonLink) || '#destinations'} lang={lang} newTab={heroSection.primaryButtonNewTab} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-night)] transition hover:bg-[var(--color-accent)]">
                  {useDisplayText(heroSection.primaryButtonText, lang)}
                </SmartLink>
              )}
              {heroSection?.secondaryButtonText && (
                <SmartLink href={resolveManagedLink(heroSection.secondaryButtonTarget, heroSection.secondaryButtonLink) || '/contact'} lang={lang} newTab={heroSection.secondaryButtonNewTab} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/18">
                  {useDisplayText(heroSection.secondaryButtonText, lang)}
                </SmartLink>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-[2rem] border border-white/20 bg-[rgba(255,255,255,0.9)] p-7 text-[var(--color-navy)] backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{t.brandPositioning}</p>
              <h3 className="mt-4 text-2xl font-semibold">{lang === 'en' ? 'Three clearer ways to enter China travel planning.' : '用三条更清晰的方式进入中国旅行规划。'}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-slate)]">{lang === 'en' ? 'Start with the routes people understand fastest: first-time China city journeys, scenic and culture combinations, and private custom planning based on real dates, group size and budget.' : '先从客户最容易理解的几类路线切入：首访中国城市线、风景与文化组合线，以及基于真实日期、人数与预算的私人定制规划。'}</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <HeroStat label={lang === 'en' ? 'Direction 1' : '方向 1'} value={lang === 'en' ? 'First-Time China' : '首访中国'} />
                <HeroStat label={lang === 'en' ? 'Direction 2' : '方向 2'} value={lang === 'en' ? 'Scenic + Culture' : '风景 + 文化'} />
                <HeroStat label={lang === 'en' ? 'Direction 3' : '方向 3'} value={lang === 'en' ? 'Private Custom' : '私人定制'} />
                <HeroStat label={lang === 'en' ? 'Reply' : '回复'} value={lang === 'en' ? 'Within 24h' : '24 小时内'} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="relative z-20 -mt-14 px-6">
        <div className="mx-auto grid max-w-7xl gap-5 rounded-[2.2rem] border border-[rgba(10,27,52,0.08)] bg-white/95 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.14)] backdrop-blur-sm md:grid-cols-3 md:p-7">
          <HighlightChip title={lang === 'en' ? 'First-Time China Trips' : '首访中国主线'} desc={lang === 'en' ? 'Clear private itineraries built around Beijing, Xi’an, Shanghai and other strong first-entry cities.' : '围绕北京、西安、上海等首访中国高接受度城市，设计更清晰的私人定制路线。'} />
          <HighlightChip title={lang === 'en' ? 'Scenic & Culture Routes' : '风景与文化路线'} desc={lang === 'en' ? 'From classic heritage cities to Guilin and Zhangjiajie, we shape journeys people can understand and choose quickly.' : '从经典古都到桂林、张家界，把更容易理解、也更容易成交的风景与文化路线整理清楚。'} />
          <HighlightChip title={lang === 'en' ? 'Private Custom Planning' : '私人定制规划'} desc={lang === 'en' ? 'Share your dates, group size, destinations and budget, and we turn that into a workable China plan.' : '把你的出行时间、人数、目的地和预算告诉我们，我们会把它整理成更可执行的中国行程方案。'} />
        </div>
      </section>

      {nonHeroSections.map((section: any, index: number) => {
        switch (section._type) {
          case 'featureIconsSection':
            return <FeatureIconsSection key={`${section._type}-${index}`} section={section} lang={lang} />;
          case 'audienceSolutionsSection':
            return <AudienceSolutionsSection key={`${section._type}-${index}`} section={section} lang={lang} />;
          case 'destinationCardsSection':
            return <DestinationCardsSection key={`${section._type}-${index}`} section={section} destinations={destinations} lang={lang} />;
          case 'tourListSection': {
            const autoTours = Array.isArray(tours) ? tours.filter((item: any) => item?.published !== false) : [];
            const list = section.sourceMode === 'manual'
              ? (section.selectedTours || []).filter((item: any) => item?.published !== false)
              : autoTours.slice(0, Math.max(section.maxItems || 6, 4));
            return <CaseInspirationsSection key={`${section._type}-${index}`} section={section} tours={list} lang={lang} />;
          }
          case 'articleListSection': {
            const list = section.sourceMode === 'manual' ? (section.selectedArticles || []).filter((item: any) => item?.published !== false) : articles.slice(0, section.maxItems || 3);
            return <ArticleListSection key={`${section._type}-${index}`} section={section} articles={list} lang={lang} />;
          }
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
      })}

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
            </div>
          </div>
          <div className="mt-12 border-t border-[rgba(10,27,52,0.08)] pt-6 text-center text-sm text-[var(--color-muted)]">
            <p>{lang === 'zh' ? `© 2026 ${siteTitle}。保留所有权利。` : `© 2026 ${siteTitle}. All rights reserved.`}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function resolveManagedLink(target?: string, custom?: string) {
  if (!target || target === 'none') return custom || '';
  if (target === 'custom') return custom || '';
  return target;
}

function useDisplayText(value: any, lang: Lang, fallback = '') {
  const picked = pickLocalized(value, lang) || fallback;
  return markPlaceholder(picked);
}

function SmartLink({ href, newTab, className, children, lang }: any) {
  if (!href) return <span className={className}>{children}</span>;
  const finalHref = withLang(href, lang || 'en');
  const isAnchor = finalHref.startsWith('#');
  const isInternal = finalHref.startsWith('/') || isAnchor;
  if (isInternal) return <Link href={finalHref} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</Link>;
  return <a href={finalHref} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</a>;
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title?: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl px-6 text-center">
      {eyebrow && <p className="text-xs uppercase tracking-[0.34em] text-[var(--color-muted)]">{eyebrow}</p>}
      {title && <p className="mt-4 text-3xl font-semibold tracking-[0.02em] text-[var(--color-navy)] md:text-5xl">{title}</p>}
      {subtitle && <p className="mt-4 text-base leading-8 text-[var(--color-muted)] md:text-lg">{subtitle}</p>}
    </div>
  );
}

function HighlightChip({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(10,27,52,0.08)]">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)]">{title}</div>
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

function FeatureIconsSection({ section, lang }: { section: any; lang: Lang }) {
  return (
    <section id={section.anchorId || 'travel-styles'} className="bg-white py-28">
      <div className="mx-auto mb-8 max-w-7xl px-6">
        <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(10,27,52,0.12),transparent)]"></div>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={uiText[lang].capabilities} title={useDisplayText(section.title, lang)} subtitle={useDisplayText(section.subtitle, lang)} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {(section.items || []).map((item: any, index: number) => <IconInfoCard key={index} item={item} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}

function AudienceSolutionsSection({ section, lang }: { section: any; lang: Lang }) {
  return (
    <section id={section.anchorId || 'audiences'} className="bg-[#f8fbff] py-28">
      <div className="mx-auto mb-8 max-w-7xl px-6">
        <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(10,27,52,0.12),transparent)]"></div>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={uiText[lang].audienceSolutions} title={useDisplayText(section.title, lang)} subtitle={useDisplayText(section.subtitle, lang)} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {(section.items || []).map((item: any, index: number) => <AudienceCard key={index} item={item} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}

function DestinationCardsSection({ section, destinations, lang }: { section: any; destinations: any[]; lang: Lang }) {
  const manualItems = Array.isArray(section.items) ? section.items : [];
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
    <section id={section.anchorId || 'destinations'} className="bg-white py-28">
      <div className="mx-auto mb-8 max-w-7xl px-6">
        <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(10,27,52,0.12),transparent)]"></div>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={uiText[lang].destinations} title={useDisplayText(section.title, lang)} subtitle={useDisplayText(section.subtitle, lang)} />
        <div className="mb-10 rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-5 shadow-[0_20px_60px_rgba(10,27,52,0.08)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">{uiText[lang].featuredDestinations}</div>
            <div className="flex flex-wrap gap-3">
              {items.map((item: any, index: number) => (
                <SmartLink key={index} href={resolveManagedLink(item.linkTarget, item.link) || '/contact'} lang={lang} newTab={item.newTab} className="rounded-full border border-[rgba(10,27,52,0.12)] px-4 py-2 text-sm text-[var(--color-navy)] transition hover:border-[var(--color-navy)] hover:bg-white">
                  {useDisplayText(item.title, lang)}
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item: any, index: number) => <DestinationCard key={index} item={item} index={index} lang={lang} />)}
        </div>
        <div className="mt-12 text-center">
          <SmartLink href={withLang('/destinations', lang)} lang={lang} className="inline-flex rounded-full border border-[rgba(10,27,52,0.14)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
            {lang === 'zh' ? '查看更多目的地' : 'View More Destinations'}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

function CaseInspirationsSection({ section, tours, lang }: { section: any; tours: any[]; lang: Lang }) {
  const focusedTours = prioritizeTours(tours).slice(0, 3);
  return (
    <section id={section.anchorId || 'cases'} className="bg-[#f8fbff] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={uiText[lang].sampleCases}
          title={lang === 'zh' ? '三条最容易理解的中国旅行主线' : 'Three Clear China Travel Directions'}
          subtitle={lang === 'zh' ? '先把最容易成交的内容讲清楚：首访中国经典线、成都轻松城市线、桂林张家界风景线。' : 'Start with the most understandable conversion routes: the classic first-China route, a softer Chengdu city route, and a Guilin–Zhangjiajie scenic route.'}
        />
        {focusedTours && focusedTours.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">{focusedTours.map((tour: any) => <TourCard key={tour._id} tour={tour} lang={lang} />)}</div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[rgba(10,27,52,0.12)] bg-white px-6 py-16 text-center text-[var(--color-muted)]">
            <p className="text-lg">{uiText[lang].sampleCasesCanBeAdded}</p>
          </div>
        )}
        <div className="mt-12 text-center">
          <SmartLink href={withLang('/tours', lang)} lang={lang} className="inline-flex rounded-full border border-[rgba(10,27,52,0.14)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
            {lang === 'zh' ? '查看更多路线案例' : 'View More Tour Cases'}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

function ArticleListSection({ section, articles, lang }: { section: any; articles: any[]; lang: Lang }) {
  return (
    <section id={section.anchorId || 'articles'} className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={uiText[lang].insights} title={useDisplayText(section.title, lang)} subtitle={useDisplayText(section.subtitle, lang)} />
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">{articles.map((article: any) => <ArticleCard key={article._id} article={article} lang={lang} />)}</div>
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
  return (
    <section className="bg-[var(--color-navy)] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={uiText[lang].whyUs} title={useDisplayText(section.title, lang)} subtitle={useDisplayText(section.subtitle, lang)} />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {(section.items || []).map((item: any, index: number) => (
            <div key={index} className="rounded-[1.75rem] border border-white/10 bg-white/6 p-8 text-center backdrop-blur-sm">
              <div className="text-3xl font-semibold tracking-[0.03em] text-white md:text-4xl">{useDisplayText(item.number, lang)}</div>
              <div className="mt-3 text-sm uppercase tracking-[0.18em] text-[rgba(255,255,255,0.72)]">{useDisplayText(item.label, lang)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ section, lang }: { section: any; lang: Lang }) {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={uiText[lang].testimonials} title={useDisplayText(section.title, lang)} subtitle={useDisplayText(section.subtitle, lang)} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {(section.items || []).map((item: any, index: number) => (
            <div key={index} className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-8 shadow-[0_20px_50px_rgba(10,27,52,0.06)]">
              <div className="mb-4 text-[var(--color-navy)]">{'★'.repeat(Math.max(1, Math.min(5, Number(item.rating || 5))))}</div>
              <p className="text-base leading-8 text-[var(--color-slate)]">“{useDisplayText(item.quote, lang)}”</p>
              <div className="mt-6 text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">{item.name} · {item.country}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <SmartLink href={withLang('/about', lang)} lang={lang} className="inline-flex rounded-full border border-[rgba(10,27,52,0.14)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
            {lang === 'zh' ? '查看更多客户反馈' : 'View More Testimonials'}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

function FaqPreviewSection({ section, faqItems, lang }: { section: any; faqItems: any[]; lang: Lang }) {
  const list = faqItems.slice(0, section.maxItems || 4);
  return (
    <section className="bg-[#f8fbff] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow={uiText[lang].faq} title={useDisplayText(section.title, lang)} subtitle={useDisplayText(section.subtitle, lang)} />
        <div className="space-y-4">
          {list.map((faq: any, index: number) => (
            <details key={index} className="rounded-[1.5rem] border border-[rgba(10,27,52,0.08)] bg-white p-6 shadow-[0_12px_30px_rgba(10,27,52,0.05)]">
              <summary className="cursor-pointer text-base font-semibold text-[var(--color-navy)]">{useDisplayText(faq.question, lang)}</summary>
              <div className="mt-4 text-[var(--color-muted)] leading-8">{useDisplayText(faq.answer, lang)}</div>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <SmartLink href={withLang('/faq', lang)} lang={lang} className="inline-flex rounded-full border border-[rgba(10,27,52,0.14)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
            {lang === 'zh' ? '查看更多常见问题' : 'View More FAQ'}
          </SmartLink>
        </div>
        {section.viewMoreText && resolveManagedLink(section.viewMoreTarget, section.viewMoreLink) && (
          <div className="mt-10 text-center">
            <SmartLink href={resolveManagedLink(section.viewMoreTarget, section.viewMoreLink)} lang={lang} className="inline-flex rounded-full border border-[rgba(10,27,52,0.14)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">
              {useDisplayText(section.viewMoreText, lang)}
            </SmartLink>
          </div>
        )}
      </div>
    </section>
  );
}

function CtaSection({ section, lang }: { section: any; lang: Lang }) {
  const ctaTitle = lang === 'zh' ? '把你的中国行程想法发给我们' : 'Tell us what kind of China journey you want';
  const ctaSubtitle = lang === 'zh'
    ? '告诉我们出行时间、人数、想去的城市、旅行风格和大致预算。我们会基于真实可执行性，帮你整理成更清晰的中国定制行程方案。通常 24 小时内回复。'
    : 'Share your travel dates, group size, preferred destinations, travel style and approximate budget. We will turn that into a clearer, workable China itinerary suggestion based on real planning logic. We usually reply within 24 hours.';
  const primaryButtonText = lang === 'zh' ? '发送行程需求' : 'Send Your Trip Request';
  const secondaryButtonText = lang === 'zh' ? '查看联系方式' : 'View Contact Details';

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#0f2239,#183459)] px-8 py-14 text-center text-white shadow-[0_35px_80px_rgba(10,27,52,0.14)] md:px-16">
          {section.backgroundImage && (
            <div className="absolute inset-0 opacity-16">
              <Image src={imageUrlFor(section.backgroundImage, 1400, fallbackImages.destination)} alt={useDisplayText(section.title, lang) || 'CTA background'} fill className="object-cover" />
            </div>
          )}
          <div className="relative z-10">
            <h3 className="text-3xl font-semibold md:text-5xl">{ctaTitle}</h3>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.82)] md:text-lg">{ctaSubtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SmartLink href={resolveManagedLink(section.primaryButtonTarget, section.primaryButtonLink) || '/contact'} lang={lang} newTab={section.primaryButtonNewTab} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-night)] transition hover:bg-[var(--color-accent)]">{primaryButtonText}</SmartLink>
              <SmartLink href={resolveManagedLink(section.secondaryButtonTarget, section.secondaryButtonLink) || '/contact'} lang={lang} newTab={section.secondaryButtonNewTab} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">{secondaryButtonText}</SmartLink>
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
    <div className="flex h-full flex-col rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] p-7 shadow-[0_16px_40px_rgba(10,27,52,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(10,27,52,0.08)]">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(10,27,52,0.08)] bg-white text-[var(--color-navy)] shadow-sm">{icon}</div>
      <h4 className="text-xl font-semibold text-[var(--color-navy)]">{useDisplayText(item.title, lang)}</h4>
      {item.description && <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-muted)]">{useDisplayText(item.description, lang)}</p>}
      {resolveManagedLink(item.linkTarget, item.link) && item.linkText && (
        <SmartLink href={resolveManagedLink(item.linkTarget, item.link)} lang={lang} newTab={item.newTab} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">
          {useDisplayText(item.linkText, lang)}
        </SmartLink>
      )}
    </div>
  );
}

function AudienceCard({ item, lang }: { item: any; lang: Lang }) {
  const icon = renderManagedIcon(item, 'text-4xl');
  return (
    <div className="flex h-full flex-col rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_16px_40px_rgba(10,27,52,0.06)]">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] text-[var(--color-navy)]">{icon}</div>
      <h4 className="text-xl font-semibold text-[var(--color-navy)]">{useDisplayText(item.title, lang)}</h4>
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
  const destinationSlug = normalizeDestinationSlug(resolveManagedLink(item.linkTarget, item.link));
  const fallback = getDestinationFallbackImage(destinationSlug);

  return (
    <SmartCardLink href={resolveManagedLink(item.linkTarget, item.link)} lang={lang} newTab={item.newTab} className="group relative block min-h-[24rem] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_rgba(10,27,52,0.16)]">
      <div className="relative h-[24rem] bg-[var(--color-navy)]">
        {item.backgroundImage ? (
          <Image src={imageUrlFor(item.backgroundImage, 1000, fallback)} alt={useDisplayText(item.title, lang) || 'Destination'} fill className="object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <Image src={fallback} alt={useDisplayText(item.title, lang) || 'Destination'} fill className="object-cover transition duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,18,0.78),rgba(4,10,18,0.14),rgba(4,10,18,0.08))]"></div>
        <div className="absolute left-0 right-0 top-0 flex justify-end p-6 text-4xl text-white/90">{renderManagedIcon(item, 'text-4xl')}</div>
        <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
          <h4 className="text-2xl font-semibold">{useDisplayText(item.title, lang)}</h4>
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

function TourCard({ tour, lang }: { tour: any; lang: Lang }) {
  const tourTitle = useDisplayText(tour.title, lang);
  const tourDescription = useDisplayText(tour.description, lang);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white shadow-[0_20px_50px_rgba(10,27,52,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(10,27,52,0.12)]">
      <div className="relative h-64">
        <Image src={imageUrlFor(tour.image, 900, fallbackImages.tour)} alt={tourTitle || 'Tour'} fill className="object-cover" />
      </div>
      <div className="p-7">
        <div className="mb-4 inline-flex rounded-full border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">{uiText[lang].sampleCase}</div>
        <h4 className="text-2xl font-semibold text-[var(--color-navy)]">{tourTitle}</h4>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--color-muted)]">{tourDescription}</p>
        <div className="mt-6 flex items-center justify-between border-t border-[rgba(10,27,52,0.08)] pt-5">
          <div>
            <span className="text-sm text-[var(--color-muted)]">{uiText[lang].reference}</span>
            <span className="ml-2 text-lg font-semibold text-[var(--color-navy)]">{uiText[lang].privatePlanning}</span>
          </div>
          <Link href={withLang(`/tours/${encodeURIComponent(tour.slug)}`, lang)} className="inline-flex rounded-full border border-[rgba(10,27,52,0.14)] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white">{lang === 'en' ? 'View' : '查看'}</Link>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, lang }: { article: any; lang: Lang }) {
  const articleTitle = useDisplayText(article.title, lang);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-[var(--color-soft-white)] shadow-[0_20px_50px_rgba(10,27,52,0.06)]">
      <div className="relative h-56">
        <Image src={imageUrlFor(article.mainImage, 700, fallbackImages.article)} alt={articleTitle || 'Article'} fill className="object-cover" />
      </div>
      <div className="p-7">
        <h4 className="text-2xl font-semibold text-[var(--color-navy)]">{articleTitle}</h4>
        {article.author && <p className="mt-3 text-sm uppercase tracking-[0.15em] text-[var(--color-muted)]">{uiText[lang].by} {article.author}</p>}
        <Link href={withLang(`/articles/${article.slug}`, lang)} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">{uiText[lang].readMore}</Link>
      </div>
    </div>
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
