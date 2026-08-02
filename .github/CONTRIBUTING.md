# Contributing

Thanks for wanting to help. Bug reports and feature requests are very welcome — but
please read the next section before you open a pull request, because this repository
works differently from most snippet extensions.

## ⚠️ The snippets are generated, and the generator is not in this repository

Every file under `snippets/`, all of `reference.md`, and the README's `## Snippets`
section are **build artifacts**. They are produced from the `@nativescript/core`
TypeScript types by a generator under `tools/` — and `tools/` is deliberately not
committed, so a fresh clone does not contain it.

Two consequences, and they are the whole reason this section is first:

1. **Hand-editing a snippet file is futile.** The next generator run overwrites it
   wholesale. A PR that edits `snippets/**/*.json`, `reference.md`, or the README's
   `## Snippets` block cannot be merged as-is, no matter how correct the change is.
2. **You cannot regenerate them yourself.** `npm run generate`, `npm run validate`,
   and `npm run check` all live in `tools/`, so they will not run from a clone.

**So: to change a snippet, open an issue instead of a PR.** Describe the element, the
flavor(s), and what the expansion should be. That is genuinely the fastest path — the
change gets made in the generator's curated data and regenerated, which is the only
way it will survive.

This is not a brush-off. Snippet issues are the most useful reports this project gets.

## What you *can* edit directly

These are hand-maintained and normal PRs are welcome:

- `README.md` — **everything except** the `## Snippets` section
- [`SPEC.md`](../SPEC.md) — the user-facing contract
- [`SUPPORT.md`](../SUPPORT.md)
- `CHANGELOG.md`, `LICENSE.md`
- `package.json` — metadata, categories, keywords
- Anything under `.github/`

## What CI checks

There is no build and no test framework — the published artifact is `package.json`
plus declarative JSON, and no code executes at runtime. CI verifies the one thing it
can from a clone: that every file `contributes.snippets` points at exists and parses
as valid JSON. The deeper structural and fidelity gates live in `tools/` and run
locally before a release.

## Testing a snippet by hand

Press <kbd>F5</kbd> to open an Extension Development Host, open a file of the matching
language, and type the prefix.

| Flavor | Language ID(s) |
|---|---|
| Angular | `html` |
| Core | `xml` |
| Vue | `vue` |
| React | `typescriptreact`, `javascriptreact` |
| Svelte | `svelte` |

All prefixes start with `ns-`. Per element there is `ns-<name>` (bare tag),
`ns-<name>-prop` (properties as tab stops), and `ns-<name>-comp` (properties, events,
and a doc comment).

If a snippet does not appear, the language ID is almost always the reason — check the
one in the status bar against the table above.

## Code style

- **LF line endings**, enforced by `.gitattributes`. Snippet JSON is LF with 2-space
  indent; a CRLF re-save produces an enormous phantom diff.
- Do not bump `version` in `package.json` — releases own that.

[`CLAUDE.md`](../CLAUDE.md) documents the generation pipeline in full, if you want the
complete picture.

## Reporting bugs

Use the issue templates. [`SUPPORT.md`](../SUPPORT.md) covers the known limitations —
including why gesture snippets behave differently in Vue than in Svelte.

For **security** problems, do not open an issue — see [`SECURITY.md`](SECURITY.md).
