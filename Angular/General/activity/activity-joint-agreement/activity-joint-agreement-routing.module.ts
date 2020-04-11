import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityJointAgreementComponent} from './activity-joint-agreement.component';
import {ActivityJointAgreementResolver} from './activity-joint-agreement.resolver';

const routes: Routes = [
    {
        path: ':id/:version',
        resolve: {
            activity: ActivityJointAgreementResolver
        },
        component: ActivityJointAgreementComponent
    },
    {path: ':id', component: ActivityJointAgreementComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ActivityJointAgreementRoutingModule {
}
