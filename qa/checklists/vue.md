# QA Checklist — vue flavor

> **These `[ ]` boxes are for the human tester** running the Extension Development
> Host (press **F5**, then **File > Open Folder → `qa/workspace/`**). Tick each box as
> you verify it by hand. They are *not* generation tasks.
>
> **Assumes `general.md` has already passed.** This checklist tests only the **vue
> DELTA** — the tag case, property/event attribute syntax, the absence of two-way
> binding, the gesture-fragment shape, the absence of icons, and the included/excluded
> elements specific to the Vue flavor. The flavor-neutral mechanics (IntelliSense
> trigger & accept, the `bare` / `-prop` / `-comp` / `-snippet-N` variant model,
> tab-stop ordering, the `Source:` hover, and language scoping) are owned by
> **`general.md`** and are not retested here.

## vue at a glance

| Aspect | Behavior |
|--------|----------|
| **Language id(s)** | `vue` |
| **Tag case** | **PascalCase** — tag unchanged (`ns-button` → `<Button>`) |
| **Property attribute** | `name="${n:hint}"` |
| **Event attribute** | `@name="${n}"` |
| **Two-way binding** | **None** — one-way attributes only (`Slider` value → `value="${3:number}"`, no `bind:` / `[(x)]`) |
| **Gesture fragment** | `@<gesture>="$0"` (8 gestures) |
| **Icons** | **No** — `ns-icon-*` is **absent** in Vue (Angular + Core only) |
| **Excluded elements** | `SplitView`, `Repeater` — **absent** in Vue |
| **Extra elements** | `NavigationButton` — **present** |

## How to trigger

Open a `.vue` fixture from `qa/workspace/vue/`, put the cursor on the blank
`<!-- type here -->` line **inside `<template>`**, type the prefix, and accept with
<kbd>Tab</kbd>/<kbd>Enter</kbd>. If the list does not pop automatically press
<kbd>Ctrl</kbd>+<kbd>Space</kbd>; the **Vue (Volar)** language extension must be
installed or VS Code has no `vue` language for the snippets to attach to. Full trigger
mechanics live in **`general.md §1`**.

**Resetting between cases (`Cmd+Z`).** After every accepted snippet press
<kbd>Cmd</kbd>+<kbd>Z</kbd> (mac) / <kbd>Ctrl</kbd>+<kbd>Z</kbd> to remove it before the
next case — see **`general.md`** ("Resetting between cases"). The scratch files are meant
to stay near-empty.

## Fixtures — `qa/workspace/vue/`

```
vue/
├── Home.vue        Primary scratch — bare / -prop / -comp / layout / gestures / icon-absence / excluded
└── Bindings.vue    Flavor-delta scratch — one-way attributes only (no two-way), event-attr syntax
```

`qa/workspace/vue/Home.vue`
```vue
<!-- Vue flavor (language id: vue) — NativeScript-Vue SFC.
     Put the cursor on a blank "type here" line inside <template> and type an
     ns-* prefix (e.g. ns-button, ns-button-prop, ns-button-comp, ns-swipe).
     Accept with Tab/Enter, then Cmd+Z before the next case.

     Vue facts this fixture proves:
       - PascalCase tags (ns-button -> <Button>)
       - property attrs  name="${n:hint}"
       - event attrs     @name="${n}"   (NO two-way binding)
       - NO icon snippets (ns-icon-* must NOT appear here). -->
<template>
  <Page>
    <ActionBar title="QA" />
    <StackLayout>

      <!-- type here -->

    </StackLayout>
  </Page>
</template>

<script>
export default {};
</script>
```

`qa/workspace/vue/Bindings.vue`
```vue
<!-- Vue flavor — scratch for the flavor-delta section (one-way attributes only).
     Use this file to confirm Vue has NO two-way binding shape:
       - ns-slider-prop  -> value="${3:number}"  (plain attribute, never bind:/[(x)])
       - ns-text-field-prop -> text="${27:string}"
     and to confirm event attrs use @name="${n}" (ns-button-comp -> @tap="${24}").

     Put the cursor on the blank "type here" line inside <template>. Cmd+Z after each. -->
<template>
  <Page>
    <StackLayout>

      <!-- type here -->

    </StackLayout>
  </Page>
</template>

<script>
export default {};
</script>
```

---

