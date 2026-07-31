# Security Policy

## Supported versions

Only the **latest published version** of NativeScript Snippets receives security
fixes. Older versions are never patched in place — a fix ships as a new release to
both registries:

- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ElecTreeFrying.nativescript-angular-html-snippets)
- [Open VSX](https://open-vsx.org/extension/ElecTreeFrying/nativescript-angular-html-snippets)

If you are reporting against an older version, please confirm the problem still
reproduces on the latest one first.

## Reporting a vulnerability

**Please do not open a public issue for a security problem.** A public report tells
everyone about the weakness before there is a fix available.

Email **electreefrying.git@gmail.com** with:

- what the problem is, and roughly how severe you think it is
- the extension version, your VS Code (or Cursor / VSCodium / Windsurf) version, and your OS
- steps to reproduce, or a proof of concept
- whether you would like to be credited in the release notes, and under what name

You can expect an acknowledgement as soon as I can manage it — usually within a week.
If the report is confirmed, I will let you know the fix timeline and tell you when the
patched version is live on both registries. If I conclude it is not a vulnerability,
I will explain why rather than going quiet.

This is a solo-maintained project, so please be patient with response times. There is
no bug bounty.

## Scope

The attack surface here is unusually small, and it is worth being explicit about why.
This extension **ships no executable code at all** — no `main`, no `activationEvents`,
no bundle. The published artifact is `package.json` plus declarative snippet JSON
under `snippets/`. Nothing runs; VS Code reads the snippet definitions and expands
them on request. There are no runtime dependencies, no network requests, and no
telemetry.

**In scope:**

- Snippet content that VS Code's snippet engine would treat as something other than
  literal text — a variable, a command, or a shell transform smuggled through a
  `${...}` construct
- A malformed snippet file that crashes or hangs the editor
- Anything in the published `package.json` that grants the extension more capability
  than a snippets extension should have

**Out of scope:**

- Vulnerabilities in VS Code itself — report those to
  [Microsoft](https://github.com/microsoft/vscode/security/policy)
- Snippets that expand to *wrong* or outdated NativeScript markup — ordinary bugs,
  please open a normal issue
- The local generator under `tools/`. It is developer tooling, is not committed, and
  is not part of any published release

## Disclosure

Please give me a reasonable window to ship a fix before disclosing publicly. Once the
patched version is live on both registries, you are welcome to write about it — and
I will credit you in the release notes if you would like.
