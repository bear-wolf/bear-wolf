import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityJointAgreementDocsComponent } from './activity-joint-agreement-docs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {SharedModule} from "@shared/shared.module";
import {JointAgreement} from "../joint-agreement.model";

describe('ActivityJointAgreementDocsComponent', () => {
  let component: ActivityJointAgreementDocsComponent;
  let fixture: ComponentFixture<ActivityJointAgreementDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityJointAgreementDocsComponent ],
      imports: [
          SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityJointAgreementDocsComponent);
    component = fixture.componentInstance;
    component.jointAgreement = new JointAgreement(null, {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