## 1 — Bare variant (tag-case proof)

Vue keeps the element name **PascalCase** — the tag is inserted exactly as the class is
named, no first-letter change (this is the divergence from React/Svelte, which lowercase
it). Use `Home.vue`; `Cmd+Z` after each.

- [ ] `ns-button` → `<Button>$0</Button>` — capital **B** (NOT `<button>`).
- [ ] `ns-stack-layout` → opens/closes on separate lines, cursor indented inside:
      `<StackLayout>` ⏎ `\t$0` ⏎ `</StackLayout>` — PascalCase **StackLayout**.
- [ ] `ns-web-view` → `<WebView>$0</WebView>` — multi-cap PascalCase preserved (`WebView`,
      not `webView` / `webview`).
- [ ] `ns-action-bar` → `<ActionBar>$0</ActionBar>`.

## 2 — `-prop` variant (one attribute per line, enum hints)

`ns-<name>-prop` emits the open tag with **one property per line**, each a numbered
`${n:hint}` tab-stop in `name="${n:hint}"` form, closing with `>$0</Tag>`. Enum-typed
properties render their hint as `(a|b|c)`. Use `Home.vue`; `Cmd+Z` after each.

- [ ] **`ns-button-prop`** (canonical) inserts exactly:

```vue
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

- [ ] **Enum hint renders as `(a|b|c)`** — confirm `fontStyle="${3:(normal|italic)}"` and
      `textAlignment="${16:(center|left|right|justify)}"` show the pipe-delimited choices,
      **not** an opaque type name.
- [ ] **All attributes use `name="${n:hint}"`** — every line is a quoted attribute; there is
      **no** `@`-prefixed event and **no** `bind:` / `[(…)]` two-way attribute in `-prop`.
- [ ] **`ns-scroll-view-prop`** spot-check — `orientation="${4:(horizontal|vertical)}"`
      appears as a `(a|b)` enum hint.

## 3 — `-comp` variant (properties + events + doc-comment)

`ns-<name>-comp` is `-prop` **plus** the element's events as `@name="${n}"` attributes,
**plus** a trailing `<!-- … -->` doc-comment listing `Properties`, `Events`, and the
`+ N inherited View properties … and M events …` line. Use `Home.vue`; `Cmd+Z` after each.

- [ ] **`ns-button-comp`** inserts the §2 `ns-button-prop` body with the event attribute
      `@tap="${24}"` appended before `>$0</Button>`, followed by the doc-comment. The tail
      of the insertion is exactly:

```vue
	whiteSpace="${23:(nowrap|wrap|normal)}"
	@tap="${24}">$0</Button>
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

- [ ] **Event attribute uses `@name="${n}"`** — confirm the appended line is `@tap="${24}"`
      (Vue `@`-event syntax), **not** `(tap)="…"` (Angular) nor `on:tap` (Svelte).
- [ ] **Multi-event `-comp`** — `ns-text-field-comp` appends **four** event attributes in
      order: `@blur="${36}"`, `@focus="${37}"`, `@returnPress="${38}"`, `@textChange="${39}"`.
      (Event names are the bare names — `blur`, not `blurEvent`.)
- [ ] **Doc-comment delimiter is `<!-- … -->`** — the trailing block opens with `<!--` and
      closes with `-->`, and contains the `+ N inherited View properties … and M events …`
      summary line (for `ns-button-comp`: `+ 110 inherited View properties … and 12 events …`).

## 4 — Ready-made layout example (`-snippet-N`)

Layout elements also expose complete, ready-to-use example layouts via
`ns-<layout>-snippet-N`. These are finished examples — **no tab stops**. Use `Home.vue`;
`Cmd+Z` after each.

- [ ] **`ns-stack-layout-snippet-1`** inserts exactly (note PascalCase `<StackLayout>` /
      `<Label>` and **no `${…}` / `$0` tab stops**):

```vue
<StackLayout orientation="vertical" width="210" height="210" backgroundColor="lightgray">
  <Label text="Label 1" width="50" height="50" backgroundColor="red"></Label>
  <Label text="Label 2" width="50" height="50" backgroundColor="green"></Label>
  <Label text="Label 3" width="50" height="50" backgroundColor="blue"></Label>
  <Label text="Label 4" width="50" height="50" backgroundColor="yellow"></Label>
</StackLayout>
```

