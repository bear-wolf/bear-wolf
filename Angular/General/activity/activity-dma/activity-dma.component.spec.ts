import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaComponent } from './activity-dma.component';
import {DmaTest} from './dma-test.model';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NotificationService} from "@shared/modules/notification/notification.service";
import {AuthService} from "../../auth/services/auth.service";

describe('ActivityDmaComponent', () => {
  let component: ActivityDmaComponent;
  let fixture: ComponentFixture<ActivityDmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaComponent ],
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
          NotificationService,
          AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDmaComponent);
    fixture.componentInstance.dma = DmaTest.data;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
