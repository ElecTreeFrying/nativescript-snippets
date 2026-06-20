# Specification — NativeScript Snippets

The formal specification of the snippet system: the prefix grammar, the variant model, the per-flavor transforms, and the generation pipeline that produces every shipped artifact. For usage see the [README](README.md); for help and contribution steps see [SUPPORT.md](SUPPORT.md); for the exhaustive prefix catalog see the generated [reference.md](reference.md).

## Table of Contents

- [1. Overview](#1-overview)
- [2. Scope & non-goals](#2-scope--non-goals)
- [3. Prefix grammar](#3-prefix-grammar)
- [4. Variant model](#4-variant-model)
- [5. Flavor model](#5-flavor-model)
- [6. Property & event model](#6-property--event-model)
- [7. The neutral model](#7-the-neutral-model)
- [8. Generation pipeline](#8-generation-pipeline)
- [9. Doc-sync contract](#9-doc-sync-contract)
- [10. Validation rules](#10-validation-rules)
- [11. Manifest & file layout](#11-manifest--file-layout)
- [12. Tab-stop semantics](#12-tab-stop-semantics)
- [13. Compatibility & versioning](#13-compatibility--versioning)

---

## 1. Overview

This extension contributes VS Code snippets for NativeScript UI to five framework flavors. It has **no runtime code** — the shipped artifact is `package.json` plus the snippet JSON under `snippets/`. All snippet content and documentation is **generated** at build time from `@nativescript/core` TypeScript types by the pipeline under `tools/`; the JSON files are build artifacts, not source.

The system's two invariants:

1. **One model, many flavors.** A single neutral model of NativeScript elements is rendered into five flavor-specific snippet sets, so a given element stays consistent across Angular, Core, Vue, React, and Svelte.
2. **Docs are generated from the same model**, so the prefix catalog and counts cannot drift from the snippet JSON.

## 2. Scope & non-goals

**In scope:** UI components, layout containers, gesture event bindings, and iOS `ActionItem` system-icon values that exist in `@nativescript/core` v9, plus a few real elements with no type representation in core — such as `NavigationButton`, the Angular-only `ActionBarExtension`, and the iOS Liquid Glass containers `LiquidGlass`/`LiquidGlassContainer` — carried as hand-authored extras (`tools/extra-components.json`).

**Non-goals:** plugin-package components (e.g. the modern tab-navigation family `Tabs`/`BottomNavigation`/`TabStrip`, which live outside `@nativescript/core` v9), CSS/styling snippets, code-behind/TypeScript scaffolding, and any runtime behavior. The extension never executes code.

## 3. Prefix grammar

Every prefix begins with `ns-`; the `<element>` segment is lower-kebab, while gesture and icon names keep their camelCase source spelling (e.g. `ns-doubleTap`, `ns-icon-flexibleSpace`):

```
ns-<element>                 bare element             e.g. ns-button, ns-stack-layout
ns-<element>-prop            element + properties     e.g. ns-button-prop
ns-<element>-comp            element + props + events + docs   e.g. ns-button-comp
ns-<layout>-snippet-<N>      ready-made example layout (layouts only)   e.g. ns-dock-layout-snippet-2
ns-<gesture>                 gesture binding fragment  e.g. ns-tap, ns-swipe
ns-icon-<name>               iOS systemIcon value (Angular + Core)   e.g. ns-icon-stop
```

`<element>` is the kebab-cased class name (`Button` → `button`, `StackLayout` → `stack-layout`). Prefixes are identical across flavors; VS Code scopes them by language so each appears only in its file types.

## 4. Variant model

| Variant | Body |
|---|---|
| **bare** | The opening/closing tag with the final cursor inside (components) or on its own indented line (layouts). |
| **`-prop`** | The tag with each **primary** property emitted as a numbered tab-stop `name="${n:hint}"`, closing with `$0`. |
| **`-comp`** | Everything in `-prop` plus each event as a tab-stop, followed by a trailing doc comment that lists every property (with type and short description) and event, and a count of the inherited `View` properties/events the element also accepts. |
| **`-snippet-N`** | *(layouts only)* A complete, ready-made example layout carried as curated markup. |
| **gesture** | A single attribute fragment in the flavor's event syntax (e.g. `(tap)="$0"`). |
| **icon** | A bare numeric value (the `ios.systemIcon` enum index), referenced from an `ActionItem`. |

## 5. Flavor model

Each flavor defines a tag-case rule, property syntax, event syntax, and whether it receives icon snippets. These live in the `FLAVORS` table in `tools/render.js`.

| Flavor | Language id(s) | Tag case | Property | Event | Two-way | Icons |
|---|---|---|---|---|---|---|
| Angular | `html` | PascalCase | `name="…"` | `(event)="…"` | `[(name)]="…"` | yes |
| Core | `xml` | PascalCase | `name="…"` | `event="…"` | — | yes |
| Vue | `vue` | PascalCase | `name="…"` | `@event="…"` | — | no |
| React | `typescriptreact`, `javascriptreact` | camelCase initial | `name="…"` | `onEvent={…}` | — | no |
| Svelte | `svelte` | camelCase initial | `name="…"` | `on:event={…}` | `bind:name={…}` | no |

Vue and Svelte require their respective language extensions (Volar / Svelte) to register the `vue`/`svelte` languages; without them the snippets are dormant.

Svelte's gesture file is additionally contributed to the `svelte-start-tag` language so its `on:gesture={…}` fragments expand **inside** an element's opening tag — the region the Svelte grammar scopes as its own language id — not only in the markup between elements. See §11.

**Per-flavor element registries.** Not every element is registered in every framework's element set. The renderer skips an element for a flavor rather than emit a tag that framework won't render, so per-flavor snippet counts differ. The authoritative per-flavor totals are published in `reference.md` and the README's Snippets section.

## 6. Property & event model

- **Primary vs. inherited.** Each element's *primary* properties/events are the ones it introduces along its class/`Base` chain, stopping at `View`. The ~100+ universal `View` properties (id, class, width, height, margin, backgroundColor, visibility, …) and the dozen `View` events (loaded, unloaded, layoutChanged, …) are **not** expanded inline; the `-comp` doc comment states how many there are. They are documented once, centrally, in `reference.md`.
- **Type hints.** A property's tab-stop placeholder is a readable hint derived from its type: primitives stay as `string`/`number`/`boolean`; string-literal unions expand to `(a|b|c)`; oversized or noisy unions are trimmed and CSS-wide keywords (`initial`/`inherit`/`unset`/`revert`/`revert-layer`) dropped.
- **Two-way binding.** A property is two-way-capable when the element emits a matching change event. Angular's `[(prop)]` desugars to `[prop]`+`(propChange)`, so it requires an exact `<prop>Change`; Svelte's compiler-level `bind:` also accepts `<prop>Changed` (e.g. `SegmentedBar`/`TabView` `selectedIndex`, which therefore binds two-way in Svelte but not Angular). A small denylist excludes display-only props that emit a change event but aren't user-settable (currently `Progress.value`). In `-prop`, two-way props use the flavor's syntax (Angular `[(prop)]`, Svelte `bind:prop`); `-comp` shows the one-way property plus the explicit `(propChange)` event.
- **Event names** are taken from the static `<event>Event` member name (stripped of the `Event` suffix), which is the reliable source — the `@nsEvent` tag value is not.
- **Source URLs.** Every snippet's `description` ends with `Source: https://docs.nativescript.org/…` (the element's API page, the gestures guide, or the action-bar page for icons).

## 7. The neutral model

`tools/extract.js` emits `tools/ns-model.json`, the canonical model the renderers and doc generator build on (the renderers also read `tools/layout-examples.json` and `tools/extra-components.json`; `gen-docs.js` also reads `tools/render-manifest.json` and `tools/extra-components.json`):

```jsonc
{
  "coreVersion": "9.x.y",    // stamped from the installed @nativescript/core package.json (currently 9.0.20)
  "components": [
    {
      "tag": "Button",
      "kind": "component" | "layout",
      "base": "<superclass>",
      "desc": "…",
      "props":  [ { "name": "text", "type": "string", "desc": "…" }, … ],   // primary only
      "events": [ { "name": "tap", "desc": "…" }, … ],                       // primary only
      "inheritedPropCount":  <number>,   // universal View props folded away
      "inheritedEventCount": <number>
    },
    …
  ],
  "viewCommon": { "props": [ … ], "events": [ … ] }   // the universal View set, documented once
}
```

## 8. Generation pipeline

`npm run generate` runs five stages in order; each is independently re-runnable but the order matters (later stages read earlier outputs).

1. **`extract.js`** — loads `@nativescript/core` `.d.ts` via the TypeScript compiler API. It collects `@nsView`/`@nsProperty`/`@nsEvent` annotations **and** `Property`/`CssProperty` registrations (which carry most real markup props), folds in the implementation `<Name>Base` classes the public `.d.ts` flattens away, walks the inheritance chain for each element's full property set, classifies layouts vs. components, excludes abstract base classes, and writes `ns-model.json`. Dependencies are resolved by `resolveFrom()` from `node_modules`.
2. **`render.js`** — reads `ns-model.json` and renders, per flavor, the `components`, `layouts`, and `gestures` files (plus `settings-icon` for Angular and Core) under `snippets/<flavor>/`. It applies the `FLAVORS` transforms, the variant builders, the curated gesture/icon/example-layout tables, the hand-authored extra elements (`tools/extra-components.json` — e.g. `NavigationButton`, `ActionBarExtension`, `LiquidGlass`, `LiquidGlassContainer`), the per-flavor element registries, enum-hint expansion, and two-way-binding shapes. It also writes `tools/render-manifest.json` (per-flavor counts; gitignored).
3. **`gen-docs.js`** — reads the model, the manifest, and `extra-components.json`, then regenerates `reference.md` (wholesale) and the README `## Snippets` section (in place). See [§9](#9-doc-sync-contract).
4. **`validate.js`** — structural integrity gate over the generated JSON (see [§10](#10-validation-rules)); exits non-zero on any failure.
5. **`check-coverage.js`** — fidelity gate (also runnable alone via `npm run check`): cross-checks the rendered snippets against `ns-model.json` + `extra-components.json` — every primary property/event present, the right two-way shape per flavor, accurate inherited `View` counts, and no orphan or missing variant; exits non-zero on any mismatch.

`validate.js` (structural) and `check-coverage.js` (fidelity) are the two deterministic gates guarding the pipeline. The entire `tools/` tree is **gitignored / local-only** — not committed or distributed — so a fresh clone has the shipped `snippets/` and the generated `reference.md`, but not the generator; regenerating requires the local tooling.

## 9. Doc-sync contract

The following are **generated** and must never be hand-edited — the next `npm run generate` overwrites them:

- **`snippets/**/*.json`** — rewritten wholesale by `render.js`.
- **`reference.md`** — rewritten wholesale by `gen-docs.js`.
- **README `## Snippets` section** — `gen-docs.js` replaces everything between the `## Snippets` heading and the next `## ` heading. Editors must keep that heading and a following `## ` heading; the block between is generator-owned.

Everything else (the rest of `README.md`, this `SPEC.md`, `SUPPORT.md`, `CLAUDE.md`, `CHANGELOG.md`, `LICENSE.md`) is hand-maintained.

## 10. Validation rules

`validate.js` fails (exit 1) on any of:

- invalid JSON in a snippet file;
- an entry missing a `prefix`;
- duplicate `prefix` within a flavor;
- a `-prop`/`-comp` body with no final `$0` tab-stop;
- more than one final `$0` in a body;
- a repeated tab-stop index (`${n}` used twice) within one body;
- a tab-stop index gap (e.g. `${1}` then `${3}` with no `${2}`);
- a placeholder default `${n:…}` containing `{`, `}`, `<`, `>`, or `$` (breaks VS Code parsing or injects stray tags), including object-literal defaults;
- a `description` missing a `Source: https?://…` URL.

It runs in `generate` immediately before the fidelity gate `check-coverage.js` (see [§8](#8-generation-pipeline)), and standalone via `npm run validate`, so it doubles as a pre-commit gate.

## 11. Manifest & file layout

`package.json` `contributes.snippets` maps each generated file to its language(s):

```
snippets/angular/{components,layouts,gestures,settings-icon}.json   → html
snippets/core/{components,layouts,gestures,settings-icon}.json      → xml
snippets/vue/{components,layouts,gestures}.json                     → vue
snippets/react/{components,layouts,gestures}.json                   → typescriptreact, javascriptreact
snippets/svelte/{components,layouts,gestures}.json                  → svelte
```

Only Angular and Core ship `settings-icon.json` (iOS icons are an `ActionItem` concern most relevant to those templates). React maps each file to both `typescriptreact` and `javascriptreact`.

Svelte's `gestures.json` is mapped to **two** languages — `svelte` (the markup between elements) **and** `svelte-start-tag` (the region *inside* an element's opening tag, which the Svelte grammar scopes as its own language). This is what lets gesture fragments like `on:tap={…}` expand inside a tag, not only between elements. No other flavor needs it: Vue's `<template>` exposes no separate in-tag language to target, so the Vue equivalent stays a documented limitation (`SUPPORT.md`) rather than a fix.

## 12. Tab-stop semantics

Bodies use VS Code snippet syntax. Placeholders are numbered **sequentially** (`${1:…}`, `${2:…}`, …) with a final `$0` marking the exit cursor — never mirrored/duplicated indices (a past bug, now guarded by validation). Pressing <kbd>Tab</kbd> advances through each property/event in document order; <kbd>Esc</kbd> or typing past the last stop lands on `$0`.

## 13. Compatibility & versioning

- **Engine:** VS Code `^1.30.0` (and compatible forks — Cursor, VSCodium, Code Server).
- **NativeScript:** snippets are generated from `@nativescript/core` v9 types; the exact patch version is stamped into `reference.md` and the README.
- **Versioning** follows the Marketplace release flow — `vsce` owns the version bump; releases are recorded in `CHANGELOG.md`.
