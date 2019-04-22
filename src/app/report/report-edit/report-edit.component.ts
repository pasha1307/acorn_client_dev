import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ReportService} from '../../shared/services/report.service';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss']
})
export class ReportEditComponent implements OnInit {
report;
reportId;
order = 'sortName';
coordinators;
locations;
formats;
importance;
workDoneForm: FormGroup;
contributors: FormArray;
  constructor(private route: ActivatedRoute,
              public reportService: ReportService,
              private fb: FormBuilder
              ) {
    this.workDoneForm = this.fb.group({
      contributors: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('reportId')) {
        this.reportId = paramMap.get('reportId');
        this.reportService.getReport(this.reportId).subscribe(result => {
          this.report = result;
          this.getContributorsArray(this.report);
        });
      }
    });
    // this.locations = this.route.snapshot.data.utils.filter(el => el.Locations);
    // this.formats = this.route.snapshot.data.utils.filter(el => el.Formats);
    // this.importance = this.route.snapshot.data.utils.filter(el => el.Importance);
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
  }
  getControls() {
   return (this.workDoneForm.get('contributors') as FormArray).controls;
  }
  newPerson(): FormGroup {
    return this.fb.group({
      personId: [''],
      dateCompleted: [''],
      completedHours: ['']
    });
  }
  addPerson() {
    (this.workDoneForm.get('contributors') as FormArray).push(this.newPerson());
  }
  removePerson(index) {
    (this.workDoneForm.get('contributors') as FormArray).removeAt(index);
  }
  getContributorsArray(p) {
    if (p && p.itemIdentification.workDoneBies.length > 0) {
      p.itemIdentification.workDoneBies.forEach(el => {
        (this.workDoneForm.get('contributors') as FormArray).push(this.fb.group({
          personId: el.personId,
          dateCompleted: el.dateCompleted,
          completedHours: el.completedHours
        }));
      });
    }
  }
onSaveReport(data) {
    const report = {
      reportId: this.reportId,
      identificationId: this.report.identificationId,
      data,
      doneBy: this.workDoneForm.value.contributors
    }
    // console.log(report)
    this.reportService.editReport(this.reportId, report);
}
}
