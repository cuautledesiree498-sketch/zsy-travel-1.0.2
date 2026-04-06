from pathlib import Path

files = [
    Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/about/page.tsx'),
    Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/contact/page.tsx'),
    Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/faq/page.tsx'),
    Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/articles/[slug]/page.tsx'),
    Path(r'C:/Users/Administrator/travel-website/my-travel-site/app/tours/[slug]/page.tsx'),
]

for p in files:
    text = p.read_text(encoding='utf-8')
    text = text.replace("import { normalizeLang, pickLocalized, uiText, withLang } from '@/lib/i18n';", "import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n';")
    text = text.replace("import { normalizeLang, pickLocalized, uiText, withLang } from '@/lib/i18n'", "import { normalizeLang, pickLocalized, uiText, withLang, markPlaceholder } from '@/lib/i18n'")
    if 'function displayText(' not in text:
        text += "\n\nfunction displayText(value: any, fallback = '测试待补充') {\n  return markPlaceholder(value || fallback);\n}\n"
    p.write_text(text, encoding='utf-8')
