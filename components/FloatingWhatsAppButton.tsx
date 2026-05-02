import { buildWhatsAppUrl, defaultWhatsAppMessage, WHATSAPP_DISPLAY } from '@/lib/contact';
import type { Lang } from '@/lib/i18n';

export default function FloatingWhatsAppButton({ lang = 'en' }: { lang?: Lang }) {
  const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage(lang));
  const label = lang === 'zh' ? 'WhatsApp 咨询' : 'WhatsApp Inquiry';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${WHATSAPP_DISPLAY}`}
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(37,211,102,0.34)] transition hover:bg-[#1fb75a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <span className="text-base">✆</span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
