# qa/checklists/

Manual QA checklists for the NativeScript **snippets** extension. One cross-flavor checklist
plus one per flavor. Each item is a `[ ]` box the human tester ticks in the Extension
Development Host (press **F5**): type an `ns-*` prefix, accept it, verify the expansion + tab
stops. (No commands/settings/DnD exist — this is a declarative snippets extension.)

## Execution order

1. **`general.md`** — always run first. Covers flavor-neutral behavior: prefix grammar, the
   variant model, tab-stop semantics, IntelliSense trigger + `Source:` hover, and **language
   scoping**.
2. Per-flavor checklists — run after `general.md` passes. Each assumes general's items are
   already verified and tests only that flavor's **delta**.

## Inventory

| Checklist | Cases | Scope |
|-----------|------:|-------|
| [`general.md`](general.md) | 29 | Cross-flavor — prefix grammar, variant model (`bare`/`-prop`/`-comp`/`-snippet-N`), tab-stop order + enum hints, IntelliSense trigger + `Source:` hover, **language scoping** (prefix appears only in its mapped language; absent in `.ts`/`.json`), tag-case sanity |
| [`angular.md`](angular.md) | 46 | `html` — PascalCase tags, `name="…"` props, `(event)="…"`, **two-way `[(x)]`** (Slider `[(value)]`, TextField `[(text)]`, Switch `[(checked)]`, DatePicker/TimePicker/ListPicker); SegmentedBar/TabView `selectedIndex` stays one-way; `(tap)="$0"` gestures; **icons** `ns-icon-*` (0–23); extras `NavigationButton` + Angular-only `ActionBarExtension`; `SplitView` present |
| [`core.md`](core.md) | 38 | `xml` — PascalCase tags, `name="…"` props, **bare `event="…"`** (no parens), **no two-way**, `tap="$0"` gestures, **icons** `ns-icon-*`; `NavigationButton` + `SplitView` present, `ActionBarExtension` absent |
| [`vue.md`](vue.md) | 31 | `vue` — PascalCase tags, `@event="…"`, no two-way, `@tap="$0"` gestures, **no icons** (absence tested); `NavigationButton` present; `SplitView`/`Repeater` excluded |
| [`react.md`](react.md) | 29 | `typescriptreact` + `javascriptreact` — **lowercase-first tags** (`<button>`), `onEvent={…}` (`onTap`, `onCheckedChange`), no two-way, `onTap={$0}` gestures, **no icons**; `NavigationButton` absent; `SplitView`/`RootLayout`/`Repeater` excluded; same JSON mapped to both `.tsx`/`.jsx` |
| [`svelte.md`](svelte.md) | 33 | `svelte` — **lowercase-first tags**, `on:event={…}`, **two-way `bind:x`** covering both `Change`/`Changed` (`bind:value`, `bind:selectedIndex`), `on:tap={$0}` gestures, **no icons**; `NavigationButton` present; `SplitView` excluded |

**Total: 206 cases** across the six checklists.

## Workspace counterparts

Every checklist has a matching fixture directory under `workspace/`:

```
checklists/general.md   →  workspace/general/
checklists/angular.md   →  workspace/angular/
checklists/core.md      →  workspace/core/
checklists/vue.md       →  workspace/vue/
checklists/react.md     →  workspace/react/
checklists/svelte.md    →  workspace/svelte/
```

When a checklist is updated, ensure its workspace counterpart has every fixture file the
checklist references. The expansions a checklist quotes are the source-of-truth bodies from
`../snippets/<flavor>/*.json`; if snippets are regenerated, re-verify the affected checklists.
