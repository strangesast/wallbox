import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { QueueSong, Empty, StatusResult } from 'wallbox-proto/wallbox_grpc_web_pb';
import { map } from 'rxjs/operators';

import { wrapUnaryStream, wrapUnaryUnary } from './utils';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  state() {
    return this._state().pipe(
      map((v: StatusResult) => v.toObject())
    );
  }
  _state() {
    const arg = new Empty();
    return wrapUnaryStream((this.base as any).state.bind(this.base), arg);
  }
  play(pos = 0) {
    const arg = new QueueSong();
    arg.setPos(pos);
    this._play(arg).subscribe(null, null, () => console.log('complete'));
  }
  playid(id = 0) {
    const arg = new QueueSong();
    arg.setId(id);
    this._play(arg).subscribe(null, null, () => console.log('complete'));
  }
  _play(arg) {
    return wrapUnaryUnary((this.base as any).play.bind(this.base), arg);
  }
  toggle() {
    wrapUnaryUnary((this.base as any).toggle.bind(this.base)).subscribe(null, null, () => console.log('complete'));
  }
  pause() {
    wrapUnaryUnary((this.base as any).pause.bind(this.base)).subscribe(null, null, () => console.log('complete'));
  }
  next() {
    wrapUnaryUnary((this.base as any).next.bind(this.base)).subscribe(null, null, () => console.log('complete'));
  }
  previous() {
    wrapUnaryUnary((this.base as any).previous.bind(this.base)).subscribe(null, null, () => console.log('complete'));
  }
  stop() {
    wrapUnaryUnary((this.base as any).stop.bind(this.base)).subscribe(null, null, () => console.log('complete'));
  }
  getStatus() {
    return wrapUnaryUnary((this.base as any).status.bind(this.base));
  }
  constructor(public base: BaseService) {}
}
