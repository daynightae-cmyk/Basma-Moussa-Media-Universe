import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { ASSETS } from "@/lib/experience/assets";
import { CONTACT_COPY } from "@/lib/experience/worldsContent";
import { WHATSAPP } from "@/lib/experience/content";
import { useI18n } from "@/lib/experience/i18n";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "تواصل للتعاون — بسمة موسى" },
      { name: "description", content: "للتعاون الإعلامي، الحوارات، والبحث التحريري — راسل بسمة مباشرة عبر واتساب." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();

  return (
    <div className="bg-ink-900">
      <section className="px-5 pb-14 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
              <span className="eyebrow">{t(CONTACT_COPY.eyebrow)}</span>
            </div>
            <h1 className="mt-5 max-w-xl font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.06] text-ivory">
              {t(CONTACT_COPY.title)}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/60">{t(CONTACT_COPY.lead)}</p>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 bg-gold px-6 py-4 text-[0.72rem] font-medium tracking-[0.12em] text-ink-900 transition-colors hover:bg-gold-light"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t(CONTACT_COPY.whatsappLabel)}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <p className="mt-3 text-[0.62rem] text-ivory/35">
              {t(CONTACT_COPY.whatsappSub)} · {t({ ar: "يفتح في نافذة جديدة", en: "Opens in a new tab" })}
            </p>

            <div className="mt-10 border border-ivory/10 p-5">
              <p className="eyebrow text-gold/70">{t(CONTACT_COPY.noFormTitle)}</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory/50">{t(CONTACT_COPY.noFormBody)}</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden border border-gold/20">
              <Image
                src={ASSETS.contact}
                alt={t({ ar: "مساحة تعاون توضيحية", en: "Illustrative collaboration space" })}
                fittingType="fill"
                className="aspect-[4/5] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
              <p className="absolute bottom-4 start-4 text-[0.55rem] uppercase tracking-[0.18em] text-ivory/60">
                {t({ ar: "مساحة تعاون توضيحية — ليست مكتبًا حقيقيًا", en: "Illustrative collaboration space — not a real office" })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-5 border-t border-ivory/10 pt-10 md:grid-cols-3">
            {CONTACT_COPY.themes.map((theme) => (
              <div key={theme.title.en} className="border border-ivory/10 p-5">
                <h2 className="font-display text-xl text-ivory">{t(theme.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ivory/50">{t(theme.body)}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl border-s-2 border-gold/30 ps-4 text-xs leading-relaxed text-ivory/35">
            {t(CONTACT_COPY.privacyNote)}
          </p>
        </div>
      </section>
    </div>
  );
}