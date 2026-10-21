"use client";

import { usePortfolio } from "./PortfolioProvider";
import { RichText } from "./RichText";
import { aboutSections, experience, skills, software } from "@/lib/content";

const panelShell = "bg-dots-info h-auto desk:h-full";
const scrollShell = "no-scrollbar h-auto overflow-visible desk:h-full desk:overflow-y-auto desk:overscroll-contain";
const innerShell =
  "mx-auto w-[calc(100%-56px)] pb-[100px] pt-[45px] text-right max-[361px]:w-[calc(100%-48px)] en:text-left tab:w-[min(900px,calc(100%-72px))] tab:pb-[35px] desk:pb-[100px]";
const heading = "font-display font-bold leading-[1.2] text-[clamp(22px,1.8vw,27px)] mt-0";
const skillChip =
  "rounded-[5px] border border-[#cdd0d7] bg-white font-arial [direction:ltr]";

export function ExperiencePanel() {
  const { lang, isEnglish, t, tab } = usePortfolio();

  return (
    <div id="experiencePanel" role="tabpanel" hidden={tab !== "experience"} className={panelShell}>
      <div className={scrollShell}>
        <div dir={isEnglish ? "ltr" : "rtl"} className={innerShell}>
          <h2 className={`${heading} mb-4`}>{t.experienceTitle}</h2>

          <div className="border-t border-t-[#cfd3dc]">
            {experience.map((item) => (
              <article
                key={item.id}
                className={[
                  "grid items-start border-b border-b-[#cfd3dc] py-5 text-right en:text-left",
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
                  <p className="col-start-1 row-start-2 mb-[9px] mt-0 text-[12px] leading-[1.8] text-[#737984] max-tab:en:col-start-2 tab:col-auto tab:row-auto text-right en:text-left en:[direction:ltr]">
                    <bdi>{item.company}</bdi>
                  </p>
                  <ul className="col-span-full row-start-3 m-0 mt-[9px] list-disc ps-[1.25em] text-[12px] leading-[1.6] text-[#4f5560] text-right en:text-left tab:col-auto tab:row-auto tab:mt-0">
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
                className={`${skillChip} grid size-[58px] origin-center place-items-center rounded-[10px] p-[9px] transition-[translate,rotate,box-shadow] duration-[240ms] ease-[ease] hover:-translate-y-1 hover:-rotate-5 hover:shadow-[0_8px_18px_#20242a1a] even:hover:rotate-5`}
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

  return (
    <div id="aboutPanel" role="tabpanel" hidden={tab !== "about"} className={panelShell}>
      <div className={scrollShell}>
        <article dir={isEnglish ? "ltr" : "rtl"} className={innerShell}>
          <h2 className={`${heading} mb-3`}>{t.aboutTitle}</h2>
          <p className="mb-[22px] mt-0 max-w-none text-[14px] leading-[1.6]">{t.aboutIntro}</p>
          {aboutSections.map((section) => (
            <section key={section.id} className="border-t border-t-[#cfd3dc] py-[18px] text-right en:text-left en:[direction:ltr]">
              <h3 className="mb-[7px] mt-0 text-[16px] font-bold leading-[1.4]">
                <RichText text={section.title[lang]} />
              </h3>
              <p className="m-0 max-w-[760px] text-[12px] leading-[1.7] text-[#4f5560]">
                <RichText text={section.body[lang]} />
              </p>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
