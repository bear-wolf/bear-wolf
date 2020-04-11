import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BasicMarketingSku} from '../activity-basic-marketing-sku.model';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder, Validators} from '@angular/forms';
import {iOption} from '@shared/models/option.model';
import {enumToList} from '@shared/functions/enumToList';
import {CalculationPlaceEnum} from './calculation-place.enum';

@Component({
  selector: 'app-activity-basic-marketing-sku-market-info',
  templateUrl: './activity-basic-marketing-sku-market-info.component.html',
  styleUrls: ['./activity-basic-marketing-sku-market-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBasicMarketingSkuMarketInfoComponent extends CommonInner implements OnInit {
  @Input() bmSku: BasicMarketingSku;
  calculationPlaceOptions: iOption[] = enumToList(CalculationPlaceEnum);

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    // super.ngOnInit(this.bmSku);

    this.buildForm({
      ntzAmount: [this.bmSku.ntzAmount, Validators.required],
      calculationAmount: [this.bmSku.calculationAmount, Validators.required],
      reportsAmount: [this.bmSku.reportsAmount, Validators.required],
      ntzEqualsOne: [this.bmSku.ntzEqualsOne, Validators.required],
      ntzMoreOnePacks: [this.bmSku.ntzMoreOnePacks, Validators.required],
      ntzMoreOneDots: [this.bmSku.ntzMoreOneDots, Validators.required],
      ntzMoreOneTotal: [this.bmSku.ntzMoreOneTotal, Validators.required],
      facetingNumber: [this.bmSku.facetingNumber, Validators.required],
      calculationNumber: [this.bmSku.calculationNumber, Validators.required],
      calculationPlace: [this.bmSku.calculationPlace, Validators.required]
    });

    this.form.valueChanges.subscribe((formValue: any) => {
      Object.keys(formValue).forEach((key: string) => {
        this.bmSku[key] = formValue[key];
      });
    });
  }

  submit() {

  }
}
