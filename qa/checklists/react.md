# QA Checklist — react flavor

> **These `[ ]` boxes are for the human tester** (press **F5**, then **File > Open
> Folder → `qa/workspace/`**). Tick each as you verify it by hand. **Assumes
> `general.md` has already passed** — this checklist tests only the **react DELTA**
> (tag case, event syntax, no two-way binding, icon absence, excluded elements). It
> does not re-test the trigger mechanics, the variant model, tab-stop semantics, or
> language scoping that `general.md` owns.

## react at a glance

| Aspect | Behavior |
|--------|----------|
| **Language id(s)** | `typescriptreact` (`.tsx`) **and** `javascriptreact` (`.jsx`) — the **same** `snippets/react/*.json` is mapped to both |
| **Tag case** | **lowercase-first (camel)** — `ns-button` → `<button>`, `ns-stack-layout` → `<stackLayout>` |
| **Prop syntax** | `name="${n:hint}"` |
| **Event syntax** | `on<Cap>={${n}}` — `tap` → `onTap={${n}}`, `checkedChange` → `onCheckedChange={${n}}` |
| **Two-way binding** | **none** — React has no two-way shape; Slider `value` is a plain `value="${3:number}"` |
| **Gesture syntax** | `on<Cap>={$0}` — e.g. `onTap={$0}` (8 gestures) |
| **Icons** | **no** — `ns-icon-*` are **absent** in React |
| **Excluded / extra** | `SplitView`, `RootLayout`, `Repeater`, `NavigationButton` are **absent** from the React registry |

This flavor ships **143** snippets (components 93, layouts 42, gestures 8).

## How to trigger

Open `qa/workspace/react/Home.tsx` (or `Home.jsx`), put the cursor on the blank
`{/* type here */}` line **inside the returned JSX**, type the `ns-*` prefix, and accept
with <kbd>Tab</kbd>/<kbd>Enter</kbd>. See `general.md` for the full trigger + IntelliSense
mechanics — not repeated here.

**Resetting between cases (`Cmd+Z`).** After every accepted snippet press
<kbd>Cmd</kbd>+<kbd>Z</kbd> (mac) / <kbd>Ctrl</kbd>+<kbd>Z</kbd> to remove it before the
next case, so the scratch file stays near-empty (cross-ref `general.md`).

## Fixtures — `qa/workspace/react/`

```
react/
├── Home.tsx    Primary scratch — language id typescriptreact (.tsx); all sections
└── Home.jsx    Twin scratch    — language id javascriptreact (.jsx); same cases, parity
```

`react/Home.tsx`
```tsx
// React flavor (language id: typescriptreact) — NativeScript-React (JSX).
// Put the cursor on a blank "type here" line inside the returned JSX and type
// an ns-* prefix, then accept the completion.
//
// Tag case is LOWERCASE-FIRST: ns-button -> <button>, ns-stack-layout -> <stackLayout>.
// Events are onTap={...} / onCheckedChange={...}. There is NO two-way binding.
// React has NO icon snippets (ns-icon-* must NOT appear).
export function Home() {
  return (
    <stackLayout>

      {/* type here */}

    </stackLayout>
  );
}
```

`react/Home.jsx`
```jsx
// React flavor (language id: javascriptreact) — same snippets as Home.tsx.
// Both .tsx and .jsx map to the SAME react snippet files in package.json,
// so every case in react.md should behave identically here.
//
// Put the cursor on a blank "type here" line inside the returned JSX, type an
// ns-* prefix, accept. Tag case is LOWERCASE-FIRST (<button>, <stackLayout>);
// events are onTap={...}; NO two-way binding; NO icon snippets (ns-icon-*).
export function Home() {
  return (
    <stackLayout>

      {/* type here */}

    </stackLayout>
  );
}
```

---

## 1 — Bare variant (tag-case proof)

The headline React delta: the **first letter of the tag is lowercased**. Use `Home.tsx`,
cursor on the `{/* type here */}` line. `Cmd+Z` after each.

- [ ] `ns-button` → `<button>$0</button>` — lowercase `<button>`, **not** `<Button>`.
- [ ] `ns-switch` → `<switch>$0</switch>` — lowercase `<switch>`.
- [ ] `ns-label` → `<label>$0</label>` — lowercase `<label>`.
- [ ] `ns-stack-layout` (layout, multi-line) →
      ```tsx
      <stackLayout>
      	$0
      </stackLayout>
      ```
      lowercase `<stackLayout>`, cursor indented on the inner line.

