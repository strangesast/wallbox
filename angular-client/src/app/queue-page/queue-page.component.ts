import { Component, Injectable, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { share, tap, switchMap, takeUntil, first, pluck, map } from 'rxjs/operators';
import { PositionRange, PlaylistResult } from 'wallbox-proto/wallbox_pb';
import { WallboxClientService } from '../wallbox-client.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-queue-page',
  template: `
  <ng-container *ngIf="isLoading; else loading">
    <table mat-table [dataSource]="queue">
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef> Title </th>
        <td mat-cell *matCellDef="let item"> {{item.title}} </td>
      </ng-container>
      <ng-container matColumnDef="artist">
        <th mat-header-cell *matHeaderCellDef> Artist </th>
        <td mat-cell *matCellDef="let item"> {{item.artist}} </td>
      </ng-container>
      <ng-container matColumnDef="album">
        <th mat-header-cell *matHeaderCellDef> Album </th>
        <td mat-cell *matCellDef="let item"> {{item.album}} </td>
      </ng-container>
      <ng-container matColumnDef="duration">
        <th mat-header-cell *matHeaderCellDef> Duration </th>
        <td mat-cell *matCellDef="let item"> {{item.duration}} </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </ng-container>
  <ng-template #loading>Loading...</ng-template>
  <!--<pre>{{queue$ | async | json}}</pre>-->
  `,
  styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent implements OnDestroy, AfterViewInit {
  isLoading = true;
  displayedColumns: string[] = ['title', 'artist', 'album', 'duration'];
  range$ =  new BehaviorSubject(null);
  queue = [];
  destroyed$ = new Subject();

  constructor(public service: WallboxClientService) {}

  ngAfterViewInit() {
    const queue$ = this.range$.pipe(
      map(range => Observable.create(observer => this.service.client.queuePlaylistInfo(
        new PositionRange(),
        {},
        (err, data) => {
          if (err != null) {
            observer.error(err);
          } else {
            observer.next(data);
            observer.complete();
          }
        },
      ))),
      share(),
    );

    queue$.pipe(
      switchMap(o => o),
      map((data: PlaylistResult) => data.toObject()),
      map(obj => obj.itemsList),
      takeUntil(this.destroyed$),
    ).subscribe(queue => this.queue = queue);
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  // }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
