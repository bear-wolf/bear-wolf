import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Dma} from './dma.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivityService} from '../activity.service';
import {iSteps} from '@shared/models/stepper.model';
import {CommonActivityComponent} from '@shared/components/common-activity.component';
import {ActivityTypeEnum} from '../activity-type.enum';
import {iOption} from '@shared/models/option.model';
import {NotificationService} from '@shared/modules/notification/notification.service';
import {DmaService} from './dma.service';
import {Comment} from '@shared/models/comment.model';
import {DocumentService} from '@shared/services/document.service';
import { CurrencyService } from '@shared/components/currency/currency.service';

@Component({
  selector: 'app-dma',
  templateUrl: './activity-dma.component.html',
  styleUrls: ['./activity-dma.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDmaComponent extends CommonActivityComponent implements OnInit {
  dma: Dma;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public activityService: ActivityService,
    public notificationService: NotificationService,
    public dmaService: DmaService,
    public documentService: DocumentService,
    public currencyService: CurrencyService
  ) {
    super(router, route, activityService, documentService, currencyService);
    this.type = ActivityTypeEnum.Dma;
  }

  protected getSteps(): iSteps[] {
    this.steps = [
      {label: 'Общая информация и элементы поддержки в аптеках', styleClass: 'step0' },
      {label: 'Прогноз продаж без акции', styleClass: 'step1' },
      {label: 'Условия и экономика акции', styleClass: 'step2' },
      {label: 'Дополнительный эффект Акции', styleClass: 'step3' },
      {label: 'Согласование с АКАМ', styleClass: 'step4' },
      {label: 'Документы и итоги', styleClass: 'step5' }
    ];

    return this.steps;
  }

  ngOnInit() {
    super.ngOnInit();

    this.getActivityAsObservable().subscribe((activity: Dma) => {
      if (activity) {
        this.dma = activity;
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

    if (this.dma.id) {
      this.dmaService.update(this.dma.id, data, this.activityInstance.documentService.document.version).subscribe(
          (item) => {
            this.moveToNewVersion(this.dma, this.dma.id.toString(), this.dma.version + 1);
            this.notificationService.success('success', 'success');
            //this.router.navigateByUrl(`/activities/dma/${this.dma.id}/${this.dma.version + 1}?mpid=${this.dma.marketingPlanId}`);
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    } else {
      this.dmaService.create(data).subscribe(
          (response) => {
            this.notificationService.success('success', 'success');
            this.useNewId(this.dma, response.id);
          },
          (error: any) => {
            this.notificationService.error(error, error.message);
          });
    }
  }

  prepareDataToSave() {
    this.entityHeaderComponent.submit();
    const data: any = this.dma.value;

    return data;
  }

  save() {
    if (!this.validation()) {
      return;
    }
    const data: any = this.prepareDataToSave();

    if (!this.dma.id) {
      this.dmaService.create(data).subscribe(() => {
        this.router.navigate(['/activities/catalog']);
      });
    } else {
      this.dmaService.update(this.dma.id, data, this.dma.documentService.document.version).subscribe(() => {
        this.router.navigate(['/activities/catalog']);
      });
    }
  }
}
