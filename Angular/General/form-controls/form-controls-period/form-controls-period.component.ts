import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlsComponent } from '@shared/modules/form-controls/form-controls/form-controls.component';
import { Period } from '@shared/models/period.model';

@Component({
  selector: 'app-form-controls-period',
  templateUrl: './form-controls-period.component.html',
  styleUrls: ['./form-controls-period.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlsPeriodComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormControlsPeriodComponent),
    multi: true
  }]
})
export class FormControlsPeriodComponent extends FormControlsComponent implements ControlValueAccessor {
  @Input() labels: boolean;
  @Input() labelFrom: string = 'Месяц начала:';
  @Input() labelTo: string = 'Месяц окончания:';
  @Input() dateFormat: string = 'mm-y';
  value: Period;

  updatePeriodValue(insideValue: any, field: string): void {
    this.value[field] = insideValue;
    this.onChange(this.value);
    this.onTouched();
  }

  validate({value}: FormControl) {
    if (!this.value.from) {
      return { requiredFrom: true };
    }

    if (!this.value.to) {
      return { requiredTo: true };
    }

    return this.value.from > this.value.to ? { period: true } : null;
  }
}
