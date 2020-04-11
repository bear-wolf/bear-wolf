import { Component, forwardRef, Input } from '@angular/core';
import { FormControlsComponent } from '@shared/modules/form-controls/form-controls/form-controls.component';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-controls-check',
  templateUrl: './form-controls-check.component.html',
  styleUrls: ['./form-controls-check.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsCheckComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsCheckComponent),
    multi: true
  }]
})
export class FormControlsCheckComponent extends FormControlsComponent implements ControlValueAccessor { }
