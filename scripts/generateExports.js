import { readdir, stat } from 'fs/promises';
import { join, resolve, relative } from 'path';
import fs from 'fs';

const esmRoot = resolve('dist', 'esm');

const getExportPaths = async (dir, baseDir = dir) => {
  const entries = await readdir(dir);
  const fileNames = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const relPath = relative(baseDir, fullPath);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      const subFiles = await getExportPaths(fullPath, baseDir);

      fileNames.push(...subFiles);
    } else if (entry.endsWith('.js')) {
      fileNames.push(relPath.replace(/\.(js|ts|d\.ts)$/, '').replace(/\\/g, '/'));
    }
  }

  return fileNames;
};

const files = await getExportPaths(esmRoot);

const exports = {
  '.': {
    import: {
      types: './dist/esm/index.d.ts',
      default: './dist/esm/index.js',
    },
    require: {
      types: './dist/esm/index.d.ts',
      default: './dist/cjs/index.js',
    },
  },
};

for (const file of files) {
  if (file === 'index') {
    continue;
  }

  exports[`./${file}`] = {
    import: {
      default: `./dist/esm/${file}.js`,
      types: `./dist/esm/${file}.d.ts`,
    },
    require: {
      default: `./dist/cjs/${file}.js`,
      types: `./dist/esm/${file}.d.ts`,
    },
  };
}

const pkgPath = resolve('package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

pkg.exports = exports;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.info('✅ Exports section updated in package.json');
