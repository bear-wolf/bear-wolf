import { Component, Input, OnInit } from '@angular/core';
import { BonusAgreement } from '../bonus-agreement.model';
import { BusinessUnit } from '@shared/models/business-unit.model';
import { iColumns } from '@shared/modules/common-list-form/models';
import { FormBuilder } from '@angular/forms';
import { BasicMarketingSku } from '../../activity-basic-marketing/activity-basic-marketing-sku.model';
import { CommonInner } from '@shared/components/common-inner.component';
import { SkuService } from '@shared/services/sku.service';
import { DrugInformationGroup } from '../../activity-shared/drug-information-group.model';
import { DrugInformation } from '../../activity-volume-agreement/drug-information.model';

@Component({
  selector: 'app-activity-bonus-agreement-fines',
  templateUrl: './activity-bonus-agreement-fines.component.html',
  styleUrls: ['./activity-bonus-agreement-fines.component.scss']
})
export class ActivityBonusAgreementFinesComponent extends CommonInner implements OnInit {
  @Input()
  bonusAgreement: BonusAgreement;

  businessUnits: BusinessUnit[];

  groupedSkus: any = {'Без группы': []};

  columns: iColumns[] = [
    {field: 'name', header: 'МКТ Бренд'},
    {field: 'deviationFactFromPlanNTZ', header: 'НТЗ'},
    {field: 'deviationFactFromPlanCalculation', header: 'Выкладка'},
    {field: 'hasReports', header: 'Отчеты'},
    {field: 'finesTotal', header: 'Итого штрафы'},
    {field: 'skuTotal', header: 'Итого по SKU, p.'}
  ];

  constructor(
    public fb: FormBuilder,
    private skuService: SkuService
  ) {
    super(fb);
  }

  ngOnInit() {
    super.ngOnInit(this.bonusAgreement);

    this.skuService.getBusinessUnits().subscribe((businessUnits: BusinessUnit[]) => {
      this.businessUnits = businessUnits;
      this.groupSkusByBusinessUnit();
    });
  }

  groupSkusByBusinessUnit(): void {
    this.businessUnits.forEach((bu: BusinessUnit) => {
      this.groupedSkus[bu.name] = [];
    });


    (this.bonusAgreement.drugInformationGroup || []).forEach((drugInfoGroup: DrugInformationGroup) => {
      drugInfoGroup.drugInformation.forEach((drugInfo: DrugInformation) => {
        const bu: string = drugInfo.sku.brand.businessUnit.name;
        if (drugInfo.sku.brand.businessUnit.name === 'Все группы') {
          this.groupedSkus['Без группы'].push(drugInfo);
        } else {
          this.groupedSkus[bu].push(drugInfo);
        }
      });
    });

    Object.keys(this.groupedSkus).forEach((key: string) => {
      if (!this.groupedSkus[key].length) {
        delete this.groupedSkus[key];
      } else {
        this.groupSkusByBrand(this.groupedSkus[key], key);
      }
    });

  }

  groupSkusByBrand(skus: DrugInformation[], buName: string) {
    const brands = {};

    skus.forEach((drugInfo: DrugInformation) => {
      if (!brands[drugInfo.sku.brand.name]) {
        brands[drugInfo.sku.brand.name] = [];
      }

      brands[drugInfo.sku.brand.name].push(drugInfo);
    });

    this.groupedSkus[buName] = brands;

  }

  getTotal(field: string): number {
    let total: number = 0;

    this.bonusAgreement.drugInformationGroup.forEach((drugInfoGroup: DrugInformationGroup) => {
      drugInfoGroup.drugInformation.forEach((drugInfo: DrugInformation) => {
        total = total + drugInfo[field];
      });
    });

    return total;
  }

  // getTotalForBrand(skus: BasicMarketingSku[], field: string): number {
  //   let result: number = 0;
  //
  //   skus.forEach((sku: BasicMarketingSku) => {
  //     result = result + sku[field];
  //   });
  //
  //   return result;
  // }

  // toggleAll(value, drugInfoGroup: DrugInformationGroup): void {
  //   drugInfoGroup.drugInformation.forEach((drugInfo: DrugInformation) => {
  //     drugInfo['hasReports'] = value;
  //   });
  // }

  // isAllSelected(skus: BasicMarketingSku[]): boolean {
  //   let result: boolean = true;
  //
  //   skus.forEach((sku: BasicMarketingSku) => {
  //     if (!sku.hasReports) {
  //       result = false;
  //     }
  //   });
  //
  //   return result;
  // }

  submit() {

  }

}
