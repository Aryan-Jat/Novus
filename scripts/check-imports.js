
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "src");

const extensions = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".css",
  ".scss",
  ".sass",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".woff",
  ".woff2",
  ".ttf",
];

const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const errors = [];

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return getFiles(fullPath);
    }

    return sourceExtensions.has(path.extname(entry.name))
      ? [fullPath]
      : [];
  });
}

function resolveWithCaseCheck(target) {
  const absolute = path.resolve(target);
  const parsed = path.parse(absolute);
  const segments = absolute.slice(parsed.root.length).split(path.sep);

  let current = parsed.root;
  const mismatches = [];

  for (const segment of segments) {
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory()) {
      return { found: false };
    }

    const entries = fs.readdirSync(current);

    if (entries.includes(segment)) {
      current = path.join(current, segment);
      continue;
    }

    const match = entries.find(
      (entry) => entry.toLowerCase() === segment.toLowerCase()
    );

    if (!match) return { found: false };

    mismatches.push({
      expected: segment,
      actual: match,
    });

    current = path.join(current, match);
  }

  return {
    found: fs.existsSync(current) && fs.statSync(current).isFile(),
    actualPath: current,
    mismatches,
  };
}

function checkImport(importer, specifier) {
  if (!specifier.startsWith(".")) return;

  const cleanSpecifier = specifier.split("?")[0].split("#")[0];
  const base = path.resolve(path.dirname(importer), cleanSpecifier);

  const candidates = [
    base,
    ...extensions.map((ext) => base + ext),
    ...extensions.map((ext) => path.join(base, "index" + ext)),
  ];

  for (const candidate of candidates) {
    const result = resolveWithCaseCheck(candidate);

    if (!result.found) continue;

    if (result.mismatches?.length) {
      for (const mismatch of result.mismatches) {
        errors.push(
          `CASE MISMATCH: ${path.relative(root, importer)}\n` +
          `  Expected: ${mismatch.expected}\n` +
          `  Actual:   ${mismatch.actual}`
        );
      }
    }

    return;
  }

  errors.push(
    `MISSING IMPORT: ${path.relative(root, importer)}\n` +
    `  Import: ${specifier}`
  );
}

function scanFile(file) {
  const content = fs.readFileSync(file, "utf8");

  const importRegex =
    /(?:import\s+(?:[^'"]*?\s+from\s+)?|export\s+[^'"]*?\s+from\s+|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g;

  for (const match of content.matchAll(importRegex)) {
    checkImport(file, match[1]);
  }
}

if (!fs.existsSync(sourceDir)) {
  console.error("ERROR: src directory not found.");
  process.exit(1);
}

console.log("\nChecking local import paths and filename casing...\n");

for (const file of getFiles(sourceDir)) {
  scanFile(file);
}

if (errors.length) {
  console.error(errors.join("\n\n"));
  console.error(`\nFound ${errors.length} import issue(s).`);
  process.exit(1);
}

console.log("All relative imports and filename casing checks passed.\n");
