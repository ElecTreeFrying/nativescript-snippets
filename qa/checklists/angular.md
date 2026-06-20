# QA Checklist — angular flavor

> **These `[ ]` boxes are for the human tester** running the Extension Development
> Host (press **F5**, then **File > Open Folder → `qa/workspace/`**). Tick each box
> as you verify it by hand. They are *not* generation tasks.
>
> **Assumes `general.md` has already passed.** This checklist tests only the
> **angular DELTA** — the things that differ from the other four flavors: PascalCase
> tags, the `name="…"` / `(name)="…"` attribute syntax, Angular **two-way** `[(name)]`
> binding, the `<!-- … -->` doc-comment delimiter, the iOS icon snippets (Angular +
> Core only), and the Angular-only / extra elements. It does **not** re-test the
> flavor-neutral trigger mechanics, the variant model, tab-stop semantics, language
> scoping, or the cross-flavor tag-case preview — `general.md` owns those.

## angular at a glance

| Aspect | Behavior |
|--------|----------|
| **Language id(s)** | `html` |
| **Tag case** | **PascalCase** — tag is left unchanged (`ns-button` → `<Button>`). |
| **Property syntax** | `name="${n:hint}"` (double-quoted attribute, one per line). |
| **Event syntax** | `(name)="${n}"` (Angular event binding). |
| **Two-way binding** | **YES** — `[(name)]="${n}"` when the element emits an exact `<prop>Change` event (e.g. Slider `value`, TextField/TextView `text`, Switch `checked`, DatePicker `date`, TimePicker `time`, ListPicker `selectedIndex`). |
| **Gesture syntax** | `(tap)="$0"` — 8 gesture fragments. |
| **Icons** | **YES** — `ns-icon-<name>` (24 icons); body is a plain number string. |
| **Excluded / extra elements** | No exclusions. **Extra:** `NavigationButton`, `SplitView`, and `ActionBarExtension` (**Angular-only**). |

This flavor ships **182** snippets.

## How to trigger / Resetting between cases

Trigger and reset exactly as in `general.md` (open a scratch file of the target
language, type the `ns-*` prefix on the "type here" line, accept with
<kbd>Tab</kbd>/<kbd>Enter</kbd>, then <kbd>Cmd</kbd>+<kbd>Z</kbd> to remove the
insertion before the next case). All fixtures here are `html` (Angular scope). This
checklist does not re-explain the mechanics — see `general.md §1` and its "Resetting
between cases" note.

## Fixtures — `qa/workspace/angular/`

```
angular/
├── home.component.html          primary scratch — bare / -prop / -comp / layouts / gestures
├── forms.component.html         two-way binding & event-naming delta (Slider/TextField/SegmentedBar)
└── action-bar.component.html    icons, event syntax, Angular-only / extra elements
```

`home.component.html`
```html
<!-- Angular flavor (language id: html) — NativeScript {N} + Angular template.
     Put the cursor on a blank line below and type an ns-* prefix
     (e.g. ns-button, ns-button-prop, ns-button-comp, ns-stack-layout-snippet-1,
     ns-tap, ns-icon-done), then accept the completion and verify the
     inserted text + tab stops. Undo (Cmd+Z) after each case. -->
<GridLayout rows="auto, *" columns="*">

  <!-- type here -->

</GridLayout>
```

`forms.component.html`
```html
<!-- Angular flavor (language id: html) — two-way binding & event-naming delta.
     Type the -prop / -comp prefixes for the form widgets below on a blank
     line and verify which props become [(banana-in-a-box)] vs plain attrs:
       ns-slider-prop          -> [(value)]="${3:number}"   (two-way)
       ns-text-field-prop      -> [(text)]="${27:string}"   (two-way)
       ns-segmented-bar-prop   -> selectedIndex="${3:number}" (ONE-way!)
     Accept, inspect, then Undo (Cmd+Z) after each case. -->
<StackLayout>

  <!-- type here -->

</StackLayout>
```

