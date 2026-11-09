import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mic, Sparkles } from "lucide-react";
import { Image } from "@/components/ui/image";
import { getProgram, PROGRAMS, STATUS_LABEL } from "@/lib/experience/content";
import { useI18n } from "@/lib/experience/i18n";

export const Route = createFileRoute("/_site/programs/$slug")({
  head: ({ params }) => {
    const program = getProgram(params.slug);
    const title = program ? `${program.title.ar} — بسمة موسى` : "عالم غير موجود — بسمة موسى";
    return {
      meta: [
        { title },
        { name: "description", content: program ? program.description.ar : "هذا الباب لا يؤدي إلى عالم بعد." },
      ],
    };
  },
  component: ProgramDetail,
});

function ProgramDetail() {
  const { slug } = Route.useParams();
  const { t, isAr } = useI18n();
  const program = getProgram(slug);
  const Back = isAr ? ArrowRight : ArrowLeft;

  if (!program) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="eyebrow text-gold/70">{t({ ar: "خارج المسار", en: "Off the path" })}</p>
        <h1 className="mt-4 max-w-lg font-display text-3xl text-ivory">
          {t({ ar: "هذا الباب لا يؤدي إلى عالم بعد.", en: "This door does not open onto a world yet." })}
        </h1>
        <Link to="/media" className="mt-8 border border-gold/40 px-5 py-3 text-[0.68rem] tracking-[0.16em] text-gold">
          {t({ ar: "استكشف عالم الإعلام", en: "Explore the Media Universe" })}
        </Link>
      </div>
    );
  }

  const others = PROGRAMS.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <div className="bg-ink-900">
      <section className="relative min-h-[62vh] w-full overflow-hidden">
        <Image src={program.image} alt="" fittingType="fill" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/40" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-[1400px] flex-col justify-end px-5 pb-12 pt-32 sm:px-8">
          <Link to="/media" className="mb-6 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-ivory/55 transition-colors hover:text-gold">
            <Back className="h-3.5 w-3.5" aria-hidden="true" />
            {t({ ar: "عالم الإعلام", en: "The Media Universe" })}
          </Link>
          <p className="eyebrow text-gold/85">{t(program.world)}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5.4vw,4rem)] leading-[1.04] text-ivory">
            {t(program.title)}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory/60">{t(program.description)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="border border-gold/40 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-gold">
              {t(STATUS_LABEL[program.status])}
            </span>
            <span className="text-[0.58rem] uppercase tracking-[0.16em] text-ivory/35">
              {t({ ar: "لا حلقات منشورة بعد", en: "No published episodes yet" })}
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <h2 className="font-display text-2xl text-ivory">{t({ ar: "الفكرة", en: "The idea" })}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/60">{t(program.body)}</p>

            <h2 className="mt-10 font-display text-2xl text-ivory">{t({ ar: "مخطط الإنتاج", en: "Production plan" })}</h2>
            <ul className="mt-4 space-y-3">
              {program.planned.ar.map((item, index) => (
                <li key={index} className="flex items-start gap-3 border-b border-ivory/8 pb-3 text-sm text-ivory/55">
                  <span className="mt-1 text-[0.55rem] tracking-[0.2em] text-gold/60">{String(index + 1).padStart(2, "0")}</span>
                  {t({ ar: item, en: program.planned.en[index] })}
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-ivory/12 p-5">
              <p className="flex items-center gap-2 eyebrow text-gold/75">
                <Mic className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ ar: "الحلقات", en: "Episodes" })}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/50">
                {t({
                  ar: "لا توجد حلقات مسجّلة أو منشورة. لن يظهر مشغّل صوتي قبل وجود ملف حقيقي — لا نعرض مشغّلًا وهميًا.",
                  en: "No episodes are recorded or published. A player will appear only once a real file exists — we do not show a fake player.",
                })}
              </p>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="border border-gold/20 bg-ink-800/60 p-5">
              <p className="eyebrow text-gold/75">{t({ ar: "اسأل بسمة AI", en: "Ask Basma AI" })}</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory/50">
                {t({
                  ar: "تقدر تسأل عن حالة هذا البرنامج، ومتى يُنشر، وإيه اللي متاح فعلًا الآن.",
                  en: "Ask about this programme's status, what would be published, and what actually exists today.",
                })}
              </p>
              <Link
                to="/ai-studio"
                className="mt-4 inline-flex items-center gap-2 border border-gold/40 px-4 py-2.5 text-[0.64rem] tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink-900"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ ar: "افتح مساحة المعرفة", en: "Open the knowledge desk" })}
              </Link>
            </div>

            <div className="border border-ivory/10 p-5">
              <p className="eyebrow text-ivory/50">{t({ ar: "عوالم أخرى", en: "Other worlds" })}</p>
              <ul className="mt-3 space-y-3">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to="/programs/$slug"
                      params={{ slug: item.slug }}
                      className="group flex items-center justify-between gap-3 text-sm text-ivory/60 transition-colors hover:text-gold"
                    >
                      {t(item.title)}
                      <ArrowRight className="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-100 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}