import { useEffect, useRef, type RefObject } from "react";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 5;

export type ZoomListener = (zoom: number) => void;

interface Point {
  x: number;
  y: number;
}

/**
 * Wheel / drag / pinch zoom for the full-screen project viewer.
 * Works directly on the DOM (transform written to the <img>) so dragging never re-renders React.
 * Returns `reset` (also bound to double-click and window resize), `zoomTo` (zoom around the centre)
 * and `subscribe`, which notifies listeners whenever the zoom level changes.
 */
export function useZoomPan(
  viewportRef: RefObject<HTMLDivElement | null>,
  imageRef: RefObject<HTMLImageElement | null>,
  isOpen: () => boolean,
) {
  const state = useRef({
    zoom: 1,
    panX: 0,
    panY: 0,
    pinchDistance: 0,
    pinchCenter: null as Point | null,
    pointers: new Map<number, Point>(),
  });

  const listeners = useRef(new Set<ZoomListener>());

  const apiRef = useRef({
    reset: () => {},
    clearPointers: () => {},
    zoomTo: (value: number) => {
      void value;
    },
    subscribe: (listener: ZoomListener) => {
      listeners.current.add(listener);
      listener(state.current.zoom);
      return () => {
        listeners.current.delete(listener);
      };
    },
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const image = imageRef.current;
    if (!viewport || !image) return;
    const s = state.current;

    const render = () => {
      image.style.transform = `translate3d(${s.panX}px, ${s.panY}px, 0) scale(${s.zoom})`;
      listeners.current.forEach((listener) => listener(s.zoom));
    };

    const reset = () => {
      s.zoom = 1;
      s.panX = 0;
      s.panY = 0;
      render();
    };

    const setZoom = (value: number, clientX?: number, clientY?: number) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
      const rect = viewport.getBoundingClientRect();
      const anchorX = (clientX ?? rect.left + rect.width / 2) - rect.left - rect.width / 2;
      const anchorY = (clientY ?? rect.top + rect.height / 2) - rect.top - rect.height / 2;
      const ratio = next / s.zoom;
      s.panX = anchorX - (anchorX - s.panX) * ratio;
      s.panY = anchorY - (anchorY - s.panY) * ratio;
      s.zoom = next;
      render();
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setZoom(s.zoom * Math.exp(-event.deltaY * 0.0015), event.clientX, event.clientY);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      viewport.setPointerCapture(event.pointerId);
      s.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      viewport.classList.add("is-dragging");
      if (s.pointers.size === 2) {
        const [a, b] = [...s.pointers.values()];
        s.pinchDistance = Math.hypot(a.x - b.x, a.y - b.y);
        s.pinchCenter = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const previous = s.pointers.get(event.pointerId);
      if (!previous) return;
      s.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (s.pointers.size === 2) {
        const [a, b] = [...s.pointers.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        if (s.pinchCenter) {
          s.panX += center.x - s.pinchCenter.x;
          s.panY += center.y - s.pinchCenter.y;
        }
        if (s.pinchDistance > 0) setZoom((s.zoom * distance) / s.pinchDistance, center.x, center.y);
        s.pinchDistance = distance;
        s.pinchCenter = center;
      } else {
        s.panX += event.clientX - previous.x;
        s.panY += event.clientY - previous.y;
        render();
      }
    };

    const endDrag = (event: PointerEvent) => {
      s.pointers.delete(event.pointerId);
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      if (s.pointers.size < 2) {
        s.pinchDistance = 0;
        s.pinchCenter = null;
      }
      if (s.pointers.size === 0) viewport.classList.remove("is-dragging");
    };

    const onDragStart = (event: Event) => event.preventDefault();
    const onResize = () => {
      if (isOpen()) reset();
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("dblclick", reset);
    image.addEventListener("dragstart", onDragStart);
    window.addEventListener("resize", onResize);

    apiRef.current = {
      ...apiRef.current,
      reset,
      zoomTo: (value: number) => setZoom(value),
      clearPointers: () => {
        s.pointers.clear();
        viewport.classList.remove("is-dragging");
      },
    };

    return () => {
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("dblclick", reset);
      image.removeEventListener("dragstart", onDragStart);
      window.removeEventListener("resize", onResize);
    };
  }, [viewportRef, imageRef, isOpen]);

  return apiRef;
}
