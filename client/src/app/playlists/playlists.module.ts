import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistsListComponent } from './playlists-list/playlists-list.component';


const routes: Routes = [
  { path: '', component: PlaylistsListComponent },
];

@NgModule({
  declarations: [PlaylistsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PlaylistsModule { }
