import { Component } from '@angular/core';
import {WallboxClient} from 'wallbox-proto/wallbox_grpc_web_pb';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const client = new WallboxClient('http://localhost:8080', null, null);
  }
}
