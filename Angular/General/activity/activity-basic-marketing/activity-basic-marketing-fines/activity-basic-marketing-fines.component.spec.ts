import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBasicMarketingFinesComponent } from './activity-basic-marketing-fines.component';
import {SharedModule} from "@shared/shared.module";
import {BasicMarketingTest} from '../basic-marketing-test.model';
import {BasicMarketing} from "../basic-marketing.model";

xdescribe('ActivityBasicMarketingFinesComponent', () => {
  let component: ActivityBasicMarketingFinesComponent;
  let fixture: ComponentFixture<ActivityBasicMarketingFinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBasicMarketingFinesComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBasicMarketingFinesComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.basicMarketing = new BasicMarketing(BasicMarketingTest.withSku);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
