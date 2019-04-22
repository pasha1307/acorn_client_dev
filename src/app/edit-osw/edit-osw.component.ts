import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RecordsService} from '../shared/services/records.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-osw',
  templateUrl: './edit-osw.component.html',
  styleUrls: ['./edit-osw.component.scss']
})
export class EditOswComponent implements OnInit {
  recordId;
  record;
  coordinatorId;
  identificationId;
  callNumbers;
  coordinators: any[] = [];
  workDoneForm: FormGroup;
  showRemove = false;
  users: FormArray;
  constructor(private route: ActivatedRoute,
              public recordService: RecordsService,
              private fb: FormBuilder
              ) {
    this.workDoneForm = this.fb.group({
      users: this.fb.array([
        // this.createPerson()
      ])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recordId')) {
        this.recordId = paramMap.get('recordId');
        this.recordService.getSingle(this.recordId)
          .subscribe(result => {
            this.record = result;
            this.coordinatorId = result.CoordinatorID;
            this.identificationId = result.CoordinatorID;
            this.callNumbers = this.record.itemIdentification.callNumbers;
            this.getWorkDoneArray(this.record);
            console.log('RECORD PARAM-ID', result);
          });
      }
    });
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
  }
  // workDoneBy Array CRUD
  getControls() {
    return ( this.workDoneForm.get('users') as FormArray).controls;
  }
  createPerson(): FormGroup {
    return this.fb.group({
      personId: [''],
      dateCompleted: [''],
      completedHours: ['']
    });
  }
  addPerson() {
    (this.workDoneForm.get('users') as FormArray).push(this.createPerson());
    this.showRemove = true;
  }
  removePerson(index: number) {
    (this.workDoneForm.get('users') as FormArray).removeAt(index);
  }
  getWorkDoneArray(r) {
    const control = (this.workDoneForm.get('users') as FormArray);
    if (r && r.osw.workDones.length > 0)  {
      r.osw.workDones.forEach(el => {
        control.push(this.fb.group({
          personId: el.personId,
          dateCompleted: el.dateCompleted,
          completedHours: el.completedHours,
        }));
      });
    } else {
      this.addPerson();
    }
  }
  // end workDone form
  onPost(record) {
    const osw = {
      record,
      users: this.workDoneForm.value.users
    };
    this.recordService.updateOSW(this.recordId, osw);
  }
}
