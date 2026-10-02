import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests only (no component tests, spec section 1): plain Node environment,
// plus the "@/" alias from tsconfig.json.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
