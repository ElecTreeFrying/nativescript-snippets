<!--
Thanks for contributing! Nothing here is mandatory — delete any section that
doesn't apply. The checklist exists to catch the things CI can't.
-->

## What this changes

<!-- One or two sentences. Which prefixes or flavors behave differently after this PR? -->

## Why

<!-- The problem being solved. Link an issue with "Closes #123" if there is one. -->

## How to verify

<!--
Press F5 to open an Extension Development Host, open a file of the matching
language, type the prefix, and confirm the expansion.
-->

---

## Checklist

- [ ] **`snippets/**/*.json` and `reference.md` were not hand-edited.** Both are
      build artifacts, regenerated wholesale — a hand-edit is silently overwritten.
      Change the generator or its curated data instead, then regenerate.
- [ ] The README's `## Snippets` section was not hand-edited either; it is rewritten
      in place between that heading and the next `## ` heading.
- [ ] If `package.json` display strings changed — `package.nls.json` **and all eight
      locale files** were updated together. A key missing from one locale silently
      falls back to English there.
- [ ] Snippet prefixes, bodies, and descriptions stay English. They are typed
      identifiers, not display text.
- [ ] Links added to `README.md` or `CHANGELOG.md` are **absolute URLs**. Both ship
      inside the VSIX, where relative paths do not resolve.
- [ ] No AI attribution anywhere in the commits or this description — no
      `Co-Authored-By: Claude`, no "Generated with", no 🤖.
- [ ] Line endings are LF (enforced by `.gitattributes`).
- [ ] `version` in `package.json` was **not** hand-bumped — `vsce publish` owns that.
