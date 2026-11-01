"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { flushSync } from "react-dom";
import {
  STORAGE_KEY,
  THEME_STORAGE_KEY,
  ui,
  type Lang,
  type TabId,
  type Theme,
  type UiStrings,
} from "@/lib/content";

interface PortfolioContextValue {
  lang: Lang;
  isEnglish: boolean;
  t: UiStrings;
  toggleLanguage: () => void;
  theme: Theme;
  /** Pass the click event to make the new theme spread out from the button. */
  toggleTheme: (event?: MouseEvent<HTMLElement>) => void;
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
  const [theme, setTheme] = useState<Theme>("light");
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

  // The boot script in layout.tsx already set the class on <html>; just read it back.
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback((event?: MouseEvent<HTMLElement>) => {
    const root = document.documentElement;
    const next: Theme = root.classList.contains("dark") ? "light" : "dark";

    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      flushSync(() => setTheme(next));
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      apply();
      return;
    }

    if (!document.startViewTransition) {
      root.classList.add("theme-switching");
      apply();
      window.setTimeout(() => root.classList.remove("theme-switching"), 400);
      return;
    }

    // Circle grows from the button (or the screen centre) to cover the whole page.
    const rect = event?.currentTarget.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    document.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
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
      theme,
      toggleTheme,
      tab,
      setTab,
      profileCollapsed,
      summaryRef,
      activeProject,
      openProject,
      closeProject,
    }),
    [lang, toggleLanguage, theme, toggleTheme, tab, setTab, profileCollapsed, activeProject, openProject, closeProject],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
