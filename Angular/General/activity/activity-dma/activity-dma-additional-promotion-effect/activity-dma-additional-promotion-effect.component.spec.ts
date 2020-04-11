import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaAdditionalPromotionEffectComponent } from './activity-dma-additional-promotion-effect.component';
import {DmaTest} from '../dma-test.model';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ActivityDmaAdditionalPromotionEffectComponent', () => {
  let component: ActivityDmaAdditionalPromotionEffectComponent;
  let fixture: ComponentFixture<ActivityDmaAdditionalPromotionEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaAdditionalPromotionEffectComponent ],
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
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDmaAdditionalPromotionEffectComponent);
    fixture.componentInstance.dma = DmaTest.data;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
