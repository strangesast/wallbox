import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DurationPipe } from './duration.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MaterialModule } from '../material/material.module';


const components = [
  DurationPipe,
  SearchBarComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
})
export class SharedModule { }
