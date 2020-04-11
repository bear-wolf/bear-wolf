import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBasicMarketingInvestmentsComponent } from './activity-basic-marketing-investments.component';
import {SharedModule} from "@shared/shared.module";
import {BasicMarketingTest} from '../basic-marketing-test.model';
import {BasicMarketing} from "../basic-marketing.model";

xdescribe('ActivityBasicMarketingInvestmentsComponent', () => {
  let component: ActivityBasicMarketingInvestmentsComponent;
  let fixture: ComponentFixture<ActivityBasicMarketingInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBasicMarketingInvestmentsComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBasicMarketingInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.basicMarketing = new BasicMarketing(BasicMarketingTest.withSku);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
