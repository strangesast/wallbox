import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as pb from 'wallbox-proto/wallbox_grpc_web_pb';

import { updateURI } from './files.actions';
import { BaseService } from '../base.service';


@Injectable({
  providedIn: 'root',
})
export class FilesService implements CanActivate {

  getFilesURI(uriString: string) {
    const  uri = new pb.Uri();
    uri.setUri(uriString);
    return Observable.create(observer => (this.base as any).getFilesAtURI(
      uri,
      {},
      (err, response) => {
        if (err == null) {
          observer.next(response);
        } else {
          observer.error(err);
        }
        observer.complete();
      },
    ));
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const value = route.url.map(o => o.path).join('/');
    this.store.dispatch(updateURI({value}));
    return true;
  }

  constructor(public store: Store<{files: any}>, public base: BaseService) {}
}
