import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Copy, Check, RotateCcw, Sparkles, X } from "lucide-react";
import { askBasma } from "@/lib/server-fns";
import { AI_STARTERS, SOURCES } from "@/lib/experience/worldsContent";
import { useI18n } from "@/lib/experience/i18n";

function greeting(lang) {
  return lang === "ar"
    ? "أهلًا بيك في عالم بسمة موسى. أنا مساعد ذكاء اصطناعي بيخدم المنصة — مش بسمة نفسها. أقدر أشرحلك العوالم، والبرامج المخططة، والمصادر الرسمية، وأساعدك توصل لأي صفحة. تحب نبدأ منين؟"
    : "Welcome to the Basma Moussa universe. I'm an AI assistant serving this platform — not Basma herself. I can explain the worlds, the planned programmes and the official sources, and help you find any page. Where would you like to start?";
}

export default function AiChat({ variant = "page", onClose }) {
  const { t, lang } = useI18n();
  const ask = useServerFn(askBasma);
  const [messages, setMessages] = useState(() => [{ role: "assistant", content: greeting(lang) }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const scroller = useRef(null);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [messages, busy]);

  const send = useCallback(
    async (text) => {
      const content = text.trim();
      if (!content || busy) return;
      setError(null);
      setDraft("");
      const history = [...messages, { role: "user", content }];
      setMessages(history);
      setBusy(true);
      try {
        const result = await ask({
          data: {
            messages: history.map((m) => ({ role: m.role, content: m.content })),
            lang,
          },
        });
        setMessages([...history, { role: "assistant", content: result.reply }]);
      } catch {
        setError(t({ ar: "تعذّر الوصول للمساعد الآن. جرّب مرة أخرى.", en: "The assistant is unreachable right now. Please try again." }));
      } finally {
        setBusy(false);
      }
    },
    [ask, busy, lang, messages, t]
  );

  // A retry re-runs the conversation that is already on screen. Calling send()
  // again would append the visitor's message a second time.
  const retry = useCallback(async () => {
    if (busy || messages.length === 0) return;
    setError(null);
    setBusy(true);
    try {
      const result = await ask({
        data: {
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          lang,
        },
      });
      setMessages([...messages, { role: "assistant", content: result.reply }]);
    } catch {
      setError(t({ ar: "تعذّر الوصول للمساعد الآن. جرّب مرة أخرى.", en: "The assistant is unreachable right now. Please try again." }));
    } finally {
      setBusy(false);
    }
  }, [ask, busy, lang, messages, t]);

  const reset = () => {
    setMessages([{ role: "assistant", content: greeting(lang) }]);
    setError(null);
  };

  const copy = async (message, index) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(index);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      /* clipboard may be blocked */
    }
  };

  const starters = AI_STARTERS[lang] ?? AI_STARTERS.ar;

  return (
    <div className={`flex flex-col ${variant === "panel" ? "h-[min(78vh,640px)]" : "h-[min(72vh,700px)]"} overflow-hidden border border-gold/20 bg-ink-800`}>
      <div className="flex items-center justify-between gap-3 border-b border-gold/15 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
          <div>
            <p className="text-sm text-ivory">{t({ ar: "بسمة AI", en: "Basma AI" })}</p>
            <p className="text-[0.55rem] uppercase tracking-[0.18em] text-gold/60">
              {t({ ar: "مساعد المنصة · ليس بسمة", en: "Platform assistant · not Basma" })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={reset}
            className="p-2 text-ivory/40 transition-colors hover:text-gold"
            aria-label={t({ ar: "محادثة جديدة", en: "New conversation" })}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="p-2 text-ivory/40 transition-colors hover:text-gold" aria-label={t({ ar: "إغلاق", en: "Close" })}>
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((message, index) => (
          <div key={index} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[85%] border px-3.5 py-2.5 text-[0.82rem] leading-relaxed ${
                message.role === "user"
                  ? "border-gold/30 bg-gold/10 text-ivory"
                  : "border-ivory/10 bg-ink-900/60 text-ivory/80"
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              {message.role === "assistant" && index > 0 && (
                <button
                  type="button"
                  onClick={() => copy(message, index)}
                  className="mt-2 inline-flex items-center gap-1 text-[0.55rem] uppercase tracking-[0.16em] text-ivory/30 transition-colors hover:text-gold"
                >
                  {copiedId === index ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copiedId === index ? t({ ar: "تم النسخ", en: "Copied" }) : t({ ar: "نسخ", en: "Copy" })}
                </button>
              )}
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex items-center gap-2 text-[0.7rem] text-ivory/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            {t({ ar: "يكتب…", en: "Writing…" })}
          </div>
        )}

        {error && (
          <div className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-[0.72rem] text-ivory/70">
            {error}
            <button
              type="button"
              onClick={() => void retry()}
              className="ms-2 text-gold underline-offset-2 hover:underline"
            >
              {t({ ar: "أعد المحاولة", en: "Retry" })}
            </button>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 border-t border-ivory/10 px-4 py-3">
          {starters.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => send(starter)}
              className="border border-ivory/15 px-2.5 py-1.5 text-[0.65rem] text-ivory/60 transition-colors hover:border-gold/50 hover:text-gold"
            >
              {starter}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
        className="flex items-end gap-2 border-t border-gold/15 p-3"
      >
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send(draft);
            }
          }}
          rows={2}
          placeholder={t({ ar: "اسأل عن العوالم أو البرامج أو المصادر…", en: "Ask about the worlds, programmes or sources…" })}
          className="flex-1 resize-none border border-ivory/15 bg-ink-900/60 px-3 py-2 text-[0.82rem] text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center bg-gold text-ink-900 transition-opacity disabled:opacity-40"
          aria-label={t({ ar: "إرسال", en: "Send" })}
        >
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </form>

      <p className="border-t border-ivory/10 px-4 py-2 text-[0.55rem] leading-relaxed text-ivory/25">
        {t({ ar: "مساعد ذكاء اصطناعي — قد يخطئ. راجع المصادر الرسمية: ", en: "An AI assistant — it can be wrong. Check the official sources: " })}
        {SOURCES.slice(0, 2).map((source) => (
          <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="text-gold/70 hover:text-gold">
            {t(source.name)}
            {" · "}
          </a>
        ))}
      </p>
    </div>
  );
}