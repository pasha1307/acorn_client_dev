import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {RecordsService} from '../../shared/services/records.service';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss']
})
export class ReportCreateComponent implements OnInit {
  @Input() record;
  recordId;
  order = 'sortName';
  coordinators;
  importance: any[] = [];
  locations;
  formats;
  autotext;
  currTime = new Date();
@Output() onsave = new EventEmitter<any>();
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
    this.importance = this.route.snapshot.data.utils.filter(el => el.Importance);
    this.locations = this.route.snapshot.data.utils.filter(el => el.Locations);
    this.formats = this.route.snapshot.data.utils.filter(el => el.Formats);
    this.autotext = this.route.snapshot.data.utils.filter(el => el.Autotext);
  }
  onAuto(id) {
    if (id) {
      const autoTreatment = this.autotext[0].Autotext.filter(el => el.personId === id && el.autotextType === 'Treatment');
      if (autoTreatment.length) {
        return autoTreatment;
      }
    }
  }
  onSave(form: NgForm) {
    this.onsave.emit(form.value);
  }
  onClear(f: NgForm) {
    f.resetForm(f);
  }
}
