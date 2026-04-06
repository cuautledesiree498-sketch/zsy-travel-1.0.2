import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettings, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const siteTitle = 'ZSY Travel';
  const title = lang === 'zh' ? `关于我们 - ${siteTitle}` : `About Us - ${siteTitle}`;
  const description = pickLocalized(settings?.aboutHeroSubtitle, lang)
    || pickLocalized(settings?.siteDescription, lang)
    || 'Learn about Infinite Journeys and our approach to tailor-made luxury travel across China.';

  return { title, description };
}

export default async function AboutPage({ searchParams }: any) {
  const settings = await getSiteSettings();
  const lang = normalizeLang((await searchParams)?.lang);
  const t = uiText[lang];
  const switchLang = lang === 'en' ? 'zh' : 'en';
  const siteTitle = 'ZSY Travel';
  const siteDescription = lang === 'zh' ? 'ZSY Travel 是面向全球旅客的中国高端定制旅行品牌。' : 'ZSY Travel is a premium China travel brand for tailor-made journeys.';
  const footerIntro = lang === 'zh' ? 'ZSY Travel 专注中国高端定制旅行；后台未填的部分会以测试标记显示。' : 'ZSY Travel focuses on premium tailor-made journeys across China; unfilled CMS content is marked as test content.';
  const aboutHeroTitle = pickLocalized(settings?.aboutHeroTitle, lang) || 'A more refined way to experience China.';
  const aboutHeroSubtitle = pickLocalized(settings?.aboutHeroSubtitle, lang) || 'We design private China travel solutions around different traveler needs.';
  const aboutHeroImage = settings?.heroBackground || settings?.heroImage;
  const aboutIntroTitle = pickLocalized(settings?.aboutIntroTitle, lang) || 'We design China journeys around people, not templates.';
  const aboutIntroBody = pickLocalized(settings?.aboutIntroBody, lang) || 'Our core business is not selling a fixed tour. We build tailor-made travel solutions around different traveler goals.';
  const aboutPositioningTitle = pickLocalized(settings?.aboutPositioningTitle, lang) || 'Our Positioning';
  const aboutPositioningItems = settings?.aboutPositioningItems?.length ? settings.aboutPositioningItems.map((item: string) => markPlaceholder(pickLocalized(item, lang) || '待填写')) : [markPlaceholder('待填写：品牌定位 1'), markPlaceholder('待填写：品牌定位 2'), markPlaceholder('待填写：品牌定位 3')];
  const aboutWhyTitle = pickLocalized(settings?.aboutWhyTitle, lang) || 'A clearer, calmer and more polished planning experience.';
  const aboutWhyItems = settings?.aboutWhyItems?.length ? settings.aboutWhyItems.map((item: any) => ({ title: markPlaceholder(pickLocalized(item?.title, lang) || '待填写'), desc: markPlaceholder(pickLocalized(item?.desc, lang) || '待填写') })) : [{ title: markPlaceholder('待填写：优势标题 1'), desc: markPlaceholder('待填写：优势说明 1') }, { title: markPlaceholder('待填写：优势标题 2'), desc: markPlaceholder('待填写：优势说明 2') }, { title: markPlaceholder('待填写：优势标题 3'), desc: markPlaceholder('待填写：优势说明 3') }, { title: markPlaceholder('待填写：优势标题 4'), desc: markPlaceholder('待填写：优势说明 4') }];
  const aboutCtaTitle = pickLocalized(settings?.aboutCtaTitle, lang) || 'Tell us what kind of China journey you want to create.';
  const aboutCtaSubtitle = pickLocalized(settings?.aboutCtaSubtitle, lang) || 'We help shape travel solutions for families, private guests, executive groups and culture-focused travelers.';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={withLang('/', lang)} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,27,52,0.1)] bg-[var(--color-soft-white)] text-lg text-[var(--color-navy)] shadow-sm">✦</span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-muted)]">{lang === 'en' ? 'China Private Journeys' : '中国高端定制旅行'}</p>
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
          <p className="mt-4">&copy; 2026 {siteTitle}. All rights reserved.</p>
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


function displayText(value: any, fallback = '测试待补充') {
  return markPlaceholder(value || fallback);
}
