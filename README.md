# dsh-ponytail

Standalone Ponytail-inspired `full`-mode guidance for [DeepSeek Harness](https://github.com/deepseek-harness/deepseek-harness).

## Install

Install from GitHub into DSH's `web` profile:

```sh
dsh plugin --profile web add github:changganyin/dsh-ponytail
```

Verify bundle layer:

```sh
dsh --profile web --dump-config
```

`dsh-ponytail` adds `policy:ponytail` to DSH system prompt. Restart or remount DSH after installation.

## Remove

```sh
dsh plugin --profile web remove dsh-ponytail
```

## Compatibility

Target: DeepSeek Harness `0.1.0-rc.5`. Validate against current DSH release before publishing.

## Scope

This package is standalone: no Ponytail package, source checkout, release, or runtime dependency is required. It supplies fixed `full` guidance only—no mode switch, commands, UI, or skills.
