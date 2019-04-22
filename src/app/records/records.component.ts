import {Component, OnInit, ViewChild} from '@angular/core';
import {Record} from '../models/record.model';
import {RecordsService} from '../shared/services/records.service';
import {Observable} from 'rxjs';
import {MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import {RecordsDataSource} from '../shared/services/table.datasource';
import {DialogRecordComponent} from '../dialog-record/dialog-record.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
// dataSource = RecordsDataSource;
  dataSource = new MatTableDataSource();
  records: Record[];
  displayedColumns: string[] = ['recordId', 'title', 'projectName'];
  testData = 'Hello';

  constructor(private recordService: RecordsService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit() {
    this.recordService.allRecords().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
    //  this.dataSource = new RecordsDataSource(this.recordService);
    //  this.dataSource.loadRecords();
  }
  onSearch(val = '') {
    this.dataSource.filter = val;
  }
  onRecordDialog(record) {
    const dialogRef = this.dialog.open(DialogRecordComponent, {
      data: record
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Hi');
        // this.router.navigate(['/app/edit/record/', e.recordId]);
      }
    });
  }
}
