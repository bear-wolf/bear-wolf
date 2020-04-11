import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControlsCheckboxComponent} from "@shared/modules/form-controls/form-controls-checkbox/form-controls-checkbox.component";


describe('FormControlsInputComponent', () => {
  let component: FormControlsCheckboxComponent;
  let fixture: ComponentFixture<FormControlsCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
