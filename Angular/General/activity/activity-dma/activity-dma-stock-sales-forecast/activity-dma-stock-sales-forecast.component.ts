import { Component, Input, OnInit } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormArray, FormBuilder } from '@angular/forms';
import { Dma } from '../dma.model';
import { DmaSkuBlock } from '../dma-sku-block.model';

@Component({
  selector: 'app-activity-dma-stock-sales-forecast',
  templateUrl: './activity-dma-stock-sales-forecast.component.html',
  styleUrls: ['./activity-dma-stock-sales-forecast.component.scss']
})
export class ActivityDmaStockSalesForecastComponent extends CommonInner implements OnInit {
  @Input()
  dma: Dma;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm({
      skuList: this.fb.array([])
    });

    this.dma.skuBlocks.forEach((skuBlock: DmaSkuBlock, index: number) => {
      (this.form.get('skuList') as FormArray).push(
        this.fb.group({
          isSimilarActionByCompetitors: [skuBlock.isSimilarActionByCompetitors],
          whatDrug: [skuBlock.whatDrug]
        })
      );
    });
  }

  submit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('ActivityDmaStockSalesForecastComponent\'s form is invalid');
      return;
    }

    const formValue: any = this.form.getRawValue();

    formValue.skuList.forEach((skuBlock: any, index: number) => {
      this.dma.skuBlocks[index].isSimilarActionByCompetitors = skuBlock.isSimilarActionByCompetitors;
      this.dma.skuBlocks[index].whatDrug = skuBlock.whatDrug;
    });
  }
}
