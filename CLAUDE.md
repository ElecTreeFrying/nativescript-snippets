# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commit conventions

Do NOT append a `Co-Authored-By: Claude …` trailer (or any other AI attribution) to commit messages. Write commits as if authored solely by the user. Style is loose conventional-commits (`fix:`, `chore:`, `add:`) plus bare version-number commits (e.g. `0.2.0`) that mark a release alongside the `CHANGELOG.md` entry. Don't bake `version` bumps into your work — `vsce publish` owns versioning.

## What this is

A **generated, multi-flavor VS Code snippets extension** for NativeScript. It ships **no runtime/activation code** (no `extension.ts`, no `main`, no `activationEvents`) — the published artifact is `package.json` + the snippet JSON under `snippets/`. But it is **not** hand-authored: every snippet is derived from `@nativescript/core` v9 TypeScript types by a build-time generator under `tools/`. There is a build step (the generator) even though there is no runtime. The `tools/` generator is **local-only (gitignored)** — not committed or distributed, so a fresh clone has the shipped `snippets/` + docs but not the build tooling.

The same `ns-*` prefixes are contributed to five flavors, each scoped to its language(s) via `contributes.snippets`:

| Flavor | Language id(s) | Icons? |
|---|---|---|
| Angular | `html` | yes |
| Core | `xml` | yes |
| Vue | `vue` | no |
| React | `typescriptreact`, `javascriptreact` | no |
| Svelte | `svelte` | no |

## Commands

```bash
npm run generate   # full pipeline: extract → render → gen-docs → validate → check-coverage
npm run validate   # structural integrity checks on the generated snippet JSON only
npm run check      # fidelity: generated snippets vs the model (every prop/event, counts, no orphans)
```

- **Test interactively:** press `F5` (`.vscode/launch.json` → "Extension") to open an Extension Development Host, then type a prefix in a file of the matching language and confirm the expansion.
- **Package / publish:** `npx @vscode/vsce package` (produces a gitignored `.vsix`) / `npx @vscode/vsce publish` (publisher `ElecTreeFrying`; needs a PAT). `vsce` is invoked directly — not wrapped in an npm script.

## Architecture — the generation pipeline

One neutral model, four stages plus a fidelity gate, data flowing left to right:

```
@nativescript/core .d.ts
        │  tools/extract.js   (TypeScript compiler API; @nsView/@nsProperty/@nsEvent + Property/CssProperty
        │                      registrations; walks the extends/Base chain for each element's full prop set)
        ▼
tools/ns-model.json          (neutral model: coreVersion, components[] {tag, kind, base, desc, props, events,
        │                      inheritedPropCount, inheritedEventCount}, viewCommon)
        │  tools/render.js    (one model → five flavor renderers; variants bare / -prop / -comp; gestures;
        │                      icons for Angular+Core; per-flavor element registries; two-way-binding shapes)
        ▼
snippets/<flavor>/*.json      +  tools/render-manifest.json (per-flavor counts; gitignored)
        │  tools/gen-docs.js  (model + manifest → docs)
        ▼
reference.md  +  README.md "## Snippets" section
        │  tools/validate.js  (gate: valid JSON, unique prefixes, $0 in -prop/-comp, no repeated tab-stops,
        │                      Source: URL present) — exit 1 on any failure
        │  tools/check-coverage.js  (fidelity gate: snippets vs ns-model.json + extra-components.json —
        ▼                            every prop/event, two-way shape, inherited counts, no orphans) — exit 1
```

**Source of truth:** the `@nativescript/core` types (for components/layouts), plus hand-authored data with no type representation — the `GESTURES`/`ICONS` tables in `render.js` (8 gestures, 24 iOS icons), `tools/layout-examples.json` (the ready-made `ns-<layout>-snippet-N` demos), and `tools/extra-components.json` (real non-`@nsView` elements like `NavigationButton`/`ActionBarExtension`; also read by `gen-docs.js`). The shipped `snippets/**/*.json` are **build artifacts**, not source.

## The generator contract (read before touching docs or snippets)

These are silently overwritten on the next `npm run generate`:

- **`snippets/**/*.json`** — regenerated wholesale by `render.js`. Hand-editing a snippet is futile. To change a snippet, edit the generator or its curated data, then regenerate.
- **`reference.md`** — regenerated wholesale by `gen-docs.js`. Never hand-edit; the file header says so.
- **README `## Snippets` section** — `gen-docs.js` rewrites everything between the `## Snippets` heading and the **next `## ` heading** in place. When editing the README, keep that heading and ensure a following `## ` heading exists, and treat the block between them as generator-owned.

