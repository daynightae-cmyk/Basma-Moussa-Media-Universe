import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relative) {
  return fs.readFileSync(path.join(root, relative), "utf8");
}

test("the booth recorder is real browser capture, not a decorative control", () => {
  const recorder = read("src/components/soundroom/local-recorder.jsx");

  assert.ok(recorder.includes("navigator.mediaDevices.getUserMedia"), "requests a real microphone stream");
  assert.ok(recorder.includes("new window.MediaRecorder"), "constructs a real MediaRecorder");
  assert.ok(recorder.includes("recorder.start(1000)"), "records in one-second chunks");
  assert.ok(recorder.includes("recorder.stop()"), "stops the recorder");
  assert.ok(recorder.includes("track.stop()"), "releases every microphone track");
  assert.ok(recorder.includes("URL.revokeObjectURL"), "releases the local blob URL");
  assert.ok(recorder.includes("download={clip.name}"), "offers the take as a real download");
  assert.equal(recorder.includes("fetch("), false, "never uploads the take");
  assert.equal(recorder.includes("XMLHttpRequest"), false, "never uploads the take");
  assert.equal(recorder.includes("asServiceRole"), false, "never touches the backend");
});

test("a take is bounded and discarded with the page", () => {
  const recorder = read("src/components/soundroom/local-recorder.jsx");
  assert.match(recorder, /MAX_SECONDS = 300/, "five-minute cap");
  assert.ok(recorder.includes("chunksRef.current = []"), "chunks are dropped after finalising");
  assert.ok(recorder.includes("discarded when you close or reload the page"), "states the real lifetime of a take");
});

test("the booth mounts the recorder and its honesty copy matches the behaviour", () => {
  const rooms = read("src/components/soundroom/Rooms.jsx");
  assert.ok(rooms.includes("<LocalRecorder />"), "the booth renders the recorder");

  const content = read("src/lib/experience/worldsContent.js");
  const start = content.indexOf('id: "booth"');
  const end = content.indexOf('id: "editing"');
  assert.ok(start > 0 && end > start, "booth entry is present");
  const booth = content.slice(start, end);
  assert.equal(booth.includes("No in-browser recording"), false, "no longer denies in-browser recording");
  assert.ok(booth.includes("never uploaded"), "states that nothing is uploaded");

  const route = read("src/routes/_site/soundroom.jsx");
  assert.equal(route.includes("Audio is never recorded"), false, "no longer claims audio is never recorded");
  assert.ok(route.includes("No audio is sent to a server"), "keeps the no-upload guarantee");
});

test("the assistant endpoint bounds input, time and empty replies", () => {
  const source = read("src/lib/server-fns.js");
  assert.ok(source.includes("LLM_TIMEOUT_MS"), "a provider timeout exists");
  assert.ok(source.includes("12000"), "the whole conversation is bounded");
  assert.ok(source.includes(".trim().min(1)"), "empty messages are rejected");
  assert.ok(source.includes("empty reply"), "an empty provider answer is a real error");
});
