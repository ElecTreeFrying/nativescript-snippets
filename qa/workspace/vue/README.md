# qa/workspace/vue/

Fixtures for the Vue flavor checklist ([`checklists/vue.md`](../../checklists/vue.md)).

`vue.md` tests only the **Vue delta** on top of the cross-flavor `general.md`: Vue keeps
tags **PascalCase** (`ns-button` → `<Button>`), emits properties as `name="${n:hint}"`
and events as `@name="${n}"`, ships **no two-way binding** (`Slider.value` →
`value="${3:number}"`, never `bind:`/`[(…)]`), uses `@<gesture>="$0"` gesture fragments,
contributes **no `ns-icon-*`** snippets (Angular/Core only), and **excludes** `SplitView`
and `Repeater` while **including** `NavigationButton`. These two `.vue` SFCs give the
tester a clean trigger surface inside `<template>`; every fixture below is referenced by
`vue.md`, so the directory is checklist↔workspace 1:1 with no orphans.

## Layout

```
vue/
├── Home.vue        Primary scratch — bare (§1), -prop (§2), -comp (§3), layout (§4),
│                   gestures (§5), icon-absence (§7), included/excluded elements (§8)
└── Bindings.vue    Flavor-delta scratch — one-way attributes only / no two-way (§6)
```

## Fixture-to-checklist mapping

| Fixture | Section(s) | Purpose |
|---------|-----------|---------|
| `Home.vue` | §1, §2, §3, §4, §5, §7, §8 | Primary trigger surface inside `<template>` — tag-case, `-prop`/`-comp`, layout examples, gestures, `ns-icon-*` absence, `NavigationButton` present / `SplitView`+`Repeater` absent |
| `Bindings.vue` | §6 | One-way-only proof — `ns-slider-prop` → `value="${3:number}"`, `ns-text-field-prop` → `text="${27:string}"`, no `bind:`/`[(…)]` |

## File count

| Location | Files | Purpose |
|----------|------:|---------|
| root | 2 | `Home.vue` (primary), `Bindings.vue` (flavor delta) |
| **Total** | **2** |
