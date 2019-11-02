import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { QueueService } from './queue.service';
import { QueueListComponent } from './queue-list/queue-list.component';
import * as queueReducers from './queue.reducers';
import { QueueEffects } from './queue.effects';


const routes: Routes = [
  {path: '', canActivate: [QueueService], component: QueueListComponent},
];

@NgModule({
  declarations: [QueueListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(queueReducers.featureKey, queueReducers.reducer),
    EffectsModule.forFeature([QueueEffects]),
  ]
})
export class QueueModule { }
