from pathlib import Path

# About
p = Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/about/page.tsx')
text = p.read_text(encoding='utf-8')
repls = {
"const siteTitle = pickLocalized(settings?.siteTitle, lang) || 'Infinite Journeys';": "const siteTitle = 'ZSY Travel';",
"const siteDescription = pickLocalized(settings?.siteDescription, lang) || 'Tailor-made luxury travel experiences across China.';": "const siteDescription = lang === 'zh' ? 'ZSY Travel 是面向全球旅客的中国高端定制旅行品牌。' : 'ZSY Travel is a premium China travel brand for tailor-made journeys.';",
"const footerIntro = pickLocalized(settings?.footerIntro, lang) || siteDescription;": "const footerIntro = lang === 'zh' ? 'ZSY Travel 专注中国高端定制旅行；后台未填的部分会以测试标记显示。' : 'ZSY Travel focuses on premium tailor-made journeys across China; unfilled CMS content is marked as test content.';",
"const aboutHeroTitle = pickLocalized(settings?.aboutHeroTitle, lang) || 'A more refined way to experience China.';": "const aboutHeroTitle = lang === 'zh' ? '关于 ZSY Travel｜中国高端定制旅行' : 'About ZSY Travel | Tailor-Made Luxury China Travel';",
"const aboutHeroSubtitle = pickLocalized(settings?.aboutHeroSubtitle, lang) || 'We design private China travel solutions around different traveler needs.';": "const aboutHeroSubtitle = lang === 'zh' ? '我们围绕不同客群、出行目的与体验标准，设计更完整、更有质感的中国旅程。' : 'We design more refined China journeys around traveler type, travel purpose and service expectations.';",
"const aboutIntroTitle = pickLocalized(settings?.aboutIntroTitle, lang) || 'We design China journeys around people, not templates.';": "const aboutIntroTitle = lang === 'zh' ? '我们做的不是模板化卖团，而是围绕人来设计旅程。' : 'We do not sell rigid templates — we design journeys around people.';",
"const aboutIntroBody = pickLocalized(settings?.aboutIntroBody, lang) || 'Our core business is not selling a fixed tour. We build tailor-made travel solutions around different traveler goals.';": "const aboutIntroBody = lang === 'zh' ? 'ZSY Travel 面向家庭、情侣、商务接待、私人小团和主题旅行客户，提供中国高端定制旅行设计与沟通服务。\\n\\n未在后台补齐的模块，会在前台明确标成测试，方便你继续填充正式内容。' : 'ZSY Travel serves families, couples, executive travel, private groups and theme-driven travelers with premium tailor-made China journey design.\\n\\nAny CMS area not yet fully filled is intentionally marked as test content so you can see what still needs content.';",
"const aboutPositioningTitle = pickLocalized(settings?.aboutPositioningTitle, lang) || 'Our Positioning';": "const aboutPositioningTitle = lang === 'zh' ? '品牌定位' : 'Brand Positioning';",
"const aboutWhyTitle = pickLocalized(settings?.aboutWhyTitle, lang) || 'A clearer, calmer and more polished planning experience.';": "const aboutWhyTitle = lang === 'zh' ? '为什么是这种页面结构' : 'Why This Site Is Structured This Way';",
"const aboutCtaTitle = pickLocalized(settings?.aboutCtaTitle, lang) || 'Tell us what kind of China journey you want to create.';": "const aboutCtaTitle = lang === 'zh' ? '告诉我们你想做一趟怎样的中国旅程。' : 'Tell us what kind of China journey you want to create.';",
"const aboutCtaSubtitle = pickLocalized(settings?.aboutCtaSubtitle, lang) || 'We help shape travel solutions for families, private guests, executive groups and culture-focused travelers.';": "const aboutCtaSubtitle = lang === 'zh' ? '如果后台对应模块还没填完，你会直接看到测试标记；后续只需要按模块补文案即可。' : 'If a matching CMS block is not yet filled, you will see an explicit test marker so the missing content is easy to spot and complete.';",
"const aboutPositioningItems = settings?.aboutPositioningItems?.length ? settings.aboutPositioningItems.map((item: string) => pickLocalized(item, lang)) : [];": "const aboutPositioningItems = settings?.aboutPositioningItems?.length ? settings.aboutPositioningItems.map((item: string) => displayText(pickLocalized(item, lang))) : [displayText('待填写：品牌定位 1'), displayText('待填写：品牌定位 2'), displayText('待填写：品牌定位 3')];",
"const aboutWhyItems = settings?.aboutWhyItems?.length ? settings.aboutWhyItems.map((item: any) => ({ title: pickLocalized(item?.title, lang), desc: pickLocalized(item?.desc, lang) })) : [];": "const aboutWhyItems = settings?.aboutWhyItems?.length ? settings.aboutWhyItems.map((item: any) => ({ title: displayText(pickLocalized(item?.title, lang)), desc: displayText(pickLocalized(item?.desc, lang)) })) : [{ title: displayText('待填写：优势标题 1'), desc: displayText('待填写：优势说明 1') }, { title: displayText('待填写：优势标题 2'), desc: displayText('待填写：优势说明 2') }, { title: displayText('待填写：优势标题 3'), desc: displayText('待填写：优势说明 3') }, { title: displayText('待填写：优势标题 4'), desc: displayText('待填写：优势说明 4') }];",
}
for o,n in repls.items(): text = text.replace(o,n)
p.write_text(text, encoding='utf-8')

