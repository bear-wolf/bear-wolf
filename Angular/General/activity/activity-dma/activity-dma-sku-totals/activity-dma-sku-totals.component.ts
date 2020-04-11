import { Component, Input, OnInit } from '@angular/core';
import { DmaSkuBlock } from '../dma-sku-block.model';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder } from '@angular/forms';
import { Dma } from '../dma.model';

@Component({
  selector: 'app-activity-dma-sku-totals',
  templateUrl: './activity-dma-sku-totals.component.html',
  styleUrls: ['./activity-dma-sku-totals.component.scss']
})
export class ActivityDmaSkuTotalsComponent extends CommonInner implements OnInit {
  @Input() dma: Dma;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
  }

  getTotalByField(key: string): number {
    let total: number = 0;

    this.dma.skuBlocks.forEach((skuBlock: DmaSkuBlock) => {
      if (skuBlock.skuInfoBlock && skuBlock.skuInfoBlock[key]) {
        total = total + parseInt(skuBlock.skuInfoBlock[key], 10);
      }
    });

    this.dma.dmaTotals[key] = total;

    return total;
  }

  getTotal(type: 'pc' | 'pr'): number {
    let total: number = 0;

    this.dma.skuBlocks.forEach((skuBlock: DmaSkuBlock) => {
      Object.keys(skuBlock.skuInfoBlock || []).forEach((key: string) => {
        if (key.includes(type) && skuBlock.skuInfoBlock[key]) {
          total = total + parseInt(skuBlock.skuInfoBlock[key], 10);
        }
      });
    });

    return total;
  }

  getTotalRoi(): number {
    let total: number = 0;

    this.dma.skuBlocks.forEach((skuBlock: DmaSkuBlock) => {
      if (skuBlock.forecastTable.roi) {
        total = total + skuBlock.forecastTable.roi;
      }
    });

    return total;
  }

  submit() {

  }
}
