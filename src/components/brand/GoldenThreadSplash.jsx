import "@/styles/production/splash.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ASSETS } from "@/lib/experience/assets";
import { useI18n } from "@/lib/experience/i18n";

const SEEN_KEY = "bm-intro-seen";

export function requestIntroReplay() {
  try {
    window.sessionStorage.removeItem(SEEN_KEY);
  } catch {
    /* ignore */
  }
  document.documentElement.removeAttribute("data-intro-seen");
  window.dispatchEvent(new Event("bm:replay-intro"));
}

/* The sequence: spark → thread/mask → scales → convergence → logo → invitation. */
const TIMELINE = [
  { at: 700, stage: 1 },
  { at: 3000, stage: 2 },
  { at: 5350, stage: 3 },
  { at: 6000, stage: 4 },
  { at: 6900, stage: 5 },
];

const EASE = [0.16, 1, 0.3, 1];

const goldStroke = {
  fill: "none",
  stroke: "url(#splash-thread)",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function drawIn(delay = 0, duration = 1.6) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { delay, duration, ease: EASE },
      opacity: { delay, duration: 0.3 },
    },
  };
}

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: 8 + ((index * 37) % 84),
        top: 12 + ((index * 53) % 76),
        delay: (index % 9) * 0.42,
        duration: 5 + (index % 5) * 1.6,
        size: index % 7 === 0 ? 2 : 1,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full bg-[#f2d7a0]"
          style={{ left: `${dot.left}%`, top: `${dot.top}%`, width: dot.size, height: dot.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0.1, 0.4, 0], y: [8, -26, -60] }}
          transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* A single drawing surface for the theatrical mask. */
