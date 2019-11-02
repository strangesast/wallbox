import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

import { wrapUnaryUnary } from './utils';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  play() {
    wrapUnaryUnary((this.base as any).play.bind(this.base)).subscribe(null, null, () => console.log('complete'));
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
