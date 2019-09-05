import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, pluck, map } from 'rxjs/operators';
import {PositionRange} from 'wallbox-proto/wallbox_pb';
import { WallboxClientService } from '../wallbox-client.service';

@Injectable({
  providedIn: 'root',
})
export class QueueResolver implements Resolve<any[]> {
  constructor(public service: WallboxClientService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const call = this.service.client.queuePlaylistInfo(new PositionRange());
    return Observable.create(observer => call.on('data', d => observer.next(d))).pipe(first());
  }
}

@Component({
  selector: 'app-queue-page',
  template: `
  <pre>{{data$ | async | json}}</pre>
  `,
  styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent implements OnInit {
  data$ = this.route.data.pipe(
    pluck('queue'),
    map(data => {
      return data ? data.toObject() : null;
    }),
  );

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route);
  }

}
