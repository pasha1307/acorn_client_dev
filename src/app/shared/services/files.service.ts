import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {apiUrl} from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  respMsg: any = {};
  tempUrl = '/api/admin/tempr';
  constructor(private http: HttpClient, private router: Router) { }
  saveFileData(file) {
    this.http
      .post(`${apiUrl}files`,  file)
      .subscribe(response => {
        console.log('File Data Saved', response);
        this.respMsg = response;
        this.router.navigate(['/']);
      });
  }
  deleteFile(fileId) {
    this.http.delete(`${apiUrl}files/` + fileId)
      .subscribe(response => {
        console.log('FILE DELETE RESPONSE', response);
        // this.respMsg = response;
        // this.router.navigate(['/app/edit/record/']);
      });
  }
  getFilesByPerson(id) {
    return this.http.get<any[]>(apiUrl + 'files/' + id);
  }
}
