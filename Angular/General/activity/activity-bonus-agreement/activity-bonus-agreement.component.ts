import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { iDocumentVersion } from '@shared/components/document-version/document-version.model';
import { CommonActivityComponent } from '@shared/components/common-activity.component';
import { BonusAgreement } from './bonus-agreement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../activity.service';
import { Configuration } from '@shared/modules/outer-config/models/config';
import * as moment from 'moment';
import { iSteps } from '@shared/models/stepper.model';
import { ActivityTypeEnum } from '../activity-type.enum';
import { iOption } from '@shared/models/option.model';
import { NotificationService } from '@shared/modules/notification/notification.service';
import { BonusAgreementService } from './bonus-agreement.service';
import {DocumentService} from '@shared/services/document.service';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Component({
  selector: 'app-bonus-agreement',
  templateUrl: './activity-bonus-agreement.component.html',
  styleUrls: ['./activity-bonus-agreement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBonusAgreementComponent extends CommonActivityComponent implements OnInit {
  @Input()
  bonusAgreement: BonusAgreement;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public activityService: ActivityService,
    public notificationService: NotificationService,
    public documentService: DocumentService,
    public currencyService: CurrencyService,
    public bonusAgreementService: BonusAgreementService
  ) {
    super(router, route, activityService, documentService, currencyService);

    this.type = ActivityTypeEnum.BonusAgreement;
  }

  protected getSteps(): iSteps[] {
    this.steps = [
      {label: 'Общая информация', styleClass: 'step0' },
      {label: 'Выбор препаратов и группировка', styleClass: 'step1' },
      {label: 'Детализация по препаратам', styleClass: 'step2' },
      {label: 'Согласование с АКАМ', styleClass: 'step3' },
      {label: 'Штрафы', styleClass: 'step4' },
      {label: 'Документы и итоги', styleClass: 'step5' }
    ];

    return this.steps;
  }

  ngOnInit() {
    super.ngOnInit();

    this.getActivityAsObservable().subscribe((activity: BonusAgreement) => {
      if (activity) {
        this.bonusAgreement = activity;
        this.entityHeader.setSteps(this.getSteps());
      }

    });
  }

  sendManager() {
    if (!this.validation()) {
      return;
    }

    this.activityInstance.changeStatusByDraft();
    const data: any = this.prepareDataToSave();
    console.log(data.activityStatus);
    if (this.bonusAgreement.id) {
      this.bonusAgreementService.update(this.bonusAgreement.id, data, this.activityInstance.documentService.document.version).subscribe(
        (item) => {
          this.moveToNewVersion(this.bonusAgreement, this.bonusAgreement.id.toString(), this.bonusAgreement.version + 1);
          this.notificationService.success('success', 'success');
        },
        (error: any) => {
          this.notificationService.error(error, error.message);
        });
    } else {
      this.bonusAgreementService.create(data).subscribe(
        (response) => {
          this.notificationService.success('success', 'success');
          this.useNewId(this.bonusAgreement, response.id);
        },
        (error: any) => {
          this.notificationService.error(error, error.message);
        });
    }
  }

  save() {
    if (!this.validation()) {
      return;
    }
    const data: any = this.prepareDataToSave();

    if (this.bonusAgreement.id) {
      this.bonusAgreementService.update(this.bonusAgreement.id, data, this.activityInstance.documentService.document.version).subscribe(
          (item) => {
            this.notificationService.success('success', 'success');
            this.router.navigate(['activities/catalog']);
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    } else {
      this.bonusAgreementService.create(data).subscribe(
          (item) => {
            this.notificationService.success('success', 'success');
            this.router.navigate(['activities/catalog']);
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    }
  }

  prepareDataToSave() {
    this.entityHeaderComponent.submit();
    const data: any = this.bonusAgreement.value;

    return data;
  }
}
