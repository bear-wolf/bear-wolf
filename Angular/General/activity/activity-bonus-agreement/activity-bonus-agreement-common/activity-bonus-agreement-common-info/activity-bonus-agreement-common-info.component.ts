import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import { FormBuilder, Validators } from '@angular/forms';
import {DataService} from '@shared/services/data.service';
import {iOption} from '@shared/models/option.model';
import {BonusAgreement} from '../../bonus-agreement.model';

@Component({
  selector: 'app-activity-bonus-agreement-common-info',
  templateUrl: './activity-bonus-agreement-common-info.component.html',
  styleUrls: ['./activity-bonus-agreement-common-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBonusAgreementCommonInfoComponent extends CommonInner implements OnInit {
  @Input()
  bonusAgreement: BonusAgreement;

  periodOptions: iOption[];
  listTrue: iOption[];

  constructor(
    public fb: FormBuilder,
    public dataService: DataService
  ) {
    super(fb);
    this.periodOptions = this.dataService.getPeriod();
    this.listTrue = this.dataService.getListTrue();
  }

  ngOnInit() {
    super.ngOnInit(this.bonusAgreement);

    this.buildForm({
      activityPeriod: [this.bonusAgreement.activityPeriod],
      totalOfPharmacies: [this.bonusAgreement.marketingPlan.pharmacyNetwork.totalOfPharmacies],
      activityPoint: [this.bonusAgreement.activityPoint, Validators.required],
      nds: [this.bonusAgreement.nds],
      secondaryDb: [this.bonusAgreement.secondaryDb, Validators.required]
    });

  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      console.log('ActivityBonusAgreementCommonInfoComponent\'s form is invalid');
      return;
    }

    const formValue: any = this.form.getRawValue();
    this.bonusAgreement.activityPeriod.from = formValue.activityPeriod.from;
    this.bonusAgreement.activityPeriod.to = formValue.activityPeriod.to;
    this.bonusAgreement.activityPoint = formValue.activityPoint;
    this.bonusAgreement.secondaryDb = formValue.secondaryDb;
  }
}
