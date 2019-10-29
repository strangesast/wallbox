import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-browser-container',
  template: `
  <div class="container">
    <app-file-browser-breadcrumbs></app-file-browser-breadcrumbs>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [`
  :host {
    display: block;
  }
  :host > .container {
    max-width: 800px;
    margin: 0 auto;
  }
  `],
})
export class FileBrowserContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
