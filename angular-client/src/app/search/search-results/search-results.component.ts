import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, map, pluck, switchMap, shareReplay, takeUntil } from 'rxjs/operators';
import { animate, trigger, state, transition, style } from '@angular/animations';

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
    </header>
    <div *ngIf="results$ | async as results; else loading">
      <div class="message" *ngIf="results.length == 0">No results.</div>
      <div class="table">
        <div *ngFor="let result of results"
          tabindex="0"
          (focus)="activate(result.getUri())"
          [@detailExpand]="(activated$ | async) == result.getUri() ? 'expanded' : 'collapsed'">
          <div>
            <mat-icon>music_note</mat-icon>
            <span class="name">{{result.getName()}}</span>
            <button mat-icon-button aria-label="Options" [matMenuTriggerFor]="itemMenu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #itemMenu xPosition="before">
              <button mat-menu-item>Item 1</button>
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
export class SearchResultsComponent implements OnInit, OnDestroy {
  activated$ = new BehaviorSubject(null);

  activatedInfo$ = this.activated$.pipe();

  query$ = this.route.queryParams.pipe(
    pluck('q'),
    shareReplay(1),
  );
  destroyed$ = new Subject();

  results$ = this.query$.pipe(
    switchMap(query => this.service.getSearch(query)),
    tap(() => this.activated$.next(null)),
    map(response => {
      console.log(response);
      return response.getItemsList();
    }),
  );

  constructor(
    public route: ActivatedRoute,
    public service: SearchService,
  ) {}

  activate(uri: string) {
    this.activated$.next(uri);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
