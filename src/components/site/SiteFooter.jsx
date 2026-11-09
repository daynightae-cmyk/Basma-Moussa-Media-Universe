import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ASSETS } from "@/lib/experience/assets";
import { useI18n } from "@/lib/experience/i18n";
import { BRAND, WHATSAPP } from "@/lib/experience/content";
import { SOURCES } from "@/lib/experience/worldsContent";
import { requestIntroReplay } from "@/components/brand/GoldenThreadSplash";

const WORLDS = [
  { href: "/media", label: { ar: "عالم الإعلام", en: "Media Universe" } },
  { href: "/studio", label: { ar: "أرض البث الإبداعية", en: "Broadcast Floor" } },
  { href: "/soundroom", label: { ar: "مساحة صوت", en: "Soundroom" } },
  { href: "/legal-lens", label: { ar: "من زاوية القانون", en: "Legal Lens" } },
  { href: "/stories", label: { ar: "القصص والتوثيق", en: "Stories & Archive" } },
];

const PLATFORM = [
  { href: "/about", label: { ar: "عن بسمة", en: "About Basma" } },
  { href: "/ai-studio", label: { ar: "بسمة AI", en: "Basma AI" } },
  { href: "/contact", label: { ar: "تواصل للتعاون", en: "Collaborate" } },
  { href: "/privacy", label: { ar: "الخصوصية", en: "Privacy" } },
];

export default function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-gold/15 bg-ink-800">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={ASSETS.icon} alt="" className="h-10 w-10 rounded-full ring-1 ring-gold/30" />
              <div>
                <p className="font-display text-xl text-ivory">{t(BRAND.name)}</p>
                <p className="text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">{t(BRAND.product)}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/55">
              {t({
                ar: "عالم إعلامي عربي يجمع الحكاية الإنسانية، البحث القانوني، وصوت المكان.",
                en: "An Arabic-first media world joining human storytelling, legal research and the voice of place.",
              })}
            </p>
            <p className="mt-6 text-xs leading-relaxed text-ivory/35">{t(BRAND.concept)}</p>
          </div>

          <FooterColumn title={t({ ar: "العوالم", en: "The worlds" })} items={WORLDS} />
          <FooterColumn title={t({ ar: "المنصة", en: "The platform" })} items={PLATFORM} />

          <div>
            <p className="eyebrow text-gold/70">{t({ ar: "مصادر رسمية", en: "Official sources" })}</p>
            <ul className="mt-5 space-y-3">
              {SOURCES.slice(0, 3).map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-xs text-ivory/55 transition-colors hover:text-gold"
                  >
                    {t(source.name)}
                    <ArrowUpRight className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex border border-gold/40 px-4 py-2 text-[0.62rem] tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-ink-900"
            >
              {t({ ar: "راسل بسمة", en: "Message Basma" })}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.65rem] tracking-wide text-ivory/35">
            © 2026 {t({ ar: "بسمة موسى. الهوية البصرية والتصور محفوظان.", en: "Basma Moussa. Brand and concept. All rights reserved." })}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={requestIntroReplay}
              className="text-[0.62rem] uppercase tracking-[0.2em] text-ivory/45 transition-colors hover:text-gold"
            >
              {t({ ar: "أعد تشغيل المقدمة", en: "Replay the intro" })}
            </button>
            <Link to="/privacy" className="text-[0.62rem] uppercase tracking-[0.2em] text-ivory/45 transition-colors hover:text-gold">
              {t({ ar: "الخصوصية", en: "Privacy" })}
            </Link>
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-ivory/25">
              {t({ ar: "إصدار المفاهيم · ٢٠٢٦", en: "Concept release · 2026" })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  const { t } = useI18n();
  return (
    <div>
      <p className="eyebrow text-gold/70">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link to={item.href} className="text-xs text-ivory/55 transition-colors hover:text-gold">
              {t(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}