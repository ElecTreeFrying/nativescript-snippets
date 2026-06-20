# qa/workspace/general/CLAUDE.md

Fixtures for `checklists/general.md` — the cross-flavor checklist.

## Sync rule

- **Checklist is the source of truth.** If `general.md` references a fixture path, that file must exist here. After editing the checklist, verify this directory has every referenced path.
- **Workspace changes don't update the checklist.** Extra scratch files can exist here without appearing in `general.md`.

## Conventions

- **Scratch files are intentionally near-empty.** Each holds a comment marker and a blank
  "type here" line so the tester can type an `ns-*` prefix and watch it expand. Do not
  fill them with real markup — the point is a clean trigger surface. Keep the file
  **extension** correct: scoping keys on the VS Code language id, which is derived from the
  extension (`.html` → `html`, `.xml` → `xml`, `.vue` → `vue`, `.tsx` → `typescriptreact`,
  `.jsx` → `javascriptreact`, `.svelte` → `svelte`).
- **Negative files must stay in a non-contributed language.** `negative.ts` (`typescript`)
  and `negative.json` (`json`) prove scoping: no `ns-*` prefix is contributed to those
  languages, so the completion list must show none of this extension's snippets. Do not
  rename them to a contributed extension.
- **Vue/React/Svelte have no icon snippets.** `ns-icon-*` is contributed only to `html`
  and `xml`. The `.vue`/`.tsx`/`.jsx`/`.svelte` scratch files exist partly to confirm
  `ns-icon-*` is absent there.
