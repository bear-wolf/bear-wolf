import { Component, Input, OnInit } from '@angular/core';
import { ScalesList } from '../../scales-list.model';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormArray, FormBuilder } from '@angular/forms';
import { DrugInformation } from '../../drug-information.model';

@Component({
  selector: 'app-volume-agreement-drug-scale',
  templateUrl: './volume-agreement-drug-scale.component.html',
  styleUrls: ['./volume-agreement-drug-scale.component.scss']
})
export class VolumeAgreementDrugScaleComponent extends CommonInner implements OnInit {
  @Input()
  drug: DrugInformation;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm({
      scales: this.fb.array([])
    });

    this.drug.scalesList.forEach((scale: ScalesList) => {
      (this.form.get('scales') as FormArray).push(
        this.fb.group({
          growthPercent: [scale.growthPercent],
          planUp: [scale.planUp],
          planRubPrice: [scale.planRubPrice],
          investmentPercent: [scale.investmentPercent],
          prizesPercent: [scale.prizesPercent],
          payRubPrice: [scale.payRubPrice]
        })
      );
    });

    (this.form.get('scales') as FormArray).valueChanges.subscribe((formValue: any[]) => {
      formValue.forEach((scale: any, index: number) => {
        this.drug.scalesList[index].growthPercent = scale.growthPercent;
        this.drug.scalesList[index].planUp = scale.planUp;
        this.drug.scalesList[index].planRubPrice = scale.planRubPrice;
        this.drug.scalesList[index].investmentPercent = scale.investmentPercent;
        this.drug.scalesList[index].prizesPercent = scale.prizesPercent;
        this.drug.scalesList[index].payRubPrice = scale.payRubPrice;
      });
    });
  }

  submit() {

  }

}
