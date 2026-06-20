# QA Checklist — core flavor (`xml`)

> **These `[ ]` boxes are for the human tester** running the Extension Development
> Host (press **F5** from the project root, then **File > Open Folder →
> `qa/workspace/`**). Tick each box as you verify it by hand — they are *not*
> generation tasks.
>
> **Assumes `general.md` has already passed.** That checklist owns the flavor-neutral
> mechanics — the `ns-` prefix grammar, the bare/`-prop`/`-comp`/`-snippet-N` variant
> model, tab-stop semantics, IntelliSense trigger/accept, the `Source:` hover, and
> language scoping. This checklist tests **only the core DELTA**: PascalCase tags,
> Core's bare-attribute event syntax, the **absence** of two-way binding, the icon set,
> and the elements that are present/absent in this flavor's registry.

## core at a glance

| Aspect | Behavior |
|--------|----------|
| **Language id(s)** | `xml` |
| **Snippets shipped** | **179** (102 component + 45 layout + 8 gesture + 24 icon) |
| **Tag case** | **PascalCase** — tag unchanged from the model (`ns-button` → `<Button>`) |
| **Property syntax** | `name="${n:hint}"` (one attribute per line in `-prop`/`-comp`) |
| **Event syntax** | `name="${n}"` — **bare attribute, NO parentheses** (`tap="${24}"`) |
| **Two-way binding** | **None** — Core uses one-way attributes only (`value="${3:number}"`, never `[(value)]` / `bind:value`) |
| **Gesture syntax** | `tap="$0"` (8 gestures: tap, doubleTap, longPress, swipe, pan, pinch, rotation, touch) |
| **Icons** | **Yes** — `ns-icon-<name>` (24 icons), body is a plain number |
| **Extra elements** | `NavigationButton` present · `SplitView` present |
| **Excluded elements** | `ActionBarExtension` **absent** (Angular-only); no other exclusions |

## How to trigger

Open `qa/workspace/core/main-page.xml` (language id `xml`), put the cursor on a blank
"type here" line, type the prefix, accept with <kbd>Tab</kbd>/<kbd>Enter</kbd>. Full
trigger/accept mechanics live in **`general.md §1`** — not re-explained here.

**Resetting between cases (Cmd+Z).** After every accepted snippet press
<kbd>Cmd</kbd>+<kbd>Z</kbd> (mac) / <kbd>Ctrl</kbd>+<kbd>Z</kbd> to remove it before the
next case, so the scratch file stays near-empty. (See `general.md`.)

## Fixtures — `qa/workspace/core/`

```
core/
├── main-page.xml      primary scratch — all core cases (xml scope)
├── README.md          fixture map (not a test target)
└── CLAUDE.md          sync rule (not a test target)
```

`main-page.xml` is a minimal valid NativeScript `Page` with an `<ActionBar>` (for the
ActionItem / icon / NavigationButton cases) and a `<StackLayout>` (for everything
else). Each holds a blank "type here" line; nothing is pre-filled with a snippet under
test.

`qa/workspace/core/main-page.xml`
```xml
<!-- Core flavor (language id: xml) — NativeScript Page markup.
     This is the primary scratch file for checklists/core.md.
     Put the cursor on a blank "type here" line below and type an ns-* prefix
     (e.g. ns-button, ns-button-prop, ns-button-comp, ns-stack-layout-snippet-1,
     ns-tap, ns-icon-done), then accept the completion and verify the inserted
     text + tab stops. Press Cmd+Z (mac) / Ctrl+Z to reset after each case. -->
<Page xmlns="http://schemas.nativescript.org/tns.xsd">
  <ActionBar title="Core QA">

    <!-- type ActionBar children here (ns-action-item, ns-icon-*, ns-navigation-button) -->

  </ActionBar>
  <StackLayout>

    <!-- type here -->

  </StackLayout>
</Page>
```

---

## 1 — Bare variant (tag-case proof)

The bare `ns-<name>` inserts the element with the tag **unchanged from the model**:
**PascalCase**, first letter capital. (React/Svelte would lowercase the first letter —
Core does **not**.) `Cmd+Z` after each.

- [ ] `ns-button` → `<Button>$0</Button>` — capital **B** (NOT `<button>`).
- [ ] `ns-label` → `<Label>$0</Label>`.
- [ ] `ns-search-bar` → `<SearchBar>$0</SearchBar>` — multi-word tag keeps internal
      capitals (`SearchBar`), the prefix kebab-cases but the tag does not.
