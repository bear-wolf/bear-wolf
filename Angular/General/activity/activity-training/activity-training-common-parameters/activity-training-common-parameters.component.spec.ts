import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrainingCommonParametersComponent } from './activity-training-common-parameters.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

xdescribe('ActivityTrainingCommonParametersComponent', () => {
  let component: ActivityTrainingCommonParametersComponent;
  let fixture: ComponentFixture<ActivityTrainingCommonParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTrainingCommonParametersComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTrainingCommonParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
