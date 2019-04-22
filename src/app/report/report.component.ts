import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../shared/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
coordinators;
reports: any[] = [];
  constructor(private route: ActivatedRoute, public reportService: ReportService) { }

  ngOnInit() {
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
    this.reports = this.route.snapshot.data.reports;
  }
onDelete(reportId) {
    this.reportService.deleteReport(reportId);
}
}
