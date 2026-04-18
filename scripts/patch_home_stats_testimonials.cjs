const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');
const { apiVersion, dataset, projectId } = require('../sanity/env.ts');

const token = fs.readFileSync(path.join(process.cwd(), 'secrets', 'sanity_token.txt'), 'utf8').trim();
const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

async function main() {
  const home = await client.fetch(`*[_type == "homeSettings"][0]{_id, sections[]{_key,_type,items[]{number,label,quote,name,country,rating}}}`);
  if (!home?._id) throw new Error('homeSettings not found');

  const statsSection = (home.sections || []).find((section) => section?._type === 'statsSection');
  const testimonialsSection = (home.sections || []).find((section) => section?._type === 'testimonialsSection');

  const patchPayload = {};

  if (statsSection?._key) {
    patchPayload[`sections[_key=="${statsSection._key}"].items`] = [
      {
        _key: 'first-time-china',
        number: { en: 'First-Time China', zh: '首访中国' },
        label: { en: 'Easier to Start', zh: '更容易起步' }
      },
      {
        _key: 'city-scenery-balance',
        number: { en: 'City + Scenery', zh: '城市 + 风景' },
        label: { en: 'Easier to Balance', zh: '更容易平衡' }
      },
      {
        _key: 'private-custom',
        number: { en: 'Private Custom', zh: '私人定制' },
        label: { en: 'Shaped Around You', zh: '按需求收束' }
      },
      {
        _key: 'within-24h',
        number: { en: 'Within 24h', zh: '24h 内' },
        label: { en: 'Typical Reply', zh: '通常回复' }
      }
    ];
  }

  if (testimonialsSection?._key) {
    patchPayload[`sections[_key=="${testimonialsSection._key}"].items`] = [
      {
        _key: 'emily-uk',
        rating: 5,
        quote: {
          en: 'We were unsure whether to do Beijing, Xi’an or Guilin first. Once they restructured the pacing, the whole route became much easier to decide.',
          zh: '我们原本在北京、西安和桂林之间拿不定主线，他们帮我们把路线节奏整理清楚之后，整个行程一下子就更容易决定了。'
        },
        name: 'Emily',
        country: 'UK'
      },
      {
        _key: 'daniel-singapore',
        rating: 5,
        quote: {
          en: 'Xinjiang looked difficult to plan at first, but their route logic made the transport rhythm and scenery balance feel much more manageable.',
          zh: '新疆一开始看起来很难规划，但他们给出的结构把城市、风景和交通节奏讲清楚后，整个方向就没有那么吓人了。'
        },
        name: 'Daniel',
        country: 'Singapore'
      },
      {
        _key: 'sofia-spain',
        rating: 5,
        quote: {
          en: 'The most useful part was not just attraction suggestions. They were clear about which combinations were too rushed and which ones fit a first China trip better.',
          zh: '最有帮助的不是“推荐景点”，而是他们会直接告诉我们哪些组合太赶，哪些更适合第一次来中国。'
        },
        name: 'Sofia',
        country: 'Spain'
      }
    ];
  }

  if (!Object.keys(patchPayload).length) {
    throw new Error('No target sections found to patch');
  }

  const result = await client.patch(home._id).set(patchPayload).commit();
  console.log(JSON.stringify({ ok: true, result }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
