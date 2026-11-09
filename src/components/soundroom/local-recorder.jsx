import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Mic, Pause, Play, Square, Trash2 } from "lucide-react";
import { useI18n } from "@/lib/experience/i18n";

/**
 * A real, local-only take recorder for the Soundroom booth.
 *
 * MediaRecorder captures the microphone into memory, the clip is played back
 * from a blob URL, and it can be downloaded as a file. Nothing is uploaded:
 * there is no fetch, no SDK call and no persistence, so closing or reloading
 * the page discards the take. One take is capped at five minutes to bound the
 * memory a tab can hold.
 */

const MAX_SECONDS = 300;
const MIME_CANDIDATES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];

function clock(value) {
  if (!Number.isFinite(value) || value < 0) return "00:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function sizeLabel(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatLabel(type) {
  if (!type) return "Audio";
  if (type.includes("mp4")) return "M4A · AAC";
  if (type.includes("ogg")) return "Ogg · Opus";
  if (type.includes("webm")) return "WebM · Opus";
  return type.split(";")[0].replace("audio/", "").toUpperCase();
}

function extensionFor(type) {
  if (type.includes("mp4")) return "m4a";
  if (type.includes("ogg")) return "ogg";
  return "webm";
}

function pickMimeType() {
  if (typeof window === "undefined" || typeof window.MediaRecorder !== "function") return "";
  if (typeof window.MediaRecorder.isTypeSupported !== "function") return "";
  return (
    MIME_CANDIDATES.find((type) => {
      try {
        return window.MediaRecorder.isTypeSupported(type);
      } catch {
        return false;
      }
    }) ?? ""
  );
}

function stopTracks(stream) {
  stream?.getTracks().forEach((track) => track.stop());
}

function clearTimer(ref) {
  if (ref.current !== null) {
    clearInterval(ref.current);
    ref.current = null;
  }
}

function mapError(error) {
  const name = error?.name ?? "";
  if (name === "NotAllowedError" || name === "SecurityError" || name === "PermissionDeniedError") return "denied";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "no-device";
  if (name === "NotReadableError" || name === "TrackStartError") return "busy";
  if (name === "NotSupportedError") return "unsupported";
  return "failed";
}

