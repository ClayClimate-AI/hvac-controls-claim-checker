import { describe, expect, it } from "vitest";
import nextConfig from "@/next.config";

// Proves the test harness runs TypeScript and resolves the "@/" path alias.
describe("test harness", () => {
  it("resolves @/ imports from the project root", () => {
    expect(nextConfig.agentRules).toBe(false);
  });
});
