import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaStockSalesForecastComponent } from './activity-dma-stock-sales-forecast.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('DmaStockSalesForecastComponent', () => {
  let component: ActivityDmaStockSalesForecastComponent;
  let fixture: ComponentFixture<ActivityDmaStockSalesForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaStockSalesForecastComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDmaStockSalesForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
