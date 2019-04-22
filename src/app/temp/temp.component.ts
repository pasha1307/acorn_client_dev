import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../shared/services/records.service';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss']
})
export class TempComponent implements OnInit {
msg;
  constructor(public recordService: RecordsService) { }

  ngOnInit() {
    this.msg = this.recordService.respMsg.msg;
  }

}
