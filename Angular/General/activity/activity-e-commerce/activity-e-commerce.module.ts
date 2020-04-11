import { NgModule } from '@angular/core';
import { ActivitySharedModule } from '../activity-shared/activity-shared.module';
import { ActivityECommerceRoutingModule } from './activity-e-commerce-routing.module';
import { ActivityECommerceComponent } from './activity-e-commerce.component';
import { ActivityECommerceCommonActivityTypesComponent } from './activity-e-commerce-common-activity-types/activity-e-commerce-common-activity-types.component';
import { ActivityECommerceCommonDrugsComponent } from './activity-e-commerce-common-drugs/activity-e-commerce-common-drugs.component';
import { ActivityECommerceCommonInfoComponent } from './activity-e-commerce-common-info/activity-e-commerce-common-info.component';
import { ActivityECommerceResultsComponent } from './activity-e-commerce-results/activity-e-commerce-results.component';
import {ECommerceService} from './e-commerce.service';

@NgModule({
  declarations: [
    ActivityECommerceComponent,
    ActivityECommerceCommonActivityTypesComponent,
    ActivityECommerceCommonDrugsComponent,
    ActivityECommerceCommonInfoComponent,
    ActivityECommerceResultsComponent,
  ],
  imports: [
    ActivitySharedModule,
    ActivityECommerceRoutingModule
  ],
  providers: [
    ECommerceService
  ]
})
export class ActivityECommerceModule { }
