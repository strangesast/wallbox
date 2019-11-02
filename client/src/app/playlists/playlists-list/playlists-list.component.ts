import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-playlists-list',
  template: `
  <div class="container">
    <header>
      <p class="message">playlists. 10 total.</p>
    </header>
    <div *ngIf="playlists$ | async as playlists">
      <div class="message" *ngIf="playlists.length == 0">No playlists.</div>
      <div class="table">
        <div *ngFor="let playlist of playlists" tabindex="0">
          <span class="name">{{playlist.name}}</span>
          <span class="count">{{playlist.songCount}} Songs</span>
        </div>
      </div>
    </div>
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
  :host .message {
    margin: 8px;
  }
  :host > .container .table > div {
    display: flex;
    height: 48px;
    align-items: center;
  }
  :host > .container .table > div:hover {
    background: #fafafa;
  }
  :host > .container .table > div > span.name {
    flex-grow: 1;
  }
  :host > .container .table > div > mat-icon,
  :host > .container .table > div > span {
    padding: 0 8px;
  }
    `],
})
export class PlaylistsListComponent implements OnInit {
  playlists$ = of(Array.from(Array(10), (_, i) => ({
    name: `Playlist ${i + 1}`,
    songCount: Math.floor(Math.random() * 20),
  })));

  constructor() { }

  ngOnInit() {
  }

}
