import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControlsDatepickerComponent} from "@shared/modules/form-controls/form-controls-datepicker/form-controls-datepicker.component";

describe('FormControlsInputComponent', () => {
  let component: FormControlsDatepickerComponent;
  let fixture: ComponentFixture<FormControlsDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
