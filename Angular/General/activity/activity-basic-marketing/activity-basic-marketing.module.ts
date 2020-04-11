import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ActivitySharedModule } from '../activity-shared/activity-shared.module';
import { ActivityBasicMarketingComponent } from './activity-basic-marketing.component';
import { ActivityBasicMarketingRoutingModule } from './activity-basic-marketing-routing.module';
import { ActivityBasicMarketingCommonInfoComponent } from './activity-basic-marketing-common-info/activity-basic-marketing-common-info.component';
import { ActivityBasicMarketingSelectDrugComponent } from './activity-basic-marketing-select-drug/activity-basic-marketing-select-drug.component';
import { ActivityBasicMarketingInvestmentsComponent } from './activity-basic-marketing-investments/activity-basic-marketing-investments.component';
import { ActivityBasicMarketingSkuDetailsComponent } from './activity-basic-marketing-sku-details/activity-basic-marketing-sku-details.component';
import { DrugModule } from '../drug/drug.module';
import { ActivityBasicMarketingTotalComponent } from './activity-basic-marketing-total/activity-basic-marketing-total.component';
import { BasicMarketingService } from './basic-marketing.service';
import { ActivityBasicMarketingChooseSkuComponent } from './activity-basic-marketing-choose-sku/activity-basic-marketing-choose-sku.component';
import { ActivityBasicMarketingSkuMarketInfoComponent } from './activity-basic-marketing-sku-market-info/activity-basic-marketing-sku-market-info.component';
import { ActivityBasicMarketingFinesComponent } from './activity-basic-marketing-fines/activity-basic-marketing-fines.component';

@NgModule({
  declarations: [
    ActivityBasicMarketingComponent,
    ActivityBasicMarketingCommonInfoComponent,
    ActivityBasicMarketingSelectDrugComponent,
    ActivityBasicMarketingInvestmentsComponent,
    ActivityBasicMarketingSkuDetailsComponent,
    ActivityBasicMarketingTotalComponent,
    ActivityBasicMarketingChooseSkuComponent,
    ActivityBasicMarketingSkuMarketInfoComponent,
    ActivityBasicMarketingFinesComponent,
  ],
  imports: [
    ActivitySharedModule,
    ActivityBasicMarketingRoutingModule,
    DrugModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    BasicMarketingService
  ]
})
export class ActivityBasicMarketingModule {
}
