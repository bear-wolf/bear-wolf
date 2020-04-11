import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBasicMarketingSkuMarketInfoComponent } from './activity-basic-marketing-sku-market-info.component';
import {SharedModule} from "@shared/shared.module";
import {BasicMarketingTest} from '../basic-marketing-test.model';
import {BasicMarketing} from "../basic-marketing.model";

describe('ActivityBasicMarketingSkuMarketInfoComponent', () => {
  let component: ActivityBasicMarketingSkuMarketInfoComponent;
  let fixture: ComponentFixture<ActivityBasicMarketingSkuMarketInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBasicMarketingSkuMarketInfoComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBasicMarketingSkuMarketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //fixture.componentInstance.bmSku = new BasicMarketing(BasicMarketingTest.withSku);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
