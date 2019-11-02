import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as pb from 'wallbox-proto/wallbox_grpc_web_pb';

import { BaseService } from '../base.service';
import { wrapUnaryUnary } from '../utils';
import * as queueActions from './queue.actions';


@Injectable({
  providedIn: 'root',
})
export class QueueService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot) {
    this.store.dispatch(queueActions.refresh());
    return true;
  }

  add(uri: string) {
    const arg = new pb.Uri();
    arg.setUri(uri);
    return wrapUnaryUnary((this.base as any).queueAdd.bind(this.base), arg);
  }

  getAll() {
    return wrapUnaryUnary((this.base as any).queueGetAll.bind(this.base));
  }

  constructor(public base: BaseService, public store: Store<{queue: any}>) { }
}
