// sanity/env.ts
// 临时方案：直接使用字面量值，避免 Vercel 环境变量读取失败的问题
export const apiVersion = '2026-04-03';
export const dataset = 'production';
export const projectId = 'j7fa6cf0';

// 如果以后需要动态读取，再改回 process.env
// export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-03';
// export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
// export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j7fa6cf0';

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}