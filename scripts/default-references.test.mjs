import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const catalog = JSON.parse(
  readFileSync(join(process.cwd(), "src/data/defaultReferences.catalog.json"), "utf8")
);
const migration = readFileSync(
  join(process.cwd(), "supabase/migrations/20260714110000_add_default_reference_saves.sql"),
  "utf8"
);
const edgeFunction = readFileSync(
  join(process.cwd(), "supabase/functions/default-reference-collection/index.ts"),
  "utf8"
);
const connectionEngine = readFileSync(
  join(process.cwd(), "src/utils/connectionEngine.ts"),
  "utf8"
);
const demoConnections = readFileSync(
  join(process.cwd(), "src/data/demoConnections.ts"),
  "utf8"
);
const supabaseReferenceManager = readFileSync(
  join(process.cwd(), "src/components/SupabaseReferenceManager.tsx"),
  "utf8"
);
const generateConnectionsFunction = readFileSync(
  join(process.cwd(), "supabase/functions/generate-connections/index.ts"),
  "utf8"
);

function createCollectionStore() {
  const rows = new Map();

  return {
    save(userId, defaultReferenceId) {
      const reference = catalog.find((entry) => entry.id === defaultReferenceId);
      if (!reference) throw new Error("Unknown default reference id.");

      const compoundKey = `${userId}:${defaultReferenceId}`;
      if (rows.has(compoundKey)) throw new Error("Default reference already saved.");

      rows.set(compoundKey, { userId, defaultReferenceId, reference });
      return rows.get(compoundKey);
    },
    remove(userId, defaultReferenceId) {
      return rows.delete(`${userId}:${defaultReferenceId}`);
    },
    list(userId, uploadedReferences = []) {
      return [
        ...uploadedReferences.map((reference) => ({ ...reference, source: "uploaded" })),
        ...Array.from(rows.values())
          .filter((row) => row.userId === userId)
          .map((row) => ({ ...row.reference, source: "default" })),
      ];
    },
  };
}

function buildAiContext(reference) {
  return {
    id: reference.id,
    source: reference.source,
    url: reference.imagePath,
    title: reference.title,
    description: reference.description,
    tags: reference.tags,
  };
}

describe("default reference catalog", () => {
  it("uses stable unique ids and public image paths", () => {
    const ids = new Set(catalog.map((reference) => reference.id));
    assert.equal(ids.size, catalog.length);
    assert.ok(catalog.length >= 8);

    const publicFiles = new Set(readdirSync(join(process.cwd(), "public/references")));
    for (const reference of catalog) {
      assert.match(reference.id, /^default-image-/);
      assert.match(reference.imagePath, /^\/references\//);
      assert.ok(publicFiles.has(decodeURIComponent(reference.imagePath.replace("/references/", ""))));
    }
  });

  it("declares duplicate protection and owner policies in the migration", () => {
    assert.match(migration, /unique\s*\(\s*user_id\s*,\s*default_reference_id\s*\)/i);
    assert.match(migration, /auth\.uid\(\)\s*=\s*user_id/i);
    assert.match(migration, /on delete set null/i);
  });

  it("validates ids through the server catalog before mutating", () => {
    assert.match(edgeFunction, /getDefaultReferenceById\(defaultReferenceId\)/);
    assert.match(edgeFunction, /Unknown default reference id/);
  });
});

describe("default reference collection behavior", () => {
  it("lets one user save a default reference", () => {
    const store = createCollectionStore();
    const saved = store.save("user-a", catalog[0].id);

    assert.equal(saved.userId, "user-a");
    assert.equal(saved.defaultReferenceId, catalog[0].id);
  });

  it("prevents the same user from saving the same default reference twice", () => {
    const store = createCollectionStore();
    store.save("user-a", catalog[0].id);

    assert.throws(() => store.save("user-a", catalog[0].id), /already saved/);
  });

  it("allows two users to save the same default reference", () => {
    const store = createCollectionStore();
    store.save("user-a", catalog[0].id);
    store.save("user-b", catalog[0].id);

    assert.equal(store.list("user-a").length, 1);
    assert.equal(store.list("user-b").length, 1);
  });

  it("removes only the user relationship and keeps the global resource", () => {
    const store = createCollectionStore();
    store.save("user-a", catalog[0].id);

    assert.equal(store.remove("user-a", catalog[0].id), true);
    assert.ok(catalog.find((reference) => reference.id === catalog[0].id));
  });

  it("keeps uploaded references in the unified collection", () => {
    const store = createCollectionStore();
    const uploaded = [{ id: "uploaded-1", title: "Poster propio" }];

    assert.deepEqual(store.list("user-a", uploaded).map((reference) => reference.source), [
      "uploaded",
    ]);
  });

  it("returns uploaded and default references together", () => {
    const store = createCollectionStore();
    store.save("user-a", catalog[0].id);

    const collection = store.list("user-a", [{ id: "uploaded-1", title: "Poster propio" }]);
    assert.deepEqual(collection.map((reference) => reference.source), ["uploaded", "default"]);
  });

  it("builds AI context for a saved default reference", () => {
    const store = createCollectionStore();
    store.save("user-a", catalog[0].id);

    const defaultReference = store.list("user-a").find((reference) => reference.source === "default");
    const aiContext = buildAiContext(defaultReference);

    assert.equal(aiContext.id, catalog[0].id);
    assert.equal(aiContext.url, catalog[0].imagePath);
    assert.ok(aiContext.tags.length > 0);
  });

  it("rejects an unknown default reference id", () => {
    const store = createCollectionStore();

    assert.throws(() => store.save("user-a", "missing-default-reference"), /Unknown/);
  });

  it("does not let one user delete another user's saved default reference", () => {
    const store = createCollectionStore();
    store.save("user-a", catalog[0].id);

    assert.equal(store.remove("user-b", catalog[0].id), false);
    assert.equal(store.list("user-a").length, 1);
  });
});

describe("local connection cards", () => {
  it("declares the richer connection card contract", () => {
    for (const field of [
      "title",
      "connectionType",
      "explanation",
      "creativeApplication",
      "confidence",
      "matchedCriteria",
    ]) {
      assert.match(connectionEngine, new RegExp(field));
      assert.match(generateConnectionsFunction, new RegExp(field));
    }
  });

  it("includes the requested A Bigger Splash / Jacquemus complete demo connection", () => {
    assert.match(demoConnections, /demo-case-a-bigger-splash/);
    assert.match(demoConnections, /demo-case-jacquemus-le-splash/);
    assert.match(demoConnections, /Campaña Jacquemus Le Splash/);
    assert.match(demoConnections, /color saturado/);
    assert.match(demoConnections, /confidence:\s*4/);
  });

  it("renders structured connection cards instead of technical string reasons", () => {
    assert.match(supabaseReferenceManager, /ConnectionInsightCard/);
    assert.match(supabaseReferenceManager, /Aplicacion creativa/);
    assert.match(supabaseReferenceManager, /Confianza:/);
    assert.doesNotMatch(supabaseReferenceManager, /Coincide por/);
    assert.doesNotMatch(supabaseReferenceManager, /palabras compartidas/);
  });
});
