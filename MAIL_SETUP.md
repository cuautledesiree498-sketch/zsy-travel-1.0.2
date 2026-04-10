# Mail Setup

## 已完成
- 已新增 `app/api/inquiry/route.ts`，用于接收网站询盘并调用阿里云 `SingleSendMail`
- 已将 `components/InquiryForm.tsx` 从 `mailto` 改为真实 POST 提交
- 已将 Contact 页面 CTA 改为跳转到表单

## 当前邮件配置
- `AccountName`: `contact@infinitravel.net`
- `ToAddress`: `1484818239@qq.com,1489235683@qq.com`
- Subject: `New Travel Inquiry from Infinite Travel Website`

## 需要补充的环境变量
在项目根目录创建 `.env.local`：

```env
ALIBABA_CLOUD_ACCESS_KEY_ID=你的AccessKeyID
ALIBABA_CLOUD_ACCESS_KEY_SECRET=你的AccessKeySecret
```

## 当前表单字段
- name
- email
- whatsapp
- destination
- travelDate
- groupSize
- budget
- hotelPreference
- message

## 当前逻辑
1. 用户提交网站询盘表单
2. 前端 POST 到 `/api/inquiry`
3. 服务端调用阿里云邮件推送 `SingleSendMail`
4. 邮件同时发到两个邮箱：
   - `1484818239@qq.com`
   - `1489235683@qq.com`

## 注意
- 不要把 `.env.local` 提交到 Git
- 当前是“内部通知邮件”链路，不会自动给客户回信
- 如果阿里云接口区域/版本要求变化，优先检查 `app/api/inquiry/route.ts` 中的 `RegionId` 与 `Version`
