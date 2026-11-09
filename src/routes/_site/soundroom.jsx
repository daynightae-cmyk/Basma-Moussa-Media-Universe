const SONIC_COPY = {
  ar: { enable: "تفعيل الميكروفون", stop: "إيقاف", requesting: "جاري طلب الإذن", denied: "تم رفض الإذن", unsupported: "الميكروفون غير مدعوم", error: "تعذّر التقاط الصوت", idle: "الميكروفون مغلق", live: "الميكروفون يعمل محليًا", meterLabel: "مستوى الصوت", low: "منخفض", mid: "متوسط", high: "مرتفع", privacy: "تحليل محلي فقط — لا تسجيل أو إرسال للصوت." },
  en: { enable: "Enable microphone", stop: "Stop", requesting: "Requesting permission", denied: "Microphone permission denied", unsupported: "Microphone unsupported", error: "Cannot capture audio", idle: "Microphone off", live: "Microphone active locally", meterLabel: "Audio level", low: "Low", mid: "Mid", high: "High", privacy: "On-device analysis only — no recording or upload." },
};
import "@/styles/production/soundroom.css";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { SOUNDROOM_ROOMS } from "@/lib/experience/worldsContent";
import { ROOM_COMPONENTS } from "@/components/soundroom/Rooms";
import { useI18n } from "@/lib/experience/i18n";
import { SonicSculpture } from "@/components/media/sonic-sculpture";

export const Route = createFileRoute("/_site/soundroom")({
  validateSearch: (search) => ({ room: typeof search.room === "string" ? search.room : undefined }),
  head: () => ({
    meta: [
      { title: "مساحة صوت — Soundroom | بسمة موسى" },
      { name: "description", content: "أربع غرف صوتية تفاعلية: تسجيل، مونتاج، تردد، واستماع — نماذج استوديو تعريفية." },
    ],
  }),
  component: Soundroom,
});

const FACTS = [
  { value: "04", label: { ar: "غرف صوتية", en: "Sound chambers" } },
  { value: "00", label: { ar: "تسجيلات مُرسلة", en: "Uploads" } },
  { value: "100٪", label: { ar: "تحليل محلي", en: "On-device" } },
];

const RULES = [
  {
    ar: "الميكروفون يبقى مغلقًا حتى تضغط «بدء التسجيل» وتمنح الإذن.",
    en: "The microphone stays closed until you press “Start recording” and grant permission.",
  },
  {
    ar: "لا يُرسَل أي صوت إلى خادم. التسجيل اختياري ويبقى في ذاكرة هذه الصفحة حتى تغلقها.",
    en: "No audio is sent to a server. Recording is optional and lives in this page's memory until you close it.",
  },
  {
    ar: "المقاطع داخل الغرف نماذج استوديو حقيقية — وليست حلقات منشورة.",
    en: "The takes inside the chambers are real studio samples — not published episodes.",
  },
];

