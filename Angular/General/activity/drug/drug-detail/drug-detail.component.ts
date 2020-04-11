import {Component, Input, OnInit} from '@angular/core';
import {DrugDetail} from "./drug-detail.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DrugFormData} from "./drug-form-data.model";

@Component({
  selector: 'app-drug-detail',
  templateUrl: './drug-detail.component.html',
  styleUrls: ['./drug-detail.component.scss']
})
export class DrugDetailComponent implements OnInit {
  @Input()
  model: DrugDetail;

  @Input()
  drug: DrugFormData;

  form: FormGroup;


  constructor(
      public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.drug = new DrugFormData();

    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      ntz: [this.drug.ntz],
      calculation: [this.drug.calculation],
      report: [this.drug.report],
    });
  }

  calculation(){

  }

}
