import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RecordsService} from '../../shared/services/records.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {AdminListService} from '../../shared/services/admin-list.service';

@Component({
  selector: 'app-purposes',
  templateUrl: './purposes.component.html',
  styleUrls: ['./purposes.component.scss']
})
export class PurposesComponent implements OnInit {
  purposes$: Observable<any[]>;
  purposeId = 0;
  purposeName;
  purposeInactive = false;
  @ViewChild('panelForm') panelForm: ElementRef;
  constructor(public recordService: AdminListService) { }

  ngOnInit() {
    this.purposes$ = this.recordService.getPurposes();
  }
  onCreate(f: NgForm) {
    this.purposeName = f.value.purposeName;
    console.log('NAME', this.purposeName);
    this.recordService.createPurpose(this.purposeName);
  }
  onCancel(form: NgForm) {
    this.panelForm['expanded'] = false;
    form.resetForm();
  }
  onUpdatePurpose(f: NgForm, id) {
    this.purposeId = id;
    this.purposeName = f.value.purposeName;
    this.purposeInactive = f.value.purposeInactive;
    this.recordService.updatePurpose(
      this.purposeId,
      this.purposeName,
      this.purposeInactive || null
    );
  }
  onDelete(id) {
    this.recordService.deletePurpose(id);
  }
}
