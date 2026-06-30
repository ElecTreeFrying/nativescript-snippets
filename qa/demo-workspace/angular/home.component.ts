// @ts-nocheck — declarative snippets sandbox; framework refs are intentionally uninstalled (see qa/CLAUDE.md).
import { Component } from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'NativeScript Snippets — Angular demo';
  items = [{ name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }];

  onTap(): void {
    console.log('tapped');
  }
}
