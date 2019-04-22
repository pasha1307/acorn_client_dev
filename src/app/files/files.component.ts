import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Record} from '../models/record.model';
import {RecordsService} from '../shared/services/records.service';
import {UtilService} from '../shared/services/util.service';
import {FilesService} from '../shared/services/files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() coordinatorId;
  dataSource = new MatTableDataSource();
  hoverText = 'Click to Delete';
  // records: Record[];
  displayedColumns: string[] = ['pkid', 'fileName', 'description', 'enteredById'];
  constructor(private filesService: FilesService) {}

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.filesService.getFilesByPerson(this.coordinatorId).subscribe( res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }
  onSearch(val = '') {
    this.dataSource.filter = val;
  }
  onRowDef(r) {
    this.filesService.deleteFile(r.fileId);
   // const foo = this.dataSource.data.indexOf(r);
   // this.dataSource.data.splice(foo, 1);
   // return this.dataSource.data;
  }
}
