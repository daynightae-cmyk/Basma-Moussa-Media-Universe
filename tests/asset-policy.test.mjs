import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { ASSETS } from "../src/lib/experience/assets.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("every declared image is an existing local source file", () => {
  const entries = Object.entries(ASSETS);
  assert.equal(entries.length, 15);
  for (const [name, source] of entries) {
    assert.match(source, /^\/(brand|media|placeholders)\//, name);
    const file = path.join(root, "public", source.slice(1));
    assert.ok(fs.existsSync(file), name + ": image is missing");
    assert.ok(fs.statSync(file).size > 100, name + ": empty image");
    if (source.endsWith(".svg")) {
      const content = fs.readFileSync(file, "utf8");
      assert.match(content, /<svg /);
      assert.match(content, /<\/svg>/);
    }
  }
});

test("unapproved Basma photo keys use temporary face-free illustrations", () => {
  for (const key of ["homeHero", "portrait", "portraitAlt", "legalPortrait", "legalDialogue"]) {
    assert.ok(ASSETS[key].startsWith("/placeholders/"), key);
    assert.ok(ASSETS[key].endsWith(".svg"), key);
  }
});

test("personal portrait disclaimers are accurate in Arabic and English", () => {
  const about = fs.readFileSync(path.join(root, "src/routes/_site/about.jsx"), "utf8");
  assert.ok(about.includes("Temporary abstract artwork"));
  assert.ok(about.includes("ليس صورة حقيقية"));
  assert.ok(!about.includes("Approved illustrative identity image"));
});

test("no credentials or old app media host are needed by the current asset map", () => {
  const src = fs.readFileSync(path.join(root, "src/lib/experience/assets.js"), "utf8");
  assert.ok(!src.includes("base44.app/api/apps/"));
  assert.ok(!src.includes("process.env"));
});
