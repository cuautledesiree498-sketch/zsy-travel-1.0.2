const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');
const { apiVersion, dataset, projectId } = require('../sanity/env.ts');

const token = fs.readFileSync(path.join(process.cwd(), 'secrets', 'sanity_token.txt'), 'utf8').trim();
const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

async function main() {
  const home = await client.fetch(`*[_type == "homeSettings"][0]{_id, sections[]{_key,_type,title,subtitle,items[]{_key,_type,title,description,emoji,iconType,linkTarget,linkText}}}`);
  if (!home?._id) throw new Error('homeSettings not found');

  const featureSection = (home.sections || []).find((section) => section?._type === 'featureIconsSection');
  if (!featureSection?._key) throw new Error('featureIconsSection not found');

  const items = [
    {
      _key: 'svc-multicity',
      _type: 'iconLinkCard',
      title: { en: 'Multi-City China Travel Service', zh: '中国多城市旅行服务' },
      description: {
        en: 'We organize China trips across multiple cities and regions, not as disconnected stops but as one clearer route.',
        zh: '不把北京、上海、西安、新疆这些地方割裂来看，而是帮你整理成一条更完整的中国路线。'
      },
      emoji: '🗺️',
      iconType: 'emoji',
      linkTarget: '/destinations',
      linkText: { en: 'Explore Destinations', zh: '查看目的地' }
    },
    {
      _key: 'svc-itinerary',
      _type: 'iconLinkCard',
      title: { en: 'Itinerary Design & Route Structuring', zh: '行程设计与路线组织' },
      description: {
        en: 'We turn destination ideas into routes with clearer pacing, stronger logic and more workable day-to-day flow.',
        zh: '把“想去哪里”变成“怎么排更合理”，让线路更清楚、更顺、更容易落地。'
      },
      emoji: '🧭',
      iconType: 'emoji',
      linkTarget: '/tours',
      linkText: { en: 'View Travel Cases', zh: '查看案例' }
    },
    {
      _key: 'svc-bilingual',
      _type: 'iconLinkCard',
      title: { en: 'Bilingual Communication & Trip Confirmation', zh: '双语沟通与出行确认' },
      description: {
        en: 'We reduce planning friction through clearer English–Chinese communication and smoother trip confirmation.',
        zh: '用更清晰的中英双语沟通，减少理解偏差，让咨询、确认和出行衔接更顺畅。'
      },
      emoji: '💬',
      iconType: 'emoji',
      linkTarget: '/contact',
      linkText: { en: 'Contact Us', zh: '联系我们' }
    },
    {
      _key: 'svc-pacing',
      _type: 'iconLinkCard',
      title: { en: 'Pacing & Real Travel Experience First', zh: '更重视节奏与真实体验' },
      description: {
        en: 'We care more about whether the route actually feels comfortable than whether it simply looks full on paper.',
        zh: '不追求纸面上塞满景点，而更重视整条路线是否舒服、自然、真的适合出行。'
      },
      emoji: '⏳',
      iconType: 'emoji',
      linkTarget: '/insights',
      linkText: { en: 'Read Planning Insights', zh: '看判断内容' }
    },
    {
      _key: 'svc-audience-fit',
      _type: 'iconLinkCard',
      title: { en: 'Fits Families, Study Trips, Business Guests & Private Travelers', zh: '适配家庭 / 研学 / 商务 / 私人客群' },
      description: {
        en: 'We shape the route differently depending on whether the trip is family-led, education-focused, business-related or privately customized.',
        zh: '根据不同出行目的，调整路线结构、节奏和重点，而不是一套模板打所有人。'
      },
      emoji: '👥',
      iconType: 'emoji',
      linkTarget: '/services',
      linkText: { en: 'See Services', zh: '查看服务' }
    }
  ];

  const patchPayload = {
    [`sections[_key=="${featureSection._key}"].title`]: { en: 'Why Travel With Us', zh: '为什么选择我们' },
    [`sections[_key=="${featureSection._key}"].subtitle`]: { en: 'Service capabilities shaped by our positioning', zh: '服务能力' },
    [`sections[_key=="${featureSection._key}"].items`]: items,
  };

  const result = await client.patch(home._id).set(patchPayload).commit();
  console.log(JSON.stringify({ ok: true, result }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
