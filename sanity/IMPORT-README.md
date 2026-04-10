# Sanity Seed Import Notes

## 当前 seed 文件

### 1. Destinations
- `sanity/destination-seeds.ndjson`
- 文档类型：`destination`
- 当前数量：10

### 2. Tours
- `sanity/tour-seeds.ndjson`
- 文档类型：`tour`
- 当前数量：10

### 3. Articles
- `sanity/article-seeds.ndjson`
- 文档类型：`article`
- 当前数量：10

---

## 当前校验结论

### destination-seeds.ndjson
已对照 `sanity/schemaTypes/destination.ts` 做快速结构检查。

当前已对齐的主要字段：
- `_type: "destination"`
- `name`
- `slug.current`
- `tagline`
- `description`
- `highlights`
- `idealFor`
- `bestTime`
- `suggestedStay`
- `heroFacts`
- `experiences`
- `samplePlan`
- `published`
- `order`

说明：
- 当前未提供 `image` / `gallery`，这是允许的，后续可在后台补图。

### tour-seeds.ndjson
已对照 `sanity/schemaTypes/tour.ts` 做快速结构检查。

当前已对齐的主要字段：
- `_type: "tour"`
- `title`
- `slug.current`
- `price`
- `duration`
- `description`
- `tagline`
- `idealFor`
- `travelStyle`
- `howToUse`
- `bestTime`
- `extensions`
- `published`
- `order`
- `highlights`
- `itinerary`

说明：
- 当前未提供 `image`，这是允许的，后续可在后台补图。

### article-seeds.ndjson
已对照 `sanity/schemaTypes/article.ts` 做快速结构检查。

当前已对齐的主要字段：
- `_type: "article"`
- `title`
- `slug.current`
- `author`
- `publishDate`
- `excerpt`
- `tagline`
- `heroFacts`
- `content`
- `published`

说明：
- 当前未提供 `mainImage`，这是允许的，后续可在后台补图。
- `content` 当前使用 Portable Text block 数组的基础结构：
  - `[{ _type: "block", style: "normal", children: [{ _type: "span", text: "..." }] }]`
- 这是可被 Sanity 接受的基础写法，适合作为 seed 骨架。

---

## 当前阶段建议

### 推荐顺序
1. 先导入 `destination-seeds.ndjson`
2. 再导入 `tour-seeds.ndjson`
3. 最后导入 `article-seeds.ndjson`

原因：
- destination 最直观，最容易先看出前台有没有正常吃数据
- tour 决定成交感与详情页完整度
- article 更偏 SEO / 专业感补强

---

## 导入后建议检查的位置

### Sanity 后台
- `destination` 文档列表是否出现 10 条
- `tour` 文档列表是否出现 10 条
- `article` 文档列表是否出现 10 条

### 前台页面
- `/destinations`
- `/destinations/[slug]`
- `/tours/[slug]`
- `/articles/[slug]`
- 首页入口卡片是否都能正常跳转

---

## 当前 seed 的定位

这些文件现在是：
- **可导入骨架**
- **可展示基础内容**
- **可继续人工润色和补图**

它们还不是最终商业文案，后续仍建议补：
- 更真实的图片
- 更细的 itinerary 内容
- 更强的销售型 CTA
- 更贴近品牌口径的措辞

---

## 下一步建议

完成导入后，优先检查：
1. 前台列表页是否能显示足量条目
2. 详情页是否能正常渲染这些 seed 数据
3. 首页卡片入口是否都已接到真实详情页
4. 确认无明显空白区块后，再做 git commit / push / 部署验证
