import {DrugFormData} from "./drug-form-data.model";

export class DrugDetail{
  title: string;
  _formData: DrugFormData;

  constructor(data?) {
    if (data) {
      this.value = data;
    }
    return this;
  }

  set value(data: any) {
    this.title = data.title;
  }

  set formData(data: DrugFormData){
    this._formData = data;
  }

}
