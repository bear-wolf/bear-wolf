import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { FormControlsInputComponent } from './form-controls-input/form-controls-input.component';
import { FormControlsSelectComponent } from './form-controls-select/form-controls-select.component';
import { FormControlsCheckboxComponent } from '@shared/modules/form-controls/form-controls-checkbox/form-controls-checkbox.component';
import { FormControlsDatepickerComponent } from '@shared/modules/form-controls/form-controls-datepicker/form-controls-datepicker.component';
import { FormControlsLabelComponent } from '@shared/modules/form-controls/form-controls-label/form-controls-label.component';
import { FormControlsTextareaComponent } from './form-controls-textarea/form-controls-textarea.component';
import { FormControlsPeriodComponent } from './form-controls-period/form-controls-period.component';
import { FormControlsMultiselectComponent } from './form-controls-multiselect/form-controls-multiselect.component';
import { FormControlsCheckComponent } from './form-controls-check/form-controls-check.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { CustomValidationService } from '@shared/modules/form-controls/custom-validation.service';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControlsAutocompleteComponent } from './form-controls-autocomplete/form-controls-autocomplete.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    FormControlsInputComponent,
    FormControlsSelectComponent,
    FormControlsCheckboxComponent,
    FormControlsDatepickerComponent,
    FormControlsLabelComponent,
    FormControlsComponent,
    FormControlsTextareaComponent,
    FormControlsPeriodComponent,
    FormControlsMultiselectComponent,
    FormControlsCheckComponent,
    FormControlsAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    TranslateModule,
    CheckboxModule,
    AutoCompleteModule
  ],
  providers: [
    CustomValidationService
  ],
    exports: [
        FormControlsInputComponent,
        FormControlsCheckboxComponent,
        FormControlsDatepickerComponent,
        FormControlsSelectComponent,
        FormControlsTextareaComponent,
        FormControlsLabelComponent,
        FormControlsPeriodComponent,
        FormControlsCheckComponent,
        FormControlsMultiselectComponent,
        FormControlsAutocompleteComponent,
        FormControlsComponent
    ]
})
export class FormControlsModule {
}
