import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VolumeAgreement } from '../volume-agreement.model';
import { CommonInner } from '@shared/components/common-inner.component';
import { DataService } from '@shared/services/data.service';
import { iOption } from '@shared/models/option.model';
import { enumToList } from '@shared/functions/enumToList';
import { ActivityBasicMarketingDataFromEnum } from '../../activity-basic-marketing/activity-basic-marketing-data-from.enum';

@Component({
  selector: 'app-volume-agreement-common-info',
  templateUrl: './activity-volume-agreement-common-info.component.html',
  styleUrls: ['./activity-volume-agreement-common-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityVolumeAgreementCommonInfoComponent extends CommonInner implements OnInit {
  @Input()
  volumeAgreement: VolumeAgreement;
  projectOptions: iOption[] = enumToList(ActivityBasicMarketingDataFromEnum);
  listTrue: iOption[];

  constructor(
    public fb: FormBuilder,
    public dataService: DataService
  ) {
    super(fb);

    this.listTrue = this.dataService.getListTrue();
  }

  ngOnInit() {
    super.ngOnInit(this.volumeAgreement);

    this.buildForm({
      activityPeriod: [this.volumeAgreement.activityPeriod],
      countPoints: [{value: this.volumeAgreement.pharmacyNetwork.totalOfPharmacies, disabled: true}],
      pointsInActivity: [this.volumeAgreement.pointsInActivity, Validators.required],
      ndsPercent: [{value: this.volumeAgreement.ndsPercent, disabled: true}],
      hasConsiderSecondaryDB: [this.volumeAgreement.hasConsiderSecondaryDB, Validators.required],
      project: [this.volumeAgreement.project, Validators.required],
    });
  }

  submit() {
    const data: any = this.form.getRawValue();

    this.volumeAgreement.activityPeriod = data.activityPeriod;
    this.volumeAgreement.pointsInActivity = Number(data.pointsInActivity || 0);
    this.volumeAgreement.hasConsiderSecondaryDB = data.hasConsiderSecondaryDB;
    this.volumeAgreement.project = data.project;
  }

}
