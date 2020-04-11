import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlsComponent } from '@shared/modules/form-controls/form-controls/form-controls.component';

@Component({
  selector: 'app-form-controls-select',
  templateUrl: './form-controls-select.component.html',
  styleUrls: ['./form-controls-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsSelectComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsSelectComponent),
    multi: true
  }]
})
export class FormControlsSelectComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() translate: boolean = true;

  updateSelectValue(event) {
    this.value = event.value;
    this.onChange(event.value);
    this.onChangeEmit(event.value);
    this.onTouched();
  }
}
