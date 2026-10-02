// Setup gate (L1). Exits 0 only if every real dependency is present.
// EXTRA_REQUIRED lets us prove it fails: EXTRA_REQUIRED=not-a-real-package npm run gate:setup → exit 1.
// Prints only status lines (ok / MISSING / skip). Never prints the key or any .env.local content.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const required = [
  "next",
  "react",
  "react-dom",
  "zod",
  "ai",
  "@ai-sdk/anthropic",
  "vitest",
  ...(process.env.EXTRA_REQUIRED ? [process.env.EXTRA_REQUIRED] : []),
];

let ok = true;

const requiredNodeMajor = readFileSync(".nvmrc", "utf8").trim().replace(/^v/, "").split(".")[0];
const runningNodeMajor = process.versions.node.split(".")[0];
if (runningNodeMajor === requiredNodeMajor) {
  console.log(`ok   node ${runningNodeMajor}`);
} else {
  console.error(`MISSING node ${requiredNodeMajor} (running ${runningNodeMajor})`);
  ok = false;
}

// Each package must be declared in package.json AND installed. A copy pulled in by
// another package does not count (failure 5: zod arrived via eslint-config-next).
// Check the installed package.json directly: require.resolve("<pkg>/package.json")
// fails for packages whose "exports" map hides package.json.
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const declared = { ...pkg.dependencies, ...pkg.devDependencies };
for (const name of required) {
  if (!(name in declared)) {
    console.error(`MISSING ${name} (not declared in package.json)`);
    ok = false;
  } else if (!existsSync(join("node_modules", name, "package.json"))) {
    console.error(`MISSING ${name} (not installed)`);
    ok = false;
  } else {
    console.log(`ok   ${name}`);
  }
}

// The key check is skipped only when the CI environment variable is set.
// CI never needs the key: tests mock lib/extract.ts and never call the real API.
if (process.env.CI) {
  console.log("skip ANTHROPIC_API_KEY (CI)");
} else {
  const env = existsSync(".env.local") ? readFileSync(".env.local", "utf8") : "";
  const line = env.split(/\r?\n/).find((l) => /^\s*ANTHROPIC_API_KEY\s*=/.test(l));
  const value = line ? line.slice(line.indexOf("=") + 1).trim().replace(/^(["'])(.*)\1$/, "$2").trim() : "";
  if (value) {
    console.log("ok   ANTHROPIC_API_KEY");
  } else {
    console.error("MISSING ANTHROPIC_API_KEY in .env.local (absent or empty)");
    ok = false;
  }
}

process.exit(ok ? 0 : 1);
