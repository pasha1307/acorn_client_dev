import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Record} from '../../models/record.model';
import {apiUrl} from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  urlRecords = 'http://localhost:5001/records/';
  urlOSW = 'http://localhost:5001/osw';
  urlGroups = apiUrl + 'groups-records/';
  urlGroup = apiUrl + 'groups/';
  records: Record[] = [];
  respMsg: any = {};
  private updatedRecords = new Subject<any[]>();
  constructor(private http: HttpClient, private router: Router) { }
  // RECORD-ITEMS
  getSingle(id: string) {
    return this.http.get <any> (this.urlRecords + id);
  }
  allRecords() {
    return this.http.get<any[]>(this.urlRecords);
  }
  postRecord(record) {
    this.http
      .post(
        this.urlRecords,
        record
      )
      .subscribe(responseData => {
        console.log('POST DATA', responseData);
        this.router.navigate(['/']);
      });
  }
  updateRecordItem(recordId, record) {
    this.http
      .put(this.urlRecords + recordId, record)
      .subscribe(response => {
        console.log('UPDATE RECORD RESPONSE', response);
        this.router.navigate(['/']);
      });
  }
  deleteRecord(recordId) {
    this.http.delete('http://localhost:5001/records/' + recordId)
      .subscribe(response => {
        console.log('DEL RECORD RESPONSE', response);
        this.respMsg = response;
        this.router.navigate(['/temp']);
      });
  }
  // OWS-RECORDS
  postOSW(record) {
    console.log('DATA OSW', record);
    this.http
      .post(
        this.urlOSW,
        record
      )
      .subscribe(responseData => {
        console.log('POST OSW DATA', responseData);
        this.router.navigate(['/']);
      });
  }
  updateOSW(recordId, osw) {
    console.log('ID', recordId, 'REC', osw);
    this.http
      .put('http://localhost:5001/oswrecords/' + recordId, osw)
      .subscribe(response => {
        console.log('OSW UPDATE RESPONSE', response);
        this.router.navigate(['/']);
      });
  }
  // GROUPS-RECORDS
  getGroupsRecords() {
   return this.http.get<any[]>('http://localhost:5001/api/groups-records/');
  }
  getGroupWithRecords(id) {
    return this.http.get <any> (this.urlGroup + id);
  }
  postGroupRecord(record) {
    console.log('DATA', record);
    this.http
      .post(this.urlGroups, record)
      .subscribe(responseData => {
        console.log('GROUP RECORDS', responseData);
        this.router.navigate(['/']);
      });
  }
  updateGroupRecords(groupId, record) {
    console.log('ON SERVICE', groupId, record);
    this.http
      .put(this.urlGroup + groupId, record)
      .subscribe(response => {
        console.log('Updated Group Response', response);
        this.router.navigate(['/']);
      });
  }
  updateGroupStatus(groupId, group) {
    console.log('Group Status', groupId, group);
    this.http
      .put('http://localhost:5001/api/groups-records/' + groupId, group)
      .subscribe(response => {
        console.log('Group Status Has Been Updated', response);
        this.router.navigate(['/']);
      });
  }
  // getUpdatedRecordsListener() {
  //   return this.updatedRecords.asObservable();
  // }
}
