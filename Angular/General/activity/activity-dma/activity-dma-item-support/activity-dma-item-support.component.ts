import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonInner } from '@shared/components/common-inner.component';
import { Dma } from '../dma.model';

@Component({
  selector: 'app-activity-dma-item-support',
  templateUrl: './activity-dma-item-support.component.html',
  styleUrls: ['./activity-dma-item-support.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDmaItemSupportComponent extends CommonInner implements OnInit {
  @Input()
  dma: Dma;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm({
      identicalForAllBrandsoperty: [this.dma.identicalForAllBrandsoperty],
      sameForAllSkusWithinBrand: [this.dma.sameForAllSkusWithinBrand]
    });
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('ActivityDmaItemSupportComponent\'s form is invalid');
      return;
    }

    const formValue: any = this.form.getRawValue();
    this.dma.identicalForAllBrandsoperty = !!formValue.identicalForAllBrandsoperty;
    this.dma.sameForAllSkusWithinBrand = !!formValue.sameForAllSkusWithinBrand;
  }
}
