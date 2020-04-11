import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityBasicMarketingCommonInfoComponent} from './activity-basic-marketing-common-info.component';
import {BasicMarketingTest} from '../basic-marketing-test.model';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {BasicMarketing} from "../basic-marketing.model";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ActivityBasicMarketingCommonInfoComponent', () => {
  let component: ActivityBasicMarketingCommonInfoComponent;
  let fixture: ComponentFixture<ActivityBasicMarketingCommonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBasicMarketingCommonInfoComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBasicMarketingCommonInfoComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.basicMarketing = new BasicMarketing(BasicMarketingTest.withSku);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
