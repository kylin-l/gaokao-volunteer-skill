#!/usr/bin/env node
/**
 * 从 CHANGELOG.md 读取当前 SKILL.md version 对应的变更说明，供 skillhub publish --changelog 使用。
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skill = readFileSync(join(root, 'SKILL.md'), 'utf8');
const versionMatch = skill.match(/^version:\s*(\S+)/m);
if (!versionMatch) {
  console.error('FAIL: SKILL.md 缺少 version');
  process.exit(1);
}
const version = versionMatch[1];

const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8');
const sectionRe = new RegExp(`##\\s+${version.replace(/\./g, '\\.')}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`);
const section = changelog.match(sectionRe);
if (!section) {
  console.error(`FAIL: CHANGELOG.md 缺少 v${version} 条目，发布前请补充`);
  process.exit(1);
}

const lines = section[1]
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.startsWith('-'))
  .map((l) => l.replace(/^-\s*/, ''));

if (lines.length === 0) {
  console.error(`FAIL: CHANGELOG.md v${version} 无有效条目`);
  process.exit(1);
}

process.stdout.write(`v${version}：${lines.join('；')}`);
