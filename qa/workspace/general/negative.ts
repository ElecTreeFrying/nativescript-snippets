// NEGATIVE fixture (language id: typescript).
//
// This extension scopes every ns-* prefix to specific languages via
// package.json > contributes.snippets. TypeScript is NOT one of them, so typing
// any ns-* prefix here must offer NO snippet from this extension.
//
// Put the cursor below, type "ns-button" / "ns-" and confirm the completion list
// shows none of this extension's snippets (other TS keyword completions are fine).

export const note = 'type ns-button below — nothing from this extension should appear';

