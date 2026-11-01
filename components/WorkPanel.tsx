"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "./PortfolioProvider";
import { projects } from "@/lib/content";
import { ScrollRuler } from "./ScrollRuler";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ index }: { index: number }) {
  const { lang, t, openProject } = usePortfolio();
  const project = projects[index];
  const title = project.title[lang];

  return (
    <figure className="project-card group relative m-0 w-full overflow-hidden rounded-[22px] border-2 border-white bg-[#e3ebf4] shadow-[0_1px_1px_#b8bfcd45] dark:border-[#25282e] dark:bg-card dark:shadow-[0_1px_2px_#0008] tab:rounded-[30px] desk:rounded-[42px] wide:rounded-[34px]">
      <Image
        src={`/assets/projects/${project.file}`}
        alt={title}
        width={1200}
        height={900}
        priority={index < 2}
        className="project-card-image h-auto w-full will-change-transform"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,#0007)] px-[27px] pb-[22px] pt-[65px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 en:text-left en:[direction:ltr]">
        <strong className="block text-[20px]">{title}</strong>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="pointer-events-auto relative z-10 mt-3 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
          >
            {lang === "en" ? "View Live Project" : "عرض المشروع"}
            <span aria-hidden="true">{">"}</span>
          </a>
        )}
      </figcaption>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={t.viewProject(title)}
        onClick={() => openProject(index)}
        className="absolute inset-0 z-2 size-full cursor-zoom-in rounded-[inherit] border-0 bg-transparent p-0 focus-visible:-outline-offset-[6px]"
      />
    </figure>
  );
}

const fadeBase =
  "pointer-events-none z-5 w-full backdrop-blur-[24px] sticky " +
  "desk:absolute desk:inset-x-0 desk:z-2 desk:bg-none";

export function WorkPanel() {
  const { t, tab } = usePortfolio();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isActive = tab === "work";

  // Scroll-linked reveal for the project cards. On desktop the list scrolls inside
  // #workScroll; below that the whole page scrolls, so the scroller switches with the breakpoint.
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || !isActive) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 1024px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; reduceMotion: boolean };
        if (reduceMotion) return;

        const cards = gsap.utils.toArray<HTMLElement>(".project-card", scroller);
        cards.forEach((card) => {
          const image = card.querySelector<HTMLElement>(".project-card-image");
          const trigger = { trigger: card, scroller: desktop ? scroller : undefined };

          // Card rises, un-tilts and fades in as it enters the view.
          gsap.fromTo(
            card,
            { opacity: 0.2, y: 90, scale: 0.9, rotationX: 12, transformPerspective: 1200, transformOrigin: "50% 100%" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              ease: "power2.out",
              scrollTrigger: { ...trigger, start: "top bottom", end: "top 65%", scrub: 0.6 },
            },
          );

          // Gentle parallax zoom on the screenshot while the card crosses the view.
          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.15, yPercent: -4 },
              {
                scale: 1,
                yPercent: 4,
                ease: "none",
                scrollTrigger: { ...trigger, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          }
        });
      },
    );

    // Panel was hidden before this tab opened, so measure again once it is laid out.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(frame);
      mm.revert();
    };
  }, [isActive]);

  return (
    <div
      id="workPanel"
      role="tabpanel"
      hidden={!isActive}
      className="relative h-auto overflow-visible desk:h-full desk:overflow-hidden"
    >
      {/* soft blurred edges (sticky on tablet/phone, pinned on desktop) */}
      <div
        aria-hidden
        className={`${fadeBase} top-[52px] mb-[-70px] h-[70px] bg-[linear-gradient(var(--color-surface),transparent)] [mask-image:linear-gradient(#000_0%,transparent_100%)] tab:mb-[-80px] tab:h-[80px] desk:top-0 desk:mb-0 desk:h-[110px]`}
      />
      <div
        ref={scrollRef}
        id="workScroll"
        tabIndex={0}
        aria-label={t.workScrollAria}
        className="focus-ring no-scrollbar h-auto overflow-visible desk:h-full desk:overflow-y-auto desk:overscroll-contain"
      >
        <div className="grid gap-[18px] px-6 pb-[25px] pt-0 max-[361px]:px-4 tab:gap-6 tab:p-6 tab:pb-7 desk:gap-8 desk:px-[clamp(20px,2.2vw,36px)] desk:pb-[115px] desk:pt-[110px] desk:pe-[62px] wide:gap-[26px] wide:px-[clamp(22px,2vw,30px)] wide:pe-[62px]">
          {projects.map((_, index) => (
            <ProjectCard key={index} index={index} />
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className={`${fadeBase} bottom-0 mt-[-105px] h-[105px] bg-[linear-gradient(transparent,var(--color-surface))] [mask-image:linear-gradient(transparent,#000_100%)] tab:mt-[-80px] tab:h-[80px] desk:bottom-0 desk:mt-0 desk:h-[110px]`}
      />
      {/* ruler scrollbar — desktop only, where the list scrolls inside this panel */}
      <ScrollRuler
        scrollRef={scrollRef}
        controls="workScroll"
        className="absolute end-3.5 top-1/2 z-6 hidden -translate-y-1/2 desk:block"
      />
    </div>
  );
}
