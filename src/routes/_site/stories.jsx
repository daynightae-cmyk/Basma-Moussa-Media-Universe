import "@/styles/production/stories.css";
import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock3, Film, MapPin, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import { ASSETS } from "@/lib/experience/assets";
import { PROGRAMS, STATUS_LABEL } from "@/lib/experience/content";
import { SOURCES, STORY_ITEMS } from "@/lib/experience/worldsContent";
import { useI18n } from "@/lib/experience/i18n";

/**
 * The archive is a concept contact sheet, not a feed of published pieces.
 * Every entry keeps its own status label, location and illustrative image so
 * the page never implies a finished interview or a filmed report.
 */

/* A designed dawn-to-night rhythm: one light phase per editorial entrance. */
const LIGHT_PHASES = [
  { id: "dawn", label: { ar: "الفجر", en: "Dawn" }, time: "05:40" },
  { id: "morning", label: { ar: "الصباح", en: "Morning" }, time: "07:10" },
  { id: "midday", label: { ar: "الظهر", en: "Midday" }, time: "12:30" },
  { id: "afternoon", label: { ar: "العصر", en: "Afternoon" }, time: "16:20" },
  { id: "dusk", label: { ar: "الغروب", en: "Dusk" }, time: "18:05" },
  { id: "night", label: { ar: "الليل", en: "Night" }, time: "21:40" },
];

const CHECKS = [
  { ar: "موافقة موثقة قبل أي تسجيل.", en: "Documented consent before any recording." },
  { ar: "إسناد كل اقتباس لصاحبه.", en: "Every quote attributed to its speaker." },
  { ar: "مراجعة المصدر وتاريخه قبل النشر.", en: "Source and date reviewed before publishing." },
];

const TOPICS = [
  { id: "all", label: { ar: "كل المداخل", en: "All entrances" } },
  ...Array.from(new Map(STORY_ITEMS.map((item) => [item.topic.en, item.topic])).values()).map((topic) => ({
    id: topic.en,
    label: topic,
  })),
];

export const Route = createFileRoute("/_site/stories")({
  head: () => ({
    meta: [
      { title: "القصص والتوثيق — أرشيف صوت المدينة | Stories & Archive" },
      {
        name: "description",
        content:
          "أرشيف تصوري من الشارقة: ستة مداخل تحريرية بحالة واضحة ومصادر رسمية قابلة للفتح. لا حلقات منشورة بعد.",
      },
    ],
  }),
  component: Stories,
});

