import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-queue-list',
  template: `
  <div class="container">
    <div *ngIf="queue$ | async as queue; else loading">
      <div class="message" *ngIf="queue.length == 0">Nothing in queue.</div>
      <div class="table">
        <div *ngFor="let song of queue" tabindex="0">
          <span class="name">{{song.name}}</span>
        </div>
      </div>
    </div>
    <ng-template #loading>Loading...</ng-template>
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
  :host > .container .table {
    display: block;
  }
  :host > .container .table > div {
    display: flex;
    height: 48px;
    align-items: center;
  }
  :host > .container .table > div:hover {
    background: #fafafa;
  }
  :host > .container .table > div > span {
    padding: 0 8px;
  }
  :host > .container .table > div > span.name {
    flex-grow: 1;
  }
  :host > .container .message {
    padding: 8px;
  }
  `],
})
export class QueueListComponent implements OnInit {
  queue$ = of(Array.from(Array(10), (_, i) => ({
    name: `Song ${i + 1}`,
  })));

  constructor() { }

  ngOnInit() {
  }

}
