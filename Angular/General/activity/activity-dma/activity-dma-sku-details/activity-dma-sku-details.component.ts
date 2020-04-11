import { Component, Input, OnInit } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DmaSkuBlock } from '../dma-sku-block.model';

@Component({
  selector: 'app-activity-dma-sku-details',
  templateUrl: './activity-dma-sku-details.component.html',
  styleUrls: ['./activity-dma-sku-details.component.scss']
})
export class ActivityDmaSkuDetailsComponent extends CommonInner implements OnInit {
  @Input() sku: DmaSkuBlock;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    if (!this.sku.skuInfoBlock) {
      return;
    }

    this.formBuild();
  }

  formBuild(): void {
    this.buildForm({
      id: [this.sku.skuInfoBlock.id],
      skuBlocksId: [this.sku.skuInfoBlock.skuBlocksId],
      prPharmacistTrainingPrice: [this.sku.skuInfoBlock.prPharmacistTrainingPrice, Validators.required],
      prExternalSurfacesPrice: [this.sku.skuInfoBlock.prExternalSurfacesPrice, Validators.required],
      prIndoorSurfacesPrice: [this.sku.skuInfoBlock.prIndoorSurfacesPrice, Validators.required],
      prRadioPrice: [this.sku.skuInfoBlock.prRadioPrice, Validators.required],
      prTvPrice: [this.sku.skuInfoBlock.prTvPrice, Validators.required],
      prOtherPrice: [this.sku.skuInfoBlock.prOtherPrice, Validators.required],
      pcPharmacistTrainingPrice: [this.sku.skuInfoBlock.pcPharmacistTrainingPrice, Validators.required],
      pcExternalSurfacesPrice: [this.sku.skuInfoBlock.pcExternalSurfacesPrice, Validators.required],
      pcIndoorSurfacesPrice: [this.sku.skuInfoBlock.pcIndoorSurfacesPrice, Validators.required],
      pcRadioPrice: [this.sku.skuInfoBlock.pcRadioPrice, Validators.required],
      pcTvPrice: [this.sku.skuInfoBlock.pcTvPrice, Validators.required],
      pcOtherPrice: [this.sku.skuInfoBlock.pcOtherPrice, Validators.required]
    });

    this.form.valueChanges.subscribe((formValue) => {
      Object.assign(this.sku.skuInfoBlock, formValue);
    });
  }

  deepFormUpdate(item) {
    if (item) {
      this.form.patchValue(item.skuBlocks.find((b: DmaSkuBlock) => b.id === this.form.get('id').value).skuInfoBlock);
    }
  }

  getTotal(type: 'pc' | 'pr'): number {
    let total: number = 0;

    Object.keys(this.form.controls).forEach((key: string) => {
      if (key.includes(type) && this.form.get(key).value) {
        total = total + parseInt(this.form.get(key).value, 10);
      }
    });

    return total;
  }

  submit() {
    //TODO: need fix it
    if (!this.form) {
      return;
    }

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('ActivityDmaSkuDetailsComponent\'s form is invalid');
      return;
    }

    const data: any = this.form.getRawValue();

    this.sku.skuInfoBlock.prPharmacistTrainingPrice = Number(data.prPharmacistTrainingPrice || 0);
    this.sku.skuInfoBlock.prExternalSurfacesPrice = Number(data.prExternalSurfacesPrice || 0);
    this.sku.skuInfoBlock.prIndoorSurfacesPrice = Number(data.prIndoorSurfacesPrice || 0);
    this.sku.skuInfoBlock.prRadioPrice = Number(data.prRadioPrice || 0);
    this.sku.skuInfoBlock.prTvPrice = Number(data.prTvPrice || 0);
    this.sku.skuInfoBlock.prOtherPrice = Number(data.prOtherPrice || 0);
    this.sku.skuInfoBlock.pcPharmacistTrainingPrice = Number(data.pcPharmacistTrainingPrice || 0);
    this.sku.skuInfoBlock.pcExternalSurfacesPrice = Number(data.pcExternalSurfacesPrice || 0);
    this.sku.skuInfoBlock.pcIndoorSurfacesPrice = Number(data.pcIndoorSurfacesPrice || 0);
    this.sku.skuInfoBlock.pcRadioPrice = Number(data.pcRadioPrice || 0);
    this.sku.skuInfoBlock.pcTvPrice = Number(data.pcTvPrice || 0);
    this.sku.skuInfoBlock.pcOtherPrice = Number(data.pcOtherPrice || 0);
  }
}
