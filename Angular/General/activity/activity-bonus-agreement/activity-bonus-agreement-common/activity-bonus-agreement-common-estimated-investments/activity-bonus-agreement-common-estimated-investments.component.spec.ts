import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBonusAgreementCommonEstimatedInvestmentsComponent } from './activity-bonus-agreement-common-estimated-investments.component';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ActivityBonusAgreementCommonEstimatedInvestmentsComponent', () => {
  let component: ActivityBonusAgreementCommonEstimatedInvestmentsComponent;
  let fixture: ComponentFixture<ActivityBonusAgreementCommonEstimatedInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBonusAgreementCommonEstimatedInvestmentsComponent ],
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
    fixture = TestBed.createComponent(ActivityBonusAgreementCommonEstimatedInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
