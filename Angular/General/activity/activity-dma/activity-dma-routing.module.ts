import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityDmaComponent} from './activity-dma.component';
import {ActivityDmaResolver} from './activity-dma.resolver';

const routes: Routes = [
    {
        path: ':id/:version',
        resolve: {
            activity: ActivityDmaResolver
        },
        component: ActivityDmaComponent
    },
    {path: ':id', component: ActivityDmaComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ActivityDmaRoutingModule {
}
