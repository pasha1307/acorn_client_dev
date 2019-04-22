import {Component, Input, OnInit, Output} from '@angular/core';
import {RecordsService} from '../../shared/services/records.service';

@Component({
  selector: 'app-groups-content',
  templateUrl: './groups-content.component.html',
  styleUrls: ['./groups-content.component.scss']
})
export class GroupsContentComponent implements OnInit {
@Input() r;
recordId;
  constructor(public recordService: RecordsService) { }

  ngOnInit() {
  }

}
