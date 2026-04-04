import Image from 'next/image';
import Link from 'next/link';
import { getTours, getArticles, getSiteSettings, getHomeSettings, imageUrlFor } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const tours = await getTours();
  const articles = await getArticles();
  const settings = await getSiteSettings();
  const homeSettings = await getHomeSettings();

  const sections = Array.isArray(homeSettings?.sections) ? homeSettings.sections.filter((section: any) => section?.enabled !== false) : [];
  const heroSection = sections.find((section: any) => section._type === 'heroSection');
  const nonHeroSections = sections.filter((section: any) => section._type !== 'heroSection');

  const heroTitle = heroSection?.title || 'Discover the Magic of Xinjiang';
  const heroSubtitle = heroSection?.subtitle || 'Ancient Silk Road • Stunning Landscapes • Rich Culture';
  const heroImage = heroSection?.backgroundImage || settings?.heroImage || settings?.heroBackground;
  const footerIntro = settings?.footerIntro || 'Your trusted local expert for unforgettable Xinjiang adventures.';
  const navCtaText = settings?.headerCtaText || heroSection?.primaryButtonText || 'Get a Quote';
  const navCtaLink = resolveManagedLink(settings?.headerCtaLink, settings?.headerCtaLink);
  const faqItems = Array.isArray(settings?.faqItems) ? settings.faqItems : [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🏔️</span>
              <h1 className="text-2xl font-bold text-gray-800">{settings?.siteTitle || 'Xinjiang Travel'}</h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {sections.filter((section: any) => section?.anchorId).map((section: any, index: number) => (
                <a key={`${section._type}-${index}`} href={`#${section.anchorId}`} className="text-gray-700 hover:text-blue-600 font-medium">
                  {section.title || getDefaultSectionLabel(section._type)}
                </a>
              ))}
              <Link href="/faq" className="text-gray-700 hover:text-blue-600 font-medium">FAQ</Link>
              <a href="#footer-contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </div>

            <SmartLink href={navCtaLink} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg inline-block">
              {navCtaText}
            </SmartLink>
          </div>
        </div>
      </nav>

      <main className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src={imageUrlFor(heroImage, 1600)} alt={settings?.siteTitle || 'Xinjiang Landscape'} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">{heroTitle}</h2>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg text-gray-200">{heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {heroSection?.primaryButtonText && <SmartLink href={resolveManagedLink(heroSection.primaryButtonTarget, heroSection.primaryButtonLink) || '#tours'} newTab={heroSection.primaryButtonNewTab} className="bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition shadow-2xl inline-block">{heroSection.primaryButtonText}</SmartLink>}
            {heroSection?.secondaryButtonText && <SmartLink href={resolveManagedLink(heroSection.secondaryButtonTarget, heroSection.secondaryButtonLink) || '/contact'} newTab={heroSection.secondaryButtonNewTab} className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-white/30 transition border-2 border-white inline-block">{heroSection.secondaryButtonText}</SmartLink>}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </main>

      {nonHeroSections.map((section: any, index: number) => {
        switch (section._type) {
          case 'featureIconsSection':
            return <FeatureIconsSection key={`${section._type}-${index}`} section={section} />;
          case 'destinationCardsSection':
            return <DestinationCardsSection key={`${section._type}-${index}`} section={section} />;
          case 'tourListSection': {
            const list = section.sourceMode === 'manual' ? (section.selectedTours || []).filter((item: any) => item?.published !== false) : tours.slice(0, section.maxItems || 6);
            return <TourListSection key={`${section._type}-${index}`} section={section} tours={list} />;
          }
          case 'articleListSection': {
            const list = section.sourceMode === 'manual' ? (section.selectedArticles || []).filter((item: any) => item?.published !== false) : articles.slice(0, section.maxItems || 3);
            return <ArticleListSection key={`${section._type}-${index}`} section={section} articles={list} />;
          }
          case 'faqPreviewSection':
            return <FaqPreviewSection key={`${section._type}-${index}`} section={section} faqItems={faqItems} />;
          case 'testimonialsSection':
            return <TestimonialsSection key={`${section._type}-${index}`} section={section} />;
          case 'statsSection':
            return <StatsSection key={`${section._type}-${index}`} section={section} />;
          case 'ctaSection':
            return <CtaSection key={`${section._type}-${index}`} section={section} />;
          default:
            return null;
        }
      })}

      <footer id="footer-contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4"><span className="text-3xl">🏔️</span><h4 className="text-xl font-bold">{settings?.siteTitle || 'Xinjiang Travel'}</h4></div>
              <p className="text-gray-400 mb-4">{footerIntro}</p>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Contact Us</h5>
              <ul className="space-y-3 text-gray-400">
                {settings?.contactEmail && <li className="flex items-center gap-2"><span>📧</span><span>{settings.contactEmail}</span></li>}
                {(settings?.contactPhone || settings?.whatsappNumber) && <li className="flex items-center gap-2"><span>📱</span><span>{settings.contactPhone || settings.whatsappNumber}</span></li>}
                {settings?.wechat && <li className="flex items-center gap-2"><span>💬</span><span>WeChat: {settings.wechat}</span></li>}
                {settings?.address && <li className="flex items-center gap-2"><span>📍</span><span>{settings.address}</span></li>}
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Quick Links</h5>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Follow / Connect</h5>
              <div className="space-y-3">
                {(settings?.socialLinks || []).map((item: any, index: number) => <SmartLink key={index} href={item?.url} newTab={item?.newTab} className="flex items-center gap-2 text-gray-400 hover:text-white transition"><span>{socialIconMap[item?.platform] || '🔗'}</span><span>{item?.label || item?.platform || 'Link'}</span></SmartLink>)}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500"><p>&copy; 2026 {settings?.siteTitle || 'Xinjiang Travel'}. All rights reserved.</p></div>
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

function SmartLink({ href, newTab, className, children }: any) {
  if (!href) return <span className={className}>{children}</span>;
  const isAnchor = href.startsWith('#');
  const isInternal = href.startsWith('/') || isAnchor;
  if (isInternal) return <Link href={href} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</Link>;
  return <a href={href} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</a>;
}

function SectionHeader({ title, subtitle }: { title?: string; subtitle?: string }) { return <div className="text-center mb-16 max-w-3xl mx-auto px-4">{title && <h3 className="text-4xl font-bold text-gray-800 mb-4">{title}</h3>}{subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}</div>; }
function FeatureIconsSection({ section }: { section: any }) { return <section className="py-20 bg-gray-50"><div className="container mx-auto px-4"><SectionHeader title={section.title} subtitle={section.subtitle} /><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{(section.items || []).map((item: any, index: number) => <IconInfoCard key={index} item={item} compact />)}</div></div></section>; }
function DestinationCardsSection({ section }: { section: any }) { return <section id={section.anchorId || undefined} className="py-20 bg-white"><div className="container mx-auto px-4"><SectionHeader title={section.title} subtitle={section.subtitle} /><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{(section.items || []).map((item: any, index: number) => <DestinationCard key={index} item={item} />)}</div></div></section>; }
function TourListSection({ section, tours }: { section: any; tours: any[] }) { return <section id={section.anchorId || undefined} className="py-20 bg-gray-50"><div className="container mx-auto px-4"><SectionHeader title={section.title} subtitle={section.subtitle} />{tours && tours.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{tours.map((tour: any) => <TourCard key={tour._id} tour={tour} />)}</div> : <div className="text-center text-gray-500 py-12"><p className="text-xl">No tour packages available yet.</p></div>}{section.viewMoreText && resolveManagedLink(section.viewMoreTarget, section.viewMoreLink) && <div className="text-center mt-12"><SmartLink href={resolveManagedLink(section.viewMoreTarget, section.viewMoreLink)} newTab={section.viewMoreNewTab} className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition inline-block">{section.viewMoreText} →</SmartLink></div>}</div></section>; }
function ArticleListSection({ section, articles }: { section: any; articles: any[] }) { return <section id={section.anchorId || undefined} className="py-20 bg-white"><div className="container mx-auto px-4"><SectionHeader title={section.title} subtitle={section.subtitle} />{articles && articles.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{articles.map((article: any) => <ArticleCard key={article._id} article={article} />)}</div> : <div className="text-center text-gray-500 py-12"><p className="text-xl">No articles yet.</p></div>}{section.viewMoreText && resolveManagedLink(section.viewMoreTarget, section.viewMoreLink) && <div className="text-center mt-12"><SmartLink href={resolveManagedLink(section.viewMoreTarget, section.viewMoreLink)} newTab={section.viewMoreNewTab} className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition inline-block">{section.viewMoreText} →</SmartLink></div>}</div></section>; }
function StatsSection({ section }: { section: any }) { return <section className="py-20 bg-blue-50"><div className="container mx-auto px-4"><SectionHeader title={section.title} subtitle={section.subtitle} /><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{(section.items || []).map((item: any, index: number) => <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm border"><div className="text-4xl font-bold text-blue-600 mb-2">{item.number}</div><div className="text-gray-700 font-medium">{item.label}</div></div>)}</div></div></section>; }
function TestimonialsSection({ section }: { section: any }) { return <section className="py-20 bg-white"><div className="container mx-auto px-4"><SectionHeader title={section.title} subtitle={section.subtitle} /><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{(section.items || []).map((item: any, index: number) => <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-sm border"><div className="text-yellow-500 mb-4">{'★'.repeat(Math.max(1, Math.min(5, Number(item.rating || 5))))}</div><p className="text-gray-700 mb-6">“{item.quote}”</p><div className="font-bold text-gray-900">{item.name}</div><div className="text-sm text-gray-500">{item.country}</div></div>)}</div></div></section>; }
function FaqPreviewSection({ section, faqItems }: { section: any; faqItems: any[] }) { const list = faqItems.slice(0, section.maxItems || 4); return <section className="py-20 bg-gray-50"><div className="container mx-auto px-4"><SectionHeader title={section.title} subtitle={section.subtitle} /><div className="max-w-4xl mx-auto space-y-4">{list.map((faq: any, index: number) => <details key={index} className="bg-white rounded-xl border p-5"><summary className="font-semibold cursor-pointer text-gray-800">{faq.question}</summary><div className="mt-3 text-gray-600">{faq.answer}</div></details>)}</div>{section.viewMoreText && resolveManagedLink(section.viewMoreTarget, section.viewMoreLink) && <div className="text-center mt-12"><SmartLink href={resolveManagedLink(section.viewMoreTarget, section.viewMoreLink)} className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition inline-block">{section.viewMoreText} →</SmartLink></div>}</div></section>; }
function CtaSection({ section }: { section: any }) { return <section className="py-20 bg-blue-700 text-white relative overflow-hidden"><div className="container mx-auto px-4 text-center max-w-4xl relative z-10">{section.backgroundImage && <div className="absolute inset-0 opacity-20 -z-10"><Image src={imageUrlFor(section.backgroundImage, 1400)} alt={section.title || 'CTA background'} fill className="object-cover" /></div>}<h3 className="text-4xl md:text-5xl font-bold mb-6">{section.title}</h3>{section.subtitle && <p className="text-xl text-blue-100 mb-8">{section.subtitle}</p>}<div className="flex flex-col sm:flex-row gap-4 justify-center">{section.primaryButtonText && <SmartLink href={resolveManagedLink(section.primaryButtonTarget, section.primaryButtonLink)} newTab={section.primaryButtonNewTab} className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition inline-block">{section.primaryButtonText}</SmartLink>}{section.secondaryButtonText && <SmartLink href={resolveManagedLink(section.secondaryButtonTarget, section.secondaryButtonLink)} newTab={section.secondaryButtonNewTab} className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition inline-block">{section.secondaryButtonText}</SmartLink>}</div></div></section>; }
function IconInfoCard({ item, compact = false }: { item: any; compact?: boolean }) { const icon = renderManagedIcon(item, compact ? 'text-4xl' : 'text-5xl'); return <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition border border-gray-100"><div className="flex justify-center mb-5">{icon}</div><h4 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h4>{item.description && <p className="text-gray-600 mb-5">{item.description}</p>}{resolveManagedLink(item.linkTarget, item.link) && item.linkText && <SmartLink href={resolveManagedLink(item.linkTarget, item.link)} newTab={item.newTab} className="text-blue-600 font-semibold hover:text-blue-700 inline-block">{item.linkText} →</SmartLink>}</div>; }
function DestinationCard({ item }: { item: any }) { return <SmartCardLink href={resolveManagedLink(item.linkTarget, item.link)} newTab={item.newTab} className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer block min-h-[20rem]"><div className="relative h-80 bg-gray-200">{item.backgroundImage ? <Image src={imageUrlFor(item.backgroundImage, 900)} alt={item.title || 'Destination'} fill className="object-cover group-hover:scale-110 transition duration-500" /> : <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">{renderManagedIcon(item, 'text-7xl text-white')}</div>}<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div><div className="absolute bottom-0 left-0 right-0 p-6 text-white"><h4 className="text-2xl font-bold mb-2">{item.title}</h4><p className="text-gray-200">{item.description}</p></div></div></SmartCardLink>; }
function SmartCardLink({ href, newTab, className, children }: any) { if (!href) return <div className={className}>{children}</div>; const isInternal = href.startsWith('/') || href.startsWith('#'); if (isInternal) return <Link href={href} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</Link>; return <a href={href} className={className} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>{children}</a>; }
function TourCard({ tour }: { tour: any }) { return <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition group cursor-pointer"><div className="relative h-56"><Image src={imageUrlFor(tour.image, 800)} alt={tour.title} fill className="object-cover group-hover:scale-105 transition duration-300" />{tour.published && <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Available</div>}</div><div className="p-6"><div className="flex items-center gap-2 mb-3"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{tour.duration} Days</span></div><h4 className="text-xl font-bold mb-2 text-gray-800">{tour.title}</h4><p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p><div className="flex justify-between items-center pt-4 border-t"><div><span className="text-gray-400 line-through text-sm">${tour.price ? tour.price + 99 : '899'}</span><span className="text-3xl font-bold text-blue-600 ml-2">${tour.price || '699'}</span></div><Link href={`/tours/${tour.slug}`} className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-semibold inline-block">View →</Link></div></div></div>; }
function ArticleCard({ article }: { article: any }) { return <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group cursor-pointer"><div className="relative h-48"><Image src={imageUrlFor(article.mainImage, 600)} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-300" /></div><div className="p-6"><h4 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h4>{article.author && <p className="text-sm text-gray-500 mb-4">By {article.author}</p>}<Link href={`/articles/${article.slug}`} className="text-blue-600 font-semibold hover:text-blue-700 inline-block">Read More →</Link></div></div>; }
function renderManagedIcon(item: any, className = 'text-5xl') { if (item?.iconType === 'upload' && item?.uploadedIcon) return <div className="relative w-16 h-16"><Image src={imageUrlFor(item.uploadedIcon, 128)} alt={item.title || 'Icon'} fill className="object-contain" /></div>; if (item?.iconType === 'emoji' && item?.emoji) return <span className={className}>{item.emoji}</span>; return <span className={className}>{presetIconMap[item?.presetIcon] || '🧭'}</span>; }
const presetIconMap: Record<string, string> = { compass: '🧭', map: '🗺️', camera: '📷', star: '⭐', shield: '🛡️', chat: '💬', plane: '✈️', mountain: '🏔️', heart: '❤️', clock: '⏰' };
const socialIconMap: Record<string, string> = { whatsapp: '💬', wechat: '🟢', instagram: '📸', facebook: '📘', youtube: '▶️', tiktok: '🎵', email: '📧', custom: '🔗' };
function getDefaultSectionLabel(type: string) { const map: Record<string, string> = { heroSection: 'Home', featureIconsSection: 'Highlights', destinationCardsSection: 'Destinations', tourListSection: 'Tours', articleListSection: 'Guides', faqPreviewSection: 'FAQ', statsSection: 'Stats', testimonialsSection: 'Reviews', ctaSection: 'Plan Your Trip' }; return map[type] || 'Section'; }
