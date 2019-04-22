import { Component, OnInit } from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {UtilService} from '../../shared/services/util.service';
import {Observable} from 'rxjs';
import {FormControl, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RecordsService} from '../../shared/services/records.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
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
  recordsCloned: any[] = [];
  baseName = new Date().toISOString().substr(0, 19).replace('T', ' ');
  l = 5;
  min = 100;
  max = 200;
  base = 'woo';
  myarr = [];
  constructor(public recordService: RecordsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // const array = new Uint8Array(this.l);
    // window.crypto.getRandomValues(array);
    // // console.log('RANDON', array[0] + ',' + array[1]);
    // const myarr = array.map(el => el);
    // const newarr = myarr.slice();
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
  getRandom = (min, max) => {
    return Math.floor(Math.random() * (1 + max - min )) + max;
  }
  onCallNumsArray = (a, b, c, d) => {
    for (let i = 0; i < d; i++) {
      const y = c + this.getRandom(a, b) + '';
      this.callNumbers.push(y);
    }
    return this.callNumbers;
  }
  onCloneArr = (record, l) => {
    for (let i = 0; i < l; i++) {
      const x =  JSON.parse(JSON.stringify(record));
      this.recordsCloned.push(x);
    }
    return this.recordsCloned;
  }
  onClear(form: NgForm) {
    form.resetForm();
  }

  onSaveRecord(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    const minNum = form.value.callNumberFrom;
    const maxNum = form.value.callNumberTo;
    const callBase = form.value.callNumberBase;
    const arrSize = form.value.recordsLength;
    this.onCallNumsArray(minNum, maxNum, callBase, arrSize);
    const record = {
      callNumbers: this.callNumbers,
      users: this.workAssignedToIds,
      data: form.value
    };
    this.onCloneArr(record, arrSize);
    // console.log('Combined Records', this.recordsCloned);
    this.recordService.postGroupRecord(this.recordsCloned);
    // form.resetForm();
  }
}
