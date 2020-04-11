import {Component, forwardRef, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormControlsComponent} from '@shared/modules/form-controls/form-controls/form-controls.component';

@Component({
  selector: 'app-form-controls-checkbox',
  templateUrl: './form-controls-checkbox.component.html',
  styleUrls: ['./../form-controls.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsCheckboxComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsCheckboxComponent),
    multi: true
  }]
})
export class FormControlsCheckboxComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input()
  prefix: string = '';
}
