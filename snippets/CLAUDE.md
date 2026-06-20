# snippets/CLAUDE.md

The **shipped snippet JSON**, one subdirectory per flavor (`angular/`, `core/`, `vue/`,
`react/`, `svelte/`). These `*.json` files are the published product; the `*.md` docs beside
them are dev-only.

## The one rule: these are build artifacts

Every `snippets/**/*.json` is regenerated **wholesale** by [`../tools/render.js`](../tools/render.js)
from [`../tools/ns-model.json`](../tools/ns-model.json) (extracted from the `@nativescript/core`
types). **Hand-editing a snippet is futile** — it vanishes on the next `npm run generate`. To
change a snippet:

1. Edit the generator ([`../tools/render.js`](../tools/render.js)) or its curated data
   (`../tools/layout-examples.json`, `../tools/extra-components.json`, or the `GESTURES` / `ICONS`
   tables in `render.js`).
2. Run `npm run generate` (extract → render → gen-docs → validate → check-coverage).

Never edit a `.json` to fix a bug — fix the generator. See [`../tools/CLAUDE.md`](../tools/CLAUDE.md).
The `tools/` generator is **local-only (gitignored)** — not committed or shipped, so the
`../tools/*` links throughout this file resolve only in a full local working copy, not a fresh clone.

## Per-flavor file layout

- Every flavor has `components.json`, `layouts.json`, `gestures.json`.
- **Only `angular/` and `core/` also have `settings-icon.json`** — icons are Angular/Core-only
  (`FLAVORS[*].icons` in `render.js`). `vue/`, `react/`, `svelte/` have three files, not four.
- Counts differ per flavor because some elements are excluded from a flavor's registry (`EXCLUDE`
  in `render.js`) and only two flavors ship icons; see [`../reference.md`](../reference.md) for the
  numbers (generated, so they never drift).

## package.json wiring is hand-maintained

The `contributes.snippets` array in [`../package.json`](../package.json) maps each file above to its
language id(s) **by hand** — no tool writes it, and `validate.js` does not check it. If you add,
remove, or rename a snippet file (e.g. add a flavor, or give a flavor `settings-icon.json`),
**update `contributes.snippets` to match**, or the file won't load. React lists each of its three
files twice — once for `typescriptreact`, once for `javascriptreact`.

## Conventions

- **LF line endings, 2-space indent, trailing newline** (`.gitattributes` enforces LF). The
  generator emits exactly this; a CRLF re-save produces a huge phantom diff. Don't reformat.
- **`-prop` / `-comp` bodies must contain `$0`**, use each tab-stop index once, and carry a
  `Source:` URL. [`../tools/validate.js`](../tools/validate.js) gates all of this (exit 1).
- Each flavor's exact tag/prop/event transforms live in the `FLAVORS` table in
  [`../tools/render.js`](../tools/render.js) (the source of truth), summarized in
  [`README.md`](README.md) — read those, not the JSON, to understand a flavor's output.
