import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <span>Welcome to {{title}}!</span>
    <div>
      <progress></progress>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
