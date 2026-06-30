# Change Log

## v1.0.0 (2026-6-30)

### Added

- **Multiplatform support** — snippets now cover **five NativeScript flavors**: Angular (`html`), Core (`xml`), Vue (`vue`), React (`typescriptreact`/`javascriptreact`), and Svelte (`svelte`). 805 snippets total.
- **Code generator** (`tools/`, run with `npm run generate`) — snippet content is derived from `@nativescript/core` v9 TypeScript types, walking inheritance for each component's full property set. It reads both `@nsProperty`/`@nsEvent` annotations **and** `Property`/`CssProperty` registrations (which carry most real markup props), and folds in the implementation `<Name>Base` classes that the public `.d.ts` flattens away. README and `reference.md` tables are generated too, so they can no longer drift.
- **Two-way binding** in `-prop`/`-comp` for two-way-capable props (where a `<prop>Change` event exists): Angular `[(prop)]`, Svelte `bind:prop`.
- **Ready-made layout examples** (`ns-<layout>-snippet-N`) carried forward from the original pack and rendered for every flavor.
- `NavigationButton` (Angular/Core/Vue/Svelte) and `ActionBarExtension` (Angular) restored; `Repeater` (legacy `@nsView` list component) added.
- `LiquidGlass` and `LiquidGlassContainer` — iOS Liquid Glass effect containers (driven by the inherited `iosGlassEffect` View property), for all five flavors.
- Enum-typed properties now expand to value hints, e.g. `iosIndicatorViewStyle="${2:(medium|large)}"`.
- `.gitattributes` enforcing LF (fixes the recurring CRLF spurious-diff problem); snippet validator (`npm run validate`).

### Changes

- Rebuilt every snippet against current NativeScript (v9.0.20) — a three-major-version leap across more than six years, from the v6.4.0 the original pack was authored against.
- `-prop`/`-comp` variants now use sequential tab-stops + a final `$0` (fixes the mirrored-tab-stop bug) and document the inherited `View` properties.
- Corrected event names derived from the static member (e.g. `blur`, not `blurEvent`; `isLoadingChange`, not `isLoading`).
- Accurate property attribution: component-specific CSS props (`placeholderColor`, `tintColor`, tab/segmented colors, …) are scoped to their component instead of listed as universal `View` props; read-only status getters (e.g. `Image.isLoading`) are excluded.
- Cleaner enum hints: drop noise CSS-wide keywords (`initial`/`inherit`/`unset`/`revert`), expand string-literal aliases/enums, resolve trivial aliases to primitives, and cap oversized unions. `-prop` uses two-way binding (Angular `[(x)]`, Svelte `bind:x`); `-comp` shows every property + event explicitly.
- `Source:` URLs verified against the current docs (`/api/class/<Tag>`, gestures → `/guide/gestures`, icons → `/ui/action-bar`).
- Broadened extension display name/description to all flavors; fixed `anuglar` keyword typo.

### Removed

- The whole modern tab-navigation family — `Tabs`, `BottomNavigation`, `TabStrip`, `TabStripItem`, `TabContentItem` — verified absent from `@nativescript/core` v9.0.20 (0 class declarations); it ships in a separate plugin now. Planned for a future plugin-aware release.
- `SplitView` is emitted only for Angular/Core (it is not registered in the Vue/React/Svelte element registries).

## v0.1.4 (2020-7-25)

### Added

- A **Support** section in the README with two donation paths — a Bitcoin (BTC) address accompanied by a new QR-code image (`images/BITCOIN.png`), and a "Donate by Mining" option listing a NiceHash mining address.

### Changes

- Refreshed the README **Installation** instructions: raised the minimum supported editor from VS Code 1.30.0 to **1.42.0**, converted the steps to an explicit numbered list, and clarified the command-palette step (`Extensions: Install Extensions`).
- Minor wording polish in the **Contributing** section. No snippet changes — the last release of the original Angular-only pack before the v1.0.0 rebuild.

## v0.1.3 (2020-3-21)

### Changes

- Tidied two README labels for consistent punctuation — a trailing period on the "Select Install Extensions" install step and on the "More extensions of mine" link in the Related section (both the link text and its reference definition were updated so the link kept resolving). A cosmetic copy-edit only; no snippet or reference changes.

## v0.1.2 (2020-3-18)

