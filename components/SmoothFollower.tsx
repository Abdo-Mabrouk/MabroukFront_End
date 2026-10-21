"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor follower: an 8px dot and a slower 28px ring (adapted from the Cursify example).
 * Only active for fine pointers and when the visitor has not asked for reduced motion.
 */
export function SmoothFollower() {
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const follower = followerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!follower || !dot || !ring) return;

    document.documentElement.classList.add("smooth-follower-enabled");

    const target = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let started = false;
    let animating = false;
    let frame = 0;

    const updateHover = () => {
      const element = document.elementFromPoint(target.x, target.y);
      follower.classList.toggle("is-hovering", Boolean(element?.closest("a, button, img, input, textarea, select")));
    };

    const draw = () => {
      dotPos.x += (target.x - dotPos.x) * 0.2;
      dotPos.y += (target.y - dotPos.y) * 0.2;
      ringPos.x += (target.x - ringPos.x) * 0.1;
      ringPos.y += (target.y - ringPos.y) * 0.1;
      dot.style.left = `${dotPos.x}px`;
      dot.style.top = `${dotPos.y}px`;
      ring.style.left = `${ringPos.x}px`;
      ring.style.top = `${ringPos.y}px`;

      const remaining =
        Math.abs(target.x - dotPos.x) + Math.abs(target.y - dotPos.y) +
        Math.abs(target.x - ringPos.x) + Math.abs(target.y - ringPos.y);
      if (remaining > 0.2) frame = requestAnimationFrame(draw);
      else animating = false;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!started) {
        dotPos.x = ringPos.x = target.x;
        dotPos.y = ringPos.y = target.y;
        started = true;
      }
      follower.classList.add("is-visible");
      updateHover();
      if (!animating) {
        animating = true;
        frame = requestAnimationFrame(draw);
      }
    };
    const onMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) follower.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", updateHover, { passive: true, capture: true });
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", updateHover, { capture: true });
      window.removeEventListener("mouseout", onMouseOut);
      document.documentElement.classList.remove("smooth-follower-enabled");
    };
  }, []);

  return (
    <div
      ref={followerRef}
      aria-hidden
      className="group/follower pointer-events-none fixed inset-0 z-1000 text-ink opacity-0 transition-opacity duration-150 [&.is-visible]:opacity-100 [@media(pointer:coarse)]:hidden [@media(prefers-reduced-motion:reduce)]:hidden"
    >
      <span ref={dotRef} className="absolute left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current will-change-[left,top]" />
      <span
        ref={ringRef}
        className="absolute left-0 top-0 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current transition-[width,height] duration-300 will-change-[left,top] group-[.is-hovering]/follower:size-11"
      />
    </div>
  );
}
