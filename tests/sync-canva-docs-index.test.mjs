import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildCatalog, synchronize, fetchIndexes } from '../scripts/sync-canva-docs-index.mjs';

const sample = {
  apps: '# Apps\n- [Quickstart](https://www.canva.dev/docs/apps/quickstart.md)\n- [Intro](https://www.canva.dev/docs/apps/getting-started/)\n- [External](https://community.canva.dev/latest)',
  admin: '# Admin\n- [Create group](https://www.canva.dev/docs/admin/api-reference/groups/create-group.md)\n- [Apps quickstart](https://www.canva.dev/docs/apps/quickstart.md)'
};
const fixtureRoot = () => fs.mkdtempSync(path.join(os.tmpdir(), 'canva-index-test-'));

test('maps official Markdown paths and tracks distinct sources', () => {
  const result = buildCatalog(sample);
  assert.deepEqual(result.pages.map(x => x.path), [
    'docs/canva/admin/api-reference/groups/create-group.md',
    'docs/canva/apps/getting-started.md',
    'docs/canva/apps/quickstart.md'
  ]);
  assert.equal(result.external.length, 1);
  assert.deepEqual([...result.pages[2].sources].sort(), ['admin', 'apps']);
});

test('never maps untrusted domains or unsafe encoded paths', () => {
  const result = buildCatalog({
    apps: '# Docs\n- [Bad](https://evil.example/docs/apps/security.md)\n- [Traversal](https://www.canva.dev/docs/apps/%2fetc.md)',
    admin: '# Admin'
  });
  assert.equal(result.pages.length, 0);
  assert.equal(result.external.length, 2);
});

test('rejects implausibly small indexes before any write', () => {
  const root = fixtureRoot();
  try {
    const target = path.join(root, 'docs/canva/apps/quickstart.md');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, '# Custom documentation\n');
    assert.throws(() => synchronize(root, sample), /Unexpected documentation page count/);
    assert.equal(fs.readFileSync(target, 'utf8'), '# Custom documentation\n');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('rejects failed requests and malformed remote indexes', async () => {
  await assert.rejects(fetchIndexes(async () => ({ ok: false, status: 503 })), /HTTP 503/);
  await assert.rejects(fetchIndexes(async () => ({ ok: true, text: async () => '<html>error</html>' })), /unexpected index format/);
});

test('creates only missing placeholders; repeated runs are stable; retired files remain', () => {
  const root = fixtureRoot();
  const indexed = {
    apps: '# Apps\n' + Array.from({ length: 205 }, (_, i) => '- [Page ' + i + '](https://www.canva.dev/docs/apps/reference/page-' + i + '.md)').join('\n'),
    admin: '# Admin\n' + Array.from({ length: 25 }, (_, i) => '- [Admin ' + i + '](https://www.canva.dev/docs/admin/reference/item-' + i + '.md)').join('\n')
  };
  try {
    const custom = path.join(root, 'docs/canva/apps/reference/page-0.md');
    fs.mkdirSync(path.dirname(custom), { recursive: true });
    fs.writeFileSync(custom, '# Hand-edited file\n');
    const first = synchronize(root, indexed);
    assert.equal(first.mapped, 230);
    assert.equal(first.created, 229);
    assert.equal(fs.readFileSync(custom, 'utf8'), '# Hand-edited file\n');
    const manifest = path.join(root, 'docs/canva/canva-url-manifest.json');
    const before = fs.readFileSync(manifest, 'utf8');
    assert.equal(synchronize(root, indexed).created, 0);
    assert.equal(fs.readFileSync(manifest, 'utf8'), before);
    assert.equal(JSON.parse(before).pages.find(p => p.path.endsWith('page-0.md')).status, 'preserved-existing');
    const fewer = { ...indexed, apps: indexed.apps.replace('- [Page 2](https://www.canva.dev/docs/apps/reference/page-2.md)\n', '') };
    const after = synchronize(root, fewer);
    assert.equal(after.withdrawn.length, 1);
    assert.ok(fs.existsSync(path.join(root, 'docs/canva/apps/reference/page-2.md')));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
