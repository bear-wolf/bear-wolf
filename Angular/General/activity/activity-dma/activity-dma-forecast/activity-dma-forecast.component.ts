import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicFormTemplate } from '@shared/components/dynamic-form/dynamic-form.model';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Dma } from '../dma.model';

@Component({
  selector: 'app-activity-dma-forecast',
  templateUrl: './activity-dma-forecast.component.html',
  styleUrls: ['./activity-dma-forecast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDmaForecastComponent extends CommonInner implements OnInit {
  @Input()
  dma: Dma;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.dynamicForm.form = this.buildForm({
      salesGrowth: [this.dma.dmaTotals.salesGrowth, Validators.required],
      discountForBuyer: [this.dma.dmaTotals.discountForBuyer, [Validators.max(100), Validators.required]],
      discountForBuyerCompensated: [this.dma.dmaTotals.discountForBuyerCompensated, [Validators.max(100), Validators.required]],
      participationCostRub: [this.dma.dmaTotals.participationCostRubPrice, Validators.required],
      totalAbbottCosts: [this.dma.dmaTotals.totalAbbottCostsPrice, Validators.required],
      investments: [this.dma.dmaTotals.investments, Validators.required],
      salesGrowthDuringPromotionPackages: [this.dma.dmaTotals.salesGrowthDuringPromotionPackagesPrice, Validators.required],
      salesGrowthDuringPromotionRub: [{value: this.dma.dmaTotals.salesGrowthDuringPromotionRubPrice, disabled: true}, Validators.required],
      salesDuringPromotionPackages: [this.dma.dmaTotals.salesDuringPromotionPackages, Validators.required],
      salesDuringPromotionRub: [{value: this.dma.dmaTotals.salesDuringPromotionRubPrice, disabled: true}, Validators.required],
      roi: [{value: this.dma.dmaTotals.roi, disabled: true}, Validators.required]
    });
    this.dynamicForm.list = [
      new DynamicFormTemplate({
        title: 'salesGrowth',
        label: 'Рост продаж в период проведения акции, %'
      }),
      new DynamicFormTemplate({
        title: 'discountForBuyer',
        label: 'Скидка для покупателя, %'
      }),
      new DynamicFormTemplate({
        title: 'discountForBuyerCompensated',
        label: 'Скидка для покупателя, компенсируемая Abbott, %'
      }),
      new DynamicFormTemplate({
        title: 'participationCostRub',
        label: 'Стоимость участия в акции, руб (с НДС)'
      }),
      new DynamicFormTemplate({
        title: 'totalAbbottCosts',
        label: 'Всего затраты Abbott на акцию, руб (с НДС)'
      }),
      new DynamicFormTemplate({
        title: 'investments',
        label: 'Инвестиции, %'
      }),
      new DynamicFormTemplate({
        title: 'salesGrowthDuringPromotionPackages',
        label: 'Прирост продаж в период акции, упаковок'
      }),
      new DynamicFormTemplate({
        title: 'salesGrowthDuringPromotionRub',
        label: 'Прирост продаж в период акции, руб (ASP)'
      }),
      new DynamicFormTemplate({
        title: 'salesDuringPromotionPackages',
        label: 'Продажи в период акции, упаковок'
      }),
      new DynamicFormTemplate({
        title: 'salesDuringPromotionRub',
        label: 'Продажи в период акции, руб (ASP)'
      }),
      new DynamicFormTemplate({
        title: 'roi',
        label: 'ROI'
      })
    ];
  }

  submit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('ActivityDmaForecastComponent\'s form is invalid');
      return;
    }

    const formValue: any = this.form.getRawValue();
    this.dma.dmaTotals.salesGrowth = Number(formValue.salesGrowth);
    this.dma.dmaTotals.discountForBuyer = Number(formValue.discountForBuyer);
    this.dma.dmaTotals.discountForBuyerCompensated = Number(formValue.discountForBuyerCompensated);
    this.dma.dmaTotals.participationCostRubPrice = Number(formValue.participationCostRub);
    this.dma.dmaTotals.totalAbbottCostsPrice = Number(formValue.totalAbbottCosts);
    this.dma.dmaTotals.investments = Number(formValue.investments);
    this.dma.dmaTotals.salesGrowthDuringPromotionPackagesPrice = Number(formValue.salesGrowthDuringPromotionPackages);
    this.dma.dmaTotals.salesDuringPromotionPackages = Number(formValue.salesDuringPromotionPackages);
  }
}
