"use client";

import { useRef } from "react";
import Image from "next/image";
import { usePortfolio } from "./PortfolioProvider";
import { experience, links, projects } from "@/lib/content";
import { useProfileIntro } from "@/hooks/useProfileIntro";
import { ShareButton } from "./ShareButton";

/** The pill that "hangs" from the header: card on desktop/tablet, black capsule on phones. */
function Availability() {
  const { t, tab, profileCollapsed } = usePortfolio();
  return (
    <div
      data-intro="pill"
      className={[
        "font-display text-white whitespace-nowrap flex items-center justify-center [direction:rtl] en:[direction:ltr]",
        // phones: fixed black capsule
        "fixed right-8 top-[10px] z-51 h-8 min-w-[100px] gap-[6px] rounded-[18px] bg-[#050505] dark:ring-1 dark:ring-white/15 px-3 text-[11px] shadow-[0_4px_14px_#0003]",
        "max-[361px]:right-5 max-[361px]:min-w-24 max-[361px]:px-[9px] max-[361px]:text-[10px]",
        "max-tab:en:right-auto max-tab:en:left-8 max-[361px]:en:left-5 max-[361px]:en:text-[10px]",
        profileCollapsed ? "max-tab:hidden" : "",
        // tablet: hangs from the header over the portrait column
        "tab:absolute tab:right-auto tab:left-[calc(20%_-_102px)] tab:top-10 tab:z-6 tab:h-[57px] tab:w-[204px] tab:min-w-0 tab:gap-[6px] tab:rounded-none tab:bg-transparent tab:px-0 tab:pb-[7px] tab:text-[13px] tab:shadow-none",
        "tab:bg-[url(/assets/icons/availability-ref.svg)] tab:bg-[length:204px_57px] tab:bg-[position:center_top] tab:bg-no-repeat",
        "en:tab:left-[calc(70%_-_102px)] en:tab:text-[11px]",
        tab !== "work" ? "tab:max-desk:hidden" : "",
        // desktop: centred over the profile column
        "desk:left-auto desk:right-1/2 desk:top-[-64px] desk:translate-x-1/2 en:desk:left-auto",
      ].join(" ")}
    >
      <span
        className="size-[6px] rounded-full bg-[#c5fc2e] shadow-[0_0_10px_4px_#c5fc2e7a] tab:size-[7px] wide:shadow-[0_0_7px_3px_#c5fc2e7a]"
        aria-hidden
      />
      <span>{t.available}</span>
    </div>
  );
}

function PortraitBox() {
  const { t, tab } = usePortfolio();
  return (
    <div
      data-intro="portrait"
      className={[
        "pointer-events-none relative z-0 flex flex-none items-end justify-center overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[url(/assets/profile-cover.png)] before:bg-[length:100%_100%] before:bg-[position:center_top] before:bg-no-repeat before:content-[''] dark:before:invert dark:before:opacity-80",
        // phones: rounded card with side margins
        "col-start-1 row-start-1 mx-8 mt-5 h-[190px] w-[calc(100%-64px)] rounded-t-[25px] border-0 bg-transparent max-[361px]:mx-5 max-[361px]:w-[calc(100%-40px)]",
        // tablet: left (or right in English) column
        "tab:col-start-1 tab:m-0 tab:h-auto tab:min-h-[318px] tab:w-auto tab:self-stretch tab:rounded-none tab:border-r tab:border-r-line tab:bg-surface",
        "en:tab:col-start-2 en:tab:border-r-0 en:tab:border-l en:tab:border-l-line",
        // desktop
        "desk:min-h-0 desk:h-[var(--portrait-h)] desk:self-auto desk:border-b desk:border-b-[#a5a8b1] dark:desk:border-b-line desk:border-r-0 en:desk:border-l-0",
        tab !== "work" ? "max-desk:hidden" : "",
      ].join(" ")}
    >
      <Image
        src="/assets/portrait-static.png"
        alt={t.portraitAlt}
        width={1000}
        height={1000}
        priority
        data-intro="portrait-img"
        className="relative z-1 h-[82%] max-h-[82%] w-auto max-w-[88%] select-none object-contain object-bottom"
      />
    </div>
  );
}

function Mark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      data-intro="mark"
      className={`pointer-events-none absolute z-2 text-[#c5c8cf] dark:text-[#3a3e46] border-current ${className}`}
    />
  );
}