- [ ] `ns-stack-layout` → opens/closes on separate lines with the cursor indented inside:
      ```xml
      <StackLayout>
      	$0
      </StackLayout>
      ```
      *(bare **layout** shape — one literal tab before `$0`; component bares are single-line.)*

## 2 — `-prop` variant (one-way attributes, enum hints)

`ns-<name>-prop` emits the open tag with **every primary property on its own line** as a
`${n:hint}` tab-stop, no events, closing `>$0</Tag>`. Property attribute syntax is
`name="${n:hint}"`. **Canonical case — `ns-button-prop` in full:**

- [ ] `ns-button-prop` →
      ```xml
      <Button
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
      	whiteSpace="${23:(nowrap|wrap|normal)}">$0</Button>
      ```
- [ ] **Enum hints render as `(a|b|c)`** — in the body above, `fontStyle="${3:(normal|italic)}"`
      and `textAlignment="${16:(center|left|right|justify)}"` show the union inline, not a
      type name.
- [ ] **`-prop` has NO event attribute** — `ns-button-prop` ends at `whiteSpace` /
      `>$0</Button>`; there is **no** `tap=` line (events appear only in `-comp`).

## 3 — `-comp` variant (events in Core syntax + doc-comment)

`ns-<name>-comp` is `-prop` **plus** every event as a trailing attribute **plus** a
`<!-- ... -->` doc-comment listing Properties, Events, and the inherited-`View` tail.
**Event attribute syntax is bare `name="${n}"` — no parentheses.** Canonical case:

- [ ] `ns-button-comp` → identical attribute block to §2, then the **event attribute in
      Core syntax** `tap="${24}"` (bare — NOT `(tap)="${24}"` / `on:tap`), then the
      doc-comment block:
      ```xml
      	whiteSpace="${23:(nowrap|wrap|normal)}"
      	tap="${24}">$0</Button>
      <!--
      Properties
        fontFamily (string) — Gets or sets font-family style property.
        ...
        whiteSpace (WhiteSpaceType) — Gets or sets white space style property.

      Events
        tap

      + 110 inherited View properties (id, class, width, height, margin, backgroundColor, visibility, ...) and 12 events (loaded, unloaded, layoutChanged, ...).
      -->
      ```
- [ ] **Doc-comment delimiter is `<!-- ... -->`** (XML/HTML comment), opening on the line
      after `>$0</Button>` and closing with `-->`.
- [ ] **The `+ N inherited … and M events …` line is present** — `ns-button-comp` reads
      `+ 110 inherited View properties (...) and 12 events (...).`
- [ ] **Multi-event component** — `ns-text-field-comp` ends with **four** bare event
      attributes in order `blur="${36}"` / `focus="${37}"` / `returnPress="${38}"` /
      `textChange="${39}"`, and its `Events` block lists `blur`, `focus`, `returnPress`,
      `textChange`. None carry parentheses.

## 4 — Ready-made layout example (`ns-<layout>-snippet-N`)

Layout-only `ns-<layout>-snippet-N` inserts a **complete, finished example** with real
attribute values and child `<Label>`s — **no tab stops** (`$0`/`${n}` absent). `Cmd+Z` after.

- [ ] `ns-stack-layout-snippet-1` →
      ```xml
      <StackLayout orientation="vertical" width="210" height="210" backgroundColor="lightgray">
        <Label text="Label 1" width="50" height="50" backgroundColor="red"></Label>
        <Label text="Label 2" width="50" height="50" backgroundColor="green"></Label>
        <Label text="Label 3" width="50" height="50" backgroundColor="blue"></Label>
        <Label text="Label 4" width="50" height="50" backgroundColor="yellow"></Label>
      </StackLayout>
      ```
- [ ] **No tab stops** — after accepting, the cursor does **not** enter snippet mode; there
      is no `$0`/`${1}` to Tab through (it is a finished example, not a fill-in form).
- [ ] `ns-grid-layout-snippet-1` exists and expands to a complete 3×3 `<GridLayout
      columns="50, auto, *" rows="50, auto, *" ...>` example (spot-check a second layout).

## 5 — Gestures (8 fragments)

