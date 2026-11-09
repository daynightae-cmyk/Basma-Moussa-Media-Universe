import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { ASSETS } from "@/lib/experience/assets";
import { ABOUT_COPY } from "@/lib/experience/worldsContent";
import { useI18n } from "@/lib/experience/i18n";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "عن بسمة — عن بسمة موسى | Basma Moussa" },
      { name: "description", content: "بسمة موسى — صوت إعلامي، وبحث قانوني، ورؤية تُبنى في الإمارات." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();

  return (
    <div className="bg-ink-900">
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="absolute -inset-3 border border-gold/25 arch" aria-hidden="true" />
            <div className="relative overflow-hidden arch">
              <Image
                src={ASSETS.legalPortrait}
                alt={t({ ar: "بورتريه توضيحي للهوية البصرية", en: "Illustrative identity portrait" })}
                fittingType="fill"
                className="aspect-[3/4] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
            </div>
            <p className="mt-4 text-[0.6rem] leading-relaxed text-ivory/35">
              {t({ ar: "صورة توضيحية معتمدة للهوية البصرية — ليست توثيقًا لحدث حقيقي.", en: "Approved illustrative identity image — not documentation of a real event." })}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
              <span className="eyebrow">{t(ABOUT_COPY.eyebrow)}</span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.06] text-ivory">
              {t(ABOUT_COPY.title)}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/60">{t(ABOUT_COPY.lead)}</p>

            <div className="mt-8 grid gap-5 border-t border-ivory/10 pt-6 sm:grid-cols-3">
              {ABOUT_COPY.focus.map((item) => (
                <div key={item.title.en}>
                  <p className="eyebrow text-gold/70">{t(item.title)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/55">{t(item.body)}</p>
                </div>
              ))}
            </div>

            <Link
              to="/media"
              className="group mt-9 inline-flex items-center gap-2 border border-gold/40 px-5 py-3 text-[0.68rem] tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink-900"
            >
              {t({ ar: "استكشف عالم الإعلام", en: "Explore the Media Universe" })}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gold/10 bg-ink-800 px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2">
          <div className="border border-ivory/10 p-6">
            <p className="eyebrow text-gold/75">{t(ABOUT_COPY.accuracyTitle)}</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/55">{t(ABOUT_COPY.accuracyBody)}</p>
          </div>
          <div className="border border-ivory/10 p-6">
            <p className="eyebrow text-gold/75">{t(ABOUT_COPY.verifiedTitle)}</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/55">{t(ABOUT_COPY.verifiedBody)}</p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1400px]">
          <p className="max-w-2xl border-s-2 border-gold/30 ps-4 text-xs leading-relaxed text-ivory/35">
            {t(ABOUT_COPY.honestyNote)}
          </p>
        </div>
      </section>
    </div>
  );
}