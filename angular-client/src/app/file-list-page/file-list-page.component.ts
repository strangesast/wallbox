import { Component, Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { WallboxClientService } from '../wallbox-client.service';

@Injectable({providedIn: 'root'})
export class FileListResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot) {
    return {files: []};
  }
}

@Component({
  selector: 'app-file-list-page',
  template: `
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./file-list-page.component.scss']
})
export class FileListPageComponent {}
