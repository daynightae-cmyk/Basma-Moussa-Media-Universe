import { Outlet } from "@tanstack/react-router";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import GoldenThreadSplash from "@/components/brand/GoldenThreadSplash";
import AssistantDock from "@/components/ai/AssistantDock";
import { useI18n } from "@/lib/experience/i18n";

export default function SiteLayout() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-ink-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[130] focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-ink-900"
      >
        {t({ ar: "تجاوز إلى المحتوى", en: "Skip to content" })}
      </a>

      <GoldenThreadSplash />

      <SiteHeader />
      <main id="main" className="min-h-[60vh]">
        <Outlet />
      </main>
      <SiteFooter />
      <AssistantDock />
    </div>
  );
}