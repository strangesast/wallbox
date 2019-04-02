import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <span>Welcome to {{title}}!</span>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'wallbox';
}
