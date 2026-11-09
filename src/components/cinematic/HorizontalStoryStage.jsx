import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import GoldWave from "./GoldWave";
import { CHAPTERS } from "@/lib/experience/content";
import { useI18n } from "@/lib/experience/i18n";

const COUNT = CHAPTERS.length;

export default function HorizontalStoryStage() {
  const { t, isAr } = useI18n();
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(wide.matches && !still.matches);
    update();
    wide.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!pinned) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const raw = -el.getBoundingClientRect().top / total;
        setProgress(Math.min(1, Math.max(0, raw)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned]);

  const active = Math.round(progress * (COUNT - 1));

  const jump = (index) => {
    const clamped = Math.min(COUNT - 1, Math.max(0, index));
    if (!pinned) {
      document.getElementById(`chapter-${clamped}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    const target = start + (clamped / (COUNT - 1)) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section aria-label={t({ ar: "رحلة الحكاية الأفقية", en: "Horizontal story journey" })} className="relative bg-ink-900">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 pb-8 pt-16 sm:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            <span className="eyebrow">{t({ ar: "الرحلة", en: "The journey" })}</span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-ivory">
            {t({ ar: "خمسة فصول، حركة واحدة.", en: "Five chapters, one movement." })}
          </h2>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => jump(active - 1)}
            className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            aria-label={t({ ar: "الفصل السابق", en: "Previous chapter" })}
          >
            {isAr ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => jump(active + 1)}
            className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            aria-label={t({ ar: "الفصل التالي", en: "Next chapter" })}
          >
            {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {pinned ? (
        <div ref={wrapRef} style={{ height: `${COUNT * 100}vh` }} className="relative">
          <div dir="ltr" className="sticky top-0 h-screen overflow-hidden">
            <div
              dir="ltr"
              className="flex h-full will-change-transform"
              style={{
                width: `${COUNT * 100}%`,
                transform: `translate3d(-${progress * (COUNT - 1) * (100 / COUNT)}%, 0, 0)`,
                transition: "transform 120ms linear",
              }}
            >
              {CHAPTERS.map((chapter, index) => (
                <ChapterPanel key={chapter.id} chapter={chapter} index={index} active={index === active} />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 start-4 z-20 hidden flex-col items-center justify-center gap-3 sm:flex" aria-hidden="true">
              {CHAPTERS.map((chapter, index) => (
                <span
                  key={chapter.id}
                  className={`h-8 w-px transition-all duration-500 ${
                    index === active ? "bg-gold" : "bg-ivory/15"
                  }`}
                />
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 border-t border-ivory/10 bg-ink-900/85 backdrop-blur-sm">
              <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 py-3 sm:px-8">
                <span className="text-[0.6rem] tracking-[0.2em] text-gold/80">
                  {t(CHAPTERS[active].number)}
                </span>
                <div className="h-px flex-1 bg-ivory/10">
                  <div className="h-px bg-gold/70" style={{ width: `${((active + 1) / COUNT) * 100}%` }} />
                </div>
                <span className="text-[0.6rem] tracking-[0.2em] text-ivory/35">
                  {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-10 sm:px-8">
          {CHAPTERS.map((chapter, index) => (
            <div key={chapter.id} id={`chapter-${index}`} className="w-[86vw] shrink-0 snap-center sm:w-[70vw]">
              <ChapterPanel chapter={chapter} index={index} active compact />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ChapterPanel({ chapter, index, active, compact = false }) {
  const { t, isAr } = useI18n();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const isFrequency = chapter.atmosphere === "frequency";
  const isLegal = chapter.atmosphere === "legal";
  const isCity = chapter.atmosphere === "city";

  const stage = isFrequency
    ? "items-center justify-center text-center"
    : isLegal
      ? "items-end justify-end"
      : "items-start justify-end";

  return (
    <article
      dir={isAr ? "rtl" : "ltr"}
      className={`group relative h-screen w-full overflow-hidden ${compact ? "!h-[72vh]" : ""}`}
      aria-current={active ? "true" : undefined}
    >
      <Image
        src={chapter.image}
        alt={t({ ar: `صورة توضيحية — ${t(chapter.title)}`, en: `Illustrative image — ${t(chapter.title)}` })}
        fittingType="fill"
        className={`absolute inset-0 h-full w-full ${isFrequency ? "opacity-30" : ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/30" />
      {isFrequency && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-80">
          <GoldWave mode="slow" className="h-[40vh] w-full" bars={90} height={300} />
        </div>
      )}
      {isCity && (
        <div className="pointer-events-none absolute inset-y-10 end-6 hidden w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:block" aria-hidden="true" />
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-ivory/5" aria-hidden="true" />

      <span
        className={`pointer-events-none absolute hidden select-none font-display leading-none text-ivory/[0.055] lg:block ${
          isLegal ? "bottom-16 end-10 text-[18vw]" : "top-14 start-10 text-[22vw]"
        }`}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={`relative z-10 mx-auto flex h-full max-w-[1400px] px-6 pb-24 pt-24 sm:px-12 lg:px-20 ${stage}`}>
        <div
          className={`${
            isFrequency
              ? "max-w-2xl border-y border-gold/25 px-6 py-10 sm:px-12"
              : isLegal
                ? "max-w-xl border-e border-gold/40 pe-5 text-end sm:pe-7"
                : "max-w-xl border-s border-gold/40 ps-5 sm:ps-7"
          }`}
        >
          <p className="eyebrow text-gold/85">{t(chapter.number)}</p>
          <h3 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.12] text-ivory">
            {t(chapter.title)}
          </h3>
          <p className={`mt-4 max-w-md text-sm leading-relaxed text-ivory/60 sm:text-base ${isLegal ? "ms-auto" : ""}`}>
            {t(chapter.lead)}
          </p>
          <Link
            to={chapter.cta.href}
            className={`group/link mt-6 inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-[0.68rem] tracking-[0.18em] text-gold transition-colors hover:border-gold ${
              isFrequency ? "justify-center" : ""
            }`}
          >
            {t(chapter.cta.label)}
            <Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
          </Link>
        </div>
      </div>

      <div
        className={`absolute top-20 z-10 hidden items-center gap-3 text-[0.55rem] uppercase tracking-[0.24em] text-ivory/40 sm:flex ${
          isLegal ? "start-8" : "end-8"
        }`}
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-gold/40" />
        {t(chapter.number)}
      </div>
    </article>
  );
}