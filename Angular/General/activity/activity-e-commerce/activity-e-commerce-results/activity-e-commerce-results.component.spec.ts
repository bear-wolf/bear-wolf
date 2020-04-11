import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityECommerceResultsComponent } from './activity-e-commerce-results.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ActivityECommerceResultsComponent', () => {
  let component: ActivityECommerceResultsComponent;
  let fixture: ComponentFixture<ActivityECommerceResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityECommerceResultsComponent ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        FormControlsModule
      ],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityECommerceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
