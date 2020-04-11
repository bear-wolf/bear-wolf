import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {iOption} from '@shared/models/option.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DataService} from '@shared/services/data.service';
import {ECommerce} from '../e-commerce.model';

@Component({
  selector: 'app-activity-e-commerce-common-info',
  templateUrl: './activity-e-commerce-common-info.component.html',
  styleUrls: ['./activity-e-commerce-common-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityECommerceCommonInfoComponent extends CommonInner implements OnInit {
  @Input()
  eCommerce: ECommerce;

  period: iOption[];
  duration: iOption[];

  constructor(
      public fb: FormBuilder,
      public dataService: DataService
  ) {
    super(fb);
    this.period = this.dataService.getPeriod();
    this.duration = this.dataService.getMonthToSelect();
  }

  ngOnInit() {
    super.ngOnInit(this.eCommerce);

    this.buildForm({
      activityPeriod: [this.eCommerce.activityPeriod],
      activityMonthFrom: [this.eCommerce.activityMonthFrom, Validators.required],
      duration: [this.eCommerce.duration],
      durationForBudget: [this.eCommerce.durationForBudget]
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.validation()) {
      return;
    }

    const data = this.form.getRawValue();

    this.eCommerce.activityPeriod = data.activityPeriod;
    this.eCommerce.activityMonthFrom = new Date(data.activityMonthFrom);
    this.eCommerce.duration = data.duration || 0;
    this.eCommerce.durationForBudget = data.durationForBudget || 0;
  }
}