`action-bar.component.html`
```html
<!-- Angular flavor (language id: html) — ActionBar, icons & Angular-only elements.
     Type these on a blank line and verify the expansions:
       ns-icon-done            -> 0          (plain numeric body, no tab stop)
       ns-icon-search          -> 12
       ns-action-item-comp     -> ... (tap)="${5}" ...   (event in (name) syntax)
       ns-navigation-button    -> <NavigationButton></NavigationButton>
       ns-action-bar-extension -> <ActionBarExtension></ActionBarExtension>  (Angular-only)
     Accept, inspect, then Undo (Cmd+Z) after each case. -->
<ActionBar title="Demo">

  <!-- type here -->

</ActionBar>
```

---

## 1 — Bare variant & PascalCase tag

Use `home.component.html`. The bare `ns-<name>` inserts the open/close tag with `$0`
between. The angular delta vs React/Svelte: the tag's **first letter stays capital**.

- [ ] `ns-button` → `<Button>$0</Button>` — PascalCase, capital `B` (React/Svelte would lowercase to `<button>`).
- [ ] `ns-label` → `<Label>$0</Label>`.
- [ ] `ns-text-field` → `<TextField>$0</TextField>` — multi-word tag stays PascalCase, no hyphen.
- [ ] `ns-segmented-bar-item` → `<SegmentedBarItem>$0</SegmentedBarItem>` — three-word PascalCase.

## 2 — `-prop` variant (property attribute syntax)

Use `home.component.html`. `ns-<name>-prop` opens the tag, then **one property per
line** as `name="${n:hint}"`, closing with `>$0</Tag>`. **`ns-button-prop` is the
canonical example** — accept it and confirm the full body:

- [ ] `ns-button-prop` inserts exactly:

```html
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

- [ ] **Attribute syntax is `name="…"`** — each line is a double-quoted attribute, not a JSX `{…}` brace, not a Svelte `name={…}`, not a colon binding.
- [ ] **Enum hints render as `(a|b|c)`** — e.g. `fontStyle="${3:(normal|italic)}"` and `textAlignment="${16:(center|left|right|justify)}"` show the pipe-delimited choices, not the type name.
- [ ] **Final stop is `$0`** between `>` and `</Button>` (no stray `${…}` after the last numbered attribute).
- [ ] A second element confirms the pattern generalizes: `ns-progress-prop` →

```html
<Progress
	maxValue="${1:number}"
	value="${2:number}">$0</Progress>
```

## 3 — `-comp` variant (props + events + `<!-- … -->` doc comment)

Use `home.component.html`. `ns-<name>-comp` = the `-prop` body **plus** event
attributes in `(name)="${n}"` syntax **plus** a trailing `<!-- … -->` doc-comment
block listing `Properties`, `Events`, and a `+ N inherited View properties … and M
events …` line. **`ns-button-comp` is the canonical example.**

- [ ] `ns-button-comp` — its property block is identical to §2, then it appends the event attribute **and** the doc comment. Confirm the tail (after the `whiteSpace` attribute) reads exactly:

```html
	whiteSpace="${23:(nowrap|wrap|normal)}"
	(tap)="${24}">$0</Button>
<!--
Properties
  fontFamily (string) — Gets or sets font-family style property.
  fontSize (number) — Gets or sets font-size style property.
  ...
  whiteSpace (WhiteSpaceType) — Gets or sets white space style property.

Events
  tap

+ 110 inherited View properties (id, class, width, height, margin, backgroundColor, visibility, ...) and 12 events (loaded, unloaded, layoutChanged, ...).
-->
```

- [ ] **Event attribute uses `(name)="${n}"`** — `(tap)="${24}"` (parenthesized event name, Angular binding), not `on:tap`, not `onTap`, not `(tap)` bare.
- [ ] **Doc-comment delimiter is `<!-- … -->`** (HTML comment), opening on its own line right after the closing `</Button>`, and ending with `-->`.
- [ ] **Inherited-count line present** — `+ 110 inherited View properties (...) and 12 events (...).` appears as the last line before `-->`.
- [ ] An element with **multiple** events confirms each gets its own `(name)="${n}"` line: `ns-web-view-comp` ends its tag with `(loadFinished)="${4}"` then `(loadStarted)="${5}">$0</WebView>`, and its comment has an `Events` block listing `loadFinished` / `loadStarted`.
- [ ] A **zero-property** element still renders the comment skeleton: `ns-placeholder-comp` →

```html
<Placeholder
	(creatingView)="${1}">$0</Placeholder>
