import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ASSETS } from "@/lib/experience/assets";
import { useI18n } from "@/lib/experience/i18n";

const SEEN_KEY = "bm-intro-seen";

export function requestIntroReplay() {
  try {
    window.sessionStorage.removeItem(SEEN_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event("bm:replay-intro"));
}

const draw = (delay, duration = 1.5) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { delay, duration, ease: [0.16, 1, 0.3, 1] }, opacity: { delay, duration: 0.3 } },
});

export default function GoldenThreadSplash({ onDone }) {
  const { t, isAr } = useI18n();
  const reduce = useReducedMotion();
  // Keep server HTML and first client render deterministic.
  const [open, setOpen] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SEEN_KEY) === "1") setOpen(false);
    } catch {
      /* Storage unavailable: keep the intro accessible and skippable. */
    }
  }, []);

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
    window.setTimeout(() => {
      onDone?.();
      const target = document.getElementById("hero-title");
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }, 620);
  }, [onDone]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return undefined;
    }

    timer.current = window.setTimeout(finish, reduce ? 1200 : 4200);

    const onKey = (event) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer.current);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, finish, reduce]);

  useEffect(() => {
    const onReplay = () => setOpen(true);
    window.addEventListener("bm:replay-intro", onReplay);
    return () => window.removeEventListener("bm:replay-intro", onReplay);
  }, []);

  const handleSkip = () => {
    window.clearTimeout(timer.current);
    finish();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="golden-thread"
          role="dialog"
          aria-modal="true"
          aria-label={t({ ar: "مقدمة الهوية — بسمة موسى", en: "Brand intro — Basma Moussa" })}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#04060F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSkip}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 46%, rgba(215,171,98,0.14), transparent 70%), radial-gradient(40% 30% at 50% 100%, rgba(20,32,57,0.8), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center px-6">
            <svg
              viewBox="0 0 400 400"
              className="h-[min(74vw,460px)] w-[min(74vw,460px)]"
              aria-hidden="true"
              fill="none"
              stroke="url(#threadGold)"
              strokeWidth="1.1"
              strokeLinecap="round"
            >
              <defs>
                <linearGradient id="threadGold" x1="40" y1="360" x2="360" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C6C33" />
                  <stop offset="0.45" stopColor="#D7AB62" />
                  <stop offset="0.7" stopColor="#F2D7A0" />
                  <stop offset="1" stopColor="#B98F49" />
                </linearGradient>
              </defs>

              <motion.circle cx="200" cy="200" r="150" {...draw(0.15, 1.9)} />
              <motion.circle cx="200" cy="200" r="128" strokeOpacity="0.5" strokeDasharray="2 9" {...draw(0.55, 1.8)} />
              {/* feminine profile suggestion */}
              <motion.path
                d="M162 318C126 268 124 178 166 126C186 100 214 94 228 108C240 120 238 142 226 156"
                {...draw(0.5, 1.7)}
              />
              {/* Egyptian heritage geometry */}
              <motion.path d="M200 50 200 20M170 62 150 38M230 62 250 38" {...draw(1.1, 1.1)} />
              <motion.path d="M118 296C150 330 250 330 282 296" strokeOpacity="0.8" {...draw(1.35, 1.2)} />
              {/* voice waveform */}
              <motion.path
                d="M108 214C130 186 148 242 170 214C192 186 210 242 232 214C254 186 272 242 294 214"
                {...draw(0.9, 1.6)}
              />
              <motion.path d="M132 240C158 258 242 258 268 240" strokeOpacity="0.55" {...draw(1.5, 1.3)} />
            </svg>

            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduce ? 0.1 : 2.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={ASSETS.logo}
                alt={t({ ar: "شعار بسمة موسى", en: "Basma Moussa identity mark" })}
                className="w-[46%] max-w-[220px] rounded-full"
              />
            </motion.div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0.3 : 2.6, duration: 0.9 }}
            >
              <p className="font-display text-2xl text-ivory sm:text-3xl">
                {isAr ? "بسمة موسى" : "Basma Moussa"}
              </p>
              <p className="eyebrow mt-3 text-gold/80">
                {t({ ar: "عالم الإعلام", en: "Media Universe" })}
              </p>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="absolute bottom-8 start-6 border border-gold/30 px-4 py-2 text-[0.6rem] uppercase tracking-[0.24em] text-ivory/70 transition-colors hover:border-gold hover:text-ivory sm:start-10"
          >
            {t({ ar: "تخطّي المقدمة", en: "Skip intro" })}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}