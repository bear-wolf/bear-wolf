import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBasicMarketingSkuDetailsComponent } from './activity-basic-marketing-sku-details.component';
import {SharedModule} from "@shared/shared.module";
import {BasicMarketingTest} from '../basic-marketing-test.model';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {BasicMarketing} from "../basic-marketing.model";

xdescribe('ActivityBasicMarketingSkuDetailsComponent', () => {
  let component: ActivityBasicMarketingSkuDetailsComponent;
  let fixture: ComponentFixture<ActivityBasicMarketingSkuDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBasicMarketingSkuDetailsComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBasicMarketingSkuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.componentInstance.basicMarketing = new BasicMarketing(BasicMarketingTest.withSku);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
