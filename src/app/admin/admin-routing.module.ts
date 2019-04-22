import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './admin.component';
import {LocationsComponent} from './locations/locations.component';
import {DepartmentsComponent} from './departments/departments.component';
import {FormatsComponent} from './formats/formats.component';
import {ImportancesComponent} from './importances/importances.component';
import {ProjectsComponent} from './projects/projects.component';
import {PurposesComponent} from './purposes/purposes.component';
import {WorktypesComponent} from './worktypes/worktypes.component';
import {PeopleComponent} from './people/people.component';
import {TemprComponent} from './tempr/tempr.component';
import {PersonDialogueComponent} from './person-dialogue/person-dialogue.component';

const adminRoutes: Routes = [
  {path: 'app/admin', component: AdminComponent, children: [
      {path: 'locations', component: LocationsComponent},
      {path: 'departments', component: DepartmentsComponent},
      {path: 'formats', component: FormatsComponent},
      {path: 'importance', component: ImportancesComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'purposes', component: PurposesComponent},
      {path: 'worktypes', component: WorktypesComponent},
      {path: 'people', component: PeopleComponent},
      { path: 'tempr', component: TemprComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
  entryComponents: [
    PersonDialogueComponent
  ],
  providers: []
})
export class AdminRoutingModule { }
