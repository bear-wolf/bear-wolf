import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsAutocompleteComponent } from './form-controls-autocomplete.component';

describe('FormControlsAutocompleteComponent', () => {
  let component: FormControlsAutocompleteComponent;
  let fixture: ComponentFixture<FormControlsAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
