# Support & Contributing — NativeScript Snippets

Where to get help, how to fix common issues, and how to contribute. For features and usage see the [README][readme]; for the snippet grammar and generation pipeline see [SPEC.md][spec].

[readme]: README.md
[spec]: SPEC.md

---

## Table of Contents

- [Quick Links](#quick-links)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Troubleshooting](#troubleshooting)
- [Reporting a bug](#reporting-a-bug)
- [Feature requests](#feature-requests)
- [Contributing](#contributing)
  - [Setup](#setup)
  - [Regenerating the snippets](#regenerating-the-snippets)
  - [Changing or adding an element](#changing-or-adding-an-element)
  - [Validation](#validation)
- [Support the project](#support-the-project)

---

## Quick Links

| Resource | What you'll find |
|---|---|
| [README][readme] | Overview, usage samples, the variant system, installation |
| [SPEC.md][spec] | Prefix grammar, flavor transforms, the generation pipeline |
| [reference.md][reference] | The full generated prefix catalog (every element, prop/event counts) |
| [CHANGELOG][changelog] | Release notes and version history |
| [GitHub Issues][issues] | Bug reports, feature requests, questions |
| [VS Code Marketplace][marketplace] | Install page, reviews, version listings |

[reference]: reference.md
[changelog]: CHANGELOG.md
[issues]: https://github.com/ElecTreeFrying/nativescript-snippets/issues
[marketplace]: https://marketplace.visualstudio.com/items?itemName=ElecTreeFrying.nativescript-angular-html-snippets

---

## Frequently Asked Questions

### Does this extension send my data anywhere?

**No.** It is a pure declarative snippets extension — no runtime code, no network calls, no telemetry, no dependencies bundled into the package. It contributes snippet JSON to VS Code and nothing more.

### Do I have to use Angular?

**No.** The pack covers five flavors — Angular (`html`), Core (`xml`), Vue (`vue`), React (`typescriptreact`/`javascriptreact`), and Svelte (`svelte`). The same `ns-*` prefixes work in each; VS Code scopes them by language so they only appear in the matching file type.

### Why don't the snippets show up in my `.vue` or `.svelte` files?

VS Code only has a `vue` / `svelte` language to attach snippets to once the **Vue (Volar)** or **Svelte** extension is installed. Install the matching language extension and reload — the snippets activate immediately. Angular, Core, and React work out of the box.

### Why do React and Svelte snippets use a lowercase tag (`<button>` not `<Button>`)?

That's the convention for those flavors' JSX/markup. The generator lowercases the first letter of the tag for React and Svelte and keeps PascalCase for Angular, Core, and Vue.

### How do I get all of an element's properties, not just the tag?

Add a suffix: `ns-button-prop` lays out every primary property as a Tab-stop; `ns-button-comp` adds events and an inline doc comment too. See [README — Usage][readme].

### Why is an element missing in one flavor?

A few elements aren't registered in every framework's element set (for example `SplitView` is Angular/Core only, and `RootLayout`/`NavigationButton` aren't emitted for React). The generator skips an element for a flavor rather than emit a tag that framework won't render — which is why per-flavor snippet counts differ slightly.

### Which NativeScript version are the snippets based on?

They're generated from `@nativescript/core` **v9.0.20** TypeScript types. The exact version is recorded in `reference.md` and the README's Snippets section.

### Is it compatible with Cursor / VSCodium / Code Server?

**Yes.** It uses only the declarative snippet contribution point, so it runs in any VS Code-compatible host at engine `^1.30.0` or later.

---

## Troubleshooting

Each entry is **symptom → cause → fix**. If yours isn't here, [open an issue][issues].

### No snippets are suggested at all

**Causes:**

- The file's language mode doesn't match a contributed flavor (check the language indicator at the bottom-right of the status bar).
- `editor.snippetSuggestions` is set to `"none"`.

**Fix:** Set the correct language mode for the file, and ensure `editor.snippetSuggestions` is `"top"`, `"bottom"`, or `"inline"` (the default). Trigger suggestions with <kbd>Ctrl</kbd>+<kbd>Space</kbd>.

---

### Snippets don't appear in `.vue` / `.svelte` files

**Cause:** No `vue` / `svelte` language is registered because the **Vue (Volar)** / **Svelte** extension isn't installed.

**Fix:** Install the matching language extension and reload the window. The snippets are dormant until the language exists.

---

### Snippets don't appear *inside* an element's opening tag (`.vue` / `.svelte`)

**Symptom:** In a `.vue` or `.svelte` file, typing an `ns-*` prefix while the caret is **inside an existing element's opening tag** (among its attributes, e.g. `<Button row="0" █ />`) suggests nothing — yet the same prefix expands fine on a blank line **between** elements.

**Cause:** The single-file-component tooling gives the inside of an opening tag its own language scope, distinct from the markup around it. The **Svelte** extension assigns the attribute region a dedicated `svelte-start-tag` language, while the snippets are contributed to `svelte` (the language of the content between tags) — so VS Code doesn't offer them inside the tag. In **Vue**, a `<template>` is embedded HTML owned by Volar, and attribute IntelliSense inside a tag is provided by the language server rather than the contributed snippet list. VS Code only offers a snippet when its contributed language matches the language *at the caret*, which inside a tag is neither `svelte` nor `vue`.

**Fix:** Trigger `ns-*` snippets in the **markup/content region** (between elements), not inside an existing tag. Prefer the element-producing variants — `ns-<element>`, `ns-<element>-prop`, `ns-<element>-comp` — which emit the whole tag with its attributes and events already inside it. To bolt a single gesture or event onto a tag you've already written, expand the gesture snippet (e.g. `ns-tap`) on a blank line and move the inserted attribute into your tag.

---

### In a Vue `<template>`, a prefix inserts the Angular form (`(tap)`, not `@tap`)

**Symptom:** In a `.vue` SFC whose language mode is correctly **Vue**, expanding `ns-tap` inside `<template>` inserts `(tap)="…"` (and elements come out PascalCase, `<Button>`) — the Angular shape, not Vue's `@tap` / lowercase `<button>`.

**Cause:** Volar maps the inside of `<template>` to the **HTML** language — the template body is embedded HTML. VS Code offers snippets for the language **at the caret**, which there is `html`, so the Angular (`html`-scoped) variants are what surface. The Vue (`vue`-scoped) variants attach to the SFC shell, not the template body, so they don't win inside the template. This is a limitation of VS Code's per-language snippet scoping in embedded HTML, not an error in the snippet content.

**Fix:** Treat the inserted markup as a starting point and change the event/binding punctuation to the Vue form by hand — `(tap)="…"` → `@tap="…"`. Element and property names are identical across flavors, so only the binding syntax differs.

---

### VS Code warns "multiple formatters for 'vue' files"

**Symptom:** Opening a `.vue` file shows *"There are multiple formatters for 'vue' files. One of them should be configured as default formatter."*

**Cause:** A VS Code editor warning — **not** from NativeScript Snippets. This pack ships only snippet JSON and registers no formatter, so it can't be the source. The warning means two or more *other* installed extensions both offer to format `.vue` files (commonly **Vue (Volar)** and **Prettier**, sometimes a leftover **Vetur**), and VS Code can't pick one on its own.

**Fix:** Choose a default formatter for Vue (an editor setting — nothing to change in the extension):

- Right-click in the `.vue` file → **Format Document With… → Configure Default Formatter…** → pick one, or
- add to your `settings.json`:

```json
"[vue]": {
  "editor.defaultFormatter": "Vue.volar"
}
```

Use `esbenp.prettier-vscode` instead if you'd rather Prettier own Vue formatting.

---

### A prefix expands with the wrong framework's syntax

**Cause:** The file is in the wrong language mode — e.g. an Angular template open as plain HTML vs. a Vue SFC.

**Fix:** Switch the language mode to match the flavor you intend (Angular → `html`, Core → `xml`, Vue → `vue`, React → `typescriptreact`/`javascriptreact`, Svelte → `svelte`).

---

### The `-comp` snippet inserts a big comment block

**Cause:** That's intentional. The `-comp` ("complete") variant documents every property and event inline so you have the API at hand while writing.

**Fix:** Delete the `<!-- … -->` block once you're done referencing it, or use the `-prop` variant if you don't want the doc comment.

---

### A `-prop` snippet seems to be missing properties

**Cause:** `-prop`/`-comp` list the element's **primary** properties (the ones it introduces). The ~100+ universal `View` properties every element inherits (id, class, width, margin, backgroundColor, …) are not expanded inline — the `-comp` doc comment notes how many there are instead.

**Fix:** None needed — inherited `View` properties are valid on every element and are documented once in `reference.md`. Add them by hand as needed.

---

## Reporting a bug

[Open an issue][issues] and include:

1. **Extension version** (Extensions panel → gear → *About*).
2. **VS Code version** (`Help → About`).
3. **OS and version**.
4. **Flavor / language mode** and the **prefix** you typed (e.g. Svelte, `ns-list-view-comp`).
5. **Expected vs. actual** — paste the snippet you got (or "no suggestion").
6. **Screenshot or recording** if the problem is visual.

---

## Feature requests

Open an issue labelled **enhancement** on [GitHub Issues][issues]. Helpful to include:

- The element/gesture/icon or flavor involved.
- An example of the expansion you'd want generated.
- The NativeScript docs link for the element, if handy.

> Note: snippet **content** is generated from `@nativescript/core` types — so "add property X to element Y" usually means the generator's extraction needs adjusting, not a hand edit. See [Contributing](#contributing).

---

## Contributing

### Setup

```bash
git clone https://github.com/ElecTreeFrying/nativescript-snippets.git
cd nativescript-snippets
npm install
```

Press <kbd>F5</kbd> inside VS Code to launch an Extension Development Host with the extension loaded, then type a prefix in a file of the matching language to confirm an expansion.

### Regenerating the snippets

The snippet JSON and the docs are **generated** — never hand-edit them. One command rebuilds everything:

> **The generator is maintainer-local.** `tools/` is gitignored and **not part of the distributed repo** — a clone has the shipped `snippets/` (testable via <kbd>F5</kbd>) but not the build tooling, so the `npm run generate` workflow below runs only where the generator is present. Snippet changes are handled maintainer-side — [open an issue](#feature-requests) describing the change.

```bash
npm run generate   # extract → render → gen-docs → validate → check-coverage
```

- `tools/extract.js` reads `@nativescript/core` `.d.ts` types into `tools/ns-model.json`.
- `tools/render.js` renders the per-flavor snippet JSON under `snippets/<flavor>/`.
- `tools/gen-docs.js` regenerates `reference.md` and the README "Snippets" section.
- `tools/validate.js` gates structural integrity, and `tools/check-coverage.js` gates fidelity (the generated snippets vs the model).

See [SPEC.md][spec] for the full pipeline and the neutral-model shape.

### Changing or adding an element

Because snippets are derived from types, you don't edit `snippets/**/*.json`:

- **Element properties/events** come from `@nativescript/core` — adjust the extraction logic or the pinned core version in `tools/extract.js`, then regenerate.
- **Gestures and iOS icons** are curated tables in `tools/render.js` (they have no type representation) — edit those tables, then regenerate.
- **Per-flavor syntax** (tag case, event binding, which flavors get icons) lives in the `FLAVORS` table in `tools/render.js`.

Then run `npm run generate` and commit the regenerated `snippets/**`, `reference.md`, and README Snippets section together.

### Validation

```bash
npm run validate   # structural integrity
npm run check      # fidelity: generated snippets vs the model
```

`npm run validate` checks every flavor for valid JSON, unique prefixes, a final `$0` in `-prop`/`-comp` bodies, no repeated tab-stop indices, and a `Source:` URL on each entry. `npm run check` runs the fidelity gate (`check-coverage.js`) — verifying the generated snippets still reflect the model (every prop/event, two-way shapes, inherited counts, no orphans). Both exit non-zero on any failure, and both run automatically as the last two steps of `npm run generate`, so they double as pre-commit gates.

---

## Support the project

This extension is free. If it saves you time, consider:

- **Starring** the repo on [GitHub](https://github.com/ElecTreeFrying/nativescript-snippets)
- **Leaving a review** on the [VS Code Marketplace][marketplace]
- **Donating** — addresses are in the [README's Support section][donate]

[donate]: README.md#support
