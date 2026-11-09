import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import CinematicHero from "@/components/cinematic/CinematicHero";
import WorldPortals from "@/components/sections/WorldPortals";
import HorizontalStoryStage from "@/components/cinematic/HorizontalStoryStage";
import { useI18n } from "@/lib/experience/i18n";
import { BRAND, WHATSAPP } from "@/lib/experience/content";

const PRINCIPLES = [
  {
    title: { ar: "الحكاية أولًا", en: "Story first" },
    body: {
      ar: "لا نبدأ بالكاميرا، بل بالسؤال: من الذي يستحق أن يُسمع؟",
      en: "We don't start with the camera. We start with the question: whose voice deserves to be heard?",
    },
  },
  {
    title: { ar: "المصدر قبل الرأي", en: "Source before opinion" },
    body: {
      ar: "كل ادعاء قانوني أو إعلامي يُبنى على مرجع يمكنك فتحه بنفسك.",
      en: "Every legal or editorial claim rests on a reference you can open yourself.",
    },
  },
  {
    title: { ar: "مكان واضح", en: "A clear place" },
    body: {
      ar: "الإمارات والشارقة في القلب، بلغة عربية أولًا.",
      en: "The UAE and Sharjah at the centre, Arabic first.",
    },
  },
];

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "بسمة موسى · عالم الإعلام — Basma Moussa Media Universe" },
      {
        name: "description",
        content:
          "مساحة إعلامية سينمائية تضع الصوت الإنساني في المقدمة: الحكاية، البحث، والمكان. منصة مفاهيم قيد التطوير في الشارقة.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();

  return (
    <>
      <CinematicHero />

      <section id="universe" className="relative border-t border-gold/10 bg-ink-900 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
                <span className="eyebrow">{t({ ar: "عالم الإعلام", en: "The Media Universe" })}</span>
              </div>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight text-ivory">
                {t({ ar: "ستة أبواب. عالم واحد.", en: "Six doors. One universe." })}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ivory/55">
                {t({
                  ar: "كل باب بيئة بصرية وتفاعل مختلف: حوار، صوت، قانون، توثيق، إنتاج، وذكاء حواري. اختر من أين تبدأ.",
                  en: "Each door is its own visual environment and interaction: conversation, sound, law, documentary, production, and a conversational intelligence. Choose where to begin.",
                })}
              </p>
            </div>
            <Link
              to="/media"
              className="group inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-[0.7rem] tracking-[0.18em] text-gold"
            >
              {t({ ar: "افتح خريطة العوالم", en: "Open the universe map" })}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-10">
            <WorldPortals />
          </div>
        </div>
      </section>

      <HorizontalStoryStage />

      <section className="relative overflow-hidden border-y border-gold/10 bg-ink-800 px-5 py-20 sm:px-8 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(60% 60% at 15% 0%, rgba(215,171,98,0.12), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px]">
          <blockquote className="max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-snug text-ivory/90">
            {t(BRAND.tagline)}
          </blockquote>
          <div className="mt-12 grid gap-10 border-t border-ivory/10 pt-10 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title.en}>
                <p className="eyebrow text-gold/70">{t(principle.title)}</p>
                <p className="mt-3 text-sm leading-relaxed text-ivory/55">{t(principle.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-900 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
              <span className="eyebrow">{t({ ar: "تعاون", en: "Collaborate" })}</span>
            </div>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight text-ivory">
              {t({ ar: "الحكاية القادمة تبدأ بمحادثة.", en: "The next story starts with a conversation." })}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory/50">
              {t({
                ar: "للتعاون الإعلامي والحوارات والبحث التحريري — تواصل مباشرة عبر واتساب.",
                en: "For media collaboration, conversations and editorial research — reach out directly on WhatsApp.",
              })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold px-6 py-3.5 text-[0.72rem] font-medium tracking-[0.14em] text-ink-900 transition-colors hover:bg-gold-light"
            >
              {t({ ar: "راسل بسمة", en: "Message Basma" })}
            </a>
            <Link
              to="/ai-studio"
              className="border border-gold/40 px-6 py-3.5 text-[0.72rem] tracking-[0.14em] text-gold transition-colors hover:bg-gold/10"
            >
              {t({ ar: "اسأل بسمة AI", en: "Ask Basma AI" })}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}