import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowUpRight, RotateCcw } from "lucide-react";
import { Image } from "@/components/ui/image";
import { WORLDS, STATUS_LABEL } from "@/lib/experience/content";
import { useI18n } from "@/lib/experience/i18n";

const CATEGORIES = [
  { id: "all", label: { ar: "كل العوالم", en: "All worlds" } },
  { id: "conversation", label: { ar: "حوارات", en: "Conversation" } },
  { id: "audio", label: { ar: "صوت", en: "Audio" } },
  { id: "legal", label: { ar: "قانون", en: "Legal" } },
  { id: "documentary", label: { ar: "وثائقي", en: "Documentary" } },
  { id: "production", label: { ar: "إنتاج", en: "Production" } },
  { id: "intelligence", label: { ar: "ذكاء", en: "Intelligence" } },
];

function categoryFor(id) {
  if (id === "beyond") return "conversation";
  if (id === "soundroom") return "audio";
  if (id === "legal") return "legal";
  if (id === "stories") return "documentary";
  if (id === "studio") return "production";
  return "intelligence";
}

export const Route = createFileRoute("/_site/media")({
  head: () => ({
    meta: [
      { title: "عالم الإعلام — خريطة العوالم | Media Universe" },
      { name: "description", content: "ستة عوالم، كل واحد بيئة تفاعل مختلفة: حوار، صوت، قانون، وثائقي، إنتاج، وذكاء حواري." },
    ],
  }),
  component: Media,
});

function Media() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORLDS.map((world) => ({ ...world, cat: categoryFor(world.id) })).filter((world) => {
      const inCategory = category === "all" || world.cat === category;
      if (!inCategory) return false;
      if (!q) return true;
      return [t(world.title), t(world.kicker), t(world.teaser), t(world.category)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, category, t]);

  return (
    <div className="bg-ink-900">
      <header className="border-b border-gold/10 px-5 pb-14 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            <span className="eyebrow">{t({ ar: "خريطة العوالم", en: "The universe map" })}</span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.08] text-ivory">
            {t({ ar: "عالم الإعلام", en: "The Media Universe" })}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/55">
            {t({
              ar: "ستة عوالم، كل واحد بيئة تفاعل مختلفة. ابحث بالعنوان أو الموضوع، أو صفِّ حسب النوع.",
              en: "Six worlds, each a different interaction environment. Search by title or theme, or filter by kind.",
            })}
          </p>

          <div className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative flex w-full max-w-md items-center">
              <Search className="pointer-events-none absolute start-4 h-4 w-4 text-ivory/35" aria-hidden="true" />
              <span className="sr-only">{t({ ar: "ابحث في العوالم", en: "Search worlds" })}</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({ ar: "ابحث بعنوان أو موضوع…", en: "Search by title or theme…" })}
                className="w-full border border-ivory/15 bg-ink-800/70 py-3 ps-11 pe-4 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold/60 focus:outline-none"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={category === item.id}
                  className={`border px-3 py-1.5 text-[0.62rem] tracking-[0.14em] transition-colors ${
                    category === item.id
                      ? "border-gold bg-gold text-ink-900"
                      : "border-ivory/15 text-ivory/60 hover:border-gold/50 hover:text-ivory"
                  }`}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 text-[0.62rem] tracking-wide text-ivory/35" aria-live="polite">
            {results.length === 1
              ? t({ ar: "عالَم واحد", en: "1 world" })
              : t({ ar: `${results.length} عوالم`, en: `${results.length} worlds` })}
          </p>
        </div>
      </header>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          {results.length === 0 ? (
            <div className="border border-ivory/10 bg-ink-800/60 px-6 py-16 text-center">
              <p className="font-display text-2xl text-ivory">{t({ ar: "لا نتائج مطابقة", en: "No matching worlds" })}</p>
              <p className="mx-auto mt-3 max-w-md text-sm text-ivory/45">
                {t({
                  ar: "جرّب كلمة أوسع أو أعد الضبط. كل العوالم هنا مفاهيم حقيقية قيد التطوير، وليست حلقات منشورة.",
                  en: "Try a broader word or reset. Every world here is a genuine concept in development, never a published episode.",
                })}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="mt-6 inline-flex items-center gap-2 border border-gold/40 px-4 py-2 text-[0.65rem] tracking-[0.16em] text-gold"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t({ ar: "عرض كل العوالم", en: "Show all worlds" })}
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((world) => (
                <Link
                  key={world.id}
                  to={world.href}
                  className="group relative aspect-[4/3] overflow-hidden border border-gold/15 bg-ink-800 lift hover:border-gold/45"
                >
                  <Image src={world.image} alt="" fittingType="fill" className="absolute inset-0 h-full w-full transition-transform duration-[1300ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="eyebrow text-gold/80">{t(world.kicker)}</p>
                    <h2 className="mt-2 font-display text-2xl text-ivory">{t(world.title)}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/50">{t(world.teaser)}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-ivory/10 pt-3">
                      <span className="text-[0.55rem] uppercase tracking-[0.16em] text-ivory/40">{t(STATUS_LABEL[world.status])}</span>
                      <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-ivory/35">
            {t({
              ar: "الصور في هذه العوالم توضيحية للهوية البصرية. المنصة تصور قيد التطوير: لا حلقات منشورة، ولا بثّ حيّ، ولا استشارات قانونية.",
              en: "Imagery across these worlds is illustrative brand art. The platform is a concept in development: no published episodes, no live broadcast, no legal advice.",
            })}
          </p>
        </div>
      </section>
    </div>
  );
}