import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, delay, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as pb from 'wallbox-proto/wallbox_grpc_web_pb';

import * as filesActions from './files.actions';
import { FilesService } from './files.service';


@Injectable()
export class FilesEffects {

  updateURIComplete$ = createEffect(() => this.actions$.pipe(
    ofType(filesActions.updateURI),
    switchMap(action => this.service.getFilesURI(action.value)),
    map((response: pb.FileListResult) => {
      const results: any[] = response.getItemsList();
      return filesActions.updateURIComplete({results});
    }),
  ));

  constructor(
    public actions$: Actions,
    public service: FilesService,
  ) {}
}
