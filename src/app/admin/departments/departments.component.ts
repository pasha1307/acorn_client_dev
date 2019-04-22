import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RecordsService} from '../../shared/services/records.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {AdminListService} from '../../shared/services/admin-list.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  locations;
  locationId;
  departments;
  departmentId;
  departmentName;
  locationStatus;
  shortName;
  acronym;
  userFilter = {departmentName: ''};
  @ViewChild('panelForm') panelForm: ElementRef;
  constructor(public adminService: AdminListService) { }

  ngOnInit() {
    this.adminService.getDepartments().subscribe(result => {
      this.departments = result;
    });
    this.adminService.getWorkLocations().subscribe(result => {
      this.locations = result;
    });
  }
  onCreate(form: NgForm) {
    this.locationId = form.value.locationId;
    this.departmentName = form.value.departmentName;
    this.shortName = form.value.shortName;
    this.acronym = form.value.acronym;
    this.adminService.createDepartment(
      this.locationId,
      this.departmentName,
      this.shortName,
      this.acronym
    );
  }

  onUpdateDpt(form: NgForm, id) {
    this.departmentId = id;
    this.departmentName = form.value.location;
    this.locationStatus = form.value.inactvie;
    this.adminService.updateDepartment(
      this.departmentId,
      this.departmentName,
      this.locationStatus || null
    );
    // form.resetForm();
  }
  onDelete(id) {
    this.adminService.deleteDepartment(id);
  }
  onCancel(form: NgForm) {
    this.panelForm['expanded'] = false;
    form.resetForm();
  }

}
