import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivityBasicMarketingComponent} from './activity-basic-marketing.component';
import {BasicMarketing} from './basic-marketing.model';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControlsModule} from "@shared/modules/form-controls/form-controls.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NotificationService} from "@shared/modules/notification/notification.service";

describe('BasicMarketingComponent', () => {
    let component: ActivityBasicMarketingComponent;
    let fixture: ComponentFixture<ActivityBasicMarketingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
            declarations: [ActivityBasicMarketingComponent],
            providers: [
                NotificationService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityBasicMarketingComponent);
        fixture.componentInstance.basicMarketingService
            .getById('66b61d5d-0b06-45ab-9b17-fd65a4f037bd')
            .subscribe((item)=>{
              console.log('Test request', item);
            })
        fixture.componentInstance.basicMarketing = new BasicMarketing(null, {});
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
