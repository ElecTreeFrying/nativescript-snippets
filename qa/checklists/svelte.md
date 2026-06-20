# QA Checklist — svelte flavor

> **These `[ ]` boxes are for the human tester** (press **F5**, then **File > Open
> Folder → `qa/workspace/`**). Tick each box as you verify it by hand. **Assumes
> [`general.md`](general.md) has already passed** — this checklist tests only the
> **svelte DELTA** (lowercase-first tag case, `name="${n:hint}"` props, `on:name={…}`
> events, `bind:name={…}` two-way, gesture `on:gesture={$0}` fragments, the **absence**
> of icons, and the excluded/extra element set). It does **not** re-test the trigger
> mechanics, variant model, tab-stop semantics, language scoping, or tag-case sanity
> that `general.md` owns.

## svelte at a glance

| Aspect | Behavior |
|--------|----------|
| **Language id(s)** | `svelte` |
| **Tag case** | **lowercase-first (camel)** — `ns-button` → `<button>`, `ns-stack-layout` → `<stackLayout>` |
| **Property syntax** | `name="${n:hint}"` (double-quoted attribute, one per line) |
| **Event syntax** | `on:name={${n}}` (Svelte event directive with an empty `{…}` expression stop) |
| **Two-way binding** | **YES** — `bind:name={${n:hint}}`. Svelte `bind` covers **both** `<prop>Change` **and** `<prop>Changed` emitters (e.g. `Slider value` → `bind:value`; `SegmentedBar selectedIndex` → `bind:selectedIndex`, which emits `selectedIndexChanged`). |
| **Gesture syntax** | `on:gesture={$0}` — 8 gestures (tap, doubleTap, longPress, swipe, pan, pinch, rotation, touch); also fire **inside** an open tag (§5, via `svelte-start-tag`) |
| **Icons** | **NO** — `ns-icon-*` are **absent** in this flavor (Angular + Core only) |
| **Excluded element** | **`SplitView`** — `ns-split-view*` must **not** appear |
| **Extra element** | **`NavigationButton`** — `ns-navigation-button*` **is** present |

This flavor ships **152 snippets** (99 component + 45 layout + 8 gesture).

## How to trigger

Open `qa/workspace/svelte/Home.svelte`, put the cursor on the blank "type here" line,
type a prefix (e.g. `ns-button`), and accept with <kbd>Tab</kbd>/<kbd>Enter</kbd>. The
**Svelte** language extension must be installed or VS Code has no `svelte` language for
the snippets to attach to. Full trigger/accept mechanics are in **`general.md §1`** — not
repeated here.

**Resetting between cases (`Cmd+Z`).** After every accepted snippet press
<kbd>Cmd</kbd>+<kbd>Z</kbd> (mac) / <kbd>Ctrl</kbd>+<kbd>Z</kbd> to remove it before the
next case, so the scratch file stays near-empty. See **`general.md`**.

## Fixtures — `qa/workspace/svelte/`

```
svelte/
├── Home.svelte        primary scratch — bare / -prop / -comp / layout / gestures / icon-absence / excluded
└── Bindings.svelte    two-way + event-naming delta scratch (bind:* vs on:*Change/*Changed)
```

`qa/workspace/svelte/Home.svelte`
```svelte
<!-- Svelte flavor (language id: svelte) — NativeScript-Svelte component.
     Put the cursor on a blank line below and type an ns-* prefix
     (e.g. ns-button -> <button>, ns-stack-layout-snippet-1, ns-longPress),
     then accept the completion and verify the expansion + tab stops.
     Svelte has NO icon snippets (ns-icon-* must not appear). -->
<page>
  <stackLayout>

    <!-- type here -->

  </stackLayout>
</page>

<script>
  // component logic
</script>
```

`qa/workspace/svelte/Bindings.svelte`
```svelte
<!-- Svelte flavor (language id: svelte) — two-way / event-naming delta scratch.
     Use this file for the section that contrasts -prop two-way bindings
     (bind:value, bind:selectedIndex) against the -comp event attributes
     (on:valueChange, on:selectedIndexChanged). Put the cursor on a blank
     line below and type the -prop / -comp prefix under test. -->
<page>
  <stackLayout>

    <!-- type here -->

  </stackLayout>
</page>

<script>
  // component logic
</script>
```

---

## 1 — Bare variant (lowercase-first tag case)

