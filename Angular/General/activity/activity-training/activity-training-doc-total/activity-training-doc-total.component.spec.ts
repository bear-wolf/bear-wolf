import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrainingDocTotalComponent } from './activity-training-doc-total.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ActivityTrainingDocTotalComponent', () => {
  let component: ActivityTrainingDocTotalComponent;
  let fixture: ComponentFixture<ActivityTrainingDocTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTrainingDocTotalComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTrainingDocTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
