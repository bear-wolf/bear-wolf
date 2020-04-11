import {ScalesList} from './scales-list.model';
import {VolumeAgreementTypeConfirmationDbEnum} from './activity-volume-agreement-drugs-details/volume-agreement-drug-detail/volume-agreement-type-confirmation-db.enum';
import {VolumeAgreementBonusConditionsEnum} from './activity-volume-agreement-drugs-details/volume-agreement-drug-detail/volume-agreement-bonus-conditions.enum';
import {Sku} from '@shared/models/sku.model';
import {CommonInnerData} from '../activity-shared/common-inner-data.model';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {CurrencyEnum} from '@shared/enums/currency.enum';

export class DrugInformation extends CommonInnerData {
    skuId: number;
    sku: Sku;
    groupName: string;
    factPrevYearUp: number;
    pricePrevYearDDPPrice: number;
    singlePercentInGroup: boolean;
    singlePercentInBrand: boolean;
    skUexcludedFromDS: boolean;
    dmAinNextPeriod: boolean;
    scalesList: ScalesList[] = [];
    typeConfirmationsDb: VolumeAgreementTypeConfirmationDbEnum;
    bonusCondition: VolumeAgreementBonusConditionsEnum;
    currentScale: number;
    focusMonthes: string[];

    private _update: BehaviorSubject<CommonInnerData> = new BehaviorSubject<CommonInnerData>(null);

    constructor(
        currencyService: CurrencyService,
        data: any
    ) {
        super();

        this.currencyService = currencyService;

        data = data || {};

        this.skuId = data.skuId || null;
        this.sku = data.sku || null;
        this.groupName = data.groupName || null;
        this.factPrevYearUp = data.factPrevYearUp || 0;
        this.singlePercentInGroup = data.singlePercentInGroup || false;
        this.singlePercentInBrand = data.singlePercentInBrand || false;
        this.skUexcludedFromDS = data.skUexcludedFromDS || false;
        this.dmAinNextPeriod = data.dmAinNextPeriod || false;

        if (data.scalesList) {
            data.scalesList.forEach((scalesList: any) => {
                this.scalesList.push(new ScalesList(this.currencyService, scalesList));
            });
        } else {
            this.scalesList = [
                new ScalesList(this.currencyService, {
                    name: 1
                }),
                new ScalesList(this.currencyService, {
                    name: 2
                }),
                new ScalesList(this.currencyService, {
                    name: 3
                })
            ];
        }

        this.typeConfirmationsDb = data.typeConfirmationsDb || 0;
        this.bonusCondition = data.bonusCondition || 0;
        this.currentScale = data.currentScale || 0;
        this.focusMonthes = data.focusMonthes || [];

        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

    get nameOfCurrencyField(): string[] {
        return [
            'pricePrevYearDDPPrice'
        ];
    }

    // way for update model
    get updateAsObservable(): Observable<CommonInnerData> {
        return this._update.asObservable();
    }

    set pushCurrencyStore(data: any) {
        const currency = CurrencyEnum[this.currencyService.currentCurrency];
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][currency] = data[key];
        });
    }

    prepareDataForStore(): any {
        const data: any = {};
        const name = this.nameOfCurrencyField;

        for (let i = 0; i <= 1; i++) {
            name.forEach((item: string) => {
                data[item] = this[item];
            });
        }

        (this.scalesList || []).forEach((scale) => {
            scale.pushCurrencyStore = scale.prepareDataForStore();
        });

        return data;
    }

    getCurrencyStore() {
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });

        (this.scalesList || []).forEach((item) => {
            item.getCurrencyStore();
        });
    }

    get value() {
        const fields: string[] = this.nameOfCurrencyField;
        const data: any = {
            skuId: Number(this.skuId),
            factPrevYearUp: Number(this.factPrevYearUp),
            singlePercentInGroup: !!this.singlePercentInGroup,
            singlePercentInBrand: !!this.singlePercentInBrand,
            skUexcludedFromDS: !!this.skUexcludedFromDS,
            dmAinNextPeriod: !!this.dmAinNextPeriod,
            scalesList: [],
            focusMonthes: [],
            typeConfirmationsDb: Number(this.typeConfirmationsDb),
            bonusCondition: Number(this.bonusCondition),
            currentScale: Number(this.currentScale)
        };

        fields.forEach((item: string) => {
            data[item] = this.getPropertyFromStore(item);
        });

        (this.focusMonthes || []).forEach((item) => {
            data.focusMonthes.push(item);
        });

        (this.scalesList || []).forEach((scale: ScalesList) => {
            data.scalesList.push(scale.value);
        });

        return data;
    }
}
