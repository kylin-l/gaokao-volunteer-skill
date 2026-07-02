#!/usr/bin/env node
/**
 * 校验 → 生成发布目录 → skillhub publish（自动附带 CHANGELOG 变更说明）
 */
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const host = process.env.SKILLHUB_HOST || 'https://api.skillhub.cn';
const dryRun = process.argv.includes('--dry-run');

function run(cmd, opts = {}) {
  execSync(cmd, { cwd: root, stdio: 'inherit', ...opts });
}

run('node scripts/validate-frontmatter.mjs && node scripts/check-links.mjs');
run('node scripts/prepare-publish.mjs');

const changelog = execSync('node scripts/read-changelog.mjs', { cwd: root, encoding: 'utf8' }).trim();
const dryFlag = dryRun ? ' --dry-run' : '';
const escaped = changelog.replace(/"/g, '\\"');

console.log(`\n变更说明: ${changelog}\n`);
run(`skillhub publish .skillhub-publish --host ${host} --changelog "${escaped}"${dryFlag}`);
