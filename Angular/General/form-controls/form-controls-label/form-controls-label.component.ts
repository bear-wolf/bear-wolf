import {Component, forwardRef, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormControlsComponent} from '@shared/modules/form-controls/form-controls/form-controls.component';

declare type InputType = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-form-controls-label',
  templateUrl: './form-controls-label.component.html',
  styleUrls: ['./../form-controls.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsLabelComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsLabelComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class FormControlsLabelComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input() type: InputType;
  @Input() placeholder: string;
}
