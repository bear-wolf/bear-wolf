import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import {FormBuilder, Validators} from '@angular/forms';
import { iOption } from '@shared/models/option.model';
import { DataService } from '@shared/services/data.service';
import { BasicMarketing } from '../basic-marketing.model';
import { ActivityBasicMarketingDataFromEnum } from '../activity-basic-marketing-data-from.enum';
import { ActivityBasicMarketingActivityTypeEnum } from '../activity-basic-marketing-activity-type.enum';
import { enumToList } from '@shared/functions/enumToList';

@Component({
  selector: 'app-activity-basic-marketing-common-info',
  templateUrl: './activity-basic-marketing-common-info.component.html',
  styleUrls: ['./activity-basic-marketing-common-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBasicMarketingCommonInfoComponent extends CommonInner implements OnInit {
  @Input()
  basicMarketing: BasicMarketing;

  // Dropdowns options
  periodOptions: iOption[];
  ndsOptions: iOption[];
  dataFromOptions: iOption[] = enumToList(ActivityBasicMarketingDataFromEnum);
  activityTypeOptions: iOption[] = enumToList(ActivityBasicMarketingActivityTypeEnum);

  constructor(
    public fb: FormBuilder,
    public dataService: DataService
  ) {
    super(fb);
    this.periodOptions = this.dataService.getPeriod();
    this.ndsOptions = this.dataService.getListTrue();
  }

  ngOnInit() {
    super.ngOnInit(this.basicMarketing);

    this.buildForm({
      activityPeriod: [this.basicMarketing.activityPeriod],
      dataFrom: [this.basicMarketing.dataFrom, Validators.required],
      activityType: [this.basicMarketing.basicMarketingActivityType, Validators.required],
      nds: [this.basicMarketing.hasVat]
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      console.log('ActivityBasicMarketingCommonInfoComponent\'s form is invalid');
      return;
    }

    this.basicMarketing.activityPeriod.from = this.form.get('activityPeriod').value.from;
    this.basicMarketing.activityPeriod.to = this.form.get('activityPeriod').value.to;
    this.basicMarketing.dataFrom = this.form.get('dataFrom').value;
    this.basicMarketing.basicMarketingActivityType = this.form.get('activityType').value;
    this.basicMarketing.hasVat = this.form.get('nds').value;
  }
}
