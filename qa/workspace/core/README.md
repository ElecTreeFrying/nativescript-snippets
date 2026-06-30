# qa/workspace/core/

Fixtures for the core-flavor checklist ([`checklists/core.md`](../../checklists/core.md)).

The **core** flavor contributes its `ns-*` snippets to the **`xml`** language only — the
classic NativeScript Page markup. It ships **179** snippets (102 component + 45 layout +
8 gesture + 24 icon). The core delta versus other flavors: tags stay **PascalCase**
(`ns-button` → `<Button>`, never lowercased), events are **bare attributes** with **no
parentheses** (`tap="${24}"`), there is **no two-way binding** (one-way attributes only —
`value="${3:number}"`), and it is one of the two icon-bearing flavors (`ns-icon-*`, 24
icons; the other is Angular). `ActionBarExtension` is **absent** (Angular-only);
`NavigationButton` and `SplitView` are **present**. Because this is a declarative
snippets extension, every case is "type a prefix, accept, compare the insert" — there is
nothing to click. A single scratch file covers every section, so the directory stays
checklist↔workspace 1:1 with no orphans.

## Layout

```
core/
├── main-page.xml      Primary scratch — §1 bare, §2 -prop, §3 -comp, §4 layouts, §5 gestures, §6 icons, §7 one-way, §8 registry
├── README.md          This file (not a test target)
└── CLAUDE.md          Sync rule + fixture conventions (not a test target)
```

`main-page.xml` is a minimal valid `Page` with an `<ActionBar title="Core QA">` (host for
the ActionItem / `ns-icon-*` / NavigationButton cases) and a `<StackLayout>` (host for
everything else). Both hold a blank "type here" line; nothing is pre-filled with a
snippet under test.

## Fixture-to-checklist mapping

| Fixture | Section(s) | Purpose |
|---------|-----------|---------|
| `main-page.xml` | §1–§8 | The only scratch file. `<StackLayout>` line hosts bare/`-prop`/`-comp`/layout/gesture/one-way/registry cases; the `<ActionBar>` line hosts `ns-action-item`, `ns-icon-*`, and `ns-navigation-button`. |

## File count

| Location | Files | Purpose |
|----------|-------|---------|
| root | 1 | `main-page.xml` — primary `xml` scratch (excludes README.md / CLAUDE.md) |
| **Total** | **1** |
