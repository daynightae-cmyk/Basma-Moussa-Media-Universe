const BROADCAST_PHASES = [
  "IDLE",
  "PREVIEW",
  "PREPARING",
  "CONNECTING",
  "LIVE",
  "RECONNECTING",
  "ENDED",
  "FAILED"
];
function initialBroadcastState(transportConfigured, producerAuthorized = false) {
  return {
    phase: "PREVIEW",
    transportConfigured,
    producerAuthorized,
    failure: null,
    transportAcknowledged: false
  };
}
function broadcastReducer(state, event) {
  switch (event.type) {
    case "preview":
      if (state.phase === "LIVE" || state.phase === "CONNECTING") return state;
      return { ...state, phase: "PREVIEW", failure: null };
    case "start": {
      if (state.phase !== "PREVIEW" && state.phase !== "ENDED" && state.phase !== "FAILED") {
        return state;
      }
      if (!state.transportConfigured) {
        return { ...state, phase: "FAILED", failure: "transport-not-configured" };
      }
      if (!state.producerAuthorized) {
        return { ...state, phase: "FAILED", failure: "producer-not-authorized" };
      }
      return { ...state, phase: "PREPARING", failure: null };
    }
    case "connect":
      if (state.phase !== "PREPARING") return state;
      return { ...state, phase: "CONNECTING" };
    case "acknowledged":
      if (state.phase !== "CONNECTING" && state.phase !== "RECONNECTING") return state;
      if (!state.transportConfigured) return state;
      return { ...state, phase: "LIVE", transportAcknowledged: true, failure: null };
    case "reconnecting":
      if (state.phase !== "LIVE") return state;
      return { ...state, phase: "RECONNECTING", transportAcknowledged: false };
    case "fail":
      return {
        ...state,
        phase: "FAILED",
        transportAcknowledged: false,
        failure: event.reason
      };
    case "stop":
      if (state.phase === "IDLE") return state;
      return { ...state, phase: "ENDED", transportAcknowledged: false, failure: null };
    case "reset": {
      if (state.phase === "LIVE") return state;
      return { ...state, phase: "PREVIEW", failure: null, transportAcknowledged: false };
    }
    default:
      return state;
  }
}
function isOnAir(state) {
  return state.phase === "LIVE" && state.transportAcknowledged;
}
function broadcastStatusKey(state) {
  return state.phase;
}
export {
  BROADCAST_PHASES,
  broadcastReducer,
  broadcastStatusKey,
  initialBroadcastState,
  isOnAir
};
