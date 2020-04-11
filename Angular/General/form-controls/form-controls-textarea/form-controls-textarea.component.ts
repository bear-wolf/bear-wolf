import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormControlsComponent} from "@shared/modules/form-controls/form-controls/form-controls.component";
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-form-controls-textarea',
  templateUrl: './form-controls-textarea.component.html',
  styleUrls: ['./../form-controls.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsTextareaComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsTextareaComponent),
    multi: true
  }]
})
export class FormControlsTextareaComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input() placeholder: string;
}
