import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityJointAgreementListComponent } from './activity-joint-agreement-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ActivityJointAgreementListComponent', () => {
  let component: ActivityJointAgreementListComponent;
  let fixture: ComponentFixture<ActivityJointAgreementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityJointAgreementListComponent ],
      imports: [],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityJointAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
