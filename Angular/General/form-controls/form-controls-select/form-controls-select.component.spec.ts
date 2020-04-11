import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsSelectComponent } from './form-controls-select.component';

describe('FormControlsSelectComponent', () => {
  let component: FormControlsSelectComponent;
  let fixture: ComponentFixture<FormControlsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
