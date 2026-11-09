import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Sparkles, X } from "lucide-react";
import AiChat from "@/components/ai/AiChat";
import { useI18n } from "@/lib/experience/i18n";

export default function AssistantDock() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname === "/ai-studio") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 end-5 z-[80] flex items-center gap-2 border border-gold/40 bg-ink-900/90 px-4 py-3 text-[0.65rem] uppercase tracking-[0.18em] text-gold backdrop-blur-md transition-colors hover:bg-gold hover:text-ink-900"
        aria-label={t({ ar: "افتح بسمة AI", en: "Open Basma AI" })}
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        {t({ ar: "بسمة AI", en: "Basma AI" })}
      </button>

      {open && (
        <div
          className="fixed inset-x-3 bottom-20 z-[85] sm:inset-x-auto sm:end-5 sm:w-[400px]"
          role="dialog"
          aria-modal="false"
          aria-label={t({ ar: "بسمة AI", en: "Basma AI" })}
        >
          <div className="relative shadow-2xl">
            <AiChat variant="panel" onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}