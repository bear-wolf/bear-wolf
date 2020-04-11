import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsInputComponent } from './form-controls-input.component';

describe('FormControlsInputComponent', () => {
  let component: FormControlsInputComponent;
  let fixture: ComponentFixture<FormControlsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
