import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaForecastComponent } from './activity-dma-forecast.component';

xdescribe('ActivityDmaForecastComponent', () => {
  let component: ActivityDmaForecastComponent;
  let fixture: ComponentFixture<ActivityDmaForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDmaForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
