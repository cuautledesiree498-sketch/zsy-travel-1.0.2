import type { Metadata } from 'next';
import Link from 'next/link';
import { withLang, normalizeLang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang);
  return {
    title: lang === 'zh' ? '支付说明 - ZSY Travel' : 'Payment - ZSY Travel',
    description: lang === 'zh'
      ? '查看 ZSY Travel 的支付说明与后续支付流程安排。'
      : 'Review payment information and the expected payment process for ZSY Travel bookings.',
  };
}

export default async function PaymentPage({ searchParams }: any) {
  const lang = normalizeLang((await searchParams)?.lang);
  const isZh = lang === 'zh';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Link href={withLang('/', lang)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            {isZh ? '← 返回首页' : '← Back to Home'}
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">{isZh ? '支付' : 'Payment'}</p>
          <h1 className="mt-4 text-5xl font-semibold text-[var(--color-navy)] md:text-7xl">{isZh ? '安全灵活的支付方式' : 'Secure and Flexible Payment Options'}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
            {isZh
              ? '我们支持多种国际主流支付方式。详细的支付流程与退改政策将在方案确认后，随行程合同一并发送给您。'
              : 'We support a range of major international payment methods. Detailed payment instructions and cancellation policies will be shared together with your travel agreement once the itinerary is confirmed.'}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_16px_40px_rgba(10,27,52,0.05)]">
              <h2 className="text-2xl font-semibold text-[var(--color-navy)]">{isZh ? '当前状态' : 'Current Status'}</h2>
              <p className="mt-4 leading-8 text-[var(--color-muted)]">
                {isZh
                  ? '当前支付页面已预留，等待真实收款链接接入。链接补齐后，可进一步开放支付定金、支付全款等入口。'
                  : 'The payment page is prepared as a structured placeholder and is ready for the real payment link to be connected. Once the link is available, deposit and full-payment options can be enabled.'}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[rgba(10,27,52,0.08)] bg-[linear-gradient(135deg,#10233d,#183459)] p-8 text-white shadow-[0_24px_60px_rgba(10,27,52,0.08)]">
              <h2 className="text-2xl font-semibold">{isZh ? '下一步需要什么' : 'What We Need Next'}</h2>
              <p className="mt-4 leading-8 text-[rgba(255,255,255,0.82)]">
                {isZh
                  ? '补上 PingPong 收款链接后，我们就可以把页面里的支付入口正式激活。'
                  : 'Once the PingPong payment link is added, the payment entry on this page can be activated immediately.'}
              </p>
              <div className="mt-8">
                <Link href={withLang('/contact', lang)} className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)]">
                  {isZh ? '联系补充链接' : 'Add the Payment Link'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
