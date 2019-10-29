import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { delay, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as filesActions from './files.actions';
import { FilesService } from './files.service';


@Injectable()
export class FilesEffects {

  updateSearchComplete$ = createEffect(() => this.actions$.pipe(
    ofType(filesActions.updateSearch),
    switchMap(action => {
      return of(filesActions.updateSearchComplete({
        results: [],
      })).pipe(
        delay(1000),
      );
    }),
  ));

  updateURIComplete$ = createEffect(() => this.actions$.pipe(
    ofType(filesActions.updateURI),
    switchMap(action => {
      return of(filesActions.updateURIComplete({
        results: [],
      })).pipe(
        delay(1000),
      );
    }),
  ));

  constructor(
    public actions$: Actions,
    public service: FilesService,
  ) {}
}
