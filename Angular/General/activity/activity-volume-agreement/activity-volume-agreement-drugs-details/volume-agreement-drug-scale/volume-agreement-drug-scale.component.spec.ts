import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeAgreementDrugScaleComponent } from './volume-agreement-drug-scale.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('VolumeAgreementDrugScaleComponent', () => {
  let component: VolumeAgreementDrugScaleComponent;
  let fixture: ComponentFixture<VolumeAgreementDrugScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeAgreementDrugScaleComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeAgreementDrugScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
