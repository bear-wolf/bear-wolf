import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaStockEconomicsComponent } from './activity-dma-stock-economics.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ActivityDmaStockEconomicsComponent', () => {
  let component: ActivityDmaStockEconomicsComponent;
  let fixture: ComponentFixture<ActivityDmaStockEconomicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaStockEconomicsComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDmaStockEconomicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
