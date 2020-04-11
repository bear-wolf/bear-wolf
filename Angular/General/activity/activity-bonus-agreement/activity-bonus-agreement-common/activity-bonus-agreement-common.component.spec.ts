import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBonusAgreementCommonComponent } from './activity-bonus-agreement-common.component';

xdescribe('ActivityBonusAgreementCommonComponent', () => {
  let component: ActivityBonusAgreementCommonComponent;
  let fixture: ComponentFixture<ActivityBonusAgreementCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBonusAgreementCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBonusAgreementCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
