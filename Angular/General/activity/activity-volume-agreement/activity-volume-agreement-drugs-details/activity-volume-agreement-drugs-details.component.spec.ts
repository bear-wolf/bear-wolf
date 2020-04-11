import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityVolumeAgreementDrugsDetailsComponent } from './activity-volume-agreement-drugs-details.component';

describe('VolumeAgreementDrugsDetailsComponent', () => {
  let component: ActivityVolumeAgreementDrugsDetailsComponent;
  let fixture: ComponentFixture<ActivityVolumeAgreementDrugsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityVolumeAgreementDrugsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityVolumeAgreementDrugsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
