import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivityDmaDocumentsComponent} from './activity-dma-documents.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";

describe('ActivityDmaDocumentsComponent', () => {
    let component: ActivityDmaDocumentsComponent;
    let fixture: ComponentFixture<ActivityDmaDocumentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityDmaDocumentsComponent],
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
        fixture = TestBed.createComponent(ActivityDmaDocumentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
