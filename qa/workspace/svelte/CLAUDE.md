# qa/workspace/svelte/CLAUDE.md

Fixtures for `checklists/svelte.md` — the svelte-flavor checklist.

## Sync rule

- **Checklist is the source of truth.** If `svelte.md` references a fixture path, that
  file must exist here. After editing the checklist, verify this directory has every
  referenced path.
- **Workspace changes don't update the checklist.** Extra files can exist here without
  appearing in `svelte.md`; adding a scratch file does **not** add a case. The asserted
  expansions are owned by `svelte.md`, which copies them verbatim from
  `snippets/svelte/*.json` — never hand-edit an expansion in a fixture to "match" the
  checklist.

## Files

| File | Purpose |
|------|---------|
| `Home.svelte` | Primary scratch. Holds a `<!-- type here -->` marker on a blank line inside `<stackLayout>`. Drives every section except the two-way delta — bare/`-prop`/`-comp`/layout/gesture expansions, the icon-absence probe (`ns-icon-*` must not complete), and the excluded (`SplitView`) / extra (`NavigationButton`) element checks. **Undo (`Cmd+Z`) after each accepted snippet** so the buffer returns to near-empty. |
| `Bindings.svelte` | Two-way / event-naming delta scratch (§6). Used to contrast the `-prop` two-way attributes (`bind:value`, `bind:selectedIndex`, `bind:checked`) against the `-comp` plain property + event pairs (`on:valueChange`, `on:selectedIndexChanged`, `on:checkedChange`). Same `<!-- type here -->` marker; **undo after each**. |

## Fixture-content conventions (svelte)

- **Both files are `.svelte`** so VS Code resolves them to the `svelte` language id — the
  only scope this flavor's snippets are contributed to. The **Svelte** language extension
  must be installed or there is no `svelte` language for the snippets to attach to.
- **Tag case is lowercase-first.** The skeletons use `<page>`, `<stackLayout>`, `<script>`
  on purpose — that is the svelte/NativeScript-Svelte convention the snippets follow
  (`ns-button` → `<button>`, not `<Button>`). Do not "correct" them to PascalCase.
- **Keep the `<!-- type here -->` marker and the blank line above/below it.** The tester
  places the cursor on that blank line; the surrounding `<stackLayout>` gives a realistic
  parent context but is not itself under test.
- **Content is otherwise cosmetic.** Nothing in these files is asserted byte-for-byte; only
  the *inserted* snippet text is verified (against `snippets/svelte/*.json`). Pasting then
  undoing is the normal cycle — the files are meant to stay near-empty between cases.
