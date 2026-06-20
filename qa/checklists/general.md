# QA Checklist — general (cross-flavor)

> **These `[ ]` boxes are for the human tester** running the Extension Development
> Host (press **F5** from the project root, then **File > Open Folder →
> `qa/workspace/`**). Tick each box as you verify it by hand. They are *not*
> generation tasks.
>
> **Run this checklist first.** It covers behavior that is **flavor-neutral** — the
> `ns-` prefix grammar, the variant model, tab-stop semantics, IntelliSense trigger
> mechanics, the `Source:` hover, and **language scoping**. The five per-flavor
> checklists (`angular.md`, `core.md`, `vue.md`, `react.md`, `svelte.md`) assume these
> items already passed and test only the **flavor-specific delta** (tag case, event /
> two-way syntax, icons, excluded elements). Do not duplicate general items there.

## What this extension is (read once)

A **declarative snippets extension** — it ships only `package.json` + the snippet JSON
under `snippets/`. There is **no activation code, no commands, no settings, no
drag-and-drop**. "Testing" therefore means: open a file of a contributed language, type
an `ns-*` prefix, accept the completion, and verify the inserted text + tab stops. There
is nothing to click and no setting to flip.

## Prefix grammar at a glance

Every prefix starts with `ns-`. Per element/feature:

| Prefix shape | Meaning | Flavors |
|---|---|---|
| `ns-<name>` | the bare element | all |
| `ns-<name>-prop` | element + every primary property as a tab-stop | all |
| `ns-<name>-comp` | properties **+** events **+** a doc-comment table | all |
| `ns-<layout>-snippet-N` | a complete ready-made example layout *(layouts only)* | all |
| `ns-<gesture>` | a single gesture binding fragment (8 gestures) | all |
| `ns-icon-<name>` | a numeric `ios.systemIcon` value (24 icons) | **Angular + Core only** |

This extension contributes **805 snippets** total across five flavors (Angular 182,
Core 179, Vue 149, React 143, Svelte 152). The per-flavor counts differ on purpose —
icons ship only to Angular/Core, and a few elements are excluded from some flavors.

## How to trigger a snippet

1. Open a scratch file of the target language from `qa/workspace/general/`.
2. Put the cursor on the blank "type here" line.
3. Type the prefix (e.g. `ns-button`). VS Code shows a completion item whose **label is
   the prefix** and whose **detail is the snippet name** (the JSON key, e.g.
   `Button (default)`).
4. Press <kbd>Tab</kbd> or <kbd>Enter</kbd> to accept → the body is inserted with the
   cursor on the first tab stop.

> If completions don't appear automatically, press <kbd>Ctrl</kbd>+<kbd>Space</kbd> to
> open IntelliSense manually. For Vue/Svelte you must have the **Vue (Volar)** /
> **Svelte** language extensions installed, or VS Code has no `vue`/`svelte` language for
> the snippets to attach to.

## Resetting between cases

After every accepted snippet, press <kbd>Cmd</kbd>+<kbd>Z</kbd> (mac) /
<kbd>Ctrl</kbd>+<kbd>Z</kbd> to remove it before the next case — the scratch files are
meant to stay near-empty.

## Fixtures — `qa/workspace/general/`

```
general/
├── scratch.html      Angular scope (html)
├── scratch.xml       Core scope (xml)
├── scratch.vue       Vue scope (vue)
├── scratch.tsx       React scope (typescriptreact)
├── scratch.jsx       React scope (javascriptreact)
├── scratch.svelte    Svelte scope (svelte)
├── negative.ts       NOT contributed — ns-* must not appear
└── negative.json     NOT contributed — ns-* must not appear
```

---

## 1 — IntelliSense trigger & accept mechanics

Use `qa/workspace/general/scratch.html` (Angular scope) unless noted.

- [ ] Type `ns-button` on the "type here" line → a completion item appears with label
      `ns-button` and detail `Button (default)`.
- [ ] Accept with <kbd>Tab</kbd> → inserts `<Button>$0</Button>` with the cursor between
      the tags. `Cmd+Z`.
- [ ] Accept the same item with <kbd>Enter</kbd> → identical result. `Cmd+Z`.
- [ ] Type just `ns-` → the completion list is populated with many `ns-*` items (prefix
      namespace is consistent). Escape.
- [ ] Type `ns-butt` (partial) → `ns-button`, `ns-button-prop`, `ns-button-comp` all
      fuzzy-match and remain selectable. Escape.
