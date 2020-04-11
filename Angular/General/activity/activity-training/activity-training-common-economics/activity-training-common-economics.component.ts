import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder, Validators} from '@angular/forms';
import {BasicMarketing} from '../../activity-basic-marketing/basic-marketing.model';
import {Training} from '../training.model';
import {ActivatedRoute} from '@angular/router';
import {Configuration} from '@shared/modules/outer-config/models/config';

@Component({
    selector: 'app-activity-training-common-economics',
    templateUrl: './activity-training-common-economics.component.html',
    styleUrls: ['./activity-training-common-economics.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityTrainingCommonEconomicsComponent extends CommonInner implements OnInit {
    @Input()
    training: Training;

    private _costOnePersonPlan: number = 0;
    private _costOnePersonFact: number = 0;

    constructor(
        public fb: FormBuilder
    ) {
        super(fb);
    }

    get costOnePersonPlan(): string {
        return this._costOnePersonPlan.toFixed(Configuration.decimal);
    }

    get costOnePersonFact(): string {
        return this._costOnePersonFact.toFixed(Configuration.decimal);
    }

    ngOnInit() {
        super.ngOnInit(this.training);

        this.buildForm({
            pharmaciesNumberPlan: [this.training.pharmaciesNumberPlan, Validators.required],
            pharmaciesNumberActually: [this.training.pharmaciesNumberActually || 0],
            pharmacistsNumberPlan: [this.training.pharmacistsNumberPlan, Validators.required],
            pharmacistsNumberActually: [this.training.pharmacistsNumberActually || 0],
            investmentsPlanPrice: [this.training.investmentsPlanPrice, Validators.required],
            investmentsFactPrice: [this.training.investmentsFactPrice || 0],
            costPerPersonPlanPrice: [this.training.costPerPersonPlanPrice, Validators.required],
            costPerPersonFactPrice: [this.training.costPerPersonFactPrice || 0],
        });

        this.form.valueChanges.subscribe((item) => {
            const investmentsPlanPrice = Number(item.investmentsPlanPrice || 0);
            const pharmacistsNumberPlan = Number(item.pharmacistsNumberPlan || 0);
            const investmentsFactPrice = Number(item.investmentsFactPrice || 0);
            const pharmacistsNumberActually = Number(item.pharmacistsNumberActually || 0);

            if (investmentsPlanPrice > 0 && pharmacistsNumberPlan) {
                this._costOnePersonPlan = investmentsPlanPrice / pharmacistsNumberPlan;
            }
            if (investmentsFactPrice > 0 && pharmacistsNumberActually) {
                this._costOnePersonFact = investmentsFactPrice / pharmacistsNumberActually;
            }
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (!this.validation()) {
            return;
        }

        const data = this.form.getRawValue();
        this.training.pharmaciesNumberPlan = Number(data.pharmaciesNumberPlan || 0);
        this.training.pharmaciesNumberActually = Number(data.pharmaciesNumberPlan || 0);
        this.training.pharmacistsNumberPlan = Number(data.pharmacistsNumberPlan || 0);
        this.training.pharmacistsNumberActually = Number(data.pharmacistsNumberActually || 0);
        this.training.investmentsPlanPrice = Number(data.investmentsPlanPrice || 0);
        this.training.investmentsFactPrice = Number(data.investmentsFactPrice || 0);
        this.training.costPerPersonPlanPrice = Number(data.costPerPersonPlanPrice || 0);
        this.training.costPerPersonFactPrice = Number(data.costPerPersonFactPrice || 0);
    }

}

export enum TypeChangedEnum {
    PharmaciesNumberPlan,
    PharmaciesNumberActually,
    PharmacistsNumberPlan,
    PharmacistsNumberActually,
    InvestmentsPlan,
    InvestmentsActually,
    CostPerPersonPlan,
    CostPerPersonActually
}

