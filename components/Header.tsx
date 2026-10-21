"use client";

import Image from "next/image";
import { usePortfolio } from "./PortfolioProvider";
import type { TabId } from "@/lib/content";

const TAB_ORDER: TabId[] = ["about", "experience", "work"];

export function Header() {
  const { t, tab, setTab, toggleLanguage, profileCollapsed } = usePortfolio();

  return (
    <header
      className={[
        // phones: fixed bar with the dotted background
        "bg-dots fixed inset-x-0 top-0 z-50 flex h-[52px] min-h-[52px] items-stretch justify-start border-b border-line [direction:ltr]",
        // tablet: sticky bar, solid background, the rule is drawn by ::after so it can bleed past the shell
        "tab:sticky tab:inset-x-auto tab:z-30 tab:items-center tab:justify-between tab:border-b-0 tab:[background:var(--color-surface)] en:tab:flex-row-reverse",
        "tab:after:pointer-events-none tab:after:absolute tab:after:-bottom-px tab:after:-left-[25px] tab:after:-right-[25px] tab:after:h-px tab:after:bg-line tab:after:content-['']",
        // desktop: three-column grid, transparent
        "desk:relative desk:z-5 desk:grid desk:grid-cols-[1fr_auto_1fr] desk:items-stretch desk:border-b desk:[background:transparent] desk:after:hidden",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-full flex-none items-stretch justify-start [direction:ltr]",
          "pl-8 max-[361px]:pl-5 max-tab:en:pl-0 max-tab:en:pr-8 max-[361px]:en:pr-5",
          "tab:p-0 desk:h-auto desk:en:col-start-3 desk:en:justify-end",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={t.languageAria}
          className={[
            "font-georgia font-bold text-ink en:font-display hover:bg-[#e9eaf0]",
            // phones: borderless "En" / "ع"
            "min-w-12 border-0 bg-transparent p-0 text-[20px]",
            // tablet
            "tab:min-w-[95px] tab:px-[6px] tab:py-px tab:border-r tab:border-r-line tab:bg-surface tab:text-[15px] tab:hover:bg-[#e9eaf0]",
            // desktop
            "desk:min-w-[100px] desk:text-[13px] desk:en:border-r-0 desk:en:border-l desk:en:border-l-line",
          ].join(" ")}
        >
          <span className="max-tab:hidden">{t.languageButton}</span>
          <span className="tab:hidden">{t.languageButtonShort}</span>
        </button>
      </div>

      <nav
        aria-label={t.mainNavAria}
        className={[
          "hidden items-center justify-center gap-[7px] [direction:ltr] en:flex-row-reverse",
          "tab:flex tab:h-full tab:justify-end tab:gap-[6px] tab:px-3 en:tab:justify-start",
          "desk:absolute desk:top-1/2 desk:h-auto desk:-translate-y-1/2 desk:justify-center desk:gap-[7px] desk:p-0",
          "desk:right-[calc(29%_+_clamp(22px,2vw,30px))] en:desk:right-auto en:desk:left-[calc(29%_+_clamp(22px,2vw,30px))] en:desk:justify-center",
        ].join(" ")}
      >
        {TAB_ORDER.map((id) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              aria-selected={active}
              onClick={() => setTab(id)}
              className={[
                "whitespace-nowrap rounded-[6px] border font-display font-bold",
                "h-[34px] px-[10px] text-[13px] tab:min-w-[66px]",
                id === "work" ? "tab:min-w-[120px]" : "",
                "desk:h-8 desk:px-[13px] desk:text-[12px] desk:min-w-[82px]",
                id === "work" ? "desk:min-w-[144px]" : "",
                active
                  ? "border-[#2b2b2b] bg-[linear-gradient(#353535,#171717)] text-white shadow-[inset_0_1px_2px_#ffffff45,0_2px_4px_#0003]"
                  : "border-[#d0d1d5] bg-[linear-gradient(#f5f5f7,#e9e9ee)] text-[#222] shadow-[0_1px_2px_#0001] hover:border-[#92959c]",
              ].join(" ")}
            >
              {t.tabs[id]}
            </button>
          );
        })}
      </nav>

      {/* Compact profile: phones only, once the profile card has scrolled away */}
      <div
        aria-hidden
        className={[
          "absolute right-6 top-1 h-[43px] items-center gap-2 [direction:ltr] max-[361px]:right-5",
          "en:right-auto en:left-6 max-[361px]:en:left-5 en:flex-row-reverse en:gap-[6px]",
          profileCollapsed ? "flex" : "hidden",
          "tab:hidden",
        ].join(" ")}
      >
        <span className="whitespace-nowrap font-display text-[20px] font-bold [direction:rtl] en:text-[16px] en:leading-[1.1] en:[direction:ltr] max-[361px]:en:text-[15px]">
          {t.name}
        </span>
        <Image src="/assets/portrait-static.png" alt="" width={39} height={39} loading="eager" className="size-[39px] object-contain" />
      </div>
    </header>
  );
}
