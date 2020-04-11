import { Component, Input, OnInit } from '@angular/core';
import { BasicMarketing } from '../basic-marketing.model';
import { iColumns } from '@shared/modules/common-list-form/models';
import { BasicMarketingSku } from '../activity-basic-marketing-sku.model';
import { BusinessUnit } from '@shared/models/business-unit.model';

@Component({
  selector: 'app-activity-basic-marketing-sku-details',
  templateUrl: './activity-basic-marketing-sku-details.component.html',
  styleUrls: ['./activity-basic-marketing-sku-details.component.scss']
})
export class ActivityBasicMarketingSkuDetailsComponent implements OnInit {
  @Input()
  basicMarketing: BasicMarketing;

  @Input()
  businessUnits: BusinessUnit[];

  groupedSkus: any = {'Без группы': []};

  columns: iColumns[] = [
    {field: 'name', header: 'МКТ Бренд'},
    {field: 'ntz', header: 'НТЗ, р.'},
    {field: 'calculation', header: 'Выкладка, р.'},
    {field: 'reports', header: 'Отчеты, р.'},
    {field: 'total', header: 'Итого'}
  ];

  constructor() {
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
}
