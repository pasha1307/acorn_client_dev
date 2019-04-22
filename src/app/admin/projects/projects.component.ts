import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RecordsService} from '../../shared/services/records.service';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {AdminListService} from '../../shared/services/admin-list.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<any[]>;
  projectId;
  projectName;
  userFilter = {projectName: ''};
  projectDescription;
  startDate;
  endDate;
  projectInactive = false;
  @ViewChild('panelForm') panelForm: ElementRef;
  constructor(public recordService: AdminListService) { }

  ngOnInit() {
    this.projects$ = this.recordService.getAllProjects();
  }
  onCreate(f: NgForm) {
    this.projectName = f.value.projectName;
    this.projectDescription = f.value.projectDescription;
    this.startDate = f.value.startDate;
    this.endDate = f.value.endDate;
    this.projectInactive = f.value.projectInactive;
    this.recordService.createProject(
      this.projectName,
      this.projectDescription,
      this.startDate,
      this.endDate,
      this.projectInactive
    );
  }
  onCancel(form: NgForm) {
    this.panelForm['expanded'] = false;
    form.resetForm();
  }
  onUpdateProject(f: NgForm, id) {
    this.projectId = id;
    this.projectName = f.value.projectName;
    this.projectDescription = f.value.projectDescription;
    this.startDate = f.value.startDate;
    this.endDate = f.value.endDate;
    this.projectInactive = f.value.projectInactive;
    this.recordService.updateProject(
      this.projectId,
      this.projectName,
      this.projectDescription,
      this.startDate,
      this.endDate,
      this.projectInactive || null
    );
  }
  onDelete(id) {
    this.recordService.deleteProject(id);
  }
}
