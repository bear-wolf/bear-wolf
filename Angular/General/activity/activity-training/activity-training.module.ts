import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ActivitySharedModule } from '../activity-shared/activity-shared.module';
import { ActivityTrainingRoutingModule } from './activity-training-routing.module';
import { ActivityTrainingComponent } from './activity-training.component';
import { ActivityTrainingCommonInfoComponent } from './activity-training-common-info/activity-training-common-info.component';
import { ActivityTrainingCommonParametersComponent } from './activity-training-common-parameters/activity-training-common-parameters.component';
import { ActivityTrainingCommonEconomicsComponent } from './activity-training-common-economics/activity-training-common-economics.component';
import { ActivityTrainingResultsComponent } from './activity-training-results/activity-training-results.component';
import {TrainingService} from './training.service';
import { ActivityTrainingDocTotalComponent } from './activity-training-doc-total/activity-training-doc-total.component';

@NgModule({
  declarations: [
    ActivityTrainingComponent,
    ActivityTrainingCommonInfoComponent,
    ActivityTrainingCommonParametersComponent,
    ActivityTrainingCommonEconomicsComponent,
    ActivityTrainingResultsComponent,
    ActivityTrainingDocTotalComponent
  ],
  imports: [
    ActivitySharedModule,
    ActivityTrainingRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[TrainingService]
})
export class ActivityTrainingModule { }
