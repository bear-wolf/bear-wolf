import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityECommerceCommonActivityTypesComponent } from './activity-e-commerce-common-activity-types.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ECommerceCommonActivityTypesComponent', () => {
  let component: ActivityECommerceCommonActivityTypesComponent;
  let fixture: ComponentFixture<ActivityECommerceCommonActivityTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityECommerceCommonActivityTypesComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityECommerceCommonActivityTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
