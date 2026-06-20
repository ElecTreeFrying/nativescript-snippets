<!-- NativeScript-Vue SFC (language id: vue).
     Try snippets in context: inside <template>, type ns-button, ns-list-view-comp,
     ns-grid-layout-snippet-1, ns-swipe … (Vue has NO ns-icon-* snippets). -->
<template>
  <Page>
    <ActionBar title="NativeScript Snippets — Vue demo" />
    <GridLayout rows="auto, *" columns="*">
      <Button row="0" text="Refresh" @tap="onTap" />

      <ListView row="1" for="item in items">
        <v-template>
          <StackLayout orientation="horizontal" padding="12">
            <Label :text="item.name" />

            <!-- Default -->

            <!-- Prop -->

            <!-- Comp -->
             
          </StackLayout>
        </v-template>
      </ListView>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return { items: [{ name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }] };
  },
  methods: {
    onTap() {
      console.log('tapped');
    },
  },
};
</script>
