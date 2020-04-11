import {Component, forwardRef, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormControlsComponent} from '@shared/modules/form-controls/form-controls/form-controls.component';

@Component({
  selector: 'app-form-controls-datepicker',
  templateUrl: './form-controls-datepicker.component.html',
  styleUrls: ['./../form-controls.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsDatepickerComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsDatepickerComponent),
    multi: true
  }]
})
export class FormControlsDatepickerComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input() placeholder: string;



  updateDatePickerValue(insideValue: any) {
    this.value = new Date(`${insideValue.year}-${insideValue.month}-${insideValue.day}`);
    this.onChange(new Date(`${insideValue.year}-${insideValue.month}-${insideValue.day}`));
    this.onTouched();
  }
}
