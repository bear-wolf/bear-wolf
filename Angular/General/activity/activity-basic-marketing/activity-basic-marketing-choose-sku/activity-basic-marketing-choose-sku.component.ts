import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BasicMarketing} from '../basic-marketing.model';
import {CommonInner} from '@shared/components/common-inner.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import {BasicMarketingSku} from '../activity-basic-marketing-sku.model';
import {iOption} from '@shared/models/option.model';

@Component({
  selector: 'app-activity-basic-marketing-choose-sku',
  templateUrl: './activity-basic-marketing-choose-sku.component.html',
  styleUrls: ['./activity-basic-marketing-choose-sku.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBasicMarketingChooseSkuComponent implements OnInit {
  @Input() basicMarketing: BasicMarketing;
  filteredSkus: BasicMarketingSku[];
  businessUnits: iOption[] = [{label: 'Все группы', value: 'Все группы'}];
  currentSku: BasicMarketingSku;
  @Output() selected: EventEmitter<BasicMarketingSku> = new EventEmitter<BasicMarketingSku>();
  form: FormGroup;

  constructor(
    public fb: FormBuilder
  ) {
  }

  ngOnInit() {

    this.getAvailableBusinessUnits();
    this.filteredSkus = this.basicMarketing.basicMarketingSku;
    this.selectSku(this.filteredSkus[0]);

    this.form = this.fb.group({
      currentBU: ['Все группы'],
      currentSku: [this.filteredSkus[0]]
    });

    this.form.get('currentBU').valueChanges.subscribe((value: string) => {
      if (value === 'Все группы') {
        this.filteredSkus = this.basicMarketing.basicMarketingSku;
      } else {
        this.filterSkus(value);
      }

      this.selectSku(this.filteredSkus[0]);
    });
  }

  getAvailableBusinessUnits(): void {
    const result: iOption[] = [
      {label: 'Все группы', value: 'Все группы'}
    ];

    this.basicMarketing.basicMarketingSku.forEach((sku: BasicMarketingSku) => {
      if (sku.sku.brand.businessUnit.name && !result.find((o: iOption) => sku.sku.brand.businessUnit.name === o.value)) {
        result.push({label: sku.sku.brand.businessUnit.name, value: sku.sku.brand.businessUnit.name});
      }
    });

    this.businessUnits = result;
  }

  filterSkus(buName: string): void {
    this.filteredSkus = this.basicMarketing.basicMarketingSku.filter((bmSku: BasicMarketingSku) => bmSku.sku.brand.businessUnit.name === buName);
  }

  isSkuActive(bmSku: BasicMarketingSku): boolean {
    return this.currentSku.skuId === bmSku.skuId;
  }

  selectSku(bmSku: BasicMarketingSku) {
    this.currentSku = bmSku;
    this.selected.emit(bmSku);
  }
}
