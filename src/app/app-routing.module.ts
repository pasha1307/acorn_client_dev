import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RecordsComponent} from './records/records.component';
import {RecordsResolverService} from './shared/resolvers/records-resolver.service';
import {NewRecordComponent} from './create/new-record/new-record.component';
import {RolesResolver} from './shared/resolvers/roles.resolver';
import {ProjectsResolver} from './shared/resolvers/projects.resolver';
import {GroupsResolver} from './shared/resolvers/groups.resolver';
import {ChargesResolver} from './shared/resolvers/charges.resolver';
import {ReposResolver} from './shared/resolvers/repos.resolver';
import {PurposesResolver} from './shared/resolvers/purposes.resolver';
import {StoragesResolver} from './shared/resolvers/storages.resolver';
import {FormatsResolver} from './shared/resolvers/formats.resolver';
import {UtilsResolver} from './shared/resolvers/utils.resolver';
import {TempComponent} from './temp/temp.component';
import {NewOswComponent} from './create/new-osw/new-osw.component';
import {LocationsResolver} from './shared/resolvers/locations.resolver';
import {GroupComponent} from './create/group/group.component';
import {EditRecordComponent} from './edit-record/edit-record.component';
import {EditOswComponent} from './edit-osw/edit-osw.component';
import {EditGroupComponent} from './edit-group/edit-group.component';
import {ProposalComponent} from './proposal/proposal.component';
import {ProposalsResolver} from './shared/resolvers/proposals.resolver';
import {ProposalEditComponent} from './proposal/proposal-edit/proposal-edit.component';
import {ReportComponent} from './report/report.component';
import {ReportsResolver} from './shared/resolvers/reports.resolver';
import {ReportEditComponent} from './report/report-edit/report-edit.component';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent,
    resolve: { groups: GroupsResolver}
    },
  {
    path: 'records', component: RecordsComponent
  },
  {path: 'temp', component: TempComponent},
  {
    path: 'app/new/record',
    component: NewRecordComponent,
    resolve: {
      roles: RolesResolver,
      charges: ChargesResolver,
      utils: UtilsResolver
    }
    },
  {
    path: 'app/new/group',
    component: GroupComponent,
    resolve: {
      roles: RolesResolver,
      charges: ChargesResolver,
      utils: UtilsResolver
    }
  },
  {
    path: 'app/new/ows',
    component: NewOswComponent,
    resolve: {
      roles: RolesResolver,
      charges: ChargesResolver,
      utils: UtilsResolver
    },
  },
  {
    path: 'app/edit/osw/:recordId',
    // component: OswComponent,
    component: EditOswComponent,
    resolve: {
      roles: RolesResolver,
      charges: ChargesResolver,
      utils: UtilsResolver
    }
  },
  {
    path: 'app/edit/record/:recordId',
    component: EditRecordComponent,
    resolve: {
      roles: RolesResolver,
      charges: ChargesResolver,
      utils: UtilsResolver
    }
  },
  {
    path: 'app/edit/group/:groupId',
    component: EditGroupComponent,
    resolve: {
      roles: RolesResolver,
      charges: ChargesResolver,
      utils: UtilsResolver
    }
  },
  {
    path: 'app/proposals', component: ProposalComponent,
    resolve: {
      proposals: ProposalsResolver,
      roles: RolesResolver,
    }
  },
  {
    path: 'app/proposals/:proposalId', component: ProposalEditComponent,
    resolve: {
      roles: RolesResolver,
      charges: ChargesResolver,
      utils: UtilsResolver
    }
  },
  {
    path: 'app/reports', component: ReportComponent,
    resolve: {
      reports: ReportsResolver,
      roles: RolesResolver,
    }
  },
  {
    path: 'app/reports/:reportId', component: ReportEditComponent,
    resolve: {
      roles: RolesResolver,
      utils: UtilsResolver
    }
  },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', redirectTo: 'app'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    RecordsResolverService,
    RolesResolver,
    ProjectsResolver,
    GroupsResolver,
    ChargesResolver,
    ReposResolver,
    LocationsResolver,
    PurposesResolver,
    StoragesResolver,
    FormatsResolver,
    ProposalsResolver,
    ReportsResolver,
    UtilsResolver
  ]
})
export class AppRoutingModule { }
