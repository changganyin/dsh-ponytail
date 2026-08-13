import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { FULL_INSTRUCTIONS } from '../instructions.js';
import { apply, inject, name } from '../index.js';

test('declares dependency-free DSH bundle metadata', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
  const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8');

  assert.equal(pkg.dependencies, undefined);
  assert.deepEqual(pkg.dsh, { bundle: { patch: './cordis.patch.yml' } });
  assert.ok(pkg.files.includes('instructions.js'));
  assert.match(patch, /id: ponytail/);
  assert.match(patch, /name: dsh-ponytail/);
});

test('registers fixed full Ponytail-inspired guidance', () => {
  const sections = [];
  apply({ systemPrompt: { section: section => sections.push(section) } });

  assert.equal(name, 'dsh-ponytail');
  assert.deepEqual(inject, ['systemPrompt']);
  assert.deepEqual(sections, [{
    name: 'policy:ponytail',
    order: 10,
    text: FULL_INSTRUCTIONS,
  }]);
  assert.match(FULL_INSTRUCTIONS, /YAGNI/);
  assert.match(FULL_INSTRUCTIONS, /security/);
});
