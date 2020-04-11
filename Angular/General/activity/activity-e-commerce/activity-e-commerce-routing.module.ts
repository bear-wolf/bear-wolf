import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityECommerceComponent} from './activity-e-commerce.component';
import {ActivityECommerceResolver} from './activity-e-commerce.resolver';

const routes: Routes = [
    {
        path: ':id/:version',
        resolve: {
            activity: ActivityECommerceResolver
        },
        component: ActivityECommerceComponent
    },
    {path: ':id', component: ActivityECommerceComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ActivityECommerceRoutingModule {
}
