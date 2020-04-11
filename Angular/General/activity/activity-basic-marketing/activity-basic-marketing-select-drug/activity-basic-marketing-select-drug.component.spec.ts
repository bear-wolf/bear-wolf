import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBasicMarketingSelectDrugComponent } from './activity-basic-marketing-select-drug.component';
import {SharedModule} from "@shared/shared.module";
import {BasicMarketingTest} from '../basic-marketing-test.model';
import {BasicMarketing} from "../basic-marketing.model";

xdescribe('ActivityBasicMarketingSelectDrugComponent', () => {
  let component: ActivityBasicMarketingSelectDrugComponent;
  let fixture: ComponentFixture<ActivityBasicMarketingSelectDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBasicMarketingSelectDrugComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBasicMarketingSelectDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.componentInstance.basicMarketing = new BasicMarketing(BasicMarketingTest.withSku);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
