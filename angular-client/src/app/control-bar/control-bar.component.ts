import { Component, OnInit } from '@angular/core';
import { StatusResult } from 'wallbox-proto/wallbox_grpc_web_pb';
import { switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { Observable, of, interval } from 'rxjs';

import { StatusService } from '../status.service';


@Component({
  selector: 'app-control-bar',
  template: `
  <mat-progress-bar mode="determinate" [value]="progress$ | async"></mat-progress-bar>
  <div class="controls">
    <button mat-icon-button aria-label="Toggle Repeat">
      <mat-icon>repeat</mat-icon>
    </button>
    <button mat-icon-button aria-label="Previous" (click)="service.previous()">
      <mat-icon>skip_previous</mat-icon>
    </button>
    <button mat-icon-button aria-label="Play" (click)="service.play()">
      <mat-icon>play_arrow</mat-icon>
    </button>
    <button mat-icon-button aria-label="Pause" (click)="service.toggle()">
      <mat-icon>pause</mat-icon>
    </button>
    <button mat-icon-button aria-label="Next" (click)="service.next()">
      <mat-icon>skip_next</mat-icon>
    </button>
    <button mat-icon-button aria-label="Toggle Shuffle">
      <mat-icon>shuffle</mat-icon>
    </button>
    <mat-slider min="1" max="5" step="0.5" value="1.5"></mat-slider>
  </div>
  `,
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit {
  status$ = this.service.getStatus().pipe(
    map((v: StatusResult) => v.toObject()),
    shareReplay(1),
  );

  progress$ = this.status$.pipe(
    switchMap((o: any) => Observable.create(observer => {
      let id;
      let i = 0;
      const fn = () => {
        let v = (o.elapsed + i++ / 2) / o.duration * 100;
        if (isNaN(v)) {
          v = -1;
        }
        observer.next(v);
        if (o.state === 'play' && v > 0 && v < 100) {
          id = setTimeout(fn, 500);
        }
      };
      fn();
      return () => clearInterval(id);
    })),
    shareReplay(1),
  );

  constructor(public service: StatusService) { }

  ngOnInit() {}

}