function Stories() {
  const { t, isAr } = useI18n();
  const [topic, setTopic] = useState("all");
  const [selectedId, setSelectedId] = useState(STORY_ITEMS[0].id);
  const viewerRef = useRef(null);

  const program = PROGRAMS.find((entry) => entry.slug === "city-voices");

  const visible = useMemo(
    () => (topic === "all" ? STORY_ITEMS : STORY_ITEMS.filter((item) => item.topic.en === topic)),
    [topic]
  );

  const active = visible.find((item) => item.id === selectedId) ?? visible[0] ?? STORY_ITEMS[0];
  const activeIndex = STORY_ITEMS.findIndex((item) => item.id === active.id);
  const activeLight = LIGHT_PHASES[activeIndex % LIGHT_PHASES.length];

  const pick = (id, { scroll = false } = {}) => {
    const story = STORY_ITEMS.find((item) => item.id === id);
    if (!story) return;
    setSelectedId(id);
    if (topic !== "all" && story.topic.en !== topic) setTopic("all");
    if (scroll && typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      viewerRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  /* Keep the selection inside the visible set, so clearing a filter never
     jumps the viewer back to a story the visitor did not choose. */
  const chooseTopic = (nextTopic) => {
    const next = nextTopic === "all" ? STORY_ITEMS : STORY_ITEMS.filter((item) => item.topic.en === nextTopic);
    setTopic(nextTopic);
    if (next.length > 0 && !next.some((item) => item.id === selectedId)) {
      setSelectedId(next[0].id);
    }
  };

  return (
    <div className="stories">
      <header className="stories-hero">
        <div className="stories-hero__beam" aria-hidden="true" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
                <span className="eyebrow eyebrow-gold">
                  {t({ ar: "أرشيف وثائقي · تصور قيد التطوير", en: "Documentary archive · concept in development" })}
                </span>
              </div>

              <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.02] text-ivory">
                {t({ ar: "القصص والتوثيق", en: "Stories & Archive" })}
              </h1>
              <p className="mt-3 font-display text-[clamp(1.2rem,2.4vw,1.8rem)] text-gold-light">
                {t({ ar: "صوت المدينة", en: "City Voices" })}
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/58 sm:text-lg">
                {t({
                  ar: "ستة مداخل تحريرية من الشارقة: الضوء الأول على الواجهة المائية، سوق بثلاث لغات، وما يُحذف من الحوار. كلها تصورات موسومة الحالة — لا حلقات منشورة، ولا مقابلات مكتملة.",
                  en: "Six editorial entrances from Sharjah: first light on the waterfront, a market in three languages, and what gets cut from a conversation. All are status-labelled concepts — no published episodes, no finished interviews.",
                })}
              </p>

              <dl className="stories-stats mt-8 max-w-lg">
                <div>
                  <dt>{t({ ar: "مداخل تصورية", en: "Concept entrances" })}</dt>
                  <dd>{String(STORY_ITEMS.length).padStart(2, "0")}</dd>
                </div>
                <div>
                  <dt>{t({ ar: "مصادر رسمية", en: "Official sources" })}</dt>
                  <dd>{String(SOURCES.length).padStart(2, "0")}</dd>
                </div>
                <div>
                  <dt>{t({ ar: "حلقات منشورة", en: "Published episodes" })}</dt>
                  <dd>00</dd>
                </div>
              </dl>
            </div>

            <div className="stories-plate">
              <div className="stories-plate__frame">
                <Image
                  src={ASSETS.cityVoices}
                  alt={t({
                    ar: "صورة توضيحية لواجهة الشارقة المائية في الضوء الأول",
                    en: "Illustrative Sharjah waterfront in first light",
                  })}
                  fittingType="fill"
                  className="h-full w-full object-cover"
                />
                <div className="stories-plate__shade" aria-hidden="true" />
                <span className="stories-plate__tag">
                  <Film className="h-3 w-3" aria-hidden="true" />
                  {t({ ar: "أرشيف تصوري", en: "Concept archive" })}
                </span>
                <div className="stories-plate__caption">
                  <span>{t({ ar: "الواجهة المائية · 05:40", en: "The waterfront · 05:40" })}</span>
                  <span dir="ltr">ROLL 01 / 06</span>
                </div>
              </div>
              <p className="stories-plate__note">
                {t({
                  ar: "صورة توضيحية للهوية البصرية — ليست توثيقًا لشخص أو مكان.",
                  en: "Illustrative brand art — not a documentary record of a person or place.",
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- light rhythm --- */}
      <section className="stories-rhythm" aria-labelledby="stories-rhythm-title">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-gold/70" id="stories-rhythm-title">
                {t({ ar: "إيقاع الضوء — تصور", en: "Light rhythm — concept" })}
              </p>
              <p className="mt-1 text-xs text-ivory/38">
                {t({
                  ar: "كل مدخل مرتبط بطور ضوء. اختر طورًا لتفتح مدخله.",
                  en: "Each entrance is tied to a light phase. Choose a phase to open its entry.",
                })}
              </p>
            </div>
            <p className="text-[0.55rem] uppercase tracking-[0.2em] text-ivory/28">
              {t({ ar: "الفجر ← الليل", en: "Dawn → Night" })}
            </p>
          </div>

          <ol className="stories-rhythm__track no-scrollbar" aria-label={t({ ar: "أطوار الضوء", en: "Light phases" })}>
            {STORY_ITEMS.map((story, index) => {
              const light = LIGHT_PHASES[index % LIGHT_PHASES.length];
              const isActive = story.id === active.id;
              return (
                <li key={story.id} className="stories-rhythm__slot">
                  <button
                    type="button"
                    onClick={() => pick(story.id, { scroll: true })}
                    aria-pressed={isActive}
                    aria-label={`${t(light.label)} — ${t(story.title)}`}
                  >
                    <span className="stories-rhythm__dot" aria-hidden="true" />
                    <span className="stories-rhythm__time" dir="ltr">
                      {light.time}
                    </span>
                    <span className="stories-rhythm__label">{t(light.label)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------- contact sheet --- */}
      <section className="stories-sheet" aria-labelledby="stories-sheet-title">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
                <span className="eyebrow">{t({ ar: "ورقة الاتصال", en: "The contact sheet" })}</span>
              </div>
              <h2
                id="stories-sheet-title"
                className="mt-4 font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.06] text-ivory"
              >
                {t({ ar: "ستة إطارات، حالة واحدة صادقة.", en: "Six frames, one honest status." })}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/50 sm:text-base">
                {t({
                  ar: "اختر إطارًا لقراءة الفكرة والموقع والحالة. كل إطار تصور تحريري، لا تقرير مكتمل.",
                  en: "Choose a frame to read the idea, the location and the status. Every frame is an editorial concept, not a finished report.",
                })}
              </p>
            </div>

            <div
              className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
              role="group"
              aria-label={t({ ar: "تصفية حسب الموضوع", en: "Filter by topic" })}
            >
              {TOPICS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => chooseTopic(item.id)}
                  aria-pressed={topic === item.id}
                  className={`stories-filter shrink-0 ${topic === item.id ? "is-active" : ""}`}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="stories-layout mt-10">
            <div>
              {visible.length === 0 ? (
                <p className="border-y border-ivory/10 py-16 text-center text-sm text-ivory/45">
                  {t({ ar: "لا مداخل في هذا الموضوع.", en: "No entrances under this topic." })}
                </p>
              ) : (
                <ol className="stories-grid">
                  {visible.map((story) => {
                    const index = STORY_ITEMS.findIndex((item) => item.id === story.id);
                    const light = LIGHT_PHASES[index % LIGHT_PHASES.length];
                    const isActive = story.id === active.id;
                    return (
                      <li key={story.id}>
                        <button
                          type="button"
                          className="stories-frame"
                          aria-pressed={isActive}
                          onClick={() => pick(story.id, { scroll: true })}
                        >
                          <span className="stories-frame__media">
                            <Image
                              src={story.image}
                              alt={t({
                                ar: `صورة توضيحية لمدخل «${story.title.ar}»`,
                                en: `Illustrative art for “${story.title.en}”`,
                              })}
                              fittingType="fill"
                              className="h-full w-full object-cover"
                            />
                            <span className="stories-frame__shade" aria-hidden="true" />
                            <span className="stories-frame__index" dir="ltr">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="stories-frame__light">
                              <Clock3 className="h-3 w-3" aria-hidden="true" />
                              <span dir="ltr">{light.time}</span>
                            </span>
                          </span>
                          <span className="stories-frame__meta">
                            <span className="stories-frame__topic">
                              {t(story.topic)} · {t(light.label)}
                            </span>
                            <span className="stories-frame__title">{t(story.title)}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>

            {/* ------------------------------------------------ the viewer --- */}
            <aside className="stories-viewer" ref={viewerRef} aria-labelledby="stories-viewer-title">
              <div className="stories-viewer__head">
                <span className="eyebrow text-gold/75">{t({ ar: "الإطار المختار", en: "Selected frame" })}</span>
                <span className="stories-viewer__roll" dir="ltr">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(STORY_ITEMS.length).padStart(2, "0")}
                </span>
              </div>
              <p className="sr-only" aria-live="polite">
                {t(active.title)}
              </p>

              <div className="stories-viewer__media">
                <Image
                  key={active.id}
                  src={active.image}
                  alt={t({
                    ar: `صورة توضيحية لمدخل «${active.title.ar}»`,
                    en: `Illustrative art for “${active.title.en}”`,
                  })}
                  fittingType="fill"
                  className="h-full w-full object-cover"
                />
                <div className="stories-viewer__shade" aria-hidden="true" />
                <span className="stories-viewer__phase">
                  {t(activeLight.label)} · <span dir="ltr">{activeLight.time}</span>
                </span>
              </div>

              <div className="stories-viewer__body">
                <p className="stories-viewer__topic">{t(active.topic)}</p>
                <h3 id="stories-viewer-title" className="stories-viewer__title">
                  {t(active.title)}
                </h3>
                <p className="stories-viewer__lead">{t(active.lead)}</p>

                <dl className="stories-viewer__facts">
                  <div>
                    <dt>
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {t({ ar: "الموقع", en: "Location" })}
                    </dt>
                    <dd>{t(active.location)}</dd>
                  </div>
                  <div>
                    <dt>
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      {t({ ar: "الحالة", en: "Status" })}
                    </dt>
                    <dd className="stories-viewer__status">{t(STATUS_LABEL[active.status])}</dd>
                  </div>
                </dl>

                <div className="stories-viewer__checks">
                  <p className="stories-viewer__checks-title">{t({ ar: "قبل التصوير", en: "Before filming" })}</p>
                  <ul>
                    {CHECKS.map((check) => (
                      <li key={check.en}>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        {t(check)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="stories-viewer__links">
                  <Link to="/programs/city-voices">
                    {t({ ar: "برنامج صوت المدينة", en: "The City Voices programme" })}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link to="/media" className="stories-viewer__quiet">
                    {t({ ar: "كل العوالم", en: "All worlds" })}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- policy ------ */}
      <section className="stories-policy" aria-labelledby="stories-policy-title">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="grid gap-10 border-t border-gold/15 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="eyebrow text-gold/70">{t({ ar: "سياسة الأرشيف", en: "Archive policy" })}</p>
              <h2
                id="stories-policy-title"
                className="mt-3 max-w-lg font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-ivory"
              >
                {t({ ar: "ما لا ننشره الآن، نكتبه بوضوح.", en: "What we don't publish yet, we state clearly." })}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory/50">
                {t({
                  ar: "هذا الأرشيف لا يعرض حلقات. يعرض أفكارًا تحريرية بحالة ظاهرة، ومصادر رسمية يمكنك فتحها بنفسك. عند نشر أول حلقة سيظهر هنا الملف الصوتي أو المرئي وتاريخ النشر.",
                  en: "This archive shows no episodes. It shows editorial ideas with a visible status, and official sources you can open yourself. When the first episode is published, the audio or video file and its publication date will appear here.",
                })}
              </p>
              {program && (
                <div className="stories-policy__program">
                  <p className="eyebrow text-gold/70">{t(program.title)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/50">{t(program.description)}</p>
                  <Link to="/programs/city-voices">
                    {t({ ar: "افتح صفحة البرنامج", en: "Open the programme page" })}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>

            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.2em] text-ivory/35">
                {t({ ar: "مصادر رسمية قابلة للفتح", en: "Official sources you can open" })}
              </p>
              <ul className="stories-sources">
                {SOURCES.map((source) => (
                  <li key={source.id}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      <span>
                        <span className="stories-sources__name">{t(source.name)}</span>
                        <span className="stories-sources__kind">{t(source.kind)}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="stories-policy__note">
                {t({
                  ar: "الصور توضيحية للهوية البصرية — لا تمثل أشخاصًا أو أماكن حقيقية. لا مقابلات مكتملة ولا تقارير مصوّرة منشورة بعد.",
                  en: "Images illustrate the visual identity — they are not real people or places. No finished interviews or filmed reports are published yet.",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
