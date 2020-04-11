import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityJointAgreementCommonComponent } from './activity-joint-agreement-common.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ActivityJointAgreementCommonComponent', () => {
  let component: ActivityJointAgreementCommonComponent;
  let fixture: ComponentFixture<ActivityJointAgreementCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityJointAgreementCommonComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityJointAgreementCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