### Added

- Rebuilt `reference.md` (143 → 361 lines) from a bare prefix listing into a fully sectioned guide — a `## Contents` table of contents plus **Syntax**, **Usage**, **Snippets**, **Examples**, and **Demo** sections. The new **Examples** section walks through rendered `ns-datepicker` (default / `-prop` / `-comp`) and `ns-absolute-layout` output; the **Snippets** section now enumerates the 8 gestures and all 24 `ns-icon-*` values explicitly.
- Two animated demo GIFs embedded in `reference.md` — `images/demo1.gif` (`ns-search-bar`) and `images/demo2.gif` (`ns-stack-layout`).
- Added `html` to the Marketplace `keywords`.

### Changes

- Reworked the README to mirror the reference: split the old description table into separate **Syntax** and **Usage** tables, added an `ns-dock-layout-snippet-2` "In Action" example, and promoted the Demo/Snippets headings.
- Reworded the extension `description` to "…snippets in your HTML." to signal the Angular/HTML language target. Docs and metadata only — no snippet JSON changed.

### Removed

- Dropped the redundant, misspelled `snipet` keyword from `package.json` (replaced by `html`).

## v0.1.1 (2020-3-18)

### Fixes

- Fixed the `vsce publish` failure that blocked the first Marketplace upload: `package.json`'s `icon` field pointed at `images/ns-ns.png`, a file that never existed in the repo — the actual icon is `images/ns-ng.png`. Correcting the path let `vsce` find the icon and the publish succeed.
- Corrected the `version` metadata in `package.json`, settling on `0.1.1` after a same-day publish scramble (a transient `0.2.0` bump and an accidental `0.0.1` were both walked back; no `0.2.0` was ever tagged or released).
- Cleaned up `CHANGELOG.md` — fixed a misspelled `Fixex` heading and split the release notes into their own section.

## v0.1.0 (2020-3-18)

### Added

- **Initial public release** — *Nativescript: Angular HTML Snippets*, a declarative VS Code snippet pack (no runtime or activation code) scoped to a single flavor: **Angular**, contributed to the `html` language. **145 snippets** across four files, every prefix namespaced `ns-`. Hand-authored against **NativeScript v6.4.0** / **Angular v9.0.0**; requires VS Code `^1.43.0`; MIT licensed.
- **Component snippets** (`snippets/ns-components.json`, 77 entries) — **30 NativeScript UI components** in up to three variant tiers each: `ns-<name>` (bare tag, e.g. `ns-button` → `<Button></Button>`), `ns-<name>-prop` (properties as `${n:hint}` tab-stops with enum value hints and Angular two-way `[(…)]` bindings), and `ns-<name>-comp` (properties + Angular `(event)=""` handlers + a trailing documentation comment). Includes the then-current tab-navigation family — `Tabs`, `TabStrip`, `TabStripItem`, `TabContentItem`, `BottomNavigation` — plus a `TabView` set carrying NativeScript's v6 deprecation notice. Every snippet links its docs page via a `Source:` URL.
- **Layout snippets** (`snippets/ns-layouts.json`, 36 entries) — the **6 layout containers** (Absolute, Dock, Grid, Stack, Wrap, Flexbox), each with a bare tag, a `-comp` doc variant, and ready-made `ns-<layout>-snippet-N` examples: **24 complete, sized, color-coded demo layouts** lifted from the NativeScript docs.
- **Gesture snippets** (`snippets/ns-gestures.json`) — **8 gestures** as Angular event-binding fragments: `ns-tap` → `(tap)=""`, plus `doubleTap`, `longPress`, `swipe`, `pan`, `pinch`, `rotation`, `touch`.
- **ActionBar icon snippets** (`snippets/ns-settings-icon.json`) — **24 `ns-icon-<name>` snippets** expanding to the numeric `ios.systemIcon` value (0–23) for an ActionBar `ActionItem` (`ns-icon-done` → `0` … `ns-icon-pageCurl` → `23`).
- **Reference documentation** — `reference.md` cataloguing every prefix (Layouts / Components / System Icons) with the full icon-value table, and a README documenting the default / `-prop` / `-comp` / layout-snippet / gesture / icon grammar with worked `ns-button` and `ns-dock-layout-snippet-2` examples plus a demo GIF.
