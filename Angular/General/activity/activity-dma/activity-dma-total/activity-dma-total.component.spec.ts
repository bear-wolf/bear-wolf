import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDmaTotalComponent } from './activity-dma-total.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {SharedModule} from "@shared/shared.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ActivityDmaTotalComponent', () => {
  let component: ActivityDmaTotalComponent;
  let fixture: ComponentFixture<ActivityDmaTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDmaTotalComponent ],
      imports: [
          SharedModule,
        FormsModule,
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
    fixture = TestBed.createComponent(ActivityDmaTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
