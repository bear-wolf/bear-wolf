import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityVolumeAgreementDocsComponent } from './activity-volume-agreement-docs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('VolumeAgreementDocsComponent', () => {
  let component: ActivityVolumeAgreementDocsComponent;
  let fixture: ComponentFixture<ActivityVolumeAgreementDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityVolumeAgreementDocsComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityVolumeAgreementDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
