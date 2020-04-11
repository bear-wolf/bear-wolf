import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder, Validators } from '@angular/forms';
import { iOption } from '@shared/models/option.model';
import { Dma } from '../dma.model';
import { enumToList } from '@shared/functions/enumToList';
import { DmaMethodologyEnum } from './dma-methodology.enum';

@Component({
  selector: 'app-activity-dma-methodology',
  templateUrl: './activity-dma-methodology.component.html',
  styleUrls: ['./activity-dma-methodology.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDmaMethodologyComponent extends CommonInner implements OnInit {
  @Input()
  dma: Dma;

  methodologyOptions: iOption[] = enumToList(DmaMethodologyEnum);

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm({
      methodology: [this.dma.calculatingMethodologySalesExcludingDMActivities, Validators.required]
    });

    this.form.get('methodology').valueChanges.subscribe(value => this.dma.calculatingMethodologySalesExcludingDMActivities = value);
  }

  submit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('ActivityDmaCommonInfoComponent\'s form is invalid');
      return;
    }
  }
}
