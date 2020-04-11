import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonActivityComponent} from '@shared/components/common-activity.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivityService} from '../activity.service';
import {iSteps} from '@shared/models/stepper.model';
import {JointAgreement} from './joint-agreement.model';
import {ActivityTypeEnum} from '../activity-type.enum';
import {iOption} from '@shared/models/option.model';
import {JointAgreementService} from './joint-agreement.service';
import {NotificationService} from '@shared/modules/notification/notification.service';
import {DataService} from '@shared/services/data.service';
import {DocumentService} from '@shared/services/document.service';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Component({
  selector: 'app-joint-agreement',
  templateUrl: './activity-joint-agreement.component.html',
  styleUrls: ['./activity-joint-agreement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityJointAgreementComponent extends CommonActivityComponent implements OnInit {
  jointAgreement: JointAgreement;
  periodOptions: iOption[];
  
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public activityService: ActivityService,
    public notificationService: NotificationService,
    public dataService: DataService,
    public jointAgreementService: JointAgreementService,
    public documentService: DocumentService,
    public currencyService: CurrencyService
  ) {
    super(router, route, activityService, documentService, currencyService);

    this.type = ActivityTypeEnum.JointAgreement;
    this.periodOptions = this.dataService.getPeriod();
  }

  ngOnInit() {
    super.ngOnInit();

    this.getActivityAsObservable().subscribe((activity: JointAgreement) => {
      if (activity) {
        this.jointAgreement = activity;
        this.entityHeader.setSteps(this.getSteps());
      }
    });
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
      },
    ];

    return this.steps;
  }

  sendManager() {
    if (!this.validation()) {
      return;
    }
    this.activityInstance.changeStatusByDraft();
    const data: any = this.prepareDataToSave();
    
    if (this.jointAgreement.id) {
      this.jointAgreementService.update(this.jointAgreement.id, data, this.activityInstance.documentService.document.version).subscribe(
          (item) => {
            this.moveToNewVersion(this.jointAgreement, this.jointAgreement.id.toString(), this.jointAgreement.version + 1);
            this.notificationService.success('success', 'success');
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    } else {
      this.jointAgreementService.create(data).subscribe(
          (response) => {

            this.notificationService.success('success', 'success');
            this.useNewId(this.jointAgreement, response.id);
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

    if (this.jointAgreement.id) {
      this.jointAgreementService.update(this.jointAgreement.id, data, this.activityInstance.documentService.document.version).subscribe(
          (item) => {
            this.notificationService.success('success', 'success');
            this.router.navigate(['activities/catalog']);
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    } else {
      this.jointAgreementService.create(data).subscribe(
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
    const data: any = this.jointAgreement.value;

    return data;
  }

  changeCurrency(data: number) {
  }
}
