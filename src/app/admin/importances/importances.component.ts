import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RecordsService} from '../../shared/services/records.service';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {AdminListService} from '../../shared/services/admin-list.service';

@Component({
  selector: 'app-importances',
  templateUrl: './importances.component.html',
  styleUrls: ['./importances.component.scss']
})
export class ImportancesComponent implements OnInit {
  importance$: Observable<any[]>;
  importanceId = 0;
  importanceName;
  importanceInactive = false;
  @ViewChild('panelForm') panelForm: ElementRef;
  constructor(public adminService: AdminListService) { }

  ngOnInit() {
    this.importance$ = this.adminService.getImportance();
  }
  onCreate(f: NgForm) {
    this.importanceName = f.value.importanceName;
    console.log('NAME', this.importanceName);
    this.adminService.createImportance(this.importanceName);
  }
  onCancel(form: NgForm) {
    this.panelForm['expanded'] = false;
    form.resetForm();
  }
  onUpdateImportance(f: NgForm, id) {
    this.importanceId = id;
    this.importanceName = f.value.importanceName;
    this.importanceInactive = f.value.importanceInactive;
    this.adminService.updateImportance(
      this.importanceId,
      this.importanceName,
      this.importanceInactive || null
    );
  }
  onDelete(id) {
    this.adminService.deleteImportance(id);
  }
}
