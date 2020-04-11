import {DrugInformation} from '../activity-volume-agreement/drug-information.model';
import {CommonInnerData} from './common-inner-data.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class DrugInformationGroup extends CommonInnerData {
    name: string;
    drugInformation: DrugInformation[] = [];
    personalAccountingSku: boolean;

    constructor(
        currencyService: CurrencyService,
        data: any
    ) {
        super();
        this.currencyService = currencyService;

        data = data || {};
        this.name = data.name || '';
        this.personalAccountingSku = data.personalAccountingSku || false;

        (data.drugInformation || []).forEach((item) => {
            this.drugInformation.push(new DrugInformation(this.currencyService, item));
        });
    }

    get value() {
        const data = {
            name: this.name,
            drugInformation: [],
            personalAccountingSku: !!this.personalAccountingSku
        };

        this.drugInformation.forEach((drugInfo: DrugInformation) => {
            data.drugInformation.push(drugInfo.value);
        });

        return data;
    }
}
