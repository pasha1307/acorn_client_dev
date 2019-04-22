import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-record',
  templateUrl: './dialog-record.component.html',
  styleUrls: ['./dialog-record.component.scss']
})
export class DialogRecordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
