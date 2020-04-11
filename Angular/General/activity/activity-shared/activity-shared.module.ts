import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ActivityDeleteComponent } from './activity-delete/activity-delete.component';
import { ActivityFilterComponent } from './activity-filter/activity-filter.component';
import { ActivityAkamAgreementComponent } from './activity-akam-agreement/activity-akam-agreement.component';
import { ActivityFinesComponent } from './activity-fines/activity-fines.component';
import { ActivityDrugsModule } from './activity-drugs/activity-drugs.module';
import { AcativityInvestmentsDistributionTableComponent } from './acativity-investments-distribution-table/acativity-investments-distribution-table.component';

@NgModule({
  declarations: [
    ActivityDeleteComponent,
    ActivityFilterComponent,
    ActivityAkamAgreementComponent,
    ActivityFinesComponent,
    AcativityInvestmentsDistributionTableComponent
  ],
  imports: [
    SharedModule,
    ActivityDrugsModule
  ],
  exports: [
    SharedModule,
    ActivityDeleteComponent,
    ActivityFilterComponent,
    ActivityAkamAgreementComponent,
    ActivityFinesComponent,
    ActivityDrugsModule,
    AcativityInvestmentsDistributionTableComponent
  ],
  entryComponents: [
    ActivityDeleteComponent
  ]
})
export class ActivitySharedModule { }
