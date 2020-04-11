import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ActivityResolver} from './activity.resolver';

const routes: Routes = [
  // {path: 'create', component: SoonComponent},
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', loadChildren: './activity-list/activity-list.module#ActivityListModule' },
  { path: 'basic-marketing',  resolve: { marketingPlan: ActivityResolver}, loadChildren: './activity-basic-marketing/activity-basic-marketing.module#ActivityBasicMarketingModule' },
  { path: 'bonus-agreement', resolve: { marketingPlan: ActivityResolver}, loadChildren: './activity-bonus-agreement/activity-bonus-agreement.module#ActivityBonusAgreementModule' },
  { path: 'volume-agreement', resolve: { marketingPlan: ActivityResolver}, loadChildren: './activity-volume-agreement/activity-volume-agreement.module#ActivityVolumeAgreementModule' },
  { path: 'e-commerce',  resolve: { marketingPlan: ActivityResolver}, loadChildren: './activity-e-commerce/activity-e-commerce.module#ActivityECommerceModule' },
  { path: 'dma',  resolve: { marketingPlan: ActivityResolver}, loadChildren: './activity-dma/activity-dma.module#ActivityDmaModule' },
  { path: 'training',  resolve: { marketingPlan: ActivityResolver}, loadChildren: './activity-training/activity-training.module#ActivityTrainingModule' },
  { path: 'joint-agreement',  resolve: { marketingPlan: ActivityResolver}, loadChildren: './activity-joint-agreement/activity-joint-agreement.module#ActivityJointAgreementModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivityRoutingModule {
}
