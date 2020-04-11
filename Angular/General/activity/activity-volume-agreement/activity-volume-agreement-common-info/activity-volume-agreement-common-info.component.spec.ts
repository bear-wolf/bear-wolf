import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityVolumeAgreementCommonInfoComponent } from './activity-volume-agreement-common-info.component';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('VolumeAgreementCommonInfoComponent', () => {
  let component: ActivityVolumeAgreementCommonInfoComponent;
  let fixture: ComponentFixture<ActivityVolumeAgreementCommonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityVolumeAgreementCommonInfoComponent ],
      imports: [
        FormsModule,
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
    fixture = TestBed.createComponent(ActivityVolumeAgreementCommonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