- [ ] Hover the `ns-button` completion item (or trigger its details pane) → the
      description shows the element's summary text followed by a **`Source: https://…`**
      line. (Every snippet carries a `Source:` URL — spot-check a few.)

## 2 — Variant model (structural)

The three component variants and the layout example variant. Exact inserted strings are
asserted per-flavor; here, confirm the **shape**. Use `scratch.html`. `Cmd+Z` after each.

- [ ] **bare** — `ns-button` → `<Button>$0</Button>` (single line, one stop).
- [ ] **bare layout** — `ns-stack-layout` → opens/closes on separate lines with the
      cursor indented inside (`<StackLayout>` ⏎ `\t$0` ⏎ `</StackLayout>`).
- [ ] **-prop** — `ns-button-prop` → the open tag followed by **one attribute per line**,
      each a numbered tab-stop `${n:hint}`, closing with `>$0</Button>`.
- [ ] **-comp** — `ns-button-comp` → like `-prop` **plus** event attribute(s) **plus** a
      trailing comment block listing `Properties`, `Events`, and a
      `+ N inherited View properties … and M events …` line.
- [ ] **-snippet-N** — `ns-stack-layout-snippet-1` → a complete ready-made
      `<StackLayout>…</StackLayout>` example with child `<Label>`s and **no tab stops**
      (it is a finished example, not a fill-in form). Layouts only.

## 3 — Tab-stop semantics

Use `ns-button-prop` in `scratch.html`. After inserting:

- [ ] The cursor lands on **`${1:…}`** with the hint text selected.
- [ ] Pressing <kbd>Tab</kbd> repeatedly advances through `${2}`, `${3}`, … **in document
      order**, top to bottom, with no index visited twice.
- [ ] After the **last** numbered stop, one more <kbd>Tab</kbd> lands on the final
      position **`$0`** (just before `</Button>`) and exits the snippet.
- [ ] Pressing <kbd>Esc</kbd> at any stop jumps straight to `$0`.
- [ ] **Enum hints render as choices** — a property with an enumerated type shows its hint
      as `(a|b|c)` (e.g. `fontStyle="${3:(normal|italic)}"`), not an opaque type name.
- [ ] **No stray template artifacts** — no inserted attribute default contains `${`, `}`,
      `<`, or `>` (those would corrupt the snippet). Scan the inserted `ns-button-prop`
      body: every default is a clean hint like `string`, `number`, `(center|left|right|justify)`.
- [ ] `Cmd+Z` to clear.

## 4 — Language scoping

The core cross-flavor guarantee: a prefix appears **only** in its mapped language.

- [ ] `scratch.html` — `ns-button` **appears**. ✅
- [ ] `scratch.xml` — `ns-button` **appears**. ✅
- [ ] `scratch.vue` (inside `<template>`) — `ns-button` **appears**. ✅
- [ ] `scratch.tsx` (inside the returned JSX) — `ns-button` **appears**. ✅
- [ ] `scratch.jsx` (inside the returned JSX) — `ns-button` **appears**. ✅
- [ ] `scratch.svelte` — `ns-button` **appears**. ✅
- [ ] **`negative.ts`** — type `ns-button` / `ns-` → **none** of this extension's snippets
      appear (TypeScript is not a contributed language). ✅
- [ ] **`negative.json`** — type `ns-button` → **none** appear. ✅
- [ ] **Icons are Angular/Core only** — `ns-icon-done` **appears** in `scratch.html` and
      `scratch.xml`, but is **absent** in `scratch.vue`, `scratch.tsx`, `scratch.jsx`,
      `scratch.svelte`.

## 5 — Tag-case sanity (cross-flavor preview)

Confirm the one structural divergence that the per-flavor checklists drill into:

- [ ] `scratch.html` / `scratch.xml` / `scratch.vue` — `ns-button` → **`<Button>`**
      (PascalCase, first letter capital).
- [ ] `scratch.tsx` / `scratch.jsx` / `scratch.svelte` — `ns-button` → **`<button>`**
      (first letter lowercased). This is the React/Svelte element convention.

---

## 6 — Sign-off

Tester: ____________________  ·  Date: ____________  ·  Extension version: __________

**Case counts** (this checklist):

| § | Section | Cases |
|---|---------|------:|
| 1 | IntelliSense trigger & accept | 6 |
| 2 | Variant model (structural) | 5 |
| 3 | Tab-stop semantics | 7 |
| 4 | Language scoping | 9 |
| 5 | Tag-case sanity | 2 |
| | **Total** | **29** |

- [ ] All cases above pass on the target build.
