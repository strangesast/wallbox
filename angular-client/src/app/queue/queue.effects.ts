import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { startWith, switchMap, map } from 'rxjs/operators';
import * as pb from 'wallbox-proto/wallbox_grpc_web_pb';

import * as queueActions from './queue.actions';
import { QueueService } from './queue.service';


@Injectable()
export class QueueEffects {
  refreshQueue$ = createEffect(() => this.actions$.pipe(
    ofType(queueActions.refresh),
    switchMap(() => {
      return this.service.getAll();
    }),
    map((result: pb.PlaylistResult) => {
      const queue = result.getItemsList();
      return queueActions.refreshSuccess({queue});
    }),
  ));

  constructor(
    public actions$: Actions,
    public service: QueueService,
  ) {}
}
