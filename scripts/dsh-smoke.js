import assert from 'node:assert/strict';
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const home = mkdtempSync(join(tmpdir(), 'dsh-ponytail-'));
const dsh = process.env.DSH_BIN ?? 'dsh';
const dshPath = process.env.DSH_BIN ?? spawnSync('which', [dsh], { encoding: 'utf8' }).stdout.trim();
assert.notEqual(dshPath, '', `cannot resolve ${dsh}`);
const env = {
  ...process.env,
  DSH_HOME: home,
  DSH_INSTALL_ANCHOR: join(realpathSync(dshPath), '..', '..', 'package.json'),
};

function run(args, options = {}) {
  const result = spawnSync(dsh, args, { encoding: 'utf8', env, ...options });
  assert.equal(result.status, 0, `${dsh} ${args.join(' ')}\n${result.stderr}`);
  return result.stdout;
}

try {
  run(['plugin', '--profile', 'smoke', 'add', resolve('.')]);
  assert.match(run(['--profile', 'smoke', '--dump-config']), /id: ponytail/);

  const profile = join(home, 'profiles', 'smoke');
  const probe = `
    import assert from 'node:assert/strict';
    import { writeFileSync } from 'node:fs';
    import { pathToFileURL } from 'node:url';
    import { join } from 'node:path';
    const anchor = process.env.DSH_INSTALL_ANCHOR;
    const { boot, loadProfile } = await import('@deepseek-ai/dsh-app-boot');
    const profile = loadProfile('smoke', 'smoke', anchor, process.env.DSH_HOME);
    writeFileSync(join(profile.dir, 'cordis.yml'), '[]\\n');
    const ctx = await boot('smoke', join(profile.dir, 'cordis.yml'), profile.layers.flatMap(layer => layer.patches));
    try {
      const { FULL_INSTRUCTIONS } = await import(pathToFileURL(join(profile.dir, 'node_modules', 'dsh-ponytail', 'instructions.js')).href);
      const section = (await ctx.systemPrompt.assemble()).sections.find(item => item.name === 'policy:ponytail');
      assert.equal(section?.text, FULL_INSTRUCTIONS);
    } finally {
      await ctx.fiber.dispose();
    }
  `;
  writeFileSync(join(profile, 'probe.mjs'), probe);
  const result = spawnSync(process.execPath, ['probe.mjs'], { cwd: profile, encoding: 'utf8', env });
  assert.equal(result.status, 0, result.stderr);
} finally {
  rmSync(home, { recursive: true, force: true });
}
