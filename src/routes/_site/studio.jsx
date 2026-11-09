import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Aperture, Lightbulb, Layers, Info, ArrowUpRight, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { STUDIO_SCENES, CAMERA_VIEWS, LIGHTING_MODES } from "@/lib/experience/worldsContent";
import { PROGRAMS, STATUS_LABEL } from "@/lib/experience/content";
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

function Studio() {
  const { t, lang } = useI18n();
  const [sceneId, setSceneId] = useState(STUDIO_SCENES[0].id);
  const [cameraId, setCameraId] = useState(CAMERA_VIEWS[0].id);
  const [lightId, setLightId] = useState(LIGHTING_MODES[0].id);
  const [notesOpen, setNotesOpen] = useState(false);

  const scene = useMemo(() => STUDIO_SCENES.find((s) => s.id === sceneId) ?? STUDIO_SCENES[0], [sceneId]);
  const camera = useMemo(() => CAMERA_VIEWS.find((c) => c.id === cameraId) ?? CAMERA_VIEWS[0], [cameraId]);
  const light = useMemo(() => LIGHTING_MODES.find((l) => l.id === lightId) ?? LIGHTING_MODES[0], [lightId]);
  const program = useMemo(() => {
    const map = {
      main: "beyond-the-frame",
      conversation: "beyond-the-frame",
      documentary: "city-voices",
      legal: "the-legal-lens",
      audio: "soundroom",
      vision: "soundroom",
    };
    return PROGRAMS.find((p) => p.slug === map[scene.id]) ?? PROGRAMS[0];
  }, [scene.id]);

  return (
    <div className="bg-ink-900">
      <div className="pt-16"><StudioExperience dict={getDictionary(lang)} locale={lang} /></div>
      <header className="px-5 pb-8 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            <span className="eyebrow">{t({ ar: "خلف الرؤية", en: "Behind the vision" })}</span>
          </div>
          <h1 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.06] text-ivory">
            {t({ ar: "أرض البث الإبداعية", en: "The Creative Broadcast Floor" })}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-ivory/55">
            {t({
              ar: "استوديو رقمي تفاعلي: اختر المشهد، حرّك زاوية الكاميرا التصورية، وغيّر الإضاءة. كل تغيير يظهر فورًا في شاشة المعاينة. هذه بيئة برمجية، ليست استوديو ماديًا ولا بثًّا حيًّا.",
              en: "An interactive virtual stage: pick a scene, move the conceptual camera, change the lighting. Every choice changes the preview instantly. This is software — not a physical studio and not a live broadcast.",
            })}
          </p>
        </div>
      </header>

      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
            {/* STAGE */}
            <div className="relative overflow-hidden border border-gold/20 bg-[#03050C]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-[900ms] ease-out"
                  style={{ transform: `scale(${camera.scale}) translate(${camera.x}%, ${camera.y}%)` }}
                >
                  <Image src={scene.image} alt="" fittingType="fill" className="h-full w-full" />
                </div>
                <div className="absolute inset-0 transition-all duration-700" style={{ background: light.overlay }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${light.tint}22 0%, rgba(3,5,12,0.55) 62%, rgba(3,5,12,0.92) 100%)` }} />
                <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(251,247,239,0.5) 0px, rgba(251,247,239,0.5) 1px, transparent 1px, transparent 4px)" }} />

                {["top-4 start-4 border-s border-t", "top-4 end-4 border-e border-t", "bottom-4 start-4 border-s border-b", "bottom-4 end-4 border-e border-b"].map((cls) => (
                  <span key={cls} className={`pointer-events-none absolute h-6 w-6 border-ivory/35 ${cls}`} aria-hidden="true" />
                ))}

                <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 sm:p-5">
                  <span className="flex items-center gap-2 border border-ivory/20 bg-ink-900/55 px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.2em] text-ivory/75 backdrop-blur-sm">
                    <Aperture className="h-3 w-3 text-gold" aria-hidden="true" />
                    {t({ ar: "مشهد تصوري", en: "Concept scene" })}
                  </span>
                  <span className="text-[0.52rem] uppercase tracking-[0.2em] text-ivory/45">
                    {t({ ar: "بيئة افتراضية — ليست بثًّا حيًّا", en: "Virtual stage — not live" })}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex flex-wrap items-end justify-between gap-3 border-t border-ivory/15 pt-3">
                    <div>
                      <p className="eyebrow text-gold/85">{t(scene.label)}</p>
                      <p className="mt-1 font-display text-xl text-ivory sm:text-2xl">{t(program.title)}</p>
                    </div>
                    <div className="text-end">
                      <p className="text-[0.52rem] uppercase tracking-[0.2em] text-ivory/40">{t(camera.label)} · {t(camera.label2)}</p>
                      <p className="mt-1 text-[0.52rem] uppercase tracking-[0.2em] text-ivory/40">{t(light.label)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ivory/10 bg-ink-800/70 px-4 py-3">
                <p className="text-[0.58rem] tracking-wide text-ivory/40">
                  {t({ ar: "التغييرات تظهر في المعاينة مباشرة.", en: "Changes appear in the preview instantly." })}
                </p>
                <button
                  type="button"
                  onClick={() => setNotesOpen((v) => !v)}
                  className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light"
                  aria-expanded={notesOpen}
                >
                  <Info className="h-3.5 w-3.5" aria-hidden="true" />
                  {t(notesOpen ? { ar: "إغلاق المشهد", en: "Close scene note" } : { ar: "عن هذا المشهد", en: "About this scene" })}
                </button>
              </div>

              {notesOpen && (
                <div className="border-t border-gold/20 bg-ink-800 px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-gold/80">{t(scene.label)}</p>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ivory/60">{t(scene.note)}</p>
                      <p className="mt-3 text-[0.62rem] leading-relaxed text-ivory/35">
                        {t({
                          ar: "كل الصور في هذه البيئة توضيحية، ولا تُصوّر موقعًا حقيقيًا أو فريق عمل فعليًا.",
                          en: "Every image in this environment is illustrative; none depicts a real venue or an actual crew.",
                        })}
                      </p>
                    </div>
                    <button type="button" onClick={() => setNotesOpen(false)} aria-label={t({ ar: "إغلاق", en: "Close" })} className="text-ivory/50 hover:text-ivory">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CONSOLE */}
            <div className="border border-ivory/10 bg-ink-800/70 p-5">
              <div className="flex items-center gap-2 border-b border-ivory/10 pb-3">
                <Layers className="h-4 w-4 text-gold" aria-hidden="true" />
                <p className="eyebrow text-ivory/70">{t({ ar: "وحدة التحكم", en: "Control console" })}</p>
              </div>

              <div className="mt-5">
                <p className="text-[0.58rem] uppercase tracking-[0.2em] text-ivory/40">{t({ ar: "مشهد الاستوديو", en: "Studio scene" })}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {STUDIO_SCENES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSceneId(item.id)}
                      aria-pressed={sceneId === item.id}
                      className={`border px-3 py-2.5 text-start text-[0.7rem] leading-tight transition-colors ${
                        sceneId === item.id
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-ivory/12 text-ivory/60 hover:border-gold/40 hover:text-ivory"
                      }`}
                    >
                      {t(item.label)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-ivory/40">
                  <Aperture className="h-3 w-3 text-gold/70" aria-hidden="true" />
                  {t({ ar: "زاوية الكاميرا", en: "Camera perspective" })}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CAMERA_VIEWS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCameraId(item.id)}
                      aria-pressed={cameraId === item.id}
                      className={`border px-3 py-1.5 text-[0.64rem] tracking-[0.1em] transition-colors ${
                        cameraId === item.id ? "border-gold text-gold" : "border-ivory/12 text-ivory/55 hover:border-gold/40"
                      }`}
                    >
                      {t(item.label)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-ivory/40">
                  <Lightbulb className="h-3 w-3 text-gold/70" aria-hidden="true" />
                  {t({ ar: "الإضاءة", en: "Lighting" })}
                </p>
                <div className="mt-3 space-y-2">
                  {LIGHTING_MODES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLightId(item.id)}
                      aria-pressed={lightId === item.id}
                      className={`flex w-full items-center gap-3 border px-3 py-2 text-start text-[0.68rem] transition-colors ${
                        lightId === item.id ? "border-gold text-gold" : "border-ivory/12 text-ivory/55 hover:border-gold/40"
                      }`}
                    >
                      <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: item.swatch }} aria-hidden="true" />
                      {t(item.label)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-ivory/10 pt-4">
                <p className="text-[0.58rem] uppercase tracking-[0.2em] text-ivory/40">{t({ ar: "البرنامج المرتبط", en: "Linked programme" })}</p>
                <p className="mt-2 font-display text-lg text-ivory">{t(program.title)}</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-gold/70">{t(STATUS_LABEL[program.status])}</p>
                <Link
                  to="/programs/$slug"
                  params={{ slug: program.slug }}
                  className="group mt-3 inline-flex items-center gap-2 border border-gold/40 px-3 py-2 text-[0.62rem] tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink-900"
                >
                  {t({ ar: "افتح صفحة البرنامج", en: "Open the programme" })}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}