import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonActivityComponent} from '@shared/components/common-activity.component';
import {Training} from './training.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivityService} from '../activity.service';
import {iSteps} from '@shared/models/stepper.model';
import {ActivityTypeEnum} from '../activity-type.enum';
import {iOption} from '@shared/models/option.model';
import {TrainingService} from './training.service';
import {NotificationService} from '@shared/modules/notification/notification.service';
import {DocumentService} from '@shared/services/document.service';
import {ActivityStatusEnum} from '../activity-status.enum';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Component({
    selector: 'app-training',
    templateUrl: './activity-training.component.html',
    styleUrls: ['./activity-training.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityTrainingComponent extends CommonActivityComponent implements OnInit {
    training: Training;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public activityService: ActivityService,
        public trainingService: TrainingService,
        public notificationService: NotificationService,
        public currencyService: CurrencyService,
        public documentService: DocumentService,
    ) {
        super(router, route, activityService, documentService, currencyService);

        this.type = ActivityTypeEnum.Training;
    }

    protected getSteps(): iSteps[] {
        this.steps = [
            {
                label: 'Общая информация',
                styleClass: 'step0'
            },
            {
                label: 'Согласование с АКАМ',
                styleClass: 'step1'
            },
            {
                label: 'Документы и итоги',
                styleClass: 'step2'
            }
        ];

        return this.steps;
    }

    ngOnInit() {
        super.ngOnInit();

        this.getActivityAsObservable().subscribe((activity: Training) => {
            if (activity) {
                this.training = activity;
                this.entityHeader.setSteps(this.getSteps());
            }
        });
    }

    save() {
        if (!this.validation()) {
            return;
        }
        const data: any = this.prepareDataToSave();

        if (this.training.id) {
            this.trainingService.update(this.training.id, data, this.training.documentService.document.version).subscribe(
                (item) => {
                    this.notificationService.success('success', 'success');
                    this.router.navigate(['activities/catalog']);
                },
                (error: any) => {
                    this.notificationService.error(error, error.message);
                });
        } else {
            this.trainingService.create(data).subscribe(
                (item) => {
                    this.notificationService.success('success', 'success');
                    this.router.navigate(['activities/catalog']);
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

        this.training.changeStatusByDraft();
        const data: any = this.prepareDataToSave();

        if (this.training.id) {
            this.trainingService.update(this.training.id, data, this.training.documentService.document.version).subscribe(
                (item) => {
                    this.moveToNewVersion(this.training, this.training.id.toString(), this.training.version + 1);
                    this.notificationService.success('success', 'success');
                },
                (error: any) => {
                    this.notificationService.error(error, error.message);
                });
        } else {
            this.trainingService.create(data).subscribe(
                (response) => {
                    this.notificationService.success('success', 'success');
                    this.useNewId(this.training, response.id);
                },
                (error: any) => {
                    this.notificationService.error(error, error.message);
                });
        }
    }

    prepareDataToSave() {
        this.entityHeaderComponent.submit();
        const data: any = this.training.value;

        return data;
    }
}
