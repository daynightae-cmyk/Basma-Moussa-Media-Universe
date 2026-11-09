import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relative) {
  return fs.readFileSync(path.join(root, relative), "utf8");
}

test("the first client render reads the same language source as the server", () => {
  const source = read("src/lib/experience/i18n.jsx");

  assert.ok(source.includes("createIsomorphicFn()"), "uses a server/client split");
  assert.ok(source.includes(".server(() =>"), "has a server branch");
  assert.ok(source.includes(".client(() =>"), "has a client branch");
  assert.ok(source.includes('headers?.get("cookie")'), "the server reads the request cookie");
  assert.ok(source.includes("parseLangCookie(document.cookie)"), "the client reads the same cookie");

  const initializer = source.slice(source.indexOf("useState("), source.indexOf("const dir"));
  assert.equal(initializer.includes("localStorage"), false, "the first render never reads localStorage");
});

test("language changes persist to a cookie the next render can read", () => {
  const source = read("src/lib/experience/i18n.jsx");

  assert.ok(source.includes("document.cookie = `${STORAGE_KEY}=${lang}"), "writes the language cookie");
  assert.ok(source.includes("max-age=${COOKIE_MAX_AGE}"), "the cookie outlives the session");
  assert.ok(source.includes('saved === "en") setLangState("en")'), "migrates the legacy localStorage preference once");
});

test("the document language and direction follow the active language", () => {
  const source = read("src/routes/__root.jsx");

  assert.ok(source.includes("<html lang={lang} dir={dir}"), "html attributes come from the provider");
  assert.ok(source.includes("useI18n()"), "the document shell reads the provider");
});
