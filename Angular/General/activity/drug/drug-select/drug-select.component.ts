import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { iOption } from '@shared/models/option.model';
import { DrugFormData } from '../drug-detail/drug-form-data.model';
import { DrugSelect } from './drug-select.model';
import { CommonInner } from '@shared/components/common-inner.component';

@Component({
  selector: 'app-drug-select',
  templateUrl: './drug-select.component.html',
  styleUrls: ['./drug-select.component.scss']
})
export class DrugSelectComponent extends CommonInner implements OnInit {
  @Input()
  listItem: iOption[];

  @Input()
  keyItem: string;

  @Input()
  listGroup: any[];

  @Input()
  bindLabel: string = 'label';

  @Input()
  bindValue: string = 'value';

  formDrug: FormGroup;
  form: FormGroup;
  sub: Subscription;

  group: any;

  constructor(
    public fb: FormBuilder,
  ) {
    super(fb);
  }


  ngOnInit() {
    if (this.listGroup) {
      this.form = this.buildForm({
        group: [this.listGroup[0][this.bindValue]]
      });

      this.selectedGroup(this.listGroup[0][this.bindValue]);
    }
  }

  // buildFormList() {
  //   this.formDrug = this.fb.group({
  //     drug: [this.listDrags[0].value],
  //   });
  // }


  selectedDrug(item: iOption) {
    this.listItem.forEach((item) => {
      item.selected = false;
    });
    item.selected = !item.selected;
    this.result.emit(new DrugSelect(item.label, item.value));
  }

  selectedGroup(id: string) {
     const group: any[] = this.listGroup.filter((item) => { return item[this.bindValue] === id ? item : null; });

     this.listItem = group[0][this.keyItem];
     this.group = group[0];
  }

  // parseList(value: string) {
  //   const data = this.listDrags.filter((item) => {
  //     return (item.value == value) ? item : null;
  //   });
  //
  //   return data[0];
  // }

  show() {
    //this.document.emit(this.drug);
  }
}
