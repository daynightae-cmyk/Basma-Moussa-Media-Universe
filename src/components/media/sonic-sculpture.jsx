import "@/styles/production/sonic-sculpture.css";
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
const RINGS = [
  { band: "low", count: 14, size: 0.92 },
  { band: "mid", count: 10, size: 0.62 },
  { band: "high", count: 7, size: 0.36 }
];
function SonicSculpture({ locale, copy }) {
  const ar = locale === "ar";
  const [status, setStatus] = useState("idle");
  const [level, setLevel] = useState(0);
  const [bands, setBands] = useState({ low: 0, mid: 0, high: 0 });
  const stageRef = useRef(null);
  const streamRef = useRef(null);
  const contextRef = useRef(null);
  const frameRef = useRef(null);
  const smoothRef = useRef({ low: 0, mid: 0, high: 0, level: 0 });
  const paintRef = useRef(0);
  const rest = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    ["--low", "--mid", "--high", "--level"].forEach((property) => {
      stage.style.setProperty(property, "0");
    });
  }, []);
  const teardown = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (contextRef.current) {
      void contextRef.current.close();
      contextRef.current = null;
    }
    smoothRef.current = { low: 0, mid: 0, high: 0, level: 0 };
    setLevel(0);
    setBands({ low: 0, mid: 0, high: 0 });
    rest();
  }, [rest]);
  useEffect(() => () => teardown(), [teardown]);
  const sculpture = useCallback((stream, context) => {
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.72;
    source.connect(analyser);
    const frequency = new Uint8Array(analyser.frequencyBinCount);
    const band = (from, to) => {
      let sum = 0;
      const end = Math.min(to, frequency.length);
      for (let index = from; index < end; index += 1) sum += frequency[index];
      return Math.min(1, sum / Math.max(1, end - from) / 210);
    };
    const tick = (time) => {
      analyser.getByteFrequencyData(frequency);
      const smooth = smoothRef.current;
      smooth.low += (band(1, 8) - smooth.low) * 0.22;
      smooth.mid += (band(9, 55) - smooth.mid) * 0.26;
      smooth.high += (band(56, 190) - smooth.high) * 0.32;
      const energy = (smooth.low * 0.5 + smooth.mid * 0.32 + smooth.high * 0.18) * 1.5;
      smooth.level += (Math.min(1, energy) - smooth.level) * 0.3;
      const stage = stageRef.current;
      if (stage) {
        stage.style.setProperty("--low", smooth.low.toFixed(3));
        stage.style.setProperty("--mid", smooth.mid.toFixed(3));
        stage.style.setProperty("--high", smooth.high.toFixed(3));
        stage.style.setProperty("--level", smooth.level.toFixed(3));
      }
      if (time - paintRef.current > 120) {
        paintRef.current = time;
        setLevel(smooth.level);
        setBands({ low: smooth.low, mid: smooth.mid, high: smooth.high });
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, []);
  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    teardown();
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      streamRef.current = stream;
      const Ctor = window.AudioContext ?? window.webkitAudioContext;
      if (!Ctor) {
        setStatus("unsupported");
        return;
      }
      const context = new Ctor();
      contextRef.current = context;
      await context.resume().catch(() => void 0);
      sculpture(stream, context);
      setStatus("active");
    } catch (error) {
      const name = error instanceof DOMException ? error.name : "";
      setStatus(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "error");
    }
  }, [sculpture, teardown]);
  const stop = useCallback(() => {
    teardown();
    setStatus("idle");
  }, [teardown]);
  const statusLine = status === "active" ? copy.live : status === "requesting" ? copy.requesting : status === "denied" ? copy.denied : status === "unsupported" ? copy.unsupported : status === "error" ? copy.error : copy.idle;
  const percentage = Math.round(level * 100);
  const bandRows = [
    { key: "low", label: copy.low },
    { key: "mid", label: copy.mid },
    { key: "high", label: copy.high }
  ];
  return <div className="sculpture" data-status={status}>
      <div
    className="sculpture__stage"
    ref={stageRef}
    data-testid="sonic-sculpture"
    role="img"
    aria-label={ar ? "\u0646\u062D\u062A \u0632\u062C\u0627\u062C\u064A \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u064A\u062A\u0641\u0627\u0639\u0644 \u0645\u0639 \u0627\u0644\u0635\u0648\u062A" : "a glass 3D sculpture reacting to sound"}
  >
        <span className="sculpture__halo" aria-hidden="true" />
        <div className="sculpture__field" aria-hidden="true">
          {RINGS.map((ring) => <div
    key={ring.band}
    className="sculpture__ring"
    data-band={ring.band}
    style={{ "--ring-size": ring.size }}
  >
              {Array.from({ length: ring.count }).map((_, blade) => <span
    key={blade}
    className="sculpture__blade"
    style={{ "--angle": `${360 / ring.count * blade}deg` }}
  />)}
            </div>)}
          <span className="sculpture__core" />
          <span className="sculpture__disc" />
        </div>
      </div>

      <div className="sculpture__rail">
        <div className="sculpture__controls">
          {status === "active" ? <button type="button" className="btn btn-ghost mic-btn" onClick={stop}>
              {copy.stop}
            </button> : <button
    type="button"
    className="btn btn-gold mic-btn"
    onClick={() => void start()}
    disabled={status === "requesting"}
  >
              {status === "requesting" ? copy.requesting : copy.enable}
            </button>}
          <span className="sculpture__status" role="status" aria-live="polite">
            {statusLine}
          </span>
        </div>

        <div
    className="sculpture__meter"
    role="meter"
    aria-label={copy.meterLabel}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={percentage}
  >
          <span className="sculpture__meter-fill" style={{ width: `${percentage}%` }} />
        </div>

        <dl className="sculpture__bands">
          {bandRows.map((row) => <div key={row.key} className="sculpture__band" data-band={row.key}>
              <dt>{row.label}</dt>
              <dd>
                <span className="sculpture__band-track">
                  <span
    className="sculpture__band-fill"
    style={{ width: `${Math.round(bands[row.key] * 100)}%` }}
  />
                </span>
              </dd>
            </div>)}
        </dl>

        <p className="sculpture__privacy">{copy.privacy}</p>
      </div>
    </div>;
}
export {
  SonicSculpture
};
