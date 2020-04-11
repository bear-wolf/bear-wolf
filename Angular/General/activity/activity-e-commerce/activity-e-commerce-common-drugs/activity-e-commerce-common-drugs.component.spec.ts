import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityECommerceCommonDrugsComponent } from './activity-e-commerce-common-drugs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {SharedModule} from "@shared/shared.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ECommerceCommonDrugsComponent', () => {
  let component: ActivityECommerceCommonDrugsComponent;
  let fixture: ComponentFixture<ActivityECommerceCommonDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityECommerceCommonDrugsComponent ],
      imports: [
          SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityECommerceCommonDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
