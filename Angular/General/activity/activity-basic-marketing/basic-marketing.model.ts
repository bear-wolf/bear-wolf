import {Activity} from '../activity.model';
import {ActivityBasicMarketingDataFromEnum} from './activity-basic-marketing-data-from.enum';
import {ActivityBasicMarketingActivityTypeEnum} from './activity-basic-marketing-activity-type.enum';
import {BasicMarketingSku} from './activity-basic-marketing-sku.model';
import * as moment from 'moment';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {Period} from '@shared/models/period.model';
import {EventEmitter} from '@angular/core';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {CurrencyEnum} from '@shared/enums/currency.enum';

export class BasicMarketing extends Activity {
    hasVat: boolean;
    investmentPercentage: number;
    oneSkuReportPricePrice: number;
    ntzAmount: number;
    calculationAmount: number;
    reportsAmount: number;
    hasReports: true;
    contractNumber: string;
    contractDate: string;
    additionalAgreementNumber: string;
    applicationNumber: string;
    workflowSystemId: number;
    basicMarketingSku: BasicMarketingSku[] = [];
    dataFrom: ActivityBasicMarketingDataFromEnum;
    basicMarketingActivityType: ActivityBasicMarketingActivityTypeEnum;
    activityPeriod: Period;
    actualReportingPeriod: Period;
    organicGrowth: number;
    estimatedInvestmentsForPeriodPrice: number;
    ntzAmountPrice: number;
    calculationAmountPrice: number;
    reportsAmountPrice: number;
    totalFactOldPrice: number;
    totalPlanNow: number;
    matrixInvestmentsYear: number;
    matrixInvestmentsMonth: number;
    investmentsFact: number;
    directPosting: number;
    reverse: number;
    originalAmount: number;
    currentAmount: number;
    delta: number;

    onEstimatedInvestmentsChange: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        currencyService: CurrencyService,
        data?: any
    ) {
        super(data, currencyService);

        data = data || {};
        this.dataFrom = data.dataFrom || 0;
        this.basicMarketingActivityType = data.basicMarketingActivityType || 0;
        this.hasVat = data.hasVat || false;
        this.investmentPercentage = data.investmentPercentage || 0;
        this.ntzAmount = data.ntzAmount || 0;
        this.calculationAmount = data.calculationAmount || 0;
        this.reportsAmount = data.reportsAmount || 0;
        this.hasReports = data.hasReports;
        this.contractNumber = data.contractNumber;
        this.contractDate = data.contractDate;
        this.additionalAgreementNumber = data.additionalAgreementNumber;
        this.applicationNumber = data.applicationNumber;
        this.workflowSystemId = data.workflowSystemId;

        this.activityPeriod = new Period(data.activityPeriodFrom || new Date(), data.activityPeriodTo || new Date());

        (data.basicMarketingSkus || []).forEach((sku) => {
            this.basicMarketingSku.push(new BasicMarketingSku(this.currencyService, sku));
        });

        this.organicGrowth = data.organicGrowth || 0;
        this.totalPlanNow = data.totalPlanNow || 0;
        this.matrixInvestmentsYear = data.matrixInvestmentsYear || 0;
        this.matrixInvestmentsMonth = data.matrixInvestmentsMonth || 0;
        this.actualReportingPeriod = new Period(data.actualReportingPeriodFrom || new Date(), data.actualReportingPeriodTo || new Date());

        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

    get _dataFrom() {
        return ActivityBasicMarketingDataFromEnum[this.dataFrom];
    }

    get nameOfCurrencyField(): string[] {
        return [
            'estimatedInvestmentsForPeriodPrice',
            'oneSkuReportPricePrice',
            'ntzAmountPrice',
            'calculationAmountPrice',
            'reportsAmountPrice',
            'totalFactOldPrice',
            'totalPlanNow',
            'matrixInvestmentsYear',
            'matrixInvestmentsMonth',
            'investmentsFact',
            'directPosting',
            'reverse',
            'originalAmount',
            'currentAmount',
            'delta'
        ];
    }

    getCurrencyStore() {
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });

        (this.basicMarketingSku || []).forEach((item) => {
            item.getCurrencyStore();
        });
        //
    }

    set pushCurrencyStore(data: any) {
        const name = this.currencyService.currentCurrencyName;
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][name] = data[key];
        });

        (this.basicMarketingSku || []).forEach((item) => {
            item.pushCurrencyStore = item.prepareDataForStore();
        });
    }

    prepareDataForStore(): any {
        const data = super.prepareDataForStore();

        (this.basicMarketingSku || []).forEach((item) => {
            const array: any = item.prepareDataForStore();
            Object.keys(array).forEach((_item) => {
                data[_item] = array[_item];
            });
        });
        return data;
    }

    get value() {
        const data: any = super.value;
        const fields: string[] = this.nameOfCurrencyField;

        data.dataFrom = Number(this.dataFrom);
        data.basicMarketingActivityType = Number(this.basicMarketingActivityType);
        data.hasVat = !!this.hasVat;
        data.organicGrowth = Number(this.organicGrowth);
        data.investmentPercentage = Number(this.investmentPercentage);
        data.estimatedInvestmentsForPeriodPrice = Number(this.estimatedInvestmentsForPeriodPrice);
        data.actualReportingPeriodFrom = moment(this.actualReportingPeriod.from).format(Configuration.format.serverDate);
        data.actualReportingPeriodTo = moment(this.actualReportingPeriod.to).format(Configuration.format.serverDate);
        data.ntzAmount = Number(this.ntzAmount);
        data.calculationAmount = Number(this.calculationAmount);
        data.reportsAmount = Number(this.reportsAmount);
        data.hasReports = !!this.hasReports;

        data.basicMarketingSkus = [];
        (this.basicMarketingSku || []).forEach((bmSku: BasicMarketingSku) => {
            data.basicMarketingSkus.push(bmSku.value);
        });

        fields.forEach((item: string) => {
            data[item] = this.getPropertyFromStore(item);
        });

        return data;
    }

    emitEstimatedInvestmentsChange(): void {
        this.onEstimatedInvestmentsChange.emit(this.estimatedInvestmentsForPeriodPrice);
    }
}



