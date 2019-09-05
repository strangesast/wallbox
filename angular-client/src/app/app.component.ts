import { Component } from '@angular/core';
import {Empty, Status} from 'wallbox-proto/wallbox_pb';
import {WallboxClient} from 'wallbox-proto/wallbox_grpc_web_pb';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
  <pre>{{state$ | async | json}}</pre>
  <pre *ngIf="data$ | async as data">{{data.toObject() | json}}</pre>
  <pre>{{error$ | async | json}}</pre>
  <pre>{{status$ | async | json}}</pre>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data$: Observable<Status>;
  dataRepr$: Observable<{}>;
  state$: Observable<string>;
  error$;
  status$;

  constructor() {
    const client = new WallboxClient(window.location.origin, null, null);

    const call = client.getStatus(new Empty(), {});

    this.data$ = Observable.create(observer => {
      call.on('data', obj => observer.next(obj as Status));
      call.on('error', e => observer.error(e));
      call.on('end', () => observer.complete());
    });

    this.dataRepr$ = this.data$.pipe(
      map(data => data || data.toObject()),
    );

    this.state$ = this.data$.pipe(
      map(obj => obj.getState()),
    );

    // this.status$ = fromEvent(call, 'status');
    // this.error$ = fromEvent(call, 'error');

    call.on('status', res => console.log('status', res));
    call.on('data', res => console.log('data', res));
    call.on('error', err => console.log('error', err));
    // call.on('end', () => console.log('end'));
  }
}
