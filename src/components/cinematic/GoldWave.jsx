import { useEffect, useRef } from "react";

/**
 * Reusable gold waveform sculpture. Decorative only — it is not derived from
 * any audio file and never pretends to be a live signal.
 */
export default function GoldWave({ mode = "pulse", className = "", bars = 64, height = 220, tone = "gold" }) {
  const pathRef = useRef(null);
  const frame = useRef(0);

  const speedMap = { slow: 0.006, pulse: 0.02, still: 0 };
  const speed = speedMap[mode] ?? 0.02;

  useEffect(() => {
    if (speed === 0 || !pathRef.current) return undefined;
    let t = 0;
    let raf = 0;
    const w = 800;
    const h = height;
    const mid = h / 2;

    const render = () => {
      t += speed;
      const points = [];
      for (let i = 0; i <= bars; i += 1) {
        const x = (i / bars) * w;
        const amp =
          Math.sin(i * 0.28 + t) * 0.5 +
          Math.sin(i * 0.11 - t * 0.7) * 0.3 +
          Math.sin(i * 0.6 + t * 1.6) * 0.2;
        const envelope = Math.sin((i / bars) * Math.PI);
        const y = mid + amp * envelope * (h * 0.38);
        points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      if (pathRef.current) pathRef.current.setAttribute("d", points.join(" "));
      frame.current = requestAnimationFrame(render);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      render();
      cancelAnimationFrame(frame.current);
      return undefined;
    }

    frame.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame.current);
  }, [speed, bars, height]);

  const stroke = tone === "champagne" ? "#F2D7A0" : "#D7AB62";

  return (
    <svg
      viewBox={`0 0 800 ${height}`}
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`waveFade-${tone}`} x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={stroke} stopOpacity="0" />
          <stop offset="0.2" stopColor={stroke} stopOpacity="0.9" />
          <stop offset="0.8" stopColor={stroke} stopOpacity="0.9" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={`M0 ${height / 2} L800 ${height / 2}`}
        stroke={`url(#waveFade-${tone})`}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <line x1="0" y1={height / 2} x2="800" y2={height / 2} stroke={stroke} strokeOpacity="0.16" strokeWidth="1" />
    </svg>
  );
}