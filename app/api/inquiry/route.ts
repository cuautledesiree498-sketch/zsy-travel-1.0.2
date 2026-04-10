import { NextResponse } from 'next/server';

const REQUIRED_ENV_VARS = [
  'ALIBABA_CLOUD_ACCESS_KEY_ID',
  'ALIBABA_CLOUD_ACCESS_KEY_SECRET',
] as const;

const API_VERSION = '2021-10-01';
const ENDPOINT = 'https://dm.aliyuncs.com/';
const ACCOUNT_NAME = 'contact@infinitravel.net';
const TO_ADDRESS = '1484818239@qq.com,1489235683@qq.com';

type InquiryPayload = {
  name?: string;
  email?: string;
  whatsapp?: string;
  destination?: string;
  travelDate?: string;
  groupSize?: string;
  budget?: string;
  hotelPreference?: string;
  message?: string;
  lang?: 'en' | 'zh';
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function requiredEnvMissing() {
  return REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
}

function buildHtmlBody(payload: Required<Omit<InquiryPayload, 'lang'>>) {
  const rows = [
    ['Name', payload.name],
    ['Email', payload.email],
    ['WhatsApp', payload.whatsapp],
    ['Destination', payload.destination],
    ['Travel Date', payload.travelDate],
    ['Group Size', payload.groupSize],
    ['Budget', payload.budget],
    ['Hotel Preference', payload.hotelPreference],
    ['Message', payload.message],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border:1px solid #d9e2f1;background:#f8fbff;font-weight:600;color:#10233d;width:180px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border:1px solid #d9e2f1;color:#24364d;white-space:pre-wrap;word-break:break-word;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f8fc;padding:24px;color:#10233d;">
      <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #d9e2f1;border-radius:18px;overflow:hidden;">
        <div style="padding:24px 28px;background:#10233d;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.76;">Infinite Travel</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.25;">New Travel Inquiry</h1>
        </div>
        <div style="padding:24px 28px;">
          <p style="margin:0 0 18px;font-size:15px;line-height:1.8;color:#4d6078;">
            A new inquiry has been submitted through the Infinite Travel website.
          </p>
          <table style="width:100%;border-collapse:collapse;border-spacing:0;">
            ${tableRows}
          </table>
        </div>
      </div>
    </div>`;
}

function fillPayload(payload: InquiryPayload) {
  return {
    name: (payload.name || '').trim(),
    email: (payload.email || '').trim(),
    whatsapp: (payload.whatsapp || '').trim(),
    destination: (payload.destination || '').trim(),
    travelDate: (payload.travelDate || '').trim(),
    groupSize: (payload.groupSize || '').trim(),
    budget: (payload.budget || '').trim(),
    hotelPreference: (payload.hotelPreference || '').trim(),
    message: (payload.message || '').trim(),
  };
}

async function sha1(message: string) {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacSha1Base64(key: string, message: string) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(key),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(message));
  return Buffer.from(signature).toString('base64');
}

function percentEncode(value: string) {
  return encodeURIComponent(value)
    .replace(/\+/g, '%20')
    .replace(/\*/g, '%2A')
    .replace(/%7E/g, '~');
}

function canonicalize(params: Record<string, string>) {
  return Object.keys(params)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join('&');
}

async function buildSignedUrl(params: Record<string, string>) {
  const canonicalizedQueryString = canonicalize(params);
  const stringToSign = `POST&${percentEncode('/')}&${percentEncode(canonicalizedQueryString)}`;
  const signature = await hmacSha1Base64(`${process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET!}&`, stringToSign);
  return `${ENDPOINT}?Signature=${percentEncode(signature)}&${canonicalizedQueryString}`;
}

export async function POST(request: Request) {
  const missing = requiredEnvMissing();
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing server env vars: ${missing.join(', ')}` },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as InquiryPayload;
  const filled = fillPayload(payload);

  if (!filled.name || !filled.email || !filled.destination || !filled.message) {
    return NextResponse.json(
      { ok: false, error: 'Missing required inquiry fields.' },
      { status: 400 }
    );
  }

  const htmlBody = buildHtmlBody(filled);
  const nonce = await sha1(`${Date.now()}-${Math.random()}`);
  const params: Record<string, string> = {
    Action: 'SingleSendMail',
    Format: 'JSON',
    Version: API_VERSION,
    AccessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID!,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: new Date().toISOString(),
    SignatureVersion: '1.0',
    SignatureNonce: nonce,
    RegionId: 'cn-hangzhou',
    AccountName: ACCOUNT_NAME,
    AddressType: '1',
    ReplyToAddress: 'true',
    ToAddress: TO_ADDRESS,
    Subject: 'New Travel Inquiry from Infinite Travel Website',
    HtmlBody: htmlBody,
  };

  const url = await buildSignedUrl(params);
  const response = await fetch(url, { method: 'POST' });
  const text = await response.text();

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, error: 'Aliyun DirectMail request failed.', details: text },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, details: text });
}
