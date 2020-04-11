import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder, Validators } from '@angular/forms';
import { iOption } from '@shared/models/option.model';
import { Dma } from '../dma.model';
import { enumToList } from '@shared/functions/enumToList';
import { DmaShowDataEnum } from './dma-show-data.enum';
import { SkuBrand } from '@shared/models/sku-brand.model';
import { DmaSkuBlock } from '../dma-sku-block.model';

@Component({
  selector: 'app-activity-dma-stock-economics',
  templateUrl: './activity-dma-stock-economics.component.html',
  styleUrls: ['./activity-dma-stock-economics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDmaStockEconomicsComponent extends CommonInner implements OnInit {
  @Input()
  dma: Dma;

  showDataOptions: iOption[] = enumToList(DmaShowDataEnum);
  brandsOptions: iOption[];
  skusOptions: iOption[];

  constructor(
    public fb: FormBuilder,
  ) {
    super(fb);
  }

  ngOnInit() {
    this.brandsOptions = (this.dma.skuBlocks || []).map((b: DmaSkuBlock) => {
      return {value: b.sku.brand, label: b.sku.brand.name};
    });

    const uniqueBrands: iOption[] = [];
    this.brandsOptions.forEach((o: iOption) => {
      if (!uniqueBrands.find((u) => u.value.id === o.value.id)) {
        uniqueBrands.push(o);
      }
    });
    this.brandsOptions = uniqueBrands;

    this.skusOptions = (this.dma.skuBlocks || []).map((b: DmaSkuBlock) => {
      return {value: b.sku, label: b.sku.name};
    });

    this.buildForm({
      showData: [0],
      brand: [{disabled: true}],
      sku: [{disabled: true}],
      productManagerFullName: [this.dma.productManagerFullName, Validators.required],
      deductionFromDC: [this.dma.deductionFromDC],
      networkExposesPharmacyPlan: [this.dma.networkExposesPharmacyPlan]
    });

    this.form.get('brand').disable();
    this.form.get('sku').disable();

    this.form.get('showData').valueChanges.subscribe((value: number) => {
      switch (value) {
        case DmaShowDataEnum.BY_ALL:
          this.form.get('brand').disable();
          this.form.get('sku').disable();
          break;
        case DmaShowDataEnum.BY_BRAND:
          this.form.get('brand').enable();
          this.form.get('sku').disable();
          break;
        case DmaShowDataEnum.BY_SKU:
          this.form.get('brand').disable();
          this.form.get('sku').enable();
          break;
      }
    });
  }

  submit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('ActivityDmaSkuComponent\'s form is invalid');
      return;
    }

    const formValue: any = this.form.getRawValue();
    this.dma.productManagerFullName = formValue.productManagerFullName;
    this.dma.deductionFromDC = formValue.deductionFromDC;
    this.dma.networkExposesPharmacyPlan = formValue.networkExposesPharmacyPlan;
  }
}
