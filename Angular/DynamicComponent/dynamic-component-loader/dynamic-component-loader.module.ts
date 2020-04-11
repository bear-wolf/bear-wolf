import {ModuleWithProviders, NgModule} from '@angular/core';
import {ROUTES} from '@angular/router';
import {DYNAMIC_COMPONENT_MANIFESTS, DynamicComponentManifest} from './dynamic-component.manifest';


@NgModule({
    declarations: [],
    providers: []
})
export class DynamicComponentLoaderModule {
    static forRoot(manifests: DynamicComponentManifest[]): ModuleWithProviders {
        return {
            ngModule: DynamicComponentLoaderModule,
            providers: [
                // provider for Angular CLI to analyze
                {provide: ROUTES, useValue: manifests, multi: true},
                {provide: DYNAMIC_COMPONENT_MANIFESTS, useValue: manifests}
            ],
        };
    }
}
