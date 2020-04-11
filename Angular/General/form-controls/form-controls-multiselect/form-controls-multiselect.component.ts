import { Component, forwardRef, Input } from '@angular/core';
import { FormControlsComponent } from '@shared/modules/form-controls/form-controls/form-controls.component';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-controls-multiselect',
  templateUrl: './form-controls-multiselect.component.html',
  styleUrls: ['./form-controls-multiselect.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsMultiselectComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsMultiselectComponent),
    multi: true
  }]
})
export class FormControlsMultiselectComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input() defaultLabel: string;
  @Input() dataKey: string = 'id';

  updateSelectValue(list) {
    this.value = list;
    this.onChange(list);
    this.onTouched();
  }
}
