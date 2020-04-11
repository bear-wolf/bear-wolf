import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { Sku } from '@shared/models/sku.model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { SkuService } from '@shared/services/sku.service';
import { DrugInformationGroup } from '../../activity-shared/drug-information-group.model';
import { DrugInformation } from '../../activity-volume-agreement/drug-information.model';
import { BonusAgreement } from '../bonus-agreement.model';
import { CurrencyService } from '@shared/components/currency/currency.service';
import { BonusAgreementGroup } from '../bonus-agreement-group';
import { DmaSkuBlock } from '../../activity-dma/dma-sku-block.model';

@Component({
  selector: 'app-activity-bonus-agreement-drugs-group',
  templateUrl: './activity-bonus-agreement-drugs-group.component.html',
  styleUrls: ['./activity-bonus-agreement-drugs-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBonusAgreementDrugsGroupComponent extends CommonInner implements OnInit {
  @Input()
  bonusAgreement: BonusAgreement;
  filteredSkuList: Sku[] = [];

  constructor(
    public fb: FormBuilder,
    public skuService: SkuService,
    public currencyService: CurrencyService
  ) {
    super(fb);
  }

  ngOnInit() {
    super.ngOnInit(this.bonusAgreement);

    this.buildForm({
      skuList: this.fb.array([])
    });
    this.bonusAgreement.drugInformationGroup.forEach((group: BonusAgreementGroup, index: number) => {
      (this.form.get('skuList') as FormArray).push(
        this.fb.group({
          name: [group.name || `Группа ${index + 1}`, Validators.required],
          drugInformation: [this.getDrugInfoGroupSkus(group.drugInformation)],
          personalAccountingSku: [group.personalAccountingSku]
        })
      );
    });

    if (!this.bonusAgreement.drugInformationGroup.length) {
      this.onPlus();
    }
  }

  getDrugInfoGroupSkus(drugInformations: DrugInformation[]): Sku[] {
    const skus: Sku[] = [];

    drugInformations.forEach((drugInfo: DrugInformation) => {
      this.skuService.getById(drugInfo.skuId).subscribe((sku: Sku) => {
        skus.push(sku);
      });
    });

    return skus;
  }


  onPlus() {
    (this.form.get('skuList') as FormArray).push(
      this.fb.group({
        name: [`Группа ${(this.form.get('skuList') as FormArray).controls.length + 1}`],
        drugInformation: [[]],
        personalAccountingSku: [false]
      })
    );
  }

  onMinus(index: number) {
    const controls: FormArray = (this.form.get('skuList') as FormArray);
    if (controls.length <= 1) {
      return;
    }

    controls.removeAt(index);
  }

  searchSku(event) {
    this.skuService.getSkuByName(event.query).subscribe((skuList: Sku[]) => {
      this.filteredSkuList = skuList;
    });
  }


  submit() {
    this.form.markAllAsTouched();
    const formValue: any = this.form.getRawValue();

    const groups: any[] = [];
    formValue.skuList.forEach((drugInformationGroup: any) => {
      const existingDrugInfoGroup: BonusAgreementGroup = this.bonusAgreement.drugInformationGroup.find((g: BonusAgreementGroup) => g.name === drugInformationGroup.name);

      if (existingDrugInfoGroup) {
        drugInformationGroup.drugInformation.forEach((drugInfo: any) => {
          const existingDrugInfo: DrugInformation = existingDrugInfoGroup.drugInformation.find((i: DrugInformation) => i.sku.id === drugInfo.id);


          if (!existingDrugInfo) {
            existingDrugInfoGroup.drugInformation.push(new DrugInformation(this.currencyService, {
              skuId: drugInfo.id,
              sku: drugInfo,
              groupName: existingDrugInfoGroup.name
            }));
          }
        });

        existingDrugInfoGroup.drugInformation.map((i: DrugInformation) => i.groupName = existingDrugInfoGroup.name);
        groups.push(existingDrugInfoGroup);
      } else {
        const drugInfoGroup: BonusAgreementGroup = new BonusAgreementGroup(this.currencyService, {
          name: drugInformationGroup.name,
          drugInformation: [],
          personalAccountingSku: drugInformationGroup.personalAccountingSku,
          bonusAgreementId: this.bonusAgreement.id,
          bonusAgreementVersion: this.bonusAgreement.version
        });

        drugInformationGroup.drugInformation.forEach((drugInfo: any) => {
          drugInfoGroup.drugInformation.push(new DrugInformation(this.currencyService, {
            skuId: drugInfo.id,
            sku: drugInfo,
            groupName: drugInformationGroup.name
          }));
        });

        if (drugInfoGroup.drugInformation.length) {
          groups.push(drugInfoGroup);
        }
      }
    });

    this.bonusAgreement.drugInformationGroup = groups;
  }

}
