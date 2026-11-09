import { useState } from "react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/experience/i18n";

/**
 * Accessible before/after comparison. Keyboard operable through a native range
 * input; the two frames must be legitimate, clearly labelled image pairs.
 */
export default function CompareSlider({ before, after, beforeLabel, afterLabel, caption, altBefore, altAfter }) {
  const { t } = useI18n();
  const [value, setValue] = useState(50);

  return (
    <figure className="w-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-gold/20 bg-ink-800">
        <Image src={after} alt={t(altAfter)} fittingType="fill" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
          <Image src={before} alt={t(altBefore)} fittingType="fill" className="absolute inset-0 h-full w-full" style={{ width: `${(100 / Math.max(value, 1)) * 100}%` }} />
        </div>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${value}%` }} aria-hidden="true">
          <span className="absolute inset-y-0 -ms-px w-px bg-gold/80" />
          <span className="absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-ink-900/80 text-[0.5rem] text-gold">
            ⇄
          </span>
        </div>

        <span className="pointer-events-none absolute bottom-3 start-3 border border-ivory/20 bg-ink-900/70 px-2 py-1 text-[0.55rem] tracking-[0.14em] text-ivory/70 backdrop-blur-sm">
          {t(beforeLabel)}
        </span>
        <span className="pointer-events-none absolute bottom-3 end-3 border border-ivory/20 bg-ink-900/70 px-2 py-1 text-[0.55rem] tracking-[0.14em] text-ivory/70 backdrop-blur-sm">
          {t(afterLabel)}
        </span>
      </div>

      <label className="mt-3 block">
        <span className="sr-only">{t({ ar: "اسحب للمقارنة بين اللقطتين", en: "Drag to compare the two frames" })}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-gold"
          aria-valuetext={`${value}%`}
        />
      </label>
      {caption && <figcaption className="mt-2 text-[0.62rem] leading-relaxed text-ivory/35">{t(caption)}</figcaption>}
    </figure>
  );
}