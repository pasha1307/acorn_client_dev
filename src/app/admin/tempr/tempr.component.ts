import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../../shared/services/records.service';
import {AdminListService} from '../../shared/services/admin-list.service';

@Component({
  selector: 'app-tempr',
  templateUrl: './tempr.component.html',
  styleUrls: ['./tempr.component.scss']
})
export class TemprComponent implements OnInit {
  msg;
  constructor(private adminService: AdminListService) { }

  ngOnInit() {
    this.msg = this.adminService.respMsg.msg;
    console.log('MESG??', this.msg);
  }

}
