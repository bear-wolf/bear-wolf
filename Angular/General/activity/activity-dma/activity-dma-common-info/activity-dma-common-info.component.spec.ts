import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaCommonInfoComponent } from './activity-dma-common-info.component';
import {DmaTest} from '../dma-test.model';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

xdescribe('VolumeAgreementCommonInfoComponent', () => {
  let component: ActivityDmaCommonInfoComponent;
  let fixture: ComponentFixture<ActivityDmaCommonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaCommonInfoComponent ],
      imports: [
        SharedModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDmaCommonInfoComponent);
    fixture.componentInstance.dma = DmaTest.data;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
