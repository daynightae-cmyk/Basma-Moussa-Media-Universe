import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Scale, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import CompareSlider from "@/components/CompareSlider";
import { SOURCES, LEGAL_DISCLAIMER, LEGAL_OUTLINES } from "@/lib/experience/worldsContent";
import { ASSETS } from "@/lib/experience/assets";
import { useI18n } from "@/lib/experience/i18n";
import { LegalLenses } from "@/components/media/legal-lenses";

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
  const { t, isAr } = useI18n();

  return (
    <div className="bg-ink-900">
      <header className="legal-hero relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
        <div className="legal-hero__beam" aria-hidden="true" />
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
                <span className="eyebrow eyebrow-gold">{t({ ar: "معرض البحث", en: "The research gallery" })}</span>
              </div>
              <h1
                id="hero-title"
                className="mt-5 max-w-2xl font-display text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.02] text-ivory"
              >
                {t({ ar: "من زاوية القانون", en: "The Legal Lens" })}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/58 sm:text-lg">
                {t({
                  ar: "مخططات تحريرية للتوعية القانونية: فكرة واحدة، مصدر رسمي واحد، وتاريخ مراجعة ظاهر. هذه الصفحة لا تنشر مقالات مكتملة بعد — بل تعرض كيف نقرأ ونوثّق قبل أن نكتب.",
                  en: "Editorial outlines for legal awareness: one idea, one official source, and a visible review date. This page does not publish finished articles yet — it shows how we read and document before writing.",
                })}
              </p>
              <p className="mt-6 inline-flex max-w-xl items-start gap-2 border-s border-gold/40 ps-3 text-[0.7rem] leading-relaxed text-gold/85">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {t(LEGAL_DISCLAIMER)}
              </p>

              <dl className="mt-8 grid max-w-lg grid-cols-3 gap-px overflow-hidden border border-gold/15 bg-gold/10">
                <div className="bg-[#080c17]/90 px-3 py-3.5">
                  <dt className="text-[0.55rem] uppercase tracking-[0.16em] text-ivory/35">
                    {t({ ar: "ملفات", en: "Files" })}
                  </dt>
                  <dd className="mt-1 font-display text-xl text-ivory">{String(LEGAL_OUTLINES.length).padStart(2, "0")}</dd>
                </div>
                <div className="bg-[#080c17]/90 px-3 py-3.5">
                  <dt className="text-[0.55rem] uppercase tracking-[0.16em] text-ivory/35">
                    {t({ ar: "مصادر رسمية", en: "Official sources" })}
                  </dt>
                  <dd className="mt-1 font-display text-xl text-ivory">{String(SOURCES.length).padStart(2, "0")}</dd>
                </div>
                <div className="bg-[#080c17]/90 px-3 py-3.5">
                  <dt className="text-[0.55rem] uppercase tracking-[0.16em] text-ivory/35">
                    {t({ ar: "آخر مراجعة", en: "Last review" })}
                  </dt>
                  <dd className="mt-1 text-[0.72rem] leading-7 tracking-[0.08em] text-gold/85">{REVIEW_DATE}</dd>
                </div>
              </dl>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-x-5 -inset-y-4 border border-gold/15" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden border border-gold/25">
                <Image
                  src={ASSETS.legalLens}
                  alt={t({ ar: "مكتب بحث قانوني توضيحي", en: "Illustrative legal research desk" })}
                  fittingType="fill"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.2em] text-gold/80">
                      <Scale className="h-3.5 w-3.5" aria-hidden="true" />
                      {t({ ar: "مكتبة القراءة", en: "The reading room" })}
                    </p>
                    <p className="mt-1 font-display text-xl text-ivory">
                      {isAr ? "ثلاث عدسات. مصدر واحد واضح." : "Three lenses. One clear source."}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-gold/70" aria-hidden="true" />
                </div>
                <p className="absolute top-3 end-3 border border-ivory/20 bg-ink-900/60 px-2 py-1 text-[0.5rem] uppercase tracking-[0.18em] text-ivory/55 backdrop-blur-sm">
                  {t({ ar: "صورة توضيحية", en: "Illustrative" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <LegalLenses />

      <section className="relative bg-ink-900 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-gold/75">{t({ ar: "قراءة بصرية", en: "Visual reading" })}</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight text-ivory">
              {t({ ar: "من البحث إلى الحوار", en: "From research to conversation" })}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/50">
              {t({
                ar: "عنصر مقارنة يعمل بلوحة المفاتيح لقراءة الفرق بين صفحة البحث الهادئة وحوار الشارع المباشر — الصورتان توضيحيتان للهوية البصرية فقط.",
                en: "A keyboard-operable comparison for reading the difference between a quiet research page and a direct street conversation — both images illustrate the visual identity only.",
              })}
            </p>
            <p className="mt-6 text-[0.6rem] uppercase tracking-[0.2em] text-ivory/28">
              {t({ ar: "اسحب الفاصل · يعمل بالأسهم", en: "Drag the divider · arrow-key operable" })}
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
        </div>

        <p className="mx-auto mt-14 flex max-w-[1200px] flex-wrap items-center justify-between gap-3 border-t border-gold/15 pt-5 text-[0.56rem] uppercase tracking-[0.2em] text-ivory/28">
          <span>{t({ ar: "محتوى توعوي فقط — ليس استشارة قانونية فردية.", en: "Educational content only — not individual legal advice." })}</span>
          <span>{REVIEW_DATE}</span>
        </p>
      </section>
    </div>
  );
}
