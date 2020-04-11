import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBasicMarketingTotalComponent } from './activity-basic-marketing-total.component';
import {SharedModule} from "@shared/shared.module";

xdescribe('ActivityBasicMarketingTotalComponent', () => {
  let component: ActivityBasicMarketingTotalComponent;
  let fixture: ComponentFixture<ActivityBasicMarketingTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBasicMarketingTotalComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBasicMarketingTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