<!--
Properties

Events
  creatingView

+ 118 inherited View properties (id, class, width, height, margin, backgroundColor, visibility, ...) and 12 events (loaded, unloaded, layoutChanged, ...).
-->
```

## 4 — Ready-made layout examples (`-snippet-N`)

Use `home.component.html`. Layouts contribute complete fill-free examples. These are
finished markup, **no tab stops** (no `${…}`, just a `$0` is also absent — the body is
literal child elements).

- [ ] `ns-stack-layout-snippet-1` inserts exactly (and contains **no** `${…}` / `$0`):

```html
<StackLayout orientation="vertical" width="210" height="210" backgroundColor="lightgray">
  <Label text="Label 1" width="50" height="50" backgroundColor="red"></Label>
  <Label text="Label 2" width="50" height="50" backgroundColor="green"></Label>
  <Label text="Label 3" width="50" height="50" backgroundColor="blue"></Label>
  <Label text="Label 4" width="50" height="50" backgroundColor="yellow"></Label>
</StackLayout>
```

- [ ] `ns-grid-layout-snippet-1` inserts the 7-`<Label>` grid example (`columns="50, auto, *"` `rows="50, auto, *"`), again with **no tab stops**.
- [ ] **Bare layout differs from the example** — `ns-stack-layout` (bare) is the small `<StackLayout>` ⏎ `\t$0` ⏎ `</StackLayout>` form with a tab stop; `ns-stack-layout-snippet-1` is the finished example. Confirm they are distinct items.

## 5 — Gesture fragments

Use `home.component.html` (place the cursor inside an element's open tag, or on a blank
line to inspect the raw fragment). Each `ns-<gesture>` inserts a single Angular event
binding `(name)="$0"`. All 8:

- [ ] `ns-tap` → `(tap)="$0"`
- [ ] `ns-doubleTap` → `(doubleTap)="$0"`
- [ ] `ns-longPress` → `(longPress)="$0"`
- [ ] `ns-swipe` → `(swipe)="$0"`
- [ ] `ns-pan` → `(pan)="$0"`
- [ ] `ns-pinch` → `(pinch)="$0"`
- [ ] `ns-rotation` → `(rotation)="$0"`
- [ ] `ns-touch` → `(touch)="$0"`

> Note the gesture prefixes are **camelCase** (`ns-doubleTap`, `ns-longPress`), matching
> the JSON keys — not hyphenated.

## 6 — Icons (`ns-icon-<name>`, Angular + Core only)

Use `action-bar.component.html`. Each `ns-icon-<name>` inserts a **plain numeric
string** (the `ios.systemIcon` value) — no tag, no tab stop. These ship to Angular and
Core only (their absence in Vue/React/Svelte is asserted in `general.md §4`). Spot-check
a representative set:

- [ ] `ns-icon-done` → `0`
- [ ] `ns-icon-cancel` → `1`
- [ ] `ns-icon-edit` → `2`
- [ ] `ns-icon-search` → `12`
- [ ] `ns-icon-trash` → `16`
- [ ] `ns-icon-pageCurl` → `23` (the last / highest-numbered icon — confirms all 24 are present, 0–23).
- [ ] The inserted body is the **bare number only** (e.g. typing `ns-icon-done` and accepting yields `0`, not `done` or `<… icon="0">`); it is meant to fill an `ActionItem` `icon="…"` attribute.

## 7 — Two-way binding & event-naming delta

Use `forms.component.html`. This is the heart of the angular delta. In **`-prop`**, a
property whose element emits an **exact `<prop>Change` event** is rendered as Angular
two-way `[(name)]="${n}"`; everything else stays a plain `name="${n}"`. In **`-comp`**,
two-way is dropped (the prop becomes plain) and the `Change` event is listed separately.

**Two-way props in `-prop` (banana-in-a-box):**

- [ ] `ns-slider-prop` — `value` is two-way: the body's 3rd attribute is `[(value)]="${3:number}"` (Slider emits `valueChange`). The other two (`maxValue`, `minValue`) stay plain `name="…"`.
- [ ] `ns-text-field-prop` — `text` is two-way: `[(text)]="${27:string}"` appears in the body (TextField emits `textChange`).
- [ ] `ns-switch-prop` → `<Switch` ⏎ `[(checked)]="${1:boolean}"` ⏎ `offBackgroundColor="${2:Color}">$0</Switch>` — `checked` is two-way (`checkedChange`), `offBackgroundColor` is plain.
- [ ] `ns-date-picker-prop` — first attribute is `[(date)]="${1:Date}"` (DatePicker emits `dateChange`); `ns-time-picker-prop` — `[(time)]="${9:Date}"`.
- [ ] `ns-list-picker-prop` — `selectedIndex` **is** two-way here: `[(selectedIndex)]="${2:number}"` (ListPicker emits `selectedIndexChange`, exact `<prop>Change`).

**The contrast — `selectedIndexChanged` is NOT `selectedIndexChange`:**

- [ ] `ns-segmented-bar-prop` → `selectedIndex="${3:number}"` stays **ONE-way** (plain attribute, no `[( )]`). SegmentedBar emits `selectedIndexChanged` (past tense), which is *not* the exact `<prop>Change` name, so no two-way binding is generated. **This is the key angular-vs-Svelte divergence** — verify there is **no** `[(selectedIndex)]` here.
- [ ] `ns-tab-view-prop` → same as SegmentedBar: `selectedIndex="${11:number}"` is **plain** (TabView also emits `selectedIndexChanged`).

**`-comp` drops two-way and lists the event:**

- [ ] `ns-slider-comp` — in the complete variant `value` is the **plain** `value="${3:number}"` (no `[( )]`), and the event `(valueChange)="${6}"` appears as a separate event attribute; the doc comment lists `valueChange` under `Events`.
- [ ] `ns-segmented-bar-comp` — `selectedIndex="${3:number}"` plain, then `(selectedIndexChanged)="${5}"` as the event, and `selectedIndexChanged` under `Events` in the comment.

## 8 — Excluded / extra elements

Use `action-bar.component.html`. Angular has **no exclusions**, and three elements are
present that some other flavors omit (one is Angular-only). Confirm each is offered and
expands:

- [ ] `ns-navigation-button` → `<NavigationButton>$0</NavigationButton>` (present; the `-prop` adds `text` / `icon`).
- [ ] `ns-split-view` → `<SplitView>$0</SplitView>` (present in Angular; `ns-split-view-prop` includes the `displayMode="${2:(automatic|secondaryOnly|...)}"` enum).
- [ ] `ns-action-bar-extension` → `<ActionBarExtension>$0</ActionBarExtension>` — **Angular-only** element; its description text begins "Angular-only." Confirm it appears here.
- [ ] `ns-action-bar-extension-prop` and `ns-action-bar-extension-comp` both exist; `-prop` is the same bare `<ActionBarExtension>$0</ActionBarExtension>` (no own properties), and `-comp` appends the empty-`Properties` `<!-- … -->` skeleton with the inherited-count line.

---

## 9 — Sign-off

Tester: ____________________  ·  Date: ____________  ·  Extension version: __________

**Case counts** (this checklist; excludes everything owned by `general.md`):

| § | Section | Cases |
|---|---------|------:|
| 1 | Bare variant & PascalCase tag | 4 |
| 2 | `-prop` variant (property syntax) | 5 |
| 3 | `-comp` variant (events + `<!-- -->` comment) | 6 |
| 4 | Ready-made layout examples | 3 |
| 5 | Gesture fragments (8) | 8 |
| 6 | Icons (Angular + Core only) | 7 |
| 7 | Two-way binding & event-naming delta | 9 |
| 8 | Excluded / extra elements | 4 |
| | **Total** | **46** |

- [ ] All cases above pass on the target build.