export function LocalRecorder() {
  const { t } = useI18n();
  const [status, setStatus] = useState("checking");
  const [elapsed, setElapsed] = useState(0);
  const [limitHit, setLimitHit] = useState(false);
  const [clip, setClip] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerError, setPlayerError] = useState(false);

  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const startedAtRef = useRef(0);
  const clipUrlRef = useRef(null);
  const audioRef = useRef(null);
  const playRef = useRef(null);
  const startRef = useRef(null);
  const focusPlayRef = useRef(false);
  const focusStartRef = useRef(false);
  const mountedRef = useRef(true);

  const releaseClip = useCallback(() => {
    audioRef.current?.pause();
    if (clipUrlRef.current) {
      URL.revokeObjectURL(clipUrlRef.current);
      clipUrlRef.current = null;
    }
  }, []);

  const finalize = useCallback(() => {
    clearTimer(timerRef);
    stopTracks(streamRef.current);
    streamRef.current = null;

    const type = recorderRef.current?.mimeType || "audio/webm";
    const blob = new Blob(chunksRef.current, { type });
    chunksRef.current = [];
    recorderRef.current = null;

    if (!blob.size) {
      if (mountedRef.current) {
        setStatus("failed");
        setElapsed(0);
      }
      return;
    }

    const seconds = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
    const url = URL.createObjectURL(blob);
    if (!mountedRef.current) {
      URL.revokeObjectURL(url);
      return;
    }

    clipUrlRef.current = url;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    setClip({
      url,
      type,
      size: blob.size,
      seconds,
      name: `basma-take-${stamp}.${extensionFor(type)}`
    });
    setElapsed(seconds);
    focusPlayRef.current = true;
    setStatus("recorded");
  }, []);

  const stop = useCallback(() => {
    clearTimer(timerRef);
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      try {
        recorder.stop();
      } catch {
        finalize();
      }
      return;
    }
    finalize();
  }, [finalize]);

  const start = useCallback(async () => {
    if (status === "requesting" || status === "recording") return;
    releaseClip();
    setClip(null);
    setPlaying(false);
    setPosition(0);
    setDuration(0);
    setPlayerError(false);
    setLimitHit(false);
    setElapsed(0);
    setStatus("requesting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      if (!mountedRef.current) {
        stopTracks(stream);
        return;
      }
      streamRef.current = stream;

      const mimeType = pickMimeType();
      let recorder;
      try {
        recorder = mimeType ? new window.MediaRecorder(stream, { mimeType }) : new window.MediaRecorder(stream);
      } catch {
        recorder = new window.MediaRecorder(stream);
      }

      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data?.size) chunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        clearTimer(timerRef);
        stopTracks(streamRef.current);
        streamRef.current = null;
        recorderRef.current = null;
        chunksRef.current = [];
        if (mountedRef.current) {
          setStatus("failed");
          setElapsed(0);
        }
      };
      recorder.onstop = () => finalize();

      recorder.start(1000);
      startedAtRef.current = Date.now();
      setStatus("recording");

      timerRef.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - startedAtRef.current) / 1000);
        setElapsed(seconds);
        if (seconds >= MAX_SECONDS) {
          setLimitHit(true);
          stop();
        }
      }, 250);
    } catch (error) {
      stopTracks(streamRef.current);
      streamRef.current = null;
      if (mountedRef.current) {
        setStatus(mapError(error));
        setElapsed(0);
      }
    }
  }, [finalize, releaseClip, status, stop]);

  const discard = useCallback(() => {
    releaseClip();
    setClip(null);
    setPlaying(false);
    setPosition(0);
    setDuration(0);
    setPlayerError(false);
    setElapsed(0);
    setLimitHit(false);
    focusStartRef.current = true;
    setStatus("idle");
  }, [releaseClip]);

  useEffect(() => {
    mountedRef.current = true;
    const supported =
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices?.getUserMedia) &&
      typeof window !== "undefined" &&
      typeof window.MediaRecorder === "function";
    setStatus(supported ? "idle" : "unsupported");

    return () => {
      mountedRef.current = false;
      clearTimer(timerRef);
      const recorder = recorderRef.current;
      if (recorder) {
        recorder.ondataavailable = null;
        recorder.onstop = null;
        recorder.onerror = null;
        if (recorder.state !== "inactive") {
          try {
            recorder.stop();
          } catch {
            /* the stream is released below either way */
          }
        }
        recorderRef.current = null;
      }
      chunksRef.current = [];
      stopTracks(streamRef.current);
      streamRef.current = null;
      if (clipUrlRef.current) {
        URL.revokeObjectURL(clipUrlRef.current);
        clipUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setPlaying(false);
    setPosition(0);
    setDuration(0);
    setPlayerError(false);
  }, [clip?.url]);

  // A control that disappears (stop → player, player → start) must hand focus
  // to its successor, or a keyboard user is dropped back onto the document.
  useEffect(() => {
    if (status === "recorded" && focusPlayRef.current) {
      focusPlayRef.current = false;
      playRef.current?.focus();
    }
    if (status === "idle" && focusStartRef.current) {
      focusStartRef.current = false;
      startRef.current?.focus();
    }
  }, [status]);

  const toggle = async () => {
    const element = audioRef.current;
    if (!element) return;
    if (element.paused) {
      window.dispatchEvent(new CustomEvent("bm:audio-play", { detail: element }));
      try {
        await element.play();
      } catch {
        setPlayerError(true);
      }
    } else {
      element.pause();
    }
  };

  const recording = status === "recording";
  const seekMax = duration > 0 ? duration : clip?.seconds ?? 0;

  const statusLine =
    status === "checking"
      ? t({ ar: "جارٍ تجهيز المسجّل…", en: "Preparing the recorder…" })
      : status === "requesting"
        ? t({ ar: "بانتظار إذن الميكروفون…", en: "Waiting for microphone permission…" })
        : recording
          ? t({ ar: "تسجيل محلي جارٍ", en: "Recording locally" })
          : status === "recorded"
            ? t({ ar: "المقطع جاهز", en: "Take ready" })
            : status === "denied"
              ? t({ ar: "رُفض الإذن", en: "Permission denied" })
              : status === "unsupported"
                ? t({ ar: "التسجيل غير مدعوم", en: "Recording unsupported" })
                : status === "no-device"
                  ? t({ ar: "لا يوجد ميكروفون", en: "No microphone" })
                  : status === "busy"
                    ? t({ ar: "الميكروفون مشغول", en: "Microphone busy" })
                    : status === "failed"
                      ? t({ ar: "فشل التسجيل", en: "Recording failed" })
                      : t({ ar: "الميكروفون مغلق", en: "Microphone closed" });

  const errorLine =
    status === "denied"
      ? t({
          ar: "اسمح بالميكروفون من إعدادات المتصفح لهذا الموقع، ثم أعد المحاولة.",
          en: "Allow the microphone for this site in your browser settings, then try again."
        })
      : status === "unsupported"
        ? t({
            ar: "هذا المتصفح لا يوفّر MediaRecorder لتسجيل الصوت. يمكنك الاستماع إلى النماذج أدناه.",
            en: "This browser does not provide MediaRecorder for audio capture. You can still listen to the samples below."
          })
        : status === "no-device"
          ? t({
              ar: "لم يُعثر على ميكروفون متصل. وصّل جهاز إدخال ثم أعد المحاولة.",
              en: "No microphone is connected. Attach an input device and try again."
            })
          : status === "busy"
            ? t({
                ar: "الميكروفون مستخدم في تطبيق آخر. أغلقه ثم أعد المحاولة.",
                en: "The microphone is in use by another app. Close it and try again."
              })
            : status === "failed"
              ? t({
                  ar: "تعذّر إكمال التسجيل، ولم يُحفظ أي شيء. أعد المحاولة.",
                  en: "The recording could not complete and nothing was saved. Try again."
                })
              : null;

  return (
    <div className="take-deck border border-gold/25 bg-ink-800/70 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="take-deck__micro text-[0.55rem] uppercase tracking-[0.2em] text-gold/70">
          {t({ ar: "غرفة الالتقاط", en: "The take deck" })}
        </p>
        <span
          role="status"
          aria-live="polite"
          className="inline-flex items-center gap-2 border border-ivory/10 px-2 py-1 text-[0.55rem] text-ivory/50"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              recording ? "animate-pulse bg-[#d9534f] motion-reduce:animate-none" : status === "recorded" ? "bg-gold" : "bg-ivory/30"
            }`}
            aria-hidden="true"
          />
          <span className="take-deck__micro uppercase tracking-[0.14em]">{statusLine}</span>
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="font-display text-3xl tabular-nums text-ivory" role="timer" aria-label={t({ ar: "مدة التسجيل", en: "Recording time" })}>
          {clock(elapsed)}
        </p>
        <p className="take-deck__micro max-w-[16rem] text-end text-[0.6rem] leading-relaxed text-ivory/35">
          {t({ ar: "الحد الأقصى ٥ دقائق للمقطع الواحد.", en: "One take is capped at 5 minutes." })}
        </p>
      </div>

      {!clip && (
        <div className="mt-4">
          <button
            ref={startRef}
            type="button"
            onClick={recording ? stop : () => void start()}
            disabled={status === "checking" || status === "unsupported"}
            aria-disabled={!recording && status === "requesting" ? true : undefined}
            aria-busy={!recording && status === "requesting" ? true : undefined}
            className="take-deck__micro inline-flex min-h-11 w-full items-center justify-center gap-2 border border-gold bg-gold px-4 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-900 transition-colors hover:bg-gold/85 disabled:cursor-not-allowed disabled:opacity-45 aria-disabled:opacity-70 sm:w-auto"
          >
            {recording ? <Square className="h-3.5 w-3.5" aria-hidden="true" /> : <Mic className="h-3.5 w-3.5" aria-hidden="true" />}
            {recording
              ? t({ ar: "إيقاف التسجيل", en: "Stop recording" })
              : status === "requesting"
                ? t({ ar: "بانتظار الإذن…", en: "Requesting permission…" })
                : t({ ar: "بدء التسجيل", en: "Start recording" })}
          </button>
        </div>
      )}

      {clip && (
        <div className="mt-4 border-t border-ivory/10 pt-4">
          <audio
            ref={audioRef}
            src={clip.url}
            preload="metadata"
            onLoadedMetadata={(event) => {
              const value = event.currentTarget.duration;
              if (Number.isFinite(value) && value > 0) setDuration(value);
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime || 0)}
            onEnded={(event) => {
              event.currentTarget.currentTime = 0;
              setPlaying(false);
              setPosition(0);
            }}
            onError={() => {
              if (clipUrlRef.current) setPlayerError(true);
            }}
          />

          <div className="flex items-center gap-3">
            <button
              ref={playRef}
              type="button"
              onClick={() => void toggle()}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-ink-900"
              aria-label={t(playing ? { ar: "إيقاف مؤقت", en: "Pause" } : { ar: "تشغيل المقطع", en: "Play take" })}
            >
              {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </button>
            <div className="min-w-0 flex-1">
              <input
                type="range"
                min="0"
                max={seekMax || 0}
                step="0.1"
                value={Math.min(position, seekMax || 0)}
                onChange={(event) => {
                  const element = audioRef.current;
                  if (!element) return;
                  const next = Number(event.target.value);
                  element.currentTime = next;
                  setPosition(next);
                }}
                className="w-full min-w-0 accent-gold"
                aria-label={t({ ar: "موضع التشغيل", en: "Seek" })}
              />
              <span className="mt-1 flex justify-end text-[0.6rem] tabular-nums text-ivory/40 sm:hidden">
                {clock(position)} / {clock(seekMax)}
              </span>
            </div>
            <span className="hidden shrink-0 text-[0.6rem] tabular-nums text-ivory/40 sm:block">
              {clock(position)} / {clock(seekMax)}
            </span>
          </div>

          <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.6rem] text-ivory/40">
            <div className="flex gap-1.5">
              <dt>{t({ ar: "المدة", en: "Length" })}</dt>
              <dd className="tabular-nums text-ivory/65">{clock(clip.seconds)}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt>{t({ ar: "الحجم", en: "Size" })}</dt>
              <dd className="tabular-nums text-ivory/65">{sizeLabel(clip.size)}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt>{t({ ar: "الصيغة", en: "Format" })}</dt>
              <dd className="text-ivory/65">{formatLabel(clip.type)}</dd>
            </div>
          </dl>

          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={clip.url}
              download={clip.name}
              className="inline-flex min-h-10 items-center gap-2 border border-gold/50 px-3 text-[0.65rem] text-gold transition-colors hover:bg-gold hover:text-ink-900"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              {t({ ar: "تنزيل المقطع", en: "Download take" })}
            </a>
            <button
              type="button"
              onClick={discard}
              className="inline-flex min-h-10 items-center gap-2 border border-ivory/15 px-3 text-[0.65rem] text-ivory/55 transition-colors hover:border-destructive/60 hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              {t({ ar: "حذف المقطع", en: "Discard take" })}
            </button>
          </div>

          {playerError && (
            <p className="mt-3 text-[0.65rem] leading-relaxed text-destructive/90">
              {t({
                ar: "تعذّر تشغيل المقطع في هذا المتصفح. يمكنك تنزيله وتشغيله في تطبيق آخر.",
                en: "This browser could not play the take. Download it and open it in another app."
              })}
            </p>
          )}
        </div>
      )}

      {limitHit && (
        <p className="mt-3 text-[0.65rem] leading-relaxed text-gold/80">
          {t({ ar: "وصلت إلى حد ٥ دقائق، وتوقف التسجيل تلقائيًا.", en: "You reached the 5-minute limit, so recording stopped automatically." })}
        </p>
      )}

      {errorLine && (
        <p role="alert" className="mt-3 text-[0.65rem] leading-relaxed text-destructive/90">
          {errorLine}
        </p>
      )}

      <p className="mt-4 border-t border-ivory/10 pt-3 text-[0.6rem] leading-relaxed text-ivory/35">
        {t({
          ar: "يبقى الصوت في ذاكرة هذه الصفحة فقط. لا يُرفع إلى أي خادم، ويُحذف عند إغلاق الصفحة أو إعادة تحميلها.",
          en: "Audio stays in this page's memory only. Nothing is uploaded, and it is discarded when you close or reload the page."
        })}
      </p>
    </div>
  );
}
