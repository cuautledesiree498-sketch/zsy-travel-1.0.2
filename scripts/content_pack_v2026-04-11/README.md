# Content Pack v2026-04-11

用途：把 destinations / tours 的**文案**与**行程 itinerary 骨架**先独立打包，图片暂不写入 Sanity seeds（避免你审核前出现图片资产格式不匹配问题）。

- 目录说明：
  - `destinations/`：每个目的地的 tagline/description/highlights/idealFor/bestTime/suggestedStay/heroFacts/experiences/samplePlan 文案块
  - `tours/`：每条线路的 tagline/description/idealFor/travelStyle/howToUse/bestTime/extensions/highlights/itinerary 行程骨架
  - `images/`：你审核通过后再把图片资源（cover/gallery）补齐到这里，再决定如何写回 seeds

文件内容仅用于人工审核与后续把数据转换成 Sanity NDJSON。
