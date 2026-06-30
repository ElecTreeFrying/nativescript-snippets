# qa/workspace/angular/

Fixtures for the angular-flavor checklist ([`checklists/angular.md`](../../checklists/angular.md)).

Angular is the `html`-scoped flavor: the snippets attach to the `html` language id, the
tags stay **PascalCase** (`ns-button` → `<Button>`), properties render as
`name="${n:hint}"`, events as `(name)="${n}"`, and two-way-capable props become Angular
**banana-in-a-box** `[(name)]="${n}"`. It is one of the two flavors that ship the iOS
**icon** snippets (`ns-icon-*`, the other being Core), and the only flavor with the
**Angular-only** `ActionBarExtension` element. Every fixture below is referenced by
`angular.md`, so this directory is checklist↔workspace 1:1 with no orphans.

Unlike the shared [`general/`](../general/) workspace (one near-empty `scratch.*` per
language), this per-flavor workspace splits the angular delta across three intent-named
`.component.html` scratch files so the tester can keep the relevant prefixes and notes
in view: a general-purpose `home.component.html`, a two-way-binding `forms.component.html`,
and an `action-bar.component.html` for icons and the extra/Angular-only elements. All
three are plain `html` files (Angular scope) — only the language id matters for which
snippets appear.

## Layout

```
angular/
├── home.component.html          Primary scratch — §1 bare, §2 -prop, §3 -comp, §4 layouts, §5 gestures
├── forms.component.html         §7 two-way binding & event-naming (Slider / TextField / SegmentedBar)
└── action-bar.component.html    §6 icons, §3 event syntax, §8 extra / Angular-only elements
```

## Fixture-to-checklist mapping

| Fixture | Section(s) | Purpose |
|---------|-----------|---------|
| `home.component.html` | §1, §2, §3, §4, §5 | Primary scratch: bare PascalCase tags, the canonical `ns-button-prop` / `ns-button-comp`, ready-made layout examples, gesture fragments. |
| `forms.component.html` | §7 | Two-way vs one-way delta: `ns-slider-prop` `[(value)]`, `ns-text-field-prop` `[(text)]`, `ns-segmented-bar-prop` plain `selectedIndex` (emits `selectedIndexChanged`, not `…Change`). |
| `action-bar.component.html` | §3, §6, §8 | Icons (`ns-icon-done` → `0`, …), `(name)="${n}"` event syntax via `ns-action-item-comp`, and the extra / Angular-only elements (`NavigationButton`, `SplitView`, `ActionBarExtension`). |

## File count

| Location | Files | Purpose |
|----------|-------|---------|
| root | 3 | `home.component.html`, `forms.component.html`, `action-bar.component.html` |
| **Total** | **3** |
