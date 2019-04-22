
import { Component, OnInit } from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {UtilService} from '../../shared/services/util.service';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {FormControl, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RecordsService} from '../../shared/services/records.service';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.scss']
})
export class NewRecordComponent implements OnInit {
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
  callNumbers: any[] = [];
  callNumber;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public recordService: RecordsService, private route: ActivatedRoute) { }

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
  getRepo(id) {
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
onClear(form: NgForm) {
    form.resetForm();
}
  onSaveRecord(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const record = {
      data: form.value,
      callNums: this.callNumbers,
      users: this.workAssignedToIds
    };
    this.recordService.postRecord(record);
    form.resetForm();
  }
}


// OBSERVABLES SOLUTIONS
// Props:
// projects$: Observable<any[]>;
// groups$: Observable<any>;
// coordinators$: Observable<any>;
// curators$: Observable<any>;
// patronType$: Observable<any>;
// projectType$: Observable<any>;
// repoType$: Observable<any>;

// OnInit:
// this.projects$ = this.utilServices.getActiveProjects();
// this.groups$ = this.utilServices.getGroups();
//  const roles$ = this.utilServices.getCoordinators().pipe(
//   shareReplay()
// );
//  this.coordinators$ = roles$.pipe(map(roles => roles.filter(el => el.accessLevel === 'Regular')));

// const charges$ = this.utilServices.getChargeto().pipe(
//   shareReplay()
// );
// this.patronType$ = charges$.pipe(
//   map(elems => elems.filter(el => el.ChargeToType === 'Patron'))
// );
// this.projectType$ = charges$.pipe(
//   map(elems => elems.filter(el => el.ChargeToType === 'Project'))
// );
// this.repoType$ = charges$.pipe(
//   map(elems => elems.filter(el => el.ChargeToType === 'Repository'))
// );
