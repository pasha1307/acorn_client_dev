import {Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
// import * as moment from 'moment';
import {fromEvent, noop, Observable} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {peopleUrl} from '../../shared/api-url';
import {Router} from '@angular/router';
import {AdminListService} from '../../shared/services/admin-list.service';
import {AdminUsersService} from '../../shared/services/admin-users.service';

@Component({
  selector: 'app-person-dialogue',
  templateUrl: './person-dialogue.component.html',
  styleUrls: ['./person-dialogue.component.scss']
})
export class PersonDialogueComponent implements OnInit {
  form: FormGroup;
  person;
  locations$: Observable<any[]>
  accessLevel: any[] = ['Admin',
    'Regular',
    'Repository Admin',
    'Repository',
    'None',
    'Curator'];
  @ViewChild('saveEdit') saveEdit: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;
  constructor(
    public route: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) person,
    private adminService: AdminListService,
    public userService: AdminUsersService
  ) {

    this.person = person;
    this.form = fb.group({
      firstName: ['' || person.firstName, Validators.required],
      lastName: ['' || person.lastName, Validators.required],
      middleName: ['' || person.middleName, Validators.required],
      accessLevel: ['' || person.accessLevel, Validators.required],
      locationId: ['' || person.locationId, Validators.required],
      userInactive: ['' || person.inactive, Validators.required],
    });

  }
  ngOnInit() {
    this.locations$ = this.adminService.getWorkLocations();
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      concatMap(changes => this.onSaveChanges(changes))
    ).subscribe(console.log);
  }
  onSave(personId) {
    this.userService.updateUser(personId, this.form.value);
    this.close();
  }
  onSaveChanges(changes) {
    return fromPromise(fetch(`${peopleUrl}${this.person.personId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }
  close() {
    this.dialogRef.close();
  }
}
