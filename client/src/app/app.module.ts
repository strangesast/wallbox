import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueuePageComponent } from './queue-page/queue-page.component';
import { ControlBarComponent } from './control-bar/control-bar.component';
import { PlaylistsListPageComponent } from './playlists-list-page/playlists-list-page.component';
import { FileListPageComponent } from './file-list-page/file-list-page.component';
import { FileListPageSubComponent } from './file-list-page/file-list-page-sub/file-list-page-sub.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    QueuePageComponent,
    ControlBarComponent,
    PlaylistsListPageComponent,
    FileListPageComponent,
    FileListPageSubComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
