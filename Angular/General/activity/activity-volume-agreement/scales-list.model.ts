import {CommonInnerData} from '../activity-shared/common-inner-data.model';
import {CurrencyService} from '@shared/components/currency/currency.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyEnum } from '@shared/enums/currency.enum';

export class ScalesList extends CommonInnerData {
    name: number;
    growthPercent: number;
    planUp: number;
    planRubPrice: number;
    investmentPercent: number;
    prizesPercent: number;
    payRubPrice: number;

    private _update: BehaviorSubject<CommonInnerData> = new BehaviorSubject<CommonInnerData>(null);

    constructor(
      currencyService: CurrencyService,
      data: any
    ) {
        super();

        this.currencyService = currencyService;

        data = data || {};

        this.name = Number(data.name || 0);
        this.growthPercent = Number(data.growthPercent || 0);
        this.planUp = Number(data.planUp || 0);
        this.investmentPercent = Number(data.investmentPercent || 0);
        this.prizesPercent = Number(data.prizesPercent || 0);


        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

    get nameOfCurrencyField(): string[] {
        return [
            'planRubPrice',
            'payRubPrice',
        ];
    }

    // way for update model
    get updateAsObservable(): Observable<CommonInnerData> {
        return this._update.asObservable();
    }

    set pushCurrencyStore(data: any) {
        const name = this.currencyService.currentCurrencyName;
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][name] = data[key];
        });
    }

    prepareDataForStore(): any {
        const data: any = {};
        const name = this.nameOfCurrencyField;

        for (let i = 0; i <= 3; i++) {
            name.forEach((item: string) => {
                data[item] = this[item];
            });
        }

        return data;
    }

    getCurrencyStore() {
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });
    }

    get value() {
        const fields: string[] = this.nameOfCurrencyField;
        const data: any = {
            name: Number(this.name),
            growthPercent: Number(this.growthPercent),
            planUp: Number(this.planUp),
            investmentPercent: Number(this.investmentPercent),
            prizesPercent: Number(this.prizesPercent)
        };

        fields.forEach((item: string) => {
            data[item] = this.getPropertyFromStore(item);
        });

        return data;
    }
}
