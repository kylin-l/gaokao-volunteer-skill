#!/usr/bin/env node
/**
 * 本地校验 SKILL.md frontmatter，对齐 https://skillhub.cn/ai/release.md
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillPath = join(root, 'SKILL.md');
const content = readFileSync(skillPath, 'utf8');

const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!match) {
  console.error('FAIL: SKILL.md 缺少 frontmatter');
  process.exit(1);
}

const fm = {};
for (const line of match[1].split('\n')) {
  const m = line.match(/^([a-zA-Z]+):\s*(.*)$/);
  if (m) fm[m[1]] = m[2].trim();
}
// tags 多行简单检测
const hasTags = /^tags:\s*\n(?:\s+-\s+.+\n?)+/m.test(match[1]);

const required = ['slug', 'version', 'displayName'];
const semver = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/;
const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

let ok = true;
for (const key of required) {
  if (!fm[key]) {
    console.error(`FAIL: 缺少必填字段 ${key}`);
    ok = false;
  }
}
if (fm.slug && (fm.slug.length < 2 || fm.slug.length > 128 || !kebab.test(fm.slug))) {
  console.error(`FAIL: slug 非法（需 kebab-case，2-128 字符）: ${fm.slug}`);
  ok = false;
}
if (fm.version && !semver.test(fm.version)) {
  console.error(`FAIL: version 非合法 SemVer: ${fm.version}`);
  ok = false;
}

const recommended = ['summary', 'description', 'license', 'homepage'];
for (const key of recommended) {
  if (!fm[key]) console.warn(`WARN: 建议补充 ${key}`);
}
if (!hasTags) console.warn('WARN: 建议补充 tags');

if (fm.name && fm.slug && fm.name !== fm.slug) {
  console.warn(`WARN: name(${fm.name}) 与 slug(${fm.slug}) 不一致，Cursor 安装目录以 slug 为准`);
}

if (ok) {
  console.log('OK: SKILL.md frontmatter 通过 release.md 必填校验');
  console.log(`  slug=${fm.slug}  version=${fm.version}  displayName=${fm.displayName}`);
  process.exit(0);
}
process.exit(1);
