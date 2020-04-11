import { NgModule } from '@angular/core';
import { ActivityRoutingModule } from './activity-routing.module';
import { SharedModule } from '@shared/shared.module';
import {ActivityResolver} from './activity.resolver';
import {DocumentService} from '@shared/services/document.service';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ActivityRoutingModule
  ],
  providers: [
    ActivityResolver,
    DocumentService
  ],
  entryComponents: []
})
export class ActivityModule {
}
