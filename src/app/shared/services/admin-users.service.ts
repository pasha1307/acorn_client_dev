import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  apiUsers = 'http://localhost:5001/api/people';
  users: any[] = [];
  usersUpdated = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient, private route: Router) { }

  getUsers() {
    this.http.get<any>(this.apiUsers).pipe(
      map(data => data.filter(el => el.accessLevel === 'Regular')
      )
    )
      .subscribe(
        regularUsers => {
          this.users = regularUsers;
          this.usersUpdated.next([...this.users]);
        }
      );
  }
  getUsersListener() {
    return this.usersUpdated.asObservable();
  }
  addUser(user) {
    this.http.post<any>(this.apiUsers, user)
      .subscribe(responseData => {
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
        this.route.navigate(['/admin/people']);
      });
  }
  removeUser(personId) {
    this.http.delete(`${this.apiUsers}/personId`)
      .subscribe(() => {
        const updatedUsers = this.users.filter(user => user.personId !== personId);
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }
  updateUser(personId, user) {
    this.http.put(`${this.apiUsers}/personId`, user).subscribe(response => {
      const updatedUsers = [...this.users];
      const oldIndex = updatedUsers.findIndex(p => p.personId === personId);
      updatedUsers[oldIndex] = user;
      this.users = updatedUsers;
      this.usersUpdated.next([...this.users]);
    });
  }
}
