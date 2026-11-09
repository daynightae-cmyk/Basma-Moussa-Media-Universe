import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw } from "lucide-react";
import { useI18n } from "@/lib/experience/i18n";

const clock = (value) => {
  if (!Number.isFinite(value) || value < 0) return "00:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export default function AudioPlayer({ src, title, note, disclosure }) {
  const { t } = useI18n();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
    setTime(0);
    setDuration(0);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const onOtherPlay = (event) => {
      if (event.detail !== audioRef.current) audioRef.current?.pause();
    };
    window.addEventListener("bm:audio-play", onOtherPlay);
    return () => window.removeEventListener("bm:audio-play", onOtherPlay);
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      window.dispatchEvent(new CustomEvent("bm:audio-play", { detail: el }));
      try {
        await el.play();
      } catch {
        setFailed(true);
      }
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Math.min(Math.max((el.currentTime || 0) + delta, 0), duration || 0);
    el.currentTime = next;
    setTime(next);
  };

  return (
    <div className="border border-gold/25 bg-ink-800/70 p-4 sm:p-5">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        muted={muted}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime || 0)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setTime(0);
        }}
        onError={() => setFailed(true)}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.55rem] uppercase tracking-[0.2em] text-gold/70">
            {t({ ar: "قيد التشغيل الآن", en: "Now playing" })}
          </p>
          <p className="mt-1 truncate font-display text-lg text-ivory">{t(title)}</p>
          {note && <p className="mt-1 text-[0.7rem] leading-relaxed text-ivory/45">{t(note)}</p>}
        </div>
        <button
          type="button"
          onClick={() => setMuted((value) => !value)}
          className="shrink-0 p-2 text-ivory/45 transition-colors hover:text-gold"
          aria-label={t(muted ? { ar: "إلغاء الكتم", en: "Unmute" } : { ar: "كتم", en: "Mute" })}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-ink-900"
          aria-label={t(playing ? { ar: "إيقاف مؤقت", en: "Pause" } : { ar: "تشغيل", en: "Play" })}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="p-1.5 text-ivory/40 transition-colors hover:text-gold"
          aria-label={t({ ar: "ارجع ١٠ ثوانٍ", en: "Back 10 seconds" })}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => seekBy(10)}
          className="p-1.5 text-ivory/40 transition-colors hover:text-gold"
          aria-label={t({ ar: "قدم ١٠ ثوانٍ", en: "Forward 10 seconds" })}
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={Math.min(time, duration || 0)}
          onChange={(event) => {
            const el = audioRef.current;
            if (!el) return;
            el.currentTime = Number(event.target.value);
            setTime(Number(event.target.value));
          }}
          className="flex-1 accent-gold"
          aria-label={t({ ar: "موضع التشغيل", en: "Seek" })}
        />

        <span className="shrink-0 text-[0.6rem] tabular-nums text-ivory/40">
          {clock(time)} / {clock(duration)}
        </span>
      </div>

      {failed && (
        <p className="mt-3 text-[0.65rem] leading-relaxed text-destructive/90">
          {t({ ar: "تعذّر تشغيل الملف. جرّب مرة أخرى أو افتح الصفحة في نافذة جديدة.", en: "The file could not play. Try again or open the page in a new tab." })}
        </p>
      )}

      {disclosure && <p className="mt-3 text-[0.6rem] leading-relaxed text-ivory/30">{t(disclosure)}</p>}
    </div>
  );
}