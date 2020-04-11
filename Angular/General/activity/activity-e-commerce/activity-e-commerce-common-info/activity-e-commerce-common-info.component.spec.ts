import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityECommerceCommonInfoComponent } from './activity-e-commerce-common-info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ECommerceCommonInfoComponent', () => {
  let component: ActivityECommerceCommonInfoComponent;
  let fixture: ComponentFixture<ActivityECommerceCommonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityECommerceCommonInfoComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityECommerceCommonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
