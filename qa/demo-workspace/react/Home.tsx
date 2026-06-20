// @ts-nocheck — declarative snippets sandbox; framework refs are intentionally uninstalled (see qa/CLAUDE.md).
// NativeScript-React (language id: typescriptreact).
// Try snippets in context: inside the returned JSX, type ns-button (→ <button>),
// ns-list-view-comp, ns-grid-layout-snippet-1, ns-tap … (React has NO ns-icon-* and
// lowercases the first letter of every tag). RootLayout / SplitView / Repeater are absent in React.
import * as React from 'react';

export function Home() {
  const onTap = () => console.log('tapped');

  return (
    <gridLayout rows="auto, *" columns="*">
      <button row={0} text="Refresh" onTap={onTap} />

      <stackLayout row={1} padding={12}>

        {/* Default */}        

        {/* Prop */}

        {/* Comp */}

      </stackLayout>
    </gridLayout>
  );
}
