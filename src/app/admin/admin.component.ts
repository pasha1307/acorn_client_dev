import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTab} from '@angular/material';
import {Observable} from 'rxjs';
import {AdminListService} from '../shared/services/admin-list.service';
import {PersonDialogueComponent} from './person-dialogue/person-dialogue.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  showBtn = false;
  selectedUser;
  users$: Observable<any[]>
  @ViewChild('users') users: ElementRef<MatTab>;
  @ViewChild('lists') lists: ElementRef<MatTab>;
  constructor(public adminService: AdminListService, private dialog: MatDialog) { }

  ngOnInit() {
    this.users$ = this.adminService.getPeople();
  }

  onSelect(user) {
    this.selectedUser = user;
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = '';
    const dialogRef = this.dialog.open(PersonDialogueComponent, dialogConfig);
  }
  onDelete(id) {
    this.adminService.deleteUser(id);
  }
}
