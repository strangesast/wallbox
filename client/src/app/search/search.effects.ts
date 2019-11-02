import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { finalize, debounceTime, defaultIfEmpty, scan, map, delay, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as pb from 'wallbox-proto/wallbox_grpc_web_pb';

import * as searchActions from './search.actions';
import { SearchService } from './search.service';


@Injectable()
export class SearchEffects {

  updateURIComplete$ = createEffect(() => this.actions$.pipe(
    ofType(searchActions.search),
    switchMap(({query}) => {
      const o = this.service.getSearch(query).pipe(
        scan((acc, cur) => acc.concat(cur), []),
        debounceTime(500),
      );
      return o.pipe(defaultIfEmpty([]));
    }),
    map((results: pb.SearchResultItem[]) =>
      searchActions.searchComplete({results})),
  ));

  constructor(
    public actions$: Actions,
    public service: SearchService,
  ) {}
}
