import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { SOUNDROOM_ROOMS } from "@/lib/experience/worldsContent";
import { ROOM_COMPONENTS } from "@/components/soundroom/Rooms";
import { useI18n } from "@/lib/experience/i18n";

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

function Soundroom() {
  const { t } = useI18n();
  const { room: requested } = Route.useSearch();
  const navigate = useNavigate({ from: "/soundroom" });

  const currentId = SOUNDROOM_ROOMS.some((r) => r.id === requested) ? requested : SOUNDROOM_ROOMS[0].id;
  const room = SOUNDROOM_ROOMS.find((r) => r.id === currentId);
  const RoomView = ROOM_COMPONENTS[room.id];

  const select = (id) => navigate({ search: { room: id }, replace: true });

  return (
    <div className="bg-ink-900">
      <header className="px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            <span className="eyebrow">{t({ ar: "غرفة الصوت", en: "The sound chamber" })}</span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.06] text-ivory">
            {t({ ar: "مساحة صوت", en: "Soundroom" })}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/55">
            {t({
              ar: "أربع غرف بتجربة مختلفة: تسجيل، ومونتاج، وتردد، واستماع. في كل غرفة مقاطع حقيقية تستمع إليها الآن — نماذج تعريفية من الاستوديو، لا حلقات منشورة.",
              en: "Four chambers, four different experiences: recording, editing, frequency and listening. Each one holds real takes you can play right now — studio samples, not published episodes.",
            })}
          </p>
        </div>
      </header>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
            <nav aria-label={t({ ar: "غرف الصوت", en: "Sound chambers" })} className="lg:sticky lg:top-28">
              <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
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
                {t({ ar: "الموجة والخط الزمني عناصر بصرية. الصوت في مشغّل كل غرفة.", en: "The waveform and timeline are visuals. The audio lives in each chamber's player." })}
              </p>
            </nav>

            <div className="min-h-[420px]">
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