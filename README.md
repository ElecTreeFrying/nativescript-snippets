# NativeScript Snippets

[![version][version-badge]][marketplace]
[![installs][installs-badge]][marketplace]
[![downloads][downloads-badge]][marketplace]
[![rating][rating-badge]][marketplace]
[![license][license-badge]][repo]
[![vscode][vscode-badge]][marketplace]

[version-badge]: https://vsmarketplacebadges.dev/version-short/ElecTreeFrying.nativescript-angular-html-snippets.png
[installs-badge]: https://vsmarketplacebadges.dev/installs-short/ElecTreeFrying.nativescript-angular-html-snippets.png
[downloads-badge]: https://vsmarketplacebadges.dev/downloads-short/ElecTreeFrying.nativescript-angular-html-snippets.png
[rating-badge]: https://vsmarketplacebadges.dev/rating-short/ElecTreeFrying.nativescript-angular-html-snippets.png
[license-badge]: https://img.shields.io/github/license/ElecTreeFrying/nativescript-snippets
[vscode-badge]: https://img.shields.io/badge/vscode-%3E%3D1.30.0-blue
[marketplace]: https://marketplace.visualstudio.com/items?itemName=ElecTreeFrying.nativescript-angular-html-snippets
[repo]: https://github.com/ElecTreeFrying/nativescript-snippets

> **Type `ns-`, get the element.** Every NativeScript UI component, layout, gesture, and iOS icon — as a snippet, in your flavor's syntax.

**Angular** · **Core (XML)** · **Vue** · **React** · **Svelte**

> **Built for `@nativescript/core` v9** — currently `9.0.20`.

Stop hand-typing `<StackLayout>`, memorizing which props a `ListView` takes, or rewriting the same markup when you switch frameworks. This pack ships every NativeScript element three ways — bare, with properties, and fully documented — for all five flavors, generated straight from `@nativescript/core` v9 types so the properties and events always match the framework.

