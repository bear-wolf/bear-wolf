import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityBasicMarketingComponent } from './activity-basic-marketing.component';
import {ActivityBasicMarketingResolver} from './activity-basic-marketing.resolver';

const routes: Routes = [
  {
    path: ':id/:version',
    resolve: {
      activity: ActivityBasicMarketingResolver
    },
    component: ActivityBasicMarketingComponent
  },
  { path: ':id', component: ActivityBasicMarketingComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ActivityBasicMarketingRoutingModule {}
