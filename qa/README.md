# qa/

Manual QA for the **NativeScript Snippets** extension. Organized into checklists (what to test)
and a fixture workspace (files to test with), plus a standalone demo sandbox.

This extension is **declarative** — it ships only `package.json` + the snippet JSON under
`../snippets/`. There is no activation code, no commands, no settings, no drag-and-drop. So a QA
pass is always the same gesture: open a file of a contributed language, type an `ns-*` prefix,
accept the completion, and verify the inserted body + tab stops.

> This whole directory is **dev-only** — `.vscodeignore` excludes `qa/**`, so nothing here ships
> in the published `.vsix`. Structural integrity of the generated JSON is gated separately by
> `../tools/validate.js`; these checklists cover the **behavioral** half that needs a human in
> the Extension Development Host.

## Layout

```
qa/
├── checklists/          Test checklists — one per flavor + one cross-flavor
│   ├── general.md       Cross-flavor: prefix grammar, variant model, tab-stops, scoping (run first)
│   ├── angular.md       html  — two-way [(x)], gestures, icons, ActionBar extras
│   ├── core.md          xml   — bare events, gestures, icons, no two-way
│   ├── vue.md           vue   — @event, no icons, SplitView/Repeater excluded
│   ├── react.md         tsx/jsx — lowercase tags, onEvent, no icons, more exclusions
│   └── svelte.md        svelte — lowercase tags, on:event, bind:x two-way
├── workspace/           Fixture workspace — open in the EDH via File > Open Folder
│   ├── general/         Scratch files (one per language) + negatives for general.md
│   ├── angular/         Fixtures for angular.md
│   ├── core/            Fixtures for core.md
│   ├── vue/             Fixtures for vue.md
│   ├── react/           Fixtures for react.md
│   └── svelte/          Fixtures for svelte.md
└── demo-workspace/      Standalone realistic NativeScript sandbox (one component per flavor)
```

## How to run a QA pass

1. Launch the Extension Development Host (**F5** from the project root → the "Extension"
   launch config).
2. In the EDH, **File > Open Folder** and select the `qa/workspace/` directory.
3. Run [`checklists/general.md`](checklists/general.md) first — it covers flavor-neutral behavior.
4. Run each per-flavor checklist (e.g. [`checklists/angular.md`](checklists/angular.md)). Each
   tests only that flavor's delta and assumes `general.md` passed.

For Vue and Svelte, install the **Vue (Volar)** and **Svelte** language extensions in the EDH
first — without them VS Code has no `vue`/`svelte` language for the snippets to attach to.

## Current inventory

| Checklist | Workspace | Cases | Snippets in flavor | Scope |
|-----------|-----------|------:|-------------------:|-------|
| [`general.md`](checklists/general.md) | [`general/`](workspace/general/) | 29 | — | Prefix grammar, variants, tab-stops, IntelliSense, **language scoping**, tag-case |
| [`angular.md`](checklists/angular.md) | [`angular/`](workspace/angular/) | 46 | 182 | `html` — two-way `[(x)]`, gestures, icons, `NavigationButton`/`ActionBarExtension`/`SplitView` |
| [`core.md`](checklists/core.md) | [`core/`](workspace/core/) | 38 | 179 | `xml` — bare events, gestures, icons; no two-way; `ActionBarExtension` absent |
| [`vue.md`](checklists/vue.md) | [`vue/`](workspace/vue/) | 31 | 149 | `vue` — `@event`, no icons; `SplitView`/`Repeater` excluded |
| [`react.md`](checklists/react.md) | [`react/`](workspace/react/) | 29 | 143 | `tsx`/`jsx` — lowercase tags, `onEvent`, no icons; `SplitView`/`RootLayout`/`Repeater` excluded |
| [`svelte.md`](checklists/svelte.md) | [`svelte/`](workspace/svelte/) | 33 | 152 | `svelte` — lowercase tags, `on:event`, two-way `bind:x`; `SplitView` excluded |

**206 cases** across six checklists, covering **805 snippets** across five flavors.

## Demo workspace

[`demo-workspace/`](demo-workspace/) is a standalone NativeScript flavor sandbox — one folder per
flavor (`angular/`, `core/`, `vue/`, `react/`, `svelte/`), the same flavor layout as `workspace/`.
It is **separate** from the checklist↔workspace model above and referenced by no checklist: use it
to feel the snippets in context (markup that already has structure around it) rather than for
systematic verification. There is nothing to install — snippets are declarative and expand purely
from the prefix + the file's language id, regardless of any project setup.
