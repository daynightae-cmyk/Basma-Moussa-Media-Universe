import { createFileRoute } from "@tanstack/react-router";
import { Aperture, Check, Minus, Radio, Layers3 } from "lucide-react";
import { useI18n } from "@/lib/experience/i18n";
import { StudioExperience } from "@/components/studio/studio-experience";
import { getDictionary } from "@/lib/production/dictionary";

export const Route = createFileRoute("/_site/studio")({
  head: () => ({
    meta: [
      { title: "أرض البث الإبداعية — Studio | بسمة موسى" },
      { name: "description", content: "استوديو رقمي تفاعلي: مشاهد، زوايا كاميرا، وإضاءة تتحول بين يديك." },
    ],
  }),
  component: Studio,
});

const SPECS = [
  { value: "06", label: { ar: "مشاهد جاهزة", en: "Set scenes" } },
  { value: "06", label: { ar: "زوايا كاميرا", en: "Camera angles" } },
  { value: "07", label: { ar: "أنماط إضاءة", en: "Lighting modes" } },
];

const TRUTH = [
  {
    ar: "تحريك الأثاث داخل حدود المسرح مع منع التصادم",
    en: "Furniture movement inside stage bounds, with collision checks",
  },
  {
    ar: "ستة مشاهد وست كاميرات وسبعة أنماط إضاءة تعمل فعليًا",
    en: "Six scenes, six cameras and seven lighting modes that genuinely work",
  },
  {
    ar: "غرفة مخرج مع تعليق صوتي وملاحظات إنتاج محفوظة محليًا",
    en: "A director room with prompter and production notes saved locally",
  },
];

const NOT = [
  {
    ar: "ليست بثًّا حيًّا ولا اتصالًا بمنصة بث",
    en: "Not a live broadcast and not connected to a streaming platform",
  },
  {
    ar: "ليست استوديو ماديًا ولا فريق عمل حقيقيًا",
    en: "Not a physical studio and not a real crew",
  },
  {
    ar: "لا تُفعّل الكاميرا أو الميكروفون تلقائيًا",
    en: "No camera or microphone is ever enabled automatically",
  },
];

function Studio() {
  const { t, lang, isAr } = useI18n();

  return (
    <div className="bg-ink-900">
      <header className="studio-page-hero relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
        <div className="studio-page-hero__beam" aria-hidden="true" />
        <div className="studio-page-hero__grain" aria-hidden="true" />
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
              <span className="eyebrow eyebrow-gold">{t({ ar: "خلف الرؤية", en: "Behind the vision" })}</span>
            </div>
            <span className="studio-live-badge">
              <span className="studio-live-badge__dot" aria-hidden="true" />
              {t({ ar: "بيئة افتراضية — ليست بثًّا حيًّا", en: "Virtual environment — not a live feed" })}
            </span>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1.45fr_0.55fr] lg:items-end">
            <div>
              <h1
                id="hero-title"
                className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-ivory"
              >
                {t({ ar: "أرض البث الإبداعية", en: "The Creative Broadcast Floor" })}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/60 sm:text-lg">
                {t({
                  ar: "مسرح رقمي كامل: كرسيان وطاولة، ستة مشاهد، ست كاميرات، وسبعة أنماط إضاءة. حرّك الأثاث، بدّل الكاميرا، وأدر الإضاءة — كل تغيير يظهر فورًا في إطار الماستر.",
                  en: "A complete virtual stage: two chairs and a table, six scenes, six cameras and seven lighting modes. Move the furniture, change the camera and direct the light — every choice changes the master frame instantly.",
                })}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-px overflow-hidden border border-gold/15 bg-gold/10">
              {SPECS.map((spec) => (
                <div key={spec.value + spec.label.en} className="bg-[#080c17]/90 px-3 py-4 text-center">
                  <p className="font-display text-2xl text-gold sm:text-3xl">{spec.value}</p>
                  <p className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-ivory/45">
                    {t(spec.label)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ivory/10 pt-4 text-[0.62rem] uppercase tracking-[0.16em] text-ivory/40">
            <span className="inline-flex items-center gap-2">
              <Aperture className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />
              {t({ ar: "ماستر افتراضي", en: "Virtual master" })}
            </span>
            <span className="inline-flex items-center gap-2">
              <Layers3 className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />
              {t({ ar: "أثاث CSS ثلاثي الأبعاد", en: "CSS 3D furniture" })}
            </span>
            <span className="inline-flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />
              {t({ ar: "حالة بث صادقة", en: "Truthful broadcast state" })}
            </span>
          </div>
        </div>
      </header>

      <StudioExperience dict={getDictionary(lang)} locale={lang} />

      <section className="px-5 pb-20 sm:px-8" aria-labelledby="studio-truth-title">
        <div className="mx-auto max-w-[1400px]">
          <div className="studio-truth">
            <div className="studio-truth__intro">
              <p className="eyebrow eyebrow-gold">{t({ ar: "شفافية الإنتاج", en: "Production honesty" })}</p>
              <h2
                id="studio-truth-title"
                className="mt-3 font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight text-ivory"
              >
                {t({ ar: "ما يعمل، وما لا ندّعي أنه يعمل.", en: "What works — and what we do not claim." })}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/50">
                {t({
                  ar: "الاستوديو أداة تخطيط وتصور. لا نعرض عدّاد مشاهدين، ولا اتصالًا حيًّا، ولا تسجيلًا لم يحدث. زر البث ينتقل إلى حالة فشل واضحة عندما لا يوجد ناقل حقيقي مُهيَّأ.",
                  en: "The studio is a planning and visualisation tool. No viewer counter, no live connection, no recording that did not happen. The broadcast control moves to an explicit failure state when no real transport is configured.",
                })}
              </p>
            </div>

            <div className="studio-truth__columns">
              <div>
                <p className="studio-truth__label studio-truth__label--on">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  {t({ ar: "يعمل فعليًا", en: "Genuinely working" })}
                </p>
                <ul className="mt-4 space-y-3">
                  {TRUTH.map((item) => (
                    <li key={item.en} className="studio-truth__item">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold/80" aria-hidden="true" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="studio-truth__label studio-truth__label--off">
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                  {t({ ar: "لا ندّعي", en: "We do not claim" })}
                </p>
                <ul className="mt-4 space-y-3">
                  {NOT.map((item) => (
                    <li key={item.en} className="studio-truth__item studio-truth__item--muted">
                      <Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-ivory/30" aria-hidden="true" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-gold/15 pt-5 text-[0.58rem] uppercase tracking-[0.22em] text-ivory/30">
            <span>{t({ ar: "بسمة موسى · مختبر الإنتاج", en: "Basma Moussa · Production Lab" })}</span>
            <span>{isAr ? "الشارقة، الإمارات" : "Sharjah, United Arab Emirates"}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
