import { Injectable } from '@angular/core';
import { WallboxApiClient } from 'wallbox-proto/wallbox_grpc_web_pb';


@Injectable({
  providedIn: 'root',
})
export class BaseService extends WallboxApiClient {
  constructor() {
    super(window.location.origin, null, null);
  }
}
