import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VolumeAgreement} from './volume-agreement.model';
import {iSteps} from '@shared/models/stepper.model';
import {ActivityService} from '../activity.service';
import {CommonActivityComponent} from '@shared/components/common-activity.component';
import {ActivityTypeEnum} from '../activity-type.enum';
import {iOption} from '@shared/models/option.model';
import {VolumeAgreementService} from './volume-agreement.service';
import {NotificationService} from '@shared/modules/notification/notification.service';
import {DocumentService} from '@shared/services/document.service';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {ActivityVolumeAgreementDocsComponent} from './activity-volume-agreement-docs/activity-volume-agreement-docs.component';

@Component({
  selector: 'app-volume-agreement',
  templateUrl: './activity-volume-agreement.component.html',
  styleUrls: ['./activity-volume-agreement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityVolumeAgreementComponent extends CommonActivityComponent implements OnInit {
  volumeAgreement: VolumeAgreement;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public activityService: ActivityService,
    public volumeAgreementService: VolumeAgreementService,
    public notificationService: NotificationService,
    public documentService: DocumentService,
    public currencyService: CurrencyService,
  ) {
    super(router, route, activityService, documentService, currencyService);

    this.type = ActivityTypeEnum.VolumeAgreement;
  }

  protected getSteps(): iSteps[] {
    this.steps = [
      {
        label: 'Общая информация',
        styleClass: 'step0'
      },
      {
        label: 'Выбор препаратов и группировка',
        styleClass: 'step1'
      },
      {
        label: 'Детализация по препаратам',
        styleClass: 'step2'
      },
      {
        label: 'Согласование с руководителем',
        styleClass: 'step3'
      },
      {
        label: 'Документы и итоги',
        styleClass: 'step4'
      }
    ];

    return this.steps;
  }

  ngOnInit() {
    super.ngOnInit();

    this.getActivityAsObservable().subscribe((activity: VolumeAgreement) => {
      //TODO: this if need remove in feature
      if (activity) {
        this.volumeAgreement = activity;
        this.entityHeader.setSteps(this.getSteps());
      }
    });
  }

  save() {
    if (!this.validation()) {
      return;
    }
    const data = this.prepareDataToSave();

    data.activityDocument = this.volumeAgreement.activityDocument;

    if (this.volumeAgreement.id) {
      this.volumeAgreementService.update(this.volumeAgreement.id, data, this.volumeAgreement.documentService.document.version).subscribe(
          (item) => {
            this.notificationService.success('success', 'success');
            this.router.navigate(['activities/catalog']);
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    } else {
      this.volumeAgreementService.create(data).subscribe(
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
    debugger;
    this.activityInstance.changeStatusByDraft();
    const data: any = this.prepareDataToSave();

    if (this.volumeAgreement.id) {
      this.volumeAgreementService.update(this.volumeAgreement.id, data, this.volumeAgreement.documentService.document.version).subscribe(
          (response) => {
            this.moveToNewVersion(this.volumeAgreement, this.volumeAgreement.id.toString(), this.volumeAgreement.version + 1);
            this.notificationService.success('success', 'success');
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    } else {
      this.volumeAgreementService.create(data).subscribe(
          (response) => {
            this.notificationService.success('success', 'success');
            this.useNewId(this.volumeAgreement, response.id);
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    }
  }

  changeCurrency(data: iOption) {
  }

  prepareDataToSave() {
    this.entityHeaderComponent.submit();
    const data: any = this.volumeAgreement.value;

    return data;
  }
}
