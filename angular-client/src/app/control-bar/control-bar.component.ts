import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-bar',
  template: `
  <mat-progress-bar mode="determinate" value="40"></mat-progress-bar>
  <div class="controls">
    <button mat-icon-button aria-label="Toggle Repeat">
      <mat-icon>repeat</mat-icon>
    </button>
    <button mat-icon-button aria-label="Previous">
      <mat-icon>skip_previous</mat-icon>
    </button>
    <button mat-icon-button aria-label="Play">
      <mat-icon>play_arrow</mat-icon>
    </button>
    <button mat-icon-button aria-label="Next">
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

  constructor() { }

  ngOnInit() {
  }

}
