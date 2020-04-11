import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityBonusAgreementComponent} from './activity-bonus-agreement.component';
import {ActivityBonusAgreementResolver} from './activity-bonus-agreement.resolver';

const routes: Routes = [
    {
        path: ':id/:version',
        resolve: {
            activity: ActivityBonusAgreementResolver
        },
        component: ActivityBonusAgreementComponent
    },
    {path: ':id', component: ActivityBonusAgreementComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ActivityBonusAgreementRoutingModule {
}
