import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsMultiselectComponent } from './form-controls-multiselect.component';

describe('FormControlsMultiselectComponent', () => {
  let component: FormControlsMultiselectComponent;
  let fixture: ComponentFixture<FormControlsMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
