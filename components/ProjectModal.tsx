"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePortfolio } from "./PortfolioProvider";
import { useZoomPan } from "@/hooks/useZoomPan";
import { projects } from "@/lib/content";

export function ProjectModal() {
  const { lang, isEnglish, t, activeProject, closeProject } = usePortfolio();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const isOpen = useCallback(() => Boolean(dialogRef.current?.open), []);
  const zoom = useZoomPan(viewportRef, imageRef, isOpen);

  // Open / close the native <dialog> to follow the context state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeProject !== null && !dialog.open) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.body.classList.add("project-modal-open");
      zoom.current.reset();
      closeButtonRef.current?.focus();
    } else if (activeProject === null && dialog.open) {
      dialog.close();
    }
  }, [activeProject, zoom]);

  // Fires for the close button, Escape and programmatic closes alike.
  const handleClose = () => {
    document.body.classList.remove("project-modal-open");
    zoom.current.clearPointers();
    closeProject();
    previousFocus.current?.focus();
  };

  const project = activeProject === null ? null : projects[activeProject];
  const title = project?.title[lang] ?? "";

  return (
    <dialog
      ref={dialogRef}
      dir={isEnglish ? "ltr" : "rtl"}
      aria-labelledby="projectModalTitle"
      aria-describedby="projectModalDescription"
      onClose={handleClose}
      className="project-modal fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden rounded-none border-0 bg-[#070a1047] p-0 font-ping text-white backdrop-blur-[28px] backdrop:bg-[#070a164d] backdrop:backdrop-blur-[28px] en:font-google"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-3 flex items-start justify-between gap-3 bg-[linear-gradient(#000c,transparent)] px-4 py-[18px] tab:gap-6 tab:p-[clamp(20px,3vw,42px)]">
        <div className="min-w-0 max-w-[min(70ch,calc(100%-72px))] [text-shadow:0_2px_8px_#0009]">
          <h2
            id="projectModalTitle"
            className="mb-[7px] mt-0 font-display text-[22px] font-bold leading-[1.2] tab:text-[clamp(24px,3vw,40px)]"
          >
            {title}
          </h2>
          {project?.url && (
            <a
              href={project.url}
              onClick={(event) => {
                event.stopPropagation();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto cursor-pointer! mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/60 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {isEnglish ? "View Live Project" : "عرض المشروع"}
              <span aria-hidden="true">{isEnglish ? "<" : ">"}</span>
            </a>
          )}
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label={t.closeProject}
          onClick={closeProject}
          className="project-modal-close pointer-events-auto grid size-[38px] flex-none cursor-pointer place-items-center rounded-full border border-[#ffffff75] bg-[#16191dba] p-0 font-arial text-[28px] leading-none text-white hover:bg-[#353b43] focus-visible:outline-white tab:size-11 tab:text-[32px]"
        >
          ×
        </button>
      </div>

      <div
        ref={viewportRef}
        className="project-zoom-viewport absolute inset-0 grid cursor-grab touch-none place-items-center overflow-hidden [&.is-dragging]:cursor-grabbing"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={project ? `/assets/projects/${project.file}` : undefined}
          alt={title}
          width={1200}
          height={900}
          className="pointer-events-none block h-full w-full max-h-none max-w-none origin-center select-none object-contain will-change-transform [-webkit-user-drag:none]"
        />
      </div>
    </dialog>
  );
}
