# dsh-ponytail

Standalone [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Cordis bundle. Current version adds static Ponytail `full` policy text to DSH's system prompt.

## Install

Install from GitHub into DSH's `web` profile:

```sh
dsh plugin --profile web add github:changganyin/dsh-ponytail
```

## Verify

```sh
dsh --profile web --dump-config
```

The output includes `id: ponytail`.

## Remove

```sh
dsh plugin --profile web remove dsh-ponytail
```

## Scope

This version only adds `policy:ponytail` to DSH's assembled system prompt. It changes no model loop, tools, commands, subagents, UI, session state, or provider traffic; behavior depends on the model following that prompt.

It does not implement Ponytail mode switching, `off` command, UI/status, review mode, or skills commands. References to switching or stopping Ponytail remain policy text, not DSH controls.

## Configuration

No configuration. The bundle always adds the pinned canonical Ponytail `full` policy, including its persistence wording, ladder, rules, output discipline, safety guidance, and full-only intensity example.

## Compatibility

Validated: DeepSeek Harness `0.1.0-rc.6`. Validate against later releases before publishing.

## Development

```sh
npm test
npm run smoke
npm pack --dry-run
```

## License

MIT
