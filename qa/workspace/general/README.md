# qa/workspace/general/

Fixtures for the cross-flavor checklist ([`checklists/general.md`](../../checklists/general.md)).

`general.md` tests behavior that is **not** specific to one flavor — the `ns-` prefix
grammar, the variant model (`bare` / `-prop` / `-comp` / `-snippet-N`), tab-stop
semantics, IntelliSense trigger mechanics, and (most importantly) **language scoping**:
each `ns-*` prefix is contributed only to its mapped language via
`package.json` → `contributes.snippets`, so a prefix that expands in `.html` must be
absent in a plain `.ts` file. These fixtures give the tester one scratch file per
contributed language plus two negative files where **no** snippet should appear.

## Layout

```
general/
├── scratch.html      Angular scope (html)        — type ns-* here; expands
├── scratch.xml       Core scope (xml)            — type ns-* here; expands
├── scratch.vue       Vue scope (vue)             — type ns-* here; expands
├── scratch.tsx       React scope (typescriptreact) — type ns-* here; expands (lowercase tag)
├── scratch.jsx       React scope (javascriptreact) — type ns-* here; expands (lowercase tag)
├── scratch.svelte    Svelte scope (svelte)       — type ns-* here; expands (lowercase tag)
├── negative.ts       NOT a contributed language  — ns-* must NOT appear (scoping)
└── negative.json     NOT a contributed language  — ns-* must NOT appear (scoping)
```

## Fixture-to-checklist mapping

| Fixture | Section(s) | Purpose |
|---------|-----------|---------|
| `scratch.html` | §1, §2, §3 | Trigger + variant + tab-stop checks in the Angular (`html`) scope |
| `scratch.xml` | §1, §2, §3 | Same, Core (`xml`) scope |
| `scratch.vue` | §1, §4 | Same, Vue scope; also confirms `ns-icon-*` absent |
| `scratch.tsx` | §1, §4, §5 | React scope; lowercase-tag + `ns-icon-*` absent |
| `scratch.jsx` | §1, §5 | React `javascriptreact` scope (same snippets as `.tsx`) |
| `scratch.svelte` | §1, §4, §5 | Svelte scope; lowercase-tag + `ns-icon-*` absent |
| `negative.ts` | §4 | Language scoping — no `ns-*` snippet in `.ts` |
| `negative.json` | §4 | Language scoping — no `ns-*` snippet in `.json` |

## File count

| Location | Files |
|----------|------:|
| scratch files (one per contributed language) | 6 |
| negative files (unsupported languages) | 2 |
| **Total** | **8** |
