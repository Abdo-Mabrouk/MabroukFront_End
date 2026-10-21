"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { STORAGE_KEY, ui, type Lang, type TabId, type UiStrings } from "@/lib/content";

interface PortfolioContextValue {
  lang: Lang;
  isEnglish: boolean;
  t: UiStrings;
  toggleLanguage: () => void;
  tab: TabId;
  setTab: (tab: TabId) => void;
  /** True on phones once the profile card has scrolled away (shows the compact header profile). */
  profileCollapsed: boolean;
  summaryRef: RefObject<HTMLDivElement | null>;
  /** Index of the project open in the full-screen viewer, or null. */
  activeProject: number | null;
  openProject: (index: number) => void;
  closeProject: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used inside <PortfolioProvider>");
  return ctx;
}

const HEADER_HEIGHT = 52;

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [tab, setTabState] = useState<TabId>("work");
  const [profileCollapsed, setProfileCollapsed] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  // Restore the saved language after hydration.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "en") setLang("en");
    } catch {
      /* Storage may be unavailable – keep Arabic. */
    }
  }, []);

  // Mirror the language onto <html> (lang, dir and the `english` class used by the `en:` variant).
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "en" ? "ltr" : "rtl";
    root.classList.toggle("english", lang === "en");
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === "en" ? "ar" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setTab = useCallback((next: TabId) => {
    setTabState(next);
    if (window.matchMedia("(max-width:1023px)").matches) window.scrollTo(0, 0);
  }, []);

  // Phone header: swap the availability pill for the compact profile once the card scrolls away.
  useEffect(() => {
    const mobile = window.matchMedia("(max-width:550px)");
    const update = () => {
      const summary = summaryRef.current;
      const hidden =
        tab !== "work" || !summary || summary.getBoundingClientRect().bottom <= HEADER_HEIGHT;
      setProfileCollapsed(mobile.matches && hidden);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    mobile.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mobile.removeEventListener("change", update);
    };
  }, [tab, lang]);

  const openProject = useCallback((index: number) => setActiveProject(index), []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      lang,
      isEnglish: lang === "en",
      t: ui[lang],
      toggleLanguage,
      tab,
      setTab,
      profileCollapsed,
      summaryRef,
      activeProject,
      openProject,
      closeProject,
    }),
    [lang, toggleLanguage, tab, setTab, profileCollapsed, activeProject, openProject, closeProject],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
