import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {apiUrl} from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
respMsg: any = {};
tempUrl = '/api/admin/tempr';
  constructor(private http: HttpClient, private router: Router) { }
  getGroups() {
    return this.http.get<any[]>(apiUrl + 'groups');
  }
  getNames() {
    return this.http.get<any[]>(apiUrl + 'people-names');
  }
  getCoordinators() {
    return this.http.get<any[]>(apiUrl + 'coordinators');
  }
  getRepos() {
    return this.http.get<any[]>(apiUrl + 'repos');
  }
  getLocations() {
    return this.http.get<any[]>(apiUrl + 'locations');
  }
  getChargeto() {
    return this.http.get<any[]>(apiUrl + 'chargeto');
  }
  getRoles() {
    return this.http.get<any[]>(apiUrl + 'roles');
  }
  getStorage() {
    return this.http.get<any[]>(apiUrl + 'storage');
  }
  getFilesByPerson(id) {
    return this.http.get<any[]>(apiUrl + 'files/' + id);
  }
  // DEPARTMENTS
  getDepartments() {
    return this.http.get<any[]>(apiUrl + 'departments');
  }
  createDepartment(department) {
    this.http
      .post(`${apiUrl}departments`, department)
      .subscribe(response => {
        console.log('CREATED DEPT RESPONSE', response);
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  updateDepartment(departmentId, department) {
    this.http
      .put(`${apiUrl}departments/${departmentId}`, department)
      .subscribe(response => {
        console.log('UPDATED DEPT RESPONSE', response);
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  deleteDepartment(departmentId) {
    this.http.delete(`${apiUrl}departments/${departmentId}`)
      .subscribe((response) => {
        console.log('DEL DEPT RESPONSE', response);
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  // FORMATS
  getActiveFormats() {
    return this.http.get<any[]>(apiUrl + 'formats-active');
  }
  getAllFormats() {
    return this.http.get<any[]>(apiUrl + 'formats');
  }
  createFormat(format) {
    this.http
      .post(`${apiUrl}formats`, format)
      .subscribe(response => {
        console.log('CREATED FORMAT RESPONSE', response);
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  updateFormat(formatId, format) {
    this.http
      .put(`${apiUrl}formats/${formatId}`, format)
      .subscribe(response => {
        console.log('UPDATED FORMAT RESPONSE', response);
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  deleteFormat(formatId) {
    this.http.delete(`${apiUrl}formats/${formatId}`)
      .subscribe((response) => {
        console.log('DEL FORMAT RESPONSE', response);
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  // IMPORTANCE
  getImportance() {
    return this.http.get<any[]>(apiUrl + 'importance');
  }
  createImportance(importance) {
    this.http
      .post(`${apiUrl}importance`,  importance)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  updateImportance(importanceId, importance) {
    this.http
      .put(`${apiUrl}importance/${importanceId}`, importance)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  deleteImportance(importanceId) {
    this.http.delete(`${apiUrl}importance/${importanceId}`)
      .subscribe((response) => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  // LOCATIONS
  getAllLocations() {
    return this.http.get<any[]>(apiUrl + 'locations');
  }
  getActiveLocations() {
    return this.http.get<any[]>(apiUrl + 'locations-active');
  }
  createLocation(location) {
    this.http
      .post(`${apiUrl}locations/`, location)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  updateLocation(locationId, location) {
    this.http
      .put(`${apiUrl}locations/${locationId}`, location)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  deleteLocation(locationId) {
    this.http.delete(`${apiUrl}locations/${locationId}`)
      .subscribe((response) => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  // PROJECTS
  getActiveProjects() {
    return this.http.get<any[]>(apiUrl + 'projects-active');
  }
  getAllProjects() {
    return this.http.get<any[]>(apiUrl + 'projects');
  }
  createProject(project) {
    this.http
      .post(`${apiUrl}projects`,  project)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  updateProject(projectId, project) {
    this.http
      .put(`${apiUrl}projects/${projectId}`, project)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  deleteProject(projectId) {
    this.http.delete(`${apiUrl}projects/${projectId}`)
      .subscribe((response) => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  // PURPOSES
  getPurposes() {
    return this.http.get<any[]>(apiUrl + 'purposes');
  }
  createPurpose(purpose) {
    this.http
      .post(`${apiUrl}purposes`,  purpose)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  updatePurpose(purposeId, purpose) {
    this.http
      .put(`${apiUrl}purposes/${purposeId}`, purpose)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  deletePurpose(purposeId) {
    this.http.delete(`${apiUrl}purposes/${purposeId}`)
      .subscribe((response) => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  // WORK TYPES
  getActiveWorkTypes() {
    return this.http.get<any[]>(apiUrl + 'worktypes-active');
  }
  getAllWorkTypes() {
    return this.http.get<any[]>(apiUrl + 'worktypes');
  }
  createWorkType(wtype) {
    this.http
      .post(`${apiUrl}workTypes`, wtype)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  updateWorkType(workTypeId, wtype) {
    this.http
      .put(`${apiUrl}workTypes/${workTypeId}`, wtype)
      .subscribe(response => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
  deleteWorkType(workTypeId) {
    this.http.delete(`${apiUrl}workTypes/${workTypeId}`)
      .subscribe((response) => {
        this.respMsg = response;
        this.router.navigate([this.tempUrl]);
      });
  }
}// end service
