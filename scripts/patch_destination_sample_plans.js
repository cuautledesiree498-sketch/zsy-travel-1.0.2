const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);

const client = createClient({
  projectId: 'j7fa6cf0',
  dataset: 'production',
  apiVersion: '2026-04-03',
  useCdn: false,
  token,
});

const plans = {
  chengdu: [
    {
      title: { en: 'Arrive in Chengdu and slow the pace down', zh: '抵达成都，先把节奏放慢' },
      description: { en: 'Use Chengdu as the softer, more livable chapter of the route.', zh: '把成都作为整条路线里更柔和、更宜居的章节。' },
    },
    {
      title: { en: 'Food, neighborhood rhythm and everyday city life', zh: '美食、街区节奏与城市日常' },
      description: { en: 'Focus on food culture and the city’s relaxed daily atmosphere.', zh: '聚焦美食文化与城市里的慢节奏日常。' },
    },
    {
      title: { en: 'Extend toward Chongqing or the Southwest', zh: '延展到重庆或西南线路' },
      description: { en: 'Chengdu works well as a base before moving into a broader southwest journey.', zh: '成都很适合作为进入更大西南线路之前的基础节点。' },
    },
  ],
  chongqing: [
    {
      title: { en: 'Arrive in Chongqing and enter the mountain-city chapter', zh: '抵达重庆，进入山城章节' },
      description: { en: 'Start with the city’s layered geography and dramatic structure.', zh: '从山城的立体地形和戏剧化结构开始。' },
    },
    {
      title: { en: 'Night views, river scenery and visual contrast', zh: '夜景、江景与视觉反差' },
      description: { en: 'Use the city’s lights and river views as the main visual memory.', zh: '用夜景和江景作为最强记忆点。' },
    },
    {
      title: { en: 'Continue into nearby scenic or southwest routes', zh: '衔接周边风景或西南线路' },
      description: { en: 'Chongqing can be a strong contrast stop before moving deeper into the region.', zh: '重庆可以作为反差感很强的中转节点，再继续进入更深的区域线路。' },
    },
  ],
  guilin: [
    {
      title: { en: 'Arrive in Guilin and enter the classic scenery chapter', zh: '抵达桂林，进入经典山水章节' },
      description: { en: 'Start with one of China’s most recognizable landscape identities.', zh: '从中国最具识别度的山水形象之一开始。' },
    },
    {
      title: { en: 'River views, karst mountains and softer pacing', zh: '江景、喀斯特山体与更柔和的节奏' },
      description: { en: 'Focus on scenery and movement rather than a packed sightseeing list.', zh: '聚焦山水和节奏，而不是堆满景点。' },
    },
    {
      title: { en: 'Extend into a longer nature-focused southwest route', zh: '延展成更长的自然风景线路' },
      description: { en: 'Guilin works especially well as part of a longer scenic route.', zh: '桂林尤其适合放进更长的风景型路线里。' },
    },
  ],
  xinjiang: [
    {
      title: { en: 'Arrive in Xinjiang and shift into a landscape-first route', zh: '抵达新疆，切换到风景优先的路线' },
      description: { en: 'The journey begins with scale, openness and strong scenic contrast.', zh: '从尺度感、开阔感与强风景反差开始。' },
    },
    {
      title: { en: 'Road rhythm, mountains and grasslands', zh: '公路线节奏、山川与草原' },
      description: { en: 'The middle chapter is best treated as a road-trip experience rather than a city stop.', zh: '中段更适合按公路旅行来理解，而不是城市停留。' },
    },
    {
      title: { en: 'Close with a scenic finale or extend deeper west', zh: '以风景收束，或继续向西延展' },
      description: { en: 'Xinjiang can close as a powerful final chapter or extend into a broader northwest route.', zh: '新疆既可以作为强有力的收尾章节，也可以继续向西北延展。' },
    },
  ],
  yunnan: [
    {
      title: { en: 'Arrive in Yunnan and slow the route down', zh: '抵达云南，先把路线放慢' },
      description: { en: 'Yunnan works best when the route is allowed to breathe.', zh: '云南最适合在有呼吸感的节奏里展开。' },
    },
    {
      title: { en: 'Old towns, mountain views and softer scenic layers', zh: '古城、山景与更柔和的风景层' },
      description: { en: 'Focus on atmosphere, scenery and a more relaxed pace.', zh: '聚焦氛围、景观与更放松的节奏。' },
    },
    {
      title: { en: 'Use Yunnan as the calm balance point of the trip', zh: '把云南作为整趟旅行的平衡点' },
      description: { en: 'It works well after faster city chapters or as a stand-alone slow-travel route.', zh: '它既适合作为快节奏城市章节之后的平衡段，也适合作为独立慢旅行线路。' },
    },
  ],
  zhangjiajie: [
    {
      title: { en: 'Arrive in Zhangjiajie and enter the cinematic landscape chapter', zh: '抵达张家界，进入电影感风景章节' },
      description: { en: 'The route starts with one of China’s most striking natural identities.', zh: '从中国最具冲击力的自然形象之一开始。' },
    },
    {
      title: { en: 'Peak viewpoints and dramatic mountain layers', zh: '峰林观景与震撼山体层次' },
      description: { en: 'Focus on viewpoints and the highly visual mountain scenery.', zh: '聚焦观景点和极具视觉冲击力的山体景观。' },
    },
    {
      title: { en: 'Close as a high-impact scenic finale', zh: '作为高冲击力风景收尾' },
      description: { en: 'Zhangjiajie is often strongest when used as a memorable final nature chapter.', zh: '张家界最适合承担“记忆点很强的自然收尾”。' },
    },
  ],
};

async function main() {
  const docs = await client.fetch(`*[_type == "destination" && slug.current in $slugs]{ _id, "slug": slug.current }`, { slugs: Object.keys(plans) });
  const tx = client.transaction();
  for (const doc of docs) {
    tx.patch(doc._id, { set: { samplePlan: plans[doc.slug] } });
  }
  const result = await tx.commit();
  console.log(JSON.stringify({ patched: docs.length, transactionId: result.transactionId || null }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
