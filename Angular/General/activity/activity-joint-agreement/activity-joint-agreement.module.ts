import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ActivityJointAgreementComponent } from './activity-joint-agreement.component';
import { ActivitySharedModule } from '../activity-shared/activity-shared.module';
import { ActivityJointAgreementRoutingModule } from './activity-joint-agreement-routing.module';
import { ActivityJointAgreementCommonComponent } from './activity-joint-agreement-common/activity-joint-agreement-common.component';
import { ActivityJointAgreementDocsComponent } from './activity-joint-agreement-docs/activity-joint-agreement-docs.component';
import {JointAgreementService} from './joint-agreement.service';
import { ActivityJointAgreementListComponent } from './activity-joint-agreement-list/activity-joint-agreement-list.component';
import {ActivityListModule} from '../activity-list/activity-list.module';



@NgModule({
  declarations: [
    ActivityJointAgreementComponent,
    ActivityJointAgreementCommonComponent,
    ActivityJointAgreementDocsComponent,
    ActivityJointAgreementListComponent,
  ],
    imports: [
        ActivitySharedModule,
        ActivityJointAgreementRoutingModule,
        ActivityListModule
    ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [JointAgreementService]
})
export class ActivityJointAgreementModule { }
