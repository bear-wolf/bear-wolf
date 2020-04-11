import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Training} from '../training.model';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder} from '@angular/forms';
import {Sku} from '@shared/models/sku.model';

@Component({
  selector: 'app-activity-training-results',
  templateUrl: './activity-training-results.component.html',
  styleUrls: ['./activity-training-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityTrainingResultsComponent extends CommonInner implements OnInit, OnChanges {
  @Input()
  training: Training;

  sku: Sku[];

  constructor(
      public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    super.ngOnInit(this.training);

    this.prepareTotal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.training) {
      this.training = changes.training.currentValue;
    }
  }

  get directPosting() {
    const value = 0;

    return value;
  }

  get reverse() {
    const value = 0;

    return value;
  }

  prepareTotal() {
    if (this.training) {
      const totalSku: Sku = new Sku();
      this.sku = this.training.trainingSkus;
      const currencyName = this.training.currencyName;

      //this.training.name;
      // this.training.salesDuringTrainingPrice;
      // this.training.investmentsPlanPrice;
      // this.training.pharmacistsNumberPlan;
      // this.training.investmentsFactPrice;
      // this.training.pharmacistsNumberActually;
      //this.training.totalAbbottCostPerShareFact;


      // (this.training.trainingSkus || []).forEach((item) => {
      //   totalSku.investmentsPlanPrice += item.roiFact || 0;
      //   totalSku.roiPlan += item.roiPlan || 0;
      //   totalSku.salesForecast += item.salesForecast[currencyName] || 0;
      //   totalSku.totalCostAbbottActionPlan += item.totalCostAbbottActionPlan[currencyName] || 0;
      //   totalSku.salesDuringActionPlan += item.salesDuringActionPlan[currencyName] || 0;
      //   totalSku.salesDuringActionFact += item.salesDuringActionFact[currencyName] || 0;
      //   totalSku.totalCostAbbottActionFact += item.totalCostAbbottActionFact[currencyName] || 0;
      //   totalSku.reverse += item.reverse[currencyName] || 0;
      // });
      this.sku.push(totalSku);
    }
  }
}
