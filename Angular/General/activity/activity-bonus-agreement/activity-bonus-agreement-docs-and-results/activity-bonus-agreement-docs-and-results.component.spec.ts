import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBonusAgreementDocsAndResultsComponent } from './activity-bonus-agreement-docs-and-results.component';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

xdescribe('ActivityBonusAgreementDocsAndResultsComponent', () => {
  let component: ActivityBonusAgreementDocsAndResultsComponent;
  let fixture: ComponentFixture<ActivityBonusAgreementDocsAndResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBonusAgreementDocsAndResultsComponent ],
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBonusAgreementDocsAndResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
