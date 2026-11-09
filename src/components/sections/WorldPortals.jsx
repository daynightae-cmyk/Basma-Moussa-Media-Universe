import { ArrowUpRight } from "lucide-react";
import PortalLink from "@/components/navigation/PortalLink";
import { Image } from "@/components/ui/image";
import { WORLDS, STATUS_LABEL } from "@/lib/experience/content";
import { useI18n } from "@/lib/experience/i18n";

/* An editorial constellation rather than six identical cards: the first world
   owns the widest frame, the last row closes on a wide cinematic band. */
const LAYOUT = {
  beyond: { wrap: "aspect-[16/10] md:col-span-8 md:aspect-[16/9]", rank: "primary" },
  soundroom: { wrap: "aspect-[4/3] md:col-span-4 md:aspect-auto md:h-full", rank: "tall" },
  legal: { wrap: "aspect-[4/3] md:col-span-4 md:aspect-[3/4]", rank: "tall" },
  stories: { wrap: "aspect-[16/10] md:col-span-8 md:aspect-auto md:h-full", rank: "band" },
  studio: { wrap: "aspect-[16/10] md:col-span-8 md:aspect-[16/9]", rank: "wide" },
  ai: { wrap: "aspect-[4/3] md:col-span-4 md:aspect-auto md:h-full", rank: "wide" },
};

export default function WorldPortals() {
  const { t } = useI18n();

  return (
    <div className="world-portals relative">
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-40 210C220 40 520 250 760 120s380 30 520-60"
          fill="none"
          stroke="rgba(215,171,98,0.26)"
          strokeWidth="1"
        />
        <path
          d="M-40 690C260 520 470 740 720 610s340 26 560-90"
          fill="none"
          stroke="rgba(215,171,98,0.18)"
          strokeWidth="1"
        />
      </svg>

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(0,auto)]">
        {WORLDS.map((world, index) => {
          const layout = LAYOUT[world.id] ?? LAYOUT.ai;
          const tall = layout.rank === "tall" || layout.rank === "band";
          return (
            <PortalLink
              key={world.id}
              to={world.href}
              label={t(world.title)}
              className={`group relative overflow-hidden bg-ink-800 lift ${layout.wrap}`}
              ariaLabel={`${t(world.title)} — ${t(world.kicker)}`}
            >
              <Image
                src={world.image}
                alt={t({
                  ar: `صورة توضيحية لعالم ${t(world.title)}`,
                  en: `Illustrative imagery for ${t(world.title)}`,
                })}
                fittingType="fill"
                className="absolute inset-0 h-full w-full scale-[1.02] transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,15,0.15)_0%,rgba(5,8,15,0.05)_38%,rgba(5,8,15,0.86)_100%)]" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "radial-gradient(100% 70% at 50% 100%, rgba(215,171,98,0.2), transparent 72%)" }}
                aria-hidden="true"
              />

              {/* fine architectural corners replace a heavy border */}
              <span className="pointer-events-none absolute inset-3 border border-ivory/[0.06] opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                <span className="text-[0.55rem] uppercase tracking-[0.22em] text-ivory/70">
                  {t(world.category)}
                </span>
                <span className="font-display text-lg leading-none text-gold/75">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={`absolute inset-x-0 bottom-0 ${tall ? "p-5" : "p-5 sm:p-6"}`}>
                <p className="eyebrow text-gold/85">{t(world.kicker)}</p>
                <h3
                  className={`mt-2 font-display leading-[1.08] text-ivory ${
                    layout.rank === "primary" ? "text-[clamp(1.9rem,3.2vw,2.9rem)]" : "text-2xl sm:text-[1.65rem]"
                  }`}
                >
                  {t(world.title)}
                </h3>
                <p
                  className={`mt-2 max-w-md text-[0.82rem] leading-relaxed text-ivory/55 ${
                    tall ? "hidden xl:block" : "hidden sm:block"
                  }`}
                >
                  {t(world.teaser)}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-ivory/12 pt-3">
                  <span className="text-[0.55rem] uppercase tracking-[0.16em] text-ivory/40">
                    {t(STATUS_LABEL[world.status])}
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                    {t({ ar: "ادخل", en: "Enter" })}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </PortalLink>
          );
        })}
      </div>
    </div>
  );
}
