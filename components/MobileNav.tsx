"use client";

import { usePortfolio } from "./PortfolioProvider";
import type { TabId } from "@/lib/content";

const ITEMS: { id: TabId; icon: string }[] = [
  { id: "about", icon: "user" },
  { id: "experience", icon: "briefcase" },
  { id: "work", icon: "work" },
];

/** Floating pill navigation, phones only. */
export function MobileNav() {
  const { t, tab, setTab } = usePortfolio();
  return (
    <nav
      aria-label={t.mobileNavAria}
      className="fixed inset-x-6 bottom-[max(20px,env(safe-area-inset-bottom))] z-60 grid h-[66px] grid-cols-3 rounded-full border border-[#d8d9dd] bg-[#eeeeef] p-[3px] shadow-[0_4px_18px_#0002] [direction:ltr] en:[direction:rtl] max-[361px]:inset-x-5 tab:hidden"
    >
      {ITEMS.map(({ id, icon }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            type="button"
            aria-selected={active}
            onClick={() => setTab(id)}
            className={`flex min-w-0 flex-col items-center justify-center gap-[2px] whitespace-nowrap rounded-full border-0 p-[3px] font-display text-[12px] font-bold text-ink ${active ? "bg-white" : "bg-transparent"}`}
          >
            <span aria-hidden className="relative block size-6">
              <img
                src={`/assets/icons/mobile-nav/${icon}-${active ? "filled" : "outline"}.svg`}
                alt=""
                className="absolute inset-0 size-6"
              />
            </span>
            <span>{t.tabs[id]}</span>
          </button>
        );
      })}
    </nav>
  );
}
