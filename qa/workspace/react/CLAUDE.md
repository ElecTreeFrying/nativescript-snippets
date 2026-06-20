# qa/workspace/react/CLAUDE.md

Fixtures for `checklists/react.md` — the React flavor checklist.

## Sync rule

- **Checklist is the source of truth.** If `react.md` references a fixture path, that file must exist here. After editing the checklist, verify this directory has every referenced path.
- **Workspace changes don't update the checklist.** Extra scratch files can exist here without appearing in `react.md`.

## Why two scratch files

React maps the **same** generated snippet files (`snippets/react/*.json`) to **two** VS Code
language ids in `package.json`: `typescriptreact` (`.tsx`) and `javascriptreact` (`.jsx`).
Both must be exercised, so this folder ships `Home.tsx` **and** `Home.jsx`. Keep both — deleting
either drops coverage of one of the two contributed language ids. The file **extension** is
load-bearing: scoping keys on the VS Code language id derived from the extension
(`.tsx` → `typescriptreact`, `.jsx` → `javascriptreact`). Do not rename them to a
non-React extension.

## Fixture content conventions

- **Scratch files are intentionally near-empty.** Each holds a comment header, a minimal
  valid React skeleton (an exported `Home()` returning JSX), and a single blank "type here"
  line inside the returned JSX with a `{/* type here */}` marker. Do not pre-fill them with the
  snippets under test — the point is a clean trigger surface. Type the prefix, accept, verify,
  then `Cmd+Z`.
- **Put the cursor inside the JSX.** ns-* completions attach to the React language; the cursor
  must be on the blank line inside the returned `<stackLayout>` element for the completion to fire.
- **No icon fixture.** React ships **no** `ns-icon-*` snippets, so unlike the Angular/Core
  workspaces there is deliberately no icon scratch file — §6 of the checklist asserts their
  **absence** in these same `Home.*` files.
- **Tag case / event / two-way reminders live in the file header.** The header comments restate
  the React delta (lowercase-first tags, `on<Cap>={…}` events, no two-way) so a tester opening
  the fixture cold knows what to expect; keep them in sync with `react.md`'s "at a glance" table.
