import type { Metadata } from 'next';
import Link from 'next/link';
import { normalizeLang, withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insights - Infinite Travel',
  description: 'Travel guides, planning notes and inspiration for tailor-made journeys across China.',
};

const posts = [
  { title: { en: 'How to Plan a Multi-City China Trip', zh: '如何规划一条多城市中国旅行路线' }, desc: { en: 'A simple framework for combining Beijing, Shanghai, Xinjiang and other destinations.', zh: '如何把北京、上海、新疆等目的地组合成清晰路线。' } },
  { title: { en: 'Choosing the Right Pace for Your Journey', zh: '如何选择适合自己的旅行节奏' }, desc: { en: 'Why pace matters more than distance when planning premium travel.', zh: '高品质旅行里，节奏往往比距离更重要。' } },
  { title: { en: 'What First-Time Visitors Should Know', zh: '首次来华游客需要知道什么' }, desc: { en: 'Useful notes for international travelers coming to China for the first time.', zh: '给第一次来华的海外游客的一些实用建议。' } },
];

export default function InsightsPage({ searchParams }: any) {
  const lang = normalizeLang(searchParams?.lang);
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">{lang === 'zh' ? '无限旅途' : 'Infinite Travel'}</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-navy)] md:text-6xl">{lang === 'zh' ? '旅行灵感' : 'Travel Guides'}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{lang === 'zh' ? '帮助你规划旅程的建议与故事。' : 'Tips and stories for planning your journey.'}</p>

      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((item) => (
          <article key={item.title.zh} className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,52,0.06)]">
            <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{lang === 'zh' ? item.title.zh : item.title.en}</h2>
            <p className="mt-3 text-[var(--color-muted)] leading-7">{lang === 'zh' ? item.desc.zh : item.desc.en}</p>
          </article>
        ))}
      </section>

      <div className="mt-14">
        <Link href={withLang('/', lang)} className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]">
          {lang === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </main>
  );
}
