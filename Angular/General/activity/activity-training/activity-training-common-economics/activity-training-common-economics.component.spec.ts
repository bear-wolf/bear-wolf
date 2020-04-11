import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrainingCommonEconomicsComponent } from './activity-training-common-economics.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ActivityTrainingCommonEconomicsComponent', () => {
  let component: ActivityTrainingCommonEconomicsComponent;
  let fixture: ComponentFixture<ActivityTrainingCommonEconomicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTrainingCommonEconomicsComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTrainingCommonEconomicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
