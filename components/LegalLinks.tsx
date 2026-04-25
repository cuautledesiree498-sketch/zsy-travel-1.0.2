import Link from 'next/link';
import { withLang, type Lang } from '@/lib/i18n';

export default function LegalLinks({
  lang,
  title,
  className = '',
  itemClassName = '',
}: {
  lang: Lang;
  title?: string;
  className?: string;
  itemClassName?: string;
}) {
  const items = [
    { href: '/terms', label: lang === 'zh' ? '服务条款' : 'Terms & Conditions' },
    { href: '/privacy', label: lang === 'zh' ? '隐私政策' : 'Privacy Policy' },
    { href: '/refund-policy', label: lang === 'zh' ? '退款与取消政策' : 'Refund & Cancellation Policy' },
  ];

  return (
    <div className={className}>
      {title ? <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">{title}</p> : null}
      {items.map((item) => (
        <p key={item.href} className={itemClassName}>
          <Link href={withLang(item.href, lang)} className="transition hover:text-[var(--color-navy)]">
            {item.label}
          </Link>
        </p>
      ))}
    </div>
  );
}