The svelte registry lowercases the **first letter** of every tag. Type each prefix in
`Home.svelte`, accept, verify the **exact** body, then `Cmd+Z`.

- [ ] `ns-button` → `<button>$0</button>` (lowercase `b`, not `<Button>`).
- [ ] `ns-label` → `<label>$0</label>`.
- [ ] `ns-text-field` → `<textField>$0</textField>` (camel: lowercase first, capital `F`).
- [ ] `ns-activity-indicator` → `<activityIndicator>$0</activityIndicator>` (camel kept past the first letter).
- [ ] `ns-segmented-bar` → `<segmentedBar>$0</segmentedBar>`.
- [ ] `ns-stack-layout` → opens/closes on separate lines with the cursor indented inside:
      `<stackLayout>` ⏎ `\t$0` ⏎ `</stackLayout>` (layout bare bodies are multi-line).

## 2 — `-prop` variant (one attribute per line, enum hints)

`ns-button-prop` is the canonical example. Type it in `Home.svelte`, accept, verify the
**exact** body below (every attribute is `name="${n:hint}"`, one per line, closing with
`>$0</button>`), then `Cmd+Z`.

- [ ] `ns-button-prop` →
```svelte
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
- [ ] **Enum hints render as `(a|b|c)`** — in the body above, `fontStyle` is
      `${3:(normal|italic)}` and `textAlignment` is `${16:(center|left|right|justify)}`
      (a parenthesised pipe list, not an opaque type name).
- [ ] **`-prop` carries no event attribute** — `ns-button-prop` ends at the last property
      (`whiteSpace`) then `>$0</button>`; there is **no** `on:tap` line (events are `-comp` only).

## 3 — `-comp` variant (properties + event + `<!-- … -->` doc-comment)

`ns-button-comp` adds the event attribute in svelte syntax (`on:tap={${24}}`) and a
trailing `<!-- … -->` doc-comment block. Type it in `Home.svelte`, accept, verify, `Cmd+Z`.

- [ ] `ns-button-comp` → the same 23 property lines as §2, then the event attribute
      **`on:tap={${24}}>`** closing the tag, then the doc-comment:
```svelte
	whiteSpace="${23:(nowrap|wrap|normal)}"
	on:tap={${24}}>$0</button>
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
- [ ] **Event attribute uses svelte `on:` syntax** — the line is `on:tap={${24}}`
      (directive + `{…}` expression stop), **not** Angular's `(tap)="…"`.
- [ ] **Doc-comment delimiter is `<!-- … -->`** — the trailing block opens with `<!--` and
      closes with `-->`, and contains a `Properties` heading, an `Events` heading listing
      `tap`, and the `+ 110 inherited View properties (…) and 12 events (…)` summary line.
- [ ] **Multi-event `-comp`** — `ns-search-bar-comp` ends with two event lines
      `on:clear={${6}}` and `on:submit={${7}}`, and its doc-comment `Events` block lists
      both `clear` and `submit`.

## 4 — Ready-made layout example (`-snippet-N`)

Layout `-snippet-N` prefixes expand to a complete example with **no tab stops** (a
finished example, not a fill-in form). Type in `Home.svelte`, accept, verify, `Cmd+Z`.

- [ ] `ns-stack-layout-snippet-1` →
```svelte
<stackLayout orientation="vertical" width="210" height="210" backgroundColor="lightgray">
  <label text="Label 1" width="50" height="50" backgroundColor="red"></label>
  <label text="Label 2" width="50" height="50" backgroundColor="green"></label>
  <label text="Label 3" width="50" height="50" backgroundColor="blue"></label>
  <label text="Label 4" width="50" height="50" backgroundColor="yellow"></label>
</stackLayout>
```
- [ ] **No tab stops** — after accepting, the cursor does **not** enter a snippet field;
      there is no `${1}`/`$0` anywhere in the inserted text. Child tags are lowercase
      (`<stackLayout>`, `<label>`), confirming the svelte tag case extends to examples.

## 5 — Gestures (8 fragments, `on:gesture={$0}`)

Each gesture prefix expands to a single svelte event-directive fragment with the cursor
in the `{$0}` expression. Type in `Home.svelte`, accept, verify the **exact** body, `Cmd+Z`.

