import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {QueuePageComponent} from './queue-page/queue-page.component';
import {PlaylistsListPageComponent, PlaylistsListResolver} from './playlists-list-page/playlists-list-page.component';
import {FileListResolver, FileListPageComponent} from './file-list-page/file-list-page.component';
import {FileListPageSubComponent} from './file-list-page/file-list-page-sub/file-list-page-sub.component';

// const routes: Routes = [
//   {path: '', pathMatch: 'full', redirectTo: '/queue'},
//   {path: 'files', component: FileListPageComponent, children: [
//     {path: '**', component: FileListPageSubComponent, resolve: {data: FileListResolver}},
//   ]},
//   {path: 'playlists', resolve: {data: PlaylistsListResolver}, component: PlaylistsListPageComponent},
//   {path: 'queue', resolve: {}, component: QueuePageComponent},
// ];
const routes = [
  { path: 'files', loadChildren:  () => import('./files/files.module').then(mod => mod.FilesModule) },
  { path: 'search', loadChildren:  () => import('./search/search.module').then(mod => mod.SearchModule) },
  { path: 'playlists', loadChildren:  () => import('./playlists/playlists.module').then(mod => mod.PlaylistsModule) },
  { path: 'queue', loadChildren:  () => import('./queue/queue.module').then(mod => mod.QueueModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
