# dsh-ponytail

Standalone Ponytail-inspired `full`-mode guidance for [DeepSeek Harness](https://github.com/deepseek-harness/deepseek-harness).

## Install

Install published package:

```sh
dsh plugin --profile <profile> add dsh-ponytail
```

Install local checkout while developing:

```sh
dsh plugin --profile <profile> add /absolute/path/to/dsh-ponytail
```

Verify bundle layer:

```sh
dsh --profile <profile> --dump-config
```

`dsh-ponytail` adds `policy:ponytail` to DSH system prompt. Restart or remount DSH after installation.

## Remove

```sh
dsh plugin --profile <profile> remove dsh-ponytail
```

## Compatibility

Target: DeepSeek Harness `0.1.0-rc.5`. Validate against current DSH release before publishing.

## Scope

This package is standalone: no Ponytail package, source checkout, release, or runtime dependency is required. It supplies fixed `full` guidance only—no mode switch, commands, UI, or skills.
