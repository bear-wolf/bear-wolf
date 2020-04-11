import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBonusAgreementComponent } from './activity-bonus-agreement.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {BonusAgreement} from "./bonus-agreement.model";
import {BonusAdreementTest} from "./bonus-adreement-test.model";
import {CurrencyService} from "@shared/components/currency/currency.service";
import {RouterModule} from "@angular/router";
import {NotificationService} from "@shared/modules/notification/notification.service";
import {AuthService} from "../../auth/services/auth.service";

describe('BonusAgreementComponent', () => {
  let component: ActivityBonusAgreementComponent;
  let fixture: ComponentFixture<ActivityBonusAgreementComponent>;
  let injector: TestBed;
  let currencyService: CurrencyService;
  let httpMock: HttpTestingController;

  currencyService = new CurrencyService(null, null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBonusAgreementComponent ],
      imports: [
        RouterModule.forRoot([]),
        SharedModule,
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
        CurrencyService,
        NotificationService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBonusAgreementComponent);
    component = fixture.componentInstance;
    component.bonusAgreement = new BonusAgreement(currencyService, BonusAdreementTest.withOutSku)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
