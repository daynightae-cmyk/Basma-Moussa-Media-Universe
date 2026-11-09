const STORY_THEMES = [
  {
    id: "human",
    label: { ar: "\u062D\u0643\u0627\u064A\u0629 \u0625\u0646\u0633\u0627\u0646\u064A\u0629", en: "Human story" },
    blurb: {
      ar: "\u062D\u064A\u0627\u0629 \u0648\u0627\u062D\u062F\u0629 \u062A\u0643\u0634\u0641 \u0645\u062F\u064A\u0646\u0629 \u0643\u0627\u0645\u0644\u0629.",
      en: "One life opening onto a whole city."
    },
    beats: [
      {
        id: "human-1",
        title: { ar: "\u0627\u0644\u0648\u062C\u0647", en: "The face" },
        beat: { ar: "\u0644\u0642\u0637\u0629 \u0642\u0631\u064A\u0628\u0629 \u0647\u0627\u062F\u0626\u0629 \u062A\u064F\u0639\u0631\u0651\u0641\u0646\u0627 \u0628\u0627\u0644\u0625\u0646\u0633\u0627\u0646 \u0642\u0628\u0644 \u0627\u0644\u062D\u0643\u0627\u064A\u0629.", en: "A quiet close-up: the person before the story." }
      },
      {
        id: "human-2",
        title: { ar: "\u0627\u0644\u0645\u0643\u0627\u0646", en: "The place" },
        beat: { ar: "\u0645\u0643\u0627\u0646\u0647 \u0627\u0644\u064A\u0648\u0645\u064A\u060C \u0628\u0636\u0648\u0621 \u0637\u0628\u064A\u0639\u064A \u0648\u0623\u0635\u0648\u0627\u062A \u062D\u0642\u064A\u0642\u064A\u0629.", en: "Their everyday place, natural light, real sound." }
      },
      {
        id: "human-3",
        title: { ar: "\u0627\u0644\u0645\u0646\u0639\u0637\u0641", en: "The turn" },
        beat: { ar: "\u0627\u0644\u0644\u062D\u0638\u0629 \u0627\u0644\u062A\u064A \u062A\u063A\u064A\u0651\u0631 \u0627\u0644\u0645\u0633\u0627\u0631\u060C \u0628\u0644\u0627 \u0645\u0648\u0646\u062A\u0627\u062C \u0639\u0627\u0637\u0641\u064A.", en: "The moment that changes the path, without emotional editing." }
      },
      {
        id: "human-4",
        title: { ar: "\u0627\u0644\u0623\u062B\u0631", en: "The trace" },
        beat: { ar: "\u0645\u0627 \u0628\u0642\u064A \u0628\u0639\u062F \u0627\u0644\u062D\u0643\u0627\u064A\u0629\u060C \u0641\u064A \u0635\u0648\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0635\u0627\u0645\u062A\u0629.", en: "What remains after the story, in one silent frame." }
      }
    ]
  },
  {
    id: "legal",
    label: { ar: "\u062A\u0648\u0639\u064A\u0629 \u0642\u0627\u0646\u0648\u0646\u064A\u0629", en: "Legal awareness" },
    blurb: {
      ar: "\u062D\u0642\u0651 \u0648\u0627\u0636\u062D\u060C \u0628\u0644\u0627 \u0648\u0639\u0648\u062F \u0642\u0636\u0627\u0626\u064A\u0629.",
      en: "A clear right, with no promises about outcomes."
    },
    beats: [
      {
        id: "legal-1",
        title: { ar: "\u0627\u0644\u0633\u0624\u0627\u0644", en: "The question" },
        beat: { ar: "\u0633\u0624\u0627\u0644 \u064A\u0648\u0645\u064A \u064A\u062A\u0643\u0631\u0631 \u0641\u064A \u0627\u0644\u0645\u062D\u0627\u0643\u0645 \u0648\u0627\u0644\u0645\u062C\u0627\u0644\u0633.", en: "An everyday question repeated in courts and living rooms." }
      },
      {
        id: "legal-2",
        title: { ar: "\u0627\u0644\u0646\u0635", en: "The text" },
        beat: { ar: "\u0627\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0643\u0645\u0627 \u0647\u064A\u060C \u0645\u0639 \u0645\u0635\u062F\u0631\u0647\u0627 \u0627\u0644\u0631\u0633\u0645\u064A.", en: "The provision as written, with its official source." }
      },
      {
        id: "legal-3",
        title: { ar: "\u0627\u0644\u0642\u0631\u0627\u0621\u0629", en: "The reading" },
        beat: { ar: "\u0642\u0631\u0627\u0621\u0629 \u0645\u0628\u0633\u0651\u0637\u0629\u060C \u0648\u062A\u0646\u0628\u064A\u0647 \u0635\u0631\u064A\u062D \u0625\u0644\u0649 \u062D\u062F\u0648\u062F\u0647\u0627.", en: "A plain reading, with an explicit note on its limits." }
      },
      {
        id: "legal-4",
        title: { ar: "\u0627\u0644\u062E\u0637\u0648\u0629", en: "The step" },
        beat: { ar: "\u0623\u064A\u0646 \u064A\u0633\u0623\u0644 \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u060C \u0648\u0645\u0627 \u0627\u0644\u0630\u064A \u0644\u0627 \u064A\u064F\u063A\u0646\u064A \u0639\u0646\u0647 \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u062A\u0648\u0649.", en: "Where to ask next, and what this piece cannot replace." }
      }
    ]
  },
  {
    id: "documentary",
    label: { ar: "\u0631\u062D\u0644\u0629 \u0648\u062B\u0627\u0626\u0642\u064A\u0629", en: "Documentary journey" },
    blurb: {
      ar: "\u0637\u0631\u064A\u0642\u060C \u0648\u0644\u0642\u0627\u0621\u0627\u062A\u060C \u0648\u0636\u0648\u0621 \u0645\u062A\u063A\u064A\u0651\u0631.",
      en: "A road, encounters, and changing light."
    },
    beats: [
      {
        id: "doc-1",
        title: { ar: "\u0627\u0644\u0627\u0646\u0637\u0644\u0627\u0642", en: "Departure" },
        beat: { ar: "\u0625\u0637\u0627\u0631 \u0648\u0627\u0633\u0639 \u064A\u0641\u062A\u062D \u0627\u0644\u062C\u063A\u0631\u0627\u0641\u064A\u0627.", en: "A wide frame opening the geography." }
      },
      {
        id: "doc-2",
        title: { ar: "\u0627\u0644\u0644\u0642\u0627\u0621", en: "The encounter" },
        beat: { ar: "\u0635\u0648\u062A \u0645\u062D\u0644\u064A \u064A\u0634\u0631\u062D \u0627\u0644\u0645\u0643\u0627\u0646 \u0645\u0646 \u0627\u0644\u062F\u0627\u062E\u0644.", en: "A local voice explaining the place from inside." }
      },
      {
        id: "doc-3",
        title: { ar: "\u0627\u0644\u062A\u0641\u0635\u064A\u0644", en: "The detail" },
        beat: { ar: "\u064A\u062F\u0627\u0646 \u062A\u0639\u0645\u0644\u0627\u0646\u060C \u0623\u0648 \u0623\u062B\u0631 \u0642\u062F\u064A\u0645 \u0639\u0644\u0649 \u062C\u062F\u0627\u0631.", en: "Working hands, or an old mark on a wall." }
      },
      {
        id: "doc-4",
        title: { ar: "\u0627\u0644\u0639\u0648\u062F\u0629", en: "The return" },
        beat: { ar: "\u0627\u0644\u0637\u0631\u064A\u0642 \u0646\u0641\u0633\u0647\u060C \u0641\u064A \u0636\u0648\u0621 \u0645\u062E\u062A\u0644\u0641.", en: "The same road, in different light." }
      }
    ]
  },
  {
    id: "cultural",
    label: { ar: "\u062D\u0643\u0627\u064A\u0629 \u062B\u0642\u0627\u0641\u064A\u0629", en: "Cultural storytelling" },
    blurb: {
      ar: "\u0630\u0627\u0643\u0631\u0629 \u062A\u062A\u0648\u0627\u0631\u062B\u0647\u0627 \u0627\u0644\u0623\u064A\u062F\u064A \u0648\u0627\u0644\u0623\u0635\u0648\u0627\u062A.",
      en: "Memory carried by hands and voices."
    },
    beats: [
      {
        id: "culture-1",
        title: { ar: "\u0627\u0644\u0631\u0645\u0632", en: "The motif" },
        beat: { ar: "\u0646\u0642\u0634 \u0647\u0646\u062F\u0633\u064A \u0628\u0633\u064A\u0637 \u064A\u0642\u0648\u062F \u0627\u0644\u0645\u0634\u0647\u062F.", en: "A simple geometric motif leading the frame." }
      },
      {
        id: "culture-2",
        title: { ar: "\u0627\u0644\u062D\u0631\u0641\u0629", en: "The craft" },
        beat: { ar: "\u062A\u0641\u0635\u064A\u0644 \u0645\u0627\u062F\u064A: \u062E\u0627\u0645\u0629\u060C \u0623\u062F\u0627\u0629\u060C \u0625\u064A\u0642\u0627\u0639 \u0639\u0645\u0644.", en: "A material detail: texture, tool, working rhythm." }
      },
      {
        id: "culture-3",
        title: { ar: "\u0627\u0644\u0635\u0648\u062A", en: "The voice" },
        beat: { ar: "\u0645\u0646 \u064A\u062D\u0641\u0638 \u0627\u0644\u062D\u0643\u0627\u064A\u0629 \u064A\u0631\u0648\u064A\u0647\u0627 \u0628\u0646\u0641\u0633\u0647.", en: "The keeper of the story tells it in their own words." }
      },
      {
        id: "culture-4",
        title: { ar: "\u0627\u0644\u0627\u0645\u062A\u062F\u0627\u062F", en: "The continuation" },
        beat: { ar: "\u0643\u064A\u0641 \u062A\u0635\u0644 \u0627\u0644\u062D\u0643\u0627\u064A\u0629 \u0625\u0644\u0649 \u062C\u064A\u0644 \u0622\u062E\u0631.", en: "How the story reaches another generation." }
      }
    ]
  },
  {
    id: "interview",
    label: { ar: "\u0641\u0643\u0631\u0629 \u062D\u0648\u0627\u0631", en: "Interview concept" },
    blurb: {
      ar: "\u0643\u0631\u0633\u064A\u0627\u0646\u060C \u0648\u0633\u0624\u0627\u0644 \u0648\u0627\u062D\u062F \u062C\u064A\u062F.",
      en: "Two chairs and one good question."
    },
    beats: [
      {
        id: "interview-1",
        title: { ar: "\u0627\u0644\u0627\u0641\u062A\u062A\u0627\u062D", en: "The open" },
        beat: { ar: "\u0644\u0642\u0637\u0629 \u0645\u0634\u062A\u0631\u0643\u0629 \u062A\u064F\u062B\u0628\u0651\u062A \u0627\u0644\u0639\u0644\u0627\u0642\u0629 \u0628\u064A\u0646 \u0627\u0644\u0645\u062A\u062D\u062F\u062B\u064A\u0646.", en: "A two-shot establishing the relationship." }
      },
      {
        id: "interview-2",
        title: { ar: "\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u0623\u0648\u0644", en: "First question" },
        beat: { ar: "\u0633\u0624\u0627\u0644 \u0645\u0628\u0627\u0634\u0631\u060C \u0628\u0644\u0627 \u0645\u0642\u062F\u0645\u0629 \u0637\u0648\u064A\u0644\u0629.", en: "A direct question, without a long preamble." }
      },
      {
        id: "interview-3",
        title: { ar: "\u0627\u0644\u0635\u0645\u062A", en: "The silence" },
        beat: { ar: "\u0646\u062A\u0631\u0643 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u062A\u062A\u0646\u0641\u0633 \u0642\u0628\u0644 \u0627\u0644\u0642\u0637\u0639.", en: "Let the answer breathe before the cut." }
      },
      {
        id: "interview-4",
        title: { ar: "\u0627\u0644\u062E\u062A\u0627\u0645", en: "The close" },
        beat: { ar: "\u0644\u0642\u0637\u0629 \u0642\u0631\u064A\u0628\u0629\u060C \u0648\u0633\u0624\u0627\u0644 \u064A\u0628\u0642\u0649 \u0645\u0639 \u0627\u0644\u0645\u0634\u0627\u0647\u062F.", en: "A close-up, and a question that stays with the viewer." }
      }
    ]
  },
  {
    id: "backstage",
    label: { ar: "\u062E\u0644\u0641 \u0627\u0644\u0643\u0648\u0627\u0644\u064A\u0633", en: "Behind the scenes" },
    blurb: {
      ar: "\u0643\u064A\u0641 \u062A\u064F\u0635\u0646\u0639 \u0627\u0644\u062D\u0644\u0642\u0629\u060C \u0644\u0627 \u0643\u064A\u0641 \u062A\u0628\u062F\u0648.",
      en: "How the piece is made, not how it looks."
    },
    beats: [
      {
        id: "backstage-1",
        title: { ar: "\u0627\u0644\u062A\u062D\u0636\u064A\u0631", en: "Prep" },
        beat: { ar: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0633\u0626\u0644\u0629\u060C \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0637\u0627\u0648\u0644\u0629.", en: "The question list, notes on the table." }
      },
      {
        id: "backstage-2",
        title: { ar: "\u0627\u0644\u063A\u0631\u0641\u0629", en: "The room" },
        beat: { ar: "\u0627\u0644\u0627\u0633\u062A\u0648\u062F\u064A\u0648 \u0642\u0628\u0644 \u0627\u0644\u0636\u0648\u0621: \u0623\u0633\u0644\u0627\u0643\u060C \u0643\u0631\u0627\u0633\u064A\u060C \u0635\u0645\u062A.", en: "The studio before the lights: cables, chairs, quiet." }
      },
      {
        id: "backstage-3",
        title: { ar: "\u0627\u0644\u0644\u062D\u0638\u0629 \u0627\u0644\u0641\u0627\u0626\u062A\u0629", en: "The missed moment" },
        beat: { ar: "\u0645\u0627 \u062D\u062F\u062B \u0628\u0639\u062F \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u0633\u062C\u064A\u0644.", en: "What happened after recording stopped." }
      },
      {
        id: "backstage-4",
        title: { ar: "\u0627\u0644\u0645\u0648\u0646\u062A\u0627\u062C", en: "The edit" },
        beat: { ar: "\u0642\u0631\u0627\u0631 \u0648\u0627\u062D\u062F \u064A\u063A\u064A\u0651\u0631 \u0645\u0639\u0646\u0649 \u0627\u0644\u0645\u0634\u0647\u062F.", en: "One decision that changes the scene's meaning." }
      }
    ]
  }
];
const ATMOSPHERES = [
  {
    id: "intimate",
    label: { ar: "\u062D\u0645\u064A\u0645\u064A\u0629", en: "Intimate" },
    note: { ar: "\u0645\u0633\u0627\u0641\u0629 \u0642\u0631\u064A\u0628\u0629\u060C \u0647\u0645\u0633\u060C \u0636\u0648\u0621 \u0646\u0627\u0639\u0645.", en: "Close distance, low voice, soft light." },
    pace: "slow"
  },
  {
    id: "investigative",
    label: { ar: "\u062A\u062D\u0642\u064A\u0642\u064A\u0629", en: "Investigative" },
    note: { ar: "\u0625\u064A\u0642\u0627\u0639 \u0645\u062D\u0633\u0648\u0628\u060C \u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u064F\u062B\u0628\u062A.", en: "Measured pace, details that prove." },
    pace: "measured"
  },
  {
    id: "lyrical",
    label: { ar: "\u0634\u0627\u0639\u0631\u064A\u0629", en: "Lyrical" },
    note: { ar: "\u0635\u0648\u0631 \u062A\u062A\u0646\u0641\u0633\u060C \u0627\u0646\u062A\u0642\u0627\u0644\u0627\u062A \u0646\u0627\u0639\u0645\u0629.", en: "Images that breathe, soft transitions." },
    pace: "flowing"
  },
  {
    id: "ceremonial",
    label: { ar: "\u0627\u062D\u062A\u0641\u0627\u0644\u064A\u0629", en: "Ceremonial" },
    note: { ar: "\u0648\u0642\u0627\u0631\u060C \u0625\u064A\u0642\u0627\u0639 \u0631\u0633\u0645\u064A\u060C \u062D\u0636\u0648\u0631.", en: "Gravity, formal rhythm, presence." },
    pace: "formal"
  }
];
const MOODS = [
  {
    id: "dawn",
    label: { ar: "\u0641\u062C\u0631", en: "Dawn" },
    note: { ar: "\u0623\u0632\u0631\u0642 \u0628\u0627\u0631\u062F \u064A\u062A\u062D\u0648\u0644 \u0625\u0644\u0649 \u0630\u0647\u0628\u064A.", en: "Cold blue turning gold." },
    from: "#12203a",
    to: "#3a2f2a",
    ink: "#f6e6cd"
  },
  {
    id: "midnight",
    label: { ar: "\u0645\u0646\u062A\u0635\u0641 \u0627\u0644\u0644\u064A\u0644", en: "Midnight" },
    note: { ar: "\u0643\u062D\u0644\u064A \u0639\u0645\u064A\u0642\u060C \u0636\u0648\u0621 \u0648\u0627\u062D\u062F.", en: "Deep navy, a single light." },
    from: "#070b18",
    to: "#182342",
    ink: "#dfe7ff"
  },
  {
    id: "archive",
    label: { ar: "\u0623\u0631\u0634\u064A\u0641", en: "Archive" },
    note: { ar: "\u062D\u0628\u064A\u0628\u0627\u062A\u060C \u0648\u0631\u0642\u060C \u0644\u0648\u0646 \u0628\u0627\u0647\u062A.", en: "Grain, paper, faded tone." },
    from: "#1b1a17",
    to: "#2f2a22",
    ink: "#e8ddc8"
  },
  {
    id: "gold",
    label: { ar: "\u0630\u0647\u0628\u064A", en: "Gold" },
    note: { ar: "\u0634\u0627\u0645\u0628\u0627\u0646\u064A\u0627 \u062F\u0627\u0641\u0626\u0629\u060C \u0628\u0631\u064A\u0642 \u0647\u0627\u062F\u0626.", en: "Warm champagne, quiet sheen." },
    from: "#241a12",
    to: "#3d2c18",
    ink: "#f7ecd6"
  }
];
function atmosphereById(id) {
  return ATMOSPHERES.find((entry) => entry.id === id);
}
function moodById(id) {
  return MOODS.find((entry) => entry.id === id);
}
function themeById(id) {
  return STORY_THEMES.find((entry) => entry.id === id);
}
const MAX_STORY_CARDS = 6;
function addCard(sequence, beatId, theme) {
  if (!theme.beats.some((beat) => beat.id === beatId)) return sequence;
  if (sequence.includes(beatId)) return sequence;
  if (sequence.length >= MAX_STORY_CARDS) return sequence;
  return [...sequence, beatId];
}
function removeCard(sequence, beatId) {
  return sequence.filter((id) => id !== beatId);
}
function moveCard(sequence, from, to) {
  if (from === to) return sequence;
  if (from < 0 || from >= sequence.length) return sequence;
  if (to < 0 || to >= sequence.length) return sequence;
  const next = [...sequence];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}
function buildStoryboard(selection) {
  const theme = themeById(selection.themeId);
  const atmosphere = atmosphereById(selection.atmosphereId) ?? ATMOSPHERES[0];
  const mood = moodById(selection.moodId) ?? MOODS[0];
  if (!theme) return [];
  return selection.cards.map((cardId, index) => {
    const beat = theme.beats.find((entry) => entry.id === cardId);
    if (!beat) return null;
    return {
      id: beat.id,
      index: index + 1,
      title: beat.title,
      beat: beat.beat,
      mood,
      atmosphere
    };
  }).filter((frame) => frame !== null);
}
const ATELIER_DRAFT_KEY = "bm-atelier-draft-v1";
function createDraft(selection, savedAt = /* @__PURE__ */ new Date()) {
  return { version: 1, savedAt: savedAt.toISOString(), ...selection };
}
const THEME_IDS = STORY_THEMES.map((theme) => theme.id);
const ATMOSPHERE_IDS = ATMOSPHERES.map((entry) => entry.id);
const MOOD_IDS = MOODS.map((entry) => entry.id);
function parseDraft(raw) {
  if (!raw) return null;
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== "object" || value === null) return null;
  const candidate = value;
  if (candidate.version !== 1) return null;
  if (!THEME_IDS.includes(candidate.themeId)) return null;
  if (!ATMOSPHERE_IDS.includes(candidate.atmosphereId)) return null;
  if (!MOOD_IDS.includes(candidate.moodId)) return null;
  if (!Array.isArray(candidate.cards)) return null;
  const theme = themeById(candidate.themeId);
  const cards = candidate.cards.filter((id) => typeof id === "string").filter((id) => Boolean(theme?.beats.some((beat) => beat.id === id))).slice(0, MAX_STORY_CARDS);
  return {
    version: 1,
    savedAt: typeof candidate.savedAt === "string" ? candidate.savedAt : (/* @__PURE__ */ new Date(0)).toISOString(),
    themeId: candidate.themeId,
    atmosphereId: candidate.atmosphereId,
    moodId: candidate.moodId,
    cards,
    note: typeof candidate.note === "string" ? candidate.note.slice(0, 600) : ""
  };
}
export {
  ATELIER_DRAFT_KEY,
  ATMOSPHERES,
  MAX_STORY_CARDS,
  MOODS,
  STORY_THEMES,
  addCard,
  atmosphereById,
  buildStoryboard,
  createDraft,
  moodById,
  moveCard,
  parseDraft,
  removeCard,
  themeById
};
