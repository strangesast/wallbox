import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchParameters, SearchResultItem } from 'wallbox-proto/wallbox_grpc_web_pb';

import { BaseService } from '../base.service';
import * as searchActions from './search.actions';
import { wrapUnaryStream } from '../utils';


@Injectable()
export class SearchService implements CanActivate {
  getSearch(query, metadata = {}): Observable<SearchResultItem> {
    const params = new SearchParameters();
    params.setQuery(query);
    return wrapUnaryStream((this.base as any).search.bind(this.base), params, metadata);
  }

  canActivate(route: ActivatedRouteSnapshot) {
    this.store.dispatch(searchActions.search({query: route.queryParams.q}));
    return true;
  }

  constructor(public base: BaseService, public store: Store<{search: any}>) {
  }
}
