import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';
import * as filesReducer from './files.reducers';
import { FilesEffects } from './files.effects';
import { FileBrowserContainerComponent } from './file-browser-container/file-browser-container.component';
import { FileBrowserBreadcrumbsComponent } from './file-browser-breadcrumbs/file-browser-breadcrumbs.component';
import { FileBrowserDirectoryComponent } from './file-browser-directory/file-browser-directory.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: '', component: FileBrowserContainerComponent, children: [
    {path: '**', component: FileBrowserDirectoryComponent},
  ]},
];

@NgModule({
  declarations: [
    FileBrowserContainerComponent,
    FileBrowserBreadcrumbsComponent,
    FileBrowserDirectoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(filesReducer.featureKey, filesReducer.reducer),
    EffectsModule.forFeature([FilesEffects]),
  ]
})
export class FilesModule { }
