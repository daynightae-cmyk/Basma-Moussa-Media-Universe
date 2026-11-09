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
        <motion.div
          initial={{ scale: 1.06, x: -18 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 9, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image src={scene.image} alt="" fittingType="fill" className="h-full w-full opacity-70" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#05080f_0%,rgba(5,8,15,0.94)_34%,rgba(5,8,15,0.55)_62%,rgba(5,8,15,0.18)_100%)] rtl:bg-[linear-gradient(260deg,#05080f_0%,rgba(5,8,15,0.94)_34%,rgba(5,8,15,0.55)_62%,rgba(5,8,15,0.18)_100%)]" />
        {/* The arch is hidden below lg; mobile gets the same art as a full-bleed ground. */}
        <div className="pointer-events-none absolute inset-0 lg:hidden" aria-hidden="true">
          <Image src={scene.foreground || scene.image} alt="" fittingType="fill" className="h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,15,0.32)_0%,rgba(5,8,15,0.7)_46%,#05080f_94%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,15,0.94)_0%,rgba(5,8,15,0.44)_62%,rgba(5,8,15,0.2)_100%)] rtl:bg-[linear-gradient(270deg,rgba(5,8,15,0.94)_0%,rgba(5,8,15,0.44)_62%,rgba(5,8,15,0.2)_100%)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-900/80 to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-5 pb-28 pt-24 sm:px-8">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="relative max-w-2xl">
              <span
                className="pointer-events-none absolute -top-24 hidden select-none font-display text-[11rem] leading-none text-gold/[0.055] xl:block"
                aria-hidden="true"
              >
                01
              </span>
              <Chapter>{t(scene.chapter)}</Chapter>
              <motion.h1
                id="hero-title"
                {...fadeUp}
                className="mt-6 font-display text-[clamp(2.7rem,6.2vw,5.1rem)] leading-[1.04] text-ivory"
              >
                {t(scene.title)}
              </motion.h1>
              <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-6 max-w-lg text-base leading-relaxed text-ivory/68 sm:text-lg">
                {t(scene.lead)}
              </motion.p>
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.22 }} className="mt-9">
                <Cta scene={scene} />
                <Note />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto hidden w-full max-w-[430px] lg:block xl:max-w-[480px]"
            >
              <div className="absolute -inset-x-6 -inset-y-4 border border-gold/15 arch" aria-hidden="true" />
              <div className="absolute -inset-x-2 -inset-y-2 border border-gold/30 arch" aria-hidden="true" />
              <div className="relative overflow-hidden arch shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
                <Image
                  src={scene.foreground || scene.image}
                  alt={t({ ar: "فن تجريدي معماري — ليس صورة شخصية", en: "Original abstract architectural art — not a portrait" })}
                  fittingType="fill"
                  className="aspect-[3/4] w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <p className="text-[0.55rem] uppercase tracking-[0.24em] text-ivory/55">
                    {t({ ar: "فن بصري أصلي", en: "Original visual art" })}
                  </p>
                  <span className="h-px w-14 bg-gold/60" aria-hidden="true" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-y-10 -end-9 hidden w-[3px] flex-col justify-between xl:flex" aria-hidden="true">
                <span className="h-10 w-px bg-gold/40" />
                <span className="text-[0.5rem] tracking-[0.3em] text-gold/50 [writing-mode:vertical-rl]">BASMA · SHARJAH</span>
                <span className="h-10 w-px bg-gold/40" />
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