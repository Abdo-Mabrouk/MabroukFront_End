# Mabroukui Portfolio — Next.js + TypeScript + Tailwind

نسخة Next.js (App Router) من موقع البورتفوليو، متطابقة بصرياً مع النسخة الأصلية (Vanilla JS) في كل المقاسات وباللغتين العربية والإنجليزية.

## التشغيل

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # تصدير ثابت في مجلد out/ (نفس طريقة نشر النسخة القديمة)
npm run typecheck
```

> `next.config.ts` مضبوط على `output: "export"` + `images.unoptimized` عشان الموقع يفضل Static (GitHub Pages / أي استضافة عادية، ومعاه `CNAME`).
> لو هتنشر على Vercel أو سيرفر Node شيل السطرين دول وهتاخد تحسين الصور تلقائياً.

## الهيكل

```
app/
  layout.tsx          الخطوط (next/font)، الـ metadata/OG، سكريبت اللغة قبل أول رسم
  page.tsx
  globals.css         Tailwind v4 + design tokens + breakpoints + variant en:
  fonts/              Ping / Thmanyah / Google Sans
components/
  PortfolioProvider   حالة اللغة والتاب والمشروع المفتوح وهيدر الموبايل (Context)
  PortfolioApp        تركيب الصفحة (Shell + MainPanel)
  Header, ProfilePanel, WorkPanel, InfoPanels (Experience / About)
  ProjectModal        <dialog> + الزوم والسحب (hooks/useZoomPan)
  SmoothFollower      مؤشر الماوس
  MobileNav, Junctions, RichText
hooks/useZoomPan.ts
lib/content.ts        كل المحتوى (مشاريع، خبرات، عني، نصوص الواجهة) بأنواع TypeScript
public/assets/        الصور والأيقونات (تمت إعادة تسمية أيقونات السوشيال)
```

## تعديل المحتوى

كل النصوص في `lib/content.ts` بصيغة `{ ar, en }`. في النصوص الغنية:

- `**نص**` ← `<strong>`
- `{{Figma}}` ← `<bdi>` (عزل الكلمات اللاتينية داخل الجمل العربية)

## Tailwind

- Breakpoints مخصصة: `tab` (551px) و `tabw` (601px) و `desk` (1024px) و `wide` (1100px) — بنفس نقاط الكسر في الـ CSS الأصلي، والتصميم mobile-first.
- `en:` variant بيشتغل لما `<html>` يكون عليه `.english`. ملاحظة: أي utility عليها `en:` بتغلب الـ utilities العادية حتى لو من breakpoint تاني، فحدد الـ breakpoint معاها (مثال `en:tab:` / `en:desk:`).
- علامات الـ "+" و "T" عبارة عن utilities في `globals.css`: `plus-mark`, `t-up-mark`, `t-down-mark`.

## ملاحظات

- مجلد `frames/` وملفات `portrait-base.png` و `Ahmed-source.jpeg` وأيقونات الوضع الليلي/النهاري كانت غير مستخدمة في الموقع فلم يتم نقلها.
- `compact-profile.png` حجمها كبير (~1.3MB) وبتتعرض 39px، يُفضّل تصغيرها.