# Contact
p = Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/contact/page.tsx')
text = p.read_text(encoding='utf-8')
repls = {
"const siteTitle = pickLocalized(settings?.siteTitle, lang) || 'Infinite Journeys';": "const siteTitle = 'ZSY Travel';",
"const footerIntro = pickLocalized(settings?.footerIntro, lang) || 'Tailor-made luxury travel experiences across China.';": "const footerIntro = lang === 'zh' ? 'ZSY Travel 专注中国高端定制旅行；空缺字段已加测试标记，方便继续填充。' : 'ZSY Travel focuses on premium tailor-made China journeys; empty areas are marked as test content for easy completion.';",
"const contactAddress = pickLocalized(settings?.address, lang) || 'China';": "const contactAddress = displayText(pickLocalized(settings?.address, lang), lang === 'zh' ? '待填写：办公地点 / 服务基地' : 'Location / service base to be filled');",
"const contactHeroTitle = pickLocalized(settings?.contactHeroTitle, lang) || 'Let’s plan a more refined journey across China.';": "const contactHeroTitle = lang === 'zh' ? '联系 ZSY Travel｜开启中国高端定制旅行沟通' : 'Contact ZSY Travel | Start Planning a Tailor-Made China Journey';",
"const contactHeroSubtitle = pickLocalized(settings?.contactHeroSubtitle, lang) || 'Tell us your travel time, preferred destinations and traveler profile.';": "const contactHeroSubtitle = lang === 'zh' ? '你可以从出发时间、目的地偏好、客群类型和预算方向开始，我们会据此整理更清晰的定制沟通。' : 'Start with your travel timing, destination preferences, traveler type and budget direction, and we will shape a clearer planning conversation around it.';",
"const contactGuideTitle = pickLocalized(settings?.contactGuideTitle, lang) || 'What to send us for a faster proposal';": "const contactGuideTitle = lang === 'zh' ? '为了更快给你方案，建议先提供这些信息' : 'What To Send Us For A Faster Proposal';",
"const contactGuideItems = settings?.contactGuideItems?.length ? settings.contactGuideItems.map((item: string) => pickLocalized(item, lang)) : [];": "const contactGuideItems = settings?.contactGuideItems?.length ? settings.contactGuideItems.map((item: string) => displayText(pickLocalized(item, lang))) : [displayText(lang === 'zh' ? '待填写：出行月份 / 天数' : 'Travel month / length to be filled'), displayText(lang === 'zh' ? '待填写：人数与客群类型' : 'Traveler count / profile to be filled'), displayText(lang === 'zh' ? '待填写：目的地偏好与预算范围' : 'Destination preference / budget range to be filled')];",
"const contactStatusNote = pickLocalized(settings?.contactStatusNote, lang) || 'This page is ready as a presentation and planning entry point.';": "const contactStatusNote = lang === 'zh' ? '当前页已按 ZSY Travel 品牌方向重构；后台未补齐的字段会显示测试标记。' : 'This page has been rebuilt around the ZSY Travel brand direction; any unfinished CMS field is shown with a visible test marker.';",
"const contactCtaTitle = pickLocalized(settings?.contactCtaTitle, lang) || 'We can begin with a simple message and shape the rest with you.';": "const contactCtaTitle = lang === 'zh' ? '哪怕只是一个初步想法，也可以先开始。' : 'Even a rough idea is enough to start the conversation.';",
"const contactCtaSubtitle = pickLocalized(settings?.contactCtaSubtitle, lang) || 'If you are not sure where to start, simply tell us the month, destinations and traveler type.';": "const contactCtaSubtitle = lang === 'zh' ? '如果某个联系字段还没有正式内容，你会看到测试字样，方便后续逐项补齐。' : 'If a contact field is still missing final content, it is intentionally labeled as test content so you can fill it later item by item.';",
"<InfoCard title=\"Email\" value={settings?.contactEmail || 'info@example.com'}": "<InfoCard title=\"Email\" value={displayText(settings?.contactEmail, '待填写：联系邮箱')}" ,
"<InfoCard title=\"Phone / WhatsApp\" value={settings?.contactPhone || settings?.whatsappNumber || '+86 123 4567 8900'}": "<InfoCard title=\"Phone / WhatsApp\" value={displayText(settings?.contactPhone || settings?.whatsappNumber, '待填写：电话 / WhatsApp')}" ,
"<InfoCard title=\"WeChat\" value={settings?.wechat || 'Please add in CMS'}": "<InfoCard title=\"WeChat\" value={displayText(settings?.wechat, '待填写：微信号')}" ,
}
for o,n in repls.items(): text = text.replace(o,n)
p.write_text(text, encoding='utf-8')

