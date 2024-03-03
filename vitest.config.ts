import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

import { createVitestTestConfig } from "./create-vitest-test-config";

export default defineConfig({
  test: createVitestTestConfig("(unit|e2e)"),
  plugins: [swc.vite({ module: { type: "es6" } })],
});
