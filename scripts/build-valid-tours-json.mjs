import fs from 'fs/promises';
import path from 'path';

const sourcePath = 'C:/Users/Administrator/.openclaw/workspace/zsy-travel/tours.json';
const outputPath = 'C:/Users/Administrator/travel-website/my-travel-site/scripts/generated-tours.json';

const extraTours = [
  {
    "id": "8796913",
    "title": "【多人立减】贵州贵阳荔波安顺5天4晚跟团游",
    "subtitle": "小七孔+西江千户苗寨+黄果树瀑布+贵州古镇+专职老司机带路",
    "destination": "贵州",
    "cities": ["贵阳", "安顺", "荔波", "黔东南"],
    "days": 5,
    "nights": 4,
    "price_from": 1940,
    "price_to": 4630,
    "currency": "CNY",
    "group_size_min": null,
    "group_size_max": 30,
    "sold_count": 3,
    "rating": 5.0,
    "rating_count": 93,
    "highlights": ["精选当地品质酒店", "蜂范商家严选品质", "蜂蜜抵20%"],
    "itinerary": [
      {"day":1,"title":"贵阳","route":"贵阳","meals":"早:自理 午:自理 晚:自理","hotel":"贵阳观山湖希尔顿惠庭酒店","activities":[{"time":"上午","name":"自由活动","description":"抵达贵阳机场/高铁后接机/站送酒店。推荐美食青云路、二七路小吃街，推荐景点甲秀楼、黔灵山公园。"}]},
      {"day":2,"title":"安顺-黄果树瀑布","route":"贵阳 → 安顺","meals":"早:酒店提供 午:黄果树屯堡宴 晚:自理","hotel":"安顺华通大酒店","activities":[{"time":"上午","name":"黄果树瀑布","description":"景区由天星桥、黄果树瀑布、陡坡塘瀑布三大景点组成，游览约6-7小时。"}]},
      {"day":3,"title":"荔波","route":"安顺 → 荔波","meals":"早:酒店提供 午:自理 晚:自理","hotel":"荔波滨江酒店(荔波古镇邓恩铭故居店)","activities":[{"time":"上午","name":"青岩古镇","description":"明清古镇，中国耶路撒冷5A级景区，建于600年前的军事古镇。"}]},
      {"day":4,"title":"黔东南-西江千户苗寨","route":"荔波 → 黔东南","meals":"早:酒店提供 午:瑶王至尊大鲵宴 晚:高山流水长桌宴","hotel":"屿念·伴山度田园观景民宿（西江千户苗寨店）","activities":[{"time":"上午","name":"小七孔景区","description":"5A景区，含小七孔古桥、拉雅瀑布、六十八级跌水瀑布、水上森林、卧龙潭。"}]},
      {"day":5,"title":"贵阳","route":"黔东南 → 贵阳","meals":"早:酒店提供 午:自理 晚:自理","hotel":null,"activities":[{"time":"上午","name":"自由活动","description":"可二上观景台赏苗寨晨景。"}]}
    ],
    "provider": "北京兴悦国际旅行社有限公司",
    "includes": ["景点首道大门票", "大交通(火车/飞机)", "当地交通", "4晚住宿", "4早4正餐", "中文导游服务"],
    "url": "https://www.mafengwo.cn/sales/8796913.html"
  },
  {
    "id": "ctibet_7d",
    "title": "西藏拉萨布达拉宫纳木措7天6晚品质游",
    "subtitle": "布达拉宫+大昭寺+纳木措+羊卓雍措+雅鲁藏布大峡谷",
    "destination": "西藏",
    "cities": ["拉萨", "林芝", "日喀则"],
    "days": 7,
    "nights": 6,
    "price_from": 5280,
    "price_to": 8960,
    "currency": "CNY",
    "group_size_max": 20,
    "sold_count": 156,
    "rating": 4.9,
    "rating_count": 421,
    "highlights": ["含氧酒店住宿", "藏式特色餐", "布达拉宫金牌讲解", "纯玩无购物"],
    "itinerary": [
      {"day":1,"title":"抵达拉萨","route":"拉萨","meals":"早:自理 午:自理 晚:自理","hotel":"拉萨饭店/岷山饭店","activities":[{"time":"全天","name":"接机/接站","description":"抵达拉萨贡嘎机场，专车送至酒店休息，适应高原环境。"}]},
      {"day":2,"title":"拉萨-布达拉宫-大昭寺","route":"拉萨","meals":"早:含 午:含 晚:自理","hotel":"拉萨","activities":[{"time":"上午","name":"布达拉宫","description":"参观布达拉宫，世界海拔最高的宏伟建筑，含金牌讲解。"}]}
    ],
    "provider": "携程自营",
    "includes": ["景点首道大门票", "6晚住宿(含氧酒店)", "当地交通", "6早7正餐", "中文导游服务", "氧气瓶"],
    "url": "https://www.ctrip.com/"
  },
  {
    "id": "csichuan_6d",
    "title": "四川成都九寨沟黄龙6天5晚纯玩团",
    "subtitle": "九寨沟+黄龙+熊猫乐园+都江堰+青城山",
    "destination": "四川",
    "cities": ["成都", "九寨沟", "黄龙", "都江堰"],
    "days": 6,
    "nights": 5,
    "price_from": 3680,
    "price_to": 6280,
    "currency": "CNY",
    "group_size_min": 2,
    "group_size_max": 12,
    "sold_count": 267,
    "rating": 4.9,
    "rating_count": 658,
    "highlights": ["小团出行", "九寨沟深度游", "看大熊猫", "都江堰+青城山"],
    "itinerary": [
      {"day":1,"title":"抵达成都","route":"成都","meals":"早:自理 午:自理 晚:自理","hotel":"成都","activities":[{"time":"全天","name":"接机/接站","description":"抵达成都，专车送至酒店。推荐宽窄巷子、锦里、春熙路。"}]},
      {"day":2,"title":"成都-熊猫乐园-都江堰-青城山","route":"成都 → 都江堰 → 青城山","meals":"早:含 午:含 晚:含","hotel":"都江堰/汶川","activities":[{"time":"上午","name":"熊猫乐园","description":"近距离观赏大熊猫。"}]}
    ],
    "provider": "携程自营",
    "includes": ["景点首道大门票", "当地交通", "5晚住宿", "5早6正餐", "中文导游服务"],
    "url": "https://www.ctrip.com/"
  },
  {
    "id": "cchongqing_4d",
    "title": "重庆武隆天坑+大足石刻4天3晚跟团游",
    "subtitle": "天生三桥+龙水峡地缝+大足石刻+洪崖洞夜景+磁器口古镇",
    "destination": "重庆",
    "cities": ["重庆", "武隆", "大足"],
    "days": 4,
    "nights": 3,
    "price_from": 1880,
    "price_to": 3280,
    "currency": "CNY",
    "group_size_max": 25,
    "sold_count": 134,
    "rating": 4.8,
    "rating_count": 287,
    "highlights": ["世界自然遗产", "世界文化遗产", "洪崖洞夜景", "重庆火锅"],
    "itinerary": [
      {"day":1,"title":"抵达重庆","route":"重庆","meals":"早:自理 午:自理 晚:含(重庆火锅)","hotel":"重庆解放碑商圈","activities":[{"time":"全天","name":"抵达重庆","description":"抵达重庆，专车送至酒店。晚上可自由游览洪崖洞夜景。"}]},
      {"day":2,"title":"重庆-武隆天坑","route":"重庆 → 武隆","meals":"早:含 午:含 晚:含","hotel":"武隆仙女镇","activities":[{"time":"上午","name":"天生三桥","description":"世界自然遗产，电影《变形金刚4》取景地。"}]}
    ],
    "provider": "携程自营",
    "includes": ["景点首道大门票", "当地交通", "3晚住宿", "3早5正餐", "中文导游服务"],
    "url": "https://www.ctrip.com/"
  }
];

async function main() {
  const raw = await fs.readFile(sourcePath, 'utf8');
  const fixed = raw + '\n  ,' + extraTours.map((tour) => JSON.stringify(tour, null, 2)).join(',\n') + '\n  ]\n}';
  const data = JSON.parse(fixed);
  await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Generated valid JSON with ${data.tours.length} tours -> ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
