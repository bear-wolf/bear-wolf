import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControlsLabelComponent} from "@shared/modules/form-controls/form-controls-label/form-controls-label.component";

describe('FormControlsInputComponent', () => {
  let component: FormControlsLabelComponent;
  let fixture: ComponentFixture<FormControlsLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlsLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlsLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
