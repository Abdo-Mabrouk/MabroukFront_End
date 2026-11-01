"use client";

import { useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";

const TICKS = 21;

interface ScrollRulerProps {
  scrollRef: RefObject<HTMLElement | null>;
  controls: string;
  className?: string;
}

/**
 * Vertical ruler-style scrollbar: ticks above the current position are dark,
 * the current one is the accent colour. Drag or click it to scroll.
 */
export function ScrollRuler({ scrollRef, controls, className = "" }: ScrollRulerProps) {
  const [active, setActive] = useState(0);
  const [percent, setPercent] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      setScrollable(max > 1);
      const fraction = max > 0 ? el.scrollTop / max : 0;
      setActive(Math.round(fraction * (TICKS - 1)));
      setPercent(Math.round(fraction * 100));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [scrollRef]);

  const scrollFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const rect = track.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    el.scrollTop = fraction * (el.scrollHeight - el.clientHeight);
  };

  if (!scrollable) return null;

  return (
    <div
      role="scrollbar"
      aria-controls={controls}
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        scrollFromPointer(event);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) scrollFromPointer(event);
      }}
      className={`touch-none cursor-ns-resize select-none rounded-[16px] border border-white/10 bg-[#171717]/90 dark:border-white/15 dark:bg-[#1c1f24]/90 px-2 py-4 shadow-[0_8px_24px_#17171740] backdrop-blur-md ${className}`}
    >
      <div ref={trackRef} className="flex h-[clamp(180px,32vh,300px)] w-4 flex-col items-center justify-between">
        {Array.from({ length: TICKS }, (_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={
              index === active
                ? "h-[3px] w-4 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] transition-[width,background-color] duration-150"
                : `h-[2px] w-2.5 rounded-full transition-[width,background-color] duration-150 ${index < active ? "bg-white" : "bg-white/30"}`
            }
          />
        ))}
      </div>
    </div>
  );
}
