import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-form-report-edit',
  templateUrl: './form-report-edit.component.html',
  styleUrls: ['./form-report-edit.component.scss']
})
export class FormReportEditComponent implements OnInit {
  @Input() report;
  @Input() coordinators;
  @Output() onedit = new EventEmitter<any>();
  reportId;
  order = 'sortName';
  locations;
  formats;
  importance;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.locations = this.route.snapshot.data.utils.filter(el => el.Locations);
    this.formats = this.route.snapshot.data.utils.filter(el => el.Formats);
    this.importance = this.route.snapshot.data.utils.filter(el => el.Importance);
  }
onSaveEdit(f: NgForm) {
    this.onedit.emit(f.value);
}
}
