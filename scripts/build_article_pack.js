const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Administrator/travel-website/my-travel-site/scripts/article_pack_v2026-04-11';
const structuredDir = path.join(root, 'structured');
fs.mkdirSync(structuredDir, { recursive: true });

const articles = [
  { slug: 'best-time-to-visit-china', title: 'Best Time to Visit China for Different Travel Styles', angle: '总述型时间指南', sections: ['When to Go', 'By Travel Style', 'Quick Recommendations'] },
  { slug: 'first-time-in-china-where-to-start', title: 'First Time in China: Where Should You Start?', angle: '新客入口型', sections: ['Start Here', 'Good First Cities', 'Planning Tips'] },
  { slug: 'beijing-vs-shanghai', title: 'Beijing vs Shanghai: Which City Fits Your Trip Better?', angle: '对比决策型', sections: ['At a Glance', 'Who Should Choose Beijing', 'Who Should Choose Shanghai'] },
  { slug: 'how-many-days-for-china-trip', title: 'How Many Days Do You Need for a China Trip?', angle: '行程规划型', sections: ['Trip Length Basics', 'Example Itineraries', 'Common Mistakes'] },
  { slug: 'is-xinjiang-right-for-first-trip', title: 'Is Xinjiang Right for Your First Trip to China?', angle: '筛选型内容', sections: ['What Xinjiang Is Like', 'Best Fit Travelers', 'When to Avoid'] },
  { slug: 'yunnan-or-sichuan', title: 'Yunnan or Sichuan: Which Southwest Route Should You Choose?', angle: '双路线比较型', sections: ['Route Comparison', 'Yunnan Strengths', 'Sichuan Strengths'] },
  { slug: 'luxury-travel-in-china', title: 'Luxury Travel in China: What It Actually Means', angle: '品牌定位型', sections: ['What Luxury Means Here', 'Service Elements', 'What Clients Usually Expect'] },
  { slug: 'private-vs-group-tours-china', title: 'Private Tours vs Fixed Group Tours in China', angle: '成交教育型', sections: ['Key Differences', 'Pros and Cons', 'Which One Fits You'] },
  { slug: 'china-travel-planning-mistakes', title: 'China Travel Planning Mistakes First-Time Visitors Often Make', angle: '避坑型', sections: ['Mistake 1', 'Mistake 2', 'Mistake 3'] },
  { slug: 'how-to-build-a-multi-city-china-itinerary', title: 'How to Build a Multi-City China Itinerary That Actually Works', angle: '方法论型', sections: ['Core Rules', 'City Pairing Logic', 'Sample Structure'] },
];

function localizedString(en, zh) { return { en, zh }; }
function localizedText(en, zh) { return { en, zh }; }

function makeArticle(a, i) {
  const title = a.title;
  const excerptEn = `A practical guide focused on ${a.angle.toLowerCase()} for travelers planning China.`;
  const excerptZh = `一篇偏${a.angle}的实用文章，帮助你更好地规划中国旅行。`;
  const taglineEn = [
    'Useful, direct, and written for real trip planning.',
    'A compact article designed to help travelers make decisions faster.',
  ][i % 2];
  const taglineZh = [
    '直接、实用，面向真实行程决策。',
    '一篇帮助旅客更快做出判断的短文。',
  ][i % 2];
  const heroFacts = [
    { label: localizedString('Best for', '适合'), value: localizedString('Planning decisions', '行程决策') },
    { label: localizedString('Style', '风格'), value: localizedString(a.angle, a.angle) },
    { label: localizedString('Reading time', '阅读时长'), value: localizedString('3-5 min', '3-5 分钟') },
  ];
  const content = [
    { _type: 'block', style: 'normal', children: [{ _type: 'span', text: `This article is built around ${a.angle}.`, marks: [] }] },
    { _type: 'block', style: 'normal', children: [{ _type: 'span', text: `Use it to help travelers choose a route, a city, or a trip length with less guesswork.`, marks: [] }] },
    { _type: 'block', style: 'normal', children: [{ _type: 'span', text: `Suggested structure: ${a.sections.join(' / ')}.`, marks: [] }] },
  ];
  return {
    _type: 'article',
    title: localizedString(title, title),
    slug: { current: a.slug },
    author: 'Infinite Travel Editorial Team',
    publishDate: '2026-04-11T01:05:00.000Z',
    excerpt: localizedText(excerptEn, excerptZh),
    tagline: localizedString(taglineEn, taglineZh),
    heroFacts,
    content,
    published: true,
    order: i + 1,
  };
}

const docs = articles.map(makeArticle);
fs.writeFileSync(path.join(root, 'article-seeds.review.ndjson'), docs.map((d) => JSON.stringify(d)).join('\n') + '\n', 'utf8');
fs.writeFileSync(path.join(structuredDir, 'articles.structured.json'), JSON.stringify(docs, null, 2), 'utf8');
console.log('built article pack', docs.length);