function Soundroom() {
  const { t, lang } = useI18n();
  const { room: requested } = Route.useSearch();
  const navigate = useNavigate({ from: "/soundroom" });

  const currentId = SOUNDROOM_ROOMS.some((r) => r.id === requested) ? requested : SOUNDROOM_ROOMS[0].id;
  const room = SOUNDROOM_ROOMS.find((r) => r.id === currentId);
  const RoomView = ROOM_COMPONENTS[room.id];

  const select = (id) => navigate({ search: { room: id }, replace: true });

  return (
    <div className="bg-ink-900">
      <header className="sound-hero relative overflow-hidden px-5 pb-8 pt-28 sm:px-8 sm:pt-32">
        <div className="sound-hero__beam" aria-hidden="true" />
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
              <span className="eyebrow eyebrow-gold">{t({ ar: "غرفة الصوت", en: "The sound chamber" })}</span>
            </div>
            <span className="sound-standby">
              <span className="sound-standby__dot" aria-hidden="true" />
              {t({ ar: "استعداد · الميكروفون مغلق", en: "Standby · microphone closed" })}
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <h1 id="hero-title" className="max-w-2xl font-display text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.02] text-ivory">
                {t({ ar: "مساحة صوت", en: "Soundroom" })}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/58 sm:text-lg">
                {t({
                  ar: "أربع غرف بتجربة مختلفة: تسجيل، ومونتاج، وتردد، واستماع. في غرفة التسجيل يمكنك التقاط مقطع قصير يبقى على جهازك، وفي بقية الغرف نماذج استوديو حقيقية تستمع إليها الآن — لا حلقات منشورة.",
                  en: "Four chambers, four different experiences: recording, editing, frequency and listening. The booth records a short take that stays on your device, and the other chambers hold real studio samples you can play right now — not published episodes.",
                })}
              </p>

              <dl className="mt-8 grid max-w-lg grid-cols-3 gap-px overflow-hidden border border-gold/15 bg-gold/10">
                {FACTS.map((fact) => (
                  <div key={fact.label.en} className="bg-[#080c17]/90 px-3 py-3.5">
                    <dt className="text-[0.55rem] uppercase tracking-[0.14em] text-ivory/35">{t(fact.label)}</dt>
                    <dd className="mt-1 font-display text-xl text-ivory">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-7 grid max-w-xl gap-2.5">
                {RULES.map((rule) => (
                  <li key={rule.en} className="flex gap-2.5 text-[0.78rem] leading-relaxed text-ivory/45">
                    <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold/70" aria-hidden="true" />
                    {t(rule)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sound-hero__visual" aria-hidden="true">
              <div className="sound-orbit">
                <span className="sound-orbit__ring sound-orbit__ring--a" />
                <span className="sound-orbit__ring sound-orbit__ring--b" />
                <span className="sound-orbit__ring sound-orbit__ring--c" />
                <span className="sound-orbit__axis" />
                <span className="sound-orbit__core" />
              </div>
              <div className="sound-hero__readout">
                <span>INPUT</span>
                <span className="text-gold">CLOSED</span>
                <span>NO SIGNAL</span>
              </div>
              <p className="sound-hero__caption">
                {t({ ar: "رسم توضيحي للمدخل الصوتي — لا موجة حيّة قبل الإذن.", en: "A diagram of the input — no live waveform before permission." })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-gold/10 px-5 py-10 sm:px-8 sm:py-14" aria-labelledby="sculpture-title">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-gold/75">{t({ ar: "تفاعل صوتي", en: "Live interaction" })}</p>
              <h2 id="sculpture-title" className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ivory">
                {t({ ar: "النحت الصوتي", en: "The sonic sculpture" })}
              </h2>
            </div>
            <p className="max-w-md text-[0.78rem] leading-relaxed text-ivory/40">
              {t({
                ar: "لا يبدأ أي شيء تلقائيًا. عند التفعيل، تتحرك الحلقات الزجاجية بمستوى صوتك في الوقت الحقيقي، ويظهر المستوى والنطاقات الثلاثة.",
                en: "Nothing starts automatically. Once enabled, the glass rings move with your level in real time, and the meter and three bands respond.",
              })}
            </p>
          </div>
          <SonicSculpture locale={lang} copy={SONIC_COPY[lang]} />
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="rooms-title">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-gold/75">{t({ ar: "أربع غرف", en: "Four chambers" })}</p>
              <h2 id="rooms-title" className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-ivory">
                {t({ ar: "اختر غرفتك", en: "Choose your chamber" })}
              </h2>
            </div>
            <p className="max-w-md text-[0.78rem] leading-relaxed text-ivory/40">
              {t({
                ar: "كل غرفة أداة مختلفة: التقاط، مونتاج، تحليل ترددي، أو استماع هادئ. لا تُشغَّل الأصوات تلقائيًا.",
                en: "Each chamber is a different tool: capture, editing, frequency analysis, or quiet listening. No audio plays automatically.",
              })}
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
            <nav aria-label={t({ ar: "غرف الصوت", en: "Sound chambers" })} className="min-w-0 max-w-full lg:sticky lg:top-28">
              <ol className="flex max-w-full gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
                {SOUNDROOM_ROOMS.map((item) => {
                  const active = item.id === room.id;
                  return (
                    <li key={item.id} className="shrink-0 lg:w-full">
                      <button
                        type="button"
                        onClick={() => select(item.id)}
                        aria-current={active ? "true" : undefined}
                        className={`group flex w-full items-center gap-3 border px-4 py-3 text-start transition-colors ${
                          active ? "border-gold bg-gold/10" : "border-ivory/10 hover:border-gold/40"
                        }`}
                      >
                        <span className={`text-[0.55rem] tracking-[0.2em] ${active ? "text-gold" : "text-ivory/30"}`}>
                          {String(SOUNDROOM_ROOMS.indexOf(item) + 1).padStart(2, "0")}
                        </span>
                        <span className={`text-[0.78rem] ${active ? "text-ivory" : "text-ivory/55 group-hover:text-ivory/80"}`}>
                          {t(item.title)}
                        </span>
                        {active && (
                          <motion.span
                            layoutId="bm-room-thread"
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                            className="ms-auto flex items-center gap-1"
                            aria-hidden="true"
                          >
                            <span className="h-px w-5 bg-gold/60" />
                            <span className="h-[3px] w-[3px] rounded-full bg-gold" />
                          </motion.span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-4 hidden text-[0.6rem] leading-relaxed text-ivory/30 lg:block">
                {t({ ar: "الموجة والخط الزمني عناصر بصرية. الصوت في مشغّل كل غرفة، وتسجيلك يبقى على جهازك.", en: "The waveform and timeline are visuals. Audio plays in each chamber's player, and your take stays on your device." })}
              </p>
            </nav>

            <div className="min-h-[420px] min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <RoomView room={room} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
