import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QueueListComponent } from './queue-list/queue-list.component';


const routes: Routes = [
  {path: '', component: QueueListComponent},
];

@NgModule({
  declarations: [QueueListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class QueueModule { }
