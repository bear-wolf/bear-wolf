import {CurrencyService} from '@shared/components/currency/currency.service';
import {CurrencyEnum} from '@shared/enums/currency.enum';

export class CommonInnerData {
    private _currencyService: CurrencyService;
    store: any; // inner storage

    constructor() {
        this.store = Object.create(null);
    }

    get nameOfCurrencyField(): string[] {
        throw new DOMException('This handler "CommonInnerData.nameOfCurrencyField" need override');
    }

    set currencyService(service: CurrencyService) {
        this._currencyService = service;
    }

    get currencyService(): CurrencyService {
        return this._currencyService;
    }

    getPropertyFromStore(name: string) {
        return this.store[name];
    }

    set pushCurrencyStore(data: any) {
        const currency = CurrencyEnum[this.currencyService.currentCurrency];
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][currency] = data[key];
        });
    }

    createCurrencyObject(name: string[], data?: any) {
        for (let i = 0; i <= 3; i++) {
            const key: string = CurrencyEnum[i];

            name.forEach((item: string) => {
                this.store[item] = this.store[item] || Object.create(null);
                this.store[item][key] = (data && data[item]) ? data[item][key] : 0;
            });
        }
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
        if (!this.currencyService) {
            throw new DOMException('There is not "currency service"');
        }
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });
    }
}