# FAQ
p = Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/faq/page.tsx')
text = p.read_text(encoding='utf-8')
repls = {
"const siteTitle = pickLocalized(settings?.siteTitle, lang) || 'Infinite Journeys';": "const siteTitle = 'ZSY Travel';",
"const footerIntro = pickLocalized(settings?.footerIntro, lang) || 'Tailor-made luxury travel experiences across China.';": "const footerIntro = lang === 'zh' ? 'ZSY Travel 专注中国高端定制旅行；FAQ 未填字段会显示测试标记。' : 'ZSY Travel focuses on premium tailor-made China journeys; unfinished FAQ content is marked as test content.';",
"        { question: 'Can you customize a private itinerary across multiple cities in China?', answer: 'Yes. We specialize in tailor-made journeys across China based on your travel goals and schedule.' },": "        { question: displayText(lang === 'zh' ? '待填写：FAQ 问题 1' : 'FAQ question 1 to be filled'), answer: displayText(lang === 'zh' ? '待填写：FAQ 回答 1' : 'FAQ answer 1 to be filled') },\n        { question: displayText(lang === 'zh' ? '待填写：FAQ 问题 2' : 'FAQ question 2 to be filled'), answer: displayText(lang === 'zh' ? '待填写：FAQ 回答 2' : 'FAQ answer 2 to be filled') },": 
"        { question: displayText(lang === 'zh' ? '待填写：FAQ 问题 1' : 'FAQ question 1 to be filled'), answer: displayText(lang === 'zh' ? '待填写：FAQ 回答 1' : 'FAQ answer 1 to be filled') },\n        { question: displayText(lang === 'zh' ? '待填写：FAQ 问题 2' : 'FAQ question 2 to be filled'), answer: displayText(lang === 'zh' ? '待填写：FAQ 回答 2' : 'FAQ answer 2 to be filled') },",
"{pickLocalized(settings?.faqTitle, lang) || 'Frequently Asked Questions'}": "{displayText(pickLocalized(settings?.faqTitle, lang), lang === 'zh' ? 'FAQ 标题待填写' : 'FAQ title to be filled')}",
"{pickLocalized(settings?.faqSubtitle, lang) || 'Find answers to common questions about our tailor-made China journeys, booking process, and travel planning support.'}": "{displayText(pickLocalized(settings?.faqSubtitle, lang), lang === 'zh' ? 'FAQ 副标题待填写' : 'FAQ subtitle to be filled')}",
"{pickLocalized(faq.question, lang)}": "{displayText(pickLocalized(faq.question, lang))}",
"{pickLocalized(faq.answer, lang)}": "{displayText(pickLocalized(faq.answer, lang))}",
"{pickLocalized(settings?.faqCtaTitle, lang) || 'Still deciding what kind of trip fits you best?'}": "{displayText(pickLocalized(settings?.faqCtaTitle, lang), lang === 'zh' ? 'FAQ CTA 标题待填写' : 'FAQ CTA title to be filled')}",
"{pickLocalized(settings?.faqCtaSubtitle, lang) || 'Whether you are planning for family travel, executive travel, private journeys or a culture-focused route, we can help translate your ideas into a clearer tailor-made China plan.'}": "{displayText(pickLocalized(settings?.faqCtaSubtitle, lang), lang === 'zh' ? 'FAQ CTA 副标题待填写' : 'FAQ CTA subtitle to be filled')}",
}
for o,n in repls.items(): text = text.replace(o,n)
p.write_text(text, encoding='utf-8')

