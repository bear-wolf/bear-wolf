import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { iOption } from '@shared/models/option.model';
import { enumToList } from '@shared/functions/enumToList';
import { DmaSkuProjectEnum } from '../dma-sku-project.enum';
import { Sku } from '@shared/models/sku.model';
import { SkuService } from '@shared/services/sku.service';
import { Dma } from '../dma.model';
import { DmaSkuBlock } from '../dma-sku-block.model';
import { CurrencyService } from '@shared/components/currency/currency.service';

@Component({
  selector: 'app-activity-dma-sku',
  templateUrl: './activity-dma-sku.component.html',
  styleUrls: ['./activity-dma-sku.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDmaSkuComponent extends CommonInner implements OnInit {
  @Input() dma: Dma;
  skuProjectOptions: iOption[] = enumToList(DmaSkuProjectEnum);
  filteredSkuList: Sku[] = [];

  constructor(
    public fb: FormBuilder,
    private skuService: SkuService,
    private currencyService: CurrencyService
  ) {
    super(fb);
  }

  ngOnInit() {
    super.ngOnInit(this.dma);

    this.buildForm({
        skuBlocks: this.fb.array([])
    });

    this.dma.skuBlocks.forEach((skuBlock: DmaSkuBlock, index: number) => {
      (this.form.get('skuBlocks') as FormArray).push(
        this.fb.group({
          id: [skuBlock.id, Validators.required],
          dmaProject: [skuBlock.dmaProject, Validators.required],
          priceStart: [skuBlock.priceStartPrice, Validators.required],
          priceEnd: [skuBlock.priceEndPrice, Validators.required],
          posmPosition: [skuBlock.posmPosition, Validators.required],
          conditionsCommunication: [skuBlock.conditionsCommunication],
          pharmacistTraining: [skuBlock.pharmacistTraining, [Validators.maxLength(1000), Validators.required]],
          additionalAccommodation: [skuBlock.additionalAccommodation, Validators.required],
          additionalCreationTZ: [skuBlock.additionalCreationTZ, Validators.required],
          additionalCalculationInTheCategory: [skuBlock.additionalCalculationInTheCategory, Validators.required],
          skuInfoBlock: [skuBlock.skuInfoBlock],
          forecastTable: [skuBlock.forecastTable],
          sku: [skuBlock.sku, Validators.required]
        })
      );

      if (skuBlock.skuId) {
        this.getSkuById(skuBlock.skuId, index);
      }

      (this.form.get('skuBlocks') as FormArray).controls[index].get('priceStart').valueChanges.subscribe((v) => {
        this.dma.skuBlocks[index].priceStartPrice = Number(v);
      });

      (this.form.get('skuBlocks') as FormArray).controls[index].get('priceEnd').valueChanges.subscribe((v) => {
        this.dma.skuBlocks[index].priceEndPrice = Number(v);
      });
    });
  }

  setFillForm(item) {
    if (item) {
      item.skuBlocks.forEach((skuBlock: DmaSkuBlock, index: number) => {
        // (this.form.get('skuBlocks') as FormArray).controls[index].patchValue(skuBlock);
        (this.form.get('skuBlocks') as FormArray).controls[index].get('priceStart').patchValue(skuBlock.priceStartPrice);
        (this.form.get('skuBlocks') as FormArray).controls[index].get('priceEnd').patchValue(skuBlock.priceEndPrice);
      });
    }
  }

  getSkuById(id: number, index: number) {
    this.skuService.getById(id).subscribe((sku: Sku) => {
      (this.form.get('skuBlocks') as FormArray).controls[index].get('sku').setValue(sku);
    });
  }

  searchSku(event) {
    this.skuService.getSkuByName(event.query).subscribe((skuBlocks: Sku[]) => {
      this.filteredSkuList = skuBlocks;
    });
  }

  onPlus() {
    (this.form.get('skuBlocks') as FormArray).push(
      this.fb.group({
        id: [null],
        sku: [null, Validators.required],
        dmaProject: [0, Validators.required],
        priceStart: [0, Validators.required],
        priceEnd: [0, Validators.required],
        posmPosition: ['', Validators.required],
        conditionsCommunication: [false],
        pharmacistTraining: ['', [Validators.maxLength(1000), Validators.required]],
        additionalAccommodation: ['', Validators.required],
        additionalCreationTZ: [0, Validators.required],
        additionalCalculationInTheCategory: [0, Validators.required],
        skuInfoBlock: [],
        forecastTable: []
      })
    );
  }

  onMinus(index: number) {
    const controls: FormArray = (this.form.get('skuBlocks') as FormArray);
    if (controls.length <= 1) {
      return;
    }

    controls.removeAt(index);
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    const formValue: any = this.form.getRawValue();
    formValue.skuBlocks.forEach((skuBlock: any, index: number) => {
      const existingSkuBlock: DmaSkuBlock = this.dma.skuBlocks.find((b: DmaSkuBlock) => b.id === skuBlock.id);
      if (existingSkuBlock) {
        existingSkuBlock.dmaProject = skuBlock.dmaProject;
        existingSkuBlock.skuInfoBlock = skuBlock.skuInfoBlock;
        existingSkuBlock.skuBlockName = `SKU ${index + 1}`;
        existingSkuBlock.sku = skuBlock.sku;
        existingSkuBlock.priceDDP = skuBlock.priceDDP;
        existingSkuBlock.priceStartPrice = Number(skuBlock.priceStart);
        existingSkuBlock.priceEndPrice = Number(skuBlock.priceEnd);
        existingSkuBlock.posmPosition = skuBlock.posmPosition;
        existingSkuBlock.conditionsCommunication = skuBlock.conditionsCommunication;
        existingSkuBlock.pharmacistTraining = skuBlock.pharmacistTraining;
        existingSkuBlock.additionalAccommodation = skuBlock.additionalAccommodation;
        existingSkuBlock.additionalCreationTZ = skuBlock.additionalCreationTZ;
        existingSkuBlock.additionalCalculationInTheCategory = skuBlock.additionalCalculationInTheCategory;
      } else {
        if (skuBlock.sku && skuBlock.sku.id) {
          this.dma.skuBlocks.push(new DmaSkuBlock(this.currencyService, {
            id: Number(skuBlock.id),
            dmaId: this.dma.id,
            dmaVersion: Number(this.dma.version),
            skuId: skuBlock.sku.id,
            skuBlockName: `SKU ${index + 1}`,
            dmaProject: skuBlock.dmaProject,
            priceDDP: Number(skuBlock.sku.priceDDP),
            priceStartPrice: Number(skuBlock.priceStart),
            priceEndPrice: Number(skuBlock.priceEnd),
            posmPosition: skuBlock.posmPosition,
            conditionsCommunication: skuBlock.conditionsCommunication,
            pharmacistTraining: skuBlock.pharmacistTraining,
            additionalAccommodation: skuBlock.additionalAccommodation,
            additionalCreationTZ: skuBlock.additionalCreationTZ,
            additionalCalculationInTheCategory: skuBlock.additionalCalculationInTheCategory,
            skuInfoBlock: skuBlock.skuInfoBlock,
            forecastTable: skuBlock.forecastTable,
            sku: skuBlock.sku
          }, index));
        }
      }
    });
  }
}
