import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { iOption } from '@shared/models/option.model';

@Component({
  selector: 'app-form-controls',
  template: '',
  encapsulation: ViewEncapsulation.None
})
export class FormControlsComponent implements ControlValueAccessor {
  value: any;
  @Input() disabled: boolean;
  @Input() errors: any;
  @Input() hint: string;
  @Input() label: string;
  @Input() options: any[];
  @Input() width: string;
  @Input() hideErrors: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() bindLabel: string = 'label';
  @Input() bindValue: string = 'value';

  protected onChange = (value: any) => {
  };

  protected onTouched = () => {
  };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: any) {
    this.value = outsideValue;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onChangeEmit($event) {
    this.change.emit($event);
  }

  updateValue(insideValue: any) {
    this.value = insideValue;
    this.onChange(insideValue);
    this.onTouched();
  }

  validate(control: FormControl) {
  }
}
