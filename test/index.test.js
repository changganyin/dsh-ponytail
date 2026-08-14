import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { FULL_INSTRUCTIONS } from '../instructions.js';
import { apply, inject, name } from '../index.js';

const fullPolicyAnchors = [
  'ACTIVE EVERY RESPONSE.',
  'Off only: "stop ponytail" / "normal mode". Default: **full**.',
  'Switch: `/ponytail lite|full|ultra`.',
  '**Does this need to exist at all?** Speculative need = skip it, say so in one line. (YAGNI)',
  '**Already in this codebase?** A helper, util, type, or pattern that already lives here → reuse it.',
  '**Stdlib does it?** Use it.',
  '**Native platform feature covers it?** `<input type="date">` over a picker lib, CSS over JS, DB constraint over app code.',
  '**Already-installed dependency solves it?** Use it. Never add a new one for what a few lines can do.',
  '**Can it be one line?** One line.',
  '**Only then:** the minimum code that works.',
  'The ladder is a reflex, not a research project',
  '**Bug fix = root cause, not symptom.**',
  'grep every caller of the function you\'re about to touch.',
  'No unrequested abstractions:',
  'No boilerplate, no scaffolding "for later"',
  'Deletion over addition. Boring over clever',
  'Fewest files possible. Shortest working diff wins',
  'Complex request? Ship the lazy version and question it in the same response',
  'Two stdlib options, same size? Take the one that\'s correct on edge cases.',
  'with a `ponytail:` comment naming the ceiling and upgrade path',
  'Code first. Then at most three short lines: what was skipped, when to add it.',
  'No essays, no feature tours, no design notes.',
  'Pattern: `[code] → skipped: [X], add when [Y].`',
  '| **full** | The ladder enforced. Stdlib and native first. Shortest diff, shortest explanation. Default. |',
  '- full: "`@lru_cache(maxsize=1000)` on the fetch function. Skipped custom cache class, add when lru_cache measurably falls short."',
  'Never simplify away: input validation at trust boundaries, error handling\nthat prevents data loss, security measures, accessibility basics, anything\nexplicitly requested.',
  'Never lazy about understanding the problem.',
  'Leave the calibration knob',
  'Non-trivial logic (a branch, a\nloop, a parser, a money/security path) leaves ONE runnable check behind',
  'Trivial one-liners need no\ntest, YAGNI applies to tests too.',
  'Ponytail governs what you build, not how you talk',
  'The shortest path to done is the right path.',
];

test('declares dependency-free DSH bundle metadata', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
  const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8');

  assert.equal(pkg.dependencies, undefined);
  assert.deepEqual(pkg.dsh, { bundle: { patch: './cordis.patch.yml' } });
  assert.deepEqual(pkg.files, ['index.js', 'instructions.js', 'cordis.patch.yml', 'README.md']);
  assert.match(patch, /id: ponytail/);
  assert.match(patch, /name: dsh-ponytail/);
});

test('pins complete canonical Ponytail full policy', () => {
  for (const anchor of fullPolicyAnchors) assert.ok(FULL_INSTRUCTIONS.includes(anchor), `missing policy anchor: ${anchor}`);
  assert.doesNotMatch(FULL_INSTRUCTIONS, /\| \*\*(lite|ultra)\*\*/);
  assert.doesNotMatch(FULL_INSTRUCTIONS, /- (lite|ultra):/);
  assert.equal(
    createHash('sha256').update(FULL_INSTRUCTIONS).digest('hex'),
    'da4fb09cff2f6726691ce6591cebc38c95597d79da132e49c6fa2665c4e8a3ff',
  );
});

test('registers exact fixed full policy section', () => {
  const sections = [];
  apply({ systemPrompt: { section: section => sections.push(section) } });

  assert.equal(name, 'dsh-ponytail');
  assert.deepEqual(inject, ['systemPrompt']);
  assert.deepEqual(sections, [{
    name: 'policy:ponytail',
    order: 10,
    text: FULL_INSTRUCTIONS,
  }]);
});
