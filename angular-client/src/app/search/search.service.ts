import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchParameters, SearchResultItemList } from 'wallbox-proto/wallbox_grpc_web_pb';

import { BaseService } from '../base.service';


@Injectable()
export class SearchService {
  getSearch(query): Observable<SearchResultItemList> {
    const params = new SearchParameters();
    params.setQuery(query);

    return Observable.create(observer => {
      (this.base as any).search(params, {}, (err, response) => {
        if (err == null) {
          observer.next(response);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  constructor(public base: BaseService) {}
}
