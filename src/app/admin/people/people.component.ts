import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {AdminListService} from '../../shared/services/admin-list.service';
import {PersonDialogueComponent} from '../person-dialogue/person-dialogue.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
// people$: Observable<any[]>;
  regularUsers$: Observable<any[]>;
  adminUsers$: Observable<any[]>;
  repoUsers$: Observable<any[]>;
  repoAdminUsers$: Observable<any[]>;
  curatorUsers$: Observable<any[]>;
  locations$: Observable<any[]>;
  userAccess: any[] = ['Admin',
    'Regular',
    'Repository Admin',
    'Repository',
    'None',
    'Curator'];
  constructor(public recordService: AdminListService, private dialog: MatDialog) { }

  ngOnInit() {
    const http$ = this.recordService.getPeople();
    const people$ = http$
      .pipe(
        tap(() => console.log('The request executed')),
        shareReplay())
    this.regularUsers$ = people$.pipe(
      map(users => users.filter(user => user.accessLevel === 'Regular'))
    );
    this.adminUsers$ = people$.pipe(
      map(users => users.filter(user => user.accessLevel === 'Admin'))
    );
    this.repoAdminUsers$ = people$.pipe(
      map(users => users.filter(user => user.accessLevel === 'Repository Admin'))
    )
    this.repoUsers$ = people$.pipe(
      map(users => users.filter(user => user.accessLevel === 'Repository'))
    )
    this.curatorUsers$ = people$.pipe(
      map(users => users.filter(user => user.accessLevel === 'Curator'))
    )
    this.locations$ = this.recordService.getWorkLocations();
  }

  onDelete(personId) {
    this.recordService.deleteUser(personId);
  }
  onCancel(f: FormGroup) {
    f.reset();
  }
  editUser() {

  }
  // editPerson(person): void {
  //   const dialogRef = this.dialog.open(PersonDialogueComponent, {
  //     width: '250px',
  //     data: person
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //   });
  // }
  onCreate(f: FormGroup) {
    console.log('TD Form Data');
    this.recordService.createUser(f.value);
    f.reset();
  }
  editPerson(person) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = person;

    const dialogRef = this.dialog.open(PersonDialogueComponent, dialogConfig);
  }
  /* onCreate() {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     const dialogRef = this.dialog.open(DialogCreateComponent, dialogConfig);
   }*/
  // editPerson(person) {
  //   const dialogConfig = new MatDialogConfig();
  //
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //
  //   dialogConfig.data = person;
  //
  //   const dialogRef = this.dialog.open(PersonDialogueComponent, dialogConfig);
  //
  // }

}
