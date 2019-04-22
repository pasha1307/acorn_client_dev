import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../api-url';
import {peopleUrl} from '../api-url';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
respMsg;
  constructor(private http: HttpClient, private router: Router) { }
  getPeople() {
    return this.http.get<any[]>(apiUrl + 'people');
  }
  // active projects Groups included
  getProjects() {
    return this.http.get<any[]>(apiUrl + 'projects-active');
  }
  // all projects; no included models
  getAllProjects() {
    return this.http.get<any[]>(apiUrl + 'projects');
  }
  getGroups() {
    return this.http.get<any[]>(apiUrl + 'groups-records');
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
  getWorkLocations() {
    return this.http.get<any[]>(apiUrl + 'locations');
  }
  getActiveLocations() {
    return this.http.get<any[]>(apiUrl + 'locations-active');
  }
  getDepartments() {
    return this.http.get<any[]>(apiUrl + 'departments');
  }
  getChargeto() {
    return this.http.get<any[]>(apiUrl + 'chargeto');
  }
  getRoles() {
    return this.http.get<any[]>(apiUrl + 'roles');
  }
  getPurposes() {
    return this.http.get<any[]>(apiUrl + 'purposes');
  }
  getImportance() {
    return this.http.get<any[]>(apiUrl + 'importance');
  }
  getStorage() {
    return this.http.get<any[]>(apiUrl + 'storage');
  }
  getFormats() {
    return this.http.get<any[]>(apiUrl + 'formats-active');
  }
  getAllFormats() {
    return this.http.get<any[]>(apiUrl + 'formats');
  }
  getActiveWorkTypes() {
    return this.http.get<any[]>(apiUrl + 'worktypes-active');
  }
  getWorkTypes() {
    return this.http.get<any[]>(apiUrl + 'worktypes');
  }
  // LOCATIONS
  createLibLocation(
    locationName,
    tub,
    shortName,
    acronym,
    locationRepoStatus
  ) {
    const location = {
     locationName,
     tub,
     shortName,
     acronym,
     locationRepoStatus
    };
    console.log('LOCATION', location);
    this.http
      .post(`${apiUrl}locations/`, location)
      .subscribe(response => {
        console.log('CreateLocation RESPONSE', response);
        this.respMsg = response;
        this.getWorkLocations();
        this.router.navigate(['/admin/tempr']);
      });
  }

  updateLibLocation(
    locationId,
    locationName,
    locationStatus,
    locationRepoStatus
  ) {
    const location = {
      locationId,
      locationName,
     locationStatus,
      locationRepoStatus
    };
    console.log('LOCATION', location);
    this.http
      .put(`${apiUrl}locations/${locationId}`, location)
      .subscribe(response => {
        console.log('UPDATE LOCATION RESPONSE', response);
        this.respMsg = response;
        this.getWorkLocations();
        this.router.navigate(['/admin/tempr']);
      });
  }
  deleteLocation(locationId) {
    this.http.delete(`${apiUrl}locations/${locationId}`)
      .subscribe((response) => {
        console.log('Del Location RESPONSE', response);
        this.respMsg = response;
        this.getWorkLocations();
        this.router.navigate(['/admin/tempr']);
      });
  }
// DEPARTMENTS
  createDepartment(
    locationId,
    departmentName,
    shortName,
    acronym
  ) {
    const department = {
     locationId,
     departmentName,
     shortName,
   acronym
    };
    console.log('DEPARTMENT', department);
    this.http
      .post(`${apiUrl}departments`, department)
      .subscribe(response => {
        console.log('CREATED DEPT RESPONSE', response);
        this.respMsg = response;
        this.getDepartments();
        this.router.navigate(['/admin/tempr']);
      });
  }

  updateDepartment(
    departmentId,
    departmentName,
    locationStatus,
  ) {
    const department = {
      departmentId,
      departmentName,
      locationStatus,
    };
    console.log('DEPARTMENT UPDATE', department);
    this.http
      .put(`${apiUrl}departments/${departmentId}`, department)
      .subscribe(response => {
        console.log('UPDATED DEPT RESPONSE', response);
        this.respMsg = response;
        this.getDepartments();
        this.router.navigate(['/admin/tempr']);
      });
  }
  deleteDepartment(departmentId) {
    this.http.delete(`${apiUrl}departments/${departmentId}`)
      .subscribe((response) => {
        console.log('DEL DEPT RESPONSE', response);
        this.respMsg = response;
        this.getDepartments();
        this.router.navigate(['/admin/tempr']);
      });
  }
// Formats
  createFormat(format) {
    console.log('NEW FORMAT', format);
    this.http
      .post(`${apiUrl}formats`, format)
      .subscribe(response => {
        console.log('CREATED FORMAT RESPONSE', response);
        this.respMsg = response;
        this.getAllFormats();
        this.router.navigate(['/admin/tempr']);
      });
  }
  updateFormat(
    formatId,
    format
  ) {
    this.http
      .put(`${apiUrl}formats/${formatId}`, format)
      .subscribe(response => {
        console.log('UPDATED FORMAT RESPONSE', response);
        this.respMsg = response;
        this.getAllFormats();
        this.router.navigate(['/admin/tempr']);
      });
  }
  deleteFormat(formatId) {
    this.http.delete(`${apiUrl}formats/${formatId}`)
      .subscribe((response) => {
        console.log('DEL FORMAT RESPONSE', response);
        this.respMsg = response;
        this.getAllFormats();
        this.router.navigate(['/admin/tempr']);
      });
  }
  // Importance
  createImportance(
    importanceName
  ) {
    this.http
      .post(`${apiUrl}importance`,  {importanceName: importanceName})
      .subscribe(response => {
        console.log('CREATED IMPORTANCE RESPONSE', response);
        this.respMsg = response;
        this.getImportance();
        this.router.navigate(['/admin/tempr']);
      });
  }
  updateImportance(
    importanceId,
    importanceName,
    importanceInactive,
  ) {
    const importance = {
      importanceId,
      importanceName,
      importanceInactive,
    };
    this.http
      .put(`${apiUrl}importance/${importanceId}`, importance)
      .subscribe(response => {
        console.log('UPDATED IMPORTANCE RESPONSE', response);
        this.respMsg = response;
        this.getImportance();
        this.router.navigate(['/admin/tempr']);
      });
  }
  deleteImportance(importanceId) {
    this.http.delete(`${apiUrl}importance/${importanceId}`)
      .subscribe((response) => {
        console.log('UPDATED IMPORTANCE RESPONSE', response);
        this.respMsg = response;
        this.getImportance();
        this.router.navigate(['/admin/tempr']);
      });
  }
  // Purposes
  createPurpose(
    purposeName
  ) {
    this.http
      .post(`${apiUrl}purposes`,  {purposeName: purposeName})
      .subscribe(response => {
        console.log('CREATED IMPORTANCE RESPONSE', response);
        this.respMsg = response;
        this.getPurposes();
        this.router.navigate(['/admin/tempr']);
      });
  }
  updatePurpose(
    purposeId,
    purposeName,
    purposeInactive,
  ) {
    const purpose = {
      purposeId,
      purposeName,
      purposeInactive,
    };
    this.http
      .put(`${apiUrl}purposes/${purposeId}`, purpose)
      .subscribe(response => {
        console.log('UPDATED PURPOSE RESPONSE', response);
        this.respMsg = response;
        this.getPurposes();
        this.router.navigate(['/admin/tempr']);
      });
  }
  deletePurpose(purposeId) {
    this.http.delete(`${apiUrl}purposes/${purposeId}`)
      .subscribe((response) => {
        console.log('UPDATED PURPOSE RESPONSE', response);
        this.respMsg = response;
        this.getPurposes();
        this.router.navigate(['/admin/tempr']);
      });
  }
  // Work Types
  createWorkType(
    workType
  ) {
    this.http
      .post(`${apiUrl}workTypes`,  {workType: workType})
      .subscribe(response => {
        console.log('CREATED IMPORTANCE RESPONSE', response);
        this.respMsg = response;
        this.getWorkTypes();
        this.router.navigate(['/admin/tempr']);
      });
  }
  updateWorkType(
    workTypeId,
    workType,
    workTypeInactive,
  ) {
    const wp = {
      workTypeId,
      workType,
      workTypeInactive,
    };
    this.http
      .put(`${apiUrl}workTypes/${workTypeId}`, wp)
      .subscribe(response => {
        console.log('UPDATED workType RESPONSE', response);
        this.respMsg = response;
        this.getWorkTypes();
        this.router.navigate(['/admin/tempr']);
      });
  }
  deleteWorkType(workTypeId) {
    this.http.delete(`${apiUrl}workTypes/${workTypeId}`)
      .subscribe((response) => {
        console.log('UPDATED WorkType RESPONSE', response);
        this.respMsg = response;
        this.getWorkTypes();
        this.router.navigate(['/admin/tempr']);
      });
  }
  // Projects
  createProject(
    projectName,
    projectDescription,
    startDate,
    endDate,
    projectInactive
  ) {
    const project = {
      projectName,
      projectDescription,
      startDate,
      endDate,
      projectInactive
    };
    this.http
      .post(`${apiUrl}projects`,  project)
      .subscribe(response => {
        console.log('CREATED PROJECT RESPONSE', response);
        this.respMsg = response;
        this.router.navigate(['/admin/tempr']);
      });
  }
  updateProject(
    projectId,
    projectName,
    projectDescription,
    startDate,
    endDate,
    projectInactive
  ) {
    const project = {
      projectId,
      projectName,
      projectDescription,
      startDate,
      endDate,
      projectInactive
    };
    this.http
      .put(`${apiUrl}projects/${projectId}`, project)
      .subscribe(response => {
        console.log('UPDATED project RESPONSE', response);
        this.respMsg = response;
        this.router.navigate(['/admin/tempr']);
      });
  }
  deleteProject(projectId) {
    // this.http.delete(`${apiUrl}projects/${projectId}`)
    this.http.delete(`${apiUrl}projects/${projectId}`)
      .subscribe((response) => {
        console.log('Deleted Project Response', response);
        this.respMsg = response;
        this.router.navigate(['/admin/tempr']);
      });
  }
  // PEOPLE
  deleteUser(personId) {
    // this.http.delete(`${apiUrl}people/${personId}`)
    this.http.delete(peopleUrl + personId)
      .subscribe((response) => {
        console.log('Del User Response', response);
        this.respMsg = response;
        this.router.navigate(['/admin/tempr']);
      });
  }
  createUser(person) {
    this.http
      .post(`${apiUrl}people`, person)
      .subscribe(response => {
        console.log('New User Response', response);
        this.respMsg = response;
        this.router.navigate(['/admin/tempr']);
      });
  }
  updatePerson(
    personId,
    data
  ) {
    this.http
      .put(`${apiUrl}people/${personId}`, data)
      .subscribe(response => {
        console.log('UPDATED person RESPONSE', response);
        this.respMsg = response;
        this.router.navigate(['/admin/people']);
      });
  }
}
