import {Activity} from '../activity.model';
import * as moment from 'moment';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {Sku} from '@shared/models/sku.model';
import {Period} from '@shared/models/period.model';
import {CurrencyEnum} from '@shared/enums/currency.enum';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class Training extends Activity {
    activityMonthFrom: Date;
    duration: number;
    durationForBudget: number;
    brandId: number;
    trainingForm: number;
    trainingType: number;
    conductsTraining: number;
    dayDuration: number;
    salesDuringTrainingPrice: number;
    pharmaciesNumberPlan: number;
    pharmaciesNumberActually: number;
    pharmacistsNumberPlan: number;
    pharmacistsNumberActually: number;
    investmentsPlanPrice: number;
    investmentsFactPrice: number;
    costPerPersonPlanPrice: number;
    costPerPersonFactPrice: number;
    contractNumber: string;
    contractDate: string;
    additionalAgreementNumber: string;
    applicationNumber: string;
    workflowSystemId: number;
    trainingSkus: Sku[];
    activityPeriod: Period;

    salesGrowthFact: number;
    roiPlan: number;
    roiFact: number;
    directPosting: number;
    reverse: number;

    constructor(currencyService: CurrencyService, data) {
        super(data, currencyService);

        if (data) {
            this.activityPeriod = new Period(data.activityPeriodFrom || new Date(), data.activityPeriodTo || new Date());
            this.activityMonthFrom = new Date(data.activityMonthFrom || Date());
            this.duration = Number(data.duration || 0);
            this.durationForBudget = Number(data.durationForBudget || 0);
            this.brandId = data.brandId;
            this.trainingForm = data.trainingForm;
            this.trainingType = data.trainingType;
            this.conductsTraining = data.conductsTraining;
            this.dayDuration = data.dayDuration;
            this.pharmaciesNumberPlan = data.pharmaciesNumberPlan;
            this.pharmaciesNumberActually = Number(data.pharmaciesNumberActually || 0);
            this.pharmacistsNumberPlan = data.pharmacistsNumberPlan;
            this.pharmacistsNumberActually = Number(data.pharmacistsNumberActually || 0);

            this.trainingSkus = [];
            (data.trainingSkus || []).forEach((item) => {
                this.trainingSkus.push(new Sku(item));
            });
        }

        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

    //TODO: need change variable on ...Price
    get nameOfCurrencyField(): string[] {
        return [
            'salesDuringTrainingPrice',
            'investmentsPlanPrice',
            'investmentsFactPrice',
            'costPerPersonPlanPrice',
            'costPerPersonFactPrice',
            'salesGrowthFact',
            'roiPlan',
            'roiFact',
            'directPosting',
            'reverse',
        ];
    }

    getCurrencyStore(data?: any) {
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });
    }

    set pushCurrencyStore(data: any) {
        const name = this.currencyService.currentCurrencyName;
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][name] = data[key];
        });
    }

    get value() {
        const data: any = super.value;
        const fields: string[] = this.nameOfCurrencyField;

        data.activityPeriodFrom = moment(this.activityPeriod.from).format(Configuration.format.serverDate);
        data.activityPeriodTo = moment(this.activityPeriod.to).format(Configuration.format.serverDate);
        data.activityMonthFrom = moment(this.activityMonthFrom).format(Configuration.format.serverDate);
        data.duration = this.duration;
        data.durationForBudget = this.durationForBudget;
        data.brandId = this.brandId;
        data.trainingForm = this.trainingForm;
        data.trainingType = this.trainingType;
        data.conductsTraining = this.conductsTraining;
        data.dayDuration = this.dayDuration;

        data.pharmaciesNumberPlan = this.pharmaciesNumberPlan;
        data.pharmaciesNumberActually = this.pharmaciesNumberActually;
        data.pharmacistsNumberPlan = this.pharmacistsNumberPlan;
        data.pharmacistsNumberActually = this.pharmacistsNumberActually;

        fields.forEach((item: string) => {
            data[item] = this.getPropertyFromStore(item);
        });

        data.trainingSkus = [];

        (this.trainingSkus || []).forEach((item: any) => {
            data.trainingSkus.push({
                id: 0,
                trainingId: this.id,
                trainingVersion: this.version,
                skuId: item.skuId
            });
        });

        return data;
    }
}
