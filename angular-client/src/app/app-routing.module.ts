import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {QueuePageComponent, QueueResolver} from './queue-page/queue-page.component';
import {PlaylistsListPageComponent, PlaylistsListResolver} from './playlists-list-page/playlists-list-page.component';
import {FileListResolver, FileListPageComponent} from './file-list-page/file-list-page.component';
import {FileListPageSubComponent} from './file-list-page/file-list-page-sub/file-list-page-sub.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/queue'},
  {path: 'files', component: FileListPageComponent, children: [
    {path: '**', component: FileListPageSubComponent, resolve: {data: FileListResolver}},
  ]},
  {path: 'playlists', resolve: {data: PlaylistsListResolver}, component: PlaylistsListPageComponent},
  {path: 'queue', resolve: {data: QueueResolver}, component: QueuePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
