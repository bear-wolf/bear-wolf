import { Component, Input, OnInit } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder } from '@angular/forms';
import { BasicMarketing } from '../../activity-basic-marketing/basic-marketing.model';
import { BusinessUnit } from '@shared/models/business-unit.model';
import { BasicMarketingSku } from '../../activity-basic-marketing/activity-basic-marketing-sku.model';
import { iColumns } from '@shared/modules/common-list-form/models';
import { BonusAgreement } from '../../activity-bonus-agreement/bonus-agreement.model';

@Component({
  selector: 'app-activity-fines',
  templateUrl: './activity-fines.component.html',
  styleUrls: ['./activity-fines.component.scss']
})
export class ActivityFinesComponent extends CommonInner implements OnInit {
  @Input()
  basicMarketing: BasicMarketing;

  @Input()
  businessUnits: BusinessUnit[];

  groupedSkus: any = {'Без группы': []};

  columns: iColumns[] = [
    { field: 'name', header: 'МКТ Бренд' },
    { field: 'deviationFactFromPlanNTZ', header: 'НТЗ' },
    { field: 'deviationFactFromPlanCalculation', header: 'Выкладка' },
    { field: 'hasReports', header: 'Отчеты' },
    { field: 'finesTotal', header: 'Итого штрафы' },
    { field: 'skuTotal', header: 'Итого по SKU, p.' }
  ];

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    this.groupSkusByBusinessUnit();
  }

  groupSkusByBusinessUnit(): void {
    this.businessUnits.forEach((bu: BusinessUnit) => {
      this.groupedSkus[bu.name] = [];
    });

    this.basicMarketing.basicMarketingSku.forEach((bmSku: BasicMarketingSku) => {
      const bu: string = bmSku.sku.brand.businessUnit.name;
      if (bmSku.sku.brand.businessUnit.name === 'Все группы') {
        this.groupedSkus['Без группы'].push(bmSku);
      } else {
        this.groupedSkus[bu].push(bmSku);
      }
    });

    Object.keys(this.groupedSkus).forEach((key: string) => {
      if (!this.groupedSkus[key].length) {
        delete this.groupedSkus[key];
      } else {
        this.groupSkusByBrand(this.groupedSkus[key], key);
      }
    });

  }

  groupSkusByBrand(skus: BasicMarketingSku[], buName: string) {
    const brands = {};

    skus.forEach((bmSku: BasicMarketingSku) => {
      if (!brands[bmSku.sku.brand.name]) {
        brands[bmSku.sku.brand.name] = [];
      }

      brands[bmSku.sku.brand.name].push(bmSku);
    });

    this.groupedSkus[buName] = brands;

  }

  getTotal(field: string): number {
    let total: number = 0;
    const list = this.basicMarketing.basicMarketingSku || [];

    list.forEach((sku: BasicMarketingSku) => {
      total = total + sku[field];
    });
    return total;
  }

  getTotalForBrand(skus: BasicMarketingSku[], field: string): number {
    let result: number = 0;

    skus.forEach((sku: BasicMarketingSku) => {
      result = result + sku[field];
    });

    return result;
  }

  toggleAll(value, skus: BasicMarketingSku[]): void {
    skus.forEach((sku: BasicMarketingSku) => {
      sku.hasReports = value;
    });
  }

  isAllSelected(skus: BasicMarketingSku[]): boolean {
    let result: boolean = true;

    skus.forEach((sku: BasicMarketingSku) => {
      if (!sku.hasReports) {
        result = false;
      }
    });

    return result;
  }

  submit() {

  }
}
