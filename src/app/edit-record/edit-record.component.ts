import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RecordsService} from '../shared/services/records.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ReportService} from '../shared/services/report.service';
import {Observable} from 'rxjs';
import {UtilService} from '../shared/services/util.service';
import {MatDialog} from '@angular/material';
import {DialogImageComponent} from '../dialog-image/dialog-image.component';
import {FilesService} from '../shared/services/files.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.scss']
})
export class EditRecordComponent implements OnInit {
  recordId;
  record;
  callNumbers;
  currentAssigned;
  workDoneForm: FormGroup;
  members: FormArray;
  coordinators;
  coordinatorId;
  identificationId;
  order = 'displayName';
  files;
  images = [];
  files$: Observable<any[]>;

  constructor(private route: ActivatedRoute,
              public recordService: RecordsService,
              public reportService: ReportService,
              public filesService: FilesService,
              public utilService: UtilService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
    this.workDoneForm = this.fb.group({
      members: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recordId')) {
        this.recordId = paramMap.get('recordId');
        this.recordService.getSingle(this.recordId)
          .subscribe(result => {
            this.record = result;
            this.images = this.record.itemIdentification.itemFiles;
            this.identificationId = this.record.identificationId;
            this.coordinatorId = this.record.coordinatorId;
            this.callNumbers = this.record.itemIdentification.callNumbers;
            this.currentAssigned = this.record.itemIdentification.item.workAssignedTos;
            this.getWorkDoneArray(this.record);
            this.files$ = this.utilService.getFilesByPerson(this.coordinatorId);
            // this.getFiles(this.coordinatorId);
          });
      }
    });
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
  }
  getFiles(id) {
    this.files = this.utilService.getFilesByPerson(id).subscribe(res => console.log('Files', res));
  }
  getControls() {
    return (this.workDoneForm.get('members') as FormArray).controls;
  }

  newPerson(): FormGroup {
    return this.fb.group({
      personId: [''],
      dateCompleted: [''],
      completedHours: ['']
    });
  }

  addPerson() {
    (this.workDoneForm.get('members') as FormArray).push(this.newPerson());
  }

  removePerson(index) {
    (this.workDoneForm.get('members') as FormArray).removeAt(index);
  }

  getWorkDoneArray(r) {
    const control = this.workDoneForm.get('members') as FormArray;
    if (r && r.itemIdentification.item.workAssignedTos.length > 0) {
      const initialMembers = r.itemIdentification.item.workAssignedTos;
      initialMembers.forEach(el => {
        control.push(this.fb.group({
          personId: el.person.personId,
          dateCompleted: new Date(),
          completedHours: 0
        }));
      });
    } else {
      this.addPerson();
    }
  }
  onReport(data) {
    const report = {
      data,
      users: this.workDoneForm.value.members,
      itemIdent: this.record.identificationId
    };
    this.reportService.postReport(report);
  }

  onPost(record) {
    this.recordService.updateRecordItem(this.recordId, record);
  }
  onDeleteFile(img) {
    const index = this.images.indexOf(img);
    this.images.splice(index, 1);
    this.filesService.deleteFile(img);
    return this.images;
  }
  onImgDialog(img) {
    const dialogRef = this.dialog.open(DialogImageComponent, {
      data: {
        image: img
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}