![NativeScript Snippets — ns-switch expanding bare, then -prop, then -comp with IntelliSense and tab-stops](https://raw.githubusercontent.com/ElecTreeFrying/nativescript-snippets/main/images/demo-variants.gif "One prefix, three levels of detail: ns-switch → the bare tag, every property as a tab-stop, then properties + events + an inline doc table")

[**Full prefix reference →**][reference] · [**Snippet spec & generation pipeline →**][spec]

[reference]: https://github.com/ElecTreeFrying/nativescript-snippets/blob/main/reference.md
[spec]: https://github.com/ElecTreeFrying/nativescript-snippets/blob/main/SPEC.md

---

## Quick Start

1. **Install** the extension ([see below](#installation)).
2. **Open** a NativeScript view — `.html` (Angular), `.xml` (Core), `.vue`, `.tsx`/`.jsx` (React), or `.svelte`.
3. **Type a prefix** — `ns-button`, `ns-stack-layout`, `ns-list-view`, `ns-tap`, `ns-icon-stop` — and accept it from IntelliSense.
4. **Tab through** the property placeholders and fill them in. Done.

> **Suffix cheat-sheet:** `ns-button` → the bare tag · `ns-button-prop` → every property as a Tab-stop · `ns-button-comp` → properties **+** events **+** an inline doc table.

---

## Highlights

- **One prefix, every flavor.** `ns-button` works whether you're in Angular HTML, Core XML, a Vue SFC, a React `.tsx`, or a Svelte component — the snippet emits the right tag case and event syntax for each.
- **Three levels of detail.** Bare for speed, `-prop` for every property as a Tab-stop, `-comp` for properties **+** events **+** a documented property/event table inline.
- **Generated from `@nativescript/core` v9** (currently `9.0.20`). Every property, type hint, and event is extracted from the framework's TypeScript types — the snippets can't drift from the API.
- **Smart hints.** Enum props expand to their allowed values (`orientation="(horizontal|vertical)"`), and two-way-bindable props use each flavor's binding syntax (Angular `[(checked)]`, Svelte `bind:checked`).
- **Everything you reach for.** Every UI component, all seven layout containers, ready-made example layouts (`ns-<layout>-snippet-N`), eight gestures, and 24 iOS system-icon values.
- **Pure, declarative, private.** No runtime, no dependencies, no telemetry — just snippet JSON contributed to VS Code.

---

## Usage

Every component and layout ships in three variants. Here's the same `Switch`, three ways — exactly what lands in your editor:

### 1. Bare — `ns-switch`

```html
<Switch></Switch>
```

### 2. Property — `ns-switch-prop`

Every property becomes a Tab-stop. Two-way-bindable props use the flavor's binding syntax:

```html
<Switch
  [(checked)]="boolean"
  offBackgroundColor="Color"></Switch>
```

### 3. Complete — `ns-switch-comp`

Properties **and** events, plus an inline doc comment listing each one — and a reminder of how many inherited `View` properties the element also accepts:

```html
<Switch
  checked="boolean"
  offBackgroundColor="Color"
  (checkedChange)="">
</Switch>
<!--
Properties
  checked (boolean) — Gets or sets if a switch is checked or not.
  offBackgroundColor (Color) — Gets or sets the background color of the Switch when it is turned off.

Events
  checkedChange

+ 118 inherited View properties (id, class, width, height, margin, backgroundColor, …) and 12 events (loaded, unloaded, layoutChanged, …).
-->
```

> Bigger elements scale the same way — `ns-button-prop` lays out every one of `Button`'s properties and `ns-text-field-prop` every property of `TextField`, each as a numbered Tab-stop you can fill or skip.

### The same prefix, every flavor

`ns-button` adapts to whichever file you're in — PascalCase tags for Angular/Core/Vue, camelCase for React/Svelte, and the right event syntax for each:

```html
<!-- Angular (.html) -->
<Button (tap)="onTap()"></Button>

<!-- Core (.xml) -->
<Button tap="onTap" />

<!-- Vue (.vue) -->
<Button @tap="onTap" />

<!-- React (.tsx / .jsx) -->
<button onTap={onTap} />

<!-- Svelte (.svelte) -->
<button on:tap={onTap} />
```

![The same ns-tap snippet in React (.tsx), Svelte (.svelte), and Angular (.html) — each expands to that flavor's event syntax](https://raw.githubusercontent.com/ElecTreeFrying/nativescript-snippets/main/images/demo-flavors.gif "One prefix, every flavor: ns-tap → onTap={} in React, on:tap={} in Svelte, then (tap) in Angular")

### Layouts

All seven layout containers — `ns-stack-layout`, `ns-grid-layout`, `ns-flexbox-layout`, `ns-dock-layout`, `ns-absolute-layout`, `ns-wrap-layout`, `ns-root-layout` — ship the three variants, **plus ready-made example layouts** under `ns-<layout>-snippet-N`:

```html
<!-- ns-dock-layout-snippet-2 -->
<DockLayout width="210" height="210" backgroundColor="lightgray" stretchLastChild="true">
  <Label text="left" dock="left" backgroundColor="red"></Label>
  <Label text="top" dock="top" backgroundColor="green"></Label>
  <Label text="right" dock="right" backgroundColor="blue"></Label>
  <Label text="bottom" dock="bottom" backgroundColor="yellow"></Label>
</DockLayout>
```

### Gestures

Eight gesture bindings, one prefix each — adapted to the flavor's event syntax:

| Prefix | Angular | Core | Vue | React | Svelte |
|---|---|---|---|---|---|
| `ns-tap` | `(tap)=""` | `tap=""` | `@tap=""` | `onTap={}` | `on:tap={}` |

…plus `ns-doubleTap`, `ns-longPress`, `ns-swipe`, `ns-pan`, `ns-pinch`, `ns-rotation`, and `ns-touch`.

### iOS system icons (Angular + Core)

`ns-icon-*` expands to the numeric `ios.systemIcon` value for an `ActionItem` — e.g. `ns-icon-stop` → `14`:

```html
<ActionItem ios.systemIcon="14"></ActionItem>
```

24 icons in all (`ns-icon-done`, `ns-icon-search`, `ns-icon-trash`, …) — see [reference.md][reference] for the complete list.

## Snippets

This extension contributes **805 snippets** across **five NativeScript flavors**, generated from `@nativescript/core` v9.0.20. See **[reference.md](reference.md)** for the full prefix tables.

| Flavor | Language id(s) | Snippets |
|---|---|---|
| Angular | `html` | 182 |
| Core (XML) | `xml` | 179 |
| Vue | `vue` | 149 |
| React | `typescriptreact`, `javascriptreact` | 143 |
| Svelte | `svelte` | 152 |

> Vue and Svelte snippets require the **Vue (Volar)** and **Svelte** language extensions respectively — without them VS Code has no `vue`/`svelte` language to attach to, and the snippets stay dormant until installed.

### Variants

| Prefix | Expands to |
|---|---|
| `ns-<name>` | the bare element |
| `ns-<name>-prop` | element + its primary properties as tab-stops |
| `ns-<name>-comp` | properties + events + a documented property/event table |
| `ns-<layout>-snippet-N` | *(layouts only)* a complete ready-made example layout |

Most prefixes work in every flavor; a few are flavor-specific: `ActionBarExtension` (Angular only), `NavigationButton` (not in React), `Repeater` (not in Vue and React), `RootLayout` (not in React), `SplitView` (Angular/Core only).

### The same prefix per flavor

| Flavor | Language id(s) | per-flavor syntax *(illustrative — tag case + property + event)* |
|---|---|---|
| Angular | `html` | `<Button text="…" (tap)="onTap()">` |
| Core | `xml` | `<Button text="…" tap="onTap" />` |
| Vue | `vue` | `<Button text="…" @tap="onTap" />` |
| React | `typescriptreact`, `javascriptreact` | `<button text="…" onTap={onTap} />` |
| Svelte | `svelte` | `<button text="…" on:tap={onTap} />` |

## Installation

**Requires VS Code 1.30.0 or later.**

- **Marketplace:** Extensions view (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>) → search **NativeScript Snippets** by *ElecTreeFrying* → **Install**.
- **CLI:** `code --install-extension ElecTreeFrying.nativescript-angular-html-snippets`
- **Direct:** [VS Code Marketplace listing][marketplace]

---

## Compatibility

- **VS Code** 1.30.0 or later.
- **Compatible hosts:** Cursor, VSCodium, Code Server, and other forks that implement the VS Code API at the same engine version.
- **Runs in the browser:** Works in VS Code for the Web (`vscode.dev`, `github.dev`) too — it's a pure declarative extension, so there's no native code to hold it back.
- **Languages:** Angular (`html`), Core (`xml`), and React (`typescriptreact`/`javascriptreact`) work out of the box; Vue and Svelte require the **Vue (Volar)** / **Svelte** language extensions.
- **Footprint:** Pure declarative snippet JSON — zero runtime dependencies.
- **Telemetry:** None. Everything runs locally.

---

## Troubleshooting

If a prefix doesn't expand, snippets don't appear in `.vue` / `.svelte` files — including the common case where they fire **between** elements but not **inside** an element's opening tag — or a `.vue` template inserts the Angular form (`(tap)` instead of `@tap`), see [SUPPORT.md][support] for symptom → cause → fix.

[support]: https://github.com/ElecTreeFrying/nativescript-snippets/blob/main/SUPPORT.md

---

## Changelog

See [CHANGELOG.md][changelog] for full release notes.

[changelog]: https://marketplace.visualstudio.com/items/ElecTreeFrying.nativescript-angular-html-snippets/changelog

---

## Contributing

Contributions, bug reports, and feature requests are welcome. Snippets are generated — see [SUPPORT.md][support-contrib] for the build/validate workflow, and [SPEC.md][spec] for the snippet grammar and generation pipeline.

[support-contrib]: https://github.com/ElecTreeFrying/nativescript-snippets/blob/main/SUPPORT.md#contributing

---

## Support

**This extension is free and always will be.** If it's become part of your workflow, here are a few ways to give back:

- Star the repo on [GitHub][repo]
- Leave a review on the [VS Code Marketplace][reviews]
- Send a donation to any address below

[reviews]: https://marketplace.visualstudio.com/items?itemName=ElecTreeFrying.nativescript-angular-html-snippets&ssr=false#review-details

| Network | Address |
|---|---|
| **Bitcoin** | `bc1q4j2uewfphjmca83905qv37vcl4jh8va5yupl7w` |
| **Solana** | `EHtTGyRoDAK44KBGrEoypAWyPpResHUqwufKnuLs7Tyy` |
| **Sui** | `0xcaf8ff4a65d7e35d961abd0203180013b7fe974d4fa0313e880c39c45ada2b09` |
| **ERC-20** (Ethereum / Base / Monad / Polygon / HyperEVM) | `0xd25f84Ed2F76dF2F0C8f1207402eF9e15b5d7855` |

---

## Related

- **[All extensions by ElecTreeFrying][publisher]** on the VS Code Marketplace.

[publisher]: https://marketplace.visualstudio.com/publishers/ElecTreeFrying

---

## License

[MIT][license]

[license]: https://marketplace.visualstudio.com/items/ElecTreeFrying.nativescript-angular-html-snippets/license
