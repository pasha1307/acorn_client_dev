import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {FormControl, NgForm} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RecordsService} from '../shared/services/records.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  groupId;
  groupRecord;
  group;
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
  currentAssigned;
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
  constructor(private route: ActivatedRoute, public recordService: RecordsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('groupId')) {
        this.groupId = paramMap.get('groupId');
        this.recordService.getGroupWithRecords(this.groupId)
          .subscribe(result => {
            this.group = result;
            if (this.group.Records.length) {
              this.groupRecord = this.group.Records[0];
              this.currentAssigned = this.group.Records[0].itemIdentification.item.workAssignedTos;
            }
            // this.callNumbers = this.group.itemIdentification.callNumbers;
          });
      }
    });
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
  onRemove(person) {
    const newArr = this.currentAssigned.filter(el => el.personId !== person.personId);
    this.currentAssigned = newArr;
    return this.currentAssigned;
  }
  onClear(form: NgForm) {
    form.resetForm();
  }
  onSaveGroup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const currentIds = this.currentAssigned.map(el => el.personId);
    const concatArr = [...currentIds, ...this.workAssignedToIds];
    const watUpdate = Array.from(new Set(concatArr));

    // !this.workAssignedToIds.length ? watUpdate = currentIds : watUpdate = this.workAssignedToIds;
    const record = {
      data: form.value,
      users: watUpdate
    };
    this.recordService.updateGroupRecords(this.groupId, record);
    // form.resetForm();
  }
}

