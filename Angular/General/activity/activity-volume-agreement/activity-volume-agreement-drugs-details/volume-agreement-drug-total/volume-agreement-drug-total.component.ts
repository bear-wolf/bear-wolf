import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { iOption } from '@shared/models/option.model';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder } from '@angular/forms';
import { DataService } from '@shared/services/data.service';
import { enumToList } from '@shared/functions/enumToList';
import { VolumeAgreementScaleEnum } from './volume-agreement-scale.enum';
import { DrugInformation } from '../../drug-information.model';

@Component({
  selector: 'app-volume-agreement-drug-total',
  templateUrl: './volume-agreement-drug-total.component.html',
  styleUrls: ['./volume-agreement-drug-total.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VolumeAgreementDrugTotalComponent extends CommonInner implements OnInit {
  @Input()
  drug: DrugInformation;

  scaleList: iOption[] = enumToList(VolumeAgreementScaleEnum);
  focusMonthes: any[];

  constructor(
    public fb: FormBuilder,
    public dataService: DataService,
  ) {
    super(fb);
    this.focusMonthes = this.dataService.getPeriod();
  }

  ngOnInit() {
    this.buildForm({
      scale: [this.drug.currentScale],
      focusedMonth: [this.getCurrentDates(this.drug.focusMonthes)]
    });


    this.form.valueChanges.subscribe((formValue: any) => {
      this.drug.currentScale = formValue.scale;
      this.drug.focusMonthes = [];
      (formValue.focusMonthes || []).forEach((item: any) => {
        this.drug.focusMonthes.push(item.value);
      });
    });
  }

  getCurrentDates(dates: any[]): any[] {
    const result: any[] = [];

    dates.forEach((d: Date) => {
      this.focusMonthes.filter((item: any) => {
        if (d.toString() === item.value.toString()) {
          result.push(item);
        }
      });
    });

    return result;
  }
}
