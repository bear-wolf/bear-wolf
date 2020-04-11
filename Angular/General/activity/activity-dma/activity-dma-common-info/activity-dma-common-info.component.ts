import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CommonInner} from '@shared/components/common-inner.component';
import {DataService} from '@shared/services/data.service';
import {MarketingPlan} from '../../../marketing-plan/marketing-plan.model';
import {ActivatedRoute} from '@angular/router';
import {MarketingPlanService} from '../../../marketing-plan/marketing-plan.service';
import {Dma} from '../dma.model';

@Component({
  selector: 'app-activity-dma-common-info',
  templateUrl: './activity-dma-common-info.component.html',
  styleUrls: ['./activity-dma-common-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDmaCommonInfoComponent extends CommonInner implements OnInit {
  @Input()
  dma: Dma;

  periodOptions: object[] = [
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
    {value: 6, label: '6'},
    {value: 7, label: '7'},
    {value: 8, label: '8'},
    {value: 9, label: '9'},
    {value: 10, label: '10'},
    {value: 11, label: '11'},
    {value: 12, label: '12'}
  ];

  constructor(
    public fb: FormBuilder,
    public dataService: DataService,
    public route: ActivatedRoute,
    private marketPlanService: MarketingPlanService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.route.parent.queryParams.subscribe(queryParams => {
      if (queryParams['mpid']) {
        this.marketPlanService.get(queryParams['mpid']).subscribe((mp: MarketingPlan) => {
          this.dma.marketingPlan = mp;

          this.formBuild();
        });
      } else {
        this.formBuild();
      }
    });
  }

  formBuild(): void {
    this.buildForm({
      activityPeriod: [this.dma.activityPeriod],
      budgetDuration: [this.dma.budgetDuration, Validators.required],
      countPoints: [this.dma.pharmacyNetwork.totalOfPharmacies],
      pointsInActivity: [this.dma.pointsInActivity, [Validators.max(this.dma.pharmacyNetwork.totalOfPharmacies), Validators.required]],
      cities: [this.dma.cities, Validators.required],
      useNds: [this.dma.useNds]
    });
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('ActivityDmaCommonInfoComponent\'s form is invalid');
      return;
    }

    const formValue: any = this.form.getRawValue();
    this.dma.cities = formValue.cities;
    this.dma.useNds = formValue.useNds;
    this.dma.budgetDuration = formValue.budgetDuration;
    this.dma.pointsInActivity = Number(formValue.pointsInActivity);
    this.dma.activityPeriod = formValue.activityPeriod;
  }
}
