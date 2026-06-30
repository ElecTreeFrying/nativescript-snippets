# qa/workspace/svelte/

Fixtures for the svelte-flavor checklist ([`checklists/svelte.md`](../../checklists/svelte.md)).

The **svelte** flavor is scoped to the `svelte` language id and ships **152 snippets**
(99 component + 45 layout + 8 gesture). Its deltas against the other flavors: tags are
**lowercase-first** (`ns-button` → `<button>`, `ns-text-field` → `<textField>`),
properties are `name="${n:hint}"`, events are `on:name={${n}}`, gestures are
`on:gesture={$0}`, and it is a **two-way** flavor — `-prop` bodies emit
`bind:name={…}` for bindable properties, with svelte `bind` covering **both** the
`Change` and `Changed` event suffixes (e.g. `Slider value` → `bind:value`,
`SegmentedBar selectedIndex` → `bind:selectedIndex`). It has **no icon snippets**
(`ns-icon-*` are Angular/Core only) and **excludes `SplitView`**, while keeping the extra
`NavigationButton` element. Both fixtures are plain `.svelte` scratch files — the tester
types a prefix on the "type here" line, accepts, verifies, and undoes. The directory is
checklist↔workspace 1:1 with no orphans.

## Layout

```
svelte/
├── Home.svelte        Primary scratch — §1 bare, §2 -prop, §3 -comp, §4 layout, §5 gestures, §7 icon-absence, §8 excluded/extra
└── Bindings.svelte    Two-way + event-naming delta scratch — §6 (bind:* vs on:*Change / on:*Changed)
```

## Fixture-to-checklist mapping

| Fixture | Section(s) | Purpose |
|---------|-----------|---------|
| `Home.svelte` | §1–§5, §7, §8 | Primary scratch — bare/`-prop`/`-comp`/layout/gestures expansions, icon-absence probe, excluded (`SplitView`) / extra (`NavigationButton`) elements |
| `Bindings.svelte` | §6 | Two-way scratch — contrasts `-prop` `bind:value` / `bind:selectedIndex` / `bind:checked` against the `-comp` plain property + `on:valueChange` / `on:selectedIndexChanged` / `on:checkedChange` |

## File count

| Location | Files | Purpose |
|----------|-------|---------|
| root | 2 | `Home.svelte` (primary scratch) + `Bindings.svelte` (two-way delta scratch) |
| **Total** | **2** | (excludes `README.md` / `CLAUDE.md`) |
