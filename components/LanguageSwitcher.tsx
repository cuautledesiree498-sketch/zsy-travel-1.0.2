'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { Lang } from '@/lib/i18n';

export default function LanguageSwitcher({ lang, className = '' }: { lang: Lang; className?: string }) {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh';
  const params = new URLSearchParams(searchParams?.toString() || '');
  params.set('lang', nextLang);
  const href = `${pathname}?${params.toString()}`;
  const label = lang === 'zh' ? 'English' : '中文';

  return (
    <Link
      href={href}
      className={className || 'inline-flex items-center rounded-full border border-[rgba(10,27,52,0.14)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)] transition hover:bg-[var(--color-navy)] hover:text-white'}
    >
      {label}
    </Link>
  );
}
