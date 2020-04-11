import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityTrainingComponent} from './activity-training.component';
import {ActivityTrainingResolver} from './activity-training.resolver';

const routes: Routes = [
    {
        path: ':id/:version',
        resolve: {
            activity: ActivityTrainingResolver
        },
        component: ActivityTrainingComponent
    },
    {path: ':id', component: ActivityTrainingComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ActivityTrainingRoutingModule {
}
