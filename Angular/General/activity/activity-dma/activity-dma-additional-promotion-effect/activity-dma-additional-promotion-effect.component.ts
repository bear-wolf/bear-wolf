import { AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Dma } from '../dma.model';
import { DmaSkuBlock } from '../dma-sku-block.model';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-activity-dma-additional-promotion-effect',
  templateUrl: './activity-dma-additional-promotion-effect.component.html',
  styleUrls: ['./activity-dma-additional-promotion-effect.component.scss']
})
export class ActivityDmaAdditionalPromotionEffectComponent implements OnInit, AfterViewInit {
  @Input() dma: Dma;
  @ViewChildren('innerFormComponent') children: CommonInner[] = [];
  selectedSkuBlock: DmaSkuBlock;
  form: FormArray;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.array([]);
  }

  ngAfterViewInit() {
    this.children.forEach((child: CommonInner) => {
      this.form.controls.push(child.form);
    });
  }

  selectSkuBlock(skuBlock: DmaSkuBlock): void {
    this.selectedSkuBlock = skuBlock;
  }

  submit() {
    this.children.forEach((child: CommonInner) => {
      child.submit();
    });
  }
}
