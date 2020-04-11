import { Component, Input, OnInit } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder } from '@angular/forms';
import { Dma } from '../dma.model';
import { DmaSkuBlock } from '../dma-sku-block.model';

@Component({
  selector: 'app-activity-dma-results',
  templateUrl: './activity-dma-results.component.html',
  styleUrls: ['./activity-dma-results.component.scss']
})
export class ActivityDmaResultsComponent extends CommonInner implements OnInit {
  @Input() dma: Dma;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm({

    });
  }

  getForecastTotals(field: string): number {
    let total: number = 0;

    this.dma.skuBlocks.forEach((skuBlock: DmaSkuBlock) => {
      if (skuBlock.forecastTable[field]) {
        total = total + parseInt(skuBlock.forecastTable[field], 10);
      }
    });

    return total;
  }

  submit() {

  }
}
