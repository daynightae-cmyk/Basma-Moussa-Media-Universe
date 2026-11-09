import "@/styles/production/bridge.css";
import "@/styles/production/studio.css";
"use client";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  CAMERA_PRESETS,
  LIGHTING_PRESETS,
  SCENE_LAYOUTS,
  SCENE_PRESETS,
  layoutFor,
  lightingForPreset,
  lightingPreset,
  moveItem,
  rotateItem
} from "@/lib/experience/studio-scene";
import {
  broadcastReducer,
  initialBroadcastState,
  isOnAir
} from "@/lib/experience/broadcast-machine";
import { StudioStage } from "@/components/studio/studio-stage";
import { SetConsole } from "@/components/studio/set-console";
import { DirectorRoom } from "@/components/studio/director-room";
const STORAGE_KEY = "bm-studio-state-v1";
function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, "0");
  return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}
function StudioExperience({ dict, locale }) {
  const [sceneId, setSceneId] = useState("one-on-one");
  const [items, setItems] = useState(() => layoutFor("one-on-one"));
  const [selectedId, setSelectedId] = useState("chair-host");
  const [camera, setCamera] = useState("master");
  const [lighting, setLighting] = useState(
    () => lightingForPreset("warm-broadcast")
  );
  const [prompter, setPrompter] = useState("");
  const [notes, setNotes] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [clock, setClock] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState({ kind: "unknown" });
  const [broadcast, dispatchBroadcast] = useReducer(
    broadcastReducer,
    initialBroadcastState(false, false)
  );
  const loadedRef = useRef(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.sceneId && SCENE_LAYOUTS[saved.sceneId]) {
          setSceneId(saved.sceneId);
          setItems(layoutFor(saved.sceneId));
        }
        if (saved.camera && CAMERA_PRESETS.some((preset) => preset.id === saved.camera)) {
          setCamera(saved.camera);
        }
        if (saved.lighting && LIGHTING_PRESETS.some((preset) => preset.id === saved.lighting?.presetId)) {
          setLighting(saved.lighting);
        }
        if (typeof saved.prompter === "string") setPrompter(saved.prompter);
        if (typeof saved.notes === "string") setNotes(saved.notes);
      }
    } catch { /* Gracefully ignore unavailable browser storage or pointer capture. */ }
    loadedRef.current = true;
  }, []);
  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      const payload = { sceneId, camera, lighting, prompter, notes };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch { /* Gracefully ignore unavailable browser storage or pointer capture. */ }
  }, [camera, lighting, notes, prompter, sceneId]);
  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat(locale === "ar" ? "ar-AE" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        }).format(/* @__PURE__ */ new Date())
      );
    };
    tick();
    const id = setInterval(() => {
      setSeconds((previous) => previous + 1);
      tick();
    }, 1e3);
    return () => clearInterval(id);
  }, [locale]);
  const onScene = useCallback((id) => {
    setSceneId(id);
    setItems(layoutFor(id));
  }, []);
  const onCamera = useCallback((id) => setCamera(id), []);
  const onLightingPreset = useCallback((id) => {
    setLighting(lightingForPreset(id));
  }, []);
  const onLightingChange = useCallback(
    (key, value) => {
      setLighting((previous) => {
        const preset = lightingPreset(previous.presetId);
        return { ...previous, presetId: preset.id, [key]: value };
      });
    },
    []
  );
  const onNudge = useCallback((id, dx, dz) => {
    setItems((previous) => moveItem(previous, id, dx, dz));
  }, []);
  const onRotate = useCallback((id, delta) => {
    setItems((previous) => rotateItem(previous, id, delta));
  }, []);
  const onResetLayout = useCallback(() => {
    setItems(layoutFor(sceneId));
  }, [sceneId]);
  const onResetCamera = useCallback(() => setCamera("master"), []);
  const checkDevices = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.enumerateDevices) {
      setDeviceStatus({ kind: "unsupported" });
      return;
    }
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const inputs = devices.filter((device) => device.kind === "audioinput");
      setDeviceStatus(
        inputs.length > 0 ? { kind: "found", count: inputs.length } : { kind: "none" }
      );
    } catch {
      setDeviceStatus({ kind: "denied" });
    }
  }, []);
  const sceneLabel = useMemo(
    () => SCENE_PRESETS.find((preset) => preset.id === sceneId)?.label[locale] ?? "",
    [locale, sceneId]
  );
  return <section className="studio-experience" id="studio-experience" aria-labelledby="studio-experience-title">
      <div className="shell shell--wide">
        <header className="studio-experience__head">
          <div>
            <p className="eyebrow eyebrow-gold">{dict.nav.studio}</p>
            <h2 id="studio-experience-title" className="display display-m">
              {dict.studio.experienceTitle}
            </h2>
            <p className="lead">{dict.studio.experienceLead}</p>
          </div>
          <p className="studio-preview-badge">{dict.studio.previewNotice}</p>
        </header>

        <div className="studio-layout">
          <div className="studio-layout__stage">
            <StudioStage
    dict={dict}
    locale={locale}
    items={items}
    selectedId={selectedId}
    camera={camera}
    lighting={lighting}
    prompter={prompter}
    elapsed={formatDuration(seconds)}
    sceneLabel={sceneLabel}
    onAir={isOnAir(broadcast)}
    onAirAction={() => dispatchBroadcast({ type: "start" })}
    onSelect={setSelectedId}
    onNudge={onNudge}
    onRotate={onRotate}
  />
          </div>

          <div className="studio-layout__console">
            <SetConsole
    dict={dict}
    locale={locale}
    camera={camera}
    sceneId={sceneId}
    lighting={lighting}
    items={items}
    selectedId={selectedId}
    onCamera={onCamera}
    onScene={onScene}
    onLightingPreset={onLightingPreset}
    onLightingChange={onLightingChange}
    onSelect={setSelectedId}
    onNudge={onNudge}
    onRotate={onRotate}
    onResetLayout={onResetLayout}
    onResetCamera={onResetCamera}
  />
            <DirectorRoom
    dict={dict}
    broadcast={broadcast}
    onBroadcast={dispatchBroadcast}
    clock={clock}
    elapsed={formatDuration(seconds)}
    prompter={prompter}
    notes={notes}
    onPrompter={setPrompter}
    onNotes={setNotes}
    deviceStatus={deviceStatus}
    onCheckDevices={checkDevices}
  />
          </div>
        </div>
      </div>
    </section>;
}
export {
  StudioExperience
};
