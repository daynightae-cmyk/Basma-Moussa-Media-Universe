import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/experience/assets";
import { useI18n } from "@/lib/experience/i18n";

const LINKS = [
  { href: "/media", label: { ar: "عالم الإعلام", en: "Media Universe" } },
  { href: "/studio", label: { ar: "الاستوديو", en: "Studio" } },
  { href: "/soundroom", label: { ar: "مساحة صوت", en: "Soundroom" } },
  { href: "/legal-lens", label: { ar: "من زاوية القانون", en: "Legal Lens" } },
  { href: "/stories", label: { ar: "القصص", en: "Stories" } },
  { href: "/about", label: { ar: "عن بسمة", en: "About" } },
];

export default function SiteHeader() {
  const { t, lang, toggle } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/15 bg-ink-900/88 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-ink-900/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label={t({ ar: "بسمة موسى — الرئيسية", en: "Basma Moussa — home" })}>
          <img src={ASSETS.icon} alt="" className="h-9 w-9 rounded-full ring-1 ring-gold/30 transition-transform duration-500 group-hover:scale-105" />
          <span className="leading-none">
            <span className="block font-display text-[1.15rem] tracking-tight text-ivory">
              {t({ ar: "بسمة موسى", en: "Basma Moussa" })}
            </span>
            <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">
              {t({ ar: "عالم الإعلام", en: "Media Universe" })}
            </span>
          </span>
        </Link>

        <nav aria-label={t({ ar: "التنقل الرئيسي", en: "Main navigation" })} className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-[0.8rem] tracking-wide transition-colors ${
                  active ? "text-gold" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                {t(link.label)}
                {active && (
                  <motion.span
                    layoutId="bm-nav-thread"
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    className="absolute -bottom-2 start-0 flex w-full items-center"
                    aria-hidden="true"
                  >
                    <span className="h-px flex-1 bg-gradient-to-r from-gold/20 via-gold/70 to-gold" />
                    <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-gold" />
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggle}
            lang={lang === "ar" ? "en" : "ar"}
            className="hidden border border-ivory/15 px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:border-gold/60 hover:text-ivory sm:block"
            aria-label={t({ ar: "التبديل إلى الإنجليزية", en: "Switch to Arabic" })}
          >
            {lang === "ar" ? "EN" : "ع"}
          </button>

          <Link
            to="/ai-studio"
            className="group hidden items-center gap-2 border border-gold/40 px-4 py-2 text-[0.68rem] tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-ink-900 sm:flex"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {t({ ar: "بسمة AI", en: "Basma AI" })}
          </Link>

          <Link
            to="/contact"
            className="hidden bg-gold px-4 py-2 text-[0.68rem] font-medium tracking-[0.12em] text-ink-900 transition-colors hover:bg-gold-light md:block"
          >
            {t({ ar: "ابدأ حوارًا", en: "Start a conversation" })}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-ivory/15 text-ivory lg:hidden"
            aria-expanded={menuOpen}
            aria-label={t(menuOpen ? { ar: "إغلاق القائمة", en: "Close menu" } : { ar: "فتح القائمة", en: "Open menu" })}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t border-gold/15 bg-ink-900/97 px-6 pb-16 pt-8 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col" aria-label={t({ ar: "التنقل الرئيسي", en: "Main navigation" })}>
            {[...LINKS, { href: "/ai-studio", label: { ar: "بسمة AI", en: "Basma AI" } }, { href: "/contact", label: { ar: "تواصل", en: "Contact" } }].map(
              (link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-baseline justify-between border-b border-ivory/8 py-4 font-display text-2xl text-ivory/90"
                >
                  <span>{t(link.label)}</span>
                  <span className="text-[0.6rem] tracking-[0.2em] text-gold/50">{String(index + 1).padStart(2, "0")}</span>
                </Link>
              )
            )}
          </nav>
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={toggle}
              className="border border-gold/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-gold"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
            <Link to="/contact" className="bg-gold px-5 py-2.5 text-[0.7rem] font-medium text-ink-900">
              {t({ ar: "ابدأ حوارًا", en: "Start a conversation" })}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}