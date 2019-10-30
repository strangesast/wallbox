import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empty, StatusResult } from 'wallbox-proto/wallbox_pb';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
  <div class="content">
    <header>
      <nav>
        <ul>
          <li><a [routerLink]="['/files']">files</a></li>
          <li><a [routerLink]="['/playlists']">playlists</a></li>
          <li><a [routerLink]="['/queue']">queue</a></li>
        </ul>
        <span class="spacer"></span>
        <app-search-bar (search)="onSearch($event)"></app-search-bar>
      </nav>
    </header>
    <router-outlet></router-outlet>
  </div>
  <app-control-bar></app-control-bar>
  `,
  styles: [`
  :host {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .spacer {
    flex-grow: 1;
  }
  :host > .content > header > nav {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  :host > .content > header > nav > ul {
    list-style-type: none;
    display: flex;
    padding-left: 0;
    margin: 0;
  }
  :host > .content > header > nav > ul > li {
  }
  :host > .content > header > nav > ul > li > a {
    padding: 8px;
    display: block;
  }
  :host > .content {
    flex-grow: 1;
    overflow: auto;
  }
  `],
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // data$: Observable<StatusResult>;
  // dataRepr$: Observable<{}>;
  // error$;
  // status$;

  constructor(public router: Router) {

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

  onSearch($event) {
    this.router.navigate(['/search'], { queryParams: { q: $event } });
  }
}
