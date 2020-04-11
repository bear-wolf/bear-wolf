import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeAgreementDrugDetailComponent } from './volume-agreement-drug-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('VolumeAgreementDrugDetailComponent', () => {
  let component: VolumeAgreementDrugDetailComponent;
  let fixture: ComponentFixture<VolumeAgreementDrugDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeAgreementDrugDetailComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeAgreementDrugDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
