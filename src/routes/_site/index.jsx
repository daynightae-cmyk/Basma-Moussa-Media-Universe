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
  const { t, isAr } = useI18n();

  return (
    <>
      <CinematicHero />

      <section
        id="universe"
        className="relative overflow-hidden border-t border-gold/10 bg-ink-900 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "radial-gradient(60% 45% at 82% 0%, rgba(215,171,98,0.09), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
                <span className="eyebrow">
                  {t({ ar: "الفصل الثاني · العوالم", en: "Chapter II · The Worlds" })}
                </span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.06] text-ivory">
                {t({ ar: "ستة أبواب. عالم واحد.", en: "Six doors. One universe." })}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory/55">
                {t({
                  ar: "كل باب بيئة بصرية وتفاعل مختلف: حوار، صوت، قانون، توثيق، إنتاج، وذكاء حواري. اختر من أين تبدأ.",
                  en: "Each door is its own visual environment and interaction: conversation, sound, law, documentary, production, and a conversational intelligence. Choose where to begin.",
                })}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                to="/media"
                className="group inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-[0.7rem] tracking-[0.18em] text-gold"
              >
                {t({ ar: "افتح خريطة العوالم", en: "Open the universe map" })}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <p className="max-w-[14rem] text-end text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-ivory/30">
                {t({ ar: "مرّر أفقيًا · اختر بابًا", en: "Scroll to explore · choose a door" })}
              </p>
            </div>
          </div>

          <div className="mt-9">
            <WorldPortals />
          </div>
        </div>
      </section>

      <HorizontalStoryStage />

      <section className="relative overflow-hidden border-y border-gold/10 bg-[#060911] px-5 py-20 sm:px-8 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.26]"
          style={{ backgroundImage: "url('/placeholders/hero-art.svg')" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, #060911 0%, rgba(6,9,17,0.55) 42%, #060911 100%)" }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -top-10 start-1/2 -translate-x-1/2 select-none font-display text-[16rem] leading-none text-gold/[0.05]"
          aria-hidden="true"
        >
          III
        </span>

        <div className="relative mx-auto max-w-[1200px]">
          <p className="text-center text-[0.58rem] uppercase tracking-[0.32em] text-gold/70">
            {t({ ar: "الفصل الثالث · البيان", en: "Chapter III · The Manifesto" })}
          </p>
          <blockquote className="mx-auto mt-6 max-w-4xl text-center font-display text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.24] text-ivory/92">
            {t(BRAND.tagline)}
          </blockquote>

          <div className="mx-auto mt-10 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <div className="mt-14 grid gap-10 border-t border-ivory/10 pt-10 md:grid-cols-3 md:gap-12">
            {PRINCIPLES.map((principle, index) => (
              <div key={principle.title.en} className="relative">
                <span
                  className="pointer-events-none absolute -top-6 select-none font-display text-5xl leading-none text-gold/15"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="eyebrow text-gold/75">{t(principle.title)}</p>
                <p className="mt-3 text-sm leading-relaxed text-ivory/55 sm:text-[0.92rem]">{t(principle.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-900 px-5 py-20 sm:px-8 sm:py-28">
        <div
          className="pointer-events-none absolute inset-y-0 end-0 w-1/2"
          style={{ background: "radial-gradient(60% 60% at 75% 50%, rgba(215,171,98,0.16), transparent 72%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
              <span className="eyebrow">{t({ ar: "الفصل الأخير · تعاون", en: "Final chapter · Collaborate" })}</span>
            </div>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.1] text-ivory">
              {t({ ar: "الحكاية القادمة تبدأ بمحادثة.", en: "The next story starts with a conversation." })}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory/50 sm:text-base">
              {t({
                ar: "للتعاون الإعلامي والحوارات والبحث التحريري — تواصل مباشرة عبر واتساب.",
                en: "For media collaboration, conversations and editorial research — reach out directly on WhatsApp.",
              })}
            </p>
            <p className="mt-6 text-[0.58rem] uppercase tracking-[0.24em] text-ivory/28">
              {isAr ? "الشارقة · الإمارات العربية المتحدة" : "Sharjah · United Arab Emirates"}
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
