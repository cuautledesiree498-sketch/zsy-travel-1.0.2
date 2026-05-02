import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettings, imageUrlFor, fallbackImages } from '@/lib/sanity';
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/contact';
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
  const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage(lang));
  const footerIntro = lang === 'zh' ? '无限旅途更关注路线逻辑、沟通清晰度和执行衔接，让中国旅行规划更容易确认和落地。' : 'Infinite Travel puts more weight on route logic, communication clarity, and execution coordination so a China trip is easier to confirm and carry through.';
  const aboutHeroTitle = lang === 'zh' ? '我们更在意把一趟中国旅行先理顺' : 'We Care More About Getting a China Trip Properly Straightened Out First';
  const aboutHeroSubtitle = lang === 'zh'
    ? '比起把很多城市和项目堆在一起，我们更在意先把路线、节奏、沟通和确认顺序理清。这样后面的执行，才不容易一路变形。'
    : 'Instead of piling cities and activities together, we care more about getting the route, pace, communication, and confirmation order straight first. That usually makes the trip much easier to carry through without it falling apart halfway.';
  const aboutIntroTitle = lang === 'zh' ? '我们是谁' : 'Who We Are';
  const aboutIntroBody = lang === 'zh'
    ? '无限旅途不是那种先把一堆看起来很好的选项摆出来、再让你自己拼路线的方式。我们更像是在前面先陪你把这趟旅行理顺：你为什么想来中国、和谁来、时间够不够、城市怎么接、哪些地方值得放、哪些地方其实该删。这个页面想讲清楚的，不是我们能提供多少服务名目，而是我们怎么判断一条路线到底成不成立。'
    : 'Infinite Travel is not really about laying out a long list of attractive options and asking you to assemble the route yourself. We work more like a planning partner who helps straighten the trip out early: why you want to come to China, who you are traveling with, whether the timing is realistic, how the cities should connect, what is worth keeping, and what is better cut. This page is here less to list service categories and more to show how we judge whether a route actually makes sense.';
  const aboutPositioningTitle = lang === 'zh' ? '我们的工作方式' : 'How We Work';
  const aboutPositioningItems = [
    lang === 'zh' ? '先确认目标、限制条件和优先级，再进入路线组合。' : 'We clarify goals, constraints, and priorities before shaping the route.',
    lang === 'zh' ? '先讲清楚城市衔接、节奏和执行难点，再讨论细节升级。' : 'We explain city flow, pacing, and execution pressure before adding extra detail.',
    lang === 'zh' ? '双语沟通尽量直接，避免在确认阶段留下模糊空间。' : 'Bilingual communication stays direct so less ambiguity remains at confirmation time.',
    lang === 'zh' ? '更重视真实可执行性，而不是只看表面上“想去很多地方”。' : 'We prioritize what is realistically executable, not just how much can be listed on paper.',
    lang === 'zh' ? '在供应商、时间和预算之间，尽量先把关键判断讲清楚。' : 'We try to make the key tradeoffs clear across suppliers, timing, and budget.',
  ];
  const aboutWhyTitle = lang === 'zh' ? '为什么我们宁愿先把这些讲清楚' : 'Why We Prefer to Get These Things Clear First';
  const aboutWhyItems = [
    {
      title: lang === 'zh' ? '路线判断更有依据' : 'Route decisions have clearer logic',
      desc: lang === 'zh' ? '我们会先看节奏、跨城移动成本和体验排序，再决定路线是否成立。' : 'We look at pacing, intercity transfer cost, and experience order before deciding whether a route really works.',
    },
    {
      title: lang === 'zh' ? '沟通节点更清楚' : 'Communication is easier to follow',
      desc: lang === 'zh' ? '先把人数、时间、预算、偏好和限制说清楚，再推进下一步确认。' : 'We clarify group size, timing, budget, preferences, and constraints before moving into the next confirmation step.',
    },
    {
      title: lang === 'zh' ? '确认过程更稳' : 'Confirmation stays more disciplined',
      desc: lang === 'zh' ? '会先厘清哪些部分需要先锁定，哪些部分可以后续微调。' : 'We separate what needs to be locked earlier from what can stay flexible a little longer.',
    },
    {
      title: lang === 'zh' ? '执行衔接更实际' : 'Execution planning is more practical',
      desc: lang === 'zh' ? '重视出发前确认、现场衔接和执行中的连续沟通，而不是只停留在概念上。' : 'We pay attention to pre-trip confirmation, on-the-ground coordination, and ongoing communication instead of stopping at broad ideas.',
    },
  ];
  const aboutCtaTitle = lang === 'zh' ? '先把你的情况告诉我们，我们再一起判断路线' : 'Tell Us Your Situation First, Then We Can Judge the Route Together';
  const aboutCtaSubtitle = lang === 'zh'
    ? '如果你也更在意路线是不是顺、节奏是不是合理、确认过程是不是清楚，那就直接发咨询。我们会先从时间、人数、预算和重点偏好开始，一步步把方向理出来。'
    : 'If this way of planning fits how you want to travel, send us an inquiry. We will start with your dates, group size, budget, and priorities, then work forward from there step by step.';

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
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{lang === 'zh' ? '我们是谁' : 'Who We Are'}</p>
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
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#1fb75a]">
              WhatsApp
            </a>
            <Link href={withLang('/contact#inquiry-form', lang)} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-accent)]">{lang === 'zh' ? '提交咨询' : 'Submit an Inquiry'}</Link>
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
