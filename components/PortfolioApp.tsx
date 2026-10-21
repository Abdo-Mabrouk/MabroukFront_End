"use client";

import { Header } from "./Header";
import { Junctions } from "./Junctions";
import { MobileNav } from "./MobileNav";
import { PortfolioProvider, usePortfolio } from "./PortfolioProvider";
import { ProfilePanel } from "./ProfilePanel";
import { ProjectModal } from "./ProjectModal";
import { SmoothFollower } from "./SmoothFollower";
import { WorkPanel } from "./WorkPanel";
import { AboutPanel, ExperiencePanel } from "./InfoPanels";

function MainPanel() {
  const { t, tab } = usePortfolio();
  const work = tab === "work";
  return (
    <section
      aria-label={t.mainPanelAria}
      className={[
        "relative min-w-0 overflow-visible [direction:rtl] en:[direction:ltr] en:text-left",
        work ? "col-start-1 row-start-3" : "col-start-1 row-start-1",
        work ? "tab:col-span-full tab:row-start-2" : "tab:col-span-1 tab:row-start-1",
        "tab:min-h-0 desk:col-start-2 desk:col-span-1 desk:row-auto desk:overflow-hidden desk:[direction:inherit]",
      ].join(" ")}
    >
      {/* tablet: the page rule and "+" mark above the portfolio */}
      {work && (
        <>
          <span aria-hidden className="pointer-events-none absolute -left-[25px] -right-[25px] top-[-0.5px] z-4 hidden h-px bg-line tab:max-desk:block" />
          <span aria-hidden className="plus-mark pointer-events-none absolute left-0 top-0 z-12 hidden -translate-x-1/2 -translate-y-1/2 tab:max-desk:block" />
        </>
      )}
      <WorkPanel />
      <ExperiencePanel />
      <AboutPanel />
    </section>
  );
}

function Shell() {
  const { tab } = usePortfolio();
  return (
    <>
      {/* desktop: full-bleed rule under the header */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-[var(--header-h)] z-7 hidden h-px bg-line desk:block" />

      <div className="relative mx-auto min-h-screen w-full tab:w-[calc(100%-48px)] tab:border-x tab:border-line desk:w-[calc(100%-var(--side-space)*2)] desk:max-w-[1440px] desk:[--portrait-h:clamp(166px,11.65vw,210px)]">
        <Junctions />
        {/* desktop: divider between profile and content */}
        <span aria-hidden className="pointer-events-none absolute bottom-0 right-[29%] top-0 z-8 hidden w-px bg-line desk:block en:desk:left-[29%] en:desk:right-auto" />
        <Header />
        <main
          data-active-tab={tab}
          className={[
            "grid h-auto min-h-0 grid-cols-[minmax(0,1fr)] pt-[52px] [direction:ltr]",
            "tab:pt-0",
            tab === "work" ? "tab:grid-cols-[40%_minmax(0,60%)]" : "tab:grid-cols-[minmax(0,1fr)]",
            "desk:relative desk:h-[calc(100vh_-_var(--header-h))] desk:min-h-[670px] desk:grid-cols-[minmax(0,29%)_minmax(0,1fr)] desk:overflow-visible desk:[direction:inherit]",
          ].join(" ")}
        >
          <ProfilePanel />
          <MainPanel />
        </main>
      </div>
      <MobileNav />
      <ProjectModal />
      <SmoothFollower />
    </>
  );
}

export function PortfolioApp() {
  return (
    <PortfolioProvider>
      <Shell />
    </PortfolioProvider>
  );
}
