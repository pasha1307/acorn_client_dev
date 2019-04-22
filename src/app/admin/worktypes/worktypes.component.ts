import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RecordsService} from '../../shared/services/records.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AdminListService} from '../../shared/services/admin-list.service';

@Component({
  selector: 'app-worktypes',
  templateUrl: './worktypes.component.html',
  styleUrls: ['./worktypes.component.scss']
})
export class WorktypesComponent implements OnInit {
  worktypes$: Observable<any[]>;
  workTypeId;
  workTypeInactive = false;
  workType;
  @ViewChild('panelForm') panelForm: ElementRef;
  constructor(public recordService: AdminListService) {
  }

  ngOnInit() {
    this.worktypes$ = this.recordService.getWorkTypes();
  }
  onCreate(f: NgForm) {
    this.workType = f.value.workType;
    console.log('NAME', this.workType);
    this.recordService.createWorkType(this.workType);
  }
  onCancel(form: NgForm) {
    this.panelForm['expanded'] = false;
    form.resetForm();
  }
  onUpdateWorkType(f: NgForm, id) {
    this.workTypeId = id;
    this.workType = f.value.workType;
    this.workTypeInactive = f.value.workTypeInactive;
    this.recordService.updateWorkType(
      this.workTypeId,
      this.workType,
      this.workTypeInactive || null
    );
  }
  onDelete(id) {
    this.recordService.deleteWorkType(id);
  }
}
