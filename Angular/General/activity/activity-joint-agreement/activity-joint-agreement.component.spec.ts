import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityJointAgreementComponent } from './activity-joint-agreement.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ActivityJointAgreementComponent', () => {
  let component: ActivityJointAgreementComponent;
  let fixture: ComponentFixture<ActivityJointAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityJointAgreementComponent ],
      imports: [],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityJointAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