`ns-<gesture>` inserts a single **bare event-attribute fragment** `name="$0"` — no tag,
no parentheses, one stop at `$0`. Type each on a `<Button …>` attribute position (or
the blank line) and verify the exact body. `Cmd+Z` after each.

- [ ] `ns-tap` → `tap="$0"`
- [ ] `ns-doubleTap` → `doubleTap="$0"`
- [ ] `ns-longPress` → `longPress="$0"`
- [ ] `ns-swipe` → `swipe="$0"`
- [ ] `ns-pan` → `pan="$0"`
- [ ] `ns-pinch` → `pinch="$0"`
- [ ] `ns-rotation` → `rotation="$0"`
- [ ] `ns-touch` → `touch="$0"`

## 6 — Icons (`ns-icon-<name>`, 24 — Core HAS them)

Core is one of the two flavors that ship icons (Angular is the other). `ns-icon-<name>`
inserts the **numeric** `ios.systemIcon` value as a bare body — meant for an
`<ActionItem icon="...">`. Type on the `icon="…"` value position (or anywhere) and
verify the body is the exact number. `Cmd+Z` after each.

- [ ] `ns-icon-done` → `0`
- [ ] `ns-icon-cancel` → `1`
- [ ] `ns-icon-edit` → `2`
- [ ] `ns-icon-save` → `3`
- [ ] `ns-icon-add` → `4`
- [ ] `ns-icon-search` → `12`
- [ ] `ns-icon-trash` → `16`
- [ ] `ns-icon-pageCurl` → `23` (the highest-numbered icon — confirms the full 0–23 range ships).
- [ ] **Icon completions are available in `xml`** — typing `ns-icon-` in `main-page.xml`
      populates the list (contrast: Vue/React/Svelte show **no** `ns-icon-*` items).

## 7 — Flavor delta: one-way attributes only

Core has **no two-way binding syntax**. Two-way-capable props (e.g. `Slider.value`,
`TextField.text`, `Switch.checked`) are emitted as **plain one-way attributes** — there
is no `[(x)]` (Angular) or `bind:x` (Svelte) shape anywhere in this flavor.

- [ ] `ns-slider-prop` → its `value` attribute is the plain one-way `value="${3:number}"`
      (NOT `[(value)]="..."` / `bind:value`). Full body:
      ```xml
      <Slider
      	maxValue="${1:number}"
      	minValue="${2:number}"
      	value="${3:number}">$0</Slider>
      ```
- [ ] `ns-switch-prop` → `checked="${1:boolean}"` (plain attribute, no binding brackets).
- [ ] **Event naming uses the real event name** — `ns-switch-comp` ends with
      `checkedChange="${3}"` (the static `<event>Event` member name, bare), not
      `(checkedChange)` and not `checkedChangeEvent`.

## 8 — Excluded / extra elements

The core element registry differs from some other flavors. Confirm presence/absence by
typing the prefix in `main-page.xml`.

- [ ] **`ns-navigation-button` IS present** → `<NavigationButton>$0</NavigationButton>`
      (bare). `ns-navigation-button-prop` / `-comp` also resolve.
- [ ] **`ns-split-view` IS present** → `<SplitView>$0</SplitView>`. `ns-split-view-prop`
      expands with a `displayMode="${2:(automatic|secondaryOnly|...)}"` enum attribute.
- [ ] **`ns-action-bar-extension` is ABSENT** — typing it produces **no** completion from
      this extension (`ActionBarExtension` is Angular-only; it is not in the core registry).
- [ ] **`ns-action-item` IS present** → `<ActionItem>$0</ActionItem>`; `ns-action-item-comp`
      ends with the bare event `tap="${5}"` and lists `tap` under `Events`.

---

## 9 — Sign-off

Tester: ____________________  ·  Date: ____________  ·  Extension version: __________

**Case counts** (this checklist; excludes everything owned by `general.md`):

| § | Section | Cases |
|---|---------|------:|
| 1 | Bare variant (tag-case proof) | 4 |
| 2 | `-prop` variant (one-way, enum hints) | 3 |
| 3 | `-comp` variant (events + doc-comment) | 4 |
| 4 | Ready-made layout example | 3 |
| 5 | Gestures (8 fragments) | 8 |
| 6 | Icons (`ns-icon-*`) | 9 |
| 7 | Flavor delta — one-way attributes only | 3 |
| 8 | Excluded / extra elements | 4 |
| | **Total** | **38** |

- [ ] All cases above pass on the target build.