## 2 — `-prop` variant

Every primary property becomes a numbered `name="${n:hint}"` tab-stop; enum types render
as `(a|b|c)` hints. `Home.tsx`, `Cmd+Z` after each.

- [ ] `ns-button-prop` (canonical — verify the **full** body) →
      ```tsx
      <button
      	fontFamily="${1:string}"
      	fontSize="${2:number}"
      	fontStyle="${3:(normal|italic)}"
      	fontWeight="${4:(normal|100|200|300|400|500|600|bold|700|800|900|number)}"
      	formattedText="${5:FormattedString}"
      	iosTextAnimation="${6:boolean}"
      	letterSpacing="${7:number}"
      	lineHeight="${8:number}"
      	maxLines="${9:number}"
      	padding="${10:number}"
      	paddingBottom="${11:(auto|number)}"
      	paddingLeft="${12:(auto|number)}"
      	paddingRight="${13:(auto|number)}"
      	paddingTop="${14:(auto|number)}"
      	text="${15:string}"
      	textAlignment="${16:(center|left|right|justify)}"
      	textDecoration="${17:(none|underline|line-through|underline line-through)}"
      	textOverflow="${18:(clip|ellipsis)}"
      	textShadow="${19:0 2 4 #00000088}"
      	textStroke="${20:1 #000000}"
      	textTransform="${21:(none|capitalize|uppercase|lowercase)}"
      	textWrap="${22:boolean}"
      	whiteSpace="${23:(nowrap|wrap|normal)}">$0</button>
      ```
      Tag is lowercase `<button>`; enum hints (e.g. `fontStyle`, `textAlignment`) render as
      `(a|b|c)`; closes with `>$0</button>`.
- [ ] `ns-slider-prop` (two-way delta — `value` is a **plain** prop, NOT a binding) →
      ```tsx
      <slider
      	maxValue="${1:number}"
      	minValue="${2:number}"
      	value="${3:number}">$0</slider>
      ```
      `value="${3:number}"` — a normal attribute, **no** two-way wrapper (Angular `[(value)]`
      / Svelte `bind:value` shapes do **not** appear in React).

## 3 — `-comp` variant

`-comp` = `-prop` **plus** event attribute(s) in `on<Cap>={${n}}` form **plus** a trailing
`{/* … */}` doc comment listing Properties, Events, and the inherited-View line. `Home.tsx`,
`Cmd+Z` after each.

- [ ] `ns-button-comp` → identical to `ns-button-prop` through `whiteSpace`, then the **event
      attribute** `onTap={${24}}` before the close, then the JSX doc comment:
      ```tsx
      	whiteSpace="${23:(nowrap|wrap|normal)}"
      	onTap={${24}}>$0</button>
      {/*
      Properties
        fontFamily (string) — Gets or sets font-family style property.
        … (one line per property) …
        whiteSpace (WhiteSpaceType) — Gets or sets white space style property.

      Events
        tap

      + 110 inherited View properties (id, class, width, height, margin, backgroundColor, visibility, ...) and 12 events (loaded, unloaded, layoutChanged, ...).
      */}
      ```
      Confirm: event is `onTap={${24}}` (React syntax, **not** `(tap)=` / `on:tap`); the
      doc-comment delimiter is `{/*` … `*/}`; the inherited line reads **"+ 110 inherited View
      properties … and 12 events …"**.
- [ ] `ns-switch-comp` → ends with the event attribute `onCheckedChange={${3}}` →
      `onCheckedChange={${3}}>$0</switch>` (the `checkedChange` event renders as
      `onCheckedChange` — capitalized first letter, `on` prefix). Followed by its own
      `{/* Properties / Events / + N inherited … */}` block.

## 4 — Ready-made layout example (`-snippet-N`)

Layouts ship complete fill-free examples. `Home.tsx`, `Cmd+Z` after.

