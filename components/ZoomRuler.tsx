"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type RefObject } from "react";
import { MAX_ZOOM, MIN_ZOOM, type ZoomListener } from "@/hooks/useZoomPan";

const TICKS = 31;
const LOG_RANGE = Math.log(MAX_ZOOM / MIN_ZOOM);

// Zoom is mapped logarithmically so every tick is the same zoom *ratio* step.
const zoomToFraction = (zoom: number) => Math.log(zoom / MIN_ZOOM) / LOG_RANGE;
const fractionToZoom = (fraction: number) => MIN_ZOOM * Math.exp(Math.min(1, Math.max(0, fraction)) * LOG_RANGE);

interface ZoomApi {
  zoomTo: (value: number) => void;
  subscribe: (listener: ZoomListener) => () => void;
}

interface ZoomRulerProps {
  zoomApi: RefObject<ZoomApi>;
  label: string;
}

/** Ruler-style zoom bar: ticks before the current level are bright, the current one is the accent colour. */
export function ZoomRuler({ zoomApi, label }: ZoomRulerProps) {
  const [zoom, setZoom] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => zoomApi.current.subscribe(setZoom), [zoomApi]);

  const active = Math.round(zoomToFraction(zoom) * (TICKS - 1));

  const zoomFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    zoomApi.current.zoomTo(fractionToZoom((event.clientX - rect.left) / rect.width));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = 1 / (TICKS - 1);
    const fraction = zoomToFraction(zoom);
    const next: Record<string, number> = {
      ArrowRight: fraction + step,
      ArrowUp: fraction + step,
      ArrowLeft: fraction - step,
      ArrowDown: fraction - step,
      Home: 0,
      End: 1,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    zoomApi.current.zoomTo(fractionToZoom(next[event.key]));
  };

  return (
    <div
      role="slider"
      tabIndex={0}
      dir="ltr"
      aria-label={label}
      aria-valuemin={MIN_ZOOM * 100}
      aria-valuemax={MAX_ZOOM * 100}
      aria-valuenow={Math.round(zoom * 100)}
      aria-valuetext={`${Math.round(zoom * 100)}%`}
      onKeyDown={onKeyDown}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        zoomFromPointer(event);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) zoomFromPointer(event);
      }}
      className="pointer-events-auto flex touch-none cursor-ew-resize select-none items-center gap-3 rounded-[22px] border border-white/15 bg-[#16191dba] px-5 py-4 shadow-[0_8px_30px_#0008] backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div ref={trackRef} className="flex h-8 items-center justify-between gap-[clamp(6px,1.4vw,12px)]">
        {Array.from({ length: TICKS }, (_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={
              index === active
                ? "h-8 w-[3px] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)] transition-[height,background-color] duration-150"
                : `h-4 w-[2px] rounded-full transition-[height,background-color] duration-150 ${index < active ? "bg-white" : "bg-white/30"}`
            }
          />
        ))}
      </div>
      <span className="min-w-[4ch] font-arial text-xs tabular-nums text-white/70">{Math.round(zoom * 100)}%</span>
    </div>
  );
}
