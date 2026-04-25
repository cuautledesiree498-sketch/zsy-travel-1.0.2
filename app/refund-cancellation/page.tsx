import { permanentRedirect } from 'next/navigation';
import { withLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

type SearchParamsInput = Promise<{ lang?: string | string[] }> | { lang?: string | string[] };

export default async function RefundCancellationPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const rawParams = await searchParams;
  const lang = Array.isArray(rawParams?.lang) ? rawParams.lang[0] : rawParams?.lang;
  const destination = lang === 'en' || lang === 'zh' ? withLang('/refund-policy', lang) : '/refund-policy';

  permanentRedirect(destination);
}
