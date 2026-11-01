import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Random starting point for each letter: somewhere around it, spun and scaled (evaluated per letter). */
const scatter = {
  x: () => gsap.utils.random(-320, 320),
  y: () => gsap.utils.random(-240, 240),
  rotation: () => gsap.utils.random(-220, 220),
  scale: () => gsap.utils.random(0, 2.4),
  autoAlpha: 0,
};

/**
 * "About" tab: letters fly in from all directions and assemble as you scroll.
 * The letters/words are pre-split by <FlyChars>/<FlyWords>; this only animates them.
 * On desktop the panel scrolls itself; below that the page scrolls.
 */
export function useAboutFlyIn(scrollRef: RefObject<HTMLElement | null>, isActive: boolean, lang: string) {
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || !isActive) return;

    const mm = gsap.matchMedia();
    mm.add(
      { desktop: "(min-width: 1024px)", reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; reduceMotion: boolean };
        if (reduceMotion) return;

        const scrollerOption = desktop ? scroller : undefined;
        const rtl = getComputedStyle(scroller).direction === "rtl" || document.documentElement.dir === "rtl";

        // ── Screen 1: the title explodes into place as soon as the tab opens.
        const hero = scroller.querySelector<HTMLElement>("[data-about-hero]");
        if (hero) {
          const chars = hero.querySelectorAll<HTMLElement>("[data-fly-char]");
          const words = hero.querySelectorAll<HTMLElement>("[data-fly-word]");
          const hint = hero.querySelector<HTMLElement>("[data-scroll-hint]");

          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(chars, {
              x: () => gsap.utils.random(-600, 600),
              y: () => gsap.utils.random(-400, 400),
              rotation: () => gsap.utils.random(-360, 360),
              scale: () => gsap.utils.random(0, 3),
              autoAlpha: 0,
              duration: 1.6,
              stagger: { each: 0.05, from: "random" },
            })
            .from(words, { autoAlpha: 0, y: 24, filter: "blur(10px)", duration: 0.9, stagger: 0.04, clearProps: "filter" }, 0.7)
            .from(hint, { autoAlpha: 0, y: -10, duration: 0.8 }, 1.4);

          // Scrolling away blows the title apart again (and reverses when you come back up).
          gsap.to(chars, {
            x: () => gsap.utils.random(-400, 400),
            y: () => gsap.utils.random(-300, -80),
            rotation: () => gsap.utils.random(-180, 180),
            scale: () => gsap.utils.random(0.2, 1.8),
            autoAlpha: 0,
            ease: "power1.in",
            stagger: { each: 0.01, from: "random" },
            immediateRender: false,
            scrollTrigger: { trigger: hero, scroller: scrollerOption, start: "top top", end: "bottom 30%", scrub: 1 },
          });
          gsap.to([...words, hint], {
            autoAlpha: 0,
            y: -40,
            immediateRender: false,
            scrollTrigger: { trigger: hero, scroller: scrollerOption, start: "top top", end: "45% top", scrub: 1 },
          });
        }

        // ── Every section: letters gather from chaos, then the paragraph assembles word by word.
        gsap.utils.toArray<HTMLElement>("[data-about-section]", scroller).forEach((section) => {
          const chars = section.querySelectorAll<HTMLElement>("[data-fly-char]");
          const words = section.querySelectorAll<HTMLElement>("[data-fly-word]");
          const line = section.querySelector<HTMLElement>("[data-about-line]");
          const number = line?.nextElementSibling ?? null;

          const tl = gsap.timeline({
            // clamp(): the last sections can never reach "top 30%" because the scroll runs out first,
            // so their animation is squeezed into whatever scroll distance is left and always completes.
            scrollTrigger: {
              trigger: section,
              scroller: scrollerOption,
              start: "clamp(top 92%)",
              end: "clamp(top 55%)",
              scrub: 1,
            },
          });

          if (line) tl.from(line, { scaleX: 0, transformOrigin: rtl ? "100% 50%" : "0% 50%", ease: "none", duration: 0.6 }, 0);
          if (number) tl.from(number, { autoAlpha: 0, y: 20, duration: 0.4 }, 0.1);
          tl.from(chars, { ...scatter, ease: "power3.out", duration: 1, stagger: { each: 0.03, from: "random" } }, 0.1)
            .from(
              words,
              { autoAlpha: 0, y: 28, rotationX: -70, filter: "blur(8px)", transformOrigin: "50% 100%", ease: "power2.out", duration: 0.6, stagger: 0.025 },
              0.6,
            );
        });
      },
    );

    // The panel was display:none until this tab opened, and its height still shifts afterwards
    // (web fonts swapping in, viewport changes). Stale measurements make the last sections expect
    // more scroll than exists, so they never finish — re-measure whenever the content resizes.
    let frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const content = scroller.firstElementChild;
    const observer = new ResizeObserver(remeasure);
    if (content) observer.observe(content);
    document.fonts?.ready.then(remeasure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mm.revert();
    };
  }, [scrollRef, isActive, lang]);
}
