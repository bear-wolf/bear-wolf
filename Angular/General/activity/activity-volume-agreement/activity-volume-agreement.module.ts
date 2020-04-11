import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivitySharedModule} from '../activity-shared/activity-shared.module';
import {DrugModule} from '../drug/drug.module';
import {ActivityVolumeAgreementRoutingModule} from './activity-volume-agreement-routing.module';
import {ActivityVolumeAgreementComponent} from './activity-volume-agreement.component';
import {ActivityVolumeAgreementCommonInfoComponent} from './activity-volume-agreement-common-info/activity-volume-agreement-common-info.component';
import {ActivityVolumeAgreementDrugsDetailsComponent} from './activity-volume-agreement-drugs-details/activity-volume-agreement-drugs-details.component';
import {ActivityVolumeAgreementDrugsGroupComponent} from './activity-volume-agreement-drugs-group/activity-volume-agreement-drugs-group.component';
import {ActivityVolumeAgreementDocsComponent} from './activity-volume-agreement-docs/activity-volume-agreement-docs.component';
import {VolumeAgreementService} from './volume-agreement.service';
import {VolumeAgreementChooseDrugComponent} from './activity-volume-agreement-drugs-details/volume-agreement-choose-drug/volume-agreement-choose-drug.component';
import {VolumeAgreementDrugDetailComponent} from './activity-volume-agreement-drugs-details/volume-agreement-drug-detail/volume-agreement-drug-detail.component';
import {VolumeAgreementDrugTotalComponent} from './activity-volume-agreement-drugs-details/volume-agreement-drug-total/volume-agreement-drug-total.component';
import {VolumeAgreementDrugScaleComponent} from './activity-volume-agreement-drugs-details/volume-agreement-drug-scale/volume-agreement-drug-scale.component';
import {SharedModule} from '@shared/shared.module';
import {AgreementDrugModule} from '@shared/components/agreement-drug/agreement-drug.module';
import {ActivityBonusAgreementModule} from '../activity-bonus-agreement/activity-bonus-agreement.module';

@NgModule({
    declarations: [
        ActivityVolumeAgreementComponent,
        ActivityVolumeAgreementCommonInfoComponent,
        ActivityVolumeAgreementDrugsDetailsComponent,
        ActivityVolumeAgreementDrugsGroupComponent,
        ActivityVolumeAgreementDocsComponent,
        VolumeAgreementChooseDrugComponent,
        VolumeAgreementDrugDetailComponent,
        VolumeAgreementDrugTotalComponent,
        VolumeAgreementDrugScaleComponent,
    ],
    imports: [
        ActivitySharedModule,
        ActivityVolumeAgreementRoutingModule,
        AgreementDrugModule,
        SharedModule,
        DrugModule,
        ActivityBonusAgreementModule
    ],
    providers: [
        VolumeAgreementService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ActivityVolumeAgreementModule {
}
