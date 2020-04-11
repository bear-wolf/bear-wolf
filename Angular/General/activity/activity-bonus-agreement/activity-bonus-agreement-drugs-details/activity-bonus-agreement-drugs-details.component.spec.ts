import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBonusAgreementDrugsDetailsComponent } from './activity-bonus-agreement-drugs-details.component';

xdescribe('ActivityBonusAgreementDrugsDetailsComponent', () => {
  let component: ActivityBonusAgreementDrugsDetailsComponent;
  let fixture: ComponentFixture<ActivityBonusAgreementDrugsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBonusAgreementDrugsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBonusAgreementDrugsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
