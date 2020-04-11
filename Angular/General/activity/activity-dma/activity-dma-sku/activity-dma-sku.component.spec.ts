import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaSkuComponent } from './activity-dma-sku.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CurrencyService} from "@shared/components/currency/currency.service";

describe('ActivityDmaSkuComponent', () => {
  let component: ActivityDmaSkuComponent;
  let fixture: ComponentFixture<ActivityDmaSkuComponent>;
  let injector: TestBed;
  let currencyService: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaSkuComponent ],
      imports: [
          HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
      providers: [
          CurrencyService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    currencyService = new CurrencyService(null, null);
    fixture = TestBed.createComponent(ActivityDmaSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
