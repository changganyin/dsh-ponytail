# dsh-ponytail

Standalone fixed canonical Ponytail `full` policy for [DeepSeek Harness](https://github.com/deepseek-harness/deepseek-harness).

## Install

Install from GitHub into DSH's `web` profile:

```sh
dsh plugin --profile web add github:changganyin/dsh-ponytail
```

Verify bundle layer:

```sh
dsh --profile web --dump-config
```

`dsh-ponytail` adds `policy:ponytail` to every assembled DSH system prompt. Restart or remount DSH after installation.

## Remove

```sh
dsh plugin --profile web remove dsh-ponytail
```

## Compatibility

Validated: DeepSeek Harness `0.1.0-rc.6`. Validate against later releases before publishing.

## Scope

This version only adds the static `policy:ponytail` policy text to DSH's assembled system prompt. It changes no model loop, tools, commands, subagents, UI, session state, or provider traffic; behavior depends on the model following that prompt.

Policy text is complete, pinned canonical Ponytail `full` behavior, including its persistence wording, ladder, rules, output discipline, safety guidance, and full-only intensity example.

Package is standalone: no Ponytail package, source checkout, release, or runtime dependency is required. DSH integration remains fixed `full`: it implements no mode switching, off command, UI/status, review mode, or skills command. Canonical references to switching or stopping Ponytail remain policy text, not DSH controls.
