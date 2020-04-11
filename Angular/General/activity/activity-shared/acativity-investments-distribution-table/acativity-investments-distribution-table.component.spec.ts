import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcativityInvestmentsDistributionTableComponent } from './acativity-investments-distribution-table.component';

describe('AcativityInvestmentsDistributionTableComponent', () => {
  let component: AcativityInvestmentsDistributionTableComponent;
  let fixture: ComponentFixture<AcativityInvestmentsDistributionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcativityInvestmentsDistributionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcativityInvestmentsDistributionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