The rest of the README, plus `SPEC.md`, `SUPPORT.md`, `CLAUDE.md`, `CHANGELOG.md`, and `LICENSE.md`, are hand-maintained.

## Prefix & variant grammar

All prefixes start with `ns-`. Per element:

- `ns-<name>` — the bare tag (e.g. `ns-button` → `<Button></Button>`; React/Svelte lowercase the first letter → `<button>`).
- `ns-<name>-prop` — every primary property as a `${n:hint}` tab-stop; enum types expand to `(a|b|c)` hints; two-way-capable props use the flavor's binding (Angular `[(x)]`, Svelte `bind:x`).
- `ns-<name>-comp` — properties + events + a trailing doc comment listing each, and a count of inherited `View` props/events.
- `ns-<layout>-snippet-N` — *(layouts only)* complete ready-made example layouts.
- `ns-<gesture>` — a gesture binding fragment (8 gestures).
- `ns-icon-<name>` — *(Angular + Core only)* the numeric `ios.systemIcon` value for an `ActionItem` (24 icons).

Per-flavor transforms live in the `FLAVORS` table in `render.js` (tag case, prop/event syntax, comment delimiters, which flavors get icons). A few elements are intentionally absent from some flavors' element registries (e.g. `SplitView` Angular/Core only) — that's why per-flavor snippet counts differ.

## Gotchas

- **Line endings:** `.gitattributes` enforces LF. Snippet JSON is LF, 2-space indent — preserve it; a CRLF re-save produces huge phantom diffs.
- **`tools/render-manifest.json` is generated and gitignored** — `gen-docs.js` reads it, so run `render.js` before `gen-docs.js` (the `generate` script already orders them).
- **`validate.js` gates the pipeline** (exit 1) — it's the last step of `generate` and also runnable alone via `npm run validate`.
- **Event names come from the static `<event>Event` member**, not the unreliable `@nsEvent` tag value (e.g. `blur`, not `blurEvent`).
- **`svelte-start-tag` dual-scoping (don't "clean up"):** `package.json` contributes `snippets/svelte/gestures.json` to **two** languages — `svelte` *and* `svelte-start-tag`. The Svelte grammar scopes the inside of an element's opening tag as a separate `svelte-start-tag` language, so without the second mapping the gesture snippets (`ns-tap` → `on:tap={…}`) only appear *between* elements, never inside `<button …>`. The duplicate-looking line is load-bearing — leave it. Vue has no equivalent in-tag language to target, so this is Svelte-only; the Vue limitation is documented in `SUPPORT.md` instead.

## Manual QA harness — `qa/`

There are no *automated* tests (see below), but `qa/` holds a **manual QA harness** for verifying the shipped snippets in the Extension Development Host (press `F5`). It is dev-only — excluded from the published `.vsix` via `.vscodeignore` (`qa/**`). Layout:

- **`qa/checklists/`** — one `[ ]` checklist per flavor (`angular`/`core`/`vue`/`react`/`svelte`) plus `general.md` (cross-flavor: prefix grammar, variant model, tab-stop semantics, **language scoping**). Run `general.md` first; per-flavor checklists test only that flavor's delta (tag case, event/two-way syntax, icons, excluded elements).
- **`qa/workspace/`** — fixture files to open as a folder in the EDH; one subdir per checklist (`general/` + the five flavors), each holding near-empty scratch files to type prefixes into. **Checklist ↔ workspace is 1:1; the checklist is the source of truth** — if a checklist references a fixture, that file must exist.
- **`qa/demo-workspace/`** — a standalone NativeScript flavor sandbox (one component per flavor, same flavor layout as `workspace/`; nothing to install — snippets are declarative) for trying snippets in context. Referenced by no checklist; the sync rules don't apply to it.

Each of `qa/`, `qa/checklists/`, `qa/workspace/`, and every `qa/workspace/<flavor>/` has its own `README.md` (human guide) + `CLAUDE.md` (edit/sync rules). When a checklist changes, propagate per `qa/CLAUDE.md`.

## What's intentionally absent

No `extension.ts`, no bundler, no test framework, no `@types/vscode` — it's a declarative snippets extension at ship time. The only "build" is the doc/snippet generator, which is a dev-time concern excluded from the published `.vsix` via `.vscodeignore`. Correctness is guarded by two deterministic gates — `tools/validate.js` (structural) and `tools/check-coverage.js` (fidelity: the generated snippets faithfully reflect the model) — plus the `qa/` manual checklists (behavioral, in the EDH).
