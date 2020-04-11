import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeAgreementDrugTotalComponent } from './volume-agreement-drug-total.component';

xdescribe('VolumeAgreementDrugTotalComponent', () => {
  let component: VolumeAgreementDrugTotalComponent;
  let fixture: ComponentFixture<VolumeAgreementDrugTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeAgreementDrugTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeAgreementDrugTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
