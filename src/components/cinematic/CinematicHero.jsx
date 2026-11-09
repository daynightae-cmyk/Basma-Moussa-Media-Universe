import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import HeroScene from "./HeroScene";
import { HERO_SCENES } from "@/lib/experience/content";
import { useI18n } from "@/lib/experience/i18n";

const DURATION = 8000;

export default function CinematicHero() {
  const { t, isAr } = useI18n();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const pointer = useRef({ x: 0, active: false });

  const go = useCallback((next) => {
    setIndex((current) => (next + HERO_SCENES.length) % HERO_SCENES.length);
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const id = window.setTimeout(() => go(index + 1), DURATION);
    return () => window.clearTimeout(id);
  }, [index, playing, go]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight") {
        setPlaying(false);
        go(index + (isAr ? -1 : 1));
      }
      if (event.key === "ArrowLeft") {
        setPlaying(false);
        go(index + (isAr ? 1 : -1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, isAr]);

  const scene = HERO_SCENES[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t({ ar: "المشاهد السينمائية", en: "Cinematic scenes" })}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-900"
      onPointerDown={(e) => {
        pointer.current = { x: e.clientX, active: true };
      }}
      onPointerUp={(e) => {
        if (!pointer.current.active) return;
        const delta = e.clientX - pointer.current.x;
        pointer.current.active = false;
        if (Math.abs(delta) > 60) {
          setPlaying(false);
          go(index + (delta < 0 ? 1 : -1));
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scene.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroScene scene={scene} />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 pb-8 sm:px-8 sm:pb-10">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  go(index - 1);
                }}
                className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                aria-label={t({ ar: "المشهد السابق", en: "Previous scene" })}
              >
                {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  go(index + 1);
                }}
                className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                aria-label={t({ ar: "المشهد التالي", en: "Next scene" })}
              >
                {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-ivory/55 transition-colors hover:text-gold"
              aria-label={t(playing ? { ar: "إيقاف التشغيل التلقائي", en: "Pause auto-advance" } : { ar: "تشغيل التلقائي", en: "Resume auto-advance" })}
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {t(playing ? { ar: "إيقاف", en: "Pause" } : { ar: "تشغيل", en: "Play" })}
            </button>
          </div>

          <div className="flex items-center gap-3" role="tablist" aria-label={t({ ar: "المشاهد", en: "Scenes" })}>
            {HERO_SCENES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={t({ ar: `المشهد ${i + 1}: ${t(item.title)}`, en: `Scene ${i + 1}: ${t(item.title)}` })}
                onClick={() => {
                  setPlaying(false);
                  setIndex(i);
                }}
                className="group relative h-8 w-10 overflow-hidden"
              >
                <span
                  className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition-colors ${
                    i === index ? "bg-gold" : "bg-ivory/25 group-hover:bg-ivory/60"
                  }`}
                />
                {i === index && playing && (
                  <motion.span
                    key={`${scene.id}-progress`}
                    className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-gold-light"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    style={{ transformOrigin: isAr ? "right" : "left" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 end-5 xl:flex" aria-hidden="true">
        <span className="text-[0.55rem] tracking-[0.24em] text-gold/70">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-16 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        <span className="text-[0.55rem] tracking-[0.24em] text-ivory/30">{String(HERO_SCENES.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}