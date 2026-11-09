import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const I18nContext = createContext(null);

const STORAGE_KEY = "bm-lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function normalizeLang(value) {
  return value === "en" ? "en" : "ar";
}

function parseLangCookie(cookie) {
  const match = /(?:^|;\s*)bm-lang=(ar|en)(?:;|$)/.exec(cookie ?? "");
  return normalizeLang(match?.[1]);
}

// The server renders from the request cookie and the browser hydrates from the
// same cookie, so the first client render matches the server HTML exactly.
// localStorage alone cannot do this: the server never sees it, which produced a
// text mismatch (React #418) for every English session.
const readInitialLang = createIsomorphicFn()
  .server(() => {
    try {
      return parseLangCookie(getRequest()?.headers?.get("cookie"));
    } catch {
      return "ar";
    }
  })
  .client(() => parseLangCookie(document.cookie));

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  const dir = lang === "ar" ? "rtl" : "ltr";

  // One-time migration from the pre-cookie preference. This runs after
  // hydration, so it never changes the first render.
  useEffect(() => {
    let saved = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage may be blocked */
    }
    const hasCookie = /(?:^|;\s*)bm-lang=/.test(document.cookie);
    if (!hasCookie && saved === "en") setLangState("en");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage may be blocked; language still applies for the session */
    }
    try {
      document.cookie = `${STORAGE_KEY}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    } catch {
      /* cookies may be blocked; the language still applies for this page */
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