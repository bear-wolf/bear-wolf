import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityVolumeAgreementComponent} from './activity-volume-agreement.component';
import {ActivityVolumeAgreementResolver} from './activity-volume-agreement.resolver';

const routes: Routes = [
    {
        path: ':id/:version',
        resolve: {
            activity: ActivityVolumeAgreementResolver
        },
        component: ActivityVolumeAgreementComponent
    },
    {path: ':id', component: ActivityVolumeAgreementComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ActivityVolumeAgreementRoutingModule {
}
