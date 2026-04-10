"use client";

import { useMemo, useState } from 'react';

export default function InquiryForm({
  lang,
  email,
}: {
  lang: 'en' | 'zh';
  email: string;
}) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    month: '',
    destinations: '',
    travelers: '',
    notes: '',
  });

  const subject = useMemo(
    () => (lang === 'zh' ? '网站咨询表单提交 - 无限旅途' : 'Website Inquiry - Infinite Travel'),
    [lang]
  );

  const body = useMemo(() => {
    const rows = lang === 'zh'
      ? [
          `姓名：${form.name || '未填写'}`,
          `联系方式：${form.contact || '未填写'}`,
          `出行时间：${form.month || '未填写'}`,
          `目的地偏好：${form.destinations || '未填写'}`,
          `出行人数 / 客群：${form.travelers || '未填写'}`,
          `需求说明：${form.notes || '未填写'}`,
        ]
      : [
          `Name: ${form.name || 'Not provided'}`,
          `Contact: ${form.contact || 'Not provided'}`,
          `Travel time: ${form.month || 'Not provided'}`,
          `Preferred destinations: ${form.destinations || 'Not provided'}`,
          `Travelers / profile: ${form.travelers || 'Not provided'}`,
          `Notes: ${form.notes || 'Not provided'}`,
        ];
    return rows.join('\n');
  }, [form, lang]);

  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const labels = lang === 'zh'
    ? {
        title: '快速询盘表单',
        subtitle: '填写后会直接打开你的邮箱客户端，并把内容带入邮件中发送。',
        name: '姓名',
        contact: '联系方式（邮箱 / 微信 / WhatsApp）',
        month: '出行时间',
        destinations: '目的地偏好',
        travelers: '人数 / 客群',
        notes: '需求说明',
        submit: '填写完成，生成咨询邮件',
      }
    : {
        title: 'Quick Inquiry Form',
        subtitle: 'When you submit, your mail app will open with the inquiry details prefilled and ready to send.',
        name: 'Name',
        contact: 'Contact method (email / WeChat / WhatsApp)',
        month: 'Travel time',
        destinations: 'Preferred destinations',
        travelers: 'Travelers / profile',
        notes: 'Notes',
        submit: 'Send Inquiry by Email',
      };

  return (
    <div className="rounded-[2rem] border border-[rgba(10,27,52,0.08)] bg-white p-8 shadow-[0_25px_70px_rgba(10,27,52,0.06)] md:p-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{labels.title}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{labels.subtitle}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.contact} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.month} value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none" placeholder={labels.destinations} value={form.destinations} onChange={(e) => setForm({ ...form, destinations: e.target.value })} />
        <input className="rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none md:col-span-2" placeholder={labels.travelers} value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} />
        <textarea className="min-h-36 rounded-2xl border border-[rgba(10,27,52,0.1)] px-4 py-3 outline-none md:col-span-2" placeholder={labels.notes} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>
      <a href={mailtoHref} className="mt-6 inline-flex min-w-[240px] items-center justify-center rounded-full bg-[var(--color-navy)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-navy-soft)]">
        {labels.submit}
      </a>
    </div>
  );
}
