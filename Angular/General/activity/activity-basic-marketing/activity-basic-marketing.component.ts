import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BasicMarketing } from './basic-marketing.model';
import { iOption } from '@shared/models/option.model';
import { DrugDetail } from '../drug/drug-detail/drug-detail.model';
import { DrugSelect } from '../drug/drug-select/drug-select.model';
import { DrugFormData } from '../drug/drug-detail/drug-form-data.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicForm, DynamicFormTemplate } from '@shared/components/dynamic-form/dynamic-form.model';
import { DynamicFormEnum } from '@shared/components/dynamic-form/dynamic-form.enum';
import { iSteps } from '@shared/models/stepper.model';
import { CurrencyService } from '@shared/components/currency/currency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonActivityComponent } from '@shared/components/common-activity.component';
import { ActivityService } from '../activity.service';
import { ActivityTypeEnum } from '../activity-type.enum';
import { DataService } from '@shared/services/data.service';
import { BasicMarketingService } from './basic-marketing.service';
import { NotificationService } from '@shared/modules/notification/notification.service';
import { BusinessUnit } from '@shared/models/business-unit.model';
import { SkuService } from '@shared/services/sku.service';
import { BasicMarketingSku } from './activity-basic-marketing-sku.model';
import {DocumentService} from '@shared/services/document.service';

@Component({
  selector: 'app-basic-marketing',
  templateUrl: './activity-basic-marketing.component.html',
  styleUrls: ['./activity-basic-marketing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityBasicMarketingComponent extends CommonActivityComponent implements OnInit {
  basicMarketing: BasicMarketing;

  drugModel: DrugDetail;
  dragFormShort: DynamicForm;

  businessUnits: BusinessUnit[] = [
    new BusinessUnit({ id: 0, name: 'Маркетинговые позиции 2020'})
  ];
  selectedSku: BasicMarketingSku;
  listDrugs: iOption[];


  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public activityService: ActivityService,
    public basicMarketingService: BasicMarketingService,
    private notificationService: NotificationService,
    private dataService: DataService,
    private skuService: SkuService,
    public documentService: DocumentService,
    public currencyService: CurrencyService
  ) {
    super(router, route, activityService, documentService, currencyService);
    this.type = ActivityTypeEnum.BasicMarketing;
  }

  protected getSteps(): iSteps[] {
    this.steps = [
      {
        label: 'Общая информация и выбор препаратов',
        styleClass: 'step0'
      },
      {
        label: 'Расчетные инвестиции',
        styleClass: 'step1'
      },
      {
        label: 'Детализация по препаратам',
        styleClass: 'step2'
      },
      {
        label: 'Маркетинговая информация',
        styleClass: 'step3'
      },
      {
        label: 'Согласование с АКАМ',
        styleClass: 'step4'
      },
      {
        label: 'Штрафы',
        styleClass: 'step5'
      },
      {
        label: 'Документы и итоги',
        styleClass: 'step6'
      }
    ];

    return this.steps;
  }

  ngOnInit() {
    super.ngOnInit();

    this.skuService.getBusinessUnits().subscribe((businessUnits: BusinessUnit[]) => {
      this.businessUnits.push(...businessUnits);
    });

    this.getActivityAsObservable().subscribe((activity: BasicMarketing) => {
      if (activity) {
        this.basicMarketing = activity;
        this.entityHeader.setSteps(this.getSteps());
      }
    });

    this.currencyService.getCurrencyObservable().subscribe((item) => {
    });

    this.listDrugs = this.dataService.getListDrags();
  }

  buildForm(properties): FormGroup {
    return this.fb.group(properties);
  }

  onSelectDrug(data: DrugSelect) {
    console.log(data);
    this.drugModel = new DrugDetail({
      title: data.key
    });
    this.drugModel.formData = new DrugFormData();

    this.dragFormShort = new DynamicForm();

    this.dragFormShort.form = this.buildForm({
      ntzEqualCountPoint: [],
      ntzMoreCountBoxes: [],
      ntzMoreCountPoint: [],
      ntzMoreTotal: [],
      facing: [],
      calculationPoint: [],
      calculationPlace: [],
    });
    this.dragFormShort.list = [
      new DynamicFormTemplate({
        title: 'ntzEqualCountPoint',
        placeholder: 'Введите число',
        label: 'План НТЗ = 1 уп., к-во точек'
      }),
      new DynamicFormTemplate({
        title: 'ntzMoreCountBoxes',
        placeholder: 'Введите число',
        label: 'План НТЗ (>1 уп.), к-во уп.'
      }),
      new DynamicFormTemplate({
        title: 'ntzMoreCountPoint',
        placeholder: 'Введите число',
        label: 'План НТЗ (>1 уп.), к-во точек'
      }),
      new DynamicFormTemplate({
        title: 'ntzMoreTotal',
        placeholder: 'Введите число',
        label: 'План НТЗ (>1 уп.), ИТОГО уп.'
      }),
      new DynamicFormTemplate({
        title: 'facing',
        placeholder: 'Введите число',
        label: 'К-во фейсингов'
      }),
      new DynamicFormTemplate({
        title: 'calculationPoint',
        placeholder: 'Введите число',
        label: 'К-во точек выкладки'
      }),
      new DynamicFormTemplate({
        title: 'calculationPlace',
        placeholder: 'Введите число',
        label: 'Место выкладки',
        options: [{key: 'промошкаф', value: '0'}],
        type: DynamicFormEnum.SELECT
      })
    ];
  }

  changeCurrency(data: iOption) {
  }

  save() {
    if (!this.validation()) {
      return;
    }

    const data = this.prepareDataToSave();

    if (this.basicMarketing.id) {
      this.basicMarketingService.update(this.basicMarketing.id, data, this.activityInstance.documentService.document.version).subscribe(
        (item) => {
          this.notificationService.success('success', 'success');
          this.router.navigate(['activities/catalog']);
        },
        (error: any) => {
          this.notificationService.error(error, error.message);
        });
    } else {
      this.basicMarketingService.create(data).subscribe(
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
    this.activityInstance.changeStatusByDraft();
    const data: any = this.prepareDataToSave();
    if (this.basicMarketing.id) {
      this.basicMarketingService.update(this.basicMarketing.id, data, this.activityInstance.documentService.document.version).subscribe(
        (item) => {
          this.moveToNewVersion(this.basicMarketing, this.basicMarketing.id.toString(), this.basicMarketing.version + 1);
          this.notificationService.success('success', 'success');
        },
        (error: any) => {
          this.notificationService.error(error, error.message);
        });
    } else {
      this.basicMarketingService.create(data).subscribe(
        (response) => {
          this.notificationService.success('success', 'success');
          this.useNewId(this.basicMarketing, response.id);
        },
        (error: any) => {
          this.notificationService.error(error, error.message);
        });
    }
  }

  prepareDataToSave() {
    this.entityHeaderComponent.submit();
    return this.basicMarketing.value;
  }

  submit(): void {

  }
}
