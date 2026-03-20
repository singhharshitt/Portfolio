#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const SOURCE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];

function walkFiles(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(abs, out);
      continue;
    }
    if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      out.push(abs);
    }
  }
  return out;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function getLineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function pathExistsExactCase(absPath) {
  if (!fs.existsSync(absPath)) {
    return false;
  }

  const normalized = path.normalize(absPath);
  const parsed = path.parse(normalized);
  const segments = normalized.slice(parsed.root.length).split(path.sep).filter(Boolean);
  let current = parsed.root;

  for (const segment of segments) {
    const names = fs.readdirSync(current);
    const exact = names.find((name) => name === segment);
    if (!exact) {
      return false;
    }
    current = path.join(current, exact);
  }

  return true;
}

function resolveRelativeImport(importerFile, specifier) {
  const base = path.resolve(path.dirname(importerFile), specifier);
  const candidates = [];

  candidates.push(base);

  for (const ext of SOURCE_EXTENSIONS) {
    candidates.push(base + ext);
  }

  for (const ext of SOURCE_EXTENSIONS) {
    candidates.push(path.join(base, 'index' + ext));
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && pathExistsExactCase(candidate)) {
      return { ok: true, resolved: candidate };
    }
  }

  return { ok: false, attempted: candidates };
}

function parseReactIconImports(filePath, source) {
  const imports = [];
  const re = /import\s*\{([^;]*?)\}\s*from\s*['\"](react-icons\/[a-z0-9]+)['\"]\s*;?/g;
  let match;

  while ((match = re.exec(source)) !== null) {
    const symbols = match[1]
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => part.replace(/\s+as\s+.*/, '').trim())
      .filter(Boolean);

    imports.push({
      filePath,
      line: getLineNumber(source, match.index),
      moduleName: match[2],
      symbols,
    });
  }

  return imports;
}

function parseRelativeImports(filePath, source) {
  const imports = [];
  const re = /import\s+(?:[^;]*?\s+from\s+)?['\"]([^'\"]+)['\"]\s*;?/g;
  let match;

  while ((match = re.exec(source)) !== null) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) {
      continue;
    }

    imports.push({
      filePath,
      line: getLineNumber(source, match.index),
      specifier,
    });
  }

  return imports;
}

async function validateReactIcons(iconImports) {
  const errors = [];
  const moduleCache = new Map();

  for (const iconImport of iconImports) {
    if (!moduleCache.has(iconImport.moduleName)) {
      try {
        const mod = await import(iconImport.moduleName);
        moduleCache.set(iconImport.moduleName, mod);
      } catch (error) {
        errors.push(
          `${toPosix(path.relative(ROOT, iconImport.filePath))}:${iconImport.line} cannot load ${iconImport.moduleName}: ${error.message}`
        );
        continue;
      }
    }

    const mod = moduleCache.get(iconImport.moduleName);
    for (const symbol of iconImport.symbols) {
      if (!Object.prototype.hasOwnProperty.call(mod, symbol)) {
        errors.push(
          `${toPosix(path.relative(ROOT, iconImport.filePath))}:${iconImport.line} missing export ${symbol} from ${iconImport.moduleName}`
        );
      }
    }
  }

  return errors;
}

function validateRelativeImports(relativeImports) {
  const errors = [];

  for (const imp of relativeImports) {
    const result = resolveRelativeImport(imp.filePath, imp.specifier);
    if (result.ok) {
      continue;
    }

    errors.push(
      `${toPosix(path.relative(ROOT, imp.filePath))}:${imp.line} unresolved or case-mismatched import ${imp.specifier}`
    );
  }

  return errors;
}

async function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error('validate-imports: src directory not found');
    process.exit(1);
  }

  const files = walkFiles(SRC_DIR);
  const iconImports = [];
  const relativeImports = [];

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, 'utf8');
    iconImports.push(...parseReactIconImports(filePath, source));
    relativeImports.push(...parseRelativeImports(filePath, source));
  }

  const iconErrors = await validateReactIcons(iconImports);
  const relativeErrors = validateRelativeImports(relativeImports);
  const errors = [...iconErrors, ...relativeErrors];

  if (errors.length > 0) {
    console.error('validate-imports failed:');
    for (const err of errors) {
      console.error(`- ${err}`);
    }
    process.exit(1);
  }

  console.log('validate-imports: all checks passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
