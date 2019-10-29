import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WallboxClient } from 'wallbox-proto/wallbox_grpc_web_pb';


@Injectable({
  providedIn: 'root',
})
export class FilesService {

  getFilesAtURI(uri: string) {
    return this.http.get(`/api/files/${uri}`);
  }

  getSearch() {
    return this.http.get(`/api/search`);
  }

  constructor(public http: HttpClient) {}
}
