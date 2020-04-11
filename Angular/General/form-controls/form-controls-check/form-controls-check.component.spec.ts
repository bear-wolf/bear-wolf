import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsCheckComponent } from './form-controls-check.component';

describe('FormControlsCheckComponent', () => {
  let component: FormControlsCheckComponent;
  let fixture: ComponentFixture<FormControlsCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
