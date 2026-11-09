import "@/styles/production/legal-lenses.css";
import { useMemo, useState } from "react";
import { ArrowUpRight, Landmark, Scale, ShieldCheck } from "lucide-react";
import { LEGAL_OUTLINES, SOURCES, LEGAL_DISCLAIMER } from "@/lib/experience/worldsContent";
import { useI18n } from "@/lib/experience/i18n";

const REVIEW_DATE = "2026-11-08";

const LENSES = [
  {
    numeral: "I",
    label: { ar: "السؤال", en: "The question" },
    hint: { ar: "نبدأ بما يجب أن يُسأل، لا بالجواب الجاهز.", en: "We begin with what must be asked, not a ready answer." },
  },
  {
    numeral: "II",
    label: { ar: "المصدر القانوني", en: "The legal source" },
    hint: { ar: "نص رسمي يمكنك فتحه والتحقق منه بنفسك.", en: "An official text you can open and verify yourself." },
  },
  {
    numeral: "III",
    label: { ar: "السياق", en: "The context" },
    hint: { ar: "حدود القراءة، والفرق بين الشرح والاستشارة.", en: "The limits of the reading, and the line between explanation and advice." },
  },
];

export function LegalLenses() {
  const { t, isAr } = useI18n();
  const [activeId, setActiveId] = useState(LEGAL_OUTLINES[0].id);

  const activeIndex = Math.max(
    0,
    LEGAL_OUTLINES.findIndex((item) => item.id === activeId)
  );
  const outline = LEGAL_OUTLINES[activeIndex];
  const sources = useMemo(
    () => outline.sources.map((id) => SOURCES.find((source) => source.id === id)).filter(Boolean),
    [outline]
  );

  return (
    <section className="legal-lenses" id="reading-lenses" aria-labelledby="legal-lenses-title">
      <div className="legal-lenses__beam" aria-hidden="true" />
      <span className="legal-lenses__ghost" aria-hidden="true">
        {isAr ? "القانون" : "LEX"}
      </span>

      <div className="shell shell--wide relative">
        <header className="legal-lenses__head">
          <p className="eyebrow eyebrow-gold">{t({ ar: "ثلاث عدسات", en: "Three lenses" })}</p>
          <h2 id="legal-lenses-title" className="display display-m">
            {t({
              ar: "قبل أي استنتاج: اسأل، ثم ارجع إلى المصدر، ثم ضع السياق.",
              en: "Before any conclusion: ask, return to the source, then set the context.",
            })}
          </h2>
          <p className="lead">
            {t({
              ar: "كل ملف يُقرأ عبر ثلاث طبقات منفصلة. لا ننشر حكمًا ولا نختصر المصدر؛ نعرض ما يمكن التحقق منه وما يبقى خارج نطاق هذا المخطط.",
              en: "Every file is read through three separate layers. We publish no verdict and do not summarise away the source; we show what can be verified and what stays outside this outline.",
            })}
          </p>
        </header>

        <div className="legal-lenses__layout">
          <nav className="legal-index" aria-label={t({ ar: "ملفات البحث القانوني", en: "Legal research files" })}>
            <div className="legal-index__cap">
              <Scale className="h-4 w-4 text-gold" aria-hidden="true" />
              <span>{t({ ar: "أرشيف المخططات", en: "Outline archive" })}</span>
            </div>
            {LEGAL_OUTLINES.map((item, index) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`legal-index__item ${active ? "is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => setActiveId(item.id)}
                >
                  <span className="legal-index__num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="legal-index__body">
                    <span className="legal-index__title">{t(item.title)}</span>
                    <span className="legal-index__meta">{t(item.jurisdiction)}</span>
                  </span>
                  <span className="legal-index__mark" aria-hidden="true" />
                </button>
              );
            })}
            <div className="legal-index__foot">
              <span>{t({ ar: "مراجعة", en: "Reviewed" })}</span>
              <time dateTime={REVIEW_DATE}>{REVIEW_DATE}</time>
            </div>
          </nav>

          <div className="legal-reading" role="region" aria-live="polite" aria-labelledby="legal-reading-title">
            <div className="legal-reading__top">
              <span>
                {t({ ar: "ملف", en: "File" })} {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(LEGAL_OUTLINES.length).padStart(2, "0")}
              </span>
              <span className="legal-reading__status">
                <span className="legal-reading__dot" aria-hidden="true" />
                {t({ ar: "مخطط تحريري · لا حكم ولا استشارة", en: "Editorial outline · no verdict, no advice" })}
              </span>
            </div>

            <div className="legal-reading__grid">
              {LENSES.map((lens) => (
                <article key={lens.numeral} className={`legal-lens legal-lens--${lens.numeral.toLowerCase()}`}>
                  <header className="legal-lens__head">
                    <span className="legal-lens__numeral" aria-hidden="true">
                      {lens.numeral}
                    </span>
                    <div>
                      <p className="legal-lens__label">{t(lens.label)}</p>
                      <p className="legal-lens__hint">{t(lens.hint)}</p>
                    </div>
                  </header>

                  {lens.numeral === "I" && (
                    <div className="legal-lens__content">
                      <h3 id="legal-reading-title">{t(outline.title)}</h3>
                      <p className="legal-lens__question">{t(outline.question)}</p>
                      <p className="legal-lens__body">{t(outline.summary)}</p>
                      <p className="legal-lens__tag">{t({ ar: "سؤال البداية", en: "Opening question" })}</p>
                    </div>
                  )}

                  {lens.numeral === "II" && (
                    <div className="legal-lens__content">
                      <p className="legal-lens__jurisdiction">
                        <Landmark className="h-3.5 w-3.5" aria-hidden="true" />
                        {t(outline.jurisdiction)}
                      </p>
                      <ul className="legal-lens__sources">
                        {sources.map((source) => (
                          <li key={source.id}>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="legal-source"
                            >
                              <span className="legal-source__name">
                                {t(source.name)}
                                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </span>
                              <span className="legal-source__kind">{t(source.kind)}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      <p className="legal-lens__tag">{t({ ar: "يفتح في تبويب جديد", en: "Opens in a new tab" })}</p>
                    </div>
                  )}

                  {lens.numeral === "III" && (
                    <div className="legal-lens__content">
                      <p className="legal-lens__body">{t(outline.context)}</p>
                      <div className="legal-lens__limit">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden="true" />
                        <p>{t(LEGAL_DISCLAIMER)}</p>
                      </div>
                      <p className="legal-lens__tag">
                        {t({ ar: "ما لا يقرره هذا المخطط", en: "What this outline does not decide" })}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
