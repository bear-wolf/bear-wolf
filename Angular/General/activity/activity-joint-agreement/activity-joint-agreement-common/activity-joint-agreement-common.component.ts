import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder} from '@angular/forms';
import {iOption} from '@shared/models/option.model';
import {DataService} from '@shared/services/data.service';
import {JointAgreement} from '../joint-agreement.model';

@Component({
  selector: 'app-activity-joint-agreement-common',
  templateUrl: './activity-joint-agreement-common.component.html',
  styleUrls: ['./activity-joint-agreement-common.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityJointAgreementCommonComponent extends CommonInner implements OnInit {
  @Input()
  jointAgreement: JointAgreement;
  
  periodOptions: iOption[];

  constructor(
      public fb: FormBuilder,
      public dataService: DataService
  ) {
    super(fb);
    this.periodOptions = this.dataService.getPeriod();
  }

  ngOnInit() {
    super.ngOnInit(this.jointAgreement);

    this.buildForm({
      activityPeriod: [this.jointAgreement.activityPeriod]
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.validation()) {
      return;
    }
    const data = this.form.getRawValue();

    this.jointAgreement.activityPeriod = data.activityPeriod;
  }
}
