import { Component } from '@angular/core';
import {Empty, StatusResult} from 'wallbox-proto/wallbox_pb';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
  <header>
    <nav>
      <a [routerLink]="['/queue']">Queue</a>
      <a [routerLink]="['/playlists']">Playlists</a>
      <a [routerLink]="['/files']">Files</a>
    </nav>
  </header>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  <app-control-bar></app-control-bar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // data$: Observable<StatusResult>;
  // dataRepr$: Observable<{}>;
  // error$;
  // status$;

  constructor() {

    /*
    console.log(client);
    const call = client.stats(new Empty(), {});
    // const call = client.getStatus(new Empty(), {});

    this.data$ = Observable.create(observer => {
      call.on('data', obj => observer.next(obj as StatusResult));
      call.on('error', e => observer.error(e));
      call.on('end', () => observer.complete());
    });

    this.dataRepr$ = this.data$.pipe(
      map(data => data || data.toObject()),
    );

    this.status$ = Observable.create(observer => {
      call.on('status', s => observer.next(s));
    });

    this.error$ = Observable.create(observer => {
      call.on('error', err => observer.next(err));
    });
    call.on('end', () => console.log('end'));
    */
  }
}
