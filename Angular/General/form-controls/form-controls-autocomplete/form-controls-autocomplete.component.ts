import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormControlsComponent } from '@shared/modules/form-controls/form-controls/form-controls.component';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

declare type DataType = 'sku';
@Component({
  selector: 'app-form-controls-autocomplete',
  templateUrl: './form-controls-autocomplete.component.html',
  styleUrls: ['./form-controls-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsAutocompleteComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsAutocompleteComponent),
    multi: true
  }]
})
export class FormControlsAutocompleteComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() field: string = 'name';
  @Input() multiple: boolean = false;
  @Input() suggestions: any[];
  @Input() dataType: DataType = 'sku';
  @Output() completeMethod = new EventEmitter<any>();

  complete(event) {
    this.completeMethod.emit(event);
  }
}
