<!-- Svelte Native (language id: svelte).
     Try snippets in context: type ns-button (→ <button>), ns-slider-prop
     (→ bind:value), ns-segmented-bar-prop (→ bind:selectedIndex), ns-long-press …
     Svelte lowercases the first letter of every tag and has NO ns-icon-* snippets. -->
<page>
  <actionBar title="NativeScript Snippets — Svelte demo" />
  <gridLayout rows="auto, *" columns="*">
    <button row={0} text="Refresh" on:tap={onTap} />

    <stackLayout row={1} padding="12">

      <!-- Default -->

      <!-- Prop -->

      <!-- Comp -->

    </stackLayout>
  </gridLayout>
</page>

<script>
  function onTap() {
    console.log('tapped');
  }
</script>
