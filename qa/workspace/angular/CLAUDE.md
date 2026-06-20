# qa/workspace/angular/CLAUDE.md

Fixtures for `checklists/angular.md` — the angular-flavor (language id `html`) checklist.

## Sync rule

- **Checklist is the source of truth.** If `angular.md` references a fixture path, that
  file must exist here. After editing the checklist, verify this directory has every
  referenced path.
- **Workspace changes don't update the checklist.** Extra scratch files can exist here
  without appearing in `angular.md`; adding one does not add a case. The asserted
  expansions live in `angular.md`, and the bodies it quotes come from
  `snippets/angular/*.json` (the generated artifacts) — never from these scratch files.

## Fixtures

| File | Purpose |
|------|---------|
| `home.component.html` | Primary scratch. A `<GridLayout>` skeleton with a `<!-- type here -->` marker on a blank line. Drives §1 (bare PascalCase tags), §2 (`ns-button-prop`), §3 (`ns-button-comp`), §4 (layout examples), §5 (gestures). |
| `forms.component.html` | A `<StackLayout>` skeleton for §7. The header comment names the three load-bearing prefixes (`ns-slider-prop` two-way, `ns-text-field-prop` two-way, `ns-segmented-bar-prop` one-way) so the tester can confirm the two-way / event-naming split. |
| `action-bar.component.html` | An `<ActionBar>` skeleton for §6 (icons) and §8 (extra / Angular-only elements). Also exercises the `(name)="${n}"` event syntax via `ns-action-item-comp`. |

## Fixture-content conventions (angular)

- **All three fixtures are `html` files** — the Angular flavor is scoped to the `html`
  language id. The file extension being `.component.html` is cosmetic (it mirrors the
  Angular project convention); what matters is that VS Code resolves the language to
  `html` so the `ns-*` snippets attach.
- **Each fixture is a minimal, valid NativeScript-Angular template skeleton** with a
  single `<!-- type here -->` marker on an otherwise blank line. Keep that blank line —
  the tester places the cursor there, types a prefix, accepts, inspects, then
  <kbd>Cmd</kbd>+<kbd>Z</kbd> to restore the buffer.
- **Do not pre-fill the snippets under test.** The scratch files contain only the
  surrounding skeleton (a layout / ActionBar wrapper) and the guidance comment; the
  `ns-*` expansions are produced live during testing, never baked into the fixture.
- **Header comments are guidance, not assertions.** The `<!-- … -->` block at the top of
  each file lists the prefixes that section drives and a shorthand of the expected shape.
  If `angular.md`'s asserted bodies change (because the generator regenerated the JSON),
  update the checklist first, then refresh these comments to match — the checklist wins.
- **PascalCase / two-way / icons are angular-specific.** These fixtures deliberately
  surface the angular delta (PascalCase tags, `[(name)]` two-way, numeric `ns-icon-*`
  bodies, `ActionBarExtension`). They are not shared with the other flavors' workspaces.
