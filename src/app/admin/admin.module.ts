import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DepartmentsComponent } from './departments/departments.component';
import { FormatsComponent } from './formats/formats.component';
import { ImportancesComponent } from './importances/importances.component';
import { LocationsComponent } from './locations/locations.component';
import { PeopleComponent } from './people/people.component';
import { ProjectsComponent } from './projects/projects.component';
import { PurposesComponent } from './purposes/purposes.component';
import { TemprComponent } from './tempr/tempr.component';
import { WorktypesComponent } from './worktypes/worktypes.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderModule} from 'ngx-order-pipe';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxPrintModule} from 'ngx-print';
import { PersonDialogueComponent } from './person-dialogue/person-dialogue.component';
import {AdminRoutingModule} from './admin-routing.module';


@NgModule({
  declarations: [AdminComponent,
    DepartmentsComponent,
    FormatsComponent,
    ImportancesComponent,
    LocationsComponent,
    PeopleComponent,
    ProjectsComponent,
    PurposesComponent,
    TemprComponent,
    WorktypesComponent,
    PersonDialogueComponent],
  imports: [
    BrowserAnimationsModule,
    LayoutModule,
    MatRippleModule,
    FilterPipeModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    OrderModule,
    FlexLayoutModule,
    NgxPrintModule,
    MatDialogModule,
    CommonModule,
    AdminRoutingModule
  ],
  entryComponents: [
  PersonDialogueComponent
  ]
})
export class AdminModule { }
