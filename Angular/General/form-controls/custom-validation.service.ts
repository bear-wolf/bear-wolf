import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService extends Validators{

  constructor() {
    super();
  }

  static commentRequired(control: FormControl) {
    if (!control.value) {
      return { required: true };
    } else {
      return null;
    }
  }

  static contractRequired(contract: FormGroup) {
    const value = contract.value;
    if (value.number) {
      if (!value.date) {
        return {
          required: 'This field is required'
        };
      }
    }

    return null;
  }

}
