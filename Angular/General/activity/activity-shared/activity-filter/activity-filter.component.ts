import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from '@shared/modules/request/request.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityFilter} from './activity-filter.model';
import {Activity} from '../../activity.model';
import {BusinessUnit} from '@shared/models/business-unit.model';
import {SkuService} from '@shared/services/sku.service';
import {SkuBrand} from '@shared/models/sku-brand.model';
import {MarketingPlanService} from '../../../marketing-plan/marketing-plan.service';
import {forkJoin} from 'rxjs';
import {ListActivity} from '../list-activity.model';
import {ActivitySearchParams} from '../../activity-search-params.model';
import {Pagination} from '@shared/models/pagination.model';

@Component({
    selector: 'app-activity-filter',
    templateUrl: './activity-filter.component.html',
    styleUrls: ['./activity-filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityFilterComponent implements OnInit {
    @Input()
    listActivity: ListActivity;

    @Input()
    activity: Activity[];

    modelFilter: ActivityFilter;

    @Output() cancelAction = new EventEmitter();

    form: FormGroup;
    businessUnits: BusinessUnit[] = [
        new BusinessUnit({id: 0, name: 'Маркетинговые позиции 2020'})
    ];
    brands: SkuBrand[];

    constructor(
        public router: Router,
        public skuService: SkuService,
        private fb: FormBuilder,
        private marketingPlanService: MarketingPlanService
    ) {

    }

    ngOnInit() {
        this.activity = this.listActivity.activities;

        this.modelFilter = new ActivityFilter(this.activity);
        this.buildForm();
        this.getBusinessUnits();

        this.skuService.getAllBrands().subscribe(brands => {
            this.brands = brands;
        });

        forkJoin([
            this.marketingPlanService.getCategories(),
            this.marketingPlanService.getSegments()
        ]).subscribe((data) => {
            this.modelFilter.categoryNetwork = data[0];
            this.modelFilter.segmentNetwork = data[1];
            this.modelFilter.setReady(true);
        });
    }

    buildForm() {
        this.form = this.fb.group({
            categoryNetwork: ['', Validators.required],
            segmentNetwork: ['', Validators.required],
            brandIds: [],
            bUIds: []
        });
    }

    getBusinessUnits() {
        this.skuService.getBusinessUnits()
            .subscribe((businessUnits: BusinessUnit[]) => {
                this.businessUnits.push(...businessUnits);
            });
    }

    show() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }

        const data = this.form.getRawValue();
        const category = this.modelFilter.categoryNetwork.filter(item => item.value === data.categoryNetwork);
        const segment = this.modelFilter.segmentNetwork.filter(item => item.value === data.segmentNetwork);

        const json: any = {
            category: category[0].label,
            segment: segment[0].label,
            brandIds: (data.brands || []).map(item => item.id),
            bUIds: data.bUIds || []
        };

        this.send(json);
    }

    reset() {
        this.form.markAsUntouched();

        const json = {
            categoryNetwork: null,
            segmentNetwork: null,
            brandIds: [],
            bUIds: []
        };

        this.form.patchValue(json);
        this.send(json);
    }

    cancel() {
        this.cancelAction.emit(true);
    }

    private send(json?: any) {
        //TODO: now send value (category & segment) and than need send id
        this.listActivity.service.getFilteredByConditions(json, new Pagination({
            pageNumber: this.listActivity.pageNumber,
            pageSize: this.listActivity.pageSize
        })).subscribe((item) => {
        });
    }

}
