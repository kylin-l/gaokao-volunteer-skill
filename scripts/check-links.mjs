#!/usr/bin/env node
/**
 * 校验仓库内 Markdown 相对链接是否可解析到真实文件。
 * 跳过：外链、mailto、纯锚点、代码块内的链接。
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['.git', '.skillhub-publish', 'node_modules']);
const SCAN_EXTENSIONS = new Set(['.md', '.json']);

const LINK_RE = /!?\[[^\]]*\]\(([^)]+)\)/g;
const EXTERNAL_RE = /^(?:https?:|mailto:|tel:|ftp:|data:|javascript:)/i;

function walkFiles(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') && name !== '.') continue;
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walkFiles(abs, files);
    } else if (SCAN_EXTENSIONS.has(extname(name).toLowerCase())) {
      files.push(abs);
    }
  }
  return files;
}

function stripCodeBlocks(text) {
  return text.replace(/```[\s\S]*?```/g, '');
}

function extractTargets(text) {
  const plain = stripCodeBlocks(text);
  const targets = [];
  for (const match of plain.matchAll(LINK_RE)) {
    targets.push(match[1].trim());
  }
  return targets;
}

function resolveTarget(sourceFile, rawTarget) {
  let target = rawTarget.trim();
  if (!target || EXTERNAL_RE.test(target)) return null;

  // <path> 形式
  if (target.startsWith('<') && target.endsWith('>')) {
    target = target.slice(1, -1).trim();
    if (!target || EXTERNAL_RE.test(target)) return null;
  }

  const [pathPart] = target.split('#');
  if (!pathPart) return null;

  const decoded = decodeURIComponent(pathPart);
  const resolved = normalize(resolve(dirname(sourceFile), decoded));
  if (!resolved.startsWith(root)) {
    return { kind: 'outside-root', resolved };
  }
  return { kind: 'local', resolved, raw: pathPart };
}

function targetExists(info) {
  if (!info || info.kind === 'outside-root') return false;

  const { resolved } = info;
  if (existsSync(resolved)) {
    const st = statSync(resolved);
    if (st.isDirectory()) {
      return existsSync(join(resolved, 'README.md'));
    }
    return true;
  }

  // 目录链接可能省略 README.md
  if (existsSync(join(resolved, 'README.md'))) return true;

  return false;
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const plain = stripCodeBlocks(content);
  const issues = [];

  for (const match of plain.matchAll(LINK_RE)) {
    const rawTarget = match[1].trim();
    const info = resolveTarget(filePath, rawTarget);
    if (!info) continue;

    if (info.kind === 'outside-root') {
      issues.push({
        line: lineNumberAt(content, match.index ?? 0),
        target: rawTarget,
        reason: '链接解析到仓库外',
      });
      continue;
    }

    if (!targetExists(info)) {
      issues.push({
        line: lineNumberAt(content, match.index ?? 0),
        target: rawTarget,
        reason: '目标文件不存在',
        resolved: relative(root, info.resolved),
      });
    }
  }

  return issues;
}

const files = walkFiles(root);
const allIssues = [];

for (const file of files) {
  const issues = checkFile(file);
  for (const issue of issues) {
    allIssues.push({
      file: relative(root, file),
      ...issue,
    });
  }
}

if (allIssues.length === 0) {
  console.log(`OK: ${files.length} 个文件内相对链接均可解析`);
  process.exit(0);
}

console.error(`FAIL: 发现 ${allIssues.length} 个断链\n`);
for (const issue of allIssues) {
  const resolved = issue.resolved ? ` → ${issue.resolved}` : '';
  console.error(`  ${issue.file}:${issue.line}  [${issue.target}]  ${issue.reason}${resolved}`);
}
process.exit(1);
