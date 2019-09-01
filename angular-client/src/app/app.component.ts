import { Component } from '@angular/core';
import {Empty} from 'wallbox-proto/wallbox_pb';
import {WallboxClient} from 'wallbox-proto/wallbox_grpc_web_pb';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <pre>{{data$ | async | json}}</pre>
  <pre>{{error$ | async | json}}</pre>
  <pre>{{status$ | async | json}}</pre>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data$;
  error$;
  status$;

  constructor() {
    const client = new WallboxClient(window.location.origin, null, null);

    const call = client.getStatus(new Empty(), {});

    this.data$ = fromEvent(call, 'data');
    this.status$ = fromEvent(call, 'status');
    this.error$ = fromEvent(call, 'error');

    call.on('status', res => console.log('status', res));
    call.on('data', res => console.log('data', res));
    call.on('error', err => console.log('error', err));
    call.on('end', () => console.log('end'));
  }
}
