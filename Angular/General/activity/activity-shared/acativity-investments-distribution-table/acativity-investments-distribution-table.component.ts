import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {BasicMarketing} from '../../activity-basic-marketing/basic-marketing.model';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {FormBuilder, Validators} from '@angular/forms';
import {BonusAgreement} from '../../activity-bonus-agreement/bonus-agreement.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-acativity-investments-distribution-table',
  templateUrl: './acativity-investments-distribution-table.component.html',
  styleUrls: ['./acativity-investments-distribution-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AcativityInvestmentsDistributionTableComponent extends CommonInner implements OnInit {
  @Input()
  activity: BasicMarketing | BonusAgreement;
  configuration = Configuration;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  getPercentage(amount: number): number {
    if (!this.activity.estimatedInvestmentsForPeriodPrice) {
      return 0;
    }

    return Math.round((amount / this.activity.estimatedInvestmentsForPeriodPrice) * 100);
  }

  getAmount(percent: number): number {
    if (!this.activity.estimatedInvestmentsForPeriodPrice) {
      return 0;
    }

    return Math.round((this.activity.estimatedInvestmentsForPeriodPrice / 100) * percent);
  }

  get total(): number {
    return this.activity.ntzAmount + this.activity.calculationAmount + this.activity.reportsAmount;
  }

  ngOnInit() {
    this.buildForm({
      ntzPercentage: [this.getPercentage(this.activity.ntzAmount), [Validators.min(0), Validators.required]],
      ntzAmount: [this.activity.ntzAmount, Validators.required],
      calculationPercentage: [this.getPercentage(this.activity.calculationAmount), [Validators.min(0), Validators.required]],
      calculationAmount: [this.activity.calculationAmount, Validators.required],
      reportPercentage: [this.getPercentage(this.activity.reportsAmount), [Validators.min(0), Validators.required]],
      reportsAmount: [this.activity.reportsAmount, Validators.required]
    });

    this.activity.onEstimatedInvestmentsChange.subscribe((value: number) => {
      this.form.get('ntzAmount').setValue(value * 0.4);
      this.form.get('ntzPercentage').setValue(this.getPercentage(value * 0.4));
      this.form.get('calculationAmount').setValue(value * 0.3);
      this.form.get('calculationPercentage').setValue(this.getPercentage(value * 0.3));
      this.form.get('reportsAmount').setValue(value * 0.3);
      this.form.get('reportPercentage').setValue(this.getPercentage(value * 0.3));
    });
  }

  onChange(currentField: string) {

    let nextField: string;
    let otherField: string;

    switch (currentField) {
      case 'ntzAmount':
        nextField = 'calculationAmount';
        otherField = 'reportsAmount';
        break;
      case 'calculationAmount':
        nextField = 'reportsAmount';
        otherField = 'ntzAmount';
        break;
      case 'reportsAmount':
        nextField = 'ntzAmount';
        otherField = 'calculationAmount';
        break;
    }

    const delta = this.activity.estimatedInvestmentsForPeriodPrice - Number(this.form.get(currentField).value) - Number(this.form.get(nextField).value) - Number(this.form.get(otherField).value);
    this.form.get(nextField).setValue(Number(Number(this.form.get(nextField).value) + delta));

    this.calculatePercentages();
  }

  onChangePercentage(currentField: string) {
    let nextField: string;
    let otherField: string;

    switch (currentField) {
      case 'ntzPercentage':
        nextField = 'calculationPercentage';
        otherField = 'reportPercentage';
        break;
      case 'calculationPercentage':
        nextField = 'reportPercentage';
        otherField = 'ntzPercentage';
        break;
      case 'reportPercentage':
        nextField = 'ntzPercentage';
        otherField = 'calculationPercentage';
        break;
    }

    const delta = 100 - Number(this.form.get(currentField).value) - Number(this.form.get(nextField).value) - Number(this.form.get(otherField).value);
    this.form.get(nextField).setValue(Number(Number(this.form.get(nextField).value) + delta));

    this.calculateAmounts();
  }

  calculatePercentages(): void {
    this.form.get('ntzPercentage').setValue(this.getPercentage(this.form.get('ntzAmount').value));
    this.form.get('calculationPercentage').setValue(this.getPercentage(this.form.get('calculationAmount').value));
    this.form.get('reportPercentage').setValue(this.getPercentage(this.form.get('reportsAmount').value));
  }

  calculateAmounts(): void {
    this.form.get('ntzAmount').setValue(this.getAmount(this.form.get('ntzPercentage').value));
    this.form.get('calculationAmount').setValue(this.getAmount(this.form.get('calculationPercentage').value));
    this.form.get('reportsAmount').setValue(this.getAmount(this.form.get('reportPercentage').value));
  }

  submit() {
    if (!this.form.valid) {
      console.log('ActivityBasicMarketingInvestmentDistributionComponent\'s form is invalid');
      return;
    }

    const formValue: any = this.form.getRawValue();
    this.activity.ntzAmount = formValue.ntzAmount;
    this.activity.calculationAmount = formValue.calculationAmount;
    this.activity.reportsAmount = formValue.reportsAmount;
  }
}
