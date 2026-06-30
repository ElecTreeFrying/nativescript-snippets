# qa/checklists/CLAUDE.md

Each file here is a manual QA checklist. Naming convention: `{flavor}.md` maps to
`workspace/{flavor}/` (plus `general.md` ↔ `workspace/general/`).

## What these test

A **declarative snippets extension** — no commands, settings, or drag-and-drop. Every `[ ]`
case is: type an `ns-*` prefix in a file of the right language, accept it, and check the
inserted body + tab stops. Keep cases to behaviors that need a human in the Extension
Development Host (IntelliSense surfacing, the exact expanded text, tab-stop order, language
scoping). Structural integrity of the JSON itself is already gated by `../../tools/validate.js`
— don't re-test that here.

## Files

| File | Scope |
|------|-------|
| `general.md` | Cross-flavor — prefix grammar, variant model (`bare`/`-prop`/`-comp`/`-snippet-N`), tab-stop semantics, IntelliSense trigger + `Source:` hover, and **language scoping** (an `ns-*` prefix appears only in its mapped language; absent in `.ts`/`.json`). Run first; per-flavor checklists assume it passed. |
| `angular.md` | `html` scope — PascalCase tags, `name="…"` props, `(event)="…"`, **two-way `[(x)]`** (e.g. Slider `[(value)]`), `(tap)="$0"` gestures, **icons** (`ns-icon-*`), extras `NavigationButton` + `ActionBarExtension` (Angular-only), `SplitView` present. |
| `core.md` | `xml` scope — PascalCase tags, `name="…"` props, bare `event="…"` (no parens), **no two-way**, `tap="$0"` gestures, **icons**, `NavigationButton` + `SplitView` present, `ActionBarExtension` absent. |
| `vue.md` | `vue` scope — PascalCase tags, `@event="…"`, no two-way, `@tap="$0"` gestures, **no icons**, `NavigationButton` present, `SplitView`/`Repeater` excluded. |
| `react.md` | `typescriptreact` + `javascriptreact` scope — **lowercase-first tags** (`<button>`), `onEvent={…}` (e.g. `onCheckedChange`), no two-way, `onTap={$0}` gestures, **no icons**, `NavigationButton` absent, `SplitView`/`RootLayout`/`Repeater` excluded. |
| `svelte.md` | `svelte` scope — **lowercase-first tags**, `on:event={…}`, **two-way `bind:x`** (covers both `Change`/`Changed`; e.g. `bind:selectedIndex`), `on:tap={$0}` gestures, **no icons**, `NavigationButton` present, `SplitView` excluded. |

## Rules

- **Checklist changes propagate.** When a checklist is added/removed/updated, update surrounding
  docs and the workspace. Full propagation list is in [`../CLAUDE.md`](../CLAUDE.md) under
  "Propagation rule."
- **Checklist → workspace sync.** When a checklist references a fixture file, that file must
  exist in `workspace/{flavor}/`. After editing a checklist, verify the workspace has every
  referenced path.
- **No general.md duplication.** Per-flavor checklists must not re-test flavor-neutral behavior
  that `general.md` owns (trigger mechanics, variant model, tab-stop semantics, scoping). If a
  behavior is flavor-neutral, it belongs in `general.md`.
- **Expansions are quoted from the generated JSON.** Every snippet body a checklist asserts must
  match `../../snippets/{flavor}/*.json` exactly. If snippets are regenerated, re-verify.
