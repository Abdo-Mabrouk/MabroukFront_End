"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "./PortfolioProvider";
import { OG_CARD, SITE_URL } from "@/lib/site";

/**
 * Square "share" button for the profile actions. Opens a dialog previewing the link card
 * (app/opengraph-image.tsx, with the QR code) and offers native share, copy link and download.
 */
export function ShareButton({ className = "", intro }: { className?: string; intro?: string }) {
  const { isEnglish, t } = usePortfolio();
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Same image the link preview uses, so what you see here is exactly what people receive.
  const cardUrl = OG_CARD.url;
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const label = isEnglish ? "Share portfolio" : "مشاركة معرض الأعمال";

  useEffect(() => {
    setCanShare(typeof navigator.share === "function");
  }, []);

  const shareData = {
    title: `${t.name} — ${t.role}`,
    text: isEnglish ? `Check out ${t.name}'s portfolio` : `تصفّح معرض أعمال ${t.name}`,
    url: SITE_URL,
  };

  const nativeShare = async () => {
    try {
      await navigator.share(shareData);
    } catch {
      /* cancelled by the user */
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  const downloadCard = async () => {
    if (!cardUrl) return;
    try {
      const blob = await (await fetch(cardUrl)).blob();
      const href = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), { href, download: "abdelrhman-mabrouk-card.png" });
      a.click();
      URL.revokeObjectURL(href);
    } catch {
      window.open(cardUrl, "_blank", "noopener");
    }
  };

  const actionClass =
    "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[8px] border px-3 text-[13px] font-bold transition hover:brightness-95";

  return (
    <>
      <button
        type="button"
        aria-label={label}
        title={label}
        aria-haspopup="dialog"
        data-intro={intro}
        onClick={() => dialogRef.current?.showModal()}
        className={`grid place-items-center rounded-[5px] border border-[#d1d1d6] bg-[linear-gradient(#fff,#f5f5f8)] text-[#222] shadow-[0_2px_1px_#0002] hover:brightness-[.94] dark:border-[#34373e] dark:bg-[linear-gradient(#25282e,#1b1d22)] dark:text-[#e6e7ea] dark:shadow-[0_2px_1px_#0006] ${className}`}
      >
        <ShareIcon />
      </button>

      <dialog
        ref={dialogRef}
        dir={isEnglish ? "ltr" : "rtl"}
        aria-label={label}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[min(560px,calc(100vw-32px))] max-w-none rounded-[22px] border border-line bg-surface p-0 text-ink shadow-[0_24px_80px_#0006] backdrop:bg-[#070a16]/50 backdrop:backdrop-blur-md"
      >
        <div className="flex flex-col gap-4 p-4 tab:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="m-0 font-display text-[18px] font-bold">{label}</h2>
            <button
              type="button"
              aria-label={t.closeProject}
              onClick={() => dialogRef.current?.close()}
              className="grid size-9 place-items-center rounded-full text-[24px] leading-none hover:bg-hover"
            >
              ×
            </button>
          </div>

          {cardUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cardUrl}
              alt={`${t.name} — ${t.role}`}
              width={1200}
              height={630}
              className="h-auto w-full rounded-[14px] border border-line"
            />
          )}

          <p className="m-0 text-[13px] leading-[1.6] text-subtle">
            {isEnglish
              ? "This card appears when the link is shared. Scanning the QR code opens the portfolio directly."
              : "تظهر هذه البطاقة عند مشاركة الرابط، ومسح رمز QR يفتح معرض الأعمال مباشرةً."}
          </p>

          <div className="flex flex-wrap gap-2">
            {canShare && (
              <button
                type="button"
                onClick={nativeShare}
                className={`${actionClass} border-[#c6ef1f] bg-accent text-[#171717]`}
              >
                <ShareIcon />
                {isEnglish ? "Share" : "مشاركة"}
              </button>
            )}
            <button type="button" onClick={copyLink} className={`${actionClass} border-line bg-card`}>
              {copied ? (isEnglish ? "Link copied ✓" : "تم نسخ الرابط ✓") : isEnglish ? "Copy link" : "نسخ الرابط"}
            </button>
            <button type="button" onClick={downloadCard} className={`${actionClass} border-line bg-card`}>
              {isEnglish ? "Download card" : "تحميل البطاقة"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}
