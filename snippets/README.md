# snippets/

The **shipped product**: the generated VS Code snippet JSON, one subdirectory per
NativeScript flavor. When a user types an `ns-*` prefix in a file of a contributed language,
VS Code expands one of these entries.

> **Generated, not hand-authored.** Every `*.json` here is produced wholesale by
> [`../tools/render.js`](../tools/render.js) from the `@nativescript/core` v9 types. Editing a
> snippet by hand is futile — it is overwritten on the next `npm run generate`. To change a
> snippet, edit the generator or its curated data and regenerate. See [`CLAUDE.md`](CLAUDE.md)
> for the rule and [`../tools/`](../tools/) for how the pipeline works. The `tools/` generator is
> **local-only (gitignored)** — not committed or shipped, so the `../tools/*` links here resolve
> only in a local working copy, not a fresh clone.

## Flavors

| Dir | Language id(s) | Icons | Excluded elements |
|-----|---------------|:-----:|-------------------|
| [`angular/`](angular/) | `html` | yes | — |
| [`core/`](core/) | `xml` | yes | — |
| [`vue/`](vue/) | `vue` | no | `SplitView`, `Repeater` |
| [`react/`](react/) | `typescriptreact`, `javascriptreact` | no | `SplitView`, `RootLayout`, `Repeater` |
| [`svelte/`](svelte/) | `svelte` | no | `SplitView` |

*Excluded elements* are type-derived tags skipped via the `EXCLUDE` map in `render.js`.
Four hand-authored extras (from [`../tools/extra-components.json`](../tools/extra-components.json))
have their own reach: `NavigationButton` ships in every flavor **except React**,
`ActionBarExtension` is **Angular-only**, and the iOS Liquid Glass layouts `LiquidGlass` and
`LiquidGlassContainer` ship in **all five flavors**.

Per-flavor snippet counts and the full prefix catalog live in
[`../reference.md`](../reference.md) (generated from the same model, so they never drift).

## Syntax by flavor

The shape each flavor renders is defined by the `FLAVORS` table in
[`../tools/render.js`](../tools/render.js) — the source of truth. At a glance:

| Flavor | Tag case | Property | Event | Two-way | Gesture | Doc comment |
|--------|----------|----------|-------|---------|---------|-------------|
| Angular | PascalCase | `name="…"` | `(name)="…"` | `[(name)]="…"` | `(tap)="$0"` | `<!-- … -->` |
| Core | PascalCase | `name="…"` | `name="…"` | — | `tap="$0"` | `<!-- … -->` |
| Vue | PascalCase | `name="…"` | `@name="…"` | — | `@tap="$0"` | `<!-- … -->` |
| React | camelCase | `name="…"` | `onName={…}` | — | `onTap={$0}` | `{/* … */}` |
| Svelte | camelCase | `name="…"` | `on:name={…}` | `bind:name={…}` | `on:tap={$0}` | `<!-- … -->` |

camelCase = first letter lowercased (`Button` → `button`, `StackLayout` → `stackLayout`).
Two-way applies only to props that emit a matching `<prop>Change` event (Svelte also accepts
`<prop>Changed`). The same `ns-button-comp` across flavors:

```
Angular  <Button text="…" (tap)="onTap()">
Core     <Button text="…" tap="onTap" />
Vue      <Button text="…" @tap="onTap" />
React    <button text="…" onTap={onTap} />
Svelte   <button text="…" on:tap={onTap} />
```

## What's in each flavor directory

| File | Contents | Flavors |
|------|----------|---------|
| `components.json` | Components + extras as `bare` / `-prop` / `-comp` variants | all |
| `layouts.json` | The seven layouts' variants **plus** ready-made `ns-<layout>-snippet-N` examples | all |
| `gestures.json` | 8 gesture-binding fragments (`ns-tap`, `ns-swipe`, …) | all |
| `settings-icon.json` | 24 iOS `ns-icon-*` `ActionItem` icon values | angular, core only |

## Prefix grammar

All prefixes start with `ns-`. Per element: `ns-<name>` (bare tag), `ns-<name>-prop` (every
primary property as a tab-stop), `ns-<name>-comp` (props + events + a doc comment). Layouts add
`ns-<layout>-snippet-N` (ready-made examples); gestures are `ns-<gesture>`; icons (Angular/Core
only) are `ns-icon-<name>`.

## Snippet format

Each file is a flat map of VS Code snippets — `"<label>": { prefix, body, description }`:

```json
"Button (default)": {
  "prefix": "ns-button",
  "body": "<Button>$0</Button>",
  "description": "Represents a standard Button widget.\n\nSource: https://docs.nativescript.org/api/class/Button"
}
```

`body` uses VS Code tab-stop syntax (`$0`, `${1:hint}`); every `description` ends with a
`Source:` URL surfaced on hover. Files are wired to languages by the hand-maintained
`contributes.snippets` array in [`../package.json`](../package.json).

> The `*.json` files **ship** in the published `.vsix`; the `README.md` / `CLAUDE.md` docs here
> are **dev-only** and excluded via [`../.vscodeignore`](../.vscodeignore).