- [ ] `ns-stack-layout-snippet-1` →
      ```tsx
      <stackLayout orientation="vertical" width="210" height="210" backgroundColor="lightgray">
        <label text="Label 1" width="50" height="50" backgroundColor="red"></label>
        <label text="Label 2" width="50" height="50" backgroundColor="green"></label>
        <label text="Label 3" width="50" height="50" backgroundColor="blue"></label>
        <label text="Label 4" width="50" height="50" backgroundColor="yellow"></label>
      </stackLayout>
      ```
      All tags lowercase-first (`<stackLayout>`, `<label>`); it is a finished example with
      **no tab stops** (no `${n}` / `$0`).

## 5 — Gestures (8)

Each gesture is a single binding fragment in `on<Cap>={$0}` form. `Home.tsx`, `Cmd+Z` after each.

- [ ] `ns-tap` → `onTap={$0}`
- [ ] `ns-doubleTap` → `onDoubleTap={$0}`
- [ ] `ns-longPress` → `onLongPress={$0}`
- [ ] `ns-swipe` → `onSwipe={$0}`
- [ ] `ns-pan` → `onPan={$0}`
- [ ] `ns-pinch` → `onPinch={$0}`
- [ ] `ns-rotation` → `onRotation={$0}`
- [ ] `ns-touch` → `onTouch={$0}`

## 6 — Icons are absent

React ships **no** `ns-icon-*` snippets (icons are Angular/Core only). Confirm absence in
**both** mapped languages.

- [ ] `Home.tsx` — type `ns-icon-done` (and `ns-icon-`) → **no** `ns-icon-*` completion appears.
- [ ] `Home.jsx` — type `ns-icon-done` (and `ns-icon-`) → **no** `ns-icon-*` completion appears.

## 7 — Flavor delta (event naming & no two-way)

The React-specific event/binding shapes, isolated. `Home.tsx`, `Cmd+Z` after each.

- [ ] **`tap` → `onTap`** — `ns-tap` (or the `onTap={${24}}` line in `ns-button-comp`) uses the
      `on` + Capitalized-first form `onTap`, never `(tap)=` (Angular) / `on:tap` (Svelte).
- [ ] **`checkedChange` → `onCheckedChange`** — `ns-switch-comp` emits `onCheckedChange={${3}}`
      (compound event name keeps internal caps, gains `on` prefix).
- [ ] **no two-way** — `ns-slider-prop` emits `value="${3:number}"` as a plain attribute; there
      is **no** `[(value)]` / `bind:value` / `value={…}`-twoway shape anywhere in React.

## 8 — Excluded / extra elements

A few elements are intentionally **absent** from the React registry; common ones are present.
`Home.tsx`, Escape after each (nothing to insert for the absent ones).

- [ ] `ns-split-view` → **no** completion (`SplitView` excluded from React).
- [ ] `ns-root-layout` → **no** completion (`RootLayout` excluded from React).
- [ ] `ns-repeater` → **no** completion (`Repeater` excluded from React).
- [ ] `ns-navigation-button` → **no** completion (`NavigationButton` absent — React not in its flavor list).
- [ ] Sanity: `ns-button`, `ns-stack-layout`, `ns-flexbox-layout` **do** appear (the registry is
      otherwise populated — the absences above are deliberate, not a broken contribution).

## 9 — `.tsx` / `.jsx` parity

The same snippet files are mapped to both language ids; confirm a few cases behave identically
in `Home.jsx`. `Cmd+Z` after each.

- [ ] `Home.jsx` — `ns-button` → `<button>$0</button>` (identical to §1, lowercase tag).
- [ ] `Home.jsx` — `ns-button-comp` → identical body to §3 (same `onTap={${24}}` event and
      `{/* … */}` doc comment) — proves `javascriptreact` resolves the same `snippets/react/*.json`.

---

## Sign-off

Tester: ____________________  ·  Date: ____________  ·  Extension version: __________

**Case counts** (this checklist; excludes everything owned by `general.md`):

| § | Section | Cases |
|---|---------|------:|
| 1 | Bare variant (tag-case proof) | 4 |
| 2 | `-prop` variant | 2 |
| 3 | `-comp` variant | 2 |
| 4 | Ready-made layout example | 1 |
| 5 | Gestures (8) | 8 |
| 6 | Icons are absent | 2 |
| 7 | Flavor delta (event naming & no two-way) | 3 |
| 8 | Excluded / extra elements | 5 |
| 9 | `.tsx` / `.jsx` parity | 2 |
| | **Total** | **29** |

- [ ] All cases above pass on the target build.
