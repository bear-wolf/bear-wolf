import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder, Validators } from '@angular/forms';
import { iOption } from '@shared/models/option.model';
import { DataService } from '@shared/services/data.service';
import { BasicMarketing } from '../basic-marketing.model';

@Component({
  selector: 'app-activity-basic-marketing-investments',
  templateUrl: './activity-basic-marketing-investments.component.html',
  styleUrls: ['./activity-basic-marketing-investments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBasicMarketingInvestmentsComponent extends CommonInner implements OnInit {
  @Input()
  basicMarketing: BasicMarketing;

  periodOptions: iOption[];

  constructor(
    public fb: FormBuilder,
    public dataService: DataService
  ) {
    super(fb);
    this.periodOptions = this.dataService.getPeriod();
  }

  ngOnInit() {
    super.ngOnInit(this.basicMarketing);

    this.buildForm({
      totalFactOldPrice: [this.basicMarketing.totalFactOldPrice, Validators.required],
      organicGrowth: [this.basicMarketing.organicGrowth, Validators.required],
      investmentPercentage: [this.basicMarketing.investmentPercentage, Validators.required],
      estimatedInvestmentsForPeriodPrice: [this.basicMarketing.estimatedInvestmentsForPeriodPrice, Validators.required],
      oneSkuReportPricePrice: [this.basicMarketing.oneSkuReportPricePrice, Validators.required],
      actualReportingPeriod: [this.basicMarketing.actualReportingPeriod]
    });

    this.form.get('estimatedInvestmentsForPeriodPrice').valueChanges.subscribe((value: number) => {
      this.basicMarketing.estimatedInvestmentsForPeriodPrice = Number(value);
      this.basicMarketing.emitEstimatedInvestmentsChange();
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    const formValue: any = this.form.getRawValue();

    this.basicMarketing.totalFactOldPrice = Number(formValue.totalFactOldPrice || 0);
    this.basicMarketing.organicGrowth = Number(formValue.organicGrowth || 0);
    this.basicMarketing.investmentPercentage = Number(formValue.investmentPercentage || 0);
    this.basicMarketing.estimatedInvestmentsForPeriodPrice = Number(formValue.estimatedInvestmentsForPeriodPrice || 0);
    this.basicMarketing.oneSkuReportPricePrice = Number(formValue.oneSkuReportPricePrice || 0);
    this.basicMarketing.actualReportingPeriod = formValue.actualReportingPeriod;
  }
}