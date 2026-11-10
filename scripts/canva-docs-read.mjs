#!/usr/bin/env node
/**
 * Read an official Canva Markdown documentation page by its known manifest path.
 * No local mirror or GitHub write. Run for individual pages when documentation is needed.
 * Node.js 24+; zero dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'docs/canva/canva-url-manifest.json');
const input = process.argv[2];
const sourceOnly = process.argv.includes('--source-only');
const listOnly = process.argv.includes('--list');

function resolveLocalPath(value) {
  if (!value || value.includes('..') || !/^[A-Za-z0-9_./-]+$/.test(value)) {
    throw new Error('Pass a documentation path, for example apps/quickstart or admin/api-reference/groups/create-group');
  }
  let result = value.replace(/^docs\/canva\//, '');
  if (!result.endsWith('.md')) result += '.md';
  return 'docs/canva/' + result;
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!Array.isArray(manifest.pages)) throw new Error('Invalid Canva documentation manifest');
  if (listOnly) {
    for (const entry of manifest.pages) process.stdout.write(entry.path + '\n');
    return;
  }
  const localPath = resolveLocalPath(input);
  const entry = manifest.pages.find(item => item.path === localPath);
  if (!entry) throw new Error('Unknown documented path: ' + localPath + '. Run with --list to see supported paths.');
  // These aliases are verified live against official Canva endpoints. The index lists HTML routes.
  const verifiedAliases = {
    'docs/canva/apps/canva-concepts.md': 'https://www.canva.dev/docs/apps/canva-concepts.md',
    'docs/canva/scim/index.md': 'https://www.canva.dev/docs/scim.md'
  };
  const url = entry.urls?.find(candidate => /^https:\/\/www\.canva\.dev\/docs\/[a-z0-9/_-]+\.md$/i.test(candidate)) || verifiedAliases[entry.path];
  if (sourceOnly) {
    process.stdout.write((url || entry.urls?.[0] || '') + '\n');
    return;
  }
  if (!url) {
    throw new Error('This page has no verified Markdown endpoint. Open the original Canva page instead: ' + entry.urls?.[0]);
  }
  const response = await fetch(url, {
    headers: { Accept: 'text/markdown, text/plain;q=0.9', 'User-Agent': 'utekos-ai-context-docs-reader/1.0' },
    signal: AbortSignal.timeout(30_000)
  });
  if (!response.ok) throw new Error('Canva documentation returned HTTP ' + response.status);
  const body = await response.text();
  if (!body.trimStart().match(/^(#|>)/) || body.length > 2_000_000) {
    throw new Error('Unexpected Canva Markdown response');
  }
  process.stdout.write(body);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
