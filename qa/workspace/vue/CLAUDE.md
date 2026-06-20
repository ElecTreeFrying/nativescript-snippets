# qa/workspace/vue/CLAUDE.md

Fixtures for `checklists/vue.md` — the Vue flavor checklist.

## Sync rule

- **Checklist is the source of truth.** If `vue.md` references a fixture path, that file must exist here. After editing the checklist, verify this directory has every referenced path.
- **Workspace changes don't update the checklist.** Extra scratch files can exist here without appearing in `vue.md`; adding a fixture does not change a single asserted expansion — those come from `snippets/vue/*.json`.

## Files

| File | Purpose |
|------|---------|
| `Home.vue` | Primary scratch. NativeScript-Vue SFC with a blank `<!-- type here -->` line inside `<template>`. Drives bare (§1), `-prop` (§2), `-comp` (§3), layout examples (§4), gestures (§5), `ns-icon-*` absence (§7), and included/excluded elements (§8). |
| `Bindings.vue` | Flavor-delta scratch for §6 — proves Vue has **no two-way binding**: `ns-slider-prop` → `value="${3:number}"`, `ns-text-field-prop` → `text="${27:string}"`, and event attrs are `@name="${n}"`. Same near-empty `<template>` trigger surface. |

## Fixture-content conventions (Vue-specific)

- **Scratch files are intentionally near-empty.** Each is a minimal SFC holding a comment marker and a blank "type here" line **inside `<template>`** — the snippets are template-scoped, so the cursor must be in `<template>`, not `<script>`. Do not fill them with real markup; the point is a clean trigger surface. Type the prefix, accept, then **`Cmd+Z`** to restore.
- **Keep the `.vue` extension.** Scoping keys on the VS Code language id `vue` (derived from `.vue`); the **Vue (Volar)** extension must be installed for VS Code to assign that language. Renaming to another extension breaks the trigger.
- **Tags are PascalCase.** Any markup you keep in the skeleton (`<Page>`, `<StackLayout>`, `<ActionBar>`) must stay PascalCase — that is the Vue convention these fixtures demonstrate and that `vue.md §1` asserts.
- **No icons here.** `ns-icon-*` is contributed only to `html`/`xml`. The `.vue` fixtures exist partly to confirm `ns-icon-*` is **absent** (§7); do not add anything implying icons are available.
- **Asserted expansions come from `snippets/vue/*.json`, not these files.** The fixtures are only a place to type; the exact inserted bodies (e.g. `ns-button-prop`) are quoted in `vue.md` from the generated JSON. Editing a fixture never changes an expansion — to change a snippet you edit the generator under `tools/` and regenerate.
