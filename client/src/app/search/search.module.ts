import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchService } from './search.service';
import * as searchReducer from './search.reducers';
import { SearchEffects } from './search.effects';


const routes: Routes = [
  {
    path: '',
    canActivate: [SearchService],
    component: SearchResultsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
];

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(searchReducer.featureKey, searchReducer.reducer),
    EffectsModule.forFeature([SearchEffects]),
  ],
  providers: [
    SearchService,
  ],
})
export class SearchModule { }
