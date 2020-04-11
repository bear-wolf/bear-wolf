import { NgModule } from '@angular/core';
import { ActivitySharedModule } from '../activity-shared/activity-shared.module';
import { ActivityBonusAgreementComponent } from './activity-bonus-agreement.component';
import { ActivityBonusAgreementRoutingModule } from './activity-bonus-agreement-routing.module';
import { ActivityBonusAgreementCommonComponent } from './activity-bonus-agreement-common/activity-bonus-agreement-common.component';
import { ActivityBonusAgreementCommonInfoComponent } from './activity-bonus-agreement-common/activity-bonus-agreement-common-info/activity-bonus-agreement-common-info.component';
import { ActivityBonusAgreementCommonEstimatedInvestmentsComponent } from './activity-bonus-agreement-common/activity-bonus-agreement-common-estimated-investments/activity-bonus-agreement-common-estimated-investments.component';
import { ActivityBonusAgreementDrugsGroupComponent } from './activity-bonus-agreement-drugs-group/activity-bonus-agreement-drugs-group.component';
import { ActivityBonusAgreementDrugsDetailsComponent } from './activity-bonus-agreement-drugs-details/activity-bonus-agreement-drugs-details.component';
import { ActivityBonusAgreementDocsAndResultsComponent } from './activity-bonus-agreement-docs-and-results/activity-bonus-agreement-docs-and-results.component';
import { BonusAgreementService } from './bonus-agreement.service';
import { AgreementDrugModule } from '@shared/components/agreement-drug/agreement-drug.module';
import { ActivityBonusAgreementFinesComponent } from './activity-bonus-agreement-fines/activity-bonus-agreement-fines.component';

@NgModule({
  declarations: [
    ActivityBonusAgreementComponent,
    ActivityBonusAgreementCommonComponent,
    ActivityBonusAgreementCommonInfoComponent,
    ActivityBonusAgreementCommonEstimatedInvestmentsComponent,
    ActivityBonusAgreementDrugsGroupComponent,
    ActivityBonusAgreementDrugsDetailsComponent,
    ActivityBonusAgreementDocsAndResultsComponent,
    ActivityBonusAgreementFinesComponent,
  ],
  imports: [
    ActivitySharedModule,
    ActivityBonusAgreementRoutingModule,
    AgreementDrugModule
  ],
  providers: [
    BonusAgreementService
  ]
})
export class ActivityBonusAgreementModule {
}
