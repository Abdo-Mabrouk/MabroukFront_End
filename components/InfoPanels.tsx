"use client";

import { usePortfolio } from "./PortfolioProvider";
import { useRef } from "react";
import { RichText } from "./RichText";
import { FlyChars, FlyWords } from "./FlyText";
import { useAboutFlyIn } from "@/hooks/useAboutFlyIn";
import { aboutSections, experience, skills, software } from "@/lib/content";

const panelShell = "bg-dots-info h-auto desk:h-full";
const scrollShell = "no-scrollbar h-auto overflow-visible desk:h-full desk:overflow-y-auto desk:overscroll-contain";
const innerShell =
  "mx-auto w-[calc(100%-56px)] pb-[100px] pt-[45px] text-right max-[361px]:w-[calc(100%-48px)] en:text-left tab:w-[min(900px,calc(100%-72px))] tab:pb-[35px] desk:pb-[100px]";
const heading = "font-display font-bold leading-[1.2] text-[clamp(22px,1.8vw,27px)] mt-0";
const skillChip =
  "rounded-[5px] border border-[#cdd0d7] bg-white dark:border-[#2f3239] dark:bg-card font-arial [direction:ltr]";

export function ExperiencePanel() {
  const { lang, isEnglish, t, tab } = usePortfolio();

  return (
    <div id="experiencePanel" role="tabpanel" hidden={tab !== "experience"} className={panelShell}>
      <div className={scrollShell}>
        <div dir={isEnglish ? "ltr" : "rtl"} className={innerShell}>
          <h2 className={`${heading} mb-4`}>{t.experienceTitle}</h2>

          <div className="border-t border-t-[#cfd3dc] dark:border-t-line">
            {experience.map((item) => (
              <article
                key={item.id}
                className={[
                  "grid items-start border-b border-b-[#cfd3dc] dark:border-b-line py-5 text-right en:text-left",
                  "grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-3 gap-y-0",
                  "tab:grid-cols-1 tab:gap-[10px]",
                  "tabw:grid-cols-[150px_minmax(0,1fr)] tabw:gap-6",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex flex-col gap-[2px] font-meta text-[13px] leading-[1.35] text-ink",
                    "col-start-2 row-[1/span_2] items-start text-left [direction:ltr]",
                    "max-tab:en:col-start-1",
                    "tab:col-auto tab:row-auto tab:items-stretch tab:text-right tab:[direction:rtl] en:tab:text-left en:tab:[direction:ltr]",
                  ].join(" ")}
                >
                  <time className="block w-full self-stretch whitespace-nowrap text-left [direction:rtl] [unicode-bidi:normal] max-tab:en:self-start max-tab:en:[direction:ltr] tab:text-right en:[unicode-bidi:isolate] en:tab:text-left en:tab:[direction:ltr]">
                    <RichText text={item.period[lang]} />
                  </time>
                  <span className="self-start text-left [direction:rtl] max-tab:en:[direction:ltr] tab:self-auto tab:text-inherit">
                    {item.country[lang]}
                  </span>
                </div>

                <div className="contents min-w-0 tab:block">
                  <h3 className="col-start-1 row-start-1 mb-[3px] font-display text-[16px] font-bold max-tab:en:col-start-2 tab:col-auto tab:row-auto text-right en:text-left en:[direction:ltr]">
                    <bdi>{item.role}</bdi>
                  </h3>
                  <p className="col-start-1 row-start-2 mb-[9px] mt-0 text-[12px] leading-[1.8] text-subtle max-tab:en:col-start-2 tab:col-auto tab:row-auto text-right en:text-left en:[direction:ltr]">
                    <bdi>{item.company}</bdi>
                  </p>
                  <ul className="col-span-full row-start-3 m-0 mt-[9px] list-disc ps-[1.25em] text-[12px] leading-[1.6] text-soft text-right en:text-left tab:col-auto tab:row-auto tab:mt-0">
                    {item.points[lang].map((point, i) => (
                      <li key={i} className="mb-[6px]">
                        <RichText text={point} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <h3 className="mb-3 mt-7 text-[17px] font-bold">{t.skillsTitle}</h3>
          <div className="flex flex-wrap justify-start gap-[10px] [direction:rtl] en:[direction:ltr]">
            {skills.map((skill) => (
              <span key={skill} className={`${skillChip} px-[11px] py-[7px] text-[11px]`}>
                {skill}
              </span>
            ))}
          </div>

          <h3 className="mb-3 mt-[30px] text-[17px] font-bold">{t.toolsTitle}</h3>
          <div aria-label={t.toolsAria} className="flex flex-wrap justify-start gap-[10px] [direction:rtl] en:[direction:ltr]">
            {software.map((tool) => (
              <span
                key={tool.name}
                title={tool.name}
                className={`${skillChip} grid size-[58px] origin-center place-items-center rounded-[10px] p-[9px] transition-[translate,rotate,box-shadow] duration-[240ms] ease-[ease] hover:-translate-y-1 hover:-rotate-5 hover:shadow-[0_8px_18px_#20242a1a] dark:hover:shadow-[0_8px_18px_#0009] even:hover:rotate-5`}
              >
                <img src={tool.icon} alt={tool.name} className="block size-9 object-contain" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPanel() {
  const { lang, isEnglish, t, tab } = usePortfolio();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isActive = tab === "about";
  useAboutFlyIn(scrollRef, isActive, lang);

  // Two sections per screen so every screen has room to scroll through.
  const screens: (typeof aboutSections)[] = [];
  for (let i = 0; i < aboutSections.length; i += 2) screens.push(aboutSections.slice(i, i + 2));

  return (
    <div id="aboutPanel" role="tabpanel" hidden={!isActive} className={panelShell}>
      <div ref={scrollRef} className={scrollShell}>
        <article dir={isEnglish ? "ltr" : "rtl"} className="mx-auto w-[calc(100%-56px)] pb-[130px] text-right max-[361px]:w-[calc(100%-48px)] en:text-left tab:w-[min(900px,calc(100%-72px))] tab:pb-16 desk:pb-20">
          {/* Screen 1: title + intro */}
          <div data-about-hero className={`${heroShell} relative`}>
            <h2 className="m-0 font-display text-[clamp(44px,9vw,96px)] font-bold leading-[1.15]">
              <FlyChars text={t.aboutTitle} />
            </h2>
            <p className="m-0 mt-5 max-w-[620px] text-[clamp(17px,2vw,24px)] leading-[1.6] text-soft">
              <FlyWords text={t.aboutIntro} />
            </p>
            <div data-scroll-hint aria-hidden className="absolute inset-x-0 bottom-[110px] flex flex-col items-center gap-2 text-[12px] text-subtle desk:bottom-10">
              <span>{isEnglish ? "Scroll" : "اسحب لأسفل"}</span>
              <span className="relative h-9 w-[22px] rounded-full border-2 border-current">
                <span className="absolute left-1/2 top-[6px] size-1.5 -translate-x-1/2 animate-bounce rounded-full bg-current" />
              </span>
            </div>
          </div>

          {screens.map((group, index) => (
            <div key={group[0].id} className="flex flex-col gap-[clamp(36px,6vh,56px)] py-[clamp(28px,6vh,56px)]">
              {group.map((section, i) => (
                <section key={section.id} data-about-section className="relative pt-6 text-right en:text-left en:[direction:ltr]">
                  <span data-about-line aria-hidden className="absolute inset-x-0 top-0 h-px bg-[#cfd3dc] dark:bg-line" />
                  <span className="mb-3 block font-stat text-[13px] text-subtle">
                    {String(index * 2 + i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 mb-4 font-display text-[clamp(28px,4vw,46px)] font-bold leading-[1.25]">
                    <FlyChars text={section.title[lang].replace(/\*\*|\{\{|\}\}/g, "")} />
                  </h3>
                  <p className="m-0 max-w-[760px] text-[clamp(14px,1.25vw,17px)] leading-[1.85] text-soft">
                    <FlyWords text={section.body[lang]} />
                  </p>
                </section>
              ))}
            </div>
          ))}
        </article>
      </div>
    </div>
  );
}

// Only the opening title gets a full screen; the sections follow at a normal reading rhythm.
const heroShell =
  "flex flex-col justify-center py-[60px] min-h-[calc(100svh-52px)] " +
  "desk:min-h-[max(calc(100vh-var(--header-h)),670px)]";
