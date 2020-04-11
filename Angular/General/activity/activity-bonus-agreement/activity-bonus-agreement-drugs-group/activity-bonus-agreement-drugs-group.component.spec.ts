import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBonusAgreementDrugsGroupComponent } from './activity-bonus-agreement-drugs-group.component';

xdescribe('ActivityBonusAgreementDrugsGroupComponent', () => {
  let component: ActivityBonusAgreementDrugsGroupComponent;
  let fixture: ComponentFixture<ActivityBonusAgreementDrugsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBonusAgreementDrugsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBonusAgreementDrugsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
