import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relative) {
  return fs.readFileSync(path.join(root, relative), "utf8");
}

test("every story in the archive is a labelled concept, never a published episode", () => {
  const source = read("src/lib/experience/worldsContent.js");
  const start = source.indexOf("export const STORY_ITEMS");
  const end = source.indexOf("export const ABOUT_COPY");
  assert.ok(start > 0 && end > start, "STORY_ITEMS block is present");
  const block = source.slice(start, end);

  const entries = [...block.matchAll(/^\s{4}id: "/gm)].length;
  const concepts = [...block.matchAll(/status: "concept"/g)].length;

  assert.equal(entries, 6, "six editorial entrances");
  assert.equal(concepts, entries, "every entrance keeps the concept status");
  assert.ok(!block.includes('status: "published"'), "no entrance claims publication");
});

test("the archive cites only absolute https official sources", () => {
  const source = read("src/lib/experience/worldsContent.js");
  const start = source.indexOf("export const SOURCES");
  const end = source.indexOf("export const LEGAL_DISCLAIMER");
  assert.ok(start > 0 && end > start, "SOURCES block is present");
  const urls = [...source.slice(start, end).matchAll(/url: "([^"]+)"/g)].map((match) => match[1]);

  assert.equal(urls.length, 4, "four official references");
  assert.equal(new Set(urls).size, urls.length, "no duplicated source");
  for (const url of urls) {
    assert.match(url, /^https:\/\//, url + " must be an absolute https link");
  }
});

test("the stories route states that nothing is published yet", () => {
  const route = read("src/routes/_site/stories.jsx");
  assert.ok(route.includes("STORY_ITEMS"), "renders the real archive data");
  assert.ok(route.includes("حلقات منشورة"), "shows the published-episode count");
  assert.ok(route.includes("لا حلقات منشورة"), "states that no episode is published");
  assert.ok(route.includes("أرشيف تصوري"), "labels the archive as a concept");
});
