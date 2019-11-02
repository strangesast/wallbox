import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, scan, pluck, startWith, switchMap, shareReplay, takeUntil } from 'rxjs/operators';
import { animate, trigger, state, transition, style } from '@angular/animations';
import { QueueService } from '../../queue/queue.service';

import { SearchService } from '../search.service';

@Component({
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '48px', minHeight: '0'})),
      state('expanded', style({height: '100px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  selector: 'app-search-results',
  template: `
  <div class="container">
    <header>
      <p>search for "{{query$ | async}}"</p>
      <p *ngIf="count$ | async as count">{{ count }} Song{{count > 1 ? 's' : ''}}</p>
    </header>
    <div *ngIf="results$ | async as results; else loading">
      <div class="message" *ngIf="results.length == 0">No results.</div>
      <div class="table">
        <div *ngFor="let result of results"
          tabindex="0">
          <div>
            <mat-icon>music_note</mat-icon>
            <span class="name" [title]="result.getTitle()">{{result.getTitle()}}</span>
            <span class="name" [title]="result.getArtist()">{{result.getArtist()}}</span>
            <span class="name" [title]="result.getAlbum()">{{result.getAlbum()}}</span>
            <button mat-icon-button aria-label="Options" [matMenuTriggerFor]="itemMenu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #itemMenu xPosition="before">
              <button mat-menu-item (click)="addToQueue(result.getUri())">Add to queue</button>
              <button mat-menu-item>Item 2</button>
            </mat-menu>
          </div>
        </div>
      </div>
    </div>
    <ng-template #loading>
      <div class="message">Loading...</div>
    </ng-template>
  </div>
  `,
  styles: [`
  :host {
    display: block;
  }
  :host > .container {
    max-width: 800px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  :host > .container > header {
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }
  :host > .container .table {
    display: flex;
    flex-direction: column;
  }
  :host > .container .table > div > div {
    display: flex;
    align-items: center;
    height: 48px;
    cursor: pointer;
  }
  :host > .container .table > div {
  }
  :host > .container .table > div > div:first:hover {
    background: #fafafa;
  }
  :host > .container .table > div > div > span.name {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-basis: 0;
    white-space: nowrap;
  }
  :host > .container .table > div > div > span,
  :host > .container .table > div > div > mat-icon {
    padding: 0 8px;
  }
  :host > .container .message {
    padding: 8px;
  }
    `]
})
export class SearchResultsComponent {
  query$ = this.store.select('search', 'query');
  results$ = this.store.select('search', 'results');
  count$ = this.store.select('search', 'count');

  constructor(
    public store: Store<{search: any}>,
    public route: ActivatedRoute,
    public service: SearchService,
    public queue: QueueService,
  ) {}

  addToQueue(uri) {
    this.queue.add(uri).subscribe(null, null, () => console.log('complete'));
  }
}
