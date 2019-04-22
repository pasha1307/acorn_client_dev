import { Injectable } from '@angular/core';
import {apiUrl} from '../api-url';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportsUrl = apiUrl + 'reports/';
  respMsg;

  constructor(private http: HttpClient, private router: Router ) { }
  getReports() {
    return this.http.get<any[]>(this.reportsUrl);
  }
  getReport(id: string) {
    return this.http.get <any> (this.reportsUrl  + id);
  }
  postReport(report) {
    console.log('SUBMITTED REPORT:', report);
    this.http
      .post(
        this.reportsUrl,
       report
      )
      .subscribe(responseData => {
        console.log('POST Report', responseData);
        this.router.navigate(['/']);
      });
  }
  deleteReport(reportId) {
    this.http.delete(this.reportsUrl + reportId)
      .subscribe(response => {
        console.log('REPORT DELETE RESPONSE', response);
        // this.respMsg = response;
        this.router.navigate(['/']);
      });
  }
  editReport(reportId, report) {
    this.http
      .put(this.reportsUrl + reportId, report)
      .subscribe(response => {
        console.log('UPDATED REPORT RESPONSE', response);
        this.router.navigate(['/app/reports']);
      });
  }
}
