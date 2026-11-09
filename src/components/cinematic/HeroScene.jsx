import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import GoldWave from "./GoldWave";
import { useI18n } from "@/lib/experience/i18n";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

function Chapter({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function Cta({ scene }) {
  const { t, isAr } = useI18n();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  return (
    <Link
      to={scene.cta.href}
      className="group inline-flex items-center gap-3 border border-gold/50 bg-gold/5 px-6 py-3.5 text-[0.72rem] tracking-[0.16em] text-gold backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:text-ink-900"
    >
      {t(scene.cta.label)}
      <Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}

function Note() {
  const { t } = useI18n();
  return (
    <p className="mt-5 text-[0.62rem] tracking-wide text-ivory/35">
      {t({ ar: "صورة توضيحية للهوية البصرية — ليست توثيقًا لحدث حقيقي.", en: "Illustrative brand imagery — not documentation of a real event." })}
    </p>
  );
}

export default function HeroScene({ scene }) {
  const { t } = useI18n();

  if (scene.composition === "portrait") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-ink-900">
        <Image src={scene.image} alt="" fittingType="fill" className="absolute inset-0 h-full w-full opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/92 to-ink-900/35 rtl:bg-gradient-to-l" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-5 pb-28 pt-28 sm:px-8">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-2xl">
              <Chapter>{t(scene.chapter)}</Chapter>
              <motion.h1
                id="hero-title"
                {...fadeUp}
                className="mt-6 font-display text-[clamp(2.6rem,6.2vw,4.8rem)] leading-[1.08] text-ivory"
              >
                {t(scene.title)}
              </motion.h1>
              <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-6 max-w-lg text-base leading-relaxed text-ivory/65 sm:text-lg">
                {t(scene.lead)}
              </motion.p>
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.22 }} className="mt-9">
                <Cta scene={scene} />
                <Note />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto hidden w-full max-w-[330px] lg:block"
            >
              <div className="absolute -inset-3 border border-gold/25 arch" aria-hidden="true" />
              <div className="relative overflow-hidden arch">
                <Image src={scene.foreground || scene.image} alt={t({ ar: "فن تجريدي مؤقت بدون صورة شخصية", en: "Temporary abstract concept art, not a portrait" })} fittingType="fill" className="aspect-[3/4] w-full" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (scene.composition === "studio") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-ink-900">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 7, ease: "linear" }} className="absolute inset-0">
          <Image src={scene.image} alt="" fittingType="fill" className="h-full w-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/30" />
        <div className="pointer-events-none absolute inset-6 border border-ivory/10 sm:inset-10" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-32 pt-28 sm:px-8">
          <div className="flex items-center gap-4">
            <span className="border border-gold/40 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-gold/90">
              {t({ ar: "مشهد تصوري", en: "Concept scene" })}
            </span>
            <Chapter>{t(scene.chapter)}</Chapter>
          </div>
          <motion.h1 id="hero-title" {...fadeUp} className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.1] text-ivory">
            {t(scene.title)}
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-5 max-w-xl text-base leading-relaxed text-ivory/65">
            {t(scene.lead)}
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-8">
            <Cta scene={scene} />
          </motion.div>
        </div>
      </div>
    );
  }

  if (scene.composition === "frequency") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#05070F]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 45%, rgba(215,171,98,0.14), transparent 72%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-80">
          <GoldWave mode="slow" className="h-[46vh] w-full" bars={110} height={320} />
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-5 pb-24 pt-32 text-center sm:px-8">
          <Chapter>{t(scene.chapter)}</Chapter>
          <motion.h1 id="hero-title" {...fadeUp} className="mt-6 font-display text-[clamp(2.5rem,6vw,4.4rem)] leading-[1.1] text-ivory">
            {t(scene.title)}
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-6 max-w-xl text-base leading-relaxed text-ivory/60">
            {t(scene.lead)}
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-9">
            <Cta scene={scene} />
          </motion.div>
          <p className="mt-6 text-[0.62rem] tracking-wide text-ivory/30">
            {t({ ar: "موجة زخرفية — ليست صوتًا ولا تسجيلًا.", en: "Decorative waveform — not audio, not a recording." })}
          </p>
        </div>
      </div>
    );
  }

  if (scene.composition === "city") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-ink-900">
        <motion.div initial={{ scale: 1.08, x: 20 }} animate={{ scale: 1, x: 0 }} transition={{ duration: 6, ease: "linear" }} className="absolute inset-0">
          <Image src={scene.image} alt="" fittingType="fill" className="h-full w-full" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(7,11,24,0.94) 12%, rgba(7,11,24,0.55) 52%, rgba(11,17,36,0.35) 100%)" }} />
        <div className="absolute inset-y-0 end-6 hidden w-10 border-x border-gold/15 sm:block" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-5 pb-28 pt-28 sm:px-8">
          <div className="max-w-xl">
            <Chapter>{t(scene.chapter)}</Chapter>
            <motion.h1 id="hero-title" {...fadeUp} className="mt-6 font-display text-[clamp(2.5rem,5.8vw,4.5rem)] leading-[1.08] text-ivory">
              {t(scene.title)}
            </motion.h1>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-6 max-w-md text-base leading-relaxed text-ivory/65">
              {t(scene.lead)}
            </motion.p>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-9">
              <Cta scene={scene} />
              <Note />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-800">
      <div className="absolute inset-0 lg:grid lg:grid-cols-[1fr_1fr]">
        <div className="relative hidden lg:block">
          <Image src={scene.image} alt="" fittingType="fill" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-800/20 via-transparent to-ink-800" />
        </div>
        <div className="absolute inset-0 lg:hidden">
          <Image src={scene.image} alt="" fittingType="fill" className="h-full w-full opacity-30" />
          <div className="absolute inset-0 bg-ink-900/80" />
        </div>
        <div className="relative z-10 flex items-center px-5 pt-28 pb-28 sm:px-10">
          <div className="max-w-xl">
            <Chapter>{t(scene.chapter)}</Chapter>
            <motion.h1 id="hero-title" {...fadeUp} className="mt-6 font-display text-[clamp(2.4rem,5.2vw,4rem)] leading-[1.1] text-ivory">
              {t(scene.title)}
            </motion.h1>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-6 text-base leading-relaxed text-ivory/65">
              {t(scene.lead)}
            </motion.p>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-9">
              <Cta scene={scene} />
              <p className="mt-5 max-w-sm text-[0.65rem] leading-relaxed text-ivory/40">
                {t({ ar: "محتوى توعوي فقط — ليس استشارة قانونية فردية.", en: "Educational content only — not individual legal advice." })}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}