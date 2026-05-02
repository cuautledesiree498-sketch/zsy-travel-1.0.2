export const WHATSAPP_NUMBER = '85252876850';
export const WHATSAPP_DISPLAY = '+852 5287 6850';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const DEFAULT_WHATSAPP_MESSAGE_EN = "Hi Infinite Travel, I'd like help planning a China trip. My travel dates are ___, group size is ___, and I'm interested in ___.\n\n你好 Infinite Travel，我想咨询中国旅行定制。我的出行日期是 ___，人数是 ___，感兴趣的目的地/体验是 ___。";
const DEFAULT_WHATSAPP_MESSAGE_ZH = '你好 Infinite Travel，我想咨询中国旅行定制。我的出行日期是 ___，人数是 ___，感兴趣的目的地/体验是 ___。\n\nHi Infinite Travel, I would like help planning a China trip. My travel dates are ___, group size is ___, and I am interested in ___.';

export function buildWhatsAppUrl(message?: string) {
  const text = (message || DEFAULT_WHATSAPP_MESSAGE_EN).trim();
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
}

export function defaultWhatsAppMessage(lang: 'en' | 'zh' = 'en') {
  return lang === 'zh' ? DEFAULT_WHATSAPP_MESSAGE_ZH : DEFAULT_WHATSAPP_MESSAGE_EN;
}