- [ ] `ns-tap` → `on:tap={$0}`
- [ ] `ns-doubleTap` → `on:doubleTap={$0}`
- [ ] `ns-longPress` → `on:longPress={$0}`
- [ ] `ns-swipe` → `on:swipe={$0}`
- [ ] `ns-pan` → `on:pan={$0}`
- [ ] `ns-pinch` → `on:pinch={$0}`
- [ ] `ns-rotation` → `on:rotation={$0}`
- [ ] `ns-touch` → `on:touch={$0}`

> The gesture prefixes keep their original camelCase (`ns-doubleTap`, `ns-longPress`) —
> they are **not** lowercased like tags.

**Inside an element's opening tag.** Unlike the other SFC flavors, svelte gestures are also
contributed to the `svelte-start-tag` language, so they expand **inside** a tag — not only in
the element-content region. In `Home.svelte`, place the cursor **inside** the `<stackLayout>`
opening tag (between `stackLayout` and `>`) and:

- [ ] `ns-tap` typed inside the open tag → the `on:tap={$0}` completion appears and expands in
      place. (In the other SFC flavors no `ns-*` snippet appears inside an open tag — this is a
      svelte-only affordance; see [SUPPORT.md](../../SUPPORT.md).) `Cmd+Z`.

## 6 — Two-way binding & event-naming delta

Svelte is the two-way flavor: a `-prop` body emits `bind:name={${n:hint}}` for any
property the element can two-way-bind, while the same property in the `-comp` body is a
plain `name="${n}"` attribute paired with its `on:…Change`/`on:…Changed` event. Use
`Bindings.svelte`; accept, verify, `Cmd+Z` after each.

- [ ] **`ns-slider-prop`** — the `value` line is **`bind:value={${3:number}}`** (two-way),
      sitting after `maxValue`, `minValue`.
- [ ] **`ns-slider-comp`** — the same `value` is a plain **`value="${3:number}"`**, and the
      event block adds `on:accessibilityDecrement={${4}}`, `on:accessibilityIncrement={${5}}`,
      `on:valueChange={${6}}` (the two-way collapses to a property + `valueChange` event).
- [ ] **`ns-segmented-bar-prop`** — the `selectedIndex` line is
      **`bind:selectedIndex={${3:number}}`** even though the underlying emitter is the
      **`Changed`-suffixed** `selectedIndexChanged` (svelte `bind` covers both `Change` and
      `Changed` suffixes — contrast Angular, which keeps `selectedIndex` one-way).
- [ ] **`ns-segmented-bar-comp`** — `selectedIndex` is plain **`selectedIndex="${3:number}"`**
      and the event line is **`on:selectedIndexChanged={${5}}`** (note the `Changed` suffix),
      with the doc-comment `Events` block listing `selectedIndexChanged`.
- [ ] **`ns-switch-prop`** — the `checked` line is **`bind:checked={${1:boolean}}`**; the
      `ns-switch-comp` counterpart is plain `checked="${1:boolean}"` + `on:checkedChange={${3}}`.

## 7 — Icons are ABSENT in svelte

Icons ship only to Angular + Core. In `Home.svelte`:

- [ ] Type `ns-icon-done` → **no** completion item appears (no `ns-icon-*` snippet exists
      in this flavor).
- [ ] Type `ns-icon-` → the completion list shows **no** `ns-icon-*` entries at all.

## 8 — Excluded / extra elements

- [ ] **`SplitView` is excluded** — type `ns-split-view`, `ns-split-view-prop`,
      `ns-split-view-comp` in `Home.svelte` → **none** appear (svelte omits `SplitView`).
- [ ] **`NavigationButton` is present** — `ns-navigation-button` → `<navigationButton>$0</navigationButton>`
      (lowercase first); `ns-navigation-button-prop` and `ns-navigation-button-comp` also
      resolve.

---

## 9 — Sign-off

Tester: ____________________  ·  Date: ____________  ·  Extension version: __________

**Case counts** (this checklist; excludes everything owned by `general.md`):

| § | Section | Cases |
|---|---------|------:|
| 1 | Bare variant (lowercase-first tag case) | 6 |
| 2 | `-prop` variant (attribute lines + enum hints) | 3 |
| 3 | `-comp` variant (event attr + `<!-- … -->` doc-comment) | 4 |
| 4 | Ready-made layout example (`-snippet-N`) | 2 |
| 5 | Gestures (8 fragments + inside-tag) | 9 |
| 6 | Two-way & event-naming delta | 5 |
| 7 | Icons absent | 2 |
| 8 | Excluded / extra elements | 2 |
| | **Total** | **33** |

- [ ] All cases above pass on the target build.
