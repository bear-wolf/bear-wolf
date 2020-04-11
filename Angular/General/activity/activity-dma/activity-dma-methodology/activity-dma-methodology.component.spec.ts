import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaMethodologyComponent } from './activity-dma-methodology.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('DmaMethodologyComponent', () => {
  let component: ActivityDmaMethodologyComponent;
  let fixture: ComponentFixture<ActivityDmaMethodologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaMethodologyComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDmaMethodologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
