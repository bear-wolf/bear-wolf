import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDrugsSelectComponent } from './activity-drugs-select/activity-drugs-select.component';

@NgModule({
  declarations: [
    ActivityDrugsSelectComponent
  ],
  exports: [
    ActivityDrugsSelectComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ActivityDrugsModule { }
