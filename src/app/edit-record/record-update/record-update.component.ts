import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {FormControl, NgForm} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-record-update',
  templateUrl: './record-update.component.html',
  styleUrls: ['./record-update.component.scss']
})
export class RecordUpdateComponent implements OnInit {
  @Output() onedit = new EventEmitter();
  recordId;
  @Input() record;
  HOLLIS_URL = 'https://www.google.com';
  recordType = 'Item';
  projects: any[] = [];
  groups: any[] = [];
  repos;
  departments: any[] = [];
  purposes: any[] = [];
  rstorage: any[] = [];
  formats: any[] = [];
// roles props
  @Input() currentAssigned;
  assignees: any[] = [];
  assignedTo = new FormControl();
  workAssignedToIds: any[] = [];
  coordinators: any[] = [];
  curators: any[] = [];
  order = 'sortName';
  // charges props
  typePatrons: any[] = [];
  typeRepos: any[] = [];
  typeProjects: any[] = [];
  typeValue = '';
  // call numbers props
  @Input() callNumbers: any[] = [];
  callNumber;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const utils = this.route.snapshot.data.utils;
    this.projects = utils.filter(el => el.Projects);
    this.groups = utils.filter(el => el.Groups);
    this.purposes = utils.filter(el => el.Purposes);
    this.rstorage = utils.filter(el => el.Rstorage);
    this.formats = utils.filter(el => el.Formats);
    this.repos = utils.filter(el => el.Repos);
    this.assignees = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
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
  // for Multiple Select - Work Assigned To
  showName(a) {
    return a.selected.map(el => el.viewValue);
  }
  // Call Numbers Input
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
onRemove(person) {
    const newArr = this.currentAssigned.filter(el => el.personId !== person.personId);
    this.currentAssigned = newArr;
    return this.currentAssigned;
  }
  onClear(form: NgForm) {
    form.resetForm();
  }
  onSaveRecord(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const currentIds = this.currentAssigned.map(el => el.personId);
    const concatArr = [...currentIds, ...this.workAssignedToIds];
    const watUpdate = Array.from(new Set(concatArr));

    // !this.workAssignedToIds.length ? watUpdate = currentIds : watUpdate = this.workAssignedToIds;
    const record = {
      data: form.value,
      callNumbers: this.callNumbers,
      users: watUpdate
    };
    this.onedit.emit(record);
    // console.log('Updated Record', record);
    // this.recordService.updateRecordItem(this.recordId, record);
    // form.resetForm();
  }
}
