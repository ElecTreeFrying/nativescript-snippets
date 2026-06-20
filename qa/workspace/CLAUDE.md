# qa/workspace/CLAUDE.md

Fixture workspace for manual QA. Each subdirectory mirrors a checklist in `checklists/`.

## Sync rule

- **Workspace changes do NOT update checklists.** Scratch files can be added, renamed, or
  modified without touching any checklist. The workspace may hold extra files a checklist
  doesn't reference.
- **Checklist changes DO update the workspace.** When a checklist references a new fixture, add
  it here. The checklist is the source of truth for what must exist.

## Directory mapping

```
workspace/general/   ←  checklists/general.md
workspace/angular/   ←  checklists/angular.md
workspace/core/      ←  checklists/core.md
workspace/vue/       ←  checklists/vue.md
workspace/react/     ←  checklists/react.md
workspace/svelte/    ←  checklists/svelte.md
```

## Conventions

- **Scratch files are intentionally near-empty.** Each is a minimal valid skeleton of its
  language with a comment marker and a blank "type here" line, so the tester can type an `ns-*`
  prefix and watch it expand. Do not pre-fill them with the snippets under test.
- **The file extension is load-bearing.** Scoping keys on the VS Code language id, which derives
  from the extension: `.html`→`html` (Angular), `.xml`→`xml` (Core), `.vue`→`vue`,
  `.tsx`→`typescriptreact` / `.jsx`→`javascriptreact` (React), `.svelte`→`svelte`. Renaming a
  fixture to a different extension changes which snippets it sees.
- **`general/` carries the negatives.** `workspace/general/negative.ts` and `negative.json` are
  deliberately in non-contributed languages to prove scoping (no `ns-*` snippet appears). Keep
  them that way.
- Each flavor directory has its own `CLAUDE.md` (edit rules) and `README.md` (file tree +
  fixture-to-checklist mapping).
