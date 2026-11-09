import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ShieldCheck, Compass, Sparkles } from "lucide-react";
import AiChat from "@/components/ai/AiChat";
import { SOURCES } from "@/lib/experience/worldsContent";
import { useI18n } from "@/lib/experience/i18n";

const KNOWS = [
  { ar: "الهوية والرؤية المعتمدة", en: "The identity and approved vision" },
  { ar: "العوالم الستة ومساراتها", en: "The six worlds and their routes" },
  { ar: "البرامج المخططة وحالتها الحقيقية", en: "Planned programmes and their real status" },
  { ar: "مخططات التوعية القانونية", en: "The legal-awareness outlines" },
  { ar: "بوابات المصادر الرسمية في الإمارات", en: "Official UAE reference portals" },
  { ar: "قنوات التعاون المتاحة فعلًا", en: "The collaboration channel that actually exists" },
];

const QUICK = [
  { href: "/media", label: { ar: "عالم الإعلام", en: "Media Universe" } },
  { href: "/studio", label: { ar: "أرض البث", en: "Broadcast Floor" } },
  { href: "/soundroom", label: { ar: "مساحة صوت", en: "Soundroom" } },
  { href: "/legal-lens", label: { ar: "من زاوية القانون", en: "Legal Lens" } },
];

export const Route = createFileRoute("/_site/ai-studio")({
  head: () => ({
    meta: [
      { title: "بسمة AI — مساحة المعرفة | Basma AI" },
      { name: "description", content: "مساحة حوار مفتوحة عن العوالم والبرامج والبحث القانوني، بإجابات مرتبطة بمصادر معتمدة." },
    ],
  }),
  component: AiStudio,
});

function AiStudio() {
  const { t } = useI18n();

  return (
    <div className="bg-ink-900">
      <header className="px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            <span className="eyebrow">{t({ ar: "مساحة المعرفة", en: "The knowledge desk" })}</span>
          </div>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-ivory">
                {t({ ar: "بسمة AI", en: "Basma AI" })}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/55">
                {t({
                  ar: "مساحة حوار مفتوحة: اسأل بالعربية أو الإنجليزية عن العوالم والبرامج والبحث القانوني، وستحصل على إجابة مرتبطة بمصادر معتمدة فقط.",
                  en: "An open conversation desk: ask in Arabic or English about the worlds, the programmes and legal research, and get an answer grounded only in approved sources.",
                })}
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 border border-gold/30 px-3 py-2 text-[0.6rem] tracking-[0.14em] text-gold/80">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t({ ar: "مساعد ذكاء اصطناعي — ليس بسمة", en: "AI assistant — not Basma" })}
            </span>
          </div>
        </div>
      </header>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-6 xl:grid-cols-[1.55fr_1fr]">
          <div className="h-[72vh] min-h-[520px]">
            <AiChat variant="page" />
          </div>

          <aside className="space-y-5">
            <div className="border border-ivory/10 bg-ink-800/50 p-5">
              <p className="flex items-center gap-2 eyebrow text-gold/75">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ ar: "ما يعرفه", en: "What it knows" })}
              </p>
              <ul className="mt-3 space-y-2">
                {KNOWS.map((item) => (
                  <li key={item.en} className="flex gap-2 text-[0.78rem] leading-relaxed text-ivory/55">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" aria-hidden="true" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-ivory/10 bg-ink-800/50 p-5">
              <p className="flex items-center gap-2 eyebrow text-gold/75">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ ar: "حدوده", en: "Its limits" })}
              </p>
              <p className="mt-3 text-[0.78rem] leading-relaxed text-ivory/55">
                {t({
                  ar: "لا يخترع حلقات أو وقائع أو أحكامًا. لا يقدّم استشارة قانونية فردية، ولا يتحدث باسم بسمة. إذا لم يوجد مصدر مؤكد سيقول ذلك صراحة.",
                  en: "It does not invent episodes, events or rulings. It gives no individual legal advice and never speaks as Basma. If no source confirms something, it says so plainly.",
                })}
              </p>
            </div>

            <div className="border border-ivory/10 bg-ink-800/50 p-5">
              <p className="flex items-center gap-2 eyebrow text-gold/75">
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                {t({ ar: "انتقل مباشرة", en: "Jump straight in" })}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {QUICK.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="border border-ivory/12 px-3 py-2 text-[0.66rem] text-ivory/60 transition-colors hover:border-gold/45 hover:text-gold"
                  >
                    {t(item.label)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-ivory/10 p-5">
              <p className="eyebrow text-ivory/45">{t({ ar: "مصادر رسمية", en: "Official sources" })}</p>
              <ul className="mt-3 space-y-2">
                {SOURCES.map((source) => (
                  <li key={source.id}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[0.72rem] text-ivory/50 transition-colors hover:text-gold">
                      {t(source.name)}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.6rem] leading-relaxed text-ivory/30">
                {t({
                  ar: "المساعد ذكاء اصطناعي وقد يخطئ. تحقق دائمًا من المصدر الرسمي قبل الاعتماد على أي معلومة قانونية.",
                  en: "The assistant is AI and can be wrong. Always verify against the official source before relying on any legal information.",
                })}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}