function ContactArea() {
  const { t, tab } = usePortfolio();
  const work = tab === "work";
  return (
    <div
      data-intro="contact"
      className={[
        "relative border border-line [direction:ltr]",
        // phones
        "mx-8 mb-[calc(106px_+_env(safe-area-inset-bottom))] mt-0 block p-0 max-[361px]:mx-5",
        work ? "col-start-1 row-start-4" : "col-start-1 row-start-2",
        // tablet: two cells side by side below the portfolio
        "tab:mx-6 tab:mb-7 tab:mt-10 tab:grid tab:grid-cols-2 tab:self-start",
        work
          ? "tab:col-span-full tab:row-start-3"
          : "tab:col-span-1 tab:row-start-2",
        // desktop: pinned to the bottom of the profile column
        "desk:col-auto desk:row-auto desk:self-stretch desk:m-0 desk:mt-auto desk:block desk:pt-[25px] desk:[direction:inherit] wide:pt-0",
      ].join(" ")}
    >
      {/* tablet footer rule + junctions */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[49px] -right-[49px] top-[-40.5px] hidden h-px bg-line tab:max-desk:block"
      />
      <span
        aria-hidden
        className="plus-mark pointer-events-none absolute -left-6 top-[-40px] z-8 hidden -translate-x-1/2 -translate-y-1/2 tab:max-desk:block"
      />
      <span
        aria-hidden
        className="plus-mark pointer-events-none absolute -right-6 top-[-40px] z-8 hidden translate-x-1/2 -translate-y-1/2 tab:max-desk:block"
      />

      <Mark className="left-[-2px] top-[-2px] size-[15px] border-l-2 border-t-2 tab:size-[11px] desk:size-[15px]" />
      <Mark className="right-[-2px] top-[-2px] size-[15px] border-r-2 border-t-2 tab:size-[11px] desk:size-[15px]" />
      <Mark className="bottom-[-2px] left-[-2px] size-[15px] border-b-2 border-l-2 tab:size-[11px] desk:size-[15px]" />
      <Mark className="bottom-[-2px] right-[-2px] size-[15px] border-b-2 border-r-2 tab:size-[11px] desk:size-[15px]" />

      <a
        href={`mailto:${links.email}`}
        data-intro="email"
        className={[
          "flex min-h-[42px] items-center justify-between border-b border-b-line bg-[#f5f6f9a3] dark:bg-[#15171ba3] px-[17px] font-arial en:font-google text-[12px] [direction:rtl]",
          "en:[direction:ltr] en:flex-row-reverse",
          "tab:min-h-[52px] tab:border-b-0 tab:border-r tab:border-r-line tab:text-[14px]",
          "desk:min-h-[54px] desk:border-r-0 desk:border-b desk:text-[18px] wide:min-h-[41px] wide:text-[clamp(12px,.92vw,15px)]",
        ].join(" ")}
      >
        <img
          src="/assets/icons/mail-01.svg"
          alt=""
          width={18}
          height={18}
          className="opacity-70 dark:invert"
        />
        <span>{links.email}</span>
      </a>

      <div
        aria-label={t.socialsAria}
        className="relative grid h-[42px] grid-cols-5 [direction:ltr] tab:h-[52px] desk:h-[57px] wide:h-[43px]"
      >
        <span
          aria-hidden
          className="t-down-mark pointer-events-none absolute left-0 top-0 z-2 hidden -translate-x-1/2 -translate-y-1/2 [--mark:#c5c8cf] dark:[--mark:#3a3e46] tab:max-desk:block"
        />
        <span
          aria-hidden
          className="t-up-mark pointer-events-none absolute bottom-0 left-0 z-2 hidden -translate-x-1/2 translate-y-1/2 [--mark:#c5c8cf] dark:[--mark:#3a3e46] tab:max-desk:block"
        />
        {links.socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            data-intro="social"
            className="grid place-items-center border-r border-r-line last:border-r-0 hover:bg-[#e5e7ee] dark:hover:bg-hover"
          >
            <img
              src={social.icon}
              alt=""
              className="size-[18px] opacity-[.74] tab:size-[22px] desk:size-[18px] dark:invert"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export function ProfilePanel() {
  const { t, tab, summaryRef } = usePortfolio();
  const hideOutsideWork = tab !== "work" ? "max-desk:hidden" : "";
  const asideRef = useRef<HTMLElement>(null);
  useProfileIntro(asideRef);

  return (
    <aside
      ref={asideRef}
      aria-label={t.profileAria}
      className="contents desk:relative desk:col-start-1 desk:flex desk:min-h-0 desk:flex-col desk:border-l desk:border-l-line desk:bg-surface"
    >
      <Availability />
      <PortraitBox />

      <div className="contents desk:flex desk:min-h-0 desk:flex-1 desk:flex-col desk:px-[clamp(20px,2vw,31px)] desk:pb-8 desk:pt-5 no-scrollbar">
        <div
          ref={summaryRef}
          className={[
            "relative col-start-1 row-start-2 px-8 pb-0 pt-1 text-center [direction:rtl] en:[direction:ltr] max-[361px]:px-5",
            "tab:col-start-2 tab:row-start-1 tab:bg-surface tab:px-6 tab:pb-[18px] tab:pt-5 tab:text-right en:tab:col-start-1 en:tab:text-left",
            "desk:static desk:col-auto desk:row-auto desk:bg-transparent desk:p-0 desk:text-start desk:[direction:inherit]",
            hideOutsideWork,
          ].join(" ")}
        >
          {/* tablet corner marks */}
          <span
            aria-hidden
            className="t-up-mark pointer-events-none absolute bottom-0 left-0 z-8 hidden -translate-x-1/2 translate-y-1/2 tab:max-desk:block"
          />
          <span
            aria-hidden
            className="plus-mark pointer-events-none absolute bottom-0 right-0 z-8 hidden translate-x-1/2 translate-y-1/2 tab:max-desk:block"
          />

          <div>
            <h1 data-intro="name" className="m-0 font-display text-[26px] font-bold leading-[1.3] tab:text-[27px] desk:text-[clamp(25px,2vw,36px)] wide:text-[clamp(22px,1.65vw,27px)]">
              {t.name}
            </h1>
            <p data-intro="role" className="m-0 mt-[3px] pt-[5px] text-[15px] tab:pt-2 desk:text-[clamp(15px,1.18vw,20px)] wide:mt-0 wide:text-[clamp(13px,1vw,16px)]">
              {t.role}
            </p>
          </div>

          <p data-intro="lede" className="mb-5 mt-[22px] max-w-none text-[13px] leading-[1.55] tab:mb-[14px] tab:mt-[18px] tab:text-[14px] tab:leading-[1.5] desk:mt-[15px] desk:max-w-[430px] desk:text-[clamp(15px,1.12vw,19px)] desk:leading-[1.55] wide:text-[clamp(13px,.98vw,16px)] wide:leading-[1.48]">
            {t.lede}
          </p>

          <div
            aria-label={t.statsAria}
            className="grid grid-cols-3 gap-[5px] border-t border-t-white dark:border-t-line pb-[14px] pt-4 font-display [direction:rtl] en:[direction:ltr] tab:pb-[10px] tab:pt-3 desk:pb-[14px] desk:pt-[13px]"
          >
            {[
              { value: t.stats.yearsValue, label: t.stats.years, order: "" },
              {
                value: `+${projects.length}`,
                label: t.stats.projects,
                order: "en:order-3",
              },
              {
                value: `+${experience.length}`,
                label: t.stats.sectors,
                order: "en:order-2",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                data-intro="stat"
                className={`flex min-w-0 flex-col items-center gap-px whitespace-nowrap text-center tab:items-start tab:text-right en:tab:text-left ${stat.order}`}
              >
                <strong data-count className="font-stat text-[25px] font-bold leading-[1.1] text-[#b6b8bf] dark:text-[#6b707b] tab:text-[26px] desk:text-[clamp(25px,1.8vw,30px)]">
                  {stat.value}
                </strong>
                <span className="whitespace-normal text-[12px] leading-tight desk:text-[clamp(12px,.9vw,15px)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-[25px] mt-[15px] flex gap-2 font-display [direction:ltr] en:flex-row-reverse tab:mb-0 tab:mt-[10px] desk:mb-[18px] desk:mt-[15px]">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-intro="action"
              className={`${actionBase} border-[#171717] bg-[linear-gradient(#373737,#171717)] text-white shadow-[inset_0_1px_0_#fff7,0_2px_2px_#0003] dark:border-[#e2ff6a] dark:bg-[linear-gradient(#e2ff6a,#c6ef1f)] dark:text-[#171717] dark:shadow-[inset_0_1px_0_#fff9,0_4px_14px_#d6ff3526]`}
            >
              {t.message}
            </a>
            <a
              href={links.cv}
              data-intro="action"
              className={`${actionBase} border-[#d1d1d6] bg-[linear-gradient(#fff,#f5f5f8)] text-[#222] shadow-[0_2px_1px_#0002] dark:border-[#34373e] dark:bg-[linear-gradient(#25282e,#1b1d22)] dark:text-[#e6e7ea] dark:shadow-[0_2px_1px_#0006]`}
            >
              {t.cv}
              <img
                src="/assets/icons/download-02.svg"
                width={16}
                height={16}
                alt=""
                aria-hidden
                className="max-w-none dark:invert"
              />
            </a>
            <ShareButton intro="action" className="min-h-[42px] w-[42px] flex-none desk:min-h-[54px] desk:w-[54px] wide:min-h-[44px] wide:w-[44px]" />
          </div>
        </div>

        <ContactArea />
      </div>
    </aside>
  );
}

const actionBase =
  "flex flex-1 font-display min-h-[42px] items-center justify-center gap-[7px] whitespace-normal rounded-[5px] border px-2 py-[7px] text-center text-[11px] hover:brightness-[.94] " +
  "tab:whitespace-nowrap tab:px-3 tab:py-[9px] tab:text-[12px] " +
  "desk:min-h-[54px] desk:text-[clamp(12px,.84vw,14px)] wide:min-h-[44px]";
