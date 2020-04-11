import {async, ComponentFixture, TestBed, getTestBed} from '@angular/core/testing';

import {ActivityBasicMarketingChooseSkuComponent} from './activity-basic-marketing-choose-sku.component';
import {BasicMarketingService} from '../basic-marketing.service';
import {BasicMarketingTest} from '../basic-marketing-test.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {BasicMarketing} from "../basic-marketing.model";
import {CurrencyService} from "@shared/components/currency/currency.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CurrencyStoreService} from "@shared/services/currency-store.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ActivityBasicMarketingChooseSkuComponent', () => {
  let component: ActivityBasicMarketingChooseSkuComponent;
  let fixture: ComponentFixture<ActivityBasicMarketingChooseSkuComponent>;

  let currencyStoreService = new CurrencyStoreService();
  let injector: TestBed;
  let currencyService: CurrencyService;
  let httpMock: HttpTestingController;

  currencyService = new CurrencyService(null, null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBasicMarketingChooseSkuComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        BasicMarketingService,
        CurrencyStoreService,
        CurrencyService
      ]
    })
    .compileComponents();

    injector = getTestBed();
    currencyService = injector.get(CurrencyService);
    httpMock = injector.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBasicMarketingChooseSkuComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.basicMarketing = new BasicMarketing(currencyService, BasicMarketingTest.withSku);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get basic marketing data', () => {
  //   const profileInfo = { login: 'blacksonic', id: 602571, name: 'Gábor Soós' };
  //   const basicMarketingService: BasicMarketingService = TestBed.get(BasicMarketingService);
  //
  //   basicMarketingService.getById('e312e80e-e109-4ccf-ab81-3adce6a61dec').subscribe((response) => {
  //         // http.expectOne('https://api.github.com/users/blacksonic').flush(profileInfo);
  //     expect(response).toEqual(profileInfo);
  //   });
  //
  //   // http.expectOne('https://api.github.com/users/blacksonic').flush(profileInfo);
  //   // expect(profileResponse).toEqual(profileInfo);
  // });
});
