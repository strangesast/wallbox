import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-bar',
  template: `
  <mat-icon>skip_previous</mat-icon>
  <mat-icon>play_arrow</mat-icon>
  <mat-icon>skip_next</mat-icon>
  `,
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
