import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RecordsComponent} from './records/records.component';
import {OswComponent} from './osw/osw.component';
import {PeopleComponent} from './people/people.component';
import {DashComponent} from './ui/dash/dash.component';
import {MainNavComponent} from './ui/main-nav/main-nav.component';
import { FormatSelectComponent } from './ui/options/format-select/format-select.component';

import { CreateComponent } from './create/create.component';
import { NewRecordComponent } from './create/new-record/new-record.component';
import { NewOswComponent } from './create/new-osw/new-osw.component';

import { RecordsContentComponent } from './home/records-content/records-content.component';
import { OswContentComponent } from './home/osw-content/osw-content.component';
import { TesttComponent } from './testt/testt.component';

import { TempComponent } from './temp/temp.component';
import { GroupComponent } from './create/group/group.component';
import { GroupsContentComponent } from './home/groups-content/groups-content.component';

import { EditRecordComponent } from './edit-record/edit-record.component';
import { EditOswComponent } from './edit-osw/edit-osw.component';
import { OswUpdateComponent } from './edit-osw/osw-update/osw-update.component';
import { RecordUpdateComponent } from './edit-record/record-update/record-update.component';
import { OswFilesComponent } from './edit-osw/osw-files/osw-files.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { ProposalComponent } from './proposal/proposal.component';
import { ProposalCreateComponent } from './edit-record/proposal-create/proposal-create.component';
import { ProposalContentComponent } from './proposal/proposal-content/proposal-content.component';
import {EmailComponent} from './proposal/email/email.component';
import { ProposalSubmitComponent } from './proposal/proposal-submit/proposal-submit.component';
import { ProposalEditComponent } from './proposal/proposal-edit/proposal-edit.component';
import { ReportComponent } from './report/report.component';
import { ReportCreateComponent } from './edit-record/report-create/report-create.component';
import { ReportEditComponent } from './report/report-edit/report-edit.component';
import { ReportContentComponent } from './report/report-content/report-content.component';
import { FormReportEditComponent } from './report/report-edit/form-report-edit/form-report-edit.component';
import {AdminModule} from './admin/admin.module';
import {PersonDialogueComponent} from './admin/person-dialogue/person-dialogue.component';
import {AppRoutingModule} from './app-routing.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import { UploaderComponent } from './file-upload/uploader/uploader.component';
import { FilesComponent } from './files/files.component';
import { DialogImageComponent } from './dialog-image/dialog-image.component';
import { DialogRecordComponent } from './dialog-record/dialog-record.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecordsComponent,
    OswComponent,
    PeopleComponent,
    MainNavComponent,
    DashComponent,
    FormatSelectComponent,
    CreateComponent,
    NewRecordComponent,
    NewOswComponent,
    RecordsContentComponent,
    OswContentComponent,
    TesttComponent,
    TempComponent,
    GroupComponent,
    GroupsContentComponent,
    EditRecordComponent,
    EditOswComponent,
    OswUpdateComponent,
    RecordUpdateComponent,
    OswFilesComponent,
    EditGroupComponent,
    ProposalComponent,
    ProposalCreateComponent,
    ProposalContentComponent,
    EmailComponent,
    ProposalSubmitComponent,
    ProposalEditComponent,
    ReportComponent,
    ReportCreateComponent,
    ReportEditComponent,
    ReportContentComponent,
    FormReportEditComponent,
    FileUploadComponent,
    UploaderComponent,
    FilesComponent,
    DialogImageComponent,
    DialogRecordComponent
  ],
  imports: [
    SharedModule,
    AdminModule,
    AppRoutingModule,
    AngularFileUploaderModule
  ],
  providers: [],
  entryComponents: [
    PersonDialogueComponent,
    DialogImageComponent,
    DialogRecordComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
