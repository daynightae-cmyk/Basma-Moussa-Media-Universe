import "@/styles/production/atelier.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Clapperboard, GripVertical, Plus, RotateCcw, Save, X } from "lucide-react";
import { useI18n } from "@/lib/experience/i18n";
import {
  ATELIER_DRAFT_KEY,
  ATMOSPHERES,
  MAX_STORY_CARDS,
  MOODS,
  STORY_THEMES,
  addCard,
  buildStoryboard,
  createDraft,
  moveCard,
  parseDraft,
  removeCard,
  themeById
} from "@/lib/experience/atelier";

function StoryAtelier({ dict, locale }) {
  const { t } = useI18n();
  const [themeId, setThemeId] = useState("human");
  const [atmosphereId, setAtmosphereId] = useState("intimate");
  const [moodId, setMoodId] = useState("gold");
  const [cards, setCards] = useState([]);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState({ kind: "idle", text: "" });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [dragIndex, setDragIndex] = useState(null);
  const previewTriggerRef = useRef(null);
  const closeRef = useRef(null);

  const theme = themeById(themeId) ?? STORY_THEMES[0];
  const storyboard = useMemo(
    () => buildStoryboard({ themeId, atmosphereId, moodId, cards, note }),
    [atmosphereId, cards, moodId, note, themeId]
  );
  const mood = MOODS.find((entry) => entry.id === moodId) ?? MOODS[0];
  const monitorIndex = Math.min(focusIndex, Math.max(0, storyboard.length - 1));
  const monitorFrame = storyboard[monitorIndex];

  useEffect(() => {
    try {
      const saved = parseDraft(localStorage.getItem(ATELIER_DRAFT_KEY));
      if (!saved) return;
      setThemeId(saved.themeId);
      setAtmosphereId(saved.atmosphereId);
      setMoodId(saved.moodId);
      setCards(saved.cards);
      setNote(saved.note);
      setStatus({ kind: "restored", text: dict.atelier.draftRestored });
    } catch {
      /* Gracefully ignore unavailable browser storage. */
    }
  }, [dict.atelier.draftRestored]);

  const saveDraft = useCallback(() => {
    try {
      const draft = createDraft({ themeId, atmosphereId, moodId, cards, note });
      localStorage.setItem(ATELIER_DRAFT_KEY, JSON.stringify(draft));
      const time = new Intl.DateTimeFormat(locale === "ar" ? "ar-AE" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date());
      setStatus({ kind: "saved", text: dict.atelier.savedAt.replace("{time}", time) });
    } catch {
      setStatus({ kind: "hint", text: dict.atelier.localNote });
    }
  }, [atmosphereId, cards, dict.atelier.localNote, dict.atelier.savedAt, locale, moodId, note, themeId]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(ATELIER_DRAFT_KEY);
    } catch {
      /* Gracefully ignore unavailable browser storage. */
    }
    setStatus({ kind: "cleared", text: dict.atelier.cleared });
  }, [dict.atelier.cleared]);

  const openPreview = useCallback(() => {
    if (storyboard.length < 2) {
      setStatus({ kind: "hint", text: dict.atelier.needScenes });
      return;
    }
    setPreviewIndex(monitorIndex);
    setPreviewOpen(true);
  }, [dict.atelier.needScenes, monitorIndex, storyboard.length]);

  useEffect(() => {
    if (!previewOpen) return undefined;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event) => {
      if (event.key === "Escape") setPreviewOpen(false);
      if (event.key === "ArrowRight") setPreviewIndex((index) => Math.min(storyboard.length - 1, index + 1));
      if (event.key === "ArrowLeft") setPreviewIndex((index) => Math.max(0, index - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewOpen, storyboard.length]);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
    previewTriggerRef.current?.focus({ preventScroll: true });
  }, []);

  const addBeat = (beat) => {
    setCards((previous) => {
      const next = addCard(previous, beat.id, theme);
      if (next !== previous) setFocusIndex(next.length - 1);
      return next;
    });
  };

  const dropOn = (target) => {
    if (dragIndex === null) return;
    setCards((previous) => moveCard(previous, dragIndex, target));
    setFocusIndex(target);
    setDragIndex(null);
  };

  const frame = storyboard[previewIndex];

  return (
    <div className="atelier" id="atelier">
      <div className="shell shell--wide">
        <header className="atelier__head">
          <div>
            <p className="eyebrow eyebrow-gold">{dict.atelier.eyebrow}</p>
            <h1 id="atelier-title" className="display display-m">
              {dict.atelier.title}
            </h1>
            <p className="lead">{dict.atelier.lead}</p>
          </div>
          <div className="atelier__stamp" aria-hidden="true">
            <span className="atelier__stamp-top">{t({ ar: "طاولة المخرج", en: "Director's table" })}</span>
            <span className="atelier__stamp-mid" dir="ltr">
              {String(storyboard.length).padStart(2, "0")} / {String(MAX_STORY_CARDS).padStart(2, "0")}
            </span>
            <span className="atelier__stamp-bottom">{t({ ar: "مسودة محلية", en: "Local draft" })}</span>
          </div>
        </header>

        <div className="atelier-desk">
          <aside className="atelier-brief" aria-label={t({ ar: "موجز الفيلم", en: "Film brief" })}>
            <div className="atelier-brief__block">
              <p className="atelier-brief__label">
                <span aria-hidden="true">01</span>
                {dict.atelier.stepTheme}
              </p>
              <div className="atelier-chips">
                {STORY_THEMES.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="atelier-chip"
                    aria-pressed={themeId === entry.id}
                    onClick={() => {
                      setThemeId(entry.id);
                      setCards([]);
                      setFocusIndex(0);
                    }}
                    title={entry.blurb[locale]}
                  >
                    {entry.label[locale]}
                  </button>
                ))}
              </div>
              <p className="atelier-brief__note">{theme.blurb[locale]}</p>
            </div>

            <div className="atelier-brief__block">
              <p className="atelier-brief__label">
                <span aria-hidden="true">02</span>
                {dict.atelier.stepAtmosphere}
              </p>
              <div className="atelier-chips">
                {ATMOSPHERES.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="atelier-chip"
                    aria-pressed={atmosphereId === entry.id}
                    onClick={() => setAtmosphereId(entry.id)}
                    title={entry.note[locale]}
                  >
                    {entry.label[locale]}
                  </button>
                ))}
              </div>
            </div>

            <div className="atelier-brief__block">
              <p className="atelier-brief__label">
                <span aria-hidden="true">03</span>
                {dict.atelier.stepMood}
              </p>
              <div className="atelier-moods">
                {MOODS.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="atelier-mood"
                    aria-pressed={moodId === entry.id}
                    onClick={() => setMoodId(entry.id)}
                    style={{ backgroundImage: `linear-gradient(135deg, ${entry.from}, ${entry.to})` }}
                    title={entry.note[locale]}
                  >
                    <span style={{ color: entry.ink }}>{entry.label[locale]}</span>
                  </button>
                ))}
              </div>
              <p className="atelier-brief__note">{mood.note[locale]}</p>
            </div>

            <div className="atelier-brief__block atelier-brief__block--beats">
              <p className="atelier-brief__label">
                <span aria-hidden="true">04</span>
                {dict.atelier.stepScenes}
              </p>
              <ul className="beat-list">
                {theme.beats.map((beat) => {
                  const added = cards.includes(beat.id);
                  const full = cards.length >= MAX_STORY_CARDS;
                  return (
                    <li key={beat.id} className="beat-row" data-added={added}>
                      <span className="beat-row__text">
                        <span className="beat-row__title">{beat.title[locale]}</span>
                        <span className="beat-row__beat">{beat.beat[locale]}</span>
                      </span>
                      <button
                        type="button"
                        className="beat-row__add"
                        onClick={() => addBeat(beat)}
                        disabled={added || full}
                        aria-label={`${dict.atelier.addScene}: ${beat.title[locale]}`}
                      >
                        {added ? <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div className="atelier-workbench">
            <section className="atelier-monitor" aria-label={t({ ar: "شاشة المخرج", en: "Director's monitor" })}>
              <div className="atelier-monitor__top">
                <span className="atelier-monitor__tag">
                  <span className="atelier-monitor__dot" aria-hidden="true" />
                  {t({ ar: "شاشة المعاينة", en: "Program monitor" })}
                </span>
                <span>
                  {dict.atelier.sequence} ·{" "}
                  {storyboard.length
                    ? `${String(monitorIndex + 1).padStart(2, "0")} / ${String(storyboard.length).padStart(2, "0")}`
                    : "00 / 00"}
                </span>
              </div>

              <div
                className="atelier-monitor__screen"
                data-empty={monitorFrame ? undefined : "true"}
                style={{ backgroundImage: `linear-gradient(155deg, ${mood.from}, ${mood.to})` }}
              >
                <div className="atelier-monitor__grain" aria-hidden="true" />
                <span className="atelier-monitor__scene" aria-hidden="true">
                  {monitorFrame ? String(monitorIndex + 1).padStart(2, "0") : null}
                </span>
                {monitorFrame ? (
                  <div className="atelier-monitor__copy">
                    <p className="atelier-monitor__eyebrow">
                      {monitorFrame.atmosphere.label[locale]} · {monitorFrame.mood.label[locale]}
                    </p>
                    <h2 className="atelier-monitor__title" style={{ color: mood.ink }}>
                      {monitorFrame.title[locale]}
                    </h2>
                    <p className="atelier-monitor__beat" style={{ color: mood.ink }}>
                      {monitorFrame.beat[locale]}
                    </p>
                  </div>
                ) : (
                  <div className="atelier-monitor__empty">
                    <span className="atelier-monitor__empty-ring" aria-hidden="true">
                      <Clapperboard className="h-6 w-6" />
                    </span>
                    <p className="atelier-monitor__empty-title">
                      {t({ ar: "لا إطار بعد", en: "No frame yet" })}
                    </p>
                    <p>{dict.atelier.emptyHint}</p>
                    <p className="atelier-monitor__empty-cue">
                      {t({ ar: "اختر مشهدًا من الموجز لبدء التسلسل", en: "Choose a beat from the brief to start the sequence" })}
                    </p>
                  </div>
                )}
                <div className="atelier-monitor__corners" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>
              </div>

              <div className="atelier-monitor__bar">
                <button
                  type="button"
                  onClick={() => setFocusIndex((index) => Math.max(0, index - 1))}
                  disabled={monitorIndex <= 0}
                  aria-label={t({ ar: "الإطار السابق", en: "Previous frame" })}
                >
                  <ChevronUp className="h-4 w-4 rotate-[-90deg]" aria-hidden="true" />
                </button>
                <span className="atelier-monitor__timecode">
                  {monitorFrame
                    ? `${t({ ar: "إطار", en: "Frame" })} ${String(monitorIndex + 1).padStart(2, "0")}`
                    : t({ ar: "إطار 00", en: "Frame 00" })}
                </span>
                <button
                  type="button"
                  onClick={() => setFocusIndex((index) => Math.min(storyboard.length - 1, index + 1))}
                  disabled={monitorIndex >= storyboard.length - 1}
                  aria-label={t({ ar: "الإطار التالي", en: "Next frame" })}
                >
                  <ChevronDown className="h-4 w-4 rotate-[-90deg]" aria-hidden="true" />
                </button>
                <button
                  ref={previewTriggerRef}
                  type="button"
                  className="atelier-monitor__play"
                  onClick={openPreview}
                  aria-haspopup="dialog"
                >
                  {dict.atelier.preview}
                </button>
              </div>
            </section>

            <section className="filmstrip" aria-labelledby="filmstrip-title">
              <header className="filmstrip__head">
                <h2 id="filmstrip-title">
                  <Clapperboard className="h-4 w-4 text-gold" aria-hidden="true" />
                  {t({ ar: "شريط المشاهد", en: "The filmstrip" })}
                </h2>
                <span>
                  {t({ ar: "اسحب لإعادة الترتيب", en: "Drag to reorder" })} · {cards.length}/{MAX_STORY_CARDS}
                </span>
              </header>

              <ol className="filmstrip__track" aria-label={dict.atelier.sequence}>
                {cards.map((cardId, index) => {
                  const beat = theme.beats.find((entry) => entry.id === cardId);
                  if (!beat) return null;
                  const active = index === monitorIndex;
                  return (
                    <li
                      key={cardId}
                      className={`film-frame ${active ? "is-active" : ""} ${dragIndex === index ? "is-dragging" : ""}`}
                      draggable
                      onDragStart={(event) => {
                        setDragIndex(index);
                        event.dataTransfer.effectAllowed = "move";
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        dropOn(index);
                      }}
                      onDragEnd={() => setDragIndex(null)}
                    >
                      <button
                        type="button"
                        className="film-frame__select"
                        onClick={() => setFocusIndex(index)}
                        aria-pressed={active}
                        aria-label={`${t({ ar: "اعرض المشهد", en: "Preview scene" })}: ${beat.title[locale]}`}
                      >
                        <span className="film-frame__number">{String(index + 1).padStart(2, "0")}</span>
                        <span className="film-frame__title">{beat.title[locale]}</span>
                        <span className="film-frame__beat">{beat.beat[locale]}</span>
                      </button>
                      <div className="film-frame__actions">
                        <span className="film-frame__grip" aria-hidden="true" title={t({ ar: "اسحب", en: "Drag" })}>
                          <GripVertical className="h-3.5 w-3.5" />
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setCards((previous) => moveCard(previous, index, index - 1));
                            setFocusIndex(Math.max(0, index - 1));
                          }}
                          disabled={index === 0}
                          aria-label={`${dict.atelier.moveUp}: ${beat.title[locale]}`}
                        >
                          <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCards((previous) => moveCard(previous, index, index + 1));
                            setFocusIndex(Math.min(cards.length - 1, index + 1));
                          }}
                          disabled={index === cards.length - 1}
                          aria-label={`${dict.atelier.moveDown}: ${beat.title[locale]}`}
                        >
                          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setCards((previous) => removeCard(previous, cardId))}
                          aria-label={`${dict.atelier.remove}: ${beat.title[locale]}`}
                        >
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  );
                })}
                {cards.length === 0 && (
                  <li className="filmstrip__empty">
                    <span aria-hidden="true">—</span>
                    <p>{dict.atelier.emptyHint}</p>
                  </li>
                )}
              </ol>
            </section>

            <section className="atelier-notes" aria-labelledby="atelier-notes-title">
              <div className="atelier-notes__head">
                <h2 id="atelier-notes-title">
                  <span aria-hidden="true">05</span>
                  {dict.atelier.notesLabel}
                </h2>
                <span>{t({ ar: "ملاحظات المخرج", en: "Director's notes" })}</span>
              </div>
              <label className="atelier-notes__field">
                <span className="sr-only">{dict.atelier.notesLabel}</span>
                <textarea
                  rows={3}
                  value={note}
                  placeholder={dict.atelier.notesPlaceholder}
                  onChange={(event) => setNote(event.target.value.slice(0, 600))}
                />
              </label>
              <div className="atelier-notes__row">
                <div className="atelier-notes__actions">
                  <button type="button" className="btn btn-gold" onClick={saveDraft}>
                    <Save className="h-3.5 w-3.5" aria-hidden="true" />
                    {dict.atelier.saveDraft}
                  </button>
                  <button type="button" className="atelier-notes__clear" onClick={clearDraft}>
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    {dict.atelier.clearDraft}
                  </button>
                </div>
                <div className="atelier-notes__feedback">
                  <p className="atelier-notes__local">{dict.atelier.localNote}</p>
                  {status.text && (
                    <p className="atelier-notes__status" data-kind={status.kind} role="status">
                      {status.text}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {previewOpen && frame && (
        <div
          className="atelier-theatre"
          role="dialog"
          aria-modal="true"
          aria-label={dict.atelier.previewTitle}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePreview();
          }}
        >
          <div className="atelier-theatre__frame">
            <div
              className="atelier-theatre__stage"
              style={{ backgroundImage: `linear-gradient(160deg, ${frame.mood.from}, ${frame.mood.to})` }}
            >
              <span className="atelier-theatre__scene" aria-hidden="true">
                {String(previewIndex + 1).padStart(2, "0")}
              </span>
              <p className="atelier-theatre__eyebrow">
                {frame.atmosphere.label[locale]} · {frame.mood.label[locale]}
              </p>
              <h2 className="atelier-theatre__title" style={{ color: frame.mood.ink }}>
                {frame.title[locale]}
              </h2>
              <p className="atelier-theatre__beat" style={{ color: frame.mood.ink }}>
                {frame.beat[locale]}
              </p>
              {note.trim() && (
                <p className="atelier-theatre__note" style={{ color: frame.mood.ink }}>
                  {note}
                </p>
              )}
            </div>
            <div className="atelier-theatre__bar">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setPreviewIndex((index) => Math.max(0, index - 1))}
                disabled={previewIndex === 0}
              >
                {dict.atelier.prev}
              </button>
              <span className="atelier-theatre__count">
                {dict.atelier.frameOf.replace("{index}", String(previewIndex + 1)).replace("{total}", String(storyboard.length))}
              </span>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setPreviewIndex((index) => Math.min(storyboard.length - 1, index + 1))}
                disabled={previewIndex >= storyboard.length - 1}
              >
                {dict.atelier.next}
              </button>
              <button ref={closeRef} type="button" className="btn btn-gold" onClick={closePreview}>
                {dict.atelier.previewClose}
              </button>
            </div>
            <div className="atelier-theatre__dots" aria-hidden="true">
              {storyboard.map((entry, index) => (
                <span key={entry.id} data-active={index === previewIndex} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { StoryAtelier };
