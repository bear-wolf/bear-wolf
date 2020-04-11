import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlsComponent } from '@shared/modules/form-controls/form-controls/form-controls.component';

declare type InputType = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-form-controls-input',
  templateUrl: './form-controls-input.component.html',
  styleUrls: ['./form-controls-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsInputComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsInputComponent),
    multi: true
  }]
})
export class FormControlsInputComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input() type: InputType;
  @Input() placeholder: string;
  @Input() decimal: string;
}
