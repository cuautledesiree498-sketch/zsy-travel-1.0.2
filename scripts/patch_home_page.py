from pathlib import Path

p = Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/page.tsx')
text = p.read_text(encoding='utf-8')

text = text.replace("const heroTitle = pickLocalized(heroSection?.title, lang) || 'Infinite Journeys Across China';", "const heroTitle = lang === 'zh' ? 'ZSY Travel｜中国高端定制旅行' : 'ZSY Travel | Tailor-Made Luxury Journeys Across China';")
text = text.replace("const heroSubtitle = pickLocalized(heroSection?.subtitle, lang) || 'Tailor-made luxury travel experiences across China.';", "const heroSubtitle = lang === 'zh' ? '面向全球旅客的中国高端定制旅行品牌，围绕客群、节奏与旅行目的，设计更完整、更省心、更有质感的中国旅程。' : 'A premium China travel brand creating tailor-made journeys around traveler type, pace and purpose — more refined, more flexible, and more thoughtfully designed.';")
text = text.replace("const footerIntro = pickLocalized(settings?.footerIntro, lang) || 'Tailor-made luxury travel experiences across China.';", "const footerIntro = lang === 'zh' ? 'ZSY Travel 专注中国高端定制旅行，为家庭、情侣、商务接待、私人小团与主题旅客提供更有结构、更有审美和更贴近真实需求的旅程设计。' : 'ZSY Travel focuses on premium tailor-made travel across China for families, couples, executive visits, private groups and theme-driven travelers who need a more structured and elevated journey design.';")
text = text.replace("const navCtaText = pickLocalized(settings?.headerCtaText || heroSection?.primaryButtonText, lang) || 'Plan Your Journey';", "const navCtaText = lang === 'zh' ? '定制我的旅程' : 'Tailor My Journey';")
text = text.replace("const siteTitle = pickLocalized(settings?.siteTitle, lang) || 'Infinite Journeys';", "const siteTitle = 'ZSY Travel';")
text = text.replace("const siteDescription = pickLocalized(settings?.siteDescription, lang) || 'Tailor-made luxury travel experiences across China.';", "const siteDescription = lang === 'zh' ? '中国高端定制旅行品牌，覆盖城市、人文、山河、商务与家庭等多类出行场景。' : 'A premium China travel brand for tailor-made journeys across cities, culture, landscapes, executive travel and family experiences.';")

pairs = [
    ("pickLocalized(section.title, lang)", "useDisplayText(section.title, lang)"),
    ("pickLocalized(section.subtitle, lang)", "useDisplayText(section.subtitle, lang)"),
    ("pickLocalized(section.viewMoreText, lang)", "useDisplayText(section.viewMoreText, lang)"),
    ("pickLocalized(section.primaryButtonText, lang)", "useDisplayText(section.primaryButtonText, lang)"),
    ("pickLocalized(section.secondaryButtonText, lang)", "useDisplayText(section.secondaryButtonText, lang)"),
    ("pickLocalized(item.title, lang)", "useDisplayText(item.title, lang)"),
    ("pickLocalized(item.description, lang)", "useDisplayText(item.description, lang)"),
    ("pickLocalized(item.linkText, lang)", "useDisplayText(item.linkText, lang)"),
    ("pickLocalized(item.quote, lang)", "useDisplayText(item.quote, lang)"),
    ("pickLocalized(item.number, lang)", "useDisplayText(item.number, lang)"),
    ("pickLocalized(item.label, lang)", "useDisplayText(item.label, lang)"),
    ("pickLocalized(faq.question, lang)", "useDisplayText(faq.question, lang)"),
    ("pickLocalized(faq.answer, lang)", "useDisplayText(faq.answer, lang)"),
    ("pickLocalized(tour.title, lang)", "useDisplayText(tour.title, lang)"),
    ("pickLocalized(tour.description, lang)", "useDisplayText(tour.description, lang)"),
    ("pickLocalized(article.title, lang)", "useDisplayText(article.title, lang)"),
]
for old, new in pairs:
    text = text.replace(old, new)

p.write_text(text, encoding='utf-8')
