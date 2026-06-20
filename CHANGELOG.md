# Change Log

## v1.0.0 (2026-6-28)

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

### Changes

- Updated the README.

## v0.1.3 (2020-3-21)

### Changes

- Updated the README.

## v0.1.2 (2020-3-18)

### Added

- More demos and examples in `reference.md`.
- HTML language scoping; dropped the redundant `snippet` marketplace keyword.

### Changes

- Updated the README.
- Corrected typos in the changelog.

## v0.1.1 (2020-3-18)

### Fixes

- Fixed a `vsce publish` failure caused by a missing icon.
- Corrected the version metadata in `package.json`.
- Corrected typos in the changelog.

## v0.1.0 (2020-3-17)

### Added

- Initial public release — NativeScript UI snippets for Angular (`html`) in VS Code.
