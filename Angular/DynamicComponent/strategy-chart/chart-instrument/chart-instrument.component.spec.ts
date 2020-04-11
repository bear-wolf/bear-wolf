import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInstrumentComponent } from './chart-instrument.component';

describe('ChartInstrumentComponent', () => {
  let component: ChartInstrumentComponent;
  let fixture: ComponentFixture<ChartInstrumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartInstrumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
