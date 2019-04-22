import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RecordsService} from '../../shared/services/records.service';
import {MatExpansionPanel} from '@angular/material';
import {Observable} from 'rxjs';
import {AdminListService} from '../../shared/services/admin-list.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations$: Observable<any[]>;
  locationId;
  locationName;
  locationStatus;
  locationRepoStatus;
  shortName;
  acronym;
  tub;
  userFilter = {location: ''};
  @ViewChild('panelForm') panelForm: ElementRef;
  constructor(public recordService: AdminListService) { }

  ngOnInit() {
    // this.recordService.getWorkLocations().subscribe(result => this.locations = result);
    this.locations$ = this.recordService.getWorkLocations();
  }
  onCreate(form: NgForm) {
    this.locationName = form.value.locationName;
    this.tub = form.value.tub;
    this.shortName = form.value.shortName;
    this.acronym = form.value.acronym;
    this.locationRepoStatus = form.value.isRepository || null;
    this.recordService.createLibLocation(
      this.locationName,
      this.tub,
      this.shortName,
      this.acronym,
      this.locationRepoStatus
    );
  }

  onUpdateLocation(form: NgForm, id) {
    this.locationId = id;
    this.locationName = form.value.location;
    this.locationStatus = form.value.inactvie;
    this.locationRepoStatus = form.value.isRepository;
    this.recordService.updateLibLocation(
      this.locationId,
      this.locationName,
      this.locationStatus || null,
      this.locationRepoStatus || null
    );
    // form.resetForm();
  }
  onDelete(id) {
    this.recordService.deleteLocation(id);
  }
  onCancel(form: NgForm) {
    this.panelForm['expanded'] = false;
    form.resetForm();
  }

}
