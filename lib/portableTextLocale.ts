import { pickLocalized, type Lang } from '@/lib/i18n';

function blockText(block: any) {
  if (!block || block._type !== 'block' || !Array.isArray(block.children)) return '';
  return block.children.map((child: any) => typeof child?.text === 'string' ? child.text : '').join(' ').trim();
}

function hasChineseText(value: string) {
  return /[\u4e00-\u9fff]/.test(value);
}

function findChineseSectionStart(blocks: any[]) {
  return blocks.findIndex((block) => {
    const value = blockText(block);
    if (!value) return false;
    if (/^中文/.test(value)) return true;
    if (block?.style === 'h2' && hasChineseText(value)) return true;
    return false;
  });
}

function splitSequentialBilingualContent(blocks: any[], lang: Lang) {
  const chineseStart = findChineseSectionStart(blocks);
  if (chineseStart < 0) return blocks;

  if (lang === 'zh') {
    const firstChineseBlock = blocks[chineseStart];
    const firstText = blockText(firstChineseBlock);
    const shouldDropMarker = /^中文/.test(firstText);
    return blocks.slice(shouldDropMarker ? chineseStart + 1 : chineseStart);
  }

  return blocks.slice(0, chineseStart);
}

function localizeSpanText(text: string, lang: Lang) {
  return pickLocalized(text, lang);
}

function localizeBlock(block: any, lang: Lang) {
  if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
  return {
    ...block,
    children: block.children.map((child: any) => {
      if (!child || child._type !== 'span' || typeof child.text !== 'string') return child;
      return { ...child, text: localizeSpanText(child.text, lang) };
    }),
  };
}

export function localizePortableText(blocks: any, lang: Lang) {
  if (!Array.isArray(blocks)) return blocks;
  return splitSequentialBilingualContent(blocks, lang).map((block) => localizeBlock(block, lang));
}
