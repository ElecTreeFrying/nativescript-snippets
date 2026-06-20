# qa/workspace/core/CLAUDE.md

Fixtures for `checklists/core.md` — the core-flavor (`xml`) snippets checklist.

## Sync rule

- **The checklist is the source of truth.** If `core.md` references a fixture path, that
  file must exist here. After editing the checklist, verify this directory has every
  referenced path (it currently references only `main-page.xml`).
- **Workspace changes don't update the checklist.** Adding a scratch file here does not
  change `core.md`; if a new file is meant to be tested, add the case to the checklist
  first, then create the fixture. Extra files may exist here without appearing in `core.md`.
- **Snippet JSON is the source of truth for every asserted expansion.** The bodies quoted
  in `core.md` are copied verbatim from `snippets/core/*.json`
  (`components.json`, `layouts.json`, `gestures.json`, `settings-icon.json`). If a snippet
  changes, regenerate (`npm run generate`) and re-copy the body into the checklist — never
  hand-edit the JSON.

## Fixture content expectations

- **`main-page.xml`** — the single scratch file (language id `xml`). It is a minimal,
  valid NativeScript `Page`: an `<ActionBar title="Core QA">` block whose blank line hosts
  the ActionItem / `ns-icon-*` / NavigationButton cases, and a `<StackLayout>` whose blank
  line hosts everything else. Keep both "type here" lines empty — the tester types the
  prefix there, accepts, inspects, then **Cmd+Z** to restore. Do **not** pre-fill it with
  any snippet under test; a pre-filled body would make IntelliSense ambiguous and defeat
  the tag-case / one-way / event-syntax assertions.
- **Why `xml`, not `html`** — core snippets are scoped to the `xml` language id. The file
  extension `.xml` is what makes VS Code attach the core contribution; renaming it to
  `.html` would silently switch to the **Angular** flavor (different events/icons). Keep
  the `.xml` extension.
- **Core-specific things the file exercises** — PascalCase tags (`<Button>`, not
  `<button>`), bare event attributes (`tap="$0"`, no parentheses), one-way property
  attributes (no `[(x)]` / `bind:`), numeric icon bodies (`ns-icon-done` → `0`), and the
  presence of `NavigationButton` / `SplitView` alongside the absence of
  `ActionBarExtension`. The `<ActionBar>` host matters for the icon/ActionItem cases —
  keep it so the snippets land in a contextually sensible place.
