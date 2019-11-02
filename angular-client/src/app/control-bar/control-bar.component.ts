import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StatusResult } from 'wallbox-proto/wallbox_grpc_web_pb';

import { StatusService } from '../status.service';


@Component({
  selector: 'app-control-bar',
  template: `
  <mat-progress-bar mode="determinate" value="40"></mat-progress-bar>
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
  </div>
  `,
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit {

  constructor(public service: StatusService) { }

  ngOnInit() {
    this.service.getStatus().pipe(
      map((v: StatusResult) => v.toObject())
    ).subscribe(console.log.bind(console));
  }

}
