import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBonusAgreementFinesComponent } from './activity-bonus-agreement-fines.component';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ActivityBonusAgreementFinesComponent', () => {
  let component: ActivityBonusAgreementFinesComponent;
  let fixture: ComponentFixture<ActivityBonusAgreementFinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBonusAgreementFinesComponent ],
      imports: [
        SharedModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBonusAgreementFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
