import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-browser-breadcrumbs',
  template: `
  <div>
    <a [routerLink]="['/files']">root</a>
  </div>
  <div *ngFor="let item of items">
    <a [routerLink]="item.uri">{{item.name}}</a>
  </div>
  `,
  styles: [`
  :host {
    display: flex;
  }
  :host > div {
    display: flex;
  }
  :host > div > a, :host > div > span {
    padding: 8px;
    white-space: nowrap;
    overflow: ellipsis;
  }
  :host > div:not(:last-child):after {
    content: '/';
    display: flex;
    align-items: center;
  }
  `]
})
export class FileBrowserBreadcrumbsComponent implements OnInit {
  @Input()
  items = [];

  // items = ['one', 'two', 'three'].reduce((acc, name) => {
  //   const uri = (acc.length > 0 ? acc[acc.length - 1].uri : []).concat(name);
  //   acc.push({uri, name});
  //   return acc;
  // }, []);

  constructor() { }

  ngOnInit() {
  }

}
