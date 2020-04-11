import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '@shared/services/data.service';
import { iOption } from '@shared/models/option.model';
import { BasicMarketing } from '../basic-marketing.model';
import { SkuService } from '@shared/services/sku.service';
import { Sku } from '@shared/models/sku.model';
import { BusinessUnit } from '@shared/models/business-unit.model';
import { BasicMarketingSku } from '../activity-basic-marketing-sku.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Component({
  selector: 'app-activity-basic-marketing-select-drug',
  templateUrl: './activity-basic-marketing-select-drug.component.html',
  styleUrls: ['./activity-basic-marketing-select-drug.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBasicMarketingSelectDrugComponent extends CommonInner implements OnInit {
  @Input()
  basicMarketing: BasicMarketing;

  @Input()
  businessUnits: BusinessUnit[];

  filteredSkuList: Sku[] = [];

  constructor(
    public fb: FormBuilder,
    public dataService: DataService,
    private skuService: SkuService,
    public currencyService: CurrencyService
  ) {
    super(fb);
  }

  ngOnInit() {
    super.ngOnInit(this.basicMarketing);

    this.buildForm({
      businessUnits: [[]],
      skus: [this.getClearSkus(), Validators.required]
    });
  }

  getClearSkus(): Sku[] {
    const result: Sku[] = [];

    this.basicMarketing.basicMarketingSku.forEach((bmSku: BasicMarketingSku) => {
      result.push(bmSku.sku);
    });

    return result;
  }

  searchSku(event): void {
    if (!this.form.get('businessUnits').value.length) {
      this.skuService.getSkuByName(event.query).subscribe((skuList: Sku[]) => {
        this.filteredSkuList = skuList;
      });
    } else {
      this.skuService.searchByBusinessUnit(event.query, this.form.get('businessUnits').value).subscribe((skuList: Sku[]) => {
        this.filteredSkuList = skuList;
      });
    }
  }

  submit(): void {
    if (!this.form.valid) {
      console.log('ActivityBasicMarketingSelectDrugComponent\'s form is invalid');
      return;
    }

    const tempSkus = [];
    this.form.get('skus').value.forEach((sku: Sku) => {
      tempSkus.push(new BasicMarketingSku( this.currencyService, {
        skuId: sku.id,
        sku: sku,
        basicMarketingId: this.basicMarketing.id
      }));
    });

    if (this.basicMarketing.basicMarketingSku.length) {

      tempSkus.forEach((sku: BasicMarketingSku) => {
        const findSku = this.basicMarketing.basicMarketingSku.find((bmSku: BasicMarketingSku) => bmSku.skuId === sku.skuId)
        if (findSku) {
          sku.id = findSku.id;
        }
      });
    }

    this.basicMarketing.basicMarketingSku = tempSkus;
  }
}
