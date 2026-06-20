import { EventData, Page, Observable } from '@nativescript/core';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  const vm = new Observable();
  vm.set('title', 'NativeScript Snippets — Core demo');
  page.bindingContext = vm;
}

export function onTap() {
  console.log('tapped');
}
