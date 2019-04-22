import {Component, OnInit } from '@angular/core';
import {merge, Observable, Observer, Subscription} from 'rxjs';
import {RecordsService} from '../shared/services/records.service';
import {UtilService} from '../shared/services/util.service';
import {Record} from '../models/record.model';
import {filter, map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userFilter = {title: ''};
  groupsFilter = {groupName: ''};
  items$: Observable<Record[]>;
  osw$: Observable<Record[]>;
  groups: any[] = [];
  // rgroups$: Observable<any>;
  inactiveStatus = 0;
  isEdited = 0;
  constructor(public recordsService: RecordsService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.isLoading = true;
    this.groups = this.route.snapshot.data.groups;
    // this.rgroups$ =  this.recordsService.getGroupsRecords()
    //   .pipe(
    //     map(elems => elems)
    //   );
    const http$ = this.recordsService.allRecords()
      .pipe(
      map(elems => elems.slice(0, 50))
    );
    const records$ = http$.pipe(shareReplay());
    this.items$ = records$.pipe(
      map(items => items.filter(el => el.recordType === 'Item'))
    );
    this.osw$ = records$.pipe(
      map(items => items.filter(el => el.recordType === 'OSW'))
    );
  }

  onDelete(id: string) {
    this.recordsService.deleteRecord(id);
  }
  onGroupStatus(a) {
    const groupId = a;
    this.inactiveStatus = 1;
    this.isEdited = 1;
    const group = {
      inactive: this.inactiveStatus,
      isEdited: this.isEdited
    }
    this.recordsService.updateGroupStatus(groupId, group);
  }
}
