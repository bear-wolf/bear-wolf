import { NgModule } from '@angular/core';
import { ActivityListComponent } from './activity-list.component';
import { ActivityListRoutingModule } from './activity-list-routing.module';
import { ActivitySharedModule } from '../activity-shared/activity-shared.module';

@NgModule({
  declarations: [
    ActivityListComponent
  ],
  imports: [
    ActivitySharedModule,
    ActivityListRoutingModule
  ],
  exports: [
    ActivityListComponent
  ]
})
export class ActivityListModule { }
