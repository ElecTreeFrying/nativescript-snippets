# NativeScript Snippets — Prefix Reference

> Generated from `@nativescript/core` v9.0.20. **Do not edit by hand** — run `npm run generate`.

Every prefix starts with `ns-`. Components and layouts ship three variants (layouts add a fourth):

- `ns-<name>` — the bare element.
- `ns-<name>-prop` — the element with its primary properties as tab-stops.
- `ns-<name>-comp` — properties **+** events **+** a doc-comment listing each property/event (and a count of the inherited `View` properties every element also accepts).
- `ns-<layout>-snippet-N` — *(layouts only)* a complete ready-made example layout.

Most prefixes work in every flavor; a few are flavor-specific: `ActionBarExtension` is Angular-only, `NavigationButton` is absent in React, `Repeater` is absent in Vue and React, `RootLayout` is absent in React, and `SplitView` is Angular/Core only. VS Code scopes prefixes by language, so they only appear in the matching file type.

## Flavors

| Flavor | Language id(s) | Snippets |
|---|---|---|
| Angular | `html` | 182 |
| Core (XML) | `xml` | 179 |
| Vue | `vue` | 149 |
| React | `typescriptreact`, `javascriptreact` | 143 |
| Svelte | `svelte` | 152 |

## The same prefix per flavor

| Flavor | Language id(s) | per-flavor syntax *(illustrative — tag case + property + event)* |
|---|---|---|
| Angular | `html` | `<Button text="…" (tap)="onTap()">` |
| Core | `xml` | `<Button text="…" tap="onTap" />` |
| Vue | `vue` | `<Button text="…" @tap="onTap" />` |
| React | `typescriptreact`, `javascriptreact` | `<button text="…" onTap={onTap} />` |
| Svelte | `svelte` | `<button text="…" on:tap={onTap} />` |

## Components

| Base prefix | Element | Primary props | Events |
|---|---|---|---|
| `ns-action-bar` | ActionBar | 11 | 0 |
| `ns-action-bar-extension` | ActionBarExtension | 0 | 0 |
| `ns-action-item` | ActionItem | 4 | 1 |
| `ns-activity-indicator` | ActivityIndicator | 2 | 0 |
| `ns-button` | Button | 15 | 1 |
| `ns-content-view` | ContentView | 1 | 0 |
| `ns-date-picker` | DatePicker | 11 | 1 |
| `ns-formatted-string` | FormattedString | 11 | 0 |
| `ns-frame` | Frame | 4 | 2 |
| `ns-html-view` | HtmlView | 3 | 0 |
| `ns-image` | Image | 9 | 1 |
| `ns-label` | Label | 15 | 0 |
| `ns-liquid-glass` | LiquidGlass | 0 | 0 |
| `ns-liquid-glass-container` | LiquidGlassContainer | 0 | 0 |
| `ns-list-picker` | ListPicker | 5 | 1 |
| `ns-list-view` | ListView | 15 | 4 |
| `ns-navigation-button` | NavigationButton | 0 | 0 |
| `ns-page` | Page | 7 | 4 |
| `ns-placeholder` | Placeholder | 0 | 1 |
| `ns-progress` | Progress | 2 | 1 |
| `ns-repeater` | Repeater | 5 | 0 |
| `ns-scroll-view` | ScrollView | 4 | 1 |
| `ns-search-bar` | SearchBar | 5 | 2 |
| `ns-segmented-bar` | SegmentedBar | 4 | 1 |
| `ns-segmented-bar-item` | SegmentedBarItem | 1 | 0 |
| `ns-slider` | Slider | 3 | 3 |
| `ns-span` | Span | 12 | 1 |
| `ns-split-view` | SplitView | 9 | 0 |
| `ns-switch` | Switch | 2 | 1 |
| `ns-tab-view` | TabView | 14 | 1 |
| `ns-tab-view-item` | TabViewItem | 6 | 0 |
| `ns-text-field` | TextField | 27 | 4 |
| `ns-text-view` | TextView | 26 | 4 |
| `ns-time-picker` | TimePicker | 9 | 1 |
| `ns-web-view` | WebView | 3 | 2 |

## Layouts

| Base prefix | Element | Primary props | Events |
|---|---|---|---|
| `ns-absolute-layout` | AbsoluteLayout | 3 | 0 |
| `ns-dock-layout` | DockLayout | 4 | 0 |
| `ns-flexbox-layout` | FlexboxLayout | 8 | 0 |
| `ns-grid-layout` | GridLayout | 5 | 0 |
| `ns-root-layout` | RootLayout | 5 | 0 |
| `ns-stack-layout` | StackLayout | 4 | 0 |
| `ns-wrap-layout` | WrapLayout | 6 | 0 |

## Gestures

| Prefix | Angular | Core | Vue | React | Svelte |
|---|---|---|---|---|---|
| `ns-tap` | `(tap)=""` | `tap=""` | `@tap=""` | `onTap={}` |  `on:tap={}` |
| `ns-doubleTap` | `(doubleTap)=""` | `doubleTap=""` | `@doubleTap=""` | `onDoubleTap={}` |  `on:doubleTap={}` |
| `ns-longPress` | `(longPress)=""` | `longPress=""` | `@longPress=""` | `onLongPress={}` |  `on:longPress={}` |
| `ns-swipe` | `(swipe)=""` | `swipe=""` | `@swipe=""` | `onSwipe={}` |  `on:swipe={}` |
| `ns-pan` | `(pan)=""` | `pan=""` | `@pan=""` | `onPan={}` |  `on:pan={}` |
| `ns-pinch` | `(pinch)=""` | `pinch=""` | `@pinch=""` | `onPinch={}` |  `on:pinch={}` |
| `ns-rotation` | `(rotation)=""` | `rotation=""` | `@rotation=""` | `onRotation={}` |  `on:rotation={}` |
| `ns-touch` | `(touch)=""` | `touch=""` | `@touch=""` | `onTouch={}` |  `on:touch={}` |

## iOS setting icons (Angular + Core)

`icon="(snippet: ns-icon-*)"` — `ios.systemIcon` values from `UIBarButtonSystemItem`.

| Prefix | Value |
|---|---|
| `ns-icon-done` | `0` |
| `ns-icon-cancel` | `1` |
| `ns-icon-edit` | `2` |
| `ns-icon-save` | `3` |
| `ns-icon-add` | `4` |
| `ns-icon-flexibleSpace` | `5` |
| `ns-icon-fixedSpace` | `6` |
| `ns-icon-compose` | `7` |
| `ns-icon-reply` | `8` |
| `ns-icon-action` | `9` |
| `ns-icon-organize` | `10` |
| `ns-icon-bookmarks` | `11` |
| `ns-icon-search` | `12` |
| `ns-icon-refresh` | `13` |
| `ns-icon-stop` | `14` |
| `ns-icon-camera` | `15` |
| `ns-icon-trash` | `16` |
| `ns-icon-play` | `17` |
| `ns-icon-pause` | `18` |
| `ns-icon-rewind` | `19` |
| `ns-icon-fastForward` | `20` |
| `ns-icon-undo` | `21` |
| `ns-icon-redo` | `22` |
| `ns-icon-pageCurl` | `23` |
