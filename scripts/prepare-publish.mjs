#!/usr/bin/env node
/**
 * 生成 SkillHub 发布目录，排除白名单外的文件（如 .gitignore、无扩展名 LICENSE）。
 * 白名单参考：https://github.com/iflytek/skillhub/blob/main/docs/07-skill-protocol.md
 */
import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, '.skillhub-publish');

const ALLOWED = new Set([
  '.md', '.txt', '.json', '.yaml', '.yml',
  '.js', '.cjs', '.mjs', '.ts', '.py', '.sh',
  '.png', '.jpg', '.jpeg', '.svg', '.gif',
]);

const SKIP_DIRS = new Set(['.git', '.skillhub-publish', 'node_modules', 'scripts']);

function shouldCopy(relPath, name) {
  if (SKIP_DIRS.has(name)) return false;
  const ext = extname(name).toLowerCase();
  return ALLOWED.has(ext);
}

function walkCopy(src, dest) {
  for (const name of readdirSync(src)) {
    const srcPath = join(src, name);
    const rel = relative(root, srcPath);
    if (name.startsWith('.') && name !== '.') continue;
    const st = statSync(srcPath);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walkCopy(srcPath, join(dest, name));
    } else if (shouldCopy(rel, name)) {
      mkdirSync(dirname(join(dest, name)), { recursive: true });
      cpSync(srcPath, join(dest, name));
    }
  }
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
walkCopy(root, outDir);

console.log(`OK: 发布目录已生成 → ${outDir}`);
