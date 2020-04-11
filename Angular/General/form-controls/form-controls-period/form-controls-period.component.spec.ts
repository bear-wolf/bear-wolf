import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsPeriodComponent } from './form-controls-period.component';

describe('FormControlsPeriodComponent', () => {
  let component: FormControlsPeriodComponent;
  let fixture: ComponentFixture<FormControlsPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
