import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {recordsUrl} from '../api-url';


@Injectable({
  providedIn: 'root'
})
export class RecordsResolverService implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(): Observable<any> | Promise<any> | any {
 return this.http.get<any>(recordsUrl).pipe(
    map(data => data),
    catchError(err => err)
  );
  }
}