- [ ] **`ns-grid-layout-snippet-1`** inserts a finished `<GridLayout columns="50, auto, *"
      rows="50, auto, *" …>` with seven child `<Label>`s and **no tab stops** (Tab does
      nothing inside it — it is not a fill-in form).

## 5 — Gestures (8 fragments)

Each gesture prefix inserts a single Vue event-binding fragment `@<gesture>="$0"` with the
cursor at `$0`. Use `Home.vue` (place the cursor inside an element's open tag, e.g. on a
blank attribute line); `Cmd+Z` after each.

- [ ] `ns-tap` → `@tap="$0"`
- [ ] `ns-doubleTap` → `@doubleTap="$0"`
- [ ] `ns-longPress` → `@longPress="$0"`
- [ ] `ns-swipe` → `@swipe="$0"`
- [ ] `ns-pan` → `@pan="$0"`
- [ ] `ns-pinch` → `@pinch="$0"`
- [ ] `ns-rotation` → `@rotation="$0"`
- [ ] `ns-touch` → `@touch="$0"`

> The gesture binding uses the **same `@name` syntax** as events (`@swipe`), never
> Angular's `(swipe)` nor Svelte's `on:swipe`.

## 6 — Flavor delta: one-way attributes only (no two-way)

The Vue flavor ships **no** two-way-binding shape. A property that is two-way-capable in
Angular (e.g. `Slider.value` → `[(value)]`) is emitted here as a **plain one-way
attribute**. Use `Bindings.vue`; `Cmd+Z` after each.

- [ ] **`ns-slider-prop`** inserts exactly — `value` is `value="${3:number}"`, a plain
      attribute (NOT `[(value)]`, NOT `bind:value`):

```vue
<Slider
	maxValue="${1:number}"
	minValue="${2:number}"
	value="${3:number}">$0</Slider>
```

- [ ] **`ns-text-field-prop`** — `text` appears as `text="${27:string}"` (a one-way
      attribute), with no two-way decoration anywhere in the body.
- [ ] **No `bind:` / `[(…)]` anywhere** — scan an inserted `-prop` or `-comp` body: there
      is no `bind:` prefix and no `[( )]` bracket pair; every property is `name="${n:…}"`
      and every event is `@name="${n}"`.

## 7 — Icons are absent in Vue

`ns-icon-*` snippets are contributed **only** to the Angular (`html`) and Core (`xml`)
flavors. They must **not** appear in `.vue`. Use `Home.vue`.

- [ ] Type `ns-icon-done` on the type-here line → **no** completion item is offered (the
      icon snippets are not contributed to `vue`).
- [ ] Type `ns-icon` → **no** `ns-icon-*` items appear at all (whereas `ns-` alone still
      lists the component/layout/gesture snippets).

## 8 — Included / excluded elements

A few elements differ from the other flavors' registries. Use `Home.vue`.

- [ ] **`NavigationButton` is present** — `ns-navigation-button` →
      `<NavigationButton>$0</NavigationButton>`; `ns-navigation-button-prop` and
      `ns-navigation-button-comp` also resolve.
- [ ] **`SplitView` is absent** — typing `ns-split-view` offers **no** completion
      (SplitView is Angular/Core only).
- [ ] **`Repeater` is absent** — typing `ns-repeater` offers **no** completion.
- [ ] **Spot-check present staples** — `ns-label`, `ns-image`, `ns-list-view`,
      `ns-tab-view`, `ns-frame`, `ns-page` all resolve to their PascalCase bare tags.

---

## 9 — Sign-off

Tester: ____________________  ·  Date: ____________  ·  Extension version: __________

**Case counts** (this checklist; excludes everything owned by `general.md`):

| § | Section | Cases |
|---|---------|------:|
| 1 | Bare variant (tag-case proof) | 4 |
| 2 | `-prop` variant (enum hints, attr syntax) | 4 |
| 3 | `-comp` variant (events + doc-comment) | 4 |
| 4 | Ready-made layout example (`-snippet-N`) | 2 |
| 5 | Gestures (8 fragments) | 8 |
| 6 | Flavor delta — one-way attributes only | 3 |
| 7 | Icons absent in Vue | 2 |
| 8 | Included / excluded elements | 4 |
| | **Total** | **31** |

- [ ] All cases above pass on the target build.
