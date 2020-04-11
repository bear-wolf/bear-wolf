import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFractionComponent } from './chart-fraction.component';

describe('ChartFractionComponent', () => {
  let component: ChartFractionComponent;
  let fixture: ComponentFixture<ChartFractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartFractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
