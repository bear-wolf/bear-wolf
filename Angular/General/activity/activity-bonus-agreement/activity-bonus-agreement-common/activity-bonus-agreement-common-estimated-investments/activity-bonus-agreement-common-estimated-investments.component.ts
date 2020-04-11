import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {iOption} from '@shared/models/option.model';
import { FormBuilder, Validators } from '@angular/forms';
import {DataService} from '@shared/services/data.service';
import {BonusAgreement} from '../../bonus-agreement.model';

@Component({
  selector: 'app-activity-bonus-agreement-common-estimated-investments',
  templateUrl: './activity-bonus-agreement-common-estimated-investments.component.html',
  styleUrls: ['./activity-bonus-agreement-common-estimated-investments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBonusAgreementCommonEstimatedInvestmentsComponent extends CommonInner implements OnInit {
  @Input()
  bonusAgreement: BonusAgreement;

  periodOptions: iOption[];

  constructor(
    public fb: FormBuilder,
    public dataService: DataService
  ) {
    super(fb);
    this.periodOptions = this.dataService.getPeriod();
  }

  ngOnInit() {
    super.ngOnInit(this.bonusAgreement);

    this.buildForm({
      factTotal: [this.bonusAgreement.factTotal, Validators.required],
      growthOrganic: [this.bonusAgreement.growthOrganic, Validators.required],
      investment: [this.bonusAgreement.investment, Validators.required],
      planTotal: [this.bonusAgreement.planTotal],
      investmentByMatrix: [this.bonusAgreement.investmentByMatrix],
      investmentMonth: [this.bonusAgreement.investmentMonth],
      estimatedInvestmentsForPeriodPrice: [this.bonusAgreement.estimatedInvestmentsForPeriodPrice, Validators.required],
      priceReport: [this.bonusAgreement.priceReport, Validators.required],
      reportPeriod: [this.bonusAgreement.periodFact],
    });

    this.form.get('estimatedInvestmentsForPeriodPrice').valueChanges.subscribe((value: number) => {
      this.bonusAgreement.estimatedInvestmentsForPeriodPrice = Number(value);
      this.bonusAgreement.emitEstimatedInvestmentsChange();
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      console.log('ActivityBonusAgreementCommonEstimatedInvestmentsComponent\'s form is invalid');
      return;
    }

    const formValue: any = this.form.getRawValue();
    this.bonusAgreement.factTotal = formValue.factTotal;
    this.bonusAgreement.growthOrganic = formValue.growthOrganic;
    this.bonusAgreement.investment = formValue.investment;
    this.bonusAgreement.periodFact = formValue.reportPeriod;
    this.bonusAgreement.estimatedInvestmentsForPeriodPrice = Number(formValue.estimatedInvestmentsForPeriodPrice || 0);
    this.bonusAgreement.priceReport = formValue.priceReport;
  }
}
