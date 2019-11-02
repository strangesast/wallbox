import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';

@Component({
  selector: 'app-queue-list',
  template: `
  <div class="container">
    <div *ngIf="queue$ | async as queue; else loading">
      <div class="message" *ngIf="queue.length == 0">Nothing in queue.</div>
      <div class="table">
        <div *ngFor="let song of queue" tabindex="0">
          <span>{{song.getPos() + 1}}</span>
          <span class="name">{{song.getTitle()}}</span>
          <span class="name">{{song.getArtist()}}</span>
          <span>{{song.getDuration() | duration}}</span>
          <button mat-icon-button aria-label="Options" [matMenuTriggerFor]="itemMenu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #itemMenu xPosition="before">
            <button mat-menu-item>Remove</button>
            <button mat-menu-item>Item 2</button>
          </mat-menu>
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-basis: 0;
  }
  :host > .container .message {
    padding: 8px;
  }
  `],
})
export class QueueListComponent implements OnInit {
  queue$ = this.store.pipe(select('queue', 'queue'));

  // queue$ = of(Array.from(Array(10), (_, i) => ({
  //   name: `Song ${i + 1}`,
  // })));

  constructor(public store: Store<{queue: any}>) { }

  ngOnInit() {
  }

}
