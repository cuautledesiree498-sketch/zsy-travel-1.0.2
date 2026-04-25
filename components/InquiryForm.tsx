"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { withLang } from '@/lib/i18n';

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  destination: string;
  travelDate: string;
  groupSize: string;
  budget: string;
  hotelPreference: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  whatsapp: '',
  destination: '',
  travelDate: '',
  groupSize: '',
  budget: '',
  hotelPreference: '',
  message: '',
};

export default function InquiryForm({
  lang,
}: {
  lang: 'en' | 'zh';
}) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const labels = useMemo(
    () => (lang === 'zh'
      ? {
          title: '快速咨询表单',
          subtitle: '填写后将由网站直接提交，我们会把询盘通知发送到业务邮箱。',
          name: '姓名',
          email: '邮箱',
          whatsapp: 'WhatsApp',
          destination: '目的地',
          travelDate: '出行日期',
          groupSize: '人数',
          budget: '预算',
          hotelPreference: '酒店偏好',
          message: '留言',
          submit: '提交咨询',
          sending: '提交中...',
          success: '提交成功，我们会尽快查看并跟进。',
          error: '提交失败，请稍后重试。',
        }
      : {
          title: 'Quick Inquiry Form',
          subtitle: 'When you submit, the website will send your inquiry directly to our business inbox.',
          name: 'Name',
          email: 'Email',
          whatsapp: 'WhatsApp',
          destination: 'Destination',
          travelDate: 'Travel Date',
          groupSize: 'Group Size',
          budget: 'Budget',
          hotelPreference: 'Hotel Preference',
          message: 'Message',
          submit: 'Submit Inquiry',
          sending: 'Submitting...',
          success: 'Inquiry submitted successfully. We will review it and follow up soon.',
          error: 'Submission failed. Please try again later.',
        }),
    [lang]
  );

  const setField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, lang }),
      });

      const result = await response.json();

      if (!response.ok || !result?.ok) {
        const details = typeof result?.details === 'string' ? result.details : '';
        const message = [result?.error || labels.error, details].filter(Boolean).join(' | ');
        throw new Error(message || labels.error);
      }

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : labels.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_25px_70px_rgba(10,27,52,0.06)] md:p-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{labels.title}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{labels.subtitle}</p>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.name} value={form.name} onChange={(e) => setField('name', e.target.value)} required />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.email} type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} required />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.whatsapp} value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.destination} value={form.destination} onChange={(e) => setField('destination', e.target.value)} required />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.travelDate} value={form.travelDate} onChange={(e) => setField('travelDate', e.target.value)} />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.groupSize} value={form.groupSize} onChange={(e) => setField('groupSize', e.target.value)} />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.budget} value={form.budget} onChange={(e) => setField('budget', e.target.value)} />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.hotelPreference} value={form.hotelPreference} onChange={(e) => setField('hotelPreference', e.target.value)} />
        <textarea className="min-h-36 rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none md:col-span-2" placeholder={labels.message} value={form.message} onChange={(e) => setField('message', e.target.value)} required />

        <div className="md:col-span-2">
          <button type="submit" disabled={submitting} className="mt-2 inline-flex min-w-[240px] items-center justify-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-navy-soft)] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? labels.sending : labels.submit}
          </button>

          {status === 'success' ? (
            <p className="mt-4 text-sm leading-7 text-emerald-700">{labels.success}</p>
          ) : null}

          {status === 'error' ? (
            <p className="mt-4 text-sm leading-7 text-red-600">{errorMessage || labels.error}</p>
          ) : null}

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
            {lang === 'zh' ? (
              <>
                提交咨询即表示你同意我们使用你提供的信息来回复需求并提供旅行规划支持。请阅读我们的{' '}
                <Link href={withLang('/terms', lang)} className="font-medium text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">服务条款</Link>
                {' '}、{' '}
                <Link href={withLang('/privacy', lang)} className="font-medium text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">隐私政策</Link>
                {' '}以及{' '}
                <Link href={withLang('/refund-policy', lang)} className="font-medium text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">退款与取消政策</Link>
                。
              </>
            ) : (
              <>
                By submitting this inquiry, you agree that we may use the information you provide to respond to your request and prepare travel planning support. Please review our{' '}
                <Link href={withLang('/terms', lang)} className="font-medium text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">Terms & Conditions</Link>
                {', '}
                <Link href={withLang('/privacy', lang)} className="font-medium text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">Privacy Policy</Link>
                {', and '}
                <Link href={withLang('/refund-policy', lang)} className="font-medium text-[var(--color-navy)] transition hover:text-[var(--color-navy-soft)]">Refund & Cancellation Policy</Link>
                .
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
