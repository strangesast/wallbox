import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-file-browser-container',
  template: `
  <div class="container">
    <app-file-browser-breadcrumbs [items]="uriSegments$ | async"></app-file-browser-breadcrumbs>
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
  uri$ = this.store.pipe(
    select('files'),
    select('uri'),
  );

  uriSegments$ = this.uri$.pipe(
    map(s => s.split('/').reduce((acc, name) => {
      const uri = (acc.length > 0 ? acc[acc.length - 1].uri : []).concat(name);
      acc.push({uri, name});
      return acc;
    }, [])),
  );

  constructor(public store: Store<{files: any}>) {}

  ngOnInit() {}

}
