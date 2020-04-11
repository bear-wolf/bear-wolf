import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsTextareaComponent } from './form-controls-textarea.component';

describe('FormControlsTextareaComponent', () => {
  let component: FormControlsTextareaComponent;
  let fixture: ComponentFixture<FormControlsTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
