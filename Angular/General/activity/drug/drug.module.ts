import { NgModule } from '@angular/core';
import { DrugSelectComponent } from './drug-select/drug-select.component';
import { DrugDetailComponent } from './drug-detail/drug-detail.component';
import { DrugDetailFullComponent } from './drug-detail-full/drug-detail-full.component';
import { DrugDetailTotalComponent } from './drug-detail-total/drug-detail-total.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    DrugSelectComponent,
    DrugDetailComponent,
    DrugDetailFullComponent,
    DrugDetailTotalComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DrugSelectComponent,
    DrugDetailComponent,
    DrugDetailFullComponent,
    DrugDetailTotalComponent
  ]
})
export class DrugModule { }
