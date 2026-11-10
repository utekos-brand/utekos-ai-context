import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function lookup(...args) {
  return spawnSync(process.execPath, [path.join(repo, 'scripts/canva-docs-read.mjs'), ...args], { encoding: 'utf8', cwd: repo });
}

test('resolves normal Canva Markdown page using manifest without making network requests', () => {
  const r = lookup('apps/quickstart', '--source-only');
  assert.equal(r.status, 0);
  assert.equal(r.stdout.trim(), 'https://www.canva.dev/docs/apps/quickstart.md');
});
test('resolves both officially verified non-Markdown index aliases', () => {
  assert.equal(lookup('apps/canva-concepts', '--source-only').stdout.trim(), 'https://www.canva.dev/docs/apps/canva-concepts.md');
  assert.equal(lookup('scim/index.md', '--source-only').stdout.trim(), 'https://www.canva.dev/docs/scim.md');
});
test('preserves interactive Storybook official page URL for source-only', () => {
  const r = lookup('apps/app-ui-kit/storybook', '--source-only');
  assert.equal(r.status, 0);
  assert.equal(r.stdout.trim(), 'https://www.canva.dev/docs/apps/app-ui-kit/storybook/');
});
test('does not allow unknown paths or traversal', () => {
  const a = lookup('../private', '--source-only');
  assert.notEqual(a.status, 0);
  const b = lookup('apps/not-present', '--source-only');
  assert.notEqual(b.status, 0);
});
test('lists the entire existing Canva documentation index', () => {
  const r = lookup('--list');
  assert.equal(r.status, 0);
  assert.equal(r.stdout.trim().split('\n').length, 550);
});
