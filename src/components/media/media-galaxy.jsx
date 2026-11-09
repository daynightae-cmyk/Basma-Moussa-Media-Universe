import "@/styles/production/media-galaxy.css";
"use client";
import { useRef, useState } from "react";
import clsx from "clsx";
import { WORLDS as PORTAL_WORLDS } from "@/lib/experience/content";
import { getDictionary } from "@/lib/production/dictionary";
const COUNT = PORTAL_WORLDS.length;
const STEP = 360 / COUNT;
function MediaGalaxy({ locale }) {
  const ar = locale === "ar";
  const dict = getDictionary(locale);
  const [index, setIndex] = useState(0);
  const [spin, setSpin] = useState(0);
  const drag = useRef(null);
  const world = PORTAL_WORLDS[index];
  const goTo = (next) => {
    const wrapped = (next % COUNT + COUNT) % COUNT;
    setIndex(wrapped);
    setSpin(-wrapped * STEP);
  };
  const onKey = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const step = (event.key === "ArrowRight" ? 1 : -1) * (ar ? -1 : 1);
      goTo(index + step);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      goTo(event.key === "Home" ? 0 : COUNT - 1);
    }
  };
  const pointerDown = (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    drag.current = { x: event.clientX, spin, id: event.pointerId };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch { /* Gracefully ignore unavailable browser storage or pointer capture. */ }
  };
  const pointerMove = (event) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 6) return;
    setSpin(start.spin + dx * 0.55);
  };
  const pointerUp = (event) => {
    const start = drag.current;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 40) {
      setSpin(-index * STEP);
      return;
    }
    const released = start.spin + dx * 0.55;
    const target = -Math.round(released / STEP);
    goTo((target % COUNT + COUNT) % COUNT);
  };
  return <section className="galaxy" aria-labelledby="galaxy-title">
      <div className="shell shell--wide">
        <header className="galaxy__head">
          <p className="eyebrow eyebrow-gold">
            {ar ? "\u0639\u0627\u0644\u0645 \u0627\u0644\u0625\u0639\u0644\u0627\u0645 \xB7 \u0627\u0644\u0645\u062C\u0631\u0629" : "Media Universe \xB7 The Galaxy"}
          </p>
          <h2 id="galaxy-title" className="display display-m">
            {ar ? "\u0645\u062C\u0631\u0629 \u0627\u0644\u0625\u0639\u0644\u0627\u0645" : "The Media Galaxy"}
          </h2>
          <p className="lead">
            {ar ? "\u0643\u0644 \u0628\u0631\u0646\u0627\u0645\u062C \u0628\u0648\u0627\u0628\u0629 \u0645\u0636\u064A\u0626\u0629 \u0641\u064A \u0645\u062F\u0627\u0631\u0647\u0627\u060C \u0648\u0627\u0644\u062E\u064A\u0648\u0637 \u0627\u0644\u0630\u0647\u0628\u064A\u0629 \u062A\u0635\u0644 \u0627\u0644\u062D\u0643\u0627\u064A\u0627\u062A \u0628\u0628\u0639\u0636\u0647\u0627. \u062F\u0648\u0651\u0631 \u0627\u0644\u0645\u062C\u0631\u0629\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0628\u0648\u0627\u0628\u0629 \u0644\u062A\u062F\u062E\u0644 \u0639\u0627\u0644\u0645\u0647\u0627." : "Every program is a lit gate in its own orbit, and golden threads tie the stories together. Turn the galaxy, then choose a gate to enter its world."}
          </p>
        </header>

        <div className="galaxy__stage">
          <div
    className="galaxy__scene"
    role="group"
    aria-roledescription={ar ? "\u0645\u062C\u0631\u0629 \u062A\u0641\u0627\u0639\u0644\u064A\u0629" : "interactive galaxy"}
    data-testid="media-galaxy"
    onKeyDown={onKey}
    onPointerDown={pointerDown}
    onPointerMove={pointerMove}
    onPointerUp={pointerUp}
    onPointerCancel={() => {
      drag.current = null;
    }}
    onDragStart={(event) => event.preventDefault()}
  >
          <span className="galaxy__sky" aria-hidden="true" />
          <div className="galaxy__ring" style={{ transform: `rotateY(${spin}deg)` }}>
            <span className="galaxy__orbit galaxy__orbit--outer" aria-hidden="true" />
            <span className="galaxy__orbit galaxy__orbit--inner" aria-hidden="true" />
            {PORTAL_WORLDS.map((item, position) => {
    const itemAsset = { src: item.image, focalPoint: { x: 50, y: 50 } };
    const angle = position * STEP;
    const active = position === index;
    return <div
      key={item.id}
      className="galaxy__slot"
      style={{ transform: `rotateY(${angle}deg) translateZ(var(--galaxy-radius))` }}
    >
                  <span
      className="galaxy__thread"
      aria-hidden="true"
      style={{
        transform: `rotateY(${angle}deg) translateZ(calc(var(--galaxy-radius) / 2)) rotateX(90deg)`
      }}
    />
                  <button
      type="button"
      className={clsx("galaxy__gate", active && "is-active")}
      style={{ transform: `rotateY(${-spin - angle}deg)` }}
      aria-pressed={active}
      aria-label={item.title[locale]}
      onClick={() => active ? void 0 : goTo(position)}
    >
                    <span className="galaxy__gate-frame" aria-hidden="true">
                      <img
      src={itemAsset.src}
      alt=""
      draggable={false}
      className="galaxy__gate-image"
      style={{
        objectFit: "cover",
        objectPosition: `${itemAsset.focalPoint.x}% ${itemAsset.focalPoint.y}%`
      }}
    />
                      <span className="galaxy__gate-veil" />
                    </span>
                    <span className="galaxy__gate-index" aria-hidden="true">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="galaxy__gate-kicker">{item.kicker[locale]}</span>
                    <span className="galaxy__gate-title">{item.title[locale]}</span>
                  </button>
                </div>;
  })}
            <span className="galaxy__core" aria-hidden="true">
              <span className="galaxy__core-halo" />
              <span className="galaxy__core-pin" />
            </span>
          </div>
          </div>

          <aside className="galaxy__card" aria-label={world.title[locale]}>
            <div className="galaxy__card-meta">
              <span className="galaxy__card-count">
                <span dir="ltr">
                  {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                </span>
              </span>
              <span className="badge badge--concept">{world.status === "concept" ? ar ? "\u062A\u0635\u0648\u0651\u0631" : "Concept" : world.status}</span>
            </div>
            <p className="galaxy__card-kicker">{world.kicker[locale]}</p>
            <h3 className="galaxy__card-title">{world.title[locale]}</h3>
            <p className="galaxy__card-teaser">{world.teaser[locale]}</p>
            <a className="galaxy__card-enter" href={world.href}>
              {dict.common.enterWorld}
              <span aria-hidden="true">{ar ? " \u2196" : " \u2197"}</span>
            </a>
          </aside>
        </div>

        <div className="galaxy__nav">
          <div className="galaxy__gates" role="group" aria-label={ar ? "\u0628\u0648\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062C\u0631\u0629" : "Galaxy gates"}>
            {PORTAL_WORLDS.map((item, position) => <button
    key={item.id}
    type="button"
    className={clsx("galaxy__chip", position === index && "is-active")}
    aria-pressed={position === index}
    onClick={() => goTo(position)}
  >
                <span aria-hidden="true">{String(position + 1).padStart(2, "0")}</span>
                {item.title[locale]}
              </button>)}
          </div>
          <div className="galaxy__arrows">
            <button type="button" aria-label={ar ? "\u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629" : "Previous gate"} onClick={() => goTo(index - 1)}>
              {ar ? "\u2192" : "\u2190"}
            </button>
            <button type="button" aria-label={ar ? "\u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629" : "Next gate"} onClick={() => goTo(index + 1)}>
              {ar ? "\u2190" : "\u2192"}
            </button>
          </div>
        </div>
        <p className="galaxy__hint">
          {ar ? "\u0627\u0633\u062D\u0628 \u0623\u0641\u0642\u064A\u064B\u0627 \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0645 \u0645\u0641\u0627\u062A\u064A\u062D \u0627\u0644\u0623\u0633\u0647\u0645 \u0644\u062A\u0634\u063A\u064A\u0644 \u0645\u062F\u0627\u0631 \u0627\u0644\u0645\u062C\u0631\u0629." : "Drag sideways or use the arrow keys to turn the galaxy."}
        </p>
        <p className="sr-only" aria-live="polite">
          {world.title[locale]} · {index + 1} / {COUNT}
        </p>
      </div>
    </section>;
}
export {
  MediaGalaxy
};
