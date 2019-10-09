import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WallboxClientService } from '../../wallbox-client.service';
import { Uri, FileListResult } from 'wallbox-proto/wallbox_pb';

@Component({
  selector: 'app-file-list-page-sub',
  template: `
  <div class="breadcrumbs">
    <span *ngFor="let each of breadcrumbs$ | async"><a [routerLink]="each.uri">{{each.text}}</a></span>
  </div>
  <table mat-table [dataSource]="files$">
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let item">

        <ng-container *ngSwitch="item.type">
        <a [routerLink]="['/files', item.uri]">{{item.name}}</a>
      </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  <!--
  <div *ngFor="let item of files.itemsList">
    <ng-container [ngSwitch]="item.type">
      <a *ngSwitchCase="'directory'" [routerLink]="['/files', item.uri]">{{item.name}}</a>
      <span *ngSwitchCase="'file'">{{item.name}}</span>
    </ng-container>
  </div>
  -->
  <ng-template #loading>Loading</ng-template>
  `,
  styleUrls: ['./file-list-page-sub.component.scss']
})
export class FileListPageSubComponent implements OnInit {
  displayedColumns = ['name'];
  url$ = this.route.url.pipe(map(urlSegments => urlSegments.map(seg => seg.path).join('/')));

  breadcrumbs$ = this.route.url.pipe(map(urlSegments => [{uri: ['/files'], text: 'Root'}, ...urlSegments.map((seg, i) => ({
    uri: urlSegments.slice(0, i).map(s => s.path),
    text: seg.path,
  }))]));

  files$ = this.url$.pipe(
    map(uri => {
      const o = new Uri();
      o.setUri(uri);
      return o;
    }),
    switchMap(uri => Observable.create(observer => this.service.client.databaseListFiles(uri, {}, (err, data) => {
      if (err) {
        observer.error(err);
      } else {
        observer.next(data);
      }
      observer.complete();
    }))),
    map((o: FileListResult) => o.getItemsList().map(v => v.toObject())),
  );

  constructor(public route: ActivatedRoute, public service: WallboxClientService) { }

  ngOnInit() {}

}
