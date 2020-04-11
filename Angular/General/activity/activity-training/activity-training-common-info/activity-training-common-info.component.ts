import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder, Validators} from '@angular/forms';
import {Training} from '../training.model';
import {iOption} from '@shared/models/option.model';
import {DataService} from '@shared/services/data.service';
import {SkuBrand} from '@shared/models/sku-brand.model';
import {Sku} from '@shared/models/sku.model';
import {BasicMarketingSku} from '../../activity-basic-marketing/activity-basic-marketing-sku.model';
import {SkuService} from '@shared/services/sku.service';
import {ActivatedRoute} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';

@Component({
    selector: 'app-activity-training-common-info',
    templateUrl: './activity-training-common-info.component.html',
    styleUrls: ['./activity-training-common-info.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityTrainingCommonInfoComponent extends CommonInner implements OnInit {
    @Input()
    training: Training;

    period: iOption[];
    duration: iOption[];
    brands: SkuBrand[];
    skus: Sku[];
    selectedBrand: SkuBrand;
    filteredSkuList: Sku[] = [];

    constructor(
        public fb: FormBuilder,
        public skuService: SkuService,
        public dataService: DataService,
        public route: ActivatedRoute,
    ) {
        super(fb);
        this.period = this.dataService.getPeriod();
        this.duration = this.dataService.getMonthToSelect();
    }

    ngOnInit() {
        super.ngOnInit(this.training);

        this.skuService.getAllBrands().subscribe((item) => {
            this.brands = item;

            this.form.patchValue({
                brand: this.getBrandById()
            });
        });

        this.buildForm({
            activityPeriod: [this.training.activityPeriod],
            activityMonthFrom: [this.training.activityMonthFrom, Validators.required],
            duration: [this.training.duration, Validators.required],
            durationForBudget: [this.training.durationForBudget],
            brand: ['', Validators.required],
            sku: [this.training.trainingSkus],
        });

    }

    getBrandById(): SkuBrand {
        if (!this.training.brandId) {
            return null;
        }
        return this.brands.filter(b => b.id === this.training.brandId)[0];
    }

    submit() {
        this.form.markAllAsTouched();
        if (!this.validation()) {
            return;
        }
        const dataForm = this.form.getRawValue();
        this.training.activityPeriod = dataForm.activityPeriod;
        this.training.activityMonthFrom = dataForm.activityMonthFrom;
        this.training.duration = Number(dataForm.duration || 0);
        this.training.durationForBudget = Number(dataForm.durationForBudget);

        if (dataForm.brand) {
            this.training.brandId = dataForm.brand.id;
        }
        this.training.trainingSkus = dataForm.sku || [];
    }

    searchSku(event) {
        this.skuService.getSkuByName(event.query, this.training.brandId).subscribe((skuList: Sku[]) => {
            this.filteredSkuList = skuList;
        });
    }

    changeBrand($event: SkuBrand) {
        this.training.brandId = $event.id;

        this.training.trainingSkus = [];
        this.form.get('sku').setValue([]);
    }
}
