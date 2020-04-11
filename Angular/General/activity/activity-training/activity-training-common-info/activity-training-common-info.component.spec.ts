import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrainingCommonInfoComponent } from './activity-training-common-info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ActivityTrainingCommonInfoComponent', () => {
  let component: ActivityTrainingCommonInfoComponent;
  let fixture: ComponentFixture<ActivityTrainingCommonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTrainingCommonInfoComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTrainingCommonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
