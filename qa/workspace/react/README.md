# qa/workspace/react/

Fixtures for the React flavor checklist ([`checklists/react.md`](../../checklists/react.md)).

React is the **JSX** flavor. The same generated snippet files (`snippets/react/*.json`) are
mapped to **two** VS Code language ids — `typescriptreact` (`.tsx`) and `javascriptreact`
(`.jsx`) — so this workspace ships **both** a `Home.tsx` and a `Home.jsx`; every case in
`react.md` should expand identically in each. The React delta from the PascalCase markup
flavors (Angular/Core): tags are **lowercase-first** (`ns-button` → `<button>`,
`ns-stack-layout` → `<stackLayout>`), property attributes are `name="${n:hint}"`, events are
`on<Cap>={${n}}` (e.g. `onTap`, `onCheckedChange`), there is **no two-way binding** (Slider
`value` is a plain `value="${3:number}"`), the `-comp` doc comment uses the JSX delimiter
`{/* … */}`, and **no `ns-icon-*` snippets exist** (icons ship to Angular/Core only). A few
elements are excluded from the React registry (`SplitView`, `RootLayout`, `Repeater`,
`NavigationButton`). Both fixtures are referenced by `react.md`, so the directory is
checklist↔workspace 1:1 with no orphans.

These are intentionally **near-empty scratch files** — a clean trigger surface with a single
`{/* type here */}` marker and a blank line above it, mirroring the established
[`general/`](../general/) style. They are not pre-filled with the snippets under test; the
tester types the prefix on the blank line, accepts, verifies, then undoes (`Cmd+Z`).

## Layout

```
react/
├── Home.tsx    Primary scratch — language id typescriptreact (.tsx); all sections
└── Home.jsx    Twin scratch    — language id javascriptreact (.jsx); same cases, parity check
```

## Fixture-to-checklist mapping

| Fixture | Section(s) | Purpose |
|---------|-----------|---------|
| `Home.tsx` | §1–§8 | Primary `typescriptreact` scratch — bare/`-prop`/`-comp`, layout example, gestures, icon-absence, event-naming delta, excluded elements |
| `Home.jsx` | §1–§8 | `javascriptreact` twin — same snippet files mapped to a second language id; runs the §1 tag-case + spot cases to confirm `.tsx`/`.jsx` parity |

## File count

| Location | Files | Purpose |
|----------|-------|---------|
| root | 2 | `Home.tsx` + `Home.jsx` — React scratch files (one per mapped language id) |
| **Total** | **2** |
