import { describe, expect, test, vi } from "vitest";

vi.mock("@ohbug/cli", () => ({
  uploadSourceMap: vi.fn().mockResolvedValue(undefined),
}));

import { uploadSourceMap } from "@ohbug/cli";

import { unpluginFactory } from "../src/index";

describe("@ohbug/unplugin", () => {
  describe("validateOptions", () => {
    test("should throw when apiKey is missing", () => {
      const plugin = unpluginFactory({ apiKey: "", appVersion: "1.0.0" }, {
        framework: "rollup",
      } as any);

      expect(() => {
        (plugin as any).rollup.writeBundle({ dir: "/tmp" }, {});
      }).toThrow('"apiKey" is required!');
    });

    test("should throw when appVersion is missing", () => {
      const plugin = unpluginFactory({ apiKey: "valid-key", appVersion: "" }, {
        framework: "rollup",
      } as any);

      expect(() => {
        (plugin as any).rollup.writeBundle({ dir: "/tmp" }, {});
      }).toThrow('"appVersion" is required!');
    });

    test("should not throw when options are valid", () => {
      const plugin = unpluginFactory({ apiKey: "valid-key", appVersion: "1.0.0" }, {
        framework: "rollup",
      } as any);

      expect(() => {
        (plugin as any).rollup.writeBundle({ dir: "/tmp" }, {});
      }).not.toThrow();
    });
  });

  describe("collectAssetsFromBundle", () => {
    test("should collect assets with sourcemaps from bundle", () => {
      vi.mocked(uploadSourceMap).mockClear();

      const plugin = unpluginFactory({ apiKey: "key", appVersion: "1.0.0" }, {
        framework: "rollup",
      } as any);

      const bundle = {
        "main.js": { fileName: "main.js", map: { version: 3 } },
        "vendor.js": { fileName: "vendor.js", map: null },
        "style.css": { fileName: "style.css" },
      };

      (plugin as any).rollup.writeBundle({ dir: "/tmp/dist" }, bundle);

      // Should only upload the one file with a truthy map
      expect(uploadSourceMap).toHaveBeenCalledTimes(1);
      expect(uploadSourceMap).toHaveBeenCalledWith(
        expect.objectContaining({
          apiKey: "key",
          appVersion: "1.0.0",
          path: expect.stringContaining("main.js.map"),
        }),
      );
    });

    test("should not upload when no sourcemaps in bundle", () => {
      vi.mocked(uploadSourceMap).mockClear();

      const plugin = unpluginFactory({ apiKey: "key", appVersion: "1.0.0" }, {
        framework: "rollup",
      } as any);

      const bundle = {
        "main.js": { fileName: "main.js" },
        "style.css": { fileName: "style.css" },
      };

      (plugin as any).rollup.writeBundle({ dir: "/tmp/dist" }, bundle);

      expect(uploadSourceMap).not.toHaveBeenCalled();
    });

    test("should handle multiple sourcemaps", () => {
      vi.mocked(uploadSourceMap).mockClear();

      const plugin = unpluginFactory({ apiKey: "key", appVersion: "2.0.0" }, {
        framework: "rollup",
      } as any);

      const bundle = {
        "main.js": { fileName: "main.js", map: { version: 3 } },
        "vendor.js": { fileName: "vendor.js", map: { version: 3 } },
      };

      (plugin as any).rollup.writeBundle({ dir: "/tmp/dist" }, bundle);

      expect(uploadSourceMap).toHaveBeenCalledTimes(2);
    });
  });

  describe("ohbugUnplugin export", () => {
    test("should export ohbugUnplugin with platform methods", async () => {
      const { ohbugUnplugin } = await import("../src/index");
      expect(ohbugUnplugin).toBeDefined();
      expect(typeof ohbugUnplugin.vite).toBe("function");
      expect(typeof ohbugUnplugin.webpack).toBe("function");
      expect(typeof ohbugUnplugin.rollup).toBe("function");
      expect(typeof ohbugUnplugin.esbuild).toBe("function");
      expect(typeof ohbugUnplugin.rspack).toBe("function");
    });
  });
});
