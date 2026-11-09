const STAGE_FLOOR = { minX: -250, maxX: 250, minZ: -160, maxZ: 160 };
const FURNITURE_RADIUS = {
  chair: 52,
  table: 78,
  mic: 22,
  monitor: 26,
  desk: 60
};
const TABLE_TOP_KINDS = ["mic", "monitor"];
function item(id, kind, label, x, z, rotation = 0) {
  return { id, kind, label, x, z, rotation };
}
const CHAIR_HOST = { ar: "\u0643\u0631\u0633\u064A \u0627\u0644\u0645\u0642\u062F\u0651\u0645\u0629", en: "Host chair" };
const CHAIR_GUEST = { ar: "\u0643\u0631\u0633\u064A \u0627\u0644\u0636\u064A\u0641", en: "Guest chair" };
const CHAIR_THIRD = { ar: "\u0643\u0631\u0633\u064A \u062B\u0627\u0644\u062B", en: "Third chair" };
const TABLE = { ar: "\u0637\u0627\u0648\u0644\u0629 \u0627\u0644\u062D\u0648\u0627\u0631", en: "Interview table" };
const MIC = { ar: "\u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646 \u0627\u0644\u0637\u0627\u0648\u0644\u0629", en: "Table microphone" };
const MONITOR = { ar: "\u0634\u0627\u0634\u0629 \u0627\u0644\u0645\u0634\u0647\u062F", en: "Scene monitor" };
const DESK = { ar: "\u0645\u0643\u062A\u0628 \u0627\u0644\u062A\u062D\u0643\u0645", en: "Control desk" };
const SCENE_LAYOUTS = {
  "one-on-one": [
    item("chair-host", "chair", CHAIR_HOST, -112, 40, 8),
    item("chair-guest", "chair", CHAIR_GUEST, 112, 40, -8),
    item("table", "table", TABLE, 0, -32, 0),
    item("mic", "mic", MIC, 0, -66, 0),
    item("monitor", "monitor", MONITOR, 186, -104, -18)
  ],
  roundtable: [
    item("chair-host", "chair", CHAIR_HOST, -130, 12, 22),
    item("chair-guest", "chair", CHAIR_GUEST, 128, 26, -26),
    item("chair-third", "chair", CHAIR_THIRD, 4, 138, 178),
    item("table", "table", TABLE, 0, -6, 0),
    item("mic", "mic", MIC, 0, -48, 0),
    item("monitor", "monitor", MONITOR, 190, -104, -18)
  ],
  executive: [
    item("chair-host", "chair", CHAIR_HOST, -70, 10, 16),
    item("chair-guest", "chair", CHAIR_GUEST, 76, 10, -16),
    item("table", "table", TABLE, 4, -102, 0),
    item("mic", "mic", MIC, 4, -134, 0),
    item("monitor", "monitor", MONITOR, 192, -104, -18)
  ],
  legal: [
    item("chair-host", "chair", CHAIR_HOST, -140, 22, 30),
    item("chair-guest", "chair", CHAIR_GUEST, 140, 22, -30),
    item("chair-third", "chair", CHAIR_THIRD, 0, 112, 180),
    item("table", "table", TABLE, 0, -22, 0),
    item("mic", "mic", MIC, 0, -62, 0),
    item("monitor", "monitor", MONITOR, 176, -110, -22)
  ],
  podcast: [
    item("chair-host", "chair", CHAIR_HOST, -120, 80, 6),
    item("chair-guest", "chair", CHAIR_GUEST, 120, 80, -6),
    item("table", "table", TABLE, 0, 0, 0),
    item("mic", "mic", MIC, -44, -34, 0),
    item("monitor", "monitor", MONITOR, 198, -96, -26),
    item("desk", "desk", DESK, -206, -84, 32)
  ],
  documentary: [
    item("chair-host", "chair", CHAIR_HOST, -124, 58, 14),
    item("table", "table", TABLE, 44, -12, -10),
    item("mic", "mic", MIC, -108, 12, 0),
    item("monitor", "monitor", MONITOR, 168, -112, -24),
    item("desk", "desk", DESK, 206, -70, -30)
  ]
};
const SCENE_PRESETS = [
  {
    id: "one-on-one",
    label: { ar: "\u062D\u0648\u0627\u0631 \u0641\u0631\u062F\u064A", en: "One-on-one" },
    note: { ar: "\u0645\u0642\u062F\u0651\u0645\u0629 \u0648\u0636\u064A\u0641\u060C \u0637\u0627\u0648\u0644\u0629 \u0645\u0646\u062E\u0641\u0636\u0629.", en: "Host and guest across a low table." }
  },
  {
    id: "roundtable",
    label: { ar: "\u0637\u0627\u0648\u0644\u0629 \u0645\u0633\u062A\u062F\u064A\u0631\u0629", en: "Roundtable" },
    note: { ar: "\u062B\u0644\u0627\u062B\u0629 \u0645\u0642\u0627\u0639\u062F \u062D\u0648\u0644 \u0627\u0644\u0637\u0627\u0648\u0644\u0629.", en: "Three seats around the table." }
  },
  {
    id: "executive",
    label: { ar: "\u0645\u0642\u0627\u0628\u0644\u0629 \u062A\u0646\u0641\u064A\u0630\u064A\u0629", en: "Executive" },
    note: { ar: "\u0645\u0648\u0627\u062C\u0647\u0629 \u0642\u0631\u064A\u0628\u0629\u060C \u0637\u0627\u0648\u0644\u0629 \u062E\u0644\u0641\u064A\u0629.", en: "Tight two-up with the table behind." }
  },
  {
    id: "legal",
    label: { ar: "\u062D\u0648\u0627\u0631 \u0642\u0627\u0646\u0648\u0646\u064A", en: "Legal discussion" },
    note: { ar: "\u0645\u0633\u0627\u0641\u0629 \u0623\u0648\u0633\u0639 \u0648\u062B\u0644\u0627\u062B\u0629 \u0645\u0642\u0627\u0639\u062F.", en: "Wider spacing, three seats." }
  },
  {
    id: "podcast",
    label: { ar: "\u0635\u0627\u0644\u0629 \u0628\u0648\u062F\u0643\u0627\u0633\u062A", en: "Podcast lounge" },
    note: { ar: "\u0645\u0642\u0627\u0639\u062F \u0645\u0631\u064A\u062D\u0629 \u0648\u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646\u0627\u0646.", en: "Relaxed seating and close mics." }
  },
  {
    id: "documentary",
    label: { ar: "\u0645\u0642\u0627\u0628\u0644\u0629 \u0648\u062B\u0627\u0626\u0642\u064A\u0629", en: "Documentary" },
    note: { ar: "\u0645\u0642\u062F\u0651\u0645\u0629 \u0648\u062D\u062F\u0647\u0627\u060C \u0627\u0644\u0636\u064A\u0641 \u0641\u064A \u0627\u0644\u0625\u0637\u0627\u0631 \u0627\u0644\u062C\u0627\u0646\u0628\u064A.", en: "Solo subject, guest off-axis." }
  }
];
function layoutFor(presetId) {
  return SCENE_LAYOUTS[presetId].map((entry) => ({ ...entry }));
}
function clampToFloor(x, z) {
  return {
    x: Math.min(STAGE_FLOOR.maxX, Math.max(STAGE_FLOOR.minX, x)),
    z: Math.min(STAGE_FLOOR.maxZ, Math.max(STAGE_FLOOR.minZ, z))
  };
}
function overlaps(a, b) {
  if (TABLE_TOP_KINDS.includes(a.kind) || TABLE_TOP_KINDS.includes(b.kind)) return false;
  const minDistance = FURNITURE_RADIUS[a.kind] + FURNITURE_RADIUS[b.kind];
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.hypot(dx, dz) < minDistance;
}
function moveItem(items, id, dx, dz) {
  const target = items.find((entry) => entry.id === id);
  if (!target) return items;
  const { x, z } = clampToFloor(target.x + dx, target.z + dz);
  if (x === target.x && z === target.z) return items;
  const moved = { ...target, x, z };
  if (items.some((entry) => entry.id !== id && overlaps(moved, entry))) return items;
  return items.map((entry) => entry.id === id ? moved : entry);
}
function rotateItem(items, id, deltaDegrees) {
  return items.map(
    (entry) => entry.id === id ? { ...entry, rotation: normaliseAngle(entry.rotation + deltaDegrees) } : entry
  );
}
function normaliseAngle(degrees) {
  const wrapped = (degrees % 360 + 360) % 360;
  return wrapped > 180 ? wrapped - 360 : wrapped;
}
function isValidLayout(items) {
  for (const entry of items) {
    const { x, z } = clampToFloor(entry.x, entry.z);
    if (x !== entry.x || z !== entry.z) return false;
  }
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      if (overlaps(items[i], items[j])) return false;
    }
  }
  return true;
}
const CAMERA_PRESETS = [
  {
    id: "master",
    label: { ar: "\u0627\u0644\u0644\u0642\u0637\u0629 \u0627\u0644\u0648\u0627\u0633\u0639\u0629", en: "Master wide" },
    short: "CAM 01",
    yaw: 0,
    pitch: 9,
    dolly: 0,
    trackX: 0,
    trackY: 0,
    fov: 46
  },
  {
    id: "host",
    label: { ar: "\u0644\u0642\u0637\u0629 \u0627\u0644\u0645\u0642\u062F\u0651\u0645\u0629", en: "Host close-up" },
    short: "CAM 02",
    yaw: 13,
    pitch: 3,
    dolly: 300,
    trackX: 112,
    trackY: -16,
    fov: 34
  },
  {
    id: "guest",
    label: { ar: "\u0644\u0642\u0637\u0629 \u0627\u0644\u0636\u064A\u0641", en: "Guest close-up" },
    short: "CAM 03",
    yaw: -13,
    pitch: 3,
    dolly: 300,
    trackX: -112,
    trackY: -16,
    fov: 34
  },
  {
    id: "two-shot",
    label: { ar: "\u0644\u0642\u0637\u0629 \u0645\u0634\u062A\u0631\u0643\u0629", en: "Two shot" },
    short: "CAM 04",
    yaw: 0,
    pitch: 5,
    dolly: 150,
    trackX: 0,
    trackY: -14,
    fov: 40
  },
  {
    id: "side",
    label: { ar: "\u0632\u0627\u0648\u064A\u0629 \u0633\u064A\u0646\u0645\u0627\u0626\u064A\u0629", en: "Cinematic side" },
    short: "CAM 05",
    yaw: 36,
    pitch: 7,
    dolly: 70,
    trackX: -26,
    trackY: -8,
    fov: 44
  },
  {
    id: "overhead",
    label: { ar: "\u0645\u0646 \u0627\u0644\u0623\u0639\u0644\u0649", en: "Overhead" },
    short: "CAM 06",
    yaw: 0,
    pitch: 54,
    dolly: -30,
    trackX: 0,
    trackY: 74,
    fov: 50
  }
];
function cameraPreset(id) {
  return CAMERA_PRESETS.find((entry) => entry.id === id) ?? CAMERA_PRESETS[0];
}
function cameraTransform(id) {
  const camera = cameraPreset(id);
  return [
    `translate3d(${camera.trackX}px, ${camera.trackY}px, ${camera.dolly}px)`,
    `rotateX(${camera.pitch}deg)`,
    `rotateY(${camera.yaw}deg)`,
    "scale3d(var(--studio-zoom, 1), var(--studio-zoom, 1), var(--studio-zoom, 1))"
  ].join(" ");
}
const LIGHTING_PRESETS = [
  {
    id: "warm-broadcast",
    label: { ar: "\u0628\u062B\u0651 \u062F\u0627\u0641\u0626", en: "Warm broadcast" },
    keyColor: "#ffd9a0",
    fillColor: "#8fa6cc",
    rimColor: "#f4c987",
    wallTop: "#1b2238",
    wallBottom: "#0a0e1a",
    key: 0.86,
    fill: 0.4,
    rim: 0.5,
    ambient: 0.42,
    temperature: 0.68
  },
  {
    id: "champagne-editorial",
    label: { ar: "\u062A\u062D\u0631\u064A\u0631\u064A \u0634\u0627\u0645\u0628\u0627\u0646\u064A\u0627", en: "Champagne editorial" },
    keyColor: "#f7e2bd",
    fillColor: "#b9a58a",
    rimColor: "#e8c98d",
    wallTop: "#2a2436",
    wallBottom: "#100c17",
    key: 0.8,
    fill: 0.52,
    rim: 0.42,
    ambient: 0.5,
    temperature: 0.74
  },
  {
    id: "midnight-cinema",
    label: { ar: "\u0633\u064A\u0646\u0645\u0627 \u0645\u0646\u062A\u0635\u0641 \u0627\u0644\u0644\u064A\u0644", en: "Midnight cinema" },
    keyColor: "#c9d8ff",
    fillColor: "#3f5988",
    rimColor: "#8fb4ff",
    wallTop: "#0d1630",
    wallBottom: "#050810",
    key: 0.58,
    fill: 0.3,
    rim: 0.66,
    ambient: 0.24,
    temperature: 0.26
  },
  {
    id: "blue-hour",
    label: { ar: "\u0627\u0644\u0633\u0627\u0639\u0629 \u0627\u0644\u0632\u0631\u0642\u0627\u0621", en: "Documentary blue hour" },
    keyColor: "#a8c6ff",
    fillColor: "#5b78a8",
    rimColor: "#9fd0ff",
    wallTop: "#11203a",
    wallBottom: "#060b16",
    key: 0.62,
    fill: 0.46,
    rim: 0.38,
    ambient: 0.34,
    temperature: 0.18
  },
  {
    id: "soft-interview",
    label: { ar: "\u062D\u0648\u0627\u0631 \u0646\u0627\u0639\u0645", en: "Soft interview" },
    keyColor: "#ffe7cd",
    fillColor: "#cbbfae",
    rimColor: "#f0dcc2",
    wallTop: "#20222c",
    wallBottom: "#0b0c12",
    key: 0.7,
    fill: 0.62,
    rim: 0.24,
    ambient: 0.56,
    temperature: 0.6
  },
  {
    id: "dramatic-documentary",
    label: { ar: "\u0648\u062B\u0627\u0626\u0642\u064A \u062F\u0631\u0627\u0645\u064A", en: "Dramatic documentary" },
    keyColor: "#ffcf9a",
    fillColor: "#31435f",
    rimColor: "#ffb066",
    wallTop: "#141522",
    wallBottom: "#04050a",
    key: 0.92,
    fill: 0.16,
    rim: 0.8,
    ambient: 0.16,
    temperature: 0.55
  },
  {
    id: "clean-white",
    label: { ar: "\u0623\u0628\u064A\u0636 \u0645\u0647\u0646\u064A", en: "Clean professional white" },
    keyColor: "#ffffff",
    fillColor: "#dfe6f2",
    rimColor: "#ffffff",
    wallTop: "#39404f",
    wallBottom: "#151922",
    key: 0.9,
    fill: 0.74,
    rim: 0.3,
    ambient: 0.7,
    temperature: 0.5
  }
];
function lightingPreset(id) {
  return LIGHTING_PRESETS.find((entry) => entry.id === id) ?? LIGHTING_PRESETS[0];
}
function lightingForPreset(presetId) {
  const preset = lightingPreset(presetId);
  return {
    presetId,
    key: preset.key,
    fill: preset.fill,
    rim: preset.rim,
    ambient: preset.ambient,
    temperature: preset.temperature
  };
}
function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}
function mixHex(cool, warm, t) {
  const parse = (hex) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];
  const [cr, cg, cb] = parse(cool);
  const [wr, wg, wb] = parse(warm);
  const ratio = clamp01(t);
  const blend = (a, b) => Math.round(a + (b - a) * ratio);
  return `rgb(${blend(cr, wr)}, ${blend(cg, wg)}, ${blend(cb, wb)})`;
}
function lightingVars(state) {
  const preset = lightingPreset(state.presetId);
  const key = clamp01(state.key);
  const fill = clamp01(state.fill);
  const rim = clamp01(state.rim);
  const ambient = clamp01(state.ambient);
  const temperature = clamp01(state.temperature);
  return {
    "--studio-key": preset.keyColor,
    "--studio-fill": preset.fillColor,
    "--studio-rim": preset.rimColor,
    "--studio-wall-top": preset.wallTop,
    "--studio-wall-bottom": preset.wallBottom,
    "--studio-key-strength": key.toFixed(2),
    "--studio-fill-strength": fill.toFixed(2),
    "--studio-rim-strength": rim.toFixed(2),
    "--studio-ambient": ambient.toFixed(2),
    "--studio-warmth": mixHex("#4a6da8", "#ffb066", temperature),
    "--studio-shadow": (0.28 + (1 - fill) * 0.3).toFixed(2)
  };
}
export {
  CAMERA_PRESETS,
  FURNITURE_RADIUS,
  LIGHTING_PRESETS,
  SCENE_LAYOUTS,
  SCENE_PRESETS,
  STAGE_FLOOR,
  cameraPreset,
  cameraTransform,
  clampToFloor,
  isValidLayout,
  layoutFor,
  lightingForPreset,
  lightingPreset,
  lightingVars,
  moveItem,
  normaliseAngle,
  rotateItem
};