# Articles
p = Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/articles/[slug]/page.tsx')
text = p.read_text(encoding='utf-8')
repls = {
"const siteTitle = pickLocalized(settings?.siteTitle, lang) || 'Infinite Journeys';": "const siteTitle = 'ZSY Travel';",
"const footerIntro = pickLocalized(settings?.footerIntro, lang) || 'Tailor-made luxury travel experiences across China.';": "const footerIntro = lang === 'zh' ? 'ZSY Travel 灵感内容页；缺少正文或字段时会显示测试标记。' : 'ZSY Travel insights page; missing fields are intentionally shown with test markers.';",
"const articleTitle = pickLocalized(article.title, lang) || 'Article';": "const articleTitle = displayText(pickLocalized(article.title, lang), lang === 'zh' ? '文章标题待填写' : 'Article title to be filled');",
"{lang === 'zh' ? '内容暂未补充。' : 'No content available yet.'}": "{displayText(lang === 'zh' ? '正文内容待填写' : 'Article body to be filled')}",
}
for o,n in repls.items(): text = text.replace(o,n)
text = text.replace("{article.author && <span>{t.by} {article.author}</span>}", "<span>{t.by} {displayText(article.author, lang === 'zh' ? '作者待填写' : 'Author to be filled')}</span>")
p.write_text(text, encoding='utf-8')

# Tours
p = Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/tours/[slug]/page.tsx')
text = p.read_text(encoding='utf-8')
repls = {
"const siteTitle = pickLocalized(settings?.siteTitle, lang) || 'Infinite Journeys';": "const siteTitle = 'ZSY Travel';",
"const footerIntro = pickLocalized(settings?.footerIntro, lang) || 'Tailor-made luxury travel experiences across China.';": "const footerIntro = lang === 'zh' ? 'ZSY Travel 案例详情页；未填好的字段会显示测试标记。' : 'ZSY Travel case detail page; unfinished fields are displayed with test markers.';",
"const tourTitle = pickLocalized(tour.title, lang) || 'Tour';": "const tourTitle = displayText(pickLocalized(tour.title, lang), lang === 'zh' ? '案例标题待填写' : 'Case title to be filled');",
"const tourDescription = pickLocalized(tour.description, lang) || (lang === 'zh' ? '定制路线简介待补充。' : 'Tour overview coming soon.');": "const tourDescription = displayText(pickLocalized(tour.description, lang), lang === 'zh' ? '路线概览待填写' : 'Overview to be filled');",
"const tourHighlights = Array.isArray(tour.highlights) ? tour.highlights.map((item: any) => pickLocalized(item, lang)).filter(Boolean) : [];": "const tourHighlights = Array.isArray(tour.highlights) && tour.highlights.length ? tour.highlights.map((item: any) => displayText(pickLocalized(item, lang))).filter(Boolean) : [displayText(lang === 'zh' ? '亮点 1 待填写' : 'Highlight 1 to be filled'), displayText(lang === 'zh' ? '亮点 2 待填写' : 'Highlight 2 to be filled')];",
"const itinerary = Array.isArray(tour.itinerary)\n    ? tour.itinerary.map((day: any) => ({\n        day: day?.day,\n        title: pickLocalized(day?.title, lang),\n        description: pickLocalized(day?.description, lang),\n      }))\n    : [];": "const itinerary = Array.isArray(tour.itinerary) && tour.itinerary.length\n    ? tour.itinerary.map((day: any) => ({\n        day: day?.day,\n        title: displayText(pickLocalized(day?.title, lang), lang === 'zh' ? '行程标题待填写' : 'Itinerary title to be filled'),\n        description: displayText(pickLocalized(day?.description, lang), lang === 'zh' ? '行程描述待填写' : 'Itinerary description to be filled'),\n      }))\n    : [{ day: 1, title: displayText(lang === 'zh' ? '第 1 天行程待填写' : 'Day 1 itinerary to be filled'), description: displayText(lang === 'zh' ? '第 1 天说明待填写' : 'Day 1 description to be filled') }];",
"{tour.duration ? `${tour.duration} ${lang === 'zh' ? '天' : 'Days'}` : (lang === 'zh' ? '待定' : 'TBD')}": "{tour.duration ? `${tour.duration} ${lang === 'zh' ? '天' : 'Days'}` : displayText(lang === 'zh' ? '时长待填写' : 'Duration to be filled')}",
"{tour.price ? `$${tour.price}` : (lang === 'zh' ? '沟通后确认' : 'On request')}": "{tour.price ? `$${tour.price}` : displayText(lang === 'zh' ? '预算待填写' : 'Budget to be filled')}",
}
for o,n in repls.items(): text = text.replace(o,n)
p.write_text(text, encoding='utf-8')
