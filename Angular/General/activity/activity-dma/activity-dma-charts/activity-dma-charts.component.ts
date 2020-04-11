import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-activity-dma-charts',
  templateUrl: './activity-dma-charts.component.html',
  styleUrls: ['./activity-dma-charts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDmaChartsComponent extends CommonInner implements OnInit {

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit() {
  }

  submit() {

  }
}
