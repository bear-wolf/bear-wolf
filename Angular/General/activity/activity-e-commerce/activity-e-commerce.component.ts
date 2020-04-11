import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ECommerce} from './e-commerce.model';
import {iSteps} from '@shared/models/stepper.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonActivityComponent} from '@shared/components/common-activity.component';
import {ActivityService} from '../activity.service';
import {ActivityTypeEnum} from '../activity-type.enum';
import {ECommerceService} from './e-commerce.service';
import {NotificationService} from '@shared/modules/notification/notification.service';
import {CurrencyEnum} from '@shared/enums/currency.enum';
import {DocumentService} from '@shared/services/document.service';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Component({
    selector: 'app-activity-e-commerce',
    templateUrl: './activity-e-commerce.component.html',
    styleUrls: ['./activity-e-commerce.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityECommerceComponent extends CommonActivityComponent implements OnInit {
    eCommerce: ECommerce;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public activityService: ActivityService,
        public notificationService: NotificationService,
        public eCommerceService: ECommerceService,
        public documentService: DocumentService,
        public currencyService: CurrencyService,
    ) {
        super(router, route, activityService, documentService, currencyService);
        this.type = ActivityTypeEnum.Ecommerce;
    }

    protected getSteps(): iSteps[] {
        this.steps = [
            {label: 'Общая информация'},
            {label: 'Согласование с АКАМ'},
            {label: 'Документы и итоги'}
        ];

        return this.steps;
    }

    ngOnInit() {
        super.ngOnInit();

        this.getActivityAsObservable().subscribe((activity: ECommerce) => {
            if (activity) {
                this.eCommerce = activity;
                this.entityHeader.setSteps(this.getSteps());
            }
        });
    }

    save() {
        if (!this.validation()) {
            return;
        }
        const data: any = this.prepareDataToSave();

        if (this.eCommerce.id) {
            this.eCommerceService.update(this.eCommerce.id, data, this.eCommerce.documentService.document.version).subscribe(
                (item) => {
                    this.notificationService.success('success', 'success');
                    this.router.navigate([this.getPreviousRoute() || 'activities/catalog']);
                },
                (error: any) => {
                    this.notificationService.error(error, error.message);
                });
        } else {
            this.eCommerceService.create(data).subscribe(
                (item) => {
                    this.notificationService.success('success', 'success');
                    this.router.navigate([this.getPreviousRoute() || 'activities/catalog']);
                },
                (error: any) => {
                    this.notificationService.error(error, error.message);
                });
        }
    }

    sendManager() {
        if (!this.validation()) {
            return;
        }
        this.activityInstance.changeStatusByDraft();
        const data: any = this.prepareDataToSave();

        if (this.eCommerce.id) {
            this.eCommerceService.update(this.eCommerce.id, data, this.eCommerce.documentService.document.version).subscribe(
                (item) => {
                    this.moveToNewVersion(this.eCommerce, this.eCommerce.id.toString(), this.eCommerce.version + 1);
                    this.notificationService.success('success', 'success');
                },
                (error: any) => {
                    this.notificationService.error(error, error.message);
                });
        } else {
            this.eCommerceService.create(data).subscribe(
                (response) => {
                    this.notificationService.success('success', 'success');
                    this.useNewId(this.eCommerce, response.id);
                },
                (error: any) => {
                    this.notificationService.error(error, error.message);
                });
        }
    };

    prepareDataToSave() {
        this.entityHeaderComponent.submit();
        const data: any = this.eCommerce.value;

        return data;
    }
}
