import { Component, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, first, pluck, map } from 'rxjs/operators';
import {PositionRange, PlaylistResult} from 'wallbox-proto/wallbox_pb';
import { WallboxClientService } from '../wallbox-client.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Injectable({
  providedIn: 'root',
})
export class QueueResolver implements Resolve<any[]> {
  constructor(public service: WallboxClientService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return Observable.create(observer => this.service.client.queuePlaylistInfo(new PositionRange(), {}, (err, data) => {
      if (err != null) {
        observer.error(err);
      } else {
        observer.next(data);
        observer.complete();
      }
    })).pipe(
      map((data: PlaylistResult) => ({queue: data.toObject()})),
    );
  }
}

@Component({
  selector: 'app-queue-page',
  template: `
  <div *ngFor="let item of queue$ | async">
    <span>{{item.title}}</span>
    <span>{{item.artist}}</span>
    <span>{{item.album}}</span>
    <span>{{item.duration}}</span>
  </div>
  <pre>{{queue$ | async | json}}</pre>
  `,
  styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent {
  data = [];

  data$ = this.route.data.pipe(pluck('data', 'queue'));

  queue$ = this.data$.pipe(map(data => data.itemsList));

  // destroyed$ = new Subject();

  // dataSub = this.data$.pipe(
  //   takeUntil(this.destroyed$),
  //   tap(data => console.log(data)),
  // ).subscribe(data => this.data = data);

  constructor(public route: ActivatedRoute) {}

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  // }

  // ngOnDestroy() {
  //   this.destroyed$.next();
  //   this.destroyed$.complete();
  // }

}
