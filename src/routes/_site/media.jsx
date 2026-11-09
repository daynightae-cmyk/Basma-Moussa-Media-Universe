import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowUpRight, RotateCcw } from "lucide-react";
import { WORLDS, STATUS_LABEL } from "@/lib/experience/content";
import { useI18n } from "@/lib/experience/i18n";
import { MediaGalaxy } from "@/components/media/media-galaxy";

const CATEGORIES = [
  { id: "all", label: { ar: "الكل", en: "All" } },
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
  const { t, lang } = useI18n();
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
      <h1 className="sr-only">{t({ ar: "عالم الإعلام", en: "The Media Universe" })}</h1>

      {/* The galaxy is the hero: one entrance, no repeated title block above it. */}
      <div className="pt-16">
        <MediaGalaxy locale={lang} />
      </div>

      <section className="border-t border-gold/10 px-5 pb-14 pt-9 sm:px-8 sm:pb-20 sm:pt-12" aria-labelledby="worlds-directory-title">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
                <span className="eyebrow">{t({ ar: "دليل العوالم", en: "The worlds directory" })}</span>
              </div>
              <h2 id="worlds-directory-title" className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08] text-ivory">
                {t({ ar: "ستة أبواب، بترتيب واحد.", en: "Six doors, in one order." })}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/50 sm:text-base">
                {t({
                  ar: "جدول تحريري لكل عالم: الفكرة، الحالة، والمدخل. استخدم البحث أو النوع للوصول السريع — من دون تكرار الصور.",
                  en: "An editorial index for every world: the idea, the status, and the entrance. Search or filter to jump straight in — without repeating the imagery.",
                })}
              </p>
            </div>

            <label className="relative flex w-full max-w-sm items-center">
              <Search className="pointer-events-none absolute start-4 h-4 w-4 text-ivory/35" aria-hidden="true" />
              <span className="sr-only">{t({ ar: "ابحث في العوالم", en: "Search worlds" })}</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t({ ar: "ابحث بعنوان أو موضوع…", en: "Search by title or theme…" })}
                className="w-full border border-ivory/15 bg-ink-800/70 py-3 ps-11 pe-4 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold/60 focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-ivory/10 py-3">
            <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
              {CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={category === item.id}
                  className={`shrink-0 border px-3 py-1.5 text-[0.6rem] tracking-[0.12em] transition-colors ${
                    category === item.id
                      ? "border-gold bg-gold text-ink-900"
                      : "border-ivory/15 text-ivory/55 hover:border-gold/50 hover:text-ivory"
                  }`}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>
            <p className="text-[0.6rem] tracking-wide text-ivory/32" aria-live="polite">
              {t({
                ar: `${results.length} من ${WORLDS.length} عوالم`,
                en: `${results.length} of ${WORLDS.length} worlds`,
              })}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="border-b border-ivory/10 px-2 py-16 text-center">
              <p className="font-display text-2xl text-ivory">{t({ ar: "لا نتائج مطابقة", en: "No matching worlds" })}</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ivory/45">
                {t({
                  ar: "جرّب كلمة أوسع أو أعد الضبط. كل العوالم هنا مفاهيم قيد التطوير، وليست حلقات منشورة.",
                  en: "Try a broader word or reset. Every world here is a concept in development, never a published episode.",
                })}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="mt-6 inline-flex items-center gap-2 border border-gold/40 px-4 py-2 text-[0.62rem] tracking-[0.14em] text-gold"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ ar: "عرض كل العوالم", en: "Show all worlds" })}
              </button>
            </div>
          ) : (
            <ol className="mt-1">
              {results.map((world) => (
                <li key={world.id}>
                  <Link
                    to={world.href}
                    className="group grid grid-cols-[2.2rem_1fr_auto] items-start gap-4 border-b border-ivory/10 py-5 transition-colors hover:bg-gold/[0.035] sm:grid-cols-[3rem_1.15fr_1fr_auto] sm:items-center sm:gap-6 sm:py-6"
                  >
                    <span className="pt-1 font-display text-lg leading-none text-gold/55 sm:text-xl">
                      {String(WORLDS.findIndex((entry) => entry.id === world.id) + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow block text-gold/75">{t(world.kicker)}</span>
                      <span className="mt-1.5 block font-display text-xl leading-tight text-ivory transition-colors group-hover:text-gold-light sm:text-2xl">
                        {t(world.title)}
                      </span>
                    </span>
                    <span className="hidden max-w-md text-sm leading-relaxed text-ivory/45 sm:block">
                      {t(world.teaser)}
                    </span>
                    <span className="flex items-center gap-3 self-center">
                      <span className="hidden whitespace-nowrap text-[0.55rem] uppercase tracking-[0.16em] text-ivory/32 md:inline">
                        {t(STATUS_LABEL[world.status])}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}

          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ivory/32">
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
