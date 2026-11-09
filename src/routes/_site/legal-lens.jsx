import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import CompareSlider from "@/components/CompareSlider";
import { LEGAL_OUTLINES, SOURCES, LEGAL_DISCLAIMER } from "@/lib/experience/worldsContent";
import { ASSETS } from "@/lib/experience/assets";
import { useI18n } from "@/lib/experience/i18n";
import { JusticePrism } from "@/components/media/justice-prism";

const FILTERS = [
  { id: "all", label: { ar: "كل المواضيع", en: "All topics" } },
  { id: "law", label: { ar: "قراءة القانون", en: "Reading the law" } },
  { id: "media", label: { ar: "الإعلام والقانون", en: "Media & law" } },
  { id: "comparison", label: { ar: "سياقات مقارنة", en: "Comparative" } },
];

const REVIEW_DATE = "2026-11-08";

export const Route = createFileRoute("/_site/legal-lens")({
  head: () => ({
    meta: [
      { title: "من زاوية القانون — معرض البحث | The Legal Lens" },
      { name: "description", content: "مخططات تحريرية للتوعية القانونية: فكرة واحدة، مصدر رسمي واحد، وتاريخ مراجعة ظاهر." },
    ],
  }),
  component: LegalLens,
});

function LegalLens() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);

  const items = useMemo(() => LEGAL_OUTLINES.filter((item) => filter === "all" || item.topic === filter), [filter]);

  const sourceFor = (id) => SOURCES.find((source) => source.id === id);

  return (
    <div className="bg-ink-900">
      <div className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8">
        <JusticePrism locale={lang}
          eyebrow={t({ ar: "من زاوية القانون", en: "The Legal Lens" })}
          title={t({ ar: "منشور الرؤى القانونية", en: "The Justice Prism" })}
          lead={t({ ar: "زوايا تحريرية مستندة إلى مصادر رسمية. تصوّرات تعليمية، وليست أحكامًا أو استشارات.", en: "Editorial perspectives with official sources. Educational concepts, not legal advice or judgments." })}
          hint={t({ ar: "اسحب المنشور أو استخدم مفاتيح الأسهم لاختيار زاوية.", en: "Drag the prism or use arrow keys to select a facet." })}
          facetLabel={t({ ar: "الزاوية", en: "Facet" })}
          sourceLabel={t({ ar: "المصدر الرسمي", en: "Official source" })}
          statusLabel={t({ ar: "مخطط تحريري", en: "Editorial outline" })}
          externalLinkLabel={t({ ar: "رابط خارجي", en: "External link" })}
          opensInNewTabLabel={t({ ar: "يفتح في تبويب جديد", en: "Opens in new tab" })}
        />
      </div>
      <header className="relative overflow-hidden border-b border-gold/10 px-5 pb-14 pt-32 sm:px-8 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(50% 60% at 85% 20%, rgba(215,171,98,0.2), transparent 70%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
                <span className="eyebrow">{t({ ar: "معرض البحث", en: "The research gallery" })}</span>
              </div>
              <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.06] text-ivory">
                {t({ ar: "من زاوية القانون", en: "The Legal Lens" })}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/55">
                {t({
                  ar: "مخططات تحريرية للتوعية القانونية: فكرة واحدة، مصدر رسمي واحد، وتاريخ مراجعة ظاهر. هذه الصفحة لا تنشر مقالات مكتملة بعد.",
                  en: "Editorial outlines for legal awareness: one idea, one official source, and a visible review date. This page does not publish finished articles yet.",
                })}
              </p>
              <p className="mt-6 inline-flex items-start gap-2 border border-gold/25 bg-gold/[0.04] px-3 py-2 text-[0.66rem] leading-relaxed text-gold/85">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {t(LEGAL_DISCLAIMER)}
              </p>
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden border border-gold/20 lg:block">
              <Image src={ASSETS.legalLens} alt={t({ ar: "مكتب بحث قانوني توضيحي", en: "Illustrative legal research desk" })} fittingType="fill" className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent" />
              <p className="absolute bottom-3 start-3 text-[0.55rem] uppercase tracking-[0.18em] text-ivory/60">
                {t({ ar: "صورة توضيحية", en: "Illustrative" })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl text-ivory sm:text-3xl">
              {t({ ar: "مخططات قيد الإعداد", en: "Outlines in preparation" })}
            </h2>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  aria-pressed={filter === item.id}
                  className={`border px-3 py-1.5 text-[0.6rem] tracking-[0.14em] transition-colors ${
                    filter === item.id ? "border-gold bg-gold text-ink-900" : "border-ivory/15 text-ivory/55 hover:border-gold/50"
                  }`}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
            {items.map((item) => {
              const open = openId === item.id;
              return (
                <article key={item.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    className="group flex w-full items-start gap-4 py-6 text-start"
                  >
                    <span className="mt-1 hidden text-[0.55rem] tracking-[0.2em] text-gold/60 sm:block">
                      {String(LEGAL_OUTLINES.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl leading-snug text-ivory transition-colors group-hover:text-gold sm:text-2xl">
                        {t(item.title)}
                      </span>
                      <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ivory/50">{t(item.summary)}</span>
                      <span className="mt-3 flex flex-wrap items-center gap-3 text-[0.58rem] uppercase tracking-[0.16em] text-ivory/35">
                        <span className="border border-ivory/15 px-2 py-1">{t({ ar: "مخطط تحريري", en: "Editorial outline" })}</span>
                        <span>{t(item.jurisdiction)}</span>
                        <span>
                          {t({ ar: "مراجعة", en: "Reviewed" })} {REVIEW_DATE}
                        </span>
                      </span>
                    </span>
                    <ChevronDown className={`mt-2 h-4 w-4 shrink-0 text-ivory/40 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>

                  {open && (
                    <div className="grid gap-6 pb-8 sm:ps-10 lg:grid-cols-[1.4fr_1fr]">
                      <div>
                        <p className="text-[0.58rem] uppercase tracking-[0.2em] text-gold/70">
                          {t({ ar: "بنية المقال المخطط", en: "Planned structure" })}
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ivory/60">
                          <li>— {t({ ar: "سؤال البداية: ما الذي يقرره النص فعلًا؟", en: "Opening question: what does the text actually decide?" })}</li>
                          <li>— {t({ ar: "النص الرسمي: اسم المرجع والرابط المباشر.", en: "The official text: reference name and direct link." })}</li>
                          <li>— {t({ ar: "حدود الشرح: ما لا يمكن حسمه دون مختص مرخّص.", en: "The limits: what cannot be settled without a licensed professional." })}</li>
                        </ul>
                        <p className="mt-4 text-[0.66rem] leading-relaxed text-ivory/35">
                          {t({
                            ar: "هذا مخطط فقط. لا يحتوي نصًا قانونيًا ولا استنتاجًا لحالة شخصية.",
                            en: "This is an outline only. It contains no legal text and no conclusion about any individual case.",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.58rem] uppercase tracking-[0.2em] text-gold/70">
                          {t({ ar: "المصادر الرسمية", en: "Official sources" })}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {item.sources.map((sourceId) => {
                            const source = sourceFor(sourceId);
                            if (!source) return null;
                            return (
                              <li key={sourceId}>
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group inline-flex items-center gap-2 text-sm text-ivory/65 transition-colors hover:text-gold"
                                >
                                  {t(source.name)}
                                  <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                                </a>
                                <p className="text-[0.58rem] text-ivory/30">{t(source.kind)}</p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-gold/75">{t({ ar: "قراءة بصرية", en: "Visual reading" })}</p>
              <h2 className="mt-3 font-display text-2xl text-ivory sm:text-3xl">
                {t({ ar: "من البحث إلى الحوار", en: "From research to conversation" })}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/50">
                {t({
                  ar: "عنصر مقارنة يعمل بلوحة المفاتيح لقراءة الفرق بين صفحة البحث الهادئة وحوار الشارع المباشر — الصورتان توضيحيتان للهوية البصرية فقط.",
                  en: "A keyboard-operable comparison for reading the difference between a quiet research page and a direct street conversation — both images illustrate the visual identity only.",
                })}
              </p>
            </div>
            <CompareSlider
              before={ASSETS.legalResearch}
              after={ASSETS.legalDialogue}
              beforeLabel={{ ar: "مكتب البحث", en: "The research desk" }}
              afterLabel={{ ar: "حوار مباشر", en: "The conversation" }}
              altBefore={{ ar: "صورة توضيحية لمكتب بحث", en: "Illustrative research desk" }}
              altAfter={{ ar: "صورة توضيحية لحوار", en: "Illustrative conversation" }}
              caption={{
                ar: "الصور توضيحية للهوية البصرية — لا تمثّل أشخاصًا أو أماكن حقيقية.",
                en: "Illustrative brand imagery — not real people or venues.",
              }}
            />
          </section>
        </div>
      </section>
    </div>
  );
}