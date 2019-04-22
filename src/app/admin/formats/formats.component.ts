import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RecordsService} from '../../shared/services/records.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {AdminListService} from '../../shared/services/admin-list.service';

@Component({
  selector: 'app-formats',
  templateUrl: './formats.component.html',
  styleUrls: ['./formats.component.scss']
})
export class FormatsComponent implements OnInit {
  formats$: Observable<any[]>;
  format;
  formatId = 0;
  formatName;
  @ViewChild('panelForm') panelForm: ElementRef;
  constructor(public adminService: AdminListService) { }

  ngOnInit() {
    this.formats$ = this.adminService.getAllFormats();
  }
  onCreate(f: NgForm) {
    this.adminService.createFormat(f.value);
  }
  onCancel(form: NgForm) {
    this.panelForm['expanded'] = false;
    form.resetForm();
  }
  onUpdateFormat(f: NgForm, id) {
    this.formatId = id;
    this.adminService.updateFormat(this.formatId, f.value);
  }
  onDelete(id) {
    this.adminService.deleteFormat(id);
  }

}
