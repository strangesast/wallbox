import { Component, Injectable, OnInit } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { WallboxClientService } from '../wallbox-client.service';
import { Uri } from 'wallbox-proto/wallbox_pb';

@Injectable({providedIn: 'root'})
export class FileListResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot) {
    return {files: []};
  }
}

@Component({
  selector: 'app-file-list-page',
  template: `
    <p>
      file-list-page works!
    </p>
  `,
  styleUrls: ['./file-list-page.component.scss']
})
export class FileListPageComponent implements OnInit {
  files$ = this.route.data.pipe(pluck('data', 'files'));

  constructor(public route: ActivatedRoute, public service: WallboxClientService) { }

  ngOnInit() {
    const uri = new Uri();
    uri.setUri('');
    console.log(uri);
    // console.log('uri', uri);
    this.service.client.databaseListFiles(uri, {}, (err, data) => {
      if (err) {
        throw err;
      }
      console.log('data', data.toObject());
    });
    // call.on('data', data => console.log('data', data));
    // call.on('error', error => console.log('error', error));
    // call.on('end', () => console.log('end'));
  }

}
