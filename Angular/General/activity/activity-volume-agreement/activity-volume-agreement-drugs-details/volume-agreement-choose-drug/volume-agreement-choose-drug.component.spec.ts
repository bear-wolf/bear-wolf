import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeAgreementChooseDrugComponent } from './volume-agreement-choose-drug.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('VolumeAgreementChooseDrugComponent', () => {
  let component: VolumeAgreementChooseDrugComponent;
  let fixture: ComponentFixture<VolumeAgreementChooseDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeAgreementChooseDrugComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeAgreementChooseDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
