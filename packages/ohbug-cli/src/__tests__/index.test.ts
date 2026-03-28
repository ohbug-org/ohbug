import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import request from "../lib/request";
import uploadSourceMap from "../lib/uploadSourceMap";
import { clearUploads, closeTestServer, createTestServer, endpoint, uploadsDir } from "./helpers";

const __dirname = dirname(fileURLToPath(import.meta.url));

const apiKey = "YOUR_API_KEY";
const appVersion = "YOUR_APP_VERSION";
const filePath = resolve(__dirname, "./fixtures/main.js.map");
const dirPath = resolve(__dirname, "./fixtures");

describe("ohbug-cli", () => {
  beforeAll(async () => {
    await clearUploads();
    await createTestServer();
  });

  afterAll(async () => {
    await closeTestServer();
  });

  afterEach(async () => {
    await clearUploads();
  });

  it("request: should work", async () => {
    await request({ endpoint, file: filePath });
    const files = readdirSync(uploadsDir).length;
    expect(files).toBe(1);
  });

  it("request: endpoint is required", async () => {
    await expect(
      // @ts-expect-error -- test requires invalid input
      request({ endpoint: null }),
    ).rejects.toThrow(/No endpoint matches!/);
  });

  it("request: file is required", async () => {
    await expect(
      // @ts-expect-error -- test requires invalid input
      request({ endpoint, file: null }),
    ).rejects.toThrow(/No ".map" file matches!/);
  });

  it("uploadSourceMap: should work with single file", async () => {
    await uploadSourceMap({ path: filePath, apiKey, appVersion, endpoint });
    const files = readdirSync(uploadsDir).length;
    expect(files).toBe(1);
  });

  it("uploadSourceMap: should work with directory", async () => {
    await uploadSourceMap({ path: dirPath, apiKey, appVersion, endpoint });
    const files = readdirSync(uploadsDir).length;
    expect(files).toBe(2);
  });
});
