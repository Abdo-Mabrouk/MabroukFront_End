import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const READY_CLASS = "intro-ready";

/**
 * One-time entrance timeline for the profile sidebar.
 * Elements are hidden by CSS (`[data-intro]` in globals.css) until this runs, so there is no flash.
 * Skipped entirely for prefers-reduced-motion (the CSS does not hide anything in that case).
 */
export function useProfileIntro(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    const root = document.documentElement;
    if (!scope || root.classList.contains(READY_CLASS)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add(READY_CLASS);
      return;
    }

    const ctx = gsap.context(() => {
      const q = (name: string) => gsap.utils.toArray<HTMLElement>(`[data-intro="${name}"]`, scope);
      const [name] = q("name");
      const [lede] = q("lede");

      // Arabic must never be split into letters (it breaks the joined glyphs), so split by words.
      const nameSplit = name ? SplitText.create(name, { type: "words", mask: "words" }) : null;
      const ledeSplit = lede ? SplitText.create(lede, { type: "words" }) : null;

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          root.classList.add(READY_CLASS);
          nameSplit?.revert();
          ledeSplit?.revert();
        },
      });

      // 1. Portrait panel wipes up, then the portrait rises out of it.
      tl.fromTo(
        q("portrait"),
        { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", clearProps: "clipPath" },
      )
        .fromTo(
          q("portrait-img"),
          { autoAlpha: 0, yPercent: 40, scale: 0.8, filter: "blur(14px)" },
          { autoAlpha: 1, yPercent: 0, scale: 1, filter: "blur(0px)", duration: 1.2, clearProps: "filter" },
          0.45,
        )
        // 2. "Available" pill drops in with a bounce.
        .fromTo(
          q("pill"),
          { autoAlpha: 0, y: -70, scale: 0.6 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.3, ease: "elastic.out(1, 0.5)" },
          0.7,
        );

      // 3. Name: each word slides up from behind its mask.
      if (name && nameSplit) {
        tl.set(name, { autoAlpha: 1 }, 0.6).fromTo(
          nameSplit.words,
          { yPercent: 115, rotate: 6 },
          { yPercent: 0, rotate: 0, duration: 1, stagger: 0.09 },
          0.6,
        );
      }

      tl.fromTo(
        q("role"),
        { autoAlpha: 0, y: 18, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, clearProps: "filter" },
        0.85,
      );

      // 4. Bio fades in word by word out of a blur.
      if (lede && ledeSplit) {
        tl.set(lede, { autoAlpha: 1 }, 0.95).fromTo(
          ledeSplit.words,
          { autoAlpha: 0, y: 12, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.015, ease: "power3.out" },
          0.95,
        );
      }

      // 5. Stats pop in and their numbers count up.
      tl.fromTo(
        q("stat"),
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 },
        1.25,
      );
      scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el, index) => {
        const node = el.firstChild;
        const raw = node?.nodeValue ?? "";
        const match = raw.match(/\d+(\.\d+)?/);
        if (!node || !match) return;
        const target = parseFloat(match[0]);
        const decimals = match[1] ? match[1].length - 1 : 0;
        const counter = { value: 0 };
        tl.to(
          counter,
          {
            value: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              node.nodeValue = raw.replace(match[0], counter.value.toFixed(decimals));
            },
            onComplete: () => {
              node.nodeValue = raw;
            },
          },
          1.25 + index * 0.12,
        );
      });

      // 6. Buttons spring up.
      tl.fromTo(
        q("action"),
        { autoAlpha: 0, y: 26, scale: 0.85 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: "back.out(2)" },
        1.45,
      )
        // 7. Contact box opens from the centre, corner marks spin in, then its rows.
        .fromTo(
          q("contact"),
          { autoAlpha: 1, clipPath: "inset(0% 50% 0% 50%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut", clearProps: "clipPath" },
          1.55,
        )
        .fromTo(
          q("mark"),
          { autoAlpha: 0, scale: 0, rotate: -90 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.7, stagger: 0.06, ease: "back.out(3)" },
          2.1,
        )
        .fromTo(
          [...q("email"), ...q("social")],
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 },
          1.9,
        );
    }, scope);

    return () => ctx.revert();
  }, [scopeRef]);
}
