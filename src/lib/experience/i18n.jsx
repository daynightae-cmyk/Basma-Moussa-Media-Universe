import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext(null);

const STORAGE_KEY = "bm-lang";

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "ar";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "ar";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage may be blocked; language still applies for the session */
    }
  }, [lang, dir]);

  const setLang = useCallback((next) => setLangState(next === "en" ? "en" : "ar"), []);
  const toggle = useCallback(() => setLangState((prev) => (prev === "ar" ? "en" : "ar")), []);

  /** t({ ar, en }) → string in the active language */
  const t = useCallback(
    (value) => {
      if (value == null) return "";
      if (typeof value === "string") return value;
      return value[lang] ?? value.ar ?? value.en ?? "";
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, dir, isAr: lang === "ar", setLang, toggle, t }),
    [lang, dir, setLang, toggle, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}