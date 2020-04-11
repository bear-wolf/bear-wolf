import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaItemSupportComponent } from './activity-dma-item-support.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('DmaItemSupportComponent', () => {
  let component: ActivityDmaItemSupportComponent;
  let fixture: ComponentFixture<ActivityDmaItemSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaItemSupportComponent ],
      imports: [
        RouterModule.forRoot([]),
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDmaItemSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
