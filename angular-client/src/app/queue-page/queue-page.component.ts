import { Component, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, first, pluck, map } from 'rxjs/operators';
import {PositionRange} from 'wallbox-proto/wallbox_pb';
import { WallboxClientService } from '../wallbox-client.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Injectable({
  providedIn: 'root',
})
export class QueueResolver implements Resolve<any[]> {
  constructor(public service: WallboxClientService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const call = this.service.client.queuePlaylistInfo(new PositionRange());
    return Observable.create(observer => call.on('data', d => observer.next(d))).pipe(first());
  }
}

@Component({
  selector: 'app-queue-page',
  template: `
  <div cdkDropList class="list" (cdkDropListDropped)="drop($event)" *ngIf="data$ | async as data">
    <div class="list-item" *ngFor="let item of data.getItemsList()" cdkDrag>{{item}}</div>
  </div>
  `,
  styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent implements OnDestroy {
  data = [];

  data$ = this.route.data.pipe(pluck('queue'));

  destroyed$ = new Subject();

  dataSub = this.data$.pipe(
    takeUntil(this.destroyed$),
    tap(data => console.log(data)),
  ).subscribe(data => this.data = data);

  constructor(public route: ActivatedRoute) { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