function TheatreMask({ animate: shouldAnimate }) {
  return (
    <g>
      {/* depth silhouette behind the mask */}
      <motion.path
        d="M320 76 C 424 76 492 160 492 254 C 492 336 454 404 386 444 C 358 461 338 476 320 508 C 302 476 282 461 254 444 C 186 404 148 336 148 254 C 148 160 216 76 320 76 Z"
        fill="url(#splash-mask-fill)"
        stroke="none"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ transformOrigin: "320px 300px" }}
      />
      {/* outer mask — drawn as one continuous thread */}
      <motion.path
        d="M320 76 C 424 76 492 160 492 254 C 492 336 454 404 386 444 C 358 461 338 476 320 508 C 302 476 282 461 254 444 C 186 404 148 336 148 254 C 148 160 216 76 320 76 Z"
        {...(shouldAnimate ? drawIn(0, 1.45) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={2.2}
      />
      {/* inner rim — a second contour gives the mask thickness */}
      <motion.path
        d="M320 76 C 424 76 492 160 492 254 C 492 336 454 404 386 444 C 358 461 338 476 320 508 C 302 476 282 461 254 444 C 186 404 148 336 148 254 C 148 160 216 76 320 76 Z"
        transform="translate(320 292) scale(0.925) translate(-320 -292)"
        {...(shouldAnimate ? drawIn(0.18, 1.35) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={0.8}
        strokeOpacity={0.4}
      />
      {/* expressive brow line */}
      <motion.path
        d="M214 208 C 250 168 300 164 330 190"
        {...(shouldAnimate ? drawIn(0.4, 0.85) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={1.4}
        strokeOpacity={0.85}
      />
      <motion.path
        d="M426 208 C 390 168 340 164 310 190"
        {...(shouldAnimate ? drawIn(0.5, 0.85) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={1.4}
        strokeOpacity={0.85}
      />
      {/* eye apertures */}
      <motion.path
        d="M224 250 C 244 222 286 224 296 254 C 282 276 240 278 224 250 Z"
        {...(shouldAnimate ? drawIn(0.7, 0.6) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        fill="rgba(242,215,160,0.08)"
        stroke="url(#splash-thread)"
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <motion.path
        d="M416 250 C 396 222 354 224 344 254 C 358 276 400 278 416 250 Z"
        {...(shouldAnimate ? drawIn(0.78, 0.6) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        fill="rgba(242,215,160,0.08)"
        stroke="url(#splash-thread)"
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      {/* mask ridge */}
      <motion.path
        d="M320 196 C 314 260 316 318 320 358"
        {...(shouldAnimate ? drawIn(0.82, 0.75) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={0.9}
        strokeOpacity={0.45}
      />
      {/* cheek contours */}
      <motion.path
        d="M236 304 C 242 344 268 374 300 390"
        {...(shouldAnimate ? drawIn(0.95, 0.7) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={0.7}
        strokeOpacity={0.26}
      />
      <motion.path
        d="M404 304 C 398 344 372 374 340 390"
        {...(shouldAnimate ? drawIn(1.0, 0.7) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={0.7}
        strokeOpacity={0.26}
      />
      {/* open theatrical mouth */}
      <motion.path
        d="M278 378 C 296 358 344 358 362 378 C 348 422 292 422 278 378 Z"
        {...(shouldAnimate ? drawIn(1.0, 0.7) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        fill="rgba(242,215,160,0.09)"
        stroke="url(#splash-thread)"
        strokeWidth={1.4}
      />
      <motion.path
        d="M286 388 C 305 401 335 401 354 388"
        {...(shouldAnimate ? drawIn(1.2, 0.55) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={0.9}
        strokeOpacity={0.5}
      />
      {/* ribbons of the mask */}
      <motion.path
        d="M188 300 C 150 330 140 380 166 420"
        {...(shouldAnimate ? drawIn(1.1, 0.75) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={1.1}
        strokeOpacity={0.6}
      />
      <motion.path
        d="M452 300 C 490 330 500 380 474 420"
        {...(shouldAnimate ? drawIn(1.2, 0.75) : { initial: false, animate: { pathLength: 1, opacity: 1 } })}
        {...goldStroke}
        strokeWidth={1.1}
        strokeOpacity={0.6}
      />
    </g>
  );
}

/* Scales of justice — coherent pillar, beam, chains and pans. */
function JusticeScales({ animate: shouldAnimate }) {
  const line = (delay) =>
    shouldAnimate ? drawIn(delay, 1.2) : { initial: false, animate: { pathLength: 1, opacity: 1 } };
  return (
    <motion.g
      animate={shouldAnimate ? { rotate: [0, -0.7, 0.5, -0.12, 0] } : { rotate: 0 }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      style={{ transformOrigin: "320px 400px" }}
    >
      {/* base and pillar */}
      <motion.path d="M236 444 L404 444" {...line(0.1)} {...goldStroke} strokeWidth={1.8} />
      <motion.path d="M252 426 L388 426 C 388 436 378 444 366 444 L274 444 C 262 444 252 436 252 426 Z" {...line(0.2)} {...goldStroke} />
      <motion.path d="M306 198 L334 198 L330 426 L310 426 Z" {...line(0.3)} {...goldStroke} fill="rgba(242,215,160,0.05)" />
      <motion.path d="M292 174 C 300 160 340 160 348 174 L342 198 L298 198 Z" {...line(0.4)} {...goldStroke} />
      <motion.circle cx="320" cy="156" r="8" {...line(0.5)} {...goldStroke} />
      {/* beam */}
      <motion.path d="M176 210 L464 210" {...line(0.5)} {...goldStroke} strokeWidth={2} />
      <motion.path d="M320 196 L320 226" {...line(0.55)} {...goldStroke} />
      {/* left suspension */}
      <motion.path d="M186 212 L164 300 M206 212 L164 300" {...line(0.7)} {...goldStroke} strokeWidth={0.9} strokeOpacity={0.8} />
      <motion.path d="M134 300 A 30 30 0 0 0 194 300" {...line(0.9)} {...goldStroke} strokeWidth={1.6} />
      <motion.path d="M134 300 L194 300" {...line(0.95)} {...goldStroke} strokeWidth={1} strokeOpacity={0.7} />
      <motion.ellipse cx="164" cy="300" rx="30" ry="5" {...line(1)} {...goldStroke} strokeWidth={0.9} strokeOpacity={0.65} />
      {/* right suspension */}
      <motion.path d="M454 212 L476 300 M434 212 L476 300" {...line(0.75)} {...goldStroke} strokeWidth={0.9} strokeOpacity={0.8} />
      <motion.path d="M446 300 A 30 30 0 0 0 506 300" {...line(0.95)} {...goldStroke} strokeWidth={1.6} />
      <motion.path d="M446 300 L506 300" {...line(1)} {...goldStroke} strokeWidth={1} strokeOpacity={0.7} />
      <motion.ellipse cx="476" cy="300" rx="30" ry="5" {...line(1.05)} {...goldStroke} strokeWidth={0.9} strokeOpacity={0.65} />
      {/* decorative finial */}
      <motion.path d="M300 168 C 308 150 332 150 340 168" {...line(1.1)} {...goldStroke} strokeWidth={0.9} />
    </motion.g>
  );
}

export default function GoldenThreadSplash({ onDone }) {
  const { t, isAr } = useI18n();
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState(reduce ? 5 : 0);
  const [motionReady, setMotionReady] = useState(false);
  const timers = useRef([]);
  const enterRef = useRef(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SEEN_KEY) === "1") setOpen(false);
    } catch {
      /* Storage unavailable: keep the intro accessible and skippable. */
    }
    setMotionReady(true);
  }, []);

  useEffect(() => {
    if (!open || reduce) return undefined;
    clearTimers();
    timers.current = TIMELINE.map(({ at, stage: next }) => window.setTimeout(() => setStage(next), at));
    return clearTimers;
  }, [open, reduce, clearTimers]);

  useEffect(() => {
    if (!open) return undefined;
    // Lock the document itself, not just <body>: the site header also writes
    // body.style.overflow on mount, which used to release the intro's lock.
    document.documentElement.classList.add("bm-splash-open");
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("bm-splash-open");
    };
  }, [open]);

  useEffect(() => {
    if (open && stage >= 5) {
      const id = window.setTimeout(() => enterRef.current?.focus({ preventScroll: true }), 320);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [open, stage]);

  useEffect(() => {
    const onReplay = () => {
      setStage(reduce ? 5 : 0);
      setOpen(true);
    };
    window.addEventListener("bm:replay-intro", onReplay);
    return () => window.removeEventListener("bm:replay-intro", onReplay);
  }, [reduce]);

  const finish = useCallback(
    (target = "here") => {
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      document.documentElement.setAttribute("data-intro-seen", "1");
      clearTimers();
      setOpen(false);
      window.setTimeout(() => {
        onDone?.();
        if (target === "home") return;
        const heading =
          document.getElementById("hero-title") ||
          document.querySelector("main h1") ||
          document.getElementById("main");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }
      }, 520);
    },
    [clearTimers, onDone]
  );

  const enter = useCallback(() => {
    if (pathname === "/") {
      finish("here");
      return;
    }
    finish("home");
    navigate({ to: "/" });
  }, [finish, navigate, pathname]);

  const skip = useCallback(() => finish("here"), [finish]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="golden-thread"
          role="dialog"
          aria-modal="true"
          aria-label={t({ ar: "مقدمة الهوية — بسمة موسى", en: "Brand intro — Basma Moussa" })}
          className="splash"
          data-stage={stage}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.035 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="splash__ambient" aria-hidden="true" />
          <div className="splash__curtain splash__curtain--top" aria-hidden="true" />
          <div className="splash__curtain splash__curtain--bottom" aria-hidden="true" />
          <Particles />

          {/* The drawing surface stays mounted so the logo reveal feels continuous. */}
          <div className="splash__canvas" aria-hidden="true">
            <svg viewBox="0 0 640 560" className="splash__svg" fill="none">
              <defs>
                <linearGradient id="splash-thread" x1="120" y1="500" x2="520" y2="60" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C6C33" />
                  <stop offset="0.32" stopColor="#D7AB62" />
                  <stop offset="0.62" stopColor="#F8E6BE" />
                  <stop offset="0.84" stopColor="#D7AB62" />
                  <stop offset="1" stopColor="#9C7738" />
                </linearGradient>
                <radialGradient id="splash-mask-fill" cx="50%" cy="38%" r="62%">
                  <stop stopColor="#F2D7A0" stopOpacity="0.28" />
                  <stop offset="0.55" stopColor="#D7AB62" stopOpacity="0.08" />
                  <stop offset="1" stopColor="#7A5A28" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="splash-burst" cx="50%" cy="50%" r="50%">
                  <stop stopColor="#FFF4D8" stopOpacity="0.95" />
                  <stop offset="0.35" stopColor="#F2D7A0" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#D7AB62" stopOpacity="0" />
                </radialGradient>
                <filter id="splash-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* phase A — the golden ignition */}
              {stage === 0 && (
                <g>
                  <motion.circle
                    cx="320"
                    cy="300"
                    r="3"
                    fill="#FFF1CF"
                    filter="url(#splash-glow)"
                    initial={{ opacity: 0, r: 0.5 }}
                    animate={{ opacity: [0, 1, 0.9], r: [0.5, 4, 3] }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx="320"
                    cy="300"
                    r="26"
                    fill="url(#splash-burst)"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: [0, 0.7, 0.3], scale: [0.3, 1, 1.3] }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M320 300 C 300 330 360 350 320 386 C 292 412 330 438 320 470"
                    {...goldStroke}
                    strokeWidth={1.4}
                    initial={{ pathLength: 0, opacity: 0.9 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  />
                </g>
              )}

              {/* phase B — the continuous thread draws the mask */}
              {stage === 1 && (
                <g>
                  <motion.path
                    d="M320 470 C 306 452 330 430 320 400"
                    {...goldStroke}
                    strokeWidth={1.4}
                    initial={{ pathLength: 0, opacity: 0.9 }}
                    animate={{ pathLength: 1, opacity: [0.9, 0.4, 0.15] }}
                    transition={{ pathLength: { duration: 0.7 }, opacity: { duration: 1.5, delay: 0.3 } }}
                  />
                  <TheatreMask animate={motionReady} />
                </g>
              )}

              {/* phase C — the thread resolves into the scales */}
              {stage === 2 && (
                <g>
                  <motion.path
                    d="M320 508 C 320 486 340 462 320 440"
                    {...goldStroke}
                    strokeWidth={1.2}
                    initial={{ pathLength: 0, opacity: 0.8 }}
                    animate={{ pathLength: 1, opacity: [0.8, 0.3, 0] }}
                    transition={{ pathLength: { duration: 0.6 }, opacity: { duration: 1.2, delay: 0.4 } }}
                  />
                  <JusticeScales animate={motionReady} />
                </g>
              )}

              {/* phase D — convergence */}
              {stage === 3 && (
                <g>
                  <motion.circle
                    cx="320"
                    cy="300"
                    fill="url(#splash-burst)"
                    initial={{ r: 8, opacity: 0 }}
                    animate={{ r: [8, 190, 0], opacity: [0, 0.85, 0] }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M320 516 L320 322 M188 300 L312 300 M328 300 L452 300"
                    {...goldStroke}
                    strokeWidth={1.1}
                    initial={{ pathLength: 1, opacity: 0 }}
                    animate={{ pathLength: 0, opacity: [0, 0.75, 0] }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="320"
                    cy="300"
                    r="5"
                    fill="#FFF3D2"
                    filter="url(#splash-glow)"
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.2, 1.6, 0.4] }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </g>
              )}
            </svg>
          </div>

          {/* phase E — the approved identity mark */}
          <div className="splash__brand">
            <motion.div
              className="splash__logo-wrap"
              initial={false}
              animate={{ opacity: stage >= 4 ? 1 : 0, scale: stage >= 4 ? 1 : 0.92 }}
              transition={{ duration: 1.05, ease: EASE }}
            >
              <div className="splash__halo" aria-hidden="true" />
              <img
                src={ASSETS.logo}
                alt={t({ ar: "شعار بسمة موسى", en: "Basma Moussa identity mark" })}
                className="splash__logo"
              />
            </motion.div>

            <motion.div
              className="splash__wordmark"
              initial={false}
              animate={{ opacity: stage >= 4 ? 1 : 0, y: stage >= 4 ? 0 : 14 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            >
              <p className="splash__name">{isAr ? "بسمة موسى" : "Basma Moussa"}</p>
              <div className="splash__rule" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p className="splash__sub">{t({ ar: "عالم الإعلام", en: "Media Universe" })}</p>
            </motion.div>

            <motion.div
              className="splash__invitation"
              initial={false}
              animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 18 }}
              transition={{ duration: 0.8, ease: EASE }}
              aria-hidden={stage < 5}
              style={{ pointerEvents: stage >= 5 ? "auto" : "none" }}
            >
              <button
                ref={enterRef}
                type="button"
                className="splash__enter"
                onClick={enter}
                tabIndex={stage >= 5 ? 0 : -1}
              >
                <span className="splash__enter-ar" lang="ar" dir="rtl">
                  ادخل عالم بسمة
                </span>
                <span className="splash__enter-en" lang="en" dir="ltr">
                  ENTER BASMA&apos;S UNIVERSE
                </span>
              </button>
            </motion.div>
          </div>

          <button type="button" className="splash__skip" onClick={skip}>
            {t({ ar: "تخطّي المقدمة", en: "Skip intro" })}
            <span aria-hidden="true">↗</span>
          </button>

          <p className="splash__note">
            {t({
              ar: "بسمة موسى · الشارقة",
              en: "BASMA MOUSSA · SHARJAH",
            })}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
