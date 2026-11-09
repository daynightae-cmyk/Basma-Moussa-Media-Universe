const SPLASH_PHASES = [
  "INITIAL",
  "THREAD",
  "MASK",
  "SCALES",
  "LOGO",
  "INVITATION",
  "ENTERING",
  "COMPLETE"
];
const PHASE_STAGE = {
  INITIAL: 0,
  THREAD: 1,
  MASK: 2,
  SCALES: 3,
  LOGO: 4,
  INVITATION: 5,
  ENTERING: 5,
  COMPLETE: 6
};
const PHASE_DURATION = {
  INITIAL: 220,
  THREAD: 1700,
  MASK: 1500,
  SCALES: 1600,
  LOGO: 1400,
  ENTERING: 950
};
const AUTO_CHAIN = [
  "INITIAL",
  "THREAD",
  "MASK",
  "SCALES",
  "LOGO",
  "INVITATION"
];
const initialSplashState = {
  phase: "INITIAL",
  dismissed: false
};
function advanceSplash(state) {
  if (state.phase === "ENTERING") return { phase: "COMPLETE", dismissed: true };
  const index = AUTO_CHAIN.indexOf(state.phase);
  if (index === -1) return state;
  const next = AUTO_CHAIN[index + 1];
  if (!next) return state;
  return { ...state, phase: next };
}
function splashReducer(state, event) {
  switch (event.type) {
    case "advance":
      return advanceSplash(state);
    case "skip":
      if (state.phase === "COMPLETE") return state;
      return { phase: "COMPLETE", dismissed: true };
    case "enter":
      if (state.phase !== "INVITATION") return state;
      return { phase: "ENTERING", dismissed: false };
    case "finishEntering":
      if (state.phase !== "ENTERING") return state;
      return { phase: "COMPLETE", dismissed: true };
    case "replay":
      return { phase: "INITIAL", dismissed: false };
    default:
      return state;
  }
}
function isSplashVisible(state) {
  return state.phase !== "COMPLETE";
}
function nextAdvanceDelay(phase) {
  return PHASE_DURATION[phase] ?? null;
}
function shouldPlaySplash({ seen, replayRequested, reducedMotion }) {
  if (reducedMotion) return false;
  if (replayRequested) return true;
  return !seen;
}
const SPLASH_STORAGE_KEY = "bm-splash-seen";
const SPLASH_REPLAY_EVENT = "bm-splash:replay";
const SPLASH_COMPLETE_EVENT = "bm-splash:complete";
export {
  PHASE_DURATION,
  PHASE_STAGE,
  SPLASH_COMPLETE_EVENT,
  SPLASH_PHASES,
  SPLASH_REPLAY_EVENT,
  SPLASH_STORAGE_KEY,
  advanceSplash,
  initialSplashState,
  isSplashVisible,
  nextAdvanceDelay,
  shouldPlaySplash,
  splashReducer
};
