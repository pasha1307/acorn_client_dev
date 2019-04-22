import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {RecordsService} from '../../shared/services/records.service';
import {ActivatedRoute} from '@angular/router';
import {MatChipInputEvent} from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-osw',
  templateUrl: './new-osw.component.html',
  styleUrls: ['./new-osw.component.scss']
})
export class NewOswComponent implements OnInit {
  recordType = 'OSW';
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
  constructor(public recordService: RecordsService, private route: ActivatedRoute) { }

  ngOnInit() {
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
  onSaveOWS(form: NgForm) {
    const record = {
      data: form.value,
      callNums: this.callNumbers
    };
    // console.log('OWS RECORD:' , record)
    this.recordService.postOSW(record);
  }

}
