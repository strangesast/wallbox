import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { pluck } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PlaylistsListResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot) {
    return {playlists: ['one', 'two']};
  }

}

@Component({
  selector: 'app-playlists-list-page',
  template: `
  <div *ngIf="playlists$ | async as playlists; else loading">
    <div *ngFor="let playlist of playlists">{{ playlist | json }}</div>
  </div>
  <ng-template #loading>Loading</ng-template>
  `,
  styleUrls: ['./playlists-list-page.component.scss']
})
export class PlaylistsListPageComponent implements OnInit {
  playlists$ = this.route.data.pipe(pluck('data', 'playlists'));

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {}

}
