# qa/workspace/

Fixture workspace for manual QA. Open this folder as the workspace in the Extension Development
Host (F5) so the tester has every file the checklists need.

Organized by flavor — one directory per checklist. Each directory is self-contained with the
scratch files its checklist references. Scratch files are near-empty skeletons with a "type
here" marker: put the cursor there, type an `ns-*` prefix, and watch it expand.

## Setup

1. Launch the Extension Development Host (**F5** from the project root).
2. In the EDH, **File > Open Folder** and select this `workspace/` directory.
3. The Explorer shows one directory per flavor — open the one you're testing. For Vue/Svelte
   you also need the **Vue (Volar)** / **Svelte** language extensions installed, or VS Code has
   no `vue`/`svelte` language for the snippets to attach to.

## Tip: undo after each snippet

After accepting a snippet, press **Cmd+Z** (or **Ctrl+Z**) to remove it before the next case —
the scratch files are meant to stay near-empty.

## Flavors

| Directory | Checklist | Files | Scope |
|-----------|-----------|------:|-------|
| [`general/`](general/) | [`checklists/general.md`](../checklists/general.md) | 8 | Cross-flavor — one scratch file per contributed language (`html`/`xml`/`vue`/`tsx`/`jsx`/`svelte`) + two negative files (`negative.ts`, `negative.json`) proving language scoping |
| [`angular/`](angular/) | [`checklists/angular.md`](../checklists/angular.md) | 3 | `html` — variants, two-way `[(x)]`, gestures, icons, ActionBar extras |
| [`core/`](core/) | [`checklists/core.md`](../checklists/core.md) | 1 | `xml` — variants, bare events, gestures, icons (no two-way) |
| [`vue/`](vue/) | [`checklists/vue.md`](../checklists/vue.md) | 2 | `vue` — variants, `@event`, gestures, icon-absence, exclusions |
| [`react/`](react/) | [`checklists/react.md`](../checklists/react.md) | 2 | `typescriptreact` + `javascriptreact` — lowercase tags, `onEvent`, gestures, exclusions (`Home.tsx` + `Home.jsx`) |
| [`svelte/`](svelte/) | [`checklists/svelte.md`](../checklists/svelte.md) | 2 | `svelte` — lowercase tags, `on:event`, two-way `bind:x`, gestures, exclusions |

**Total: 18 fixture files** (excluding each directory's `README.md`/`CLAUDE.md`).

See each directory's own `README.md` for the full file tree and fixture-to-checklist mapping.
