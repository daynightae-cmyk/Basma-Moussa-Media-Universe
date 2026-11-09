import { ArrowUpRight } from "lucide-react";
import PortalLink from "@/components/navigation/PortalLink";
import { Image } from "@/components/ui/image";
import { WORLDS, STATUS_LABEL } from "@/lib/experience/content";
import { useI18n } from "@/lib/experience/i18n";

const spans = {
  wide: "md:col-span-2 aspect-[16/10] md:aspect-[16/9]",
  tall: "aspect-[4/5] md:aspect-[3/4]",
  editorial: "aspect-[4/3] md:aspect-[4/3]",
};

export default function WorldPortals() {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {WORLDS.map((world, index) => (
        <PortalLink
          key={world.id}
          to={world.href}
          label={t(world.title)}
          className={`group relative overflow-hidden border border-gold/15 bg-ink-800 lift hover:border-gold/45 ${spans[world.shape]}`}
          ariaLabel={`${t(world.title)} — ${t(world.kicker)}`}
        >
          <Image
            src={world.image}
            alt={t({ ar: `صورة توضيحية لعالم ${t(world.title)}`, en: `Illustrative imagery for ${t(world.title)}` })}
            fittingType="fill"
            className="absolute inset-0 h-full w-full scale-[1.02] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/10" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(90% 60% at 50% 100%, rgba(215,171,98,0.22), transparent 70%)" }} />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <span className="border border-ivory/20 bg-ink-900/40 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-ivory/70 backdrop-blur-sm">
              {t(world.category)}
            </span>
            <span className="text-[0.55rem] tracking-[0.2em] text-gold/70">{String(index + 1).padStart(2, "0")}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="eyebrow text-gold/80">{t(world.kicker)}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ivory sm:text-[1.75rem]">{t(world.title)}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/55 opacity-0 transition-all duration-500 group-hover:opacity-100 md:mt-2">
              {t(world.teaser)}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-ivory/10 pt-3">
              <span className="text-[0.55rem] uppercase tracking-[0.18em] text-ivory/40">{t(STATUS_LABEL[world.status])}</span>
              <span className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                {t({ ar: "ادخل", en: "Enter" })}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </PortalLink>
      ))}
    </div>
  );
}