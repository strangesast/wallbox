import { Injectable } from '@angular/core';
import { WallboxClient } from 'wallbox-proto/wallbox_grpc_web_pb';

@Injectable({
  providedIn: 'root',
})
export class WallboxClientService {
  public client = new WallboxClient(window.location.origin, null, null) as WallboxClient;

  constructor() {}
}
