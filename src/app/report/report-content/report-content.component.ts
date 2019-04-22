import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-content',
  templateUrl: './report-content.component.html',
  styleUrls: ['./report-content.component.scss']
})
export class ReportContentComponent implements OnInit {
@Input() report;
  constructor() { }

  ngOnInit() {
  }

}
