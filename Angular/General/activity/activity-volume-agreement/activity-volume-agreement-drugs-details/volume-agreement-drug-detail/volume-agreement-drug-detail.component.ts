import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder } from '@angular/forms';
import { DrugInformation } from '../../drug-information.model';
import { iOption } from '@shared/models/option.model';
import { DataService } from '@shared/services/data.service';
import { enumToList } from '@shared/functions/enumToList';
import { VolumeAgreementBonusConditionsEnum } from './volume-agreement-bonus-conditions.enum';
import { VolumeAgreementTypeConfirmationDbEnum } from './volume-agreement-type-confirmation-db.enum';

@Component({
  selector: 'app-volume-agreement-drug-detail',
  templateUrl: './volume-agreement-drug-detail.component.html',
  styleUrls: ['./volume-agreement-drug-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VolumeAgreementDrugDetailComponent extends CommonInner implements OnInit {
  @Input() drug: DrugInformation;

  typeConfirmationsDbOptions: iOption[] = enumToList(VolumeAgreementTypeConfirmationDbEnum);
  bonusConditionOptions: iOption[] = enumToList(VolumeAgreementBonusConditionsEnum);

  constructor(
    public fb: FormBuilder,
    public dataService: DataService
  ) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm({
      factPrevYearUp: [this.drug.factPrevYearUp],
      pricePrevYearDDPPrice: [this.drug.pricePrevYearDDPPrice],
      typeConfirmationsDb: [this.drug.typeConfirmationsDb],
      bonusCondition: [this.drug.bonusCondition],
      group: [this.drug.groupName],
      brand: [this.drug.sku.brand.name],
      skUexcludedFromDS: [this.drug.skUexcludedFromDS],
      dmAinNextPeriod: [this.drug.dmAinNextPeriod],
      singlePercentInGroup: [this.drug.singlePercentInGroup],
      singlePercentInBrand: [this.drug.singlePercentInBrand]
    });

    this.form.valueChanges.subscribe((formValue: any) => {
      this.drug.factPrevYearUp = Number(formValue.factPrevYearUp);
      this.drug.pricePrevYearDDPPrice = Number(formValue.pricePrevYearDDPPrice);
      this.drug.typeConfirmationsDb = formValue.typeConfirmationsDb;
      this.drug.bonusCondition = formValue.bonusCondition;
      this.drug.skUexcludedFromDS = formValue.skUexcludedFromDS;
      this.drug.dmAinNextPeriod = formValue.dmAinNextPeriod;
      this.drug.singlePercentInGroup = formValue.singlePercentInGroup;
      this.drug.singlePercentInBrand = formValue.singlePercentInBrand;
    });
  }
}
