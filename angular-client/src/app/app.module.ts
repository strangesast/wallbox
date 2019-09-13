import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueuePageComponent } from './queue-page/queue-page.component';
import { ControlBarComponent } from './control-bar/control-bar.component';
import { PlaylistsListPageComponent } from './playlists-list-page/playlists-list-page.component';
import { FileListPageComponent } from './file-list-page/file-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    QueuePageComponent,
    ControlBarComponent,
    PlaylistsListPageComponent,
    FileListPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
