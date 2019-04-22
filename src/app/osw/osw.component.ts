import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {RecordsService} from '../shared/services/records.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-osw',
  templateUrl: './osw.component.html',
  styleUrls: ['./osw.component.scss']
})
export class OswComponent implements OnInit {
  workDoneForm: FormGroup;
  showRemove = false;
  workhours: FormArray;
  // record
  recordType = 'OSW';
  recordId;
  record;
  coordinators: any[] = [];
  projects: any[] = [];
  groups: any[] = [];
  repos: any[] = [];
  locations: any[] = [];
  isWorkLocation: boolean;
  departments: any[] = [];
  purposes: any[] = [];
  formats: any[] = [];
  curators: any[] = [];
  order = 'sortName';
  workType = 'workType';
  worktypes: any[] = [];
  // charges props
  typePatrons: any[] = [];
  typeRepos: any[] = [];
  typeProjects: any[] = [];
  typeValue = '';
// call numbers props
  callNumbers: any[] = [];
  callNumber;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public recordService: RecordsService,
              private route: ActivatedRoute,
              private rte: Router,
              private fb: FormBuilder
  ) {
    this.workDoneForm = this.fb.group({
      workhours: this.fb.array([
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
            this.callNumbers = this.record.itemIdentification.callNumbers;
            // console.log('RECORD', result);
            this.getWorkDoneArray(this.record);
          });
      }
    });
    const utils = this.route.snapshot.data.utils;
    this.projects = utils.filter(el => el.Projects);
    this.groups = utils.filter(el => el.Groups);
    this.purposes = utils.filter(el => el.Purposes);
    this.formats = utils.filter(el => el.Formats);
    this.locations = utils.filter(el => el.Locations);
    this.repos = utils.filter(el => el.Repos);
    this.worktypes = utils.filter(el => el.WorkTypes);
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
    this.curators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Curator');
    this.typePatrons = this.route.snapshot.data.charges.filter(ch => ch.ChargeToType === 'Patron');
    this.typeRepos = this.route.snapshot.data.charges.filter(ch => ch.ChargeToType === 'Repository');
    this.typeProjects = this.route.snapshot.data.charges.filter(ch => ch.ChargeToType === 'Project');
  }
  getDepartment(id) {
    this.repos[0].Repos.filter((el) => {
      if (el.locationId === id) {
        this.departments = el.departments;
      }
    });
  }
  // workDoneBy Array CRUD
  getControls() {
    return ( this.workDoneForm.get('workhours') as FormArray).controls;
  }
  createPerson(): FormGroup {
    return this.fb.group({
      personId: [''],
      dateCompleted: [''],
      completedHours: ['']
    });
  }
  addPerson() {
   (this.workDoneForm.get('workhours') as FormArray).push(this.createPerson());
   this.showRemove = true;
  }
  removePerson(index: number) {
    (this.workDoneForm.get('workhours') as FormArray).removeAt(index);
  }
  getWorkDoneArray(r) {
    const control = (this.workDoneForm.get('workhours') as FormArray);
    if (r && r.osw.workDones.length > 0) {
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
  // Call Numbers Array
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.callNumbers.push({callNumber: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }
  remove(callNumber: any): void {
    const index = this.callNumbers.indexOf(callNumber);
    if (index >= 0) {
      this.callNumbers.splice(index, 1);
    }
  }
  onClear(form: NgForm) {
    form.resetForm();
    this.rte.navigate(['/']);
  }
  // submit form and update record
  onSaveOWS(form: NgForm, rf: FormGroup) {
    const record = {
      data: form.value,
      callNumbers: this.callNumbers,
      workdone: rf.value
    };
    console.log('REC:', record, rf.value);
    this.recordService.updateOSW(this.recordId, record);
  }

